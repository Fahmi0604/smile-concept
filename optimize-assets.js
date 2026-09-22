#!/usr/bin/env node
/* eslint-disable */
/**
 * One-off asset optimizer: converts every image referenced from src/ to WebP.
 *
 * Usage:
 *   node optimize-assets.js convert     # write *.webp next to each used png/jpg/jpeg
 *   node optimize-assets.js delete-old  # remove the originals (run after verifying)
 *   node optimize-assets.js report      # print before/after sizes
 *
 * Quality policy (quality-safe, no resizing):
 *   - no alpha channel            -> lossy q80 (photos)
 *   - alpha fully opaque          -> flattened, lossy q80 (Figma exports carry a
 *                                    useless alpha layer)
 *   - real transparency, <200KB   -> lossless (logos, icons)
 *   - real transparency, >=200KB  -> lossy q85 (hero, CTA background)
 *
 * Already-optimized formats (webp/avif/svg) are left untouched.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ASSET_DIR = "public/assets/smile-concept";
const SRC_DIR = "src";

/* ---------------------------------------------------------- reference scan */

/** All asset filenames referenced from src/, including the dynamic
 *  `3_promo${n}.jpg` template in lib/data/promo.ts (expanded to 1..11). */
function referencedAssets() {
  const refs = new Set();
  const re = /\/assets\/smile-concept\/([A-Za-z0-9._-]+\.(?:png|jpe?g|webp|avif|svg))/g;
  const dynRe = /\/assets\/smile-concept\/3_promo\$\{n\}\.jpg/g;

  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (/\.(tsx?|mjs|css|html)$/.test(entry.name)) {
        const text = fs.readFileSync(p, "utf8");
        for (const m of text.matchAll(re)) refs.add(m[1]);
        if (dynRe.test(text)) {
          for (let n = 1; n <= 11; n++) refs.add(`3_promo${n}.jpg`);
        }
      }
    }
  };
  walk(SRC_DIR);
  return refs;
}

/** Rewrite every `/assets/smile-concept/NAME.ext` in src/ to `.webp` when the
 *  WebP counterpart exists on disk. The dynamic `3_promo${n}.jpg` template is
 *  rewritten too. Files without a WebP counterpart (e.g. the skipped JPEG)
 *  keep their original extension. */
function updateReferences() {
  const re = /(\/assets\/smile-concept\/[A-Za-z0-9._-]+)\.(png|jpe?g)/g;
  const dynRe = /(\/assets\/smile-concept\/3_promo\$\{n\})\.jpg/g;
  let changed = 0;

  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (/\.(tsx?|mjs|css|html)$/.test(entry.name)) {
        const text = fs.readFileSync(p, "utf8");
        let next = text.replace(re, (m, base) => {
          const webp = path.join(ASSET_DIR, path.basename(base) + ".webp");
          return fs.existsSync(webp) ? base + ".webp" : m;
        });
        next = next.replace(dynRe, (m, base) => {
          return fs.existsSync(path.join(ASSET_DIR, "3_promo1.webp")) ? base + ".webp" : m;
        });
        if (next !== text) {
          fs.writeFileSync(p, next);
          changed++;
          console.log(`updated ${p}`);
        }
      }
    }
  };
  walk(SRC_DIR);
  console.log(`\n${changed} files updated.`);
}

/* ------------------------------------------------------------- conversion */

function hasRealAlpha(meta) {
  return meta.hasAlpha && meta.channels >= 4;
}

async function convertOne(file) {
  const src = path.join(ASSET_DIR, file);
  const out = path.join(ASSET_DIR, file.replace(/\.(png|jpe?g)$/i, ".webp"));
  const before = fs.statSync(src).size;

  const img = sharp(src);
  const meta = await img.metadata();

  // Fully-opaque alpha (common in Figma exports) is useless — flatten it so
  // the lossy encoder spends all bits on the visible image.
  let alphaOpaque = false;
  if (hasRealAlpha(meta)) {
    const { data, info } = await img
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const channels = info.channels;
    const alphaIdx = channels - 1;
    alphaOpaque = true;
    for (let i = alphaIdx; i < data.length; i += channels) {
      if (data[i] !== 255) { alphaOpaque = false; break; }
    }
  }

  let pipeline = sharp(src);
  let opts;
  if (/\.png$/i.test(file) && before < 200 * 1024) {
    // Small PNGs (logos, icons) are flat graphics — lossless keeps them crisp.
    opts = { lossless: true };
  } else if (!hasRealAlpha(meta) || alphaOpaque) {
    pipeline = pipeline.removeAlpha();
    opts = { quality: 90 };
  } else {
    // Real transparency: keep the alpha channel. q90 keeps cutout edges clean.
    opts = { quality: 90 };
  }

  await pipeline.webp(opts).toFile(out);
  let after = fs.statSync(out).size;

  // Never ship a WebP bigger than the original: retry lossless, then bail out.
  if (after >= before) {
    await sharp(src).webp({ lossless: true }).toFile(out);
    after = fs.statSync(out).size;
    if (after >= before) {
      fs.unlinkSync(out);
      return { file, before, after: before, mode: "skipped (webp not smaller)", alpha: "-" };
    }
    opts = { lossless: true };
  }

  return { file, before, after, mode: opts.lossless ? "lossless" : `q${opts.quality}`, alpha: alphaOpaque ? "flattened" : meta.hasAlpha ? "kept" : "none" };
}

async function convertAll() {
  const refs = referencedAssets();
  const targets = [...refs].filter((f) => /\.(png|jpe?g)$/i.test(f) && fs.existsSync(path.join(ASSET_DIR, f)));
  targets.sort();

  const rows = [];
  for (const f of targets) rows.push(await convertOne(f));

  const totalBefore = rows.reduce((s, r) => s + r.before, 0);
  const totalAfter = rows.reduce((s, r) => s + r.after, 0);
  console.log(`Converted ${rows.length} files: ${(totalBefore / 1048576).toFixed(1)}MB -> ${(totalAfter / 1048576).toFixed(1)}MB (${Math.round((1 - totalAfter / totalBefore) * 100)}% smaller)`);
  console.log("");
  for (const r of rows) {
    console.log(`${r.file.padEnd(42)} ${(r.before / 1024).toFixed(0).padStart(6)}KB -> ${(r.after / 1024).toFixed(0).padStart(6)}KB  [${r.mode}, alpha ${r.alpha}]`);
  }
  return rows;
}

/* ---------------------------------------------------------------- cleanup */

function deleteOriginals() {
  const refs = referencedAssets();
  let deleted = 0;
  for (const f of [...refs].sort()) {
    if (!/\.(png|jpe?g)$/i.test(f)) continue;
    const src = path.join(ASSET_DIR, f);
    const webp = path.join(ASSET_DIR, f.replace(/\.(png|jpe?g)$/i, ".webp"));
    if (fs.existsSync(src) && fs.existsSync(webp)) {
      fs.unlinkSync(src);
      deleted++;
    }
  }
  console.log(`Deleted ${deleted} originals (webp counterparts exist).`);
}

/* ------------------------------------------------------------------ main */

const cmd = process.argv[2];
if (cmd === "convert") convertAll();
else if (cmd === "delete-old") deleteOriginals();
else if (cmd === "update-refs") updateReferences();
else if (cmd === "report") {
  const refs = referencedAssets();
  const files = [...refs].filter((f) => fs.existsSync(path.join(ASSET_DIR, f))).sort();
  const total = files.reduce((s, f) => s + fs.statSync(path.join(ASSET_DIR, f)).size, 0);
  console.log(`${files.length} referenced assets, ${(total / 1048576).toFixed(1)}MB total`);
  for (const f of files) console.log(`${(fs.statSync(path.join(ASSET_DIR, f)).size / 1024).toFixed(0).padStart(6)}KB  ${f}`);
}
else {
  console.log("usage: node optimize-assets.js <convert|delete-old|update-refs|report>");
  process.exit(1);
}
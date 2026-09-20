// One-off: strip the EXIF APP1 segment (which carries a bogus orientation
// flag) from JPEGs, keeping every other segment and all pixel data untouched.
const fs = require("fs");

function stripExif(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) throw new Error("not a JPEG");
  const chunks = [buf.subarray(0, 2)];
  let i = 2;
  while (i < buf.length - 1) {
    if (buf[i] !== 0xff) throw new Error(`bad marker at ${i}`);
    const marker = buf[i + 1];
    // SOS (scan data) or EOI: copy the rest verbatim and stop.
    if (marker === 0xda || marker === 0xd9) {
      chunks.push(buf.subarray(i));
      break;
    }
    const len = buf.readUInt16BE(i + 2);
    const seg = buf.subarray(i, i + 2 + len);
    const isExifApp1 =
      marker === 0xe1 && seg.subarray(4, 10).toString("latin1") === "Exif\u0000\u0000";
    if (!isExifApp1) chunks.push(seg);
    i += 2 + len;
  }
  return Buffer.concat(chunks);
}

for (const file of process.argv.slice(2)) {
  const before = fs.readFileSync(file);
  const after = stripExif(before);
  fs.writeFileSync(file, after);
  console.log(file, before.length, "->", after.length);
}

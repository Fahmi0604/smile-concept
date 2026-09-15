# HANDOFF — Smile Concept (clinic-profile-onyx)

Dokumen serah-terima untuk developer yang melanjutkan repo ini.
Baca berurutan: **HANDOFF.md** (ini) → `CLAUDE.md` (aturan kerja & fidelity rule) → `PLAN.md` (build log per fase, termasuk alasan tiap keputusan teknis).

- Prototype (source of truth visual): https://smile-concept.vercel.app
- Clone lokal prototype: `/Users/mgg/Documents/code/temp/smile-concept/smile-concept`
- Terakhir dikerjakan: **2026-09-11** (integrasi CMS)

---

## 0. Mulai dari mana

| File | Isi |
|---|---|
| **`CONTENT-CHECKLIST.md`** | **Checkpoint pekerjaan** — apa yang sudah jadi, apa yang tersisa, dan perbandingan lengkap copy brief vs kode. **Baca ini dulu kalau mau melanjutkan pekerjaan konten.** Juga memuat catatan khusus kalau repo ini dipindah/di-zip ke laptop lain. |
| `HANDOFF.md` (file ini) | Status teknis: integrasi CMS, setup, jebakan, status git. |
| `PLAN.md` | Log pembangunan per fase + alasan tiap keputusan teknis. |
| `CLAUDE.md` | Aturan kerja (pixel-perfect, konvensi, jangan improvisasi desain). |

⚠️ Sumber konten (`SmileConcept_ContentBrief.docx`, 41 MB) ada **di luar repo**, di
`../SmileConcept_ContentBrief.docx`. Tidak ikut kalau hanya folder repo yang di-zip.

---

## 1. Ringkasan keadaan

Repo ini awalnya situs **Onyx Dental Center**. Seluruh UI sudah **ditulis ulang** menjadi **Smile Concept**, mengikuti prototype secara pixel-perfect dengan Tailwind v4 + shadcn/ui. Fase 0–6 di `PLAN.md` selesai; `npm run build` lolos dengan **11 routes**.

Lapisan datanya kini tersambung ke CMS Smile Concept (`cms.tumbuhsehat.id`). Lihat bagian 2
untuk apa yang dinamis, apa yang statis, dan empat karakteristik CMS yang perlu diketahui.

### Routes yang hidup

```
/                        home (9 section)
/treatments              listing
/treatments/[slug]       detail (baru ada: braces)
/doctors                 listing
/doctors/[slug]          detail (baru ada: kalya)
/promo
/blog                    + /blog/id, /blog/en
/blog/[slug]
/api/sitemap             (route handler)
```

---

## 2. Status integrasi API

Terintegrasi ke **CMS Smile Concept** (`https://cms.tumbuhsehat.id/api`) pada 2026-09-11.
Hanya 4 resource yang dinamis; sisanya memang **statis by design**.

### Endpoint yang dipakai

| Endpoint | Dipakai di | Status |
|---|---|---|
| `GET /settings` | `layout.tsx`, semua page (CTA WhatsApp, Footer) | ✅ terhubung |
| `GET /posts` | `/blog`, `/blog/id`, `/blog/en`, `/api/sitemap` | ✅ terhubung |
| `GET /posts/{identifier}` | `/blog/[slug]` | ✅ terhubung |
| `GET /promos` | `/promo` | ✅ terhubung (data CMS masih kosong → fallback statis) |
| `GET /promos/{identifier}` | `getPromoBySlug()` tersedia, belum ada halaman detail promo | ✅ terhubung |

Semua ada di `src/lib/api/index.ts`. Type-nya di `src/lib/types/cms.d.ts` (ambient/global, tanpa import).

### Yang tetap hardcoded (disengaja)

| Konten | Lokasi |
|---|---|
| Treatments — listing | `src/app/treatments/page.tsx` (`CATEGORIES`) |
| Treatments — detail | `src/lib/data/treatment-detail.ts` |
| Doctors — listing | `src/lib/data/doctor-list.ts` |
| Doctors — detail | `src/lib/data/doctor-detail.ts` |
| Semua section home | `src/sections/home/*.tsx` (`STATS`, `TREATMENTS`, `FEATURES`, `CARDS`, `PROMO_CARDS`, `INSURANCE_LOGOS`, `SLIDES`, testimonial) |
| Promo fallback | `src/lib/data/promo.ts` |

### ⚠️ Empat hal yang WAJIB diketahui tentang CMS ini

1. **Rate limit 5 request / menit / IP** (Laravel throttle, header `x-ratelimit-limit: 5`).
   Mitigasinya sudah dipasang: semua fetch lewat Next Data Cache dengan `revalidate`
   panjang, dan `getSettings()` dibungkus React `cache()` supaya layout + page berbagi
   satu request. **Jangan ganti ke `cache: "no-store"`** tanpa menghitung ulang limit ini.

2. **Filter bahasa pakai `?lang=`, bukan `?language=`.** `?language=id` diterima tanpa
   error tapi **diabaikan** — mengembalikan seluruh post, jadi mudah dikira sudah bekerja.
   Yang benar `?lang=id` / `?lang=en` (terverifikasi: `lang=id` → 1 post, `lang=en` → 0).
   Dipakai di `getPosts(lang)` pada `lib/api/index.ts`.

3. **Promo masih kosong di CMS**, jadi bentuk payload-nya **belum pernah terlihat**.
   Type `CmsPromo` dan adapter `toPromoView()` disusun mengikuti konvensi `/posts` dan
   sengaja serba-opsional. Begitu ada promo asli: hit ulang endpoint-nya, perbaiki type +
   adapter itu — **tidak ada komponen yang perlu diubah**, `toPromoView()` satu-satunya
   tempat yang tahu bentuk mentahnya. Selama CMS kosong, `/promo` menampilkan promo statis
   dari prototype.

4. **`APP_DEBUG=true` di produksi.** Respons error CMS mengembalikan full stack trace
   Laravel berikut path server (`/home/u1691344/public_html/…`) dan versi framework.
   Perlu disampaikan ke tim backend untuk dimatikan.

### Data CMS saat ini masih demo

`/settings` mengembalikan `whatsapp: "08123456789"`, `email: "demo@clinic.com"`,
alamat "Jl. Jalan no 2, Malang", dan semua social media `null`. Footer + CTA sudah
membaca nilai ini dengan benar; yang perlu diisi adalah **kontennya di CMS**, bukan kodenya.
Selama kosong, Footer memakai fallback alamat/kontak Smile Concept dari prototype.

---

## 3. Isu keamanan — sudah dibereskan

`src/lib/api/index.ts` dulu memuat **JWT bearer token asli** di dalam blok komentar di 3
tempat. File itu sudah ditulis ulang total dan token tersebut **hilang dari working tree**.

Tersisa satu tindakan di sisi backend: **rotate token itu**. Token yang sama mungkin masih
valid, dan pernah berada di source selama berbulan-bulan di mesin lokal.

---

## 4. Status git

Pekerjaan rebuild ini **belum di-commit sama sekali**. Commit terakhir (`714e241`, 30 Des 2025) masih era Onyx.

Working tree berisi ~63 file baru (staged), ~211 file terhapus (aset + halaman Onyx), beberapa file yang sudah dimodifikasi lagi setelah di-stage, dan 2 file **untracked**:

- `src/instrumentation.ts` — penting, lihat bagian 6
- `src/lib/utils/html.ts` — `stripInlineStyles()`, dipakai `/blog/[slug]`

Langkah pertama penerima: commit semuanya ke branch (mis. `feat/smile-concept-rebuild`) supaya ada baseline yang bisa di-review. Pastikan bagian 3 selesai lebih dulu.

---

## 5. Setup

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

Stack: Next.js 15.2.8 (App Router) · React 19 · TypeScript 5 · Tailwind v4 · shadcn/ui · Embla · framer-motion.

Salin `.env.example` → `.env.local`. Dua variabel, keduanya punya default di kode jadi
app tetap jalan tanpa file env:

| Variabel | Default | Fungsi |
|---|---|---|
| `NEXT_PUBLIC_CMS_API_URL` | `https://cms.tumbuhsehat.id/api` | base URL CMS, tanpa trailing slash |
| `NEXT_PUBLIC_SITE_URL` | `https://smileconcept.id` | origin situs — canonical URL, OG tag, sitemap |

⚠️ `NEXT_PUBLIC_SITE_URL` default-nya **tebakan**. Ganti begitu domain produksi Smile
Concept dipastikan.

`@prisma/client` + `prisma` terpasang di `package.json`, **tapi tidak ada `schema.prisma` di tree**. Rencana CMS berbasis Prisma di `CLAUDE.md` belum dimulai; keputusannya masih terbuka (pakai API eksternal, atau Prisma lokal).

---

## 6. Hal yang mudah menjebak

- **Font tidak pakai `next/font`.** Playfair Display / Familjen Grotesk / Inclusive Sans dimuat lewat `<link>` Google Fonts di `src/app/layout.tsx`. Ini disengaja — `next/font` merename family sehingga rantai CSS variable `--font-body` putus. Konsekuensinya build memunculkan warning `no-page-custom-font`; **itu normal, jangan "diperbaiki"** dengan mengembalikan `next/font` tanpa membaca catatan di `PLAN.md` Fase 0.
- **`src/instrumentation.ts` mematikan verifikasi TLS di development.** Mesin dev asal berada di balik proxy yang meng-intercept TLS, sehingga `fetch` Node gagal `SELF_SIGNED_CERT_IN_CHAIN`. Hook ini menyetel `NODE_TLS_REJECT_UNAUTHORIZED=0` **hanya** saat `NODE_ENV=development`. Produksi tidak terpengaruh. Kalau jaringanmu normal, file ini boleh dihapus.
- **`fetcher()` melempar `NOT_FOUND` untuk semua error non-OK**, bukan hanya 404 (`src/lib/utils/fetcher.ts`). Default timeout 10s; `getBlogs` dinaikkan ke 20s karena cold start lewat proxy sempat melewati batas.
- **Konten artikel CMS dibersihkan inline style-nya** (`stripInlineStyles()`) sebelum `dangerouslySetInnerHTML`, supaya typography `.article-prose` menang. Keputusan user, agar cocok dengan prototype.
- **`images.unoptimized: true`** di `next.config.ts` → thumbnail remote render sebagai `<img>` biasa, jadi tidak perlu `remotePatterns`.
- **Typography & layout wajib lewat utility yang sudah ada.** Gunakan `h1-display`, `h2`, `h3-subheadline`, `h4`, `body-text`, `caption`, `btn-primary`, `btn-outline` (didefinisikan sebagai `@utility` di `src/app/globals.css`) dan komponen `<Shell>` untuk container. Jangan hand-tune `text-[60px]` per elemen.
- **`tailwind.config.ts` hampir kosong** — token warna/font ada di `@theme` dalam `globals.css` (Tailwind v4). Config hanya menyisakan tweak `@tailwindcss/typography`.

---

## 7. Daftar pekerjaan tersisa

Prioritas turun ke bawah:

1. **Rotate JWT** di sisi backend (bagian 3).
2. **Commit seluruh working tree** ke branch (bagian 4).
3. **Matikan `APP_DEBUG`** di CMS produksi (bagian 2).
4. **Isi konten CMS** — `/settings` masih data demo (`demo@clinic.com`, alamat Malang,
   social media `null`), dan `/promos` masih kosong.
5. **Pastikan domain produksi** lalu set `NEXT_PUBLIC_SITE_URL`.
6. Begitu ada promo asli di CMS: perbaiki `CmsPromo` + `toPromoView()` (bagian 2 poin 3).
7. **Favicon** — `public/favicon.png` masih milik Onyx. Butuh ikon persegi dari klien;
   `Logo1.png` (749×257) rasionya tidak cocok. `src/app/__favicon.ico` inert (prefix `__`
   diabaikan Next).
8. ~~Tambah halaman detail treatment/doctor selain `braces` dan `kalya`~~ **DONE 2026-09-15**:
   22 treatment detail + 10 doctor detail dibangun dari brief docx (copy Final), foto masih
   placeholder (`TODO(assets)` di `src/lib/data/treatment-detail.ts` & `doctor-detail.ts`).
   Sitemap ikut otomatis — ia membaca `doctorList` + `treatmentDetails`.
9. Putuskan apakah treatments/doctors/konten home perlu jadi CMS-driven. Kalau ya, backend
   perlu menyediakan endpoint-nya dulu; type di file `src/lib/data/*` bisa jadi kontrak awal.
10. Tracking pixel: GA/GTM/FB Pixel milik Onyx sudah dihapus. Kalau Smile Concept punya ID
    sendiri, pasang ulang di `layout.tsx`.
11. Ganti `README.md` yang masih template `create-next-app`.
12. `package.json` `name` masih `"experiment-app"`.
13. `next-sitemap` tidak pernah berjalan (tidak ada script `postbuild`) — sitemap dilayani
    `/api/sitemap`. Putuskan mau pakai yang mana, jangan dua-duanya.
14. `src/hooks/` (`use-boolean`, `use-mobile`) tidak terpakai — boleh dibiarkan atau dibersihkan.
15. Halaman detail promo (`/promo/[slug]`) belum ada, padahal `getPromoBySlug()` sudah siap.
    Prototype tidak punya desainnya — perlu keputusan desain dulu.

---

## 8. Peta file

```
src/
  app/
    layout.tsx            Google Fonts <link>, Navbar/main/Footer, getSettings()
    globals.css           @theme token + @utility typography & button
    page.tsx              home — merangkai 9 section
    treatments/ doctors/ promo/ blog/
    api/sitemap/route.ts
  components/             Navbar, Footer, Shell, PromoCard, BlogCard, ui/
  sections/home/          hero, stats-bar, treatments, doctors, transformations,
                          promo, facility, testimonial, cta-block
  lib/
    api/index.ts          klien CMS — 5 fungsi + adapter toPromoView()
    data/                 konten statis (doctor-list, doctor-detail,
                          treatment-detail, promo-fallback)
    types/cms.d.ts        type CMS (ambient/global, tanpa import)
    utils/                fetcher, html (stripInlineStyles), metadata (SITE_URL)
  instrumentation.ts      untracked — TLS off di dev
public/assets/smile-concept/   seluruh aset prototype
```

# CONTENT CHECKLIST — SmileConcept_ContentBrief.docx vs kode

Dibuat 2026-09-15 dari `/Users/mgg/Documents/code/temp/smile-concept/SmileConcept_ContentBrief.docx`
(41 MB, 4529 paragraf). **Tujuan file ini: supaya tidak perlu membuka docx lagi.**

## Cara baca

Docx punya dua kolom: **Exploration** dan **Final**.

> **Temuan utama: kode saat ini = kolom "Exploration".**
> Itu copy prototype lama. Kolom **"Final"** adalah copy yang disetujui klien — dan
> hampir seluruhnya berbeda. Jadi ini bukan tambal sulam beberapa kalimat;
> hampir setiap teks di situs perlu diganti.

Pergeseran besar yang berlaku di banyak tempat:
- Banyak copy berubah **dari Inggris ke Indonesia** (hero subheadline, intro treatments, deskripsi treatment detail).
- Struktur bertambah: treatment kategori **3 → 4**, treatment detail **1 → 23 halaman**, dokter detail **1 → 11 halaman**, promo home **3 → 11**, logo asuransi **6 → 15**.

**Scope file ini: COPY/teks saja.** Asset gambar sengaja tidak dibandingkan (permintaan user —
dibandingkan manual). Semua asset di brief berupa link Google Drive / stock photo, belum ada
nama file final kecuali kolom "Asset Name" (`0_Home_Treatment1`, `3_promo1`, `BA6`, dst).

Legend: ❌ beda / perlu diganti · ➕ belum ada di kode · ✅ sudah sama · ✔ sudah diterapkan

---

# ✅ CHECKPOINT — baca ini dulu

Terakhir diperbarui: **2026-09-15**. Bagian ini adalah satu-satunya tempat yang perlu dilihat
untuk tahu **apa yang sudah jadi dan apa yang tersisa**. Detail per item ada di bagian 1–7 di bawah.

## Sudah selesai

- [x] **Semua copy pada halaman & section yang sudah ada** — diterapkan + diverifikasi di dev server
      (bagian 1.1–1.7, label 1.8, judul 1.9, 1.10–1.12, 2, 3.1, 4, 5.1, 6)
- [x] Promo home & `/promo` disatukan ke satu sumber API; home memotong 3 teratas
- [x] `PromoCard` menerima harga apa adanya dari CMS (multi-baris, tanpa harga, tanpa badge)
- [x] Urutan dokter 7 & 11 diverifikasi — ternyata sudah benar, tidak perlu diubah
- [x] `tsc --noEmit` bersih · `npm run build` lolos 11 routes

## Tersisa — diblokir ASET (butuh file gambar dari klien)

- [x] **1.8 — logo asuransi DISELESAIKAN (2026-09-15)** — 15 logo asli (`0_Home_Insurance1–15`)
      diambil dari repo prototype revisi dan dipasang di marquee. **AdMedika & AIA dihapus** —
      revisi prototype tidak memakai keduanya (menjawab pertanyaan #7). Nama alt mengikuti docx:
      logo 12 adalah **BRI Life** (revisi HTML salah label "BCA Life" dua kali).
- [x] **3.2 — 22 halaman treatment detail DIBANGUN (2026-09-15)** — copy Final dari docx sudah
      masuk ke `src/lib/data/treatment-detail.ts`; hero + before/after memakai `Placeholder.png`
      (ditandai `TODO(assets)`). Sisa pekerjaan: **tinggal tukar file fotonya** saat aset klien
      datang. Caption before/after hanya tersedia untuk sebagian treatment (sisanya "⚠️ Needs
      content" di docx → dipakai label generik "Before & After").
- [x] **5.2 — 10 profil dokter DIBANGUN (2026-09-15)** — copy Final dari docx masuk ke
      `src/lib/data/doctor-detail.ts`, listing `/doctors` kini menautkan slug ke semua dokter.
      Foto detail memakai foto listing yang sama; **tinggal tukar** saat foto final dari Drive
      tersedia. Catatan: beberapa typo docx diperbaiki ("Dental Sp" → "Dental Spa",
      "Penambalan Gig" → "Penambalan Gigi", "Full Mouth Rehabilitatio" → "Full Mouth
      Rehabilitation", "Konsultas" → "Konsultasi") — konfirmasi ke klien.
- [x] **Placeholder home & /treatments DISELESAIKAN (2026-09-15)** — foto asli
      `0_Home_Treatment1–4.jpg` dipasang di home switcher + 4 kategori listing (object-position
      68% / 55% sesuai prototype).
- [x] **3 placeholder facility DISELESAIKAN (2026-09-15)** — 6 foto asli
      (`0_Home_facility1–6.jpg`) + **caption di bawah foto** (elemen UI baru dari revisi
      prototype; caption identik dengan docx Final).
- [x] **Transformations, testimonial, promo cards DISELESAIKAN (2026-09-15)** — 5 foto
      before/after asli (`0_Home_BA1–5.jpg`), foto testimonial asli (`0_Home_Testimonial.jpg`),
      11 foto kartu promo asli (`3_promo1–11.jpg`).

## Tersisa — diblokir KEPUTUSAN (butuh jawaban klien)

- [x] **1.9 — caption carousel facility DISELESAIKAN (2026-09-15)** — revisi prototype menaruh
      caption **di bawah foto** (`margin-top: 20px`, style `caption`); sudah diterapkan.
- [x] **Daftar promo DISELESAIKAN (2026-09-15)** — revisi prototype memakai 11 promo docx Home
      sebagai isi `/promo`, dan menyorot 3 di antaranya (Behel Konvensional, Behel Self-Ligating,
      Aligner Invisalign) di home. Fallback statis kini 11 promo asli; CMS punya field
      `is_highlighted` untuk kurasi home.
- [x] **Judul kategori 4 — disengaja (2026-09-15)** — revisi prototype tetap memakai
      `Helping You Raise Confident Smile` di home dan `Helping Your Kids...` di /treatments.
- [ ] **Penamaan `Painless Scaling` (detail) vs `Dental Spa` (list)** — perlu dipetakan agar slug konsisten.
- [ ] **Promo CareNow** butuh logo pihak ketiga, bukan foto pasien — bentuk kartunya kemungkinan beda.
- [x] **Badge diskon DIBUANG (2026-09-15)** — tidak satu pun promo di docx/prototype punya
      persentase; kartu revisi tanpa badge. `PromoCard` tetap mendukung badge bila CMS mengirim.

## Tersisa — dikerjakan di CMS, bukan di kode

- [x] **Skema promo CMS diketahui (2026-09-15)** — backend memberikan struktur `/promos/{id}`;
      `CmsPromo` + `toPromoView()` ditulis ulang mengikuti skema asli (harga numerik → format
      `Rp9.000.000`, perks dari `description`, `is_highlighted` → kurasi home, `is_active`
      difilter). Bentuk list-item diasumsikan sama dengan detail — verifikasi saat ada data.
- [ ] **Input semua promo** ke `/api/promos` (CMS masih kosong → situs pakai fallback statis prototype)
- [ ] **Isi `/api/settings`** — masih data demo (`demo@clinic.com`, alamat Malang, telepon
      `+6282236180971`, socials `null`). Fallback di kode sudah benar sesuai brief, tapi **CMS
      menang atas fallback**, jadi selama demo belum diganti, data demo yang tampil.
- [ ] Blog: tidak ada konten di brief — sepenuhnya dari CMS.

---

# 📦 Pindah ke laptop lain

**Prosedur di bawah sudah diuji** (2026-09-15): zip → unzip → `npm install` → `npm run build`
→ `npm run dev` → halaman terbuka dengan copy baru dan data CMS asli termuat.

## Di laptop lama — bikin zip-nya

Jalankan dari folder **induk** (`smile-concept/`, satu level di atas repo):

```bash
cd /Users/mgg/Documents/code/temp/smile-concept

zip -r smile-concept.zip clinic-profile-onyx SmileConcept_ContentBrief.docx \
  -x "clinic-profile-onyx/node_modules/*" \
     "clinic-profile-onyx/.next/*" \
     "clinic-profile-onyx/.git/*"
```

Hasilnya **±74 MB**. Tanpa pengecualian itu ukurannya 777 MB — `node_modules` (548 MB) dan
`.next` (114 MB) tidak perlu ikut karena dibuat ulang oleh `npm install` dan `npm run build`.

⚠️ **`SmileConcept_ContentBrief.docx` wajib disertakan** — letaknya di luar folder repo, jadi
tidak akan ikut kalau kamu hanya zip `clinic-profile-onyx/`. Pekerjaan tersisa yang terbesar
(22 halaman treatment detail + 10 profil dokter) butuh file itu.

⚠️ **Jangan pakai `git archive`.** Seluruh pekerjaan ini **belum di-commit** — commit terakhir
masih era Onyx (Des 2025). `git archive` hanya mengambil yang sudah ter-commit, hasilnya situs
Onyx lama. Sertakan `.git/` hanya bila kamu ingin membawa riwayatnya; kalau tidak, zip di atas
sudah cukup dan 79 MB lebih ringan.

## Di laptop baru

```bash
unzip smile-concept.zip
cd smile-concept/clinic-profile-onyx   # atau ke mana pun kamu unzip

npm install        # ±12 detik, 607 paket
npm run dev        # → http://localhost:3000
```

Butuh **Node 18.18+**; diuji di Node 22.17.1 / npm 10.9.2. `package.json` tidak mengunci versi.

**Tidak perlu file `.env`.** `NEXT_PUBLIC_CMS_API_URL` (default `https://cms.tumbuhsehat.id/api`)
dan `NEXT_PUBLIC_SITE_URL` (default `https://smileconcept.id`) sudah punya nilai default di kode.
Salin `.env.example` → `.env.local` hanya kalau mau menimpa salah satunya.

## Yang mungkin bikin bingung di laptop baru

- **Peringatan TLS saat `npm run dev`.** `src/instrumentation.ts` mematikan verifikasi sertifikat
  **hanya di development**, karena mesin asal ada di balik proxy yang meng-intercept TLS. Kalau
  jaringan laptop barumu normal, file itu boleh dihapus — situs tetap jalan.
- **`npm run build` menampilkan `Failed to fetch ... SELF_SIGNED_CERT_IN_CHAIN`.** Ini **bukan**
  error build; `build` tetap lolos. Penyebabnya sama (proxy TLS), dan `instrumentation.ts` sengaja
  tidak berlaku di production build. Halaman jatuh ke fallback. Di laptop tanpa proxy, pesan ini hilang.
- **Warning lint `no-page-custom-font`** — disengaja. Font dimuat lewat `<link>` Google Fonts,
  bukan `next/font`; alasannya ada di `PLAN.md` Fase 0. Jangan "diperbaiki".
- **Telepon/email di footer terlihat salah** (`+6282236180971`, alamat Malang) — itu data demo dari
  CMS, dan CMS menang atas fallback di kode. Perbaikannya di CMS.
- **Rate limit CMS 5 request/menit per IP.** Kalau me-refresh berkali-kali lalu data hilang,
  tunggu semenit. Bukan bug.

---

## 1. Home — `src/sections/home/`

### 1.1 Navbar — `src/components/Navbar.tsx`
| # | Item | Kode sekarang | Brief (Final) | |
|---|---|---|---|---|
| 1 | Link 2 | `Doctors` | **Our Dentists** | ✔ |
| 2 | Link 1, 3, 4 + CTA | Treatments / Promo / Blog / Book Now | sama | ✅ |

### 1.2 Hero — `hero.tsx`
| # | Item | Kode sekarang | Brief (Final) | |
|---|---|---|---|---|
| 1 | Pre-headline (L51) | `Elevating your confidence with a` | **Designed for confidence in every moment** | ❌ |
| 2 | Headline | `Better Smile` | **Own Your Smile** | ❌ |
| 3 | Subheadline (L73) | `Trusted dental clinic in the heart of Kemang. Friendly, caring and personalized approach to help you thrive.` | **Klinik gigi orthodontic center di Kemang, berfokus pada hasil yang natural, kenyamanan perawatan, dan pengalaman yang terasa personal bagi tiap pasien.** | ❌ |
| 4 | CTA | Book via WhatsApp | sama | ✅ |

⚠️ Headline berubah jadi 2 kata (`Own Your Smile` vs `Better Smile`) — cek layout swoosh SVG inline di hero.

### 1.3 Stats — `stats-bar.tsx`
| # | Kode sekarang | Brief (Final) | |
|---|---|---|---|
| 1 | 4,9 / 5 — Google rating | sama | ✅ |
| 2 | **200+ — Satisfied patients** | **1000+ — Orthodontic cases handled** | ❌ |
| 3 | 10+ years — Doctor's experience | sama | ✅ |
| 4 | 10+ — Insurance partners | sama | ✅ |

⚠️ Label stat 2 jadi jauh lebih panjang — cek grid 2 kolom di mobile.

### 1.4 Personalized treatments (image switcher) — `treatments.tsx`
Section title: `Personalized treatments` → **Personalized Treatments** (kapital T) ❌

Kode punya **3** kartu, brief minta **4**: ➕

| # | Kode (title / tags) | Brief Final (title / tags) | |
|---|---|---|---|
| 1 | Straighter, more balanced smile / Braces, Clear Aligners, Bite & Alignment Corrections | **For Your Perfect Smile Without Drama** / Dental Spa, Braces, Invisalign, Bleaching, Veneer and Crown, Gingivectomy, Gum depigmentation, Smile Makeover | ❌ |
| 2 | Brighter, cleaner-looking teeth / Whitening, Aesthetic Direct Restoration | **Restore Your Smile & Rise** / Full mouth rehabilitation, Removable denture, Dental implant, Fixed denture | ❌ |
| 3 | Healthy smile that lasts / Scaling, Dental Spa | **No More Pain All the Gain** / Aesthetic filling, Root canal treatment, Tooth extraction, Odontectomy, Temporomandibular joint disorder treatment | ❌ |
| 4 | — | **Helping You Raise Confident Smile** / Scaling for kids, Fluoride treatment, Pit and fissure sealant, Pulpotomy & Pulpectomy, Tooth extraction for kids, Kid's braces | ➕ |

CTA `Explore treatments` ✅

⚠️ Tags jadi jauh lebih panjang (8 item vs 3). Layout sidebar perlu dicek.
⚠️ Judul kategori 4 beda antara halaman Home (`Helping You Raise Confident Smile`) dan halaman Treatments (`Helping Your Kids Raise Confident Smile`). **Tanya klien mana yang benar.**

### 1.5 Our doctors — `doctors.tsx`
| # | Item | Kode sekarang | Brief (Final) | |
|---|---|---|---|---|
| 1 | Section title | `Our doctors` | **Our Dentists** | ❌ |
| 2 | Value 1 title | Experienced & Highly Qualified | **Highly Skilled Professionals** | ❌ |
| 3 | Value 1 body | Advanced training with years of hands-on experience. | **Tim dokter gigi berpengalaman dan berkompeten untuk menghadirkan perawatan yang tepat dan terpercaya.** | ❌ |
| 4 | Value 2 title | Professional & Patient-Focused | **Thoughtful & Personalized Care** | ❌ |
| 5 | Value 2 body | Empathetic care with integrity and clear guidance. | **Setiap perawatan dirancang secara personal sesuai kebutuhan, kenyamanan, dan lifestyle-mu.** | ❌ |
| 6 | Value 3 title | Personalized Care | **Honest Recommendations** | ❌ |
| 7 | Value 3 body | Transparent advice tailored to your needs. | **Rekomendasi perawatan yang transparan dan disesuaikan dengan kebutuhanmu.** | ❌ |
| 8 | CTA | `Meet all doctors` | **Meet all dentists** | ❌ |

### 1.6 Real transformations — `transformations.tsx`
Section title: `Real transformations` → **Smile Transformations** ❌

Kode punya 1 kartu asli + **4 placeholder** (`Treatment X` / `Description`). Brief mengisi semuanya:

| # | Kode | Brief Final (treatment / description) | |
|---|---|---|---|
| 1 | Braces / Straighter teeth, more confident smile | **Damon Braces** / Gentle, innovative alignment without the hassle. | ❌ |
| 2 | Treatment X / Description | **Metal Braces** / Align your teeth, elevate your confidence. | ❌ |
| 3 | Treatment X / Description | **Dental Crown** / Seamlessly restore the natural beauty of your smile. | ❌ |
| 4 | Treatment X / Description | **Aesthetic Filling** / Seamless fillings that blend in perfectly. | ❌ |
| 5 | Treatment X / Description | **Bleaching** / Fast, professional whitening for a radiant, brighter smile. | ❌ |

### 1.7 Limited promos (home) — `promo.tsx`
Section title: `Limited promo available` → **Special Limited Promo** ❌
CTA kartu (`PromoCard.tsx`): `Consult now` → **Konsultasi sekarang** ❌

> ✅ **SUDAH DIKERJAKAN (2026-09-15).** Dulu home punya daftar promo **hardcoded** sendiri dan
> tidak menyentuh API sama sekali — hanya `/promo` yang memanggil `getPromos()`. Sekarang keduanya
> membaca sumber yang sama: `page.tsx` memanggil `getPromos()` lalu mengoper hasilnya ke
> `<Promo promos={...}>`, dan section mengambil **3 pertama** (`HOME_PROMO_LIMIT`).
> Konsekuensinya: **11 promo di bawah ini tidak perlu ditulis di kode — cukup diinput di CMS.**
> Home otomatis menampilkan 3 teratas, `/promo` menampilkan semuanya.

Isi promo yang harus diinput ke CMS (11 item): ➕

| # | Nama | Harga coret | Harga promo | Fitur |
|---|---|---|---|---|
| 1 | Cabut Gigi Bungsu | – | Mulai dari Rp3.000.000 | Ditangani oleh spesialis bedah mulut; Treatment plan menyeluruh; Pemulihan lebih cepat |
| 2 | Special Promo Teeth Whitening | Rp3.499.000 | Mulai dari Rp1.299.000 | Ditangani dokter profesional; Aman dan nyaman; Hasil lebih cerah natural; Perawatan lengkap untuk kesehatan mulut |
| 3 | New Patient Welcome Offer | – | Tambal gigi 250K–550K · Scaling & Polishing 350K–550K · Cabut gigi 350K–550K · Bleaching mulai 999K | Ditangani oleh dokter gigi umum; Berlaku Senin–Jumat 12.00–17.00 WIB; Hanya untuk pasien baru |
| 4 | Couple Package | Rp5.300.000 | Rp2.999.000 | Ditangani oleh dokter gigi berpengalaman; Termasuk konsultasi dan pemeriksaan; Aman dan nyaman |
| 5 | Harga Khusus Pasien Ortodonti | – | Tambal gigi 450K–850K · Cabut gigi 450K–850K · Scaling 349K–559K | Treatment plan menyeluruh; Minim sakit dengan teknik yang tepat; Pemulihan lebih cepat; Ditangani oleh dokter gigi umum berpengalaman |
| 6 | Cicilan bersama **CareNow** | – | – | Bunga mulai 0%; Cicilan hingga 12x; Limit hingga 50jt |
| 7 | Scaling Promo | General Rp575.000 · Painless Rp1.020.000 | General Rp349.000 · Painless Rp850.000 | Berlaku Senin–Jumat 09.00–16.00 WIB |
| 8 | Behel Konvensional | Mulai dari Rp9.000.000 | Rp5.999.000 | Perawatan ortodonti rahang atas & bawah; Konsultasi + pemeriksaan dengan Spesialis Ortodonti; FREE cetak gigi; FREE foto intraoral & extraoral |
| 9 | Behel Self-Ligating | Mulai dari Rp18.000.000 | Rp13.999.000 | (sama dengan #8) |
| 10 | Aligner KLAR | – | Rp12.900.000 – Rp35.998.800 | (sama dengan #8, tanpa kata "ortodonti pilihan") |
| 11 | Aligner Invisalign | – | Rp55.000.000 – Rp85.000.000 | (sama dengan #10) |

⚠️ **Promo 6 (CareNow) butuh logo pihak ketiga**, bukan foto — bentuk kartunya kemungkinan beda.

> ✅ **Harga multi-baris: SUDAH DITANGANI (2026-09-15).** Keputusan: tulis **apa adanya** dari CMS.
> `PromoCard` sekarang merender `priceOriginal`/`priceCurrent` dengan `whitespace-pre-line`
> (baris baru dari CMS dipertahankan) dan otomatis mengecilkan font jadi 16px bila teks >40
> karakter. Kartu juga valid **tanpa harga sama sekali** dan **tanpa badge diskon** — keduanya
> dirender kondisional. Jadi promo seperti "Tambal gigi mulai dari 250K-550K / Scaling &
> Polishing 350K-550K / …" bisa langsung diketik di CMS tanpa mengubah komponen.

### 1.8 Insurance partners — `promo.tsx` (`INSURANCE_LOGOS`)
Section label: `We accept insurance` → **We welcome insurance claims** ❌

Kode punya **6** logo (Allianz, Zurich, BCA, CHUBB, AdMedika, AIA). Brief punya **15**: ➕

Allianz · FPG Insurance · Pacific Cross Health · Mega Insurance · Zurich · Cigna · Reliance ·
Etiqa · ACA Asuransi · Asuransi MAG · Asuransi Jasindo · BRI Life · BCA Life · Chubb · China Life

⚠️ **AdMedika dan AIA tidak ada di brief** — konfirmasi apakah dihapus.
⚠️ 9 logo baru perlu diambil; marquee harus tetap mulus dengan 15 item.

### 1.9 Facility & equipment — `facility.tsx`
Section title: `High quality equipment and facility` → **Modern equipment and facility** ❌

Kode: 6 slide (3 asli + 3 `Placeholder.png`), **tanpa caption**.
Brief: 6 foto, **masing-masing punya caption** — ini elemen UI baru: ➕

| # | Caption (Final) |
|---|---|
| 1 | A painless scaling experience designed to keep your teeth clean and your treatment comfortable. |
| 2 | DSLR Camera for accurate documentation and treatment planning. |
| 3 | A welcoming space designed for comfort while you wait. |
| 4 | An intraoral camera provides a closer look at your oral condition for a more precise examination. |
| 5 | Spacious treatment rooms equipped with dedicated dental units for a more private and comfortable dental visit. |
| 6 | Two dedicated dental units designed to provide a comfortable and efficient treatment experience. |

> ⏸️ **DIPARKIR (2026-09-15) — dicatat, belum dikerjakan.** Enam caption di atas adalah teks
> finalnya; tidak ada yang hilang dan tidak perlu buka docx lagi. Yang belum ada adalah
> **tempat menaruhnya**: prototype tidak punya caption di carousel facility sama sekali, jadi
> posisi, ukuran font, dan perilakunya di mobile belum ditentukan. Sesuai aturan pixel-perfect di
> `CLAUDE.md`, layoutnya tidak dikarang sendiri. Yang dibutuhkan untuk lanjut: acuan desain
> (overlay di atas foto / di bawah foto / di samping), atau izin eksplisit untuk memilih sendiri.

### 1.10 Patient testimonials — `testimonial.tsx`
| # | Item | Kode sekarang | Brief (Final) | |
|---|---|---|---|---|
| 1 | Section title | What our patients say | sama | ✅ |
| 2 | Quote | `So happy with my new bleached teeth. I cannot stop showing them off…` | **I've been coming here for a few years now, from braces treatment to regular dental care, and every experience has been comfortable and effective. My teeth alignment has improved so much over time. I really appreciate the doctor and staff for their friendliness and the clear information they always provide!** | ❌ |
| 3 | Nama | `Susi` / `Susi, a happy patient` | **Nurfathia Yasmin** | ❌ |
| 4 | Job title | (tidak ada) | kosong di brief | ✅ |

⚠️ Quote baru **jauh lebih panjang** (±330 karakter vs ±80). Cek tinggi kartu testimonial.

### 1.11 Bottom CTA block — `cta-block.tsx`
Headline `Ready for your new confident smile?` ✅ · CTA `Book via WhatsApp` ✅
Tidak ada perubahan copy. (Blok ini dipakai ulang di Treatments & Doctors — identik di ketiganya.)

### 1.12 Footer — `src/components/Footer.tsx`
| # | Item | Kode sekarang | Brief (Final) | |
|---|---|---|---|---|
| 1 | Alamat | Jl. Benda Raya No.5, Cilandak Timur, Pasar Minggu, Jakarta Selatan, 12560 | sama | ✅ |
| 2 | Google Maps | `https://maps.google.com/?q=Jl.+Benda+Raya...` | **https://maps.app.goo.gl/QByFmotR9vqug6gJ8** | ❌ |
| 3 | Telepon | `+62 21 7278 8888` | **+62 81 1157 7137** | ❌ |
| 4 | Email | `hello@smileconcept.id` | **`-` → hapus** | ❌ |
| 5 | Instagram | `smileconcept` | **https://www.instagram.com/smileconceptclinic/** | ❌ |
| 6 | YouTube | `@smileconcept` | **`-` → hapus ikon YouTube** | ❌ |
| 7 | Copyright | `© {tahun berjalan} Smile Concept` | © 2026 Smile Concept | ✅ (tahun dinamis, 2026) |

> ✔ **Diterapkan.** Fallback di kode sudah disamakan dengan brief: telepon `+62 81 1157 7137`,
> maps `maps.app.goo.gl/QByFmotR9vqug6gJ8`, Instagram `smileconceptclinic`. Email dan ikon YouTube
> kini **kondisional** — hanya tampil bila CMS mengisinya, sesuai tanda `-` di brief.
> Catatan saat verifikasi: yang tampil di situs masih `+6282236180971` karena **CMS menang atas
> fallback** dan isinya masih data demo. Itu perilaku yang benar; perbaikannya ada di CMS.

⚠️ Nilai-nilai ini **juga ada di CMS** (`/api/settings`) yang sekarang masih data demo
(`demo@clinic.com`, alamat Malang). Footer membaca CMS lebih dulu, fallback ke konstanta di kode.
**Sumber kebenaran sebaiknya CMS** — isi di CMS, lalu samakan fallback-nya dengan brief.

---

## 2. Treatments list — `src/app/treatments/page.tsx`

| # | Item | Kode sekarang | Brief (Final) | |
|---|---|---|---|---|
| 1 | Page title | Our Treatments | sama | ✅ |
| 2 | Intro | `Smile Concept offer a comprehensive range of dental treatments to achieve your best smile and maintain it. Each treatment plan is shaped around you, delivered by doctors who take the time to truly listen.` | **Smile Concept menghadirkan perawatan gigi menyeluruh dengan pendekatan yang personal, nyaman, dan dirancang sesuai kebutuhanmu.** | ❌ |

Kode punya **3 kategori**, brief minta **4**. Isi tiap kategori juga **diacak ulang total** —
bukan sekadar ganti judul: ➕ ❌

**Kategori 1 — For Your Perfect Smile Without Drama** (8 item)
Dental Spa (Pembersihan karang dan noda gigi minim rasa sakit) · Braces (Perawatan kawat gigi) ·
Clear Aligner (Invisalign) · Bleaching (Pemutihan gigi) · Veneer dan Crown (Mahkota tiruan) ·
Gingivectomy (Perawatan gusi estetik) · Gum depigmentation (Mencerahkan tampilan gusi) ·
Smile Makeover (Kombinasi perawatan estetik untuk senyum yang lebih harmonis)

**Kategori 2 — Restore Your Smile & Rise** (4 item)
Full mouth rehabilitation (Perbaikan gigitan) · Removable denture (Gigi tiruan lepasan) ·
Dental implant (Implan gigi) · Fixed denture (Gigi tiruan cekat)

**Kategori 3 — No More Pain All the Gain** (5 item)
Aesthetic filling (Penambalan gigi estetik) · Root canal treatment (Perawatan saluran akar) ·
Tooth extraction (Pencabutan gigi) · Odontectomy (Operasi gigi geraham bungsu) ·
Temporomandibular joint disorder treatment (Perawatan untuk sakit pada sendi rahang)

**Kategori 4 — Helping Your Kids Raise Confident Smile** (6 item) ➕
Scaling for kids (Pembersihan karang gigi anak) · Fluoride treatment (Perawatan fluoride) ·
Pit and fissure sealant (Perawatan untuk mencegah gigi berlubang) ·
Pulpotomy & Pulpectomy (Perawatan saluran akar anak) ·
Tooth extraction for kids (Pencabutan gigi anak) · Kids braces (Kawat gigi anak)

⚠️ Kode sekarang menaruh Dental Spa/Bleaching/Aesthetic Filling di kategori 2 dan Removable/Fixed
denture + Dental implant di kategori 3. **Pengelompokannya salah total** menurut brief.
⚠️ Typo di kode yang hilang di brief: `Operasi gigi geraham bisu` → brief: **bungsu**;
`Flouride` → brief: **Fluoride**.

Bottom CTA block: tidak berubah ✅

---

## 3. Treatment detail — `src/lib/data/treatment-detail.ts`

Kode punya **1** halaman (`braces`). Brief punya **23** halaman. ➕

Struktur tiap halaman di brief: nama · deskripsi · 2 metadata (durasi) · CTA `Jadwalkan konsultasi` ·
section `Proven Results` dengan 3 caption before/after.

### 3.1 Braces (satu-satunya yang sudah ada)
| # | Item | Kode sekarang | Brief (Final) | |
|---|---|---|---|---|
| 1 | Nama | Braces | sama | ✅ |
| 2 | Deskripsi | `A precise treatment that aligns teeth and corrects bite issues to enhance function, comfort, and aesthetics through a customized, gradual process.` | **Perawatan ortodonti untuk merapikan gigi secara bertahap, disesuaikan dengan kebutuhan dan kenyamanan setiap pasien.** | ❌ |
| 3 | Metadata | 12-24 months · Monthly adjustments | sama | ✅ |
| 4 | Section title | `Proven results` | **Proven Results** | ❌ |
| 5 | Caption 1 | `13 weeks progress` | **4-month Damon Braces Progress** | ❌ |
| 6 | Caption 2 | `13 weeks progress` | **7-month Metal Braces Progress** | ❌ |
| 7 | Caption 3 | `13 weeks progress` | **13-month Damon Braces Progress** | ❌ |
| 8 | CTA | `jadwalkan konsultasi` | **Jadwalkan konsultasi** (kapital J) | ❌ |

### 3.2 Halaman yang belum ada (22) ➕
Painless Scaling · Invisalign · Bleaching · Veneer dan Crown · Gingivectomy · Gum Depigmentation ·
Smile Makeover · Full Mouth Rehabilitation · Removable Denture · Dental Implant · Fixed Denture ·
Aesthetic Filling · Root Canal Treatment · Tooth Extraction · Odontectomy ·
Temporomandibular Joint Disorder Treatment · Scaling for Kids · Fluoride Treatment ·
Pit and Fissure Sealant · Pulpotomy & Pulpectomy · Tooth Extraction for Kids · Kids Braces

⚠️ Penomoran di docx melompati "Treatment 5" — jadi 24 heading tapi **23 treatment**. Bukan ada yang hilang.
⚠️ Daftar treatment **detail** tidak sama persis dengan daftar di halaman **list**:
detail punya `Painless Scaling`, list punya `Dental Spa`. Perlu dipetakan agar link slug konsisten.

---

## 4. Doctors list — `src/app/doctors/page.tsx` + `src/lib/data/doctor-list.ts`

| # | Item | Kode sekarang | Brief (Final) | |
|---|---|---|---|---|
| 1 | Page title | `Our caring doctors` | **Our dedicated dentists** | ❌ |

11 dokter, **nama semua sudah benar** ✅ — tapi **specialty semuanya masih generik** `Dokter Gigi`.
Brief memberi spesialisasi per dokter: ❌

| Dokter | Kode | Brief (Final) |
|---|---|---|
| drg. Kalya Putri, Sp.KG | Dokter Gigi | **Dokter gigi spesialis konservasi gigi** |
| drg. Lidya Wati Budhy, Sp.Ort | Dokter Gigi | **Dokter gigi spesialis ortodonti** |
| drg. Grestyasanti Wimasan, Sp.KG | Dokter Gigi | **Dokter gigi spesialis konservasi gigi** |
| drg. Ines Augustina S, Sp.Perio | Dokter Gigi | **Dokter gigi spesialis periodonsia** |
| drg. Awaludin Wibawa, Sp.BM | Dokter Gigi | **Dokter gigi spesialis bedah mulut** |
| drg. Albar Abshar Muhamad, Sp.Pros | Dokter Gigi | **Dokter gigi spesialis prostodonti** |
| drg. Benazir Amriza Dini, Sp.Ort. | Dokter Gigi | **Dokter gigi spesialis ortodonti** |
| drg. Kartika Devy | Dokter Gigi | **Dokter gigi umum** |
| drg. Julia Dharmawan | Dokter Gigi | **Dokter gigi umum** |
| drg. Kevin Brianshah | Dokter Gigi | **Dokter gigi umum** |
| drg. Qaiszara Puspadewi | Dokter Gigi | **Dokter gigi umum** |

CTA kartu `Lihat profil & jadwal` ✅

⚠️ **Ada kekacauan penomoran di docx.** Baris "Doctor 11 name" berisi *Benazir* di kolom Final,
sementara "Doctor 7 name" berisi *Qaiszara* — tertukar dari kolom Exploration, dan baris CTA-nya
ikut tertukar (`Doctor 7 CTA` muncul di blok Doctor 11). **Nama + gelarnya sendiri tidak ambigu**,
jadi tabel di atas aman.
> ✔ **Urutan ternyata sudah benar.** Label barisnya (`Doctor 7` = Qaiszara, `Doctor 11` = Benazir)
> persis sama dengan urutan di `doctor-list.ts`. Yang berantakan hanya posisi fisik baris di docx,
> bukan datanya. Tidak ada perubahan urutan yang perlu dilakukan.

---

## 5. Doctor detail — `src/lib/data/doctor-detail.ts`

Kode punya **1** profil (`kalya`). Brief punya **11**. ➕

### 5.1 Kalya (satu-satunya yang ada)
| # | Item | Kode sekarang | Brief (Final) | |
|---|---|---|---|---|
| 1 | Nama | drg. Kalya Putri, Sp.KG | sama | ✅ |
| 2 | Title | `Dokter Gigi` | **Dokter gigi spesialis konservasi gigi** | ❌ |
| 3 | Jadwal | Senin 10:00–14:00 · Jumat 15:00–18:00 | sama | ✅ |
| 4 | Pendidikan | 3 baris (UI 2012, UI 2012, Sp.KG UI 2024) | **2 baris**: Pendidikan Kedokteran Gigi UI (**2014**) · Pendidikan Kedokteran Gigi Spesialis Konservasi Gigi UI (2024) | ❌ |
| 5 | Keahlian | 5 item, diawali `Pengobatan gigi sensitif` | **5 item, diawali `Pemeriksaan dan konsultasi`**, sisanya kapitalisasi berubah (Pengobatan Gigi Sensitif, Penambalan Gigi Estetik, Perawatan Saluran Akar, "Dental Crown, Veneer, Bleaching, Smile Makeover") | ❌ |
| 6 | CTA | Jadwalkan konsultasi | sama | ✅ |

⚠️ Tahun lulus berubah **2012 → 2014** dan satu baris pendidikan dihapus. Ini data faktual orang
sungguhan — pakai angka dari brief, jangan dari kode lama.

### 5.2 Profil yang belum ada (10) ➕
Lidya · Grestyasanti · Ines · Awaludin · Albar · Benazir · Kartika · Julia · Kevin · Qaiszara
(masing-masing: nama, title, jadwal, pendidikan, keahlian, CTA — detail per dokter ada di docx
baris 1058–1266; belum saya salin ke sini karena panjang, ~20 baris per dokter)

---

## 6. Promo page — `src/app/promo/page.tsx`

| # | Item | Kode sekarang | Brief (Final) | |
|---|---|---|---|---|
| 1 | Page title | `Promo available` | **Special Promo Offers** | ❌ |
| 2 | CTA kartu | `Consult now` | **Konsultasi sekarang** | ❌ |

Brief hanya mengisi **2 promo** di halaman ini (slot 3–9 kosong):

| # | Nama | Diskon | Harga coret | Harga promo | Fitur |
|---|---|---|---|---|---|
| 1 | **Promo Metal Signature Braces** | 38% off | Rp12.999.000 | Rp7.999.000 | Ditangani oleh spesialis ortodonti; Free konsultasi untuk 10 pasien pertama; Free cetak gigi; Cicilan 0% dengan Blibli |
| 2 | **Promo Behel Metal Classic** | 40% off | Rp9.999.000 | Rp5.999.000 | Ditangani oleh spesialis ortodonti; Free konsultasi; Cicilan 0% dengan Blibli |

> ✅ **Konflik Home-vs-Promo: TERSELESAIKAN (2026-09-15).** Keputusan user: home menampilkan
> **3 promo saja**, diambil dari sumber yang sama dengan halaman ini. Home dan `/promo` kini
> sama-sama membaca `getPromos()`; home hanya memotong 3 teratas. Tidak ada lagi dua daftar promo
> terpisah di kode.

⚠️ **Yang masih perlu diputuskan klien: isi daftarnya.** Docx memberi dua set berbeda — 11 promo
di bagian Home dan 2 promo di halaman Promo. Karena keduanya kini satu sumber, harus ada **satu
daftar** di CMS. Kemungkinan besar 11 promo Home itulah daftar lengkapnya dan 2 promo di sini
adalah yang ingin tampil lebih dulu, tapi ini **dugaan** — perlu konfirmasi.

⚠️ Semua promo diinput lewat **CMS** (`/api/promos`), yang saat ini masih kosong sehingga situs
jatuh ke fallback statis dari prototype. Selama CMS kosong, promo di brief tidak akan tampil.

---

## 7. Blog — `src/app/blog/`

| # | Item | Kode sekarang | Brief (Final) | |
|---|---|---|---|---|
| 1 | Page title | Blog | Blog | ✅ |
| 2 | Kartu post | dari CMS | **kolom Final kosong semua** | — |

Brief tidak memberi konten blog apa pun (semua slot Post 1–6 kosong di kolom Final; kolom
Exploration hanya berisi contoh dummy "What to Expect During Braces Treatment").
**Blog sepenuhnya dikelola lewat CMS** — tidak ada yang perlu dikerjakan di kode.

---

## Ringkasan beban kerja

| Area | Ganti copy | Item baru |
|---|---|---|
| Home | 26 teks | +1 kartu treatment, +9 logo asuransi, +6 caption facility (promo → via CMS) |
| Treatments list | 2 teks | +1 kategori, seluruh 23 item ditata ulang |
| Treatment detail | 8 teks (braces) | **+22 halaman** |
| Doctors list | 1 teks + 11 specialty | — |
| Doctor detail | 5 teks (kalya) | **+10 profil** |
| Promo | 2 teks | seluruh promo diinput di CMS |
| Blog | — | — |

## Yang harus ditanyakan ke klien sebelum dikerjakan

1. ~~**Promo Home (11) vs Promo page (2)**~~ → **Terjawab**: home ambil 3, satu sumber lewat API.
   Sisa pertanyaan: **daftar lengkapnya yang mana** yang diinput ke CMS?
2. **Caption carousel facility** — teks sudah dicatat (bagian 1.9), tapi butuh acuan desain
   penempatannya. Diparkir.
3. ~~**Promo tanpa harga tunggal**~~ → **Terjawab**: ditulis apa adanya dari CMS, kartu sudah
   mendukung teks multi-baris, tanpa harga, dan tanpa badge.
4. **Promo CareNow** — butuh logo pihak ketiga, bukan foto pasien.
5. **Judul kategori 4** — masih beda antar halaman. **Diterapkan apa adanya sesuai brief per halaman**: home memakai `Helping You Raise Confident Smile`, `/treatments` memakai `Helping Your Kids Raise Confident Smile`. Perlu konfirmasi apakah memang disengaja.
6. ~~**Urutan dokter 7 & 11**~~ → **Terjawab**: label docx sudah cocok dengan urutan di kode.
7. **AdMedika & AIA** — ada di kode, tidak ada di daftar 15 logo brief. Dihapus?
8. **Painless Scaling vs Dental Spa** — penamaan beda antara halaman list dan detail.
9. **Badge diskon** — tidak satu pun promo home punya persentase, padahal kartu menonjolkannya.

# BNSP Certificate Checker

![BNSP Checker](https://i.ibb.co.com/V0YDQhGd/Screenshot-From-2026-06-26-11-40-40.png)

## 📖 Deskripsi
**BNSP Certificate Checker** adalah aplikasi web berbasis Laravel dan Tailwind CSS untuk memverifikasi keaslian dan validitas sertifikat kompetensi BNSP. Aplikasi ini terintegrasi langsung dengan API resmi dari **LSP Digital Indonesia** dan menyajikan data secara real-time.

Aplikasi ini menggunakan pendekatan proxy berbasis server (melalui Laravel Http Client) untuk mengatasi masalah *CORS (Cross-Origin Resource Sharing)* yang muncul jika frontend melakukan *direct fetching* ke server eksternal, sekaligus menyajikan tampilan antarmuka (UI) kelas premium dan responsif.

---

## ✨ Fitur Utama
- **Pencarian Real-time**: Temukan pemegang sertifikat berdasarkan nama dengan sangat cepat.
- **Auto-Load & Pagination**: Secara otomatis memuat data terbaru saat halaman dibuka dan dilengkapi dengan sistem paginasi yang dinamis.
- **Detail Lengkap (Slide Drawer)**: Klik pada nama pemegang sertifikat untuk memunculkan panel detail (drawer) yang interaktif, berisi data profil, asesmen, lokasi, hingga status (Aktif/Kadaluarsa).
- **Premium UI/UX**: Desain modern menggunakan teknik *glassmorphism*, ambient background, micro-animations, dan *Skeleton loading* (shimmer) yang mulus.
- **Server-Side Proxy**: Aman dari kendala CORS di browser karena request di-*proxy* oleh backend Laravel.

---

## 🛠️ Teknologi yang Digunakan
- **Backend:** Laravel 13.x (PHP 8.4+)
- **Frontend:** HTML, Vanilla JavaScript, Laravel Blade
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Bundler:** Vite

---

## ⚙️ Prasyarat
Sebelum menginstal aplikasi ini, pastikan sistem Anda sudah terpasang perangkat lunak berikut:
- **PHP** >= 8.4+
- **Composer**
- **Node.js** & **NPM**

---

## 🚀 Instalasi & Cara Menjalankan

Ikuti langkah-langkah berikut untuk menjalankan aplikasi di komputer lokal (Localhost):

1. **Clone Repositori**
   ```bash
   git clone <url-repo-anda>
   cd bnsp-checker-app
   ```

2. **Install Dependensi Backend (PHP)**
   ```bash
   composer install
   ```

3. **Install Dependensi Frontend (NPM)**
   ```bash
   npm install
   ```

4. **Konfigurasi Environment**
   Duplikat file konfigurasi dan generate kunci aplikasi:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Build Asset Tailwind CSS**
   Jalankan perintah ini untuk mem-build *utility classes* Tailwind ke dalam file CSS:
   ```bash
   npm run build
   ```
   *(Atau gunakan `npm run dev` jika Anda ingin melakukan perubahan pada mode pengembangan)*

6. **Jalankan Laravel Server**
   ```bash
   php artisan serve
   ```

7. **Buka Aplikasi di Browser**
   Akses url: [http://localhost:8000](http://localhost:8000)

---

## 📂 Struktur Folder Penting

Berikut adalah direktori dan file kunci dalam aplikasi ini yang telah dimodifikasi:

- `resources/views/pages/app/index.blade.php`: Halaman utama UI, integrasi Tailwind classes, serta file yang memuat semua logika DOM manipulation, Fetch API, dan Event Listeners di dalam `@push('scripts')`.
- `resources/views/components/layouts/app.blade.php`: File layout dasar Blade yang menggunakan directive `@vite` serta `@stack` untuk assets.
- `resources/css/app.css`: Konfigurasi base CSS Tailwind v4, termasuk custom root CSS, animasi `@keyframes` dan komponen (skeleton, drawer, glow).
- `app/Http/Controllers/BnspProxyController.php`: Controller utama Laravel sebagai *proxy* untuk meneruskan *request* dari Frontend ke API LSP Digital.
- `routes/web.php`: Berisi definisi *routing* web dan local endpoint `/api/sertifikat`.
- `vite.config.js`: Konfigurasi *bundler* dengan integrasi plugin `@tailwindcss/vite` di posisi *top-level* untuk memproses syntax CSS.

---

## 🌐 Dokumentasi API (Local Proxy)

Aplikasi ini tidak melakukan request langsung ke `lspdigital.id` dari browser. Sebaliknya, aplikasi memanggil endpoint lokal berikut:

- **Daftar Pemegang Sertifikat**
  `GET /api/sertifikat`
  Menerima *Query Parameters* seperti `search`, `page`, `dir`, `column`, dll.
  
- **Detail Spesifik Sertifikat**
  `GET /api/sertifikat/{id}`
  Mengambil informasi detail pemegang sertifikat berdasarkan ID.

Data secara transparan diteruskan (di-*proxy*) oleh `BnspProxyController` menuju sumber asli API (`https://lspdigital.id/api/v1/public-pemegang-sertifikat`).

---

## 📝 Lisensi
Proyek ini bersifat open-source dan dirilis di bawah [MIT License](https://opensource.org/licenses/MIT).

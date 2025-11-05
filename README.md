                                TemuCipayung - Direktori Digital UMKM Setu Cipayung

Selamat datang di TemuCipayung, sebuah prototipe front-end untuk website direktori digital yang didedikasikan untuk Usaha Mikro, Kecil, dan Menengah (UMKM) di area Kelurahan Setu, Kecamatan Cipayung, Jakarta Timur. Proyek ini bertujuan memudahkan warga dan pengunjung menemukan serta mendukung bisnis-bisnis lokal yang luar biasa di lingkungan sekitar.

Anggap saja ini sebagai "Google Maps"-nya UMKM untuk Cipayung!

✨ Fitur Utama & Penjelasan Halaman
Proyek ini dibagi menjadi beberapa halaman utama, masing-masing dengan fungsionalitas spesifik:

1. / (Halaman Utama)
   Halaman selamat datang yang menjadi gerbang utama.

- Hero Section: Menampilkan image carousel full-screen dengan overlay teks dan tombol ajakan "Mulai Menjelajah" (yang mengarah ke /Games).

- Navbar Transparan: Navbar yang awalnya transparan akan berubah menjadi solid putih (bg-white) saat pengguna melakukan scroll ke bawah.

- Tentang Kami: Penjelasan Visi & Misi dengan layout grid responsif dan gambar (object-contain) agar tidak terpotong.

- Mitra Kami: Menampilkan slider logo mitra yang bergerak otomatis (infinite scroll) dan dapat di-pause saat hover.

- Testimoni: Grid 4 kolom yang menampilkan testimoni dari pelaku UMKM.

- Peta Lokasi: Embed Google Maps yang menunjukkan lokasi Kelurahan Setu.

- FAQ: Komponen accordion interaktif yang bisa dibuka dan ditutup.

- Animasi: Seluruh section dianimasikan menggunakan AOS (Animate on Scroll) untuk efek fade-up, fade-left, dan fade-right.

2. /umkm (Direktori UMKM)
   Halaman inti dari aplikasi, tempat pengguna menjelajahi semua UMKM.

- Grid Responsif: Menampilkan semua UMKM dalam layout grid-cols-3 (di desktop) dan grid-cols-1 (di mobile). Ketinggian kartu disamakan menggunakan grid-auto-rows-1fr dan h-full.

- Filter & Search Bar (Sticky): Bar pencarian dan tombol filter kategori (Kuliner, Fashion, Jasa) yang akan "menempel" di bawah navbar saat di-scroll.

- Pencarian Real-time: Pengguna dapat mengetik nama UMKM atau kata kunci "Promo" untuk memfilter daftar secara instan.

- Kartu UMKM (UMKMCard): Setiap kartu dibungkus dengan background frame (frame.svg). Gambar UMKM di dalamnya menggunakan object-contain agar tidak terpotong (tidak di-zoom).

3. /umkm/[id] (Halaman Detail UMKM)
   Halaman dinamis yang menampilkan informasi lengkap satu UMKM.

- Galeri Foto: Menampilkan 3 foto pertama dengan tombol "Lihat Semua Foto" untuk membuka sisa galeri. Gambar di sini juga menggunakan object-contain agar tidak terpotong.

- Menu & Layanan: Daftar menu/jasa yang ditawarkan oleh UMKM.

- (Simulasi) Keranjang Belanja: Fungsionalitas useState untuk menambah, menghapus, dan menghitung total item dari menu.

- Sidebar Sticky: Sidebar di sebelah kanan (pada desktop) akan "menempel" saat di-scroll, berisi deskripsi "Tentang Kami", alamat, dan tombol "Hubungi".

- Ulasan: Menampilkan mock data ulasan dan form (simulasi) untuk mengirim ulasan baru.

4. /berita (Halaman Berita)
   Halaman yang berisi artikel dan tips terkait UMKM.

- Filter Kategori: Memfilter artikel berdasarkan kategori (Marketing, Branding, Keuangan, dll.).

- Grid Artikel: Tampilan kartu (ArticleCard) yang responsif, masing-masing dengan gambar object-contain agar tidak terpotong.

- Link Eksternal: Setiap artikel akan mengarah ke link sumber aslinya di tab baru.

5. /events (Halaman Event)
   Menampilkan acara yang akan datang atau sedang berlangsung.

- Pagination Ganda: Terdapat dua section ("Sedang Berlangsung" dan "Mendatang"), masing-masing dengan sistem pagination-nya sendiri (3 kartu per halaman).

- Modal Pendaftaran: Tombol "Daftar" pada event mendatang akan membuka popup (modal) formulir pendaftaran.

- Kartu Event: Didesain agar responsif dan menggunakan object-contain untuk gambar agar tidak terpotong.

6. /Games (Halaman Kuis Interaktif)
   Halaman gamifikasi untuk mengedukasi pengguna tentang UMKM.

- Musik Latar: Komponen <BackgroundAudioPlayer> otomatis dimuat dan hanya muncul di halaman ini, memberikan suasana imersif.

- Layout Full-screen: Setiap section (Header, Pertanyaan 1, 2, 3, dan Penutup) mengisi 100% tinggi layar (h-screen atau min-h-screen).

- Kuis Interaktif: Kotak kuis semi-transparan (backdrop-blur) yang muncul di sisi kanan/kiri secara bergantian di atas background full-screen yang berbeda-beda.

- Mouse Follower: Efek pointer kustom yang mengikuti kursor pengguna (hanya di desktop).

7. /panduan-daftar (Halaman Pendaftaran)
   Form untuk pemilik UMKM mendaftarkan usahanya.

- Form Multi-Langkah: Form pendaftaran 4 langkah yang terorganisir.

- Progress Bar Responsif: Menggunakan progress bar horizontal di desktop dan tampilan "Langkah 1 dari 4" yang simpel di mobile agar tidak berantakan.

- Validasi Real-time: Pengecekan input (seperti inputMode="numeric" untuk telepon) untuk memandu pengguna.

🚀 Teknologi yang Digunakan
Framework: Next.js (App Router)

- Bahasa: TypeScript

- Styling: Tailwind CSS

- Animasi: AOS (Animate on Scroll)

- kon: Lucide React

- Notifikasi (Toast): Sonner

- Package Manager: npm

⚙️ Cara Instalasi dan Menjalankan
Ikuti langkah-langkah berikut untuk menjalankan proyek ini di komputer lokal Anda:

Prasyarat:

- Node.js (Versi 18.x atau lebih baru)

- npm (terinstal bersama Node.js)

Langkah Instalasi:

1. Clone Repository: git clone https://github.com/iqytamaa/UMKM-Cipayung.git

2. Masuk ke Direktori Proyek: cd UMKM-Cipayung
`
3. Install Dependencies: Jalankan perintah berikut untuk mengunduh semua package yang dibutuhkan: npm install

4. Menjalankan Server Development: npm run dev

Server akan berjalan di http://localhost:3000. Buka alamat tersebut di browser Anda.

Aplikasi akan berjalan dan otomatis ter-refresh (hot reload) setiap Anda menyimpan perubahan pada kode.

📁 Struktur Folder
/direktori-umkm-cipayung
│
├── /public/
│ ├── /Games/ (Gambar untuk kuis)
│ ├── /Home/ (Gambar untuk homepage)
│ ├── /Mitra/ (Gambar logo mitra)
│ ├── /UMKM/ (Gambar untuk setiap UMKM)
│ └── ... (favicon.ico, dll)
│
├── /src/
│ ├── /app/
│ │ ├── /components/ (Komponen re-usable)
│ │ │ ├── ArticleCard.tsx
│ │ │ ├── EventCard.tsx
│ │ │ ├── Footer.tsx
│ │ │ ├── Navbar.tsx
│ │ │ ├── UMKMCard.tsx
│ │ │ └── ...
│ │ ├── /berita/
│ │ │ └── page.tsx
│ │ ├── /events/
│ │ │ └── page.tsx
│ │ ├── /Games/
│ │ │ └── page.tsx
│ │ ├── /panduan-daftar/
│ │ │ └── page.tsx
│ │ ├── /umkm/
│ │ │ ├── /[id]/
│ │ │ │ └── page.tsx (Halaman Detail)
│ │ │ └── page.tsx (Halaman Grid)
│ │ ├── globals.css
│ │ ├── layout.tsx (Layout utama dengan Navbar & Footer)
│ │ └── page.tsx (Halaman Utama / Homepage)
│ ├── /data/
│ │ └── umkm.ts (Data utama aplikasi)
│ ├── /hooks/
│ │ └── use-toast.ts (Hook untuk notifikasi)
│
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.js
├── README.md (File ini)
└── tailwind.config.ts

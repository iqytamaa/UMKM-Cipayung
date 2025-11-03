    <<<<<<< HEAD
    # TemuCipayung - Direktori Digital UMKM Setu Cipayung

    Selamat datang di TemuCipayung, sebuah prototipe *front-end* untuk website direktori digital yang didedikasikan untuk Usaha Mikro, Kecil, dan Menengah (UMKM) di area Kelurahan Setu, Kecamatan Cipayung, Jakarta Timur. Proyek ini bertujuan memudahkan warga dan pengunjung menemukan serta mendukung bisnis-bisnis lokal yang luar biasa di lingkungan sekitar.

    Anggap saja ini sebagai "Google Maps"-nya UMKM untuk Cipayung!

    ## ✨ Fitur Utama

    * **Homepage:** Halaman selamat datang dengan visi & misi, serta *hero section* menarik menampilkan suasana Cipayung (dengan *image carousel*).
    * **Direktori UMKM:** Menampilkan daftar UMKM (Kuliner, Fashion, Jasa & Lainnya) dalam format *grid*.
    * **Pencarian:** Cari UMKM berdasarkan nama.
    * **Filter Kategori:** Saring UMKM berdasarkan kategori (Kuliner, Fashion, Jasa & Lainnya).
    * **Halaman Detail UMKM:** Halaman individual untuk setiap UMKM, menampilkan:
        * Nama, Deskripsi/Cerita
        * Alamat Lengkap
        * Galeri Foto (Menampilkan 3 foto awal, bisa diperluas)
        * Peta Lokasi Interaktif (Embed Google Maps)
        * Informasi Tambahan (di *sidebar*)
    * **Halaman Berita:** (Placeholder) Menampilkan artikel dan berita terkait UMKM.
    * **Halaman Events:** Menampilkan daftar *upcoming* dan *ongoing events* dengan kartu interaktif dan filter kategori. Termasuk fitur *modal* pendaftaran (simulasi).
    * **Halaman Panduan Daftar:** (Placeholder) Informasi cara mendaftarkan UMKM.
    * **Desain Responsif:** Tampilan dioptimalkan untuk berbagai ukuran layar (desktop, tablet, mobile).

    ## 🚀 Teknologi yang Digunakan

    * **Framework:** [Next.js](https://nextjs.org/) (dengan App Router)
    * **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
    * **Styling:** [Tailwind CSS](https://tailwindcss.com/)
    * **Ikon:** [Lucide React](https://lucide.dev/)
    * **Package Manager:** npm (atau yarn)
    * **Deployment:** (Belum ditentukan, bisa Vercel, Netlify, dll.)

    ## ⚙️ Cara Instalasi dan Menjalankan

    Ikuti langkah-langkah berikut untuk menjalankan proyek ini di komputer lokal Anda:

    **Prasyarat:**

    * Node.js (Versi 18.x atau lebih baru direkomendasikan)
    * npm (biasanya terinstal bersama Node.js) atau Yarn

    **Langkah Instalasi:**

    1.  **Clone Repository (jika ada):**
        ```bash
        git clone [https://www.fda.gov/drugs/types-applications/abbreviated-new-drug-application-anda](https://www.fda.gov/drugs/types-applications/abbreviated-new-drug-application-anda)
        cd direktori-umkm-cipayung
        ```
        *Jika Anda mengunduh kode sebagai ZIP, unzip dan buka foldernya di terminal.*

    2.  **Masuk ke Direktori Proyek:**
        Pastikan Anda berada di direktori utama proyek (`direktori-umkm-cipayung`) di terminal Anda.
        ```bash
        cd direktori-umkm-cipayung
        ```

    3.  **Install Dependencies:**
        Jalankan perintah berikut untuk mengunduh semua *package* yang dibutuhkan:
        ```bash
        npm install
        ```
        *(Jika Anda menggunakan Yarn, gunakan `yarn install`)*

    **Menjalankan Server Development:**

    1.  Setelah instalasi selesai, jalankan perintah berikut untuk memulai server pengembangan Next.js:
        ```bash
        npm run dev
        ```
        *(Jika Anda menggunakan Yarn, gunakan `yarn dev`)*

    2.  Server akan berjalan (biasanya di `http://localhost:3000`). Buka alamat tersebut di browser Anda.

    3.  Anda sekarang bisa melihat aplikasi berjalan. Setiap perubahan yang Anda simpan di kode akan otomatis ter-refresh di browser (*hot reload*).

    ## 📁 Struktur Folder dan Alur File

    **Alur Kerja Utama:**

    1.  **Request Masuk:** Pengguna mengakses URL (misal: `/umkm`).
    2.  **Next.js Routing:** Next.js mencocokkan URL dengan struktur folder di `/app`. `/umkm` akan diarahkan ke `src/app/umkm/page.tsx`.
    3.  **Layout:** Komponen `src/app/layout.tsx` akan "membungkus" semua halaman. Di sinilah `Navbar` dan `Footer` ditampilkan.
    4.  **Halaman (Page):** Komponen `page.tsx` di dalam folder rute (misal: `src/app/umkm/page.tsx`) akan dirender di dalam `layout.tsx`.
    5.  **Komponen:** Halaman (`page.tsx`) akan menggunakan komponen-komponen dari `src/components` (seperti `UMKMCard`) untuk membangun UI.
    6.  **Data:** Komponen atau halaman akan meng-import data dari `src/data/umkm.ts` untuk ditampilkan.
    7.  **Styling:** Style diterapkan melalui kelas-kelas Tailwind CSS yang didefinisikan di `tailwind.config.js` dan dimuat via `globals.css`.
    8.  **Aset Statis:** Gambar yang dirujuk dengan path `/images/...` akan diambil dari folder `public/images/`.
    =======
    # UMKM-Cipayung
    >>>>>>> 283175b319089f4e8156aa45d78f46af38054de6

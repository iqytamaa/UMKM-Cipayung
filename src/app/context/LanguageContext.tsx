"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react'

type Language = 'id' | 'en'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const translations = {
  id: {
    // === NAVBAR ===
    home: "Beranda",
    umkm: "UMKM",
    news: "Berita",
    events: "Acara",
    register: "Daftarkan Usahamu",
    
    // === HERO SECTION (HOME) ===
    hero_title: "Jelajahi & Dukung Bisnis Lokal Setu Cipayung",
    hero_subtitle: "Platform digital untuk menemukan dan terhubung dengan usaha-usaha kreatif di Setu Cipayung.",
    explore: "Mulai Menjelajah",
    
    // === ABOUT SECTION ===
    about: "Tentang Kami",
    about_desc: "Kami berkomitmen memberdayakan UMKM lokal Setu, Cipayung melalui platform digital yang inovatif dan inklusif.",
    vision: "Visi Kami",
    vision_desc: "Menjadi direktori digital terdepan untuk UMKM Setu Cipayung yang modern dan berdaya saing.",
    mission: "Misi Kami",
    mission_desc: "Meningkatkan visibilitas dan memfasilitasi kolaborasi UMKM Setu Cipayung.",
    
    // === PARTNERS & TESTIMONIALS ===
    partners: "Mitra Kami",
    partners_desc: "Kami berkolaborasi dengan berbagai organisasi dan bisnis untuk mendukung pertumbuhan UMKM Cipayung.",
    testimonials: "Testimoni Warga & Pelaku UMKM",
    testimonials_desc: "Dengarkan cerita sukses dari mereka yang telah merasakan manfaat platform kami.",
    testimoni_1_text: "Platform ini sangat membantu bisnis saya. Banyak pelanggan baru menemukan warung saya dari sini. Terima kasih!",
    testimoni_2_text: "Sejak ada direktori ini, laundry saya jadi lebih ramai. Senang bisa bantu warga Cipayung tampil rapi setiap hari.",
    testimoni_3_text: "Inisiatif bagus! Warung pecel lele saya jadi lebih gampang ditemukan pelanggan baru. Komunitas UMKM Cipayung jadi lebih solid!",
    testimoni_4_text: "Direktori ini memudahkan warga menemukan jasa tambal ban saya. Bisnis jadi lancar, pelanggan pun puas!",

    // === MAP & FAQ ===
    map_title: "Jelajahi Peta UMKM Setu Cipayung",
    map_desc: "Temukan lokasi UMKM unggulan di Kelurahan Setu, Kecamatan Cipayung, Jakarta Timur. Peta interaktif ini memandu Anda mendukung bisnis lokal.",
    map_center: "Pusat Informasi (Kantor Kelurahan Setu)",
    open_maps: "Buka di Google Maps",
    faq: "Pertanyaan yang Sering Diajukan",
    faq_desc: "Temukan jawaban atas pertanyaan umum tentang direktori kami.",
    faq_q1: "Bagaimana cara mendaftar UMKM saya di direktori ini?",
    faq_a1: "Anda dapat mendaftar UMKM Anda melalui halaman 'Panduan Daftar' dengan mengisi formulir lengkap tentang bisnis Anda. Tim kami akan memverifikasi data Anda dalam 1-2 hari kerja.",
    faq_q2: "Apakah ada biaya untuk mendaftar?",
    faq_a2: "Tidak ada biaya sama sekali! Pendaftaran di Direktori UMKM Cipayung sepenuhnya gratis. Kami berkomitmen untuk mendukung UMKM lokal.",
    faq_q3: "Bagaimana cara menghubungi UMKM yang terdaftar?",
    faq_a3: "Informasi kontak (telepon, alamat) tersedia di halaman detail setiap UMKM. Anda dapat menghubungi mereka langsung.",
    faq_q4: "Bisakah saya mengedit informasi UMKM saya setelah mendaftar?",
    faq_a4: "Ya, Anda dapat mengedit informasi UMKM Anda kapan saja melalui dashboard akun Anda setelah login.",
    faq_q5: "Bagaimana cara menjadi mitra atau sponsor?",
    faq_a5: "Kami terbuka untuk kerjasama. Silakan hubungi tim kami melalui halaman kontak atau email untuk diskusi lebih lanjut.",

    // === HALAMAN UMKM (LIST) ===
    umkm_page_title: "Direktori UMKM Setu Cipayung",
    umkm_page_desc: "Jelajahi dan dukung bisnis lokal berkualitas di lingkungan kita.",
    umkm_search_placeholder: "Cari UMKM atau ketik 'Promo'...",
    umkm_category_all: "Semua",
    cat_kuliner: "Kuliner",
    cat_fashion: "Fashion",
    cat_jasa: "Jasa & Lainnya",
    umkm_btn_show_more: "Lihat Selengkapnya",
    umkm_btn_show_less: "Tampilkan Lebih Sedikit",
    umkm_not_found_title: "UMKM tidak ditemukan",
    umkm_not_found_desc: "Coba ubah kata kunci pencarian atau filter kategori Anda.",
    umkm_view_detail: "Lihat Detail",
    umkm_price: "Harga",
    umkm_address: "Alamat",
    umkm_promo: "Promo Tersedia",
    umkm_menu: "Menu Unggulan",
    
    // === HALAMAN UMKM (DETAIL) ===
    detail_back: "Kembali ke Direktori",
    detail_gallery: "Galeri Foto",
    detail_menu: "Menu & Layanan",
    detail_cart: "Keranjang Pesanan",
    detail_location: "Lokasi Kami",
    detail_contact: "Hubungi UMKM Ini",
    detail_reviews: "Ulasan Pelanggan",
    detail_write_review: "Tulis Ulasan",
    detail_close: "Tutup",
    detail_your_name: "Nama Anda",
    detail_name_placeholder: "Masukkan nama Anda",
    detail_rating: "Rating",
    detail_review_label: "Ulasan",
    detail_review_placeholder: "Bagikan pengalaman Anda...",
    detail_send_review: "Kirim Ulasan",
    detail_no_reviews: "Belum ada ulasan.",
    detail_menu_empty: "Menu belum tersedia.",
    detail_cart_empty: "Keranjang Anda masih kosong.",
    detail_add: "Tambah",
    detail_total: "Total",
    detail_checkout: "Checkout",
    detail_processing: "Memproses Pembayaran...",
    detail_wait: "Mohon tunggu sebentar.",
    detail_success: "Pembayaran Berhasil!",
    detail_success_desc: "Terima kasih telah memesan. Silakan hubungi UMKM.",
    detail_see_all_photos: "Lihat Semua Foto",
    detail_added_cart: "Ditambahkan!",
    detail_added_desc: "masuk keranjang.",
    detail_removed: "Dihapus",
    detail_removed_desc: "dihapus dari keranjang.",
    detail_cart_empty_warning: "Keranjang Kosong",
    detail_cart_empty_desc: "Tambahkan item ke keranjang sebelum checkout.",
    detail_input_error: "Input Tidak Lengkap",
    detail_input_desc: "Mohon isi nama dan ulasan Anda.",
    detail_review_success: "Terima Kasih!",
    detail_review_desc: "Ulasan Anda telah dikirim.",
    umkm_reviews_count: "ulasan",

    // === HALAMAN BERITA ===
    news_page_title: "Berita UMKM Setu Cipayung",
    news_page_desc: "Dapatkan insights, tips, dan tren terbaru seputar UMKM Cipayung dan dunia bisnis digital",
    news_category_all: "Semua",
    news_no_articles: "Tidak ada artikel dalam kategori ini.",
    news_cat_marketing: "Marketing",
    news_cat_branding: "Branding",
    news_cat_social_media: "Social Media",
    news_cat_inovasi: "Inovasi",
    news_cat_keuangan: "Keuangan",
    news_cat_sertifikasi: "Sertifikasi",
    news_read_more: "Baca Selengkapnya",

    // === HALAMAN EVENTS ===
    events_page_title: "Jadwal Event UMKM Cipayung",
    events_page_desc: "Jangan lewatkan workshop, bazar, dan acara komunitas UMKM yang menarik di sekitar Anda.",
    events_filter_all: "Semua",
    events_ongoing_title: "Events Sedang Berlangsung",
    events_upcoming_title: "Events Mendatang",
    events_no_ongoing: "Tidak ada event yang sedang berlangsung.",
    events_no_upcoming: "Tidak ada event mendatang.",
    cat_workshop: "Workshop",
    cat_bazar: "Bazar",
    cat_networking: "Networking",
    cat_pelatihan: "Pelatihan",
    cat_seminar: "Seminar",
    cat_konsultasi: "Konsultasi",
    event_attendees: "Peserta",
    event_btn_register: "Daftar",
    event_badge_ongoing: "Berlangsung",
    event_btn_finished: "Selesai",

    // === MODAL EVENT ===
    modal_title: "Daftar Event",
    modal_success_title: "Pendaftaran Berhasil!",
    modal_success_desc: "Terima kasih! Konfirmasi akan dikirim ke email Anda.",
    modal_label_name: "Nama Lengkap",
    modal_placeholder_name: "Nama Anda",
    modal_label_email: "Email",
    modal_placeholder_email: "email@example.com",
    modal_label_phone: "Nomor Telepon",
    modal_placeholder_phone: "08xx xxxx xxxx",
    modal_label_company: "Nama Perusahaan/UMKM (Opsional)",
    modal_placeholder_company: "Nama bisnis Anda",
    modal_label_message: "Pesan (Opsional)",
    modal_placeholder_message: "Tulis pesan atau pertanyaan...",
    modal_summary_event: "Event",
    modal_summary_date: "Tanggal",
    modal_summary_location: "Lokasi",
    modal_btn_submit: "Konfirmasi Pendaftaran",
    modal_validation_error: "Nama Lengkap, Email, dan Nomor Telepon wajib diisi.",

    // === HALAMAN PANDUAN DAFTAR ===
    register_page_title: "Daftarkan Usaha Anda",
    register_page_desc: "Bergabunglah dengan ribuan UMKM di Cipayung dan jangkau lebih banyak pelanggan",
    
    // Steps
    step_1_title: "Informasi Dasar",
    step_1_desc: "Data usaha Anda",
    step_2_title: "Kontak & Lokasi",
    step_2_desc: "Alamat dan kontak",
    step_3_title: "Foto Produk",
    step_3_desc: "Unggah 3-5 foto",
    step_4_title: "Konfirmasi",
    step_4_desc: "Tinjau data Anda",
    step_count: "Langkah",
    step_of: "dari",

    // Info Penting Box
    info_important_title: "Informasi Penting Sebelum Mendaftar",
    info_point_1: "Pastikan semua data yang Anda masukkan akurat dan lengkap",
    info_point_2: "Foto produk harus berkualitas baik dan menampilkan produk/tempat usaha dengan jelas",
    info_point_3: "Proses verifikasi memakan waktu 3-5 hari kerja",
    info_point_4: "Kami akan menghubungi Anda jika ada data yang perlu diperbaiki",

    // Form Labels & Placeholders
    form_business_name: "Nama Usaha",
    form_ph_business_name: "Contoh: Warung Kopi Cipayung",
    form_category: "Kategori Usaha",
    form_ph_category: "Pilih kategori...",
    form_desc: "Deskripsi Usaha",
    form_ph_desc: "Ceritakan tentang usaha Anda, produk/jasa yang ditawarkan...",
    form_owner: "Nama Pemilik",
    form_ph_owner: "Nama lengkap pemilik usaha",
    form_address: "Alamat Lengkap",
    form_ph_address: "Jalan, nomor, kelurahan, kecamatan...",
    form_phone: "Nomor Telepon",
    form_ph_phone: "08xxxxxxxxxx",
    form_email: "Email",
    form_ph_email: "email@example.com",
    form_photos_label: "Unggah Foto Produk/Tempat Usaha (3-5 foto)",
    form_drag_drop: "Klik atau drag foto di sini",
    form_file_types: "PNG, JPG, GIF hingga 10MB",
    form_photos_uploaded: "Foto yang diunggah",
    
    // Opsi Kategori Usaha
    opt_food: "Makanan & Minuman",
    opt_craft: "Kerajinan Tangan",
    opt_fashion: "Fashion & Tekstil",
    opt_electronic: "Elektronik",
    opt_service: "Jasa & Layanan",
    opt_agriculture: "Pertanian",
    opt_other: "Lainnya",

    // Validation Messages
    err_business_name: "Nama usaha wajib diisi",
    err_category: "Kategori wajib dipilih",
    err_desc: "Deskripsi wajib diisi",
    err_address: "Alamat wajib diisi",
    err_phone_req: "Nomor telepon wajib diisi",
    err_phone_num: "Nomor telepon harus berupa angka",
    err_email_req: "Email wajib diisi",
    err_email_fmt: "Format email tidak valid",
    err_photos_min: "Minimal 3 foto harus diunggah",
    err_photos_max: "Maksimal 5 foto",

    // Summary & Success
    summary_title: "Ringkasan Data Pendaftaran",
    summary_ready: "Semua data sudah lengkap!",
    summary_ready_desc: "Klik tombol \"Kirim Pendaftaran\" untuk menyelesaikan proses pendaftaran. Tim kami akan meninjau data Anda dalam 3-5 hari kerja.",
    success_title: "Pendaftaran Berhasil!",
    success_desc: "Terima kasih telah mendaftar. Tim kami akan meninjau data Anda dalam 3-5 hari kerja.",
    success_email_sent: "Email konfirmasi telah dikirim ke:",
    
    // Buttons
    btn_prev: "Sebelumnya",
    btn_next: "Selanjutnya",
    btn_submit: "Kirim Pendaftaran",
    btn_home: "Kembali ke Beranda",

    // === HALAMAN GAMES ===
    games_page_title: "Kuis Seru UMKM Cipayung",
    games_page_desc: "Uji pengetahuan Anda tentang dunia UMKM!",
    games_correct_msg: "Jawaban Anda Benar!",
    games_wrong_msg: "Jawaban Salah",
    games_correct_answer_is: "Jawaban yang benar:",
    games_finish_title: "Terima Kasih Telah Bermain!",
    games_finish_desc: "Semoga kuis ini menambah wawasan Anda tentang UMKM Cipayung. Mari bersama-sama mendukung pertumbuhan ekonomi lokal dan memberdayakan usaha kecil menengah di komunitas kita.",
    games_btn_back: "Kembali ke Direktori UMKM",

    // === HALAMAN PROFIL (BARU) ===
    profile_title: "Profil Saya",
    profile_welcome: "Selamat datang kembali! 🎉",
    profile_points: "Poin",
    profile_status_customer: "Pelanggan Setia",
    profile_bio_gender: "Jenis Kelamin",
    profile_gender_male: "Laki-laki",
    profile_bio_age: "Usia",
    profile_bio_phone: "No. Handphone",
    profile_daily_login: "Daily Login",
    profile_login_desc: "Kunjungi setiap hari untuk bonus ekstra!",
    profile_streak: "Hari Streak",
    profile_missions_title: "Misi Harian",
    profile_missions_desc: "Selesaikan untuk dapatkan hadiah menarik ✨",
    profile_mission_1: "Kunjungi 3 Halaman UMKM",
    profile_mission_2: "Bagikan Event ke Media Sosial",
    profile_mission_3: "Beri Ulasan pada UMKM",
    profile_btn_claim: "Klaim",
    profile_btn_claimed: "Terklaim",
    profile_reward_claimed: "Selamat! Anda mendapatkan",
    profile_rewards_title: "Tukar Hadiah",
    profile_rewards_desc: "Gunakan poin Anda untuk hadiah menarik 🎁",
    profile_reward_1: "Diskon 20%",
    profile_reward_2: "Voucher Gratis Ongkir",
    profile_reward_3: "Badge Eksklusif",
    profile_reward_4: "Poin Bonus x2",
    profile_reward_remaining: "Tersisa",
    profile_btn_redeem: "Tukar",
    profile_btn_short: "Kurang",
    profile_tip: "Tip:",
    profile_tip_desc: "Selesaikan misi harian untuk mengumpulkan poin dan tukar dengan hadiah eksklusif!",

    // === FOOTER ===
    footer_desc: "Platform direktori UMKM untuk memberdayakan bisnis lokal di Setu, Cipayung.",
    footer_menu_main: "Menu Utama",
    footer_link_home: "Beranda",
    footer_link_umkm: "Direktori UMKM",
    footer_link_news: "Berita & Artikel",
    footer_link_events: "Event & Acara",
    footer_section_business: "Usaha Anda",
    footer_btn_register: "Daftarkan Usahamu",
    footer_business_desc: "Bergabunglah dengan ribuan UMKM lainnya dan perluas jangkauan bisnis Anda di komunitas TemuCipayung.",
    footer_contact: "Hubungi Kami",
    footer_copyright: "Dibuat untuk Multimedia in Action 2025.",
  },
  en: {
    // === NAVBAR ===
    home: "Home",
    umkm: "MSMEs",
    news: "News",
    events: "Events",
    register: "Register Your Business",
    
    // === HERO SECTION (HOME) ===
    hero_title: "Explore & Support Setu Cipayung Local Businesses",
    hero_subtitle: "A digital platform to discover and connect with creative businesses in Setu Cipayung.",
    explore: "Start Exploring",
    
    // === ABOUT SECTION ===
    about: "About Us",
    about_desc: "We are committed to empowering local MSMEs in Setu, Cipayung through an innovative and inclusive digital platform.",
    vision: "Our Vision",
    vision_desc: "To be the leading digital directory for modern and competitive Setu Cipayung MSMEs.",
    mission: "Our Mission",
    mission_desc: "Increasing visibility and facilitating collaboration among Setu Cipayung MSMEs.",
    
    // === PARTNERS & TESTIMONIALS ===
    partners: "Our Partners",
    partners_desc: "We collaborate with various organizations and businesses to support the growth of Cipayung MSMEs.",
    testimonials: "Testimonials from Residents & MSME Owners",
    testimonials_desc: "Hear success stories from those who have benefited from our platform.",
    testimoni_1_text: "This platform has been very helpful for my business. Many new customers found my shop from here. Thank you!",
    testimoni_2_text: "Since this directory existed, my laundry business has become busier. Happy to help Cipayung residents look neat every day.",
    testimoni_3_text: "Great initiative! My Pecel Lele stall is now easier for new customers to find. The Cipayung MSME community is becoming more solid!",
    testimoni_4_text: "This directory makes it easier for residents to find my tire repair service. Business is smooth, customers are satisfied!",

    // === MAP & FAQ ===
    map_title: "Explore Setu Cipayung MSME Map",
    map_desc: "Discover top MSME locations in Setu Village, Cipayung District, East Jakarta. This interactive map guides you to support local businesses.",
    map_center: "Information Center (Setu Village Office)",
    open_maps: "Open in Google Maps",
    faq: "Frequently Asked Questions",
    faq_desc: "Find answers to common questions about our directory.",
    faq_q1: "How do I register my MSME in this directory?",
    faq_a1: "You can register your MSME through the 'Registration Guide' page by filling out a complete form about your business. Our team will verify your data within 1-2 working days.",
    faq_q2: "Is there a fee to register?",
    faq_a2: "There is no fee at all! Registration in the Cipayung MSME Directory is completely free. We are committed to supporting local MSMEs.",
    faq_q3: "How do I contact registered MSMEs?",
    faq_a3: "Contact information (phone, address) is available on the detail page of each MSME. You can contact them directly.",
    faq_q4: "Can I edit my MSME information after registering?",
    faq_a4: "Yes, you can edit your MSME information anytime through your account dashboard after logging in.",
    faq_q5: "How do I become a partner or sponsor?",
    faq_a5: "We are open to collaboration. Please contact our team via the contact page or email for further discussion.",

    // === UMKM PAGE (LIST) ===
    umkm_page_title: "Setu Cipayung MSME Directory",
    umkm_page_desc: "Explore and support quality local businesses in our neighborhood.",
    umkm_search_placeholder: "Search MSMEs or type 'Promo'...",
    umkm_category_all: "All",
    cat_kuliner: "Culinary",
    cat_fashion: "Fashion",
    cat_jasa: "Services & Others",
    umkm_btn_show_more: "View More",
    umkm_btn_show_less: "Show Less",
    umkm_not_found_title: "MSME Not Found",
    umkm_not_found_desc: "Try changing your search keywords or category filter.",
    umkm_view_detail: "View Details",
    umkm_price: "Price",
    umkm_address: "Address",
    umkm_promo: "Promo Available",
    umkm_menu: "Featured Menu",

    // === UMKM PAGE (DETAIL) ===
    detail_back: "Back to Directory",
    detail_gallery: "Photo Gallery",
    detail_menu: "Menu & Services",
    detail_cart: "Order Cart",
    detail_location: "Our Location",
    detail_contact: "Contact This MSME",
    detail_reviews: "Customer Reviews",
    detail_write_review: "Write Review",
    detail_close: "Close",
    detail_your_name: "Your Name",
    detail_name_placeholder: "Enter your name",
    detail_rating: "Rating",
    detail_review_label: "Review",
    detail_review_placeholder: "Share your experience...",
    detail_send_review: "Submit Review",
    detail_no_reviews: "No reviews yet.",
    detail_menu_empty: "Menu not available yet.",
    detail_cart_empty: "Your cart is empty.",
    detail_add: "Add",
    detail_total: "Total",
    detail_checkout: "Checkout",
    detail_processing: "Processing Payment...",
    detail_wait: "Please wait a moment.",
    detail_success: "Payment Successful!",
    detail_success_desc: "Thank you for your order. Please contact the MSME.",
    detail_see_all_photos: "See All Photos",
    detail_added_cart: "Added!",
    detail_added_desc: "added to cart.",
    detail_removed: "Removed",
    detail_removed_desc: "removed from cart.",
    detail_cart_empty_warning: "Cart Empty",
    detail_cart_empty_desc: "Add items to cart before checkout.",
    detail_input_error: "Incomplete Input",
    detail_input_desc: "Please fill in your name and review.",
    detail_review_success: "Thank You!",
    detail_review_desc: "Your review has been submitted.",
    umkm_reviews_count: "reviews",

    // === NEWS PAGE ===
    news_page_title: "Setu Cipayung MSME News",
    news_page_desc: "Get the latest insights, tips, and trends regarding Cipayung MSMEs and the digital business world",
    news_category_all: "All",
    news_no_articles: "No articles in this category.",
    news_cat_marketing: "Marketing",
    news_cat_branding: "Branding",
    news_cat_social_media: "Social Media",
    news_cat_inovasi: "Innovation",
    news_cat_keuangan: "Finance",
    news_cat_sertifikasi: "Certification",
    news_read_more: "Read More",

    // === EVENTS PAGE ===
    events_page_title: "Cipayung MSME Event Schedule",
    events_page_desc: "Don't miss exciting workshops, bazaars, and MSME community events around you.",
    events_filter_all: "All",
    events_ongoing_title: "Ongoing Events",
    events_upcoming_title: "Upcoming Events",
    events_no_ongoing: "No ongoing events.",
    events_no_upcoming: "No upcoming events.",
    cat_workshop: "Workshop",
    cat_bazar: "Bazaar",
    cat_networking: "Networking",
    cat_pelatihan: "Training",
    cat_seminar: "Seminar",
    cat_konsultasi: "Consultation",
    event_attendees: "Attendees",
    event_btn_register: "Register",
    event_badge_ongoing: "Ongoing",
    event_btn_finished: "Ended",

    // === MODAL EVENT ===
    modal_title: "Register Event",
    modal_success_title: "Registration Successful!",
    modal_success_desc: "Thank you! A confirmation will be sent to your email.",
    modal_label_name: "Full Name",
    modal_placeholder_name: "Your Name",
    modal_label_email: "Email",
    modal_placeholder_email: "email@example.com",
    modal_label_phone: "Phone Number",
    modal_placeholder_phone: "08xx xxxx xxxx",
    modal_label_company: "Company/MSME Name (Optional)",
    modal_placeholder_company: "Your business name",
    modal_label_message: "Message (Optional)",
    modal_placeholder_message: "Write a message or question...",
    modal_summary_event: "Event",
    modal_summary_date: "Date",
    modal_summary_location: "Location",
    modal_btn_submit: "Confirm Registration",
    modal_validation_error: "Full Name, Email, and Phone Number are required.",

    // === REGISTRATION PAGE ===
    register_page_title: "Register Your Business",
    register_page_desc: "Join thousands of MSMEs in Cipayung and reach more customers",
    
    // Steps
    step_1_title: "Basic Info",
    step_1_desc: "Your business data",
    step_2_title: "Contact & Location",
    step_2_desc: "Address and contact",
    step_3_title: "Product Photos",
    step_3_desc: "Upload 3-5 photos",
    step_4_title: "Confirmation",
    step_4_desc: "Review your data",
    step_count: "Step",
    step_of: "of",

    // Info Box
    info_important_title: "Important Information Before Registering",
    info_point_1: "Ensure all data you enter is accurate and complete",
    info_point_2: "Product photos must be of good quality and clearly display the product/business location",
    info_point_3: "Verification process takes 3-5 working days",
    info_point_4: "We will contact you if any data needs correction",

    // Form Labels & Placeholders
    form_business_name: "Business Name",
    form_ph_business_name: "Example: Cipayung Coffee Shop",
    form_category: "Business Category",
    form_ph_category: "Select category...",
    form_desc: "Business Description",
    form_ph_desc: "Tell us about your business, products/services offered...",
    form_owner: "Owner Name",
    form_ph_owner: "Full name of business owner",
    form_address: "Full Address",
    form_ph_address: "Street, number, sub-district, district...",
    form_phone: "Phone Number",
    form_ph_phone: "08xxxxxxxxxx",
    form_email: "Email",
    form_ph_email: "email@example.com",
    form_photos_label: "Upload Product/Business Photos (3-5 photos)",
    form_drag_drop: "Click or drag photos here",
    form_file_types: "PNG, JPG, GIF up to 10MB",
    form_photos_uploaded: "Uploaded photos",
    
    // Business Category Options
    opt_food: "Food & Beverage",
    opt_craft: "Handicrafts",
    opt_fashion: "Fashion & Textiles",
    opt_electronic: "Electronics",
    opt_service: "Services",
    opt_agriculture: "Agriculture",
    opt_other: "Others",

    // Validation Messages
    err_business_name: "Business name is required",
    err_category: "Category is required",
    err_desc: "Description is required",
    err_address: "Address is required",
    err_phone_req: "Phone number is required",
    err_phone_num: "Phone number must be numeric",
    err_email_req: "Email is required",
    err_email_fmt: "Invalid email format",
    err_photos_min: "Minimum 3 photos must be uploaded",
    err_photos_max: "Maximum 5 photos",

    // Summary & Success
    summary_title: "Registration Summary",
    summary_ready: "All data is complete!",
    summary_ready_desc: "Click the \"Submit Registration\" button to complete the registration process. Our team will review your data within 3-5 working days.",
    success_title: "Registration Successful!",
    success_desc: "Thank you for registering. Our team will review your data within 3-5 working days.",
    success_email_sent: "Confirmation email has been sent to:",
    
    // Buttons
    btn_prev: "Previous",
    btn_next: "Next",
    btn_submit: "Submit Registration",
    btn_home: "Back to Home",
    
    // === GAMES PAGE ===
    games_page_title: "Cipayung MSME Fun Quiz",
    games_page_desc: "Test your knowledge about the MSME world!",
    games_correct_msg: "Your Answer is Correct!",
    games_wrong_msg: "Wrong Answer",
    games_correct_answer_is: "The correct answer is:",
    games_finish_title: "Thank You for Playing!",
    games_finish_desc: "We hope this quiz broadens your knowledge about Cipayung MSMEs. Let's support local economic growth and empower small and medium enterprises in our community.",
    games_btn_back: "Back to MSME Directory",

    // === PROFILE PAGE (NEW) ===
    profile_title: "My Profile",
    profile_welcome: "Welcome back! 🎉",
    profile_points: "Points",
    profile_status_customer: "Loyal Customer",
    profile_bio_gender: "Gender",
    profile_gender_male: "Male",
    profile_bio_age: "Age",
    profile_bio_phone: "Phone No.",
    profile_daily_login: "Daily Login",
    profile_login_desc: "Visit daily for extra bonuses!",
    profile_streak: "Day Streak",
    profile_missions_title: "Daily Missions",
    profile_missions_desc: "Complete tasks to get exciting rewards ✨",
    profile_mission_1: "Visit 3 MSME Pages",
    profile_mission_2: "Share Event on Social Media",
    profile_mission_3: "Review an MSME",
    profile_btn_claim: "Claim",
    profile_btn_claimed: "Claimed",
    profile_reward_claimed: "Congratulations! You got",
    profile_rewards_title: "Redeem Rewards",
    profile_rewards_desc: "Use your points for exciting rewards 🎁",
    profile_reward_1: "20% Discount",
    profile_reward_2: "Free Shipping Voucher",
    profile_reward_3: "Exclusive Badge",
    profile_reward_4: "Double Bonus Points",
    profile_reward_remaining: "Left",
    profile_btn_redeem: "Redeem",
    profile_btn_short: "Short",
    profile_tip: "Tip:",
    profile_tip_desc: "Complete daily missions to collect points and redeem exclusive rewards!",

    // === FOOTER ===
    footer_desc: "MSME directory platform to empower local businesses in Setu, Cipayung.",
    footer_menu_main: "Main Menu",
    footer_link_home: "Home",
    footer_link_umkm: "MSME Directory",
    footer_link_news: "News & Articles",
    footer_link_events: "Events & Activities",
    footer_section_business: "Your Business",
    footer_btn_register: "Register Your Business",
    footer_business_desc: "Join thousands of other MSMEs and expand your business reach in the TemuCipayung community.",
    footer_contact: "Contact Us",
    footer_copyright: "Created for Multimedia in Action 2025.",
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('id')

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'id' ? 'en' : 'id'))
  }

  const t = (key: string) => {
    // @ts-expect-error - Mengabaikan error index signature sementara
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
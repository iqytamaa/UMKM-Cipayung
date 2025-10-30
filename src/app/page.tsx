    "use client"

    import { useState, useEffect } from "react"
    import { ChevronLeft, ChevronRight, MapPin, Quote, ChevronDown } from "lucide-react"
    import Image from "next/image"
    import Link from "next/link"
    import AOS from "aos" // Import AOS
    import "aos/dist/aos.css" // Import stylesheet AOS
    import CustomPointer from "@/app/components/CustomPointer"

    // Komponen Item FAQ (Accordion)
    function FAQItem({
      question,
      answer,
      isOpen,
      onToggle,
    }: {
      question: string
      answer: string
      isOpen: boolean
      onToggle: () => void
    }) {
      return (
        <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors duration-300 bg-white">
          <button
            onClick={onToggle}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-blue-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-expanded={isOpen}
          >
            <span className="text-lg font-semibold text-gray-900">{question}</span>
            <ChevronDown
              size={20}
              className={`text-blue-600 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-6 pb-4 pt-2 bg-blue-50 border-t border-gray-200">
              <p className="text-gray-700 leading-relaxed">{answer}</p>
            </div>
          </div>
        </div>
      )
    }

    

    // Komponen Utama Halaman Beranda
    export default function HomePage() {
      const [currentImageIndex, setCurrentImageIndex] = useState(0)
      const [isAutoPlay, setIsAutoPlay] = useState(true)
      const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0)

      // Daftar Gambar Carousel
      const carouselImages = [
        "/Home/cipayung-area-1.jpg",
        "/Home/cipayung-area-2.jpg",
        "/Home/cipayung-area-3.jpg",
        "/Home/cipayung-area-4.jpg",
      ]

      // Daftar Gambar Mitra
      const partnerImages = [
        "/Mitra/berkah.jpg",
        "/Mitra/cipayungmarket.jpg",
        "/Mitra/digital.jpg",
        "/Mitra/karyalokal.jpg",
        "/Mitra/jejak.jpg",
      ]

      // Daftar Pertanyaan & Jawaban FAQ
      const faqItems = [
        {
          question: "Bagaimana cara mendaftar UMKM saya di direktori ini?",
          answer:
            "Anda dapat mendaftar UMKM Anda melalui halaman 'Panduan Daftar' dengan mengisi formulir lengkap tentang bisnis Anda. Tim kami akan memverifikasi data Anda dalam 1-2 hari kerja.",
        },
        {
          question: "Apakah ada biaya untuk mendaftar?",
          answer:
            "Tidak ada biaya sama sekali! Pendaftaran di Direktori UMKM Cipayung sepenuhnya gratis. Kami berkomitmen untuk mendukung UMKM lokal.",
        },
        {
          question: "Bagaimana cara menghubungi UMKM yang terdaftar?",
          answer:
            "Informasi kontak (telepon, alamat) tersedia di halaman detail setiap UMKM. Anda dapat menghubungi mereka langsung.",
        },
        {
          question: "Bisakah saya mengedit informasi UMKM saya setelah mendaftar?",
          answer: "Ya, Anda dapat mengedit informasi UMKM Anda kapan saja melalui dashboard akun Anda setelah login.",
        },
        {
          question: "Bagaimana cara menjadi mitra atau sponsor?",
          answer:
            "Kami terbuka untuk kerjasama. Silakan hubungi tim kami melalui halaman kontak atau email untuk diskusi lebih lanjut.",
        },
      ]

      // Daftar Testimoni
      const testimonials = [
        {
          name: "Ibu Siti",
          business: "Warung Kopi Cipayung",
          text: "Platform ini sangat membantu bisnis saya. Banyak pelanggan baru menemukan warung saya dari sini. Terima kasih!",
          image: "/Home/woman-entrepreneur.jpg",
        },
        {
          name: "Pak Budi",
          business: "Pengrajin Batik Setu",
          text: "Produk batik saya lebih dikenal luas sekarang. Bangga bisa mempromosikan kerajinan lokal Cipayung.",
          image: "/Home/man-craftsman.jpg",
        },
        {
          name: "Mbak Rina",
          business: "Penjual Makanan Tradisional",
          text: "Inisiatif bagus! Komunitas UMKM Cipayung jadi lebih solid dan saling mendukung. Semoga terus maju!",
          image: "/Home/woman-seller.jpg",
        },
        {
          name: "Pak Hendra",
          business: "Toko Elektronik Setu",
          text: "Kolaborasi antar UMKM jadi lebih mudah. Saya sudah bermitra dengan beberapa bisnis lain melalui platform ini.",
          image: "/Home/man-shop-owner.jpg",
        },
      ]

      // Efek untuk Autoplay Carousel
      useEffect(() => {
        if (!isAutoPlay) return
        const interval = setInterval(() => {
          setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
        }, 5000)
        return () => clearInterval(interval)
      }, [isAutoPlay, carouselImages.length])

      // ============================================================
      // EFEK BARU UNTUK INISIALISASI AOS
      // ============================================================
      useEffect(() => {
        AOS.init({
          duration: 800, // Durasi animasi dalam ms
          once: true, // Animasi hanya terjadi sekali saat scroll
          offset: 100, // Jarak trigger animasi (px) sebelum elemen terlihat
        })
      }, [])
      // ============================================================

      // Fungsi Navigasi Carousel
      const goToPrevious = () => {
        setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
        setIsAutoPlay(false)
      }

      const goToNext = () => {
        setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
        setIsAutoPlay(false)
      }

      // Fungsi Toggle FAQ
      const handleToggleFAQ = (index: number) => {
        setOpenFAQIndex(openFAQIndex === index ? null : index)
      }

      return (
        <>
        <CustomPointer />
          {/* Hero Section dengan Image Carousel */}
          <div className="relative text-white text-center py-20 md:py-40 overflow-hidden min-h-[60vh] md:min-h-[80vh] flex items-center justify-center">
            {/* Gambar Latar Belakang Carousel */}
            <div className="absolute inset-0">
              {carouselImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Suasana Cipayung ${index + 1}`}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              ))}
              {/* Lapisan Gelap Transparan untuk Kontras Teks */}
              <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Tombol Navigasi Carousel */}
            <button
              onClick={goToPrevious}
              onMouseEnter={() => setIsAutoPlay(false)}
              onMouseLeave={() => setIsAutoPlay(true)}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 md:p-3 rounded-full transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Gambar Sebelumnya"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={goToNext}
              onMouseEnter={() => setIsAutoPlay(false)}
              onMouseLeave={() => setIsAutoPlay(true)}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 md:p-3 rounded-full transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Gambar Berikutnya"
            >
              <ChevronRight size={24} />
            </button>

            {/* Indikator Carousel */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentImageIndex(index)
                    setIsAutoPlay(false)
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ease-in-out ${
                    index === currentImageIndex ? "bg-white w-8" : "bg-white/50 w-2 hover:bg-white/75"
                  }`}
                  aria-label={`Lihat gambar ${index + 1}`}
                />
              ))}
            </div>

              

            {/* Konten Teks Hero */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="animate-fade-in max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-balance shadow-text">
                  Jelajahi & Dukung Bisnis Lokal Setu Cipayung
                </h1>
                <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8 text-balance shadow-text">
                  Platform digital untuk menemukan dan terhubung dengan usaha-usaha kreatif di Setu Cipayung.
                </p>
                <Link
                  href="/Games"
                  className="inline-block bg-gradient-to-r from-green-400 to-green-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 focus:ring-offset-black/50"
                >
                  Mulai Menjelajah
                </Link>
              </div>
            </div>
          </div>

        {/* Bagian Tentang Kami (Visi & Misi) */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative overflow-hidden"> {/* Tambah overflow-hidden */}
            
            {/* ... (Judul "Tentang Kami" dengan data-aos="fade-up") ... */}
            <div 
              className="text-center mb-16 max-w-3xl mx-auto relative z-10"
              data-aos="fade-up"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">Tentang Kami</h2>
              <p className="text-lg text-gray-600">
                Kami berkomitmen memberdayakan UMKM lokal Setu, Cipayung melalui platform digital yang inovatif dan
                inklusif.
              </p>
            </div>


            {/* Visi Section */}
            <div className="mb-20 grid md:grid-cols-2 gap-12 items-center">
              {/* Gambar Visi */}
              <div 
                className="order-2 md:order-1 relative w-full h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                data-aos="fade-right" // <-- AOS DARI KIRI
                data-aos-delay="100"
              >
                <Image
                  src="/Home/visi.jpg"
                  alt="Ilustrasi visi direktori UMKM Cipayung"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Teks Visi */}
              <div 
                className="order-1 md:order-2" 
                data-aos="fade-left" // <-- AOS DARI KANAN
                data-aos-delay="100"
              >
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 md:p-10 rounded-2xl shadow-lg border border-blue-200 h-full flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-blue-900 mb-4">Visi Kami</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Menjadi direktori digital terdepan yang memberdayakan dan memajukan seluruh UMKM di Setu, Cipayung, agar
                    dapat bersaing dan berkembang di era modern dengan dukungan penuh dari komunitas.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Misi Section */}
            <div className="mb-20 grid md:grid-cols-2 gap-12 items-center">
              {/* Teks Misi */}
              <div 
                data-aos="fade-right" // <-- AOS DARI KIRI
                data-aos-delay="100"
              >
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 md:p-10 rounded-2xl shadow-lg border border-green-200 h-full flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-green-900 mb-4">Misi Kami</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Menyediakan platform yang informatif, menarik, dan mudah diakses untuk mempromosikan produk dan jasa
                    UMKM lokal kepada masyarakat luas, serta memfasilitasi kolaborasi dan pertumbuhan bersama.
                  </p>
                </div>
              </div>
              {/* Gambar Misi */}
              <div 
                className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                data-aos="fade-left" // <-- AOS DARI KANAN
                data-aos-delay="100"
              >
                <Image
                  src="/Home/misi.jpg"
                  alt="Ilustrasi misi direktori UMKM Cipayung"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

        {/* Bagian Mitra Kami */}
          <div 
            className="bg-gradient-to-r from-blue-50 via-gray-50 to-green-50 py-16 md:py-24 overflow-hidden" // Tambahkan overflow-hidden
            data-aos="fade-up" // Tambahkan AOS ke seluruh section
          >
            
            {/* Konten Judul tetap di dalam container agar sejajar */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 max-w-3xl mx-auto"> {/* Hapus AOS dari sini jika sudah ada di parent */}
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">Mitra Kami</h2>
                <p className="text-lg text-gray-600">
                  Kami berkolaborasi dengan berbagai organisasi dan bisnis untuk mendukung pertumbuhan UMKM Cipayung.
                </p>
              </div>
            </div>

            {/* Wrapper slider logo dibuat full-width (di luar container) */}
            <div 
              className="bg-white shadow-lg border-t border-b border-gray-100"
              data-aos="fade-in" // Animasi berbeda untuk slider bar
              data-aos-delay="200" // Delay sedikit setelah judul
            >
              <div className="relative w-full h-48 overflow-hidden group">
                <div
                  className="flex items-center gap-12 h-full absolute left-0 group-hover:[animation-play-state:paused]"
                  style={{
                    width: `${partnerImages.length * (360 + 48) * 2}px`,
                    animation: `slide-partners ${partnerImages.length * 4}s linear infinite`,
                  }}
                >
                  {/* Gambar pertama (loop 1) */}
                  {partnerImages.map((image, index) => (
                    <div
                      className="w-[360px] h-full flex justify-center items-center overflow-hidden flex-shrink-0"
                      key={`orig-${index}`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Mitra ${index + 1}`}
                        width={300}
                        height={160}
                        className="h-auto max-h-[160px] w-auto object-contain"
                      />
                    </div>
                  ))}
                  {/* Gambar duplikat untuk infinite loop (loop 2) */}
                  {partnerImages.map((image, index) => (
                    <div
                      className="w-[360px] h-full flex justify-center items-center overflow-hidden flex-shrink-0"
                      key={`dup-${index}`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Mitra ${index + 1}`}
                        width={300}
                        height={160}
                        className="h-auto max-h-[160px] w-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
          </div>

          {/* Bagian Testimoni */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div 
              className="text-center mb-16 max-w-3xl mx-auto" 
              data-aos="fade-up" // Judul tetap fade-up
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">
                Testimoni Warga & Pelaku UMKM
              </h2>
              <p className="text-lg text-gray-600">
                Dengarkan cerita sukses dari mereka yang telah merasakan manfaat platform kami.
              </p>
            </div>
            
            {/* Grid Testimoni */}
            {/* Tambahkan overflow-hidden ke container jika perlu untuk mencegah scrollbar horizontal saat animasi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-hidden"> 
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 transform hover:-translate-y-2 flex flex-col"
                  data-aos="fade-left" // <-- PERUBAHAN: MUNCUL DARI KANAN
                  data-aos-delay={index * 100} // <-- Efek stagger (muncul berurutan)
                >
                  <Quote className="w-8 h-8 text-blue-500 mb-4 flex-shrink-0" />
                  {/* Perbaikan: Gunakan HTML entity untuk tanda kutip */}
                  <p className="text-gray-700 mb-6 leading-relaxed italic flex-grow">&quot;{testimonial.text}&quot;</p>
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.business}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bagian Peta Lokasi */}
          {/* Tambahkan 'overflow-hidden' di sini untuk mencegah scrollbar horizontal saat animasi */}
          <div className="bg-gray-100 py-16 md:py-24 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                
                {/* Konten Teks Peta */}
                <div 
                  data-aos="fade-right" // <-- Animasi muncul dari kiri
                  data-aos-delay="100"
                >
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">
                    Jelajahi Peta UMKM Setu Cipayung
                  </h2>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    Temukan lokasi UMKM unggulan di Kelurahan Setu, Kecamatan Cipayung, Jakarta Timur. Peta interaktif ini
                    memandu Anda mendukung bisnis lokal.
                  </p>
                  {/* Info Box Alamat */}
                  <div className="bg-white border-l-4 border-blue-500 p-4 rounded-r-lg shadow-md">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-blue-900">Pusat Informasi (Kantor Kelurahan Setu)</p>
                        <p className="text-blue-800 text-sm">
                          Jl. Raya Setu No.8 5, RT.5/RW.1, Setu, Kec. Cipayung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13880
                        </p>
                        <Link
                          href="https://maps.app.goo.gl/TpoMBC63tmdaYMyM9"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-semibold text-sm mt-2 inline-flex items-center gap-1 group"
                        >
                          Buka di Google Maps{" "}
                          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Peta Embed */}
                <div 
                  className="rounded-2xl shadow-2xl overflow-hidden w-full h-96 md:h-[500px]"
                  data-aos="fade-left" // <-- Animasi muncul dari kanan
                  data-aos-delay="100"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.65244747332!2d106.91495359999999!3d-6.3093085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6992b301be4f1d%3A0xe3ea97791a92cbdc!2sKantor%20Kelurahan%20Setu%20-%20Jakarta%20Timur!5e0!3m2!1sid!2sid!4v1761670852087!5m2!1sid!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Peta Area Setu Cipayung"
                  ></iframe>
                </div>
                
              </div>
            </div>
          </div>

        {/* Bagian FAQ */}
          {/* PERBAIKAN: Padding bawah (pb) dikurangi agar tidak terlalu tinggi */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 pb-10 md:pb-20">
            <div 
              className="text-center mb-16 max-w-3xl mx-auto" 
              data-aos="fade-up" // Judul muncul dari bawah
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">
                Pertanyaan yang Sering Diajukan
              </h2>
              <p className="text-lg text-gray-600">Temukan jawaban atas pertanyaan umum tentang direktori kami.</p>
            </div>
            
            {/* Komponen FAQ */}
            <div className="max-w-3xl mx-auto space-y-4">
              {faqItems.map((item, index) => (
                // Wrapper div untuk setiap item FAQ
                <div 
                  key={index}
                  data-aos="fade-down" // Animasi dari atas ke bawah
                  data-aos-delay={index * 100} // Efek stagger (muncul berurutan)
                  data-aos-once="true" // Pastikan animasi hanya sekali
                >
                  <FAQItem
                    question={item.question}
                    answer={item.answer}
                    isOpen={openFAQIndex === index}
                    onToggle={() => handleToggleFAQ(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          <style jsx global>{`
            .shadow-text {
              text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
            }
            @keyframes fade-in {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fade-in {
              animation: fade-in 0.8s ease-out forwards;
            }
            @keyframes slide-partners {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-${partnerImages.length * (360 + 48)}px);
              }
            }
          `}</style>
        </>
      )
    }
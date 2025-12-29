"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, MapPin, Quote, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import AOS from "aos"
import "aos/dist/aos.css"
import { useLanguage } from "@/app/context/LanguageContext"

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
    <div className="border border-gray-200 dark:border-slate-700 rounded-lg hover:border-blue-300 transition-colors duration-300 bg-white dark:bg-slate-800">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-gray-900 dark:text-white">{question}</span>
        <ChevronDown
          size={20}
          className={`text-blue-600 dark:text-blue-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out  ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-4 pt-2 bg-blue-50 dark:bg-slate-900/50 border-t border-gray-200 dark:border-slate-700">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{answer}</p>
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

  const { t } = useLanguage()

  const carouselImages = [
    "/Home/cipayung-area-1.jpg",
    "/Home/cipayung-area-2.jpg",
    "/Home/cipayung-area-3.jpg",
    "/Home/cipayung-area-4.jpg",
  ]

  const partnerImages = [
    "/Mitra/berkah.jpg",
    "/Mitra/cipayungmarket.jpg",
    "/Mitra/digital.jpg",
    "/Mitra/karyalokal.jpg",
    "/Mitra/jejak.jpg",
  ]

  const faqItems = [
    {
      question: t('faq_q1'),
      answer: t('faq_a1'),
    },
    {
      question: t('faq_q2'),
      answer: t('faq_a2'),
    },
    {
      question: t('faq_q3'),
      answer: t('faq_a3'),
    },
    {
      question: t('faq_q4'),
      answer: t('faq_a4'),
    },
    {
      question: t('faq_q5'),
      answer: t('faq_a5'),
    },
  ]

  const testimonials = [
    {
      name: "Ibu Siti",
      business: "Toko Kelontong",
      text: t('testimoni_1_text'),
      image: "/Home/woman-entrepreneur.jpg",
    },
    {
      name: "Pak Budi",
      business: "Laundry Kiloan",
      text: t('testimoni_2_text'),
      image: "/Home/man-craftsman.jpg",
    },
    {
      name: "Mbak Rina",
      business: "Pecel Lele & Ayam Bakar",
      text: t('testimoni_3_text'),
      image: "/Home/woman-seller.jpg",
    },
    {
      name: "Pak Hendra",
      business: "Tambal Ban",
      text: t('testimoni_4_text'),
      image: "/Home/man-shop-owner.jpg",
    },
  ]

  useEffect(() => {
    if (!isAutoPlay) return
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlay, carouselImages.length])

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    })
  }, [])

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
    setIsAutoPlay(false)
  }

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
    setIsAutoPlay(false)
  }

  const handleToggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index)
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hapus CustomPointer disini jika sudah ada di layout.tsx */}
      {/* <CustomPointer /> */}
      
      {/* Hero Section */}
      <div className="relative text-white text-center py-20 md:py-40  min-h-[60vh] md:min-h-[80vh] flex items-center justify-center">
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
          <div className="absolute inset-0 bg-black/50" />
        </div>

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

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="animate-fade-in max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-balance shadow-text">
              {t('hero_title')}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8 text-balance shadow-text">
              {t('hero_subtitle')}
            </p>
            <Link
              href="/Games"
              className="inline-block bg-gradient-to-r from-green-400 to-green-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 focus:ring-offset-black/50"
            >
              {t('explore')}
            </Link>
          </div>
        </div>
      </div>

      {/* Tentang Kami */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative ">
        <div
          className="text-center mb-16 max-w-3xl mx-auto relative z-10"
          data-aos="fade-up"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-balance">
            {t('about')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('about_desc')}
          </p>
        </div>

        {/* Visi */}
        <div className="mb-20 grid md:grid-cols-2 gap-12 items-center">
          <div
            className="order-2 md:order-1 relative w-full h-96 rounded-2xl  shadow-lg hover:shadow-2xl transition-shadow duration-300"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <Image
              src="/Home/visi.jpg"
              alt="Ilustrasi visi"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div
            className="order-1 md:order-2"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <div
              className="p-8 md:p-20 rounded-2xl shadow-lg border border-green-200 min-h-82 md:h-86 flex flex-col justify-center relative  bg-cover bg-center"
              style={{
                backgroundImage: "linear-gradient(to bottom right, #eff6ff, #dbeafe)"
              }}
            >
              <div
                className="absolute inset-0 opacity-60 md:opacity-40 bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/Home/Group 143.svg')",
                  backgroundSize: "120% auto"
                }}
              ></div>

              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-blue-600 mb-3 md:mb-4">
                  {t('vision')}
                </h3>
                {/* Teks di dalam kartu terang HARUS tetap gelap agar terbaca */}
                <p className="text-sm md:text-lg text-gray-700 leading-relaxed">
                  {t('vision_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Misi */}
        <div className="mb-20 grid md:grid-cols-2 gap-12 items-center">
          <div
            className="order-2 md:order-2 relative w-full h-96 rounded-2xl  shadow-lg hover:shadow-2xl transition-shadow duration-300"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <Image
              src="/Home/misi.jpg"
              alt="Ilustrasi misi"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div
            className="order-1 md:order-1"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <div
              className="p-8 md:p-20 rounded-2xl shadow-lg border border-green-200 min-h-82 md:h-86 flex flex-col justify-center relative  bg-cover bg-center"
              style={{
                backgroundImage: "linear-gradient(to bottom right,  #f0fdf4, #dcfce7)"
              }}
            >
              <div
                className="absolute inset-0 opacity-60 md:opacity-60 bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/Home/Group 143.svg')",
                  backgroundSize: "120% auto"
                }}
              ></div>

              <h3 className="text-3xl font-bold text-green-900 mb-4">{t('mission')}</h3>
              {/* PERBAIKAN UTAMA: Menambahkan 'text-gray-700' agar teks tetap gelap di kartu yang terang */}
              <p className="text-sm md:text-lg text-gray-700 leading-relaxed">
                {t('mission_desc')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mitra Kami */}
      <div
        className="bg-gradient-to-r from-blue-50 via-gray-50 to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-16 md:py-24"
        data-aos="fade-up"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-balance">{t('partners')}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('partners_desc')}
            </p>
          </div>
        </div>

        <div
          className="bg-white dark:bg-slate-800 shadow-lg border-t border-b border-gray-100 dark:border-slate-700"
          data-aos="fade-in"
          data-aos-delay="200"
        >
          <div className="relative w-full h-48  group">
            <div
              className="flex items-center gap-12 h-full absolute left-0 group-hover:[animation-play-state:paused]"
              style={{
                width: `${partnerImages.length * (360 + 48) * 2}px`,
                animation: `slide-partners ${partnerImages.length * 4}s linear infinite`,
              }}
            >
              {partnerImages.map((image, index) => (
                <div
                  className="w-[360px] h-full flex justify-center items-center  flex-shrink-0"
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
              {partnerImages.map((image, index) => (
                <div
                  className="w-[360px] h-full flex justify-center items-center  flex-shrink-0"
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

      {/* Testimoni */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div
          className="text-center mb-16 max-w-3xl mx-auto"
          data-aos="fade-up"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-balance">
            {t('testimonials')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('testimonials_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 dark:border-slate-700 transform hover:-translate-y-2 flex flex-col"
              data-aos="fade-left"
              data-aos-delay={index * 100}
            >
              <Quote className="w-8 h-8 text-blue-500 mb-4 flex-shrink-0" />
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic flex-grow">&quot;{testimonial.text}&quot;</p>
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-slate-700">
                <div className="relative w-12 h-12 rounded-full  flex-shrink-0">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.business}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Peta Lokasi */}
      <div className="bg-gray-100 dark:bg-slate-900 py-16 md:py-24 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 text-balance">
                {t('map_title')}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                {t('map_desc')}
              </p>
              <div className="bg-white dark:bg-slate-800 border-l-4 border-blue-500 p-4 rounded-r-lg shadow-md">
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-900 dark:text-blue-100">{t('map_center')}</p>
                    <p className="text-blue-800 dark:text-blue-200 text-sm">
                      Jl. Raya Setu No.8 5, RT.5/RW.1, Setu, Kec. Cipayung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13880
                    </p>
                    <Link
                      href="https://maps.app.goo.gl/TpoMBC63tmdaYMyM9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold text-sm mt-2 inline-flex items-center gap-1 group"
                    >
                      {t('open_maps')}
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="rounded-2xl shadow-2xl  w-full h-96 md:h-[500px]"
              data-aos="fade-left"
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

      {/* FAQ */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 pb-10 md:pb-20">
        <div
          className="text-center mb-16 max-w-3xl mx-auto"
          data-aos="fade-up"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-balance">
            {t('faq')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">{t('faq_desc')}</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              data-aos="fade-down"
              data-aos-delay={index * 100}
              data-aos-once="true"
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
    </div>
  )
}
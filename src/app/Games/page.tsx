"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, Lightbulb, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import AOS from "aos"
import "aos/dist/aos.css"
// Pastikan path ini sesuai dengan file komponen Anda
import BackgroundAudioPlayer from "@/app/components/BackgroundAudioPlayer" 
import { useLanguage } from "@/app/context/LanguageContext"

// --- Data Kuis (Dwi Bahasa) ---
const quizData = [
  {
    id: 1,
    question: "Apa kepanjangan dari UMKM?",
    question_en: "What does MSME stand for?",
    options: [
      "Usaha Mikro, Kecil, dan Menengah",
      "Usaha Maju, Kreatif, dan Mandiri",
      "Usaha Masyarakat, Komunitas, dan Mitra",
      "Usaha Murah, Cepat, dan Mudah",
    ],
    options_en: [
      "Micro, Small, and Medium Enterprises",
      "Modern, Smart, and Managed Enterprises",
      "Massive, Small, and Micro Enterprises",
      "Main, Secondary, and Minor Enterprises",
    ],
    correctIndex: 0,
    bgImage: "/Games/1.jpg",
  },
  {
    id: 2,
    question: "Manakah yang BUKAN kategori utama UMKM di TemuCipayung?",
    question_en: "Which is NOT a main category of MSMEs in TemuCipayung?",
    options: ["Kuliner", "Fashion", "Jasa & Lainnya", "Teknologi Antariksa"],
    options_en: ["Culinary", "Fashion", "Services & Others", "Space Technology"],
    correctIndex: 3,
    bgImage: "/Games/2.jpg",
  },
  {
    id: 3,
    question: "Apa manfaat utama mendaftarkan usaha Anda di direktori digital?",
    question_en: "What is the main benefit of registering your business in a digital directory?",
    options: [
      "Mendapat modal instan",
      "Meningkatkan visibilitas (ditemukan) secara online",
      "Otomatis bebas pajak",
      "Mendapat kantor fisik gratis",
    ],
    options_en: [
      "Get instant capital",
      "Increase online visibility (discoverability)",
      "Automatically tax-free",
      "Get a free physical office",
    ],
    correctIndex: 1,
    bgImage: "/Games/3.jpg",
  },
]

type QuizItem = (typeof quizData)[0]

// --- Komponen Kotak Kuis ---
interface QuizSectionProps {
  quiz: QuizItem
}

function QuizSection({ quiz }: QuizSectionProps) {
  // Ambil state bahasa
  const { t, language } = useLanguage()
  
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)

  // Pilih teks berdasarkan bahasa
  const currentQuestion = language === 'id' ? quiz.question : quiz.question_en
  const currentOptions = language === 'id' ? quiz.options : quiz.options_en

  const handleAnswerClick = (index: number) => {
    if (isAnswered) return
    setSelectedAnswer(index)
    setIsAnswered(true)
  }

  const getButtonClass = (index: number) => {
    if (!isAnswered) {
      return "bg-white/10 border-white/30 backdrop-blur-sm text-white hover:bg-white/30 focus:ring-white/50"
    }
    if (index === quiz.correctIndex) {
      return "bg-green-500 border-green-700 text-white shadow-lg scale-105"
    }
    if (index === selectedAnswer && index !== quiz.correctIndex) {
      return "bg-red-500 border-red-700 text-white shadow-md line-through opacity-80"
    }
    return "bg-gray-700/20 border-gray-500/30 text-gray-300 opacity-70 cursor-not-allowed"
  }

  return (
    <div
      className="relative z-10 w-full max-w-4xl p-8 md:p-16 rounded-3xl shadow-2xl overflow-hidden border-2 border-white/20"
      style={{
        background: "rgba(15, 23, 42, 0.3)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Soal Kuis */}
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-balance text-white">{currentQuestion}</h2>
      
      <div className="space-y-4">
        {currentOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(index)}
            disabled={isAnswered}
            className={`w-full text-left p-5 rounded-xl border-2 text-base md:text-lg font-semibold transition-all duration-300 transform focus:outline-none focus:ring-2 ${getButtonClass(
              index,
            )}`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Feedback Jawaban */}
      {isAnswered && (
        <div className="mt-8 p-5 rounded-lg bg-black/50 backdrop-blur-sm animate-fade-in">
          {selectedAnswer === quiz.correctIndex ? (
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0" />
              <p className="font-semibold text-lg text-white">{t('games_correct_msg')}</p>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <XCircle className="w-8 h-8 text-red-400 flex-shrink-0" />
              <div>
                <p className="font-semibold text-lg text-red-300">{t('games_wrong_msg')}</p>
                <p className="text-sm text-gray-200">
                  {t('games_correct_answer_is')} {currentOptions[quiz.correctIndex]}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}


// --- Komponen Halaman Games ---
export default function GamesPage() {
  const { t } = useLanguage()

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: "ease-out-cubic",
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden">
      {/* 1. CustomPointer DIHAPUS dari sini karena sudah ada di layout.tsx */}
      {/* <CustomPointer /> */}

      {/* 2. Audio Player DIKEMBALIKAN */}
      <BackgroundAudioPlayer src="/music/background-music.mp3" />

      {/* Header Section */}
      <section
        className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden"
        data-aos="fade-in" 
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/Games/4.jpg"
            alt="Header Game"
            fill
            className="object-cover"
            priority 
            sizes="100vw"
            quality={80}
          />
          <div className="absolute inset-0 bg-black/50"></div>

          {/* === EFEK KUNANG-KUNANG === */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div
                key={`firefly-header-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  boxShadow: "0 0 8px rgba(255, 255, 255, 0.8), 0 0 14px rgba(255, 255, 255, 0.6)",
                  animation: `firefly-move-${i % 6} ${10 + (i % 5) * 2}s infinite ease-in-out`,
                  left: `${(i * 7.1) % 100}%`, 
                  top: `${(i * 13.3) % 100}%`, 
                  opacity: 0.6 + Math.random() * 0.4, 
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Konten Judul */}
        <div className="relative z-10 p-4" data-aos="fade-up" data-aos-delay="100"> 
          <div className="inline-block p-3 bg-blue-600/80 rounded-xl shadow-lg mb-4">
            <Lightbulb size={32} />
          </div>
          {/* Gunakan t() untuk judul dan deskripsi */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-balance shadow-text">
            {t('games_page_title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mt-4 text-balance shadow-text">
            {t('games_page_desc')}
          </p>
        </div>
        <div className="absolute bottom-10 z-10 text-white animate-bounce opacity-70">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Konten Kuis */}
      {quizData.map((quiz, index) => (
        <section
          key={quiz.id}
          className={`relative min-h-screen py-0 px-4 sm:px-8 flex items-center text-white overflow-hidden ${
            index % 2 === 0 ? "justify-center md:justify-end" : "justify-center md:justify-start"
          }`}
        >
          <div className="absolute inset-0 z-0">
            <Image
              src={quiz.bgImage || "/placeholder.svg"}
              alt={`Background Kuis ${quiz.id}`}
              fill
              className="object-cover"
              sizes="100vw"
              quality={70}
            />
            <div className="absolute inset-0 bg-black/60"></div>

            {/* === EFEK KUNANG-KUNANG === */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(15)].map((_, i) => (
                <div
                  key={`firefly-q${quiz.id}-${i}`}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    boxShadow: "0 0 8px rgba(255, 255, 255, 0.8), 0 0 14px rgba(255, 255, 255, 0.6)",
                    animation: `firefly-move-${i % 6} ${10 + (i % 5) * 2}s infinite ease-in-out`,
                    left: `${(i * 7.1) % 100}%`,
                    top: `${(i * 13.3) % 100}%`,
                    opacity: 0.6 + Math.random() * 0.4,
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Kotak Kuis */}
          <div className="py-20" data-aos={index % 2 === 0 ? "fade-left" : "fade-right"} data-aos-delay="100">
            <QuizSection quiz={quiz} />
          </div>
        </section>
      ))}

      {/* Section Akhir */}
      <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Games/5.jpg"
            alt="Background Kembali"
            fill
            className="object-cover"
            sizes="100vw"
            quality={70}
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div
                key={`firefly-footer-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  boxShadow: "0 0 8px rgba(255, 255, 255, 0.8), 0 0 14px rgba(255, 255, 255, 0.6)",
                  animation: `firefly-move-${i % 6} ${10 + (i % 5) * 2}s infinite ease-in-out`,
                  left: `${(i * 7.1) % 100}%`,
                  top: `${(i * 13.3) % 100}%`,
                  opacity: 0.6 + Math.random() * 0.4,
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="relative z-10 space-y-6" data-aos="fade-up" data-aos-delay="300"> 
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">{t('games_finish_title')}</h2>
            <p className="text-lg md:text-xl text-gray-200 text-balance">
              {t('games_finish_desc')}
            </p>
          </div>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white font-bold py-4 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          >
            {t('games_btn_back')}
          </Link>
        </div>
      </section>

      {/* Style */}
      <style jsx global>{`
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
          animation: fade-in 0.6s ease-out forwards;
        }
        .shadow-text {
          text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.6);
        }
        /* Keyframes Firefly */
        @keyframes firefly-move-0 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
          25% { transform: translate(15px, -30px) scale(1.1); opacity: 1; }
          50% { transform: translate(30px, 30px) scale(0.9); opacity: 0.7; }
          75% { transform: translate(15px, 45px) scale(1); opacity: 1; }
        }
        @keyframes firefly-move-1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          25% { transform: translate(-30px, 45px) scale(1.2); opacity: 1; }
          50% { transform: translate(-45px, -15px) scale(1); opacity: 0.8; }
          75% { transform: translate(-15px, -30px) scale(1.1); opacity: 1; }
        }
        @keyframes firefly-move-2 {
          0%, 100% { transform: translate(0, 0) scale(0.9); opacity: 0.7; }
          25% { transform: translate(45px, 30px) scale(1.1); opacity: 1; }
          50% { transform: translate(15px, -30px) scale(1); opacity: 0.7; }
          75% { transform: translate(30px, 15px) scale(1.2); opacity: 1; }
        }
        @keyframes firefly-move-3 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
          25% { transform: translate(-15px, -45px) scale(1); opacity: 1; }
          50% { transform: translate(-30px, 0px) scale(1.1); opacity: 0.6; }
          75% { transform: translate(-45px, 30px) scale(1); opacity: 1; }
        }
        @keyframes firefly-move-4 {
          0%, 100% { transform: translate(0, 0) scale(1.1); opacity: 0.8; }
          25% { transform: translate(30px, 30px) scale(1); opacity: 1; }
          50% { transform: translate(45px, -15px) scale(1.2); opacity: 0.7; }
          75% { transform: translate(15px, -30px) scale(1); opacity: 1; }
        }
        @keyframes firefly-move-5 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          25% { transform: translate(-30px, -15px) scale(1.1); opacity: 1; }
          50% { transform: translate(-15px, 30px) scale(0.9); opacity: 0.8; }
          75% { transform: translate(-45px, 15px) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
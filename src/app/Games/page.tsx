"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, Lightbulb, ChevronDown } from "lucide-react"

// --- Mengembalikan impor yang dihapus ---
import Image from "next/image"
import Link from "next/link"
import AOS from "aos"
import "aos/dist/aos.css"
import CustomPointer from "@/app/components/CustomPointer" // <-- DIKEMBALIKAN
import BackgroundAudioPlayer from "@/app/components/BackgroundAudioPlayer" // <-- DIKEMBALIKAN

// --- Data Kuis ---
const quizData = [
  {
    id: 1,
    question: "Apa kepanjangan dari UMKM?",
    options: [
      "Usaha Mikro, Kecil, dan Menengah",
      "Usaha Maju, Kreatif, dan Mandiri",
      "Usaha Masyarakat, Komunitas, dan Mitra",
      "Usaha Murah, Cepat, dan Mudah",
    ],
    correctIndex: 0,
    bgImage: "/Games/1.jpg",
  },
  {
    id: 2,
    question: "Manakah yang BUKAN kategori utama UMKM di TemuCipayung?",
    options: ["Kuliner", "Fashion", "Jasa & Lainnya", "Teknologi Antariksa"],
    correctIndex: 3,
    bgImage: "/Games/2.jpg",
  },
  {
    id: 3,
    question: "Apa manfaat utama mendaftarkan usaha Anda di direktori digital?",
    options: [
      "Mendapat modal instan",
      "Meningkatkan visibilitas (ditemukan) secara online",
      "Otomatis bebas pajak",
      "Mendapat kantor fisik gratis",
    ],
    correctIndex: 1,
    bgImage: "/Games/3.jpg",
  },
]

// --- Tipe Data Kuis ---
type QuizItem = (typeof quizData)[0]

// --- Komponen Kotak Kuis (Div Sendiri) ---
interface QuizSectionProps {
  quiz: QuizItem
}

function QuizSection({ quiz }: QuizSectionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)

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
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-balance text-white">{quiz.question}</h2>
      <div className="space-y-4">
        {quiz.options.map((option, index) => (
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

      {isAnswered && (
        <div className="mt-8 p-5 rounded-lg bg-black/50 backdrop-blur-sm animate-fade-in">
          {selectedAnswer === quiz.correctIndex ? (
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0" />
              <p className="font-semibold text-lg text-white">Jawaban Anda Benar!</p>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <XCircle className="w-8 h-8 text-red-400 flex-shrink-0" />
              <div>
                <p className="font-semibold text-lg text-red-300">Jawaban Salah</p>
                <p className="text-sm text-gray-200">Jawaban yang benar: {quiz.options[quiz.correctIndex]}</p>
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
  // --- Mengembalikan Inisialisasi AOS ---
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: "ease-out-cubic",
    })
  }, [])

  return (
    // overflow-x-hidden ditambahkan untuk mengatasi 'jebol' dari animasi
    <div className="min-h-screen bg-gray-900 overflow-x-hidden">
      {/* <MouseFollower /> // CustomPointer sudah ada di layout global, jadi ini bisa dihapus jika duplikat */}
      <CustomPointer /> {/* <-- DIKEMBALIKAN */}

      {/* === MEMANGGIL KEMBALI PEMUTAR MUSIK === */}
      <BackgroundAudioPlayer src="/music/background-music.mp3" />

      {/* Header Section (Full Page) */}
      <section
        className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden"
        data-aos="fade-in" // <-- Mengembalikan AOS
      >
        <div className="absolute inset-0 z-0">
          {/* --- Mengembalikan Next/Image --- */}
          <Image
            src="/Games/4.jpg"
            alt="Header Game"
            fill
            className="object-cover"
            priority // 'eager' diganti 'priority' untuk Next/Image
            sizes="100vw"
            quality={80}
          />
          <div className="absolute inset-0 bg-black/50"></div>

          {/* === EFEK KUNANG-KUNANG (HEADER) === */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div
                key={`firefly-header-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  boxShadow: "0 0 8px rgba(255, 255, 255, 0.8), 0 0 14px rgba(255, 255, 255, 0.6)",
                  animation: `firefly-move-${i % 6} ${10 + (i % 5) * 2}s infinite ease-in-out`,
                  left: `${(i * 7.1) % 100}%`, // Posisi acak
                  top: `${(i * 13.3) % 100}%`, // Posisi acak
                  opacity: 0.6 + Math.random() * 0.4, // Opasitas acak
                }}
              />
            ))}
          </div>
          {/* === END EFEK === */}
        </div>
        <div className="relative z-10 p-4" data-aos="fade-up" data-aos-delay="100"> {/* <-- Mengembalikan AOS */}
          <div className="inline-block p-3 bg-blue-600/80 rounded-xl shadow-lg mb-4">
            <Lightbulb size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-balance shadow-text">Kuis Seru UMKM Cipayung</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mt-4 text-balance shadow-text">
            Uji pengetahuan Anda tentang dunia UMKM!
          </p>
        </div>
        <div className="absolute bottom-10 z-10 text-white animate-bounce opacity-70">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Konten Kuis (Mapped) */}
      {quizData.map((quiz, index) => (
        <section
          key={quiz.id}
          className={`relative min-h-screen py-0 px-4 sm:px-8 flex items-center text-white overflow-hidden ${
            index % 2 === 0 ? "justify-center md:justify-end" : "justify-center md:justify-start"
          }`}
        >
          {/* Background Image Full-Screen per Pertanyaan */}
          <div className="absolute inset-0 z-0">
            {/* --- Mengembalikan Next/Image --- */}
            <Image
              src={quiz.bgImage || "/placeholder.svg"}
              alt={`Background Kuis ${quiz.id}`}
              fill
              className="object-cover"
              sizes="100vw"
              quality={70}
              // 'lazy' adalah default, jadi tidak perlu ditambah
            />
            <div className="absolute inset-0 bg-black/60"></div>

            {/* === EFEK KUNANG-KUNANG (Q1, Q2, Q3) === */}
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
            {/* === END EFEK === */}
          </div>
          {/* Kotak Kuis (Komponen yang dibuat di atas) */}
          {/* --- Mengembalikan AOS --- */}
          <div className="py-20" data-aos={index % 2 === 0 ? "fade-left" : "fade-right"} data-aos-delay="100">
            <QuizSection quiz={quiz} />
          </div>
        </section>
      ))}

      {/* Section Akhir */}
      <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          {/* --- Mengembalikan Next/Image --- */}
          <Image
            src="/Games/5.jpg"
            alt="Background Kembali"
            fill
            className="object-cover"
            sizes="100vw"
            quality={70}
          />
          <div className="absolute inset-0 bg-black/50"></div>

          {/* === EFEK KUNANG-KUNANG (AKHIR) === */}
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
          {/* === END EFEK === */}
        </div>
        <div className="relative z-10 space-y-6" data-aos="fade-up" data-aos-delay="300"> {/* <-- Mengembalikan AOS */}
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">Terima Kasih Telah Bermain!</h2>
            <p className="text-lg md:text-xl text-gray-200 text-balance">
              Semoga kuis ini menambah wawasan Anda tentang UMKM Cipayung. Mari bersama-sama mendukung pertumbuhan
              ekonomi lokal dan memberdayakan usaha kecil menengah di komunitas kita.
            </p>
          </div>
          {/* --- Mengembalikan Next/Link --- */}
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white font-bold py-4 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          >
            Kembali ke Direktori UMKM
          </Link>
        </div>
      </section>

      {/* Style (untuk animasi fade-in dan shadow text) */}
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

        /* === KEYFRAMES DENGAN JARAK LEBIH JAUH === */
        @keyframes firefly-move-0 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.5;
          }
          25% {
            transform: translate(15px, -30px) scale(1.1);
            opacity: 1;
          }
          50% {
            transform: translate(30px, 30px) scale(0.9);
            opacity: 0.7;
          }
          75% {
            transform: translate(15px, 45px) scale(1);
            opacity: 1;
          }
        }
        @keyframes firefly-move-1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          25% {
            transform: translate(-30px, 45px) scale(1.2);
            opacity: 1;
          }
          50% {
            transform: translate(-45px, -15px) scale(1);
            opacity: 0.8;
          }
          75% {
            transform: translate(-15px, -30px) scale(1.1);
            opacity: 1;
          }
        }
        @keyframes firefly-move-2 {
          0%,
          100% {
            transform: translate(0, 0) scale(0.9);
            opacity: 0.7;
          }
          25% {
            transform: translate(45px, 30px) scale(1.1);
            opacity: 1;
          }
          50% {
            transform: translate(15px, -30px) scale(1);
            opacity: 0.7;
          }
          75% {
            transform: translate(30px, 15px) scale(1.2);
            opacity: 1;
          }
        }
        @keyframes firefly-move-3 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.5;
          }
          25% {
            transform: translate(-15px, -45px) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(-30px, 0px) scale(1.1);
            opacity: 0.6;
          }
          75% {
            transform: translate(-45px, 30px) scale(1);
            opacity: 1;
          }
        }
        @keyframes firefly-move-4 {
          0%,
          100% {
            transform: translate(0, 0) scale(1.1);
            opacity: 0.8;
          }
          25% {
            transform: translate(30px, 30px) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(45px, -15px) scale(1.2);
            opacity: 0.7;
          }
          75% {
            transform: translate(15px, -30px) scale(1);
            opacity: 1;
          }
        }
        @keyframes firefly-move-5 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          25% {
            transform: translate(-30px, -15px) scale(1.1);
            opacity: 1;
          }
          50% {
            transform: translate(-15px, 30px) scale(0.9);
            opacity: 0.8;
          }
          75% {
            transform: translate(-45px, 15px) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export default function SplashScreen({ onFinished }: { onFinished: () => void }) {
  const [showTemu, setShowTemu] = useState(false)
  const [showCipayung, setShowCipayung] = useState(false)
  const [showLogo, setShowLogo] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const logoTimer = setTimeout(() => setShowLogo(true), 100)
    const temuTimer = setTimeout(() => setShowTemu(true), 300)
    const cipayungTimer = setTimeout(() => setShowCipayung(true), 800)
    const loadingTimer = setTimeout(() => setIsLoading(true), 1800)

    const finishTimer = setTimeout(() => {
      onFinished()
    }, 3000)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(temuTimer)
      clearTimeout(cipayungTimer)
      clearTimeout(loadingTimer)
      clearTimeout(finishTimer)
    }
  }, [onFinished])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-green-100 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div
          className="absolute top-10 left-10 w-52 h-52 bg-blue-300 rounded-full opacity-40 blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-64 h-64 bg-green-300 rounded-full opacity-30 blur-3xl animate-pulse"
          style={{ animationDuration: "5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ animationDuration: "6s" }}
        ></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex items-center justify-center gap-4 md:gap-8 w-full px-4">
        {/* Logo container */}
        <div
          className={`flex-shrink-0 transition-all duration-700 ${
            showLogo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="relative w-16 h-16 md:w-28 md:h-28 drop-shadow-2xl">
            <Image
              src="/Logo/logo.png"
              alt="Logo TemuCipayung"
              fill
              priority
              sizes="(max-width: 768px) 64px, 112px"
              className="object-contain filter drop-shadow-lg"
            />
          </div>
        </div>

        <div className="flex flex-col items-start">
          {/* ============================================================
            PERUBAHAN ADA DI BARIS DI BAWAH INI
            ============================================================
          */}
          <div className="flex flex-col items-start md:flex-row md:items-baseline gap-3 md:gap-5">
            {/* Ukuran teks di mobile: text-3xl, desktop: md:text-5xl */}
            <div className="text-3xl md:text-5xl font-bold tracking-tight">
              <span
                className={`inline-block text-blue-600 drop-shadow-lg transition-all duration-700 ${
                  showTemu ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                Temu
              </span>
              <span
                className={`inline-block text-green-500 drop-shadow-lg transition-all duration-700 ${
                  showCipayung
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                Cipayung
              </span>
            </div>

            {isLoading && (
              <div className="flex items-center gap-2 animate-fade-in">
                <div className="flex gap-1.5">
                  <div
                    className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0s" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 font-medium ml-2">
                  Memuat...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
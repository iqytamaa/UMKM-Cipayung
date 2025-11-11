"use client" // 1. Menjadi Client Component

import { Inter } from "next/font/google"
import "./globals.css"
import { useState, useEffect } from "react" // 2. Impor state dan effect

// 3. Impor semua komponen global Anda
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import CustomPointer from "@/app/components/CustomPointer"
import SplashScreen from "@/app/components/SplashScreen" // 4. Impor Splash Screen
import { Toaster } from "sonner" // 5. Pastikan Toaster di-impor

const inter = Inter({ subsets: ["latin"] })

// 6. HAPUS 'export const metadata' DAN 'import type { Metadata }'
// Keduanya tidak bisa digunakan di Client Component.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 7. Buat state untuk mengontrol loading (splash screen)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 8. Atur timer untuk menyembunyikan splash screen
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500) // Tampilkan selama 2.5 detik (sesuaikan durasi)

    return () => clearTimeout(timer) // Bersihkan timer
  }, [])

  return (
    <html lang="id">
      {/* Layout "sticky footer" (min-h-screen flex flex-col) 
        dipindahkan dari <body> ke div wrapper KONTEN UTAMA di bawah.
        Ini memperbaiki masalah "whitespace" di halaman Game.
      */}
      <body className={`${inter.className} bg-gray-50`}>
        
        {/* 9. Logika Tampilan Kondisional */}
        {isLoading ? (
          // Tampilkan Splash Screen saat loading
          <SplashScreen onFinished={function (): void {
            throw new Error("Function not implemented.")
          } } />
        ) : (
          // Tampilkan konten utama setelah loading selesai
          <div className="min-h-screen flex flex-col">
            
            <Navbar />
            
            {/* 'flex-grow' akan mendorong Footer ke bawah */}
            <main className="flex-grow">
              {children}
            </main>
            
            <Footer />
            
            {/* Toaster untuk notifikasi */}
            <Toaster richColors position="top-right" />
            <CustomPointer />
          </div>
          
        )}

        {/* 10. Tambahkan keyframes untuk animasi fade-in */}
        <style jsx global>{`
          @keyframes fade-in-layout {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in-layout {
            animation: fade-in-layout 0.6s ease-out forwards;
          }
        `}</style>

      </body>
    </html>
  )
}
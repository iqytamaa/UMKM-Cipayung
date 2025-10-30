// Impor standar Anda
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

// === INI PENTING ===
// Impor semua komponen "global" Anda
import CustomPointer from "@/app/components/CustomPointer"
import BackgroundAudioPlayer from "@/app/components/BackgroundAudioPlayer"
import Navbar from "@/app/components/Navbar" // <-- 1. Impor Navbar Anda
import Footer from "@/app/components/Footer" // <-- 2. Impor Footer Anda

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Website UMKM Setu Cipayung",
  description: "Jelajahi dan dukung bisnis lokal Setu Cipayung.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        {/* Komponen yang "melayang" (fixed position) */}
        <CustomPointer />
        <BackgroundAudioPlayer src="/music/background-music.mp3" /> {/* Ganti dengan path musik Anda */}

        {/* === DI SINILAH ANDA MENAMBAHKANNYA === */}

        {/* 3. Tampilkan Navbar di bagian atas */}
        <Navbar />

        {/* 'children' adalah isi dari 'page.tsx' (HomePage Anda).
          Kita bungkus dengan <main> agar rapi.
        */}
        <main>
          {children}
        </main>

        {/* 4. Tampilkan Footer di bagian bawah */}
        <Footer />
        
      </body>
    </html>
  )
}
"use client"

import { Inter } from "next/font/google"
import "./globals.css"
import { useState } from "react"

// Impor komponen-komponen
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import CustomPointer from "@/app/components/CustomPointer" // Import ini harus dipakai
import SplashScreen from "@/app/components/SplashScreen"
import { Toaster } from "sonner"

// Impor Context Bahasa
import { LanguageProvider } from "@/app/context/LanguageContext"

// Import Theme Provider
import { ThemeProvider } from "@/app/components/ThemeProvider"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSplashFinished, setIsSplashFinished] = useState(false)

  const handleSplashFinished = () => {
    setIsSplashFinished(true)
  }

  return (
    <html lang="id" suppressHydrationWarning>
      {/* Warna background dark mode: slate-900 (Biru gelap, bukan hitam pekat) */}
      <body className={`${inter.className} bg-gray-50 text-gray-900 dark:bg-slate-900 dark:text-gray-100 transition-colors duration-300 selection:bg-blue-500 selection:text-white`}>
        
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            
            {/* PERBAIKAN: Uncomment baris ini agar CustomPointer aktif secara global */}
            <CustomPointer />
            
            <Toaster richColors position="top-right" />

            {!isSplashFinished ? (
              <SplashScreen onFinished={handleSplashFinished} />
            ) : (
              <div className="min-h-screen flex flex-col animate-fade-in-layout">
                
                <Navbar />
                
                <main className="flex-grow">
                  {children}
                </main>
                
                <Footer />
                
              </div>
            )}

          </LanguageProvider>
        </ThemeProvider>

        <style jsx global>{`
          @keyframes fade-in-layout {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-layout {
            animation: fade-in-layout 0.8s ease-out forwards;
          }
          
          /* Scrollbar Custom */
          ::-webkit-scrollbar {
            width: 10px;
          }
          ::-webkit-scrollbar-track {
            background: transparent;
          }
          ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 5px;
          }
          .dark ::-webkit-scrollbar-thumb {
            background: #475569;
          }
          .dark ::-webkit-scrollbar-thumb:hover {
            background: #64748b;
          }
        `}</style>

      </body>
    </html>
  )
}
"use client"

import { useState } from "react"
import SplashScreen from "./SplashScreen"

// Impor komponen global Anda
import CustomPointer from "./CustomPointer"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function LayoutProvider({
children,
}: {
children: React.ReactNode
}) {
const [isLoading, setIsLoading] = useState(true)

if (isLoading) {
return <SplashScreen onFinished={() => setIsLoading(false)} />
}

// --- PERUBAHAN DIMULAI DI SINI ---

return (
// Gunakan React Fragment (<>) untuk membungkus
<>
    {/* 1. BACKGROUND: 
            - Dibuat 'fixed' agar menempel di viewport
            - 'overflow-hidden' HANYA berlaku untuk background
    */}
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-blue-100 via-white to-green-100">
    {/* Floating blob 1 */}
    <div
        className="absolute top-10 left-10 w-52 h-52 bg-blue-300 rounded-full opacity-40 blur-3xl animate-pulse"
        style={{ animationDuration: "5s" }}
    ></div>
    {/* Floating blob 2 */}
    <div
        className="absolute bottom-20 right-10 w-64 h-64 bg-green-300 rounded-full opacity-30 blur-3xl animate-pulse"
        style={{ animationDuration: "6s" }}
    ></div>
    {/* Floating blob 3 */}
    <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200 rounded-full opacity-20 blur-3xl animate-pulse"
        style={{ animationDuration: "7s" }}
    ></div>
    </div>

    {/* 2. KONTEN: 
            - 'overflow-hidden' DIHAPUS dari sini
            - 'relative' agar konten berada di atas background (-z-10)
    */}
    <div className="relative min-h-screen flex flex-col animate-fade-in-layout">
    {/* Konten Anda sekarang bebas untuk scroll */}
    <CustomPointer />

    {/* Navbar Anda (dengan 'sticky') sekarang akan berfungsi */}
    <Navbar />

    <main className="flex-grow">
        {children}
    </main>

    <Footer />
    </div>
</>
)
}
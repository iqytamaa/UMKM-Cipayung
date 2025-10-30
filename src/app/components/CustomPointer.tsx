"use client"

import { useState, useEffect } from "react"

export default function CustomPointer() {
  // State untuk menyimpan posisi pointer
  const [position, setPosition] = useState({ x: -100, y: -100 })

  // Effect untuk melacak gerakan mouse
  useEffect(() => {
    // Fungsi untuk update state posisi
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    // Tambahkan event listener ke window
    window.addEventListener("mousemove", handleMouseMove)

    // Bersihkan listener saat komponen tidak lagi digunakan
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, []) // Array kosong [] berarti effect ini hanya berjalan sekali

  // Ini adalah JSX dari pointer kustom Anda
  return (
    <div
      className="fixed w-8 h-8 rounded-full border-2 border-blue-400 pointer-events-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
        zIndex: 9999, // zIndex tinggi agar selalu di atas
      }}
    >
      <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-pulse"></div>
    </div>
  )
}
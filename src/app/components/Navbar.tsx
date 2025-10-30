"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, Home, Store, Newspaper, Calendar, FileText } from "lucide-react"
import Image from "next/image" // 1. Pastikan Image diimpor

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/umkm", label: "UMKM", icon: Store },
    { href: "/berita", label: "Berita", icon: Newspaper },
    { href: "/events", label: "Events", icon: Calendar },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    // Perbaikan: Cek juga /panduan-daftar secara spesifik
    if (href === "/panduan-daftar") {
        return pathname === "/panduan-daftar"
    }
    // Cek path lain yang diawali dengan href, tapi pastikan bukan hanya /
    return pathname.startsWith(href) && href !== "/"
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* === PERUBAHAN LOGO DI SINI === */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              {/* Ganti logo 'T' dengan Image */}
              <div className="relative w-14 h-14 transform group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/Logo/logo.png" // Path ke logo Anda di folder public
                  alt="Logo TemuCipayung"
                  fill // Mengisi div parent
                  sizes="40px" // Memberi tahu browser ukuran gambar
                  className="object-contain" // Pastikan logo tidak terpotong
                />
              </div>
              {/* Teks "TemuCipayung" tetap ada di samping logo */}
                <span className="text-xl font-bold sm:block">
                  <span className="text-blue-600">Temu</span>
                  <span className="text-green-500">Cipayung</span>
                </span>
            </Link>
          </div>
          {/* === AKHIR PERUBAHAN LOGO === */}

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center gap-1">
              {navLinks.map((link) => {
                const IconComponent = link.icon
                const active = isActive(link.href) // Simpan status aktif
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 relative group flex items-center gap-2 ${
                      active ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    <IconComponent
                      size={18}
                      className={`transition-colors duration-300 ${
                        active ? "text-blue-600" : "text-gray-500 group-hover:text-blue-600"
                      }`}
                    />
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-500 transition-all duration-300 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* CTA Button and Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link
              href="/panduan-daftar"
              className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                isActive("/panduan-daftar")
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-green-500 text-white hover:bg-green-600 shadow"
              }`}
            >
              <FileText size={16} />
              Daftarkan Usahamu
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => {
              const IconComponent = link.icon
              const active = isActive(link.href) // Simpan status aktif
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium transition-all duration-300 ${ // Ukuran font diperbesar
                    active
                      ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <IconComponent size={20} className={active ? "text-blue-600" : "text-gray-500"} />
                  {link.label}
                </Link>
              )
            })}
            <Link
              href="/panduan-daftar"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium transition-all duration-300 ${ // Ukuran font diperbesar
                isActive("/panduan-daftar")
                  ? "bg-green-600 text-white border-l-4 border-green-700"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              <FileText size={20} />
              Daftarkan Usahamu
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
"use client"

import Link from "next/link"
import Image from "next/image" // 1. Impor Image
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-100 mt-16">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              
              {/* === PERUBAHAN LOGO DI SINI === */}
              <div className="relative w-12 h-12 transform group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/Logo/logo.png" // Path ke logo Anda
                  alt="Logo TemuCipayung"
                  fill
                  sizes="40px"
                  className="object-contain" // Pastikan logo tidak terpotong
                />
              </div>
              {/* === AKHIR PERUBAHAN LOGO === */}

              <span className="text-lg font-bold">
                <span className="text-blue-400">Temu</span>
                <span className="text-green-400">Cipayung</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Platform direktori UMKM untuk memberdayakan bisnis lokal di Setu, Cipayung.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Menu Utama</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/umkm" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm">
                  Direktori UMKM
                </Link>
              </li>
              <li>
                <Link href="/berita" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm">
                  Berita & Artikel
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm">
                  Event & Acara
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-white font-semibold mb-4">Informasi</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/panduan-daftar" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm">
                  Panduan Daftar
                </Link>
              </li>
              <li>
                {/* Anda bisa mengarahkan 'Tentang Kami' ke '/' atau section #about jika ada */}
                <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm">
                  Tentang Kami
                </Link>
              </li>
              {/* Link Kebijakan Privasi & Syarat Ketentuan dihapus */}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  {/* Ganti alamat ini dengan alamat yang benar */}
                  Jl. Raya Setu No.8 5, RT.5/RW.1, Setu, Kec. Cipayung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13880
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-green-400 flex-shrink-0" />
                <a href="tel:+62212345678" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm">
                  +62 (21) 1234-567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-green-400 flex-shrink-0" />
                <a href="mailto:info@temucipayung.com" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm">
                  temucipayung@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} TemuCipayung. Dibuat untuk Multimedia in Action 2025.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300" aria-label="Twitter">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
"use client"

import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-gradient-to-b from-gray-900 via-slate-900 to-black text-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="relative w-12 h-12 transform group-hover:scale-110 transition-transform duration-300">
                <Image src="/Logo/logo.png" alt="Logo TemuCipayung" fill sizes="40px" className="object-contain" />
              </div>
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
            <h3 className="text-white font-semibold mb-4 text-glow">Menu Utama</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm hover:translate-x-1 inline-block"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/umkm"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm hover:translate-x-1 inline-block"
                >
                  Direktori UMKM
                </Link>
              </li>
              <li>
                <Link
                  href="/berita"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm hover:translate-x-1 inline-block"
                >
                  Berita & Artikel
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm hover:translate-x-1 inline-block"
                >
                  Event & Acara
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-glow">Informasi</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/panduan-daftar"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm hover:translate-x-1 inline-block"
                >
                  Panduan Daftar
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm hover:translate-x-1 inline-block"
                >
                  Tentang Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-glow">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  Jl. Raya Setu No.8 5, RT.5/RW.1, Setu, Kec. Cipayung, Kota Jakarta Timur, Daerah Khusus Ibukota
                  Jakarta 13880
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-green-400 flex-shrink-0" />
                <a
                  href="tel:+62212345678"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  +62 (21) 1234-567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-green-400 flex-shrink-0" />
                <a
                  href="mailto:info@temucipayung.com"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  temucipayung@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800/50 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} TemuCipayung. Dibuat untuk Multimedia in Action 2025.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-125"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-125"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-125"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .text-glow {
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </footer>
  )
}

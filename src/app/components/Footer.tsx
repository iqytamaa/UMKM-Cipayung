"use client"

import Link from "next/link"
import Image from "next/image"
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Home,
  Store,
  Newspaper,
  Calendar,
  UserPlus,
  FileText,
  PhoneCall,
} from "lucide-react"
// 1. Import Hooks Bahasa
import { useLanguage } from "@/app/context/LanguageContext"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  // 2. Panggil hooks
  const { t } = useLanguage()

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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="relative w-12 h-12 transform group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/Logo/logo.png"
                  alt="Logo TemuCipayung"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold text-blue-400">
                <span>Temu</span>
                <span>Cipayung</span>
              </span>
            </Link>
            {/* Translate Deskripsi Brand */}
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer_desc')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-glow flex items-center gap-2">
              <Home size={18} className="text-blue-400" />
              {t('footer_menu_main')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm hover:translate-x-1 inline-flex items-center gap-2 group"
                >
                  <Home size={14} className="text-green-400" />
                  {t('footer_link_home')}
                </Link>
              </li>
              <li>
                <Link
                  href="/umkm"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm hover:translate-x-1 inline-flex items-center gap-2 group"
                >
                  <Store size={14} className="text-green-400" />
                  {t('footer_link_umkm')}
                </Link>
              </li>
              <li>
                <Link
                  href="/berita"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm hover:translate-x-1 inline-flex items-center gap-2 group"
                >
                  <Newspaper size={14} className="text-green-400" />
                  {t('footer_link_news')}
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm hover:translate-x-1 inline-flex items-center gap-2 group"
                >
                  <Calendar size={14} className="text-green-400" />
                  {t('footer_link_events')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-glow flex items-center gap-2">
              <UserPlus size={18} className="text-blue-400" />
              {t('footer_section_business')}
            </h3>
            <Link
              href="/panduan-daftar"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm font-medium mb-4"
            >
              <FileText size={16} />
              {t('footer_btn_register')}
            </Link>
            <p className="text-gray-400 text-xs leading-relaxed">
              {t('footer_business_desc')}
            </p>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h3 className="text-white font-semibold mb-4 text-glow flex items-center gap-2">
              <PhoneCall size={18} className="text-blue-400" />
              {t('footer_contact')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="text-blue-400 mt-0.5 flex-shrink-0"
                />
                <span className="text-gray-400 text-sm">
                  Jl. Raya Setu No.8 5, RT.5/RW.1, Setu, Kec. Cipayung, Kota
                  Jakarta Timur, Daerah Khusus Ibukota Jakarta 13880
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-400 flex-shrink-0" />
                <a
                  href="tel:+62212345678"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  +62 (21) 1234-567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-400 flex-shrink-0" />
                <a
                  // Link ke Gmail compose dengan email dummy
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=email@contoh.com"
                  target="_blank" // Buka di tab baru
                  rel="noopener noreferrer" // Praktik keamanan standar
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  info@temucipayung.com
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
            © {currentYear} TemuCipayung. {t('footer_copyright')}
          </p>

          <div className="flex items-center gap-6">
            <a
              href="https://www.facebook.com/temucipayung"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 transition-all duration-300 hover:scale-125"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://www.instagram.com/temucipayung"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 transition-all duration-300 hover:scale-125"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://twitter.com/temucipayung"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 transition-all duration-300 hover:scale-125"
              aria-label="Twitter"
            >
              <Twitter size={24} />
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
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
// Tambahkan import 'User' disini
import { Menu, X, Home, Store, Newspaper, Calendar, FileText, Sun, Moon, User } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/app/context/LanguageContext"
import { useTheme } from "next-themes"

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  
  const { language, toggleLanguage, t } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navLinks = [
    { href: "/", label: "home", icon: Home },
    { href: "/umkm", label: "umkm", icon: Store },
    { href: "/berita", label: "news", icon: Newspaper },
    { href: "/events", label: "events", icon: Calendar },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    if (href === "/panduan-daftar") return pathname === "/panduan-daftar"
    if (href === "/profile") return pathname === "/profile" // Cek aktif untuk profile
    return pathname.startsWith(href) && href !== "/"
  }

  // === COMPONENT BENDERA DENGAN SVG ===
  const FlagIcon = () => {
    // Jika bahasa saat ini 'id' (Indonesia), tampilkan Bendera US AKURAT
    if (language === 'id') {
      return (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 7410 3900" 
          className="w-6 h-6 rounded shadow-sm border border-gray-200"
        >
          <rect width="7410" height="3900" fill="#b22234"/>
          <path d="M0,300H7410v300H0zm0,600H7410v300H0zm0,600H7410v300H0zm0,600H7410v300H0zm0,600H7410v300H0zm0,600H7410v300H0zm0,600H7410v300H0z" fill="#fff"/>
          <rect width="2964" height="2100" fill="#3c3b6e"/>
          <g fill="#fff">
            <g id="s10">
              <g id="s5">
                <g id="s1">
                  <path d="M247,90 317.534,307.082 132.873,172.918H361.127L176.466,307.082z"/>
                </g>
                <use href="#s1" x="494"/>
                <use href="#s1" x="988"/>
                <use href="#s1" x="1482"/>
                <use href="#s1" x="1976"/>
              </g>
              <use href="#s5" x="247" y="210"/>
            </g>
            <use href="#s10" y="420"/>
            <use href="#s10" y="840"/>
            <use href="#s10" y="1260"/>
            <use href="#s10" y="1680"/>
            <use href="#s5" y="840"/>
            <use href="#s1" x="247" y="1050"/>
            <use href="#s1" x="741" y="1050"/>
            <use href="#s1" x="1235" y="1050"/>
            <use href="#s1" x="1729" y="1050"/>
            <use href="#s1" x="2223" y="1050"/>
            <use href="#s5" y="1260"/>
            <use href="#s5" y="1680"/>
            <use href="#s1" x="247" y="1890"/>
            <use href="#s1" x="741" y="1890"/>
            <use href="#s1" x="1235" y="1890"/>
            <use href="#s1" x="1729" y="1890"/>
            <use href="#s1" x="2223" y="1890"/>
          </g>
        </svg>
      )
    }

    // Jika bahasa saat ini 'en' (Inggris), tampilkan Bendera Indonesia
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 3 2" 
        className="w-6 h-6 rounded shadow-sm border border-gray-200"
      >
        <rect width="3" height="2" fill="white"/>
        <rect width="3" height="1" fill="#ce1126"/>
      </svg>
    )
  }

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-md sticky top-0 z-50 border-b border-gray-100 dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* === LOGO === */}
          <div className="shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-10 h-10 md:w-14 md:h-14 transform group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/Logo/logo.png"
                  alt="Logo TemuCipayung"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <span className="text-lg md:text-xl font-bold sm:block">
                <span className="text-blue-600 dark:text-blue-400">Temu</span>
                <span className="text-green-500">Cipayung</span>
              </span>
            </Link>
          </div>

          {/* === DESKTOP NAVIGATION (Tengah) === */}
          <div className="hidden md:block">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => {
                const IconComponent = link.icon
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 lg:px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 relative group flex items-center gap-2 ${
                      active 
                        ? "text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400" 
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    <IconComponent
                      size={18}
                      className={`transition-colors duration-300 ${
                        active ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                      }`}
                    />
                    {t(link.label)}
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

          {/* === RIGHT ACTIONS (Mobile & Desktop) === */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* 1. Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}

            {/* 2. Translate Toggle */}
            <button 
              onClick={toggleLanguage}
              className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center w-10 h-10"
              title={language === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
            >
               <FlagIcon />
            </button>

            {/* 3. Tombol Daftar (Desktop Only) */}
            <Link
              href="/panduan-daftar"
              className={`hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                isActive("/panduan-daftar")
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-green-500 text-white hover:bg-green-600 shadow"
              }`}
            >
              <FileText size={16} />
              {t('register')}
            </Link>

            {/* 4. Profile Icon (Desktop Only - Sesuai Request di sebelah kanan Daftar) */}
            <Link
              href="/profile"
              className={`hidden md:flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                isActive("/profile")
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700"
              }`}
              title="Profile"
            >
              <User size={20} />
            </Link>

            {/* Hamburger Menu (Mobile Only) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* === MOBILE MENU DROP DOWN === */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-100 dark:border-slate-800 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200 bg-white dark:bg-slate-900">
            {navLinks.map((link) => {
              const IconComponent = link.icon
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium transition-all duration-300 ${
                    active
                      ? "text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 border-l-4 border-blue-600"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <IconComponent size={20} className={active ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"} />
                  {t(link.label)}
                </Link>
              )
            })}

            {/* Link Profile di Mobile Menu */}
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium transition-all duration-300 ${
                isActive("/profile")
                  ? "text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 border-l-4 border-blue-600"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"
              }`}
            >
              <User size={20} className={isActive("/profile") ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"} />
              Profile
            </Link>

            {/* Tombol Daftar di Mobile Menu */}
            <div className="px-4 pt-2">
              <Link
                href="/panduan-daftar"
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  isActive("/panduan-daftar")
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                <FileText size={20} />
                {t('register')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
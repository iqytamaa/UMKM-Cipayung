"use client"

import Image from "next/image"
import { Calendar, Clock, MapPin } from "lucide-react"
// Import Hooks Bahasa
import { useLanguage } from "@/app/context/LanguageContext"

// 1. Definisikan tipe EventData (DENGAN 'color')
interface EventData {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  attendees: number
  image: string
  color: string // 'color' wajib ada di sini
  status: "upcoming" | "ongoing"
}

// 2. Perbarui props: HANYA 'event' yang diperlukan
interface EventCardProps {
  event: EventData
  delay?: number
  onRegister?: () => void
  isOngoing?: boolean
}

// 3. Terima dan gunakan 'event.color'
export default function EventCard({
  event,
  onRegister,
  isOngoing = false,
}: EventCardProps) {
  
  // Gunakan t() untuk translate
  const { t } = useLanguage()

  return (
    // 'animate-slideUp' akan di-trigger oleh AOS dari parent
    <div
      className="group cursor-pointer h-full" 
      style={{
        // Hapus 'animation' dari sini jika AOS sudah dipakai
        // 'delay' juga dikontrol AOS
      }}
    >
      {/* UPDATE STYLE: Support Dark Mode
          - bg-white -> dark:bg-slate-800
          - border-gray-100 -> dark:border-slate-700
      */}
      <div className="relative h-full flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-slate-700">
        
        {/* Image Container */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-slate-700">
          {/* 4. Gunakan event.color */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-10 pointer-events-none`}
          ></div>

          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            fill
            // === 5. PERBAIKAN GAMBAR ZOOM: Ganti object-cover -> object-contain ===
            className="object-contain transition-transform duration-500 group-hover:scale-105" 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Badge "Sedang Berlangsung" di Kiri Atas */}
        {isOngoing && (
          // 'top-10' untuk HP, 'md:top-20' untuk desktop
          <div className="absolute top-16 md:top-16 -right-55 z-40">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-lg animate-pulse">
              {/* Translate "Berlangsung" */}
              {t('event_badge_ongoing')}
            </span>
          </div>
        )}

        {/* Badge Kategori di Kanan Atas */}
        {/* 'top-10' untuk HP, 'md:top-20' untuk desktop */}
        <div className="absolute top-16 md:top-40 -right-0 z-20">
          {/* 6. Gunakan event.color */}
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-bold text-white bg-gradient-to-r ${event.color} shadow-lg`}
          >
            {/* Translate Kategori: cat_workshop, cat_bazar, dll */}
            {t('cat_' + event.category.toLowerCase())}
          </span>
        </div>
      </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Judul: Jadi putih saat gelap */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-emerald-500 transition-all duration-300">
            {event.title}
          </h3>

          {/* Deskripsi: Jadi abu-abu terang saat gelap */}
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{event.description}</p>

          {/* Event Details */}
          <div className="space-y-2 mb-4 pb-4 border-b border-gray-100 dark:border-slate-700 flex-grow">
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Calendar className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
              <span className="font-medium">{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Clock className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
              <span className="font-medium">{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <MapPin className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
              <span className="font-medium">{event.location}</span>
            </div>
          </div>

          {/* Attendees & CTA */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[...Array(Math.min(3, Math.ceil(event.attendees / 50)))].map((_, i) => (
                  <div
                    key={i}
                    // 7. Gunakan event.color untuk avatar
                    className={`w-6 h-6 rounded-full bg-gradient-to-r ${event.color} border-2 border-white dark:border-slate-800 shadow`} 
                  ></div>
                ))}
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                {event.attendees}+ {t('event_attendees')}
              </span>
            </div>

            <button
              onClick={!isOngoing ? onRegister : undefined}
              disabled={isOngoing}
              className={`px-4 py-2 rounded-full text-sm font-bold text-white transition-all duration-300 transform hover:scale-105 ${
                isOngoing
                  ? "bg-gray-400 dark:bg-slate-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-emerald-500 hover:shadow-lg"
              }`}
            >
              {/* Translate Tombol */}
              {isOngoing ? t('event_btn_finished') : t('event_btn_register')}
            </button>
          </div>
        </div>
        
        {/* Hover Gradient Border */}
        <div
          // 8. Gunakan event.color
          className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${event.color} opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500`}
        ></div>
      </div>
    </div>
  )
}
"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Heart, Share2 } from "lucide-react"
import { categoryColors, type UmkmData, type UmkmCategory } from "@/data/umkm"
import { useLanguage } from "@/app/context/LanguageContext"

interface UMKMCardProps {
  umkm: UmkmData
}

const categoryTranslationKeys: Record<string, string> = {
  "Kuliner": "cat_kuliner",
  "Fashion": "cat_fashion",
  "Jasa & Lainnya": "cat_jasa"
};

export default function UMKMCard({ umkm }: UMKMCardProps) {
  const { language, t } = useLanguage()
  const [isLiked, setIsLiked] = useState(false)

  const colors = categoryColors[umkm.category as UmkmCategory] || categoryColors["Jasa & Lainnya"]

  const description = language === 'id' ? umkm.description : (umkm.description_en || umkm.description)
  const promoText = language === 'id' ? umkm.promo : (umkm.promo_en || umkm.promo)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault() 
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault() 
    e.stopPropagation()
    
    const shareUrl = `${window.location.origin}/umkm/${umkm.id}`
    const shareData = {
      title: umkm.name,
      text: `Cek UMKM keren ini: ${umkm.name}`,
      url: shareUrl,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(shareUrl)
        alert("Link tersalin ke clipboard!")
      }
    } catch (err) {
      console.error("Error sharing:", err)
    }
  }

  return (
    <Link href={`/umkm/${umkm.id}`} className="block h-full">
      <div className="group relative h-full flex flex-col bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-500">
        
        {/* Image Container */}
        <div className="relative h-48 bg-gray-100 dark:bg-slate-700 overflow-hidden rounded-t-xl"> 
          <Image
            src={umkm.gallery?.[0] || "/placeholder.svg"}
            alt={`Foto ${umkm.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
          
          <div
            className={`absolute inset-0 bg-gradient-to-t ${colors.from} ${colors.to} opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10 pointer-events-none`}
          ></div>

          {/* === ICON ACTIONS (LIKE & SHARE) === */}
          <div className="absolute top-12 right-2 z-30 flex flex-row gap-2 opacity-100 transition-opacity duration-300">
            {/* Tombol Like */}
            <button
              onClick={handleLike}
              className="p-1.5 md:p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 hover:scale-110 group/btn"
              title="Suka"
            >
              <Heart 
                className={`w-4 h-4 md:w-[18px] md:h-[18px] transition-colors ${isLiked ? "fill-pink-500 text-pink-500" : "text-gray-600 dark:text-gray-300 group-hover/btn:text-pink-500"}`} 
              />
            </button>

            {/* Tombol Share */}
            <button
              onClick={handleShare}
              className="p-1.5 md:p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 hover:scale-110 group/btn"
              title="Bagikan"
            >
              <Share2 
                className="w-4 h-4 md:w-[18px] md:h-[18px] text-gray-600 dark:text-gray-300 group-hover/btn:text-blue-500 transition-colors" 
              />
            </button>
          </div>

          {/* Category Badge */}
          <div className="absolute bottom-3 right-3 z-20">
            <span
              className={`${colors.badge} text-white text-[10px] md:text-xs font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full shadow-lg`}
            >
              {t(categoryTranslationKeys[umkm.category] || "cat_jasa")}
            </span>
          </div>
          
          {/* Promo Badge - STYLE BARU (Gradient Merah-Pink) */}
          {promoText && (
            <div className="absolute top-12 left-3 z-20"> 
              <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-[10px] md:text-xs font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full shadow-lg animate-pulse">
                {language === 'id' ? 'PROMO' : 'PROMO'}
              </span>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-4 md:p-5 flex flex-col flex-grow">
          <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white line-clamp-2 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {umkm.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1 mb-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-xs md:text-sm ${i < Math.floor(umkm.rating ?? 0) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs md:text-sm font-semibold text-gray-700 dark:text-slate-200">{umkm.rating?.toFixed(1) ?? 'N/A'}</span>
            <span className="text-[10px] md:text-xs text-gray-500 dark:text-slate-400">({umkm.reviews ?? 0})</span>
          </div>

          <p className="text-xs md:text-sm text-gray-600 dark:text-slate-300 mt-1 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-slate-200 flex-grow">
            {description}
          </p>

          {promoText && (
             <p className="text-[10px] md:text-xs text-red-500 dark:text-red-400 font-semibold mt-2">
                {promoText}
             </p>
          )}

          <div className="flex items-start gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-gray-400 dark:text-slate-500 mt-0.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <p className="text-[10px] md:text-xs text-gray-500 dark:text-slate-400 line-clamp-2">{umkm.address}</p>
          </div>

          {/* Tombol Lihat Detail */}
          <div className="mt-3 pt-3 md:mt-4 md:pt-3 border-t border-gray-100 dark:border-slate-700">
            <div
              className={`w-full text-center bg-gradient-to-r ${colors.from} ${colors.to} text-white font-semibold py-1.5 md:py-2 rounded-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transform md:group-hover:translate-y-0 md:translate-y-2 transition-all duration-300 text-xs md:text-sm`}
            >
              {t('umkm_view_detail')}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
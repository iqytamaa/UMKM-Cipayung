"use client"

import Link from "next/link"
import Image from "next/image"
// 1. Impor tipe data UmkmData dan UmkmCategory dari data Anda
import { categoryColors, type UmkmData, type UmkmCategory } from "@/data/umkm"

// 2. Gunakan tipe UmkmData yang diimpor
interface UMKMCardProps {
  umkm: UmkmData
}

export default function UMKMCard({ umkm }: UMKMCardProps) {
  // 3. Pastikan pencocokan tipe data (casting 'as' mungkin diperlukan jika 'category' masih string di interface)
  const colors = categoryColors[umkm.category as UmkmCategory] || categoryColors["Jasa & Lainnya"]

  return (
    // 4. Tambahkan className="block h-full" ke Link
    <Link href={`/umkm/${umkm.id}`} className="block h-full">
      {/* 5. Pastikan div ini memiliki h-full dan flex-col */}
      <div className="group relative h-full flex flex-col bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100 hover:border-blue-200">
        
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden bg-gray-100"> 
          <Image
            src={umkm.gallery?.[0] || "/placeholder.svg"} // Akses galeri dengan aman
            alt={`Foto ${umkm.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            // === 6. PERBAIKAN UTAMA: Ganti object-cover menjadi object-contain ===
            className="object-contain transition-transform duration-500 group-hover:scale-105" // BUKAN object-cover
          />
          {/* Overlay (opsional) */}
          <div
            className={`absolute inset-0 bg-gradient-to-t ${colors.from} ${colors.to} opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10 pointer-events-none`}
          ></div>

         {/* Category Badge */}
          <div className="absolute top-15 md:top-20 right-1 z-20">
            <span
              className={`${colors.badge} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}
            >
              {umkm.category}
            </span>
          </div>
          
          {/* Promo Badge */}
          {umkm.promo && (
            <div className="absolute top-15 md:top-20 left-1 z-20"> 
              <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg animate-pulse z-40">
                PROMO
              </span>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-5 flex flex-col flex-grow"> {/* 7. Pastikan ada flex-grow */}
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-1.5 group-hover:text-blue-600 transition-colors duration-300">
            {umkm.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2 mb-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-sm ${i < Math.floor(umkm.rating ?? 0) ? "text-yellow-400" : "text-gray-300"}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">{umkm.rating?.toFixed(1) ?? 'N/A'}</span>
            <span className="text-xs text-gray-500">({umkm.reviews ?? 0})</span>
          </div>

          {/* Deskripsi */}
          <p className="text-sm text-gray-600 mt-1 line-clamp-2 group-hover:text-gray-700 flex-grow">{/* 7. Pastikan ada flex-grow */}
            {umkm.description}
          </p>

          {/* Alamat */}
          <div className="flex items-start gap-2 mt-3 pt-3 border-t border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-gray-400 mt-0.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <p className="text-xs text-gray-500 line-clamp-2">{umkm.address}</p>
          </div>

          {/* Tombol Lihat Detail (Tersembunyi) */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div
              className={`w-full text-center bg-gradient-to-r ${colors.from} ${colors.to} text-white font-semibold py-2 rounded-lg opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-2 transition-all duration-300 text-sm`}
            >
              Lihat Detail
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
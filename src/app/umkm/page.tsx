"use client"

import { useState, useMemo, useEffect, JSX } from "react"
// Pastikan path import data dan komponen benar
import { umkmData, type UmkmData } from "@/data/umkm" 
import UMKMCard from "@/app/components/UMKMCard" // Saya perbaiki path ke @/components/
import { ShoppingBag, Shirt, Wrench } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import CustomPointer from "@/app/components/CustomPointer"

// Tipe spesifik untuk kategori
type UmkmCategory = "Kuliner" | "Fashion" | "Jasa & Lainnya";

// Mapping ikon kategori
const categoryIcons: Record<UmkmCategory, JSX.Element> = {
  Kuliner: <ShoppingBag className="w-4 h-4" />,
  Fashion: <Shirt className="w-4 h-4" />,
  "Jasa & Lainnya": <Wrench className="w-4 h-4" />,
}

// Definisikan array categories secara lokal
const categories: UmkmCategory[] = ["Kuliner", "Fashion", "Jasa & Lainnya"]

export default function UMKMPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<UmkmCategory | "">("")
  const [showAll, setShowAll] = useState(false)

  // Inisialisasi AOS
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      offset: 50,
      easing: 'ease-out-quad',
    });
  }, []);

  // Logika filter UMKM
  const filteredUMKM = useMemo(() => {
    const queryLower = searchQuery.toLowerCase();
    const isSearchingPromo = queryLower === "promo";

    return umkmData.filter((umkm: UmkmData) => {
      const matchesPromo = isSearchingPromo ? !!umkm.promo : true;
      
      const matchesText = isSearchingPromo
        ? true 
        : (umkm.name?.toLowerCase().includes(queryLower) ||
           umkm.description?.toLowerCase().includes(queryLower));

      const matchesCategory = selectedCategory ? umkm.category === selectedCategory : true;
      
      if (isSearchingPromo) {
          return matchesPromo && matchesCategory;
      }
      return matchesText && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Logika tampilkan 6 item awal
  const itemsToShowInitially = 6;
  const displayedUMKM = showAll ? filteredUMKM : filteredUMKM.slice(0, itemsToShowInitially);
  const hasMore = filteredUMKM.length > itemsToShowInitially;

  // Reset showAll saat filter berubah
  useEffect(() => {
    setShowAll(false);
  }, [searchQuery, selectedCategory]);

  return (

    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-gray-50 to-white">
      {/* Hero Section */}
      <CustomPointer />
      <div data-aos="fade-in" className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-50"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 data-aos="fade-up" data-aos-delay="100" className="text-4xl md:text-5xl font-bold mb-3 text-balance">
            Direktori UMKM Setu Cipayung
          </h1>
          <p data-aos="fade-up" data-aos-delay="200" className="text-lg text-blue-100 max-w-2xl">
            Jelajahi dan dukung bisnis lokal berkualitas di lingkungan kita.
          </p>
        </div>
      </div>

      {/* Search & Filter Section (Sticky) */}
      <div className="md:top-[68px] z-30 bg-gradient-to-b from-blue-50/95 via-gray-50/95 to-white/95 backdrop-blur-sm border-b border-gray-200/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div data-aos="fade-up" data-aos-delay="250" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Cari UMKM atau ketik 'Promo'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-11 rounded-lg border-2 border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all text-sm shadow-sm"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </span>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 items-center">
              <button
                onClick={() => setSelectedCategory("")}
                className={`px-4 py-2 rounded-lg font-semibold transition-all text-xs md:text-sm flex items-center gap-1.5 shadow-sm border ${
                  selectedCategory === ""
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                }`}
              >
                Semua
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all text-xs md:text-sm flex items-center gap-1.5 shadow-sm border ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                  }`}
                >
                  {categoryIcons[cat]}
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* UMKM Grid Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:pt-12" id="umkm-grid-section">
        {filteredUMKM.length > 0 ? (
          <>
            {/* Grid wrapper */}
            {/* PERBAIKAN: 'grid-auto-rows-1fr' bisa ditambahkan jika h-full tidak cukup, tapi h-full di child harusnya bekerja */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-12">
              {displayedUMKM.map((umkm, index) => (
                 // === PERBAIKAN DI SINI ===
                 // Tambahkan className="h-full" agar div ini mengisi tinggi grid cell
                 <div 
                   key={umkm.id} 
                   data-aos="fade-up" 
                   data-aos-delay={index * 50} 
                   className="h-full" 
                 >
                    <UMKMCard umkm={umkm} />
                 </div>
              ))}
            </div>

            {/* Tombol Lihat Selengkapnya/Sedikit */}
            {hasMore && !showAll && (
              <div data-aos="fade-up" data-aos-delay="100" className="flex justify-center pb-12">
                <button
                  onClick={() => setShowAll(true)}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  Lihat Selengkapnya (+{filteredUMKM.length - itemsToShowInitially})
                </button>
              </div>
            )}
             {showAll && (
              <div data-aos="fade-in" className="flex justify-center pb-12">
                <button
                  onClick={() => {
                      setShowAll(false);
                      document.getElementById('umkm-grid-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                  Tampilkan Lebih Sedikit
                </button>
              </div>
            )}
          </>
        ) : (
          // Pesan "Tidak Ditemukan"
          <div data-aos="fade-up" data-aos-delay="100" className="text-center py-20 bg-white rounded-lg shadow border border-gray-100 mt-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-400 mb-4"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">UMKM tidak ditemukan</h3>
            <p className="text-gray-500">Coba ubah kata kunci pencarian atau filter kategori Anda.</p>
          </div>
        )}
      </div>

       {/* Style (Keyframes) */}
      <style jsx global>{`
        /* Pastikan keyframes slideUp didefinisikan di sini atau di globals.css / tailwind.config */
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp {
            animation: slideUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
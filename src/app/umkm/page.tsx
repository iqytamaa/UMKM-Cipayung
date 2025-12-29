"use client"

import { useState, useMemo, useEffect, JSX, Fragment } from "react"
import { umkmData, type UmkmData } from "@/data/umkm" 
import Image from "next/image"
import UMKMCard from "@/app/components/UMKMCard"
import { ShoppingBag, Shirt, Wrench } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useLanguage } from "@/app/context/LanguageContext"

type UmkmCategory = "Kuliner" | "Fashion" | "Jasa & Lainnya";

const categoryIcons: Record<UmkmCategory, JSX.Element> = {
  Kuliner: <ShoppingBag className="w-4 h-4" />,
  Fashion: <Shirt className="w-4 h-4" />,
  "Jasa & Lainnya": <Wrench className="w-4 h-4" />,
}

const categoryTranslationKeys: Record<UmkmCategory, string> = {
  Kuliner: "cat_kuliner",
  Fashion: "cat_fashion",
  "Jasa & Lainnya": "cat_jasa",
}

const categories: UmkmCategory[] = ["Kuliner", "Fashion", "Jasa & Lainnya"]

export default function UMKMPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<UmkmCategory | "">("")
  const [showAll, setShowAll] = useState(false)

  const { t } = useLanguage()

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      offset: 50,
      easing: 'ease-out-quad',
    });
  }, []);

  const filteredUMKM = useMemo(() => {
    const queryLower = searchQuery.toLowerCase();
    const isSearchingPromo = queryLower === "promo";

    return umkmData.filter((umkm: UmkmData) => {
      const hasPromo = umkm.promo || umkm.promo_en;
      const matchesPromo = isSearchingPromo ? !!hasPromo : true;
      
      const matchesText = isSearchingPromo
        ? true 
        : (
            umkm.name?.toLowerCase().includes(queryLower) ||
            umkm.description?.toLowerCase().includes(queryLower) ||
            umkm.description_en?.toLowerCase().includes(queryLower)
          );

      const matchesCategory = selectedCategory ? umkm.category === selectedCategory : true;
      
      if (isSearchingPromo) {
          return matchesPromo && matchesCategory;
      }
      return matchesText && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const itemsToShowInitially = 6;
  const displayedUMKM = showAll ? filteredUMKM : filteredUMKM.slice(0, itemsToShowInitially);
  const hasMore = filteredUMKM.length > itemsToShowInitially;

  useEffect(() => {
    setShowAll(false);
  }, [searchQuery, selectedCategory]);

  return (
    // 1. UPDATE BACKGROUND UTAMA: Support Dark Mode (slate-900)
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-gray-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 overflow-x-hidden transition-colors duration-300">
      
      {/* Hero Section */}
      <div data-aos="fade-in" className="relative bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-slate-900 text-white py-16 md:py-20 ">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full  opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full  opacity-50"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            
            {/* Kolom 1: Teks */}
            <div className="md:w-2/3 text-center md:text-left">
              <h1 data-aos="fade-up" data-aos-delay="100" className="text-4xl md:text-6xl font-bold mb-3 text-balance text-white dark:text-slate-100">
                {t('umkm_page_title')}
              </h1>
              <p data-aos="fade-up" data-aos-delay="200" className="text-xl text-blue-100 dark:text-slate-300 max-w-2xl mx-auto md:mx-0">
                {t('umkm_page_desc')}
              </p>
            </div>

            {/* Kolom 2: Gambar */}
            <div 
              className="md:w-1/3 flex justify-center" 
              data-aos="fade-left" 
              data-aos-delay="300"
            >
              <Image
                src="/Logo/umkm.svg"
                alt="Logo UMKM Setu Cipayung"
                width={200}
                height={200}
                priority
              />
            </div>

          </div>
        </div>
      </div>

      {/* Search & Filter Section */}
      {/* 2. UPDATE SEARCH BAR: Ubah background jadi gelap saat dark mode */}
      <div className="bg-gradient-to-b from-blue-50/95 via-gray-50/95 to-white/95 dark:from-slate-900/95 dark:via-slate-900/95 dark:to-slate-950/95 border-b border-gray-200/60 dark:border-slate-800 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div data-aos="fade-up" data-aos-delay="250" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder={t('umkm_search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                // Update style input untuk dark mode
                className="w-full px-4 py-3 pl-11 rounded-lg border-2 border-gray-300 bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 focus:outline-none transition-all text-sm shadow-sm placeholder-gray-400 dark:placeholder-gray-500"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </span>
            </div>

            {/* Category Filter */}
            <div className="flex flex-nowrap gap-2 items-center overflow-x-auto">
              <button
                onClick={() => setSelectedCategory("")}
                // Update tombol filter
                className={`px-4 py-2 rounded-lg font-semibold transition-all text-xs md:text-sm flex items-center gap-1.5 shadow-sm border ${
                  selectedCategory === ""
                    ? "bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700"
                }`}
              >
                {t('umkm_category_all')}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all text-xs md:text-sm flex items-center gap-1.5 shadow-sm border ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700"
                  }`}
                >
                  {categoryIcons[cat]}
                  {t(categoryTranslationKeys[cat])}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-12">
              {displayedUMKM.map((umkm, index) => (
                <Fragment key={umkm.id}>
                  <div
                    data-aos="fade-up"
                    data-aos-delay={index * 50}
                    className="relative group h-full aspect-[4/5] md:pt-0 md:aspect-auto"
                  >
                    <Image
                      src="/UMKM/frame.svg"
                      alt="Frame UMKM"
                      layout="fill"
                      objectFit="fill"
                      className="z-20 transition-transform duration-300 ease-in-out group-hover:scale-105 pointer-events-none"
                    />
                    <div className="relative z-10 h-full pt-8 pb-6 px-[37px] md:pt-25 md:px-12 transition-transform duration-300 ease-in-out group-hover:scale-105">
                      <UMKMCard umkm={umkm} />
                    </div>
                  </div>

                  { (index + 1) % 6 === 3 && (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-between items-center py-18 my-5">
                      <div data-aos="fade-right" data-aos-delay="500" className="-ml-16">
                        <Image
                          src="/Logo/Vector 1.svg"
                          alt="Decorative Vector Left"
                          width={300}
                          height={300}
                        />
                      </div>
                      <div data-aos="fade-left" data-aos-delay="600" className="-mr-16">
                        <Image
                          src="/Logo/Vector 2.svg"
                          alt="Decorative Vector Right"
                          width={300}
                          height={300}
                        />
                      </div>
                    </div>
                  )}
                </Fragment>
              ))}
            </div>

            {/* Tombol Lihat Selengkapnya */}
            {hasMore && !showAll && (
              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="flex justify-center pb-12 relative z-2"
              >
                <button
                  onClick={() => setShowAll(true)}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  {t('umkm_btn_show_more')} (+{filteredUMKM.length - itemsToShowInitially})
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
                  className="px-8 py-3 bg-gray-500 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                  {t('umkm_btn_show_less')}
                </button>
              </div>
            )}
          </>
        ) : (
          // Pesan Tidak Ditemukan
          <div data-aos="fade-up" data-aos-delay="100" className="text-center py-20 bg-white dark:bg-slate-800 rounded-lg shadow border border-gray-100 dark:border-slate-700 mt-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-400 dark:text-slate-500 mb-4"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-slate-200 mb-2">{t('umkm_not_found_title')}</h3>
            <p className="text-gray-500 dark:text-slate-400">{t('umkm_not_found_desc')}</p>
          </div>
        )}
      </div>

      <style jsx global>{`
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
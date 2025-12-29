"use client"

import React, { JSX, useState, useEffect } from "react"
import ArticleCard from "@/app/components/article-card" 
import { TrendingUp, Palette, Share2, Lightbulb, DollarSign, Award } from "lucide-react"
import AOS from "aos" 
import "aos/dist/aos.css" 
import Image from "next/image"
import { useLanguage } from "@/app/context/LanguageContext"

type Category = "Marketing" | "Branding" | "Social Media" | "Inovasi" | "Keuangan" | "Sertifikasi"

const categoryIcons: Record<Category, JSX.Element> = {
  Marketing: <TrendingUp className="w-5 h-5" />,
  Branding: <Palette className="w-5 h-5" />,
  "Social Media": <Share2 className="w-5 h-5" />,
  Inovasi: <Lightbulb className="w-5 h-5" />,
  Keuangan: <DollarSign className="w-5 h-5" />,
  Sertifikasi: <Award className="w-5 h-5" />,
}

const categoryTranslationKeys: Record<Category, string> = {
  Marketing: "news_cat_marketing",
  Branding: "news_cat_branding",
  "Social Media": "news_cat_social_media",
  Inovasi: "news_cat_inovasi",
  Keuangan: "news_cat_keuangan",
  Sertifikasi: "news_cat_sertifikasi",
}

interface ArticleData {
  id: number
  title: string
  title_en: string
  excerpt: string
  excerpt_en: string
  category: Category
  date: string
  image: string
  color: string
  link: string
}

const articles: ArticleData[] = [
  {
    id: 1,
    title: "Tips Meningkatkan Penjualan UMKM di Era Digital",
    title_en: "Tips to Increase MSME Sales in the Digital Era",
    excerpt: "Pelajari strategi digital marketing yang efektif untuk meningkatkan penjualan bisnis Anda.",
    excerpt_en: "Learn effective digital marketing strategies to boost your business sales.",
    category: "Marketing",
    date: "15 Januari 2025",
    image: "/Berita/digital-marketing-umkm.jpg",
    color: "from-blue-500 to-cyan-500",
    link: "https://indibiz.co.id/artikel/strategi-pemasaran-digital-panduan-umkm-untuk-sukses",
  },
  {
    id: 2,
    title: "Panduan Lengkap Branding untuk UMKM Lokal",
    title_en: "Complete Branding Guide for Local MSMEs",
    excerpt: "Ciptakan identitas brand yang kuat dan memorable untuk bisnis lokal Anda.",
    excerpt_en: "Create a strong and memorable brand identity for your local business.",
    category: "Branding",
    date: "12 Januari 2025",
    image: "/Berita/branding-umkm.jpg",
    color: "from-purple-500 to-pink-500",
    link: "https://rumahsiapkerja.com/blog/panduan-lengkap-media-branding-untuk-umkm-dari-cara-lama-hingga-tren-terbaru",
  },
  {
    id: 3,
    title: "Manfaatkan Media Sosial untuk Promosi Gratis",
    title_en: "Leveraging Social Media for Free Promotion",
    excerpt: "Strategi media sosial yang efektif meningkatkan engagement dan konversi penjualan.",
    excerpt_en: "Effective social media strategies to increase engagement and sales conversion.",
    category: "Social Media",
    date: "10 Januari 2025",
    image: "/Berita/social-media-marketing.png",
    color: "from-orange-500 to-red-500",
    link: "https://business.adobe.com/blog/basics/smm-benefits",
  },
  {
    id: 4,
    title: "Inovasi Produk: Dari Ide hingga Peluncuran",
    title_en: "Product Innovation: From Idea to Launch",
    excerpt: "Langkah praktis mengembangkan produk inovatif yang sesuai kebutuhan pasar.",
    excerpt_en: "Practical steps to develop innovative products that meet market needs.",
    category: "Inovasi",
    date: "8 Januari 2025",
    image: "/Berita/product-innovation.png",
    color: "from-green-500 to-emerald-500",
    link: "https://asana.com/id/resources/product-development-process",
  },
  {
    id: 5,
    title: "Manajemen Keuangan UMKM yang Sehat",
    title_en: "Healthy Financial Management for MSMEs",
    excerpt: "Kelola keuangan bisnis dengan baik menggunakan tools dan strategi yang tepat.",
    excerpt_en: "Manage business finances well using the right tools and strategies.",
    category: "Keuangan",
    date: "5 Januari 2025",
    image: "/Berita/financial-management-concept.png",
    color: "from-indigo-500 to-blue-500",
    link: "https://www.cbi.id/id/articles/kesehatan-keuangan-umkm/",
  },
  {
    id: 6,
    title: "Sertifikasi dan Standar Kualitas untuk UMKM",
    title_en: "Certification and Quality Standards for MSMEs",
    excerpt: "Tingkatkan kredibilitas bisnis dengan memperoleh sertifikasi dan standar kualitas.",
    excerpt_en: "Increase business credibility by obtaining certification and quality standards.",
    category: "Sertifikasi",
    date: "2 Januari 2025",
    image: "/Berita/quality-certification.png",
    color: "from-rose-500 to-pink-500",
    link: "https://lspumkm-wi.co.id/jenis-sertifikasi-profesi-umkm-untuk-pengembangan-bisnis/",
  },
]

export default function BeritaPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const { t, language } = useLanguage()

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      offset: 50,
      easing: 'ease-out-quad',
    })
  }, [])

  const categories: Category[] = ["Marketing", "Branding", "Social Media", "Inovasi", "Keuangan", "Sertifikasi"]

  const filteredArticles = selectedCategory
    ? articles.filter((article) => article.category === selectedCategory)
    : articles

  return (
    // UPDATE BACKGROUND: Support Dark Mode (slate-950)
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 overflow-x-hidden transition-colors duration-300">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 dark:from-blue-900 dark:via-blue-800 dark:to-slate-900 py-16 sm:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8  z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="md:w-2/3 text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
                {t('news_page_title')}
              </h1>
              <p className="text-xl sm:text-1xl text-blue-100 dark:text-slate-300 max-w-2xl animate-fade-in animation-delay-200">
                {t('news_page_desc')}
              </p>
            </div>
            <div 
              className="md:w-1/3 flex justify-center" 
              data-aos="fade-left" 
              data-aos-delay="300"
            >
              <Image
                src="/Logo/berita.svg"
                alt="Logo Berita"
                width={200}
                height={200}
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
        data-aos="fade-up"
      >
        <div className="flex flex-nowrap justify-start md:justify-center gap-3 overflow-x-auto mb-10 pb-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-8 py-1 dan md:px-6 md:py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
              selectedCategory === null
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-500 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700"
            }`}
          >
            {t('news_category_all')}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-1.5 py-1 md:px-4 md:py-1 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-500 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700"
              }`}
            >
              {categoryIcons[category]}
              {t(categoryTranslationKeys[category])}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => {
            const localizedArticle = {
              ...article,
              title: language === 'id' ? article.title : article.title_en,
              excerpt: language === 'id' ? article.excerpt : article.excerpt_en,
            }

            return (
              <React.Fragment key={article.id}>
                <div 
                  data-aos="fade-up" 
                  data-aos-delay={index * 100}
                  className="relative group pt-10 aspect-[3/4]"
                >
                  <Image
                    src="/Berita/frame.svg" 
                    alt="Frame Berita"
                    layout="fill"
                    objectFit="fill"
                    className="z-20 transition-transform duration-300 ease-in-out group-hover:scale-105 pointer-events-none" 
                  />

                  <div className="relative z-10 h-full pt-7 pb-2 px-0 md:pt-6 md:px-15 transition-transform duration-300 ease-in-out group-hover:scale-105"> 
                    {/* ArticleCard sudah kita update sebelumnya untuk support dark mode di dalamnya */}
                    <ArticleCard article={localizedArticle} delay={0} />
                  </div>
                </div>

                {index === 2 && (
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
              </React.Fragment>
            )
          })}
        </div>

        {filteredArticles.length === 0 && (
          <div
            className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-700"
            data-aos="fade-in"
            data-aos-delay="100"
          >
            <p className="text-gray-500 dark:text-slate-400 text-lg">{t('news_no_articles')}</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animation-delay-200 { animation-delay: 0.2s; }
      `}</style>
    </div>
  )
}
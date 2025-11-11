"use client"

import { JSX, useState, useEffect } from "react" // 1. Tambahkan useEffect
// Sesuaikan path ke komponen Anda, misal: "@/components/article-card"
import ArticleCard from "@/app/components/article-card" 
import { TrendingUp, Palette, Share2, Lightbulb, DollarSign, Award } from "lucide-react"
import AOS from "aos" // 2. Impor AOS
import "aos/dist/aos.css" // 3. Impor CSS AOS
import CustomPointer from "@/app/components/CustomPointer"
import Image from "next/image"
import React from "react"


// 1. Definisikan tipe spesifik untuk Kategori
type Category = "Marketing" | "Branding" | "Social Media" | "Inovasi" | "Keuangan" | "Sertifikasi"

// 2. Beri tipe pada categoryIcons (Record<Category, JSX.Element>)
const categoryIcons: Record<Category, JSX.Element> = {
  Marketing: <TrendingUp className="w-5 h-5" />,
  Branding: <Palette className="w-5 h-5" />,
  "Social Media": <Share2 className="w-5 h-5" />,
  Inovasi: <Lightbulb className="w-5 h-5" />,
  Keuangan: <DollarSign className="w-5 h-5" />,
  Sertifikasi: <Award className="w-5 h-5" />,
}

// 3. Definisikan interface untuk data artikel, tambahkan 'link'
interface ArticleData {
  id: number
  title: string
  excerpt: string
  category: Category // Gunakan tipe Category
  date: string
  image: string
  color: string
  link: string // Properti 'link' yang wajib ada
}

// 4. Terapkan interface ArticleData dan tambahkan properti 'link'
const articles: ArticleData[] = [
  {
    id: 1,
    title: "Tips Meningkatkan Penjualan UMKM di Era Digital",
    excerpt: "Pelajari strategi digital marketing yang efektif untuk meningkatkan penjualan bisnis Anda.",
    category: "Marketing",
    date: "15 Januari 2025",
    image: "/Berita/digital-marketing-umkm.jpg", // Pastikan path gambar benar
    color: "from-blue-500 to-cyan-500",
    link: "https://indibiz.co.id/artikel/strategi-pemasaran-digital-panduan-umkm-untuk-sukses", // Link referensi
  },
  {
    id: 2,
    title: "Panduan Lengkap Branding untuk UMKM Lokal",
    excerpt: "Ciptakan identitas brand yang kuat dan memorable untuk bisnis lokal Anda.",
    category: "Branding",
    date: "12 Januari 2025",
    image: "/Berita/branding-umkm.jpg",
    color: "from-purple-500 to-pink-500",
    link: "https://rumahsiapkerja.com/blog/panduan-lengkap-media-branding-untuk-umkm-dari-cara-lama-hingga-tren-terbaru",
  },
  {
    id: 3,
    title: "Manfaatkan Media Sosial untuk Promosi Gratis",
    excerpt: "Strategi media sosial yang efektif meningkatkan engagement dan konversi penjualan.",
    category: "Social Media",
    date: "10 Januari 2025",
    image: "/Berita/social-media-marketing.png",
    color: "from-orange-500 to-red-500",
    link: "https://business.adobe.com/blog/basics/smm-benefits",
  },
  {
    id: 4,
    title: "Inovasi Produk: Dari Ide hingga Peluncuran",
    excerpt: "Langkah praktis mengembangkan produk inovatif yang sesuai kebutuhan pasar.",
    category: "Inovasi",
    date: "8 Januari 2025",
    image: "/Berita/product-innovation.png",
    color: "from-green-500 to-emerald-500",
    link: "https://asana.com/id/resources/product-development-process",
  },
  {
    id: 5,
    title: "Manajemen Keuangan UMKM yang Sehat",
    excerpt: "Kelola keuangan bisnis dengan baik menggunakan tools dan strategi yang tepat.",
    category: "Keuangan",
    date: "5 Januari 2025",
    image: "/Berita/financial-management-concept.png",
    color: "from-indigo-500 to-blue-500",
    link: "https://www.cbi.id/id/articles/kesehatan-keuangan-umkm/",
  },
  {
    id: 6,
    title: "Sertifikasi dan Standar Kualitas untuk UMKM",
    excerpt: "Tingkatkan kredibilitas bisnis dengan memperoleh sertifikasi dan standar kualitas.",
    category: "Sertifikasi",
    date: "2 Januari 2025",
    image: "/Berita/quality-certification.png",
    color: "from-rose-500 to-pink-500",
    link: "https://lspumkm-wi.co.id/jenis-sertifikasi-profesi-umkm-untuk-pengembangan-bisnis/",
  },
]

export default function BeritaPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  // 4. Tambahkan hook useEffect untuk inisialisasi AOS
  useEffect(() => {
    AOS.init({
      duration: 700, // Durasi animasi
      once: true, // Animasi hanya berjalan sekali
      offset: 50, // Trigger offset
      easing: 'ease-out-quad',
    })
  }, [])

  const categories: Category[] = ["Marketing", "Branding", "Social Media", "Inovasi", "Keuangan", "Sertifikasi"]

  const filteredArticles = selectedCategory
    ? articles.filter((article) => article.category === selectedCategory)
    : articles

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <CustomPointer />
      {/* Hero Section (Memiliki animasi bawaan 'animate-fade-in') */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 py-16 sm:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8  z-10">
     {/* Wrapper Flex untuk layout 2 kolom */}
  <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">

    {/* Kolom 1: Teks (dibuat rata kiri) */}
    <div className="md:w-2/3 text-center md:text-left">
      <h1 className="text-x6l sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
        Berita UMKM Setu Cipayung
      </h1>
      {/* Paragraf (dihapus 'mx-auto') */}
     <p className="text-xl sm:text-1xl text-blue-100 max-w-2xl animate-fade-in animation-delay-200">
  Dapatkan insights, tips, dan tren terbaru seputar UMKM Cipayung dan dunia bisnis digital
</p>
    </div>

    {/* Kolom 2: Gambar (Elemen baru) */}
    <div 
              className="md:w-1/3 flex justify-center" 
              data-aos="fade-left" 
              data-aos-delay="300"
            >
              <Image
                src="/Logo/berita.svg" // Path dari folder /public
                alt="Logo UMKM Setu Cipayung"
                width={200}  // Sesuaikan ukurannya
                height={200} // Sesuaikan ukurannya
                priority
              />
            </div>

  </div>
</div>
</div>

      {/* Filter Section */}
      
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
        data-aos="fade-up" // 5. Tambahkan AOS di sini
      >
       {/* ... di dalam Filter Section ... */}

{/* INI BARIS YANG BARU */}
<div className="flex flex-nowrap justify-center gap-3 overflow-x-auto mb-10 pb-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-8 py-1 dan md:px-6 md:py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
              selectedCategory === null
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-500"
            }`}
          >
            Semua
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-1.5 py-1 md:px-4 md:py-1 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-500"
              }`}
            >
              {categoryIcons[category]}
              {category}
            </button>
          ))}
        </div>

        {/* Articles Grid (Sudah dimodifikasi dengan Frame) */}
{/* Articles Grid (Sudah dimodifikasi dengan Frame) */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {filteredArticles.map((article, index) => (
    // Menggunakan React Fragment untuk menyisipkan elemen di antara map
    <React.Fragment key={article.id}>
      {/* Kartu Artikel Biasa */}
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
          <ArticleCard article={article} delay={0} />
        </div>
      </div>

      {/* === SISIPKAN GAMBAR DI SINI SETELAH ARTIKEL KE-3 === */}
      {index === 2 && ( // Tampilkan setelah artikel dengan index 2 (artikel ke-3)
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-between items-center py-18 my-5">{/* Full width di semua ukuran */}
          
          {/* 2. Gambar Kiri (Vector 1.svg) - Path ditukar */}
          <div data-aos="fade-right" data-aos-delay="500" className="-ml-16">
            <Image
              src="/Logo/Vector 1.svg" // <-- Path ditukar
              alt="Decorative Vector Left"
              width={300} 
              height={300} 
            />
          </div>

          {/* 3. Gambar Kanan (Vector 2.svg) - Path ditukar */}
          <div data-aos="fade-left" data-aos-delay="600" className="-mr-16">
            <Image
              src="/Logo/Vector 2.svg" // <-- Path ditukar
              alt="Decorative Vector Right"
              width={300} 
              height={300} 
            />
          </div>
        </div>
      )}
    </React.Fragment>
  ))}
</div>



        {filteredArticles.length === 0 && (
          <div
            className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200"
            data-aos="fade-in" // 7. Tambahkan AOS di sini
            data-aos-delay="100"
          >
            <p className="text-gray-500 text-lg">Tidak ada artikel dalam kategori ini.</p>
          </div>
        )}
      </div>

      {/* Tetap sertakan keyframes jika digunakan oleh Hero Section */}
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

        /* Pastikan keyframes slideUp juga ada jika ArticleCard menggunakannya */
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
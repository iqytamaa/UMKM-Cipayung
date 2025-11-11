"use client"

import Image from "next/image"

// 1. Definisikan tipe Kategori (HARUS SAMA DENGAN DI page.tsx)
type Category = "Marketing" | "Branding" | "Social Media" | "Inovasi" | "Keuangan" | "Sertifikasi"

// 2. Definisikan interface (HARUS SAMA DENGAN DI page.tsx)
interface ArticleData {
  id: number
  title: string
  excerpt: string
  category: Category
  date: string
  image: string
  color: string
  link: string 
}

// 3. Definisikan props untuk komponen ini
interface ArticleCardProps {
  article: ArticleData
  delay?: number // Prop 'delay' ini sekarang diabaikan, karena AOS di page.tsx yang menangani
}

export default function ArticleCard({ article }: ArticleCardProps) {
  // 4. Hapus 'useState' untuk 'isHovered' (memperbaiki error 'isHovered' is assigned a value but never used)
  // const [isHovered, setIsHovered] = useState(false)

  return (
    // 5. Bungkus dengan <a> untuk link, hapus 'animate-slideUp'
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group cursor-pointer block h-full" // Tambah h-full
    >
      {/* 6. Tambah 'flex flex-col h-full' agar kartu memiliki tinggi yang sama */}
      <div className="relative h-full flex flex-col bg-white rounded-2xl  shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
        
        {/* Image Container */}
        <div className="relative h-48 w-full  bg-gray-100">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${article.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10`}
          ></div>
          <Image
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            // === 7. PERBAIKAN UTAMA: Ganti object-cover menjadi object-contain ===
            className="object-contain transition-transform duration-500 group-hover:scale-105" 
          />
          
          <div className="absolute top-20 right-1 md:top-36 md:right-4 z-20">
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r ${article.color} shadow-lg`}
            >
              {article.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow"> {/* 8. Tambah flex-grow */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500 font-medium">{article.date}</span>
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${article.color}`}></div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 transition-all duration-300">
            {article.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{/* 8. Tambah flex-grow */}
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto"> {/* 9. Tambah mt-auto */}
            <span className="text-sm font-semibold text-blue-600 group-hover:underline">
              Baca Selengkapnya
            </span>
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Hover Gradient Border */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${article.color} opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500`}
        ></div>
      </div>
    </a>
  )
}
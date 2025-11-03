"use client"

// === PERBAIKAN DI SINI: 'JSX' DIHAPUS DARI IMPORT ===
import { useState, useEffect } from "react" 
import type { JSX } from "react" // Impor JSX sebagai tipe jika diperlukan
// Sesuaikan path jika perlu (misal: @/components/...)
import EventCard from "@/app/components/event-card"
import EventRegistrationModal from "@/app/components/event-registration-modal"
import { BookOpen, ShoppingCart, Users, GraduationCap, Presentation, MessageSquare } from "lucide-react"
import AOS from "aos" // Impor AOS
import "aos/dist/aos.css" // Impor CSS AOS
import CustomPointer from "@/app/components/CustomPointer"
import Image from "next/image"


// Definisikan tipe EventData
interface EventData {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  category: Category // Gunakan Tipe Category
  attendees: number
  image: string
  color: string // 'color' KEMBALI DIGUNAKAN
  status: "upcoming" | "ongoing"
}

// Tipe Kategori Spesifik
type Category = "Workshop" | "Bazar" | "Networking" | "Pelatihan" | "Seminar" | "Konsultasi";

// --- Event Data (6 upcoming, 6 ongoing) ---
const upcomingEvents: EventData[] = [
  { id: 1, title: "Workshop Digital Marketing untuk UMKM", description: "Pelajari strategi digital marketing terkini...", date: "25 Nov 2025", time: "10:00 - 13:00 WIB", location: "Cipayung Community Center", category: "Workshop", attendees: 45, image: "/Events/workshop-digital-marketing.jpg", color: "from-blue-500 to-indigo-600", status: "upcoming" },
  { id: 2, title: "Bazar UMKM Cipayung 2025", description: "Pameran dan penjualan produk UMKM lokal...", date: "1 Des 2025", time: "09:00 - 17:00 WIB", location: "Lapangan Cipayung", category: "Bazar", attendees: 200, image: "/Events/Bazar UMKM Cipayung 2025.jpg", color: "from-orange-500 to-red-500", status: "upcoming" },
  { id: 3, title: "Networking Session UMKM Cipayung", description: "Kesempatan bertemu dan berkolaborasi...", date: "8 Des 2025", time: "14:00 - 17:00 WIB", location: "Cipayung Business Hub", category: "Networking", attendees: 60, image: "/Events/Networking Session UMKM Cipayung.jpg", color: "from-purple-500 to-pink-500", status: "upcoming" },
  { id: 4, title: "Pelatihan Manajemen Keuangan UMKM", description: "Kuasai teknik pengelolaan keuangan...", date: "15 Des 2025", time: "10:00 - 12:00 WIB", location: "Cipayung Community Center", category: "Pelatihan", attendees: 35, image: "/Events/Pelatihan Manajemen Keuangan UMKM.jpg", color: "from-green-500 to-emerald-600", status: "upcoming" },
  { id: 8, title: "Kelas Fotografi Produk UMKM", description: "Belajar teknik foto produk yang menjual...", date: "18 Des 2025", time: "09:00 - 12:00 WIB", location: "Studio Kreatif Cipayung", category: "Workshop", attendees: 20, image: "/Events/Kelas Fotografi Produk UMKM.jpg", color: "from-blue-500 to-indigo-600", status: "upcoming" },
  { id: 9, title: "Diskusi Legalitas Usaha UMKM", description: "Pahami aspek hukum & perizinan...", date: "22 Des 2025", time: "13:00 - 15:00 WIB", location: "Kantor Kelurahan Setu", category: "Seminar", attendees: 40, image: "/Events/Diskusi Legalitas Usaha UMKM.jpg", color: "from-gray-500 to-slate-600", status: "upcoming" },
]

const ongoingEvents: EventData[] = [
  { id: 5, title: "Seminar Inovasi Produk dan Packaging", description: "Tingkatkan daya tarik produk...", date: "28 Okt 2025", time: "13:00 - 15:30 WIB", location: "Cipayung Innovation Center", category: "Seminar", attendees: 50, image: "/Events/Seminar Inovasi Produk dan Packaging.jpg", color: "from-gray-500 to-slate-600", status: "ongoing" },
  { id: 6, title: "Konsultasi Bisnis Gratis untuk UMKM", description: "Dapatkan konsultasi langsung...", date: "29 Okt 2025", time: "10:00 - 16:00 WIB", location: "Cipayung Business Hub", category: "Konsultasi", attendees: 25, image: "/Events/Konsultasi Bisnis Gratis untuk UMKM.jpg", color: "from-rose-500 to-pink-600", status: "ongoing" },
  { id: 7, title: "Pameran Foto Produk UMKM", description: "Lihat karya fotografi produk UMKM terbaik...", date: "27 Okt 2025", time: "11:00 - 17:00 WIB", location: "Galeri Komunitas Cipayung", category: "Bazar", attendees: 100, image: "/Events/Pameran Foto Produk UMKM.jpg", color: "from-orange-500 to-red-500", status: "ongoing" },
  // 3 EVENT BARU (ONGOING)
  { id: 10, title: "Pelatihan Live Selling TikTok", description: "Tips & trik banjir order dari live streaming...", date: "29 Okt 2025", time: "14:00 - 16:00 WIB", location: "Cipayung Community Center", category: "Pelatihan", attendees: 50, image: "/Events/Pelatihan Live Selling TikTok.jpg", color: "from-lime-500 to-green-500", status: "ongoing" },
  { id: 11, title: "Workshop Pembukuan Sederhana", description: "Catat keuangan bisnis dengan rapi dan mudah...", date: "30 Okt 2025", time: "09:00 - 12:00 WIB", location: "Cipayung Business Hub", category: "Workshop", attendees: 30, image: "/Events/Workshop Pembukuan Sederhana.jpg", color: "from-sky-500 to-indigo-500", status: "ongoing" },
  { id: 12, title: "Sesi Pitching Investor Lokal", description: "Presentasikan ide bisnis Anda...", date: "30 Okt 2025", time: "15:00 - 17:00 WIB", location: "Cipayung Innovation Center", category: "Networking", attendees: 15, image: "/Events/Sesi Pitching Investor Lokal.jpg", color: "from-fuchsia-500 to-pink-500", status: "ongoing" },
]
// --- End Event Data ---

// Mapping Ikon Kategori
const categoryIcons: Record<Category, JSX.Element> = {
  Workshop: <BookOpen className="w-5 h-5" />,
  Bazar: <ShoppingCart className="w-5 h-5" />,
  Networking: <Users className="w-5 h-5" />,
  Pelatihan: <GraduationCap className="w-5 h-5" />,
  Seminar: <Presentation className="w-5 h-5" />,
  Konsultasi: <MessageSquare className="w-5 h-5" />,
}

// Array Kategori
const categories: Category[] = ["Workshop", "Bazar", "Networking", "Pelatihan", "Seminar", "Konsultasi"]


export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // State Pagination Ganda
  const [currentOngoingPage, setCurrentOngoingPage] = useState(1);
  const [currentUpcomingPage, setCurrentUpcomingPage] = useState(1);
  const itemsPerPage = 3;

  // Inisialisasi AOS
  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      offset: 50,
      easing: 'ease-out-quad',
    });
  }, []);

  // Filter logic
  const filteredUpcoming = selectedCategory
    ? upcomingEvents.filter((event) => event.category === selectedCategory)
    : upcomingEvents
  const filteredOngoing = selectedCategory
    ? ongoingEvents.filter((event) => event.category === selectedCategory)
    : ongoingEvents

  // Logika Pagination Baru
  // Pagination untuk Ongoing
  const totalOngoingEvents = filteredOngoing.length
  const totalOngoingPages = Math.ceil(totalOngoingEvents / itemsPerPage)
  const paginatedOngoing = filteredOngoing.slice(
    (currentOngoingPage - 1) * itemsPerPage,
    currentOngoingPage * itemsPerPage
  )
  
  // Pagination untuk Upcoming
  const totalUpcomingEvents = filteredUpcoming.length
  const totalUpcomingPages = Math.ceil(totalUpcomingEvents / itemsPerPage)
  const paginatedUpcoming = filteredUpcoming.slice(
    (currentUpcomingPage - 1) * itemsPerPage,
    currentUpcomingPage * itemsPerPage
  )

  // Fungsi ganti halaman (generik)
  const createPageChangeHandler = (
      setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
      totalPages: number,
      sectionId: string
    ) => (pageNumber: number) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber)
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
    
  const handleOngoingPageChange = createPageChangeHandler(setCurrentOngoingPage, totalOngoingPages, "ongoing-events-section");
  const handleUpcomingPageChange = createPageChangeHandler(setCurrentUpcomingPage, totalUpcomingPages, "upcoming-events-section");

  // Reset kedua halaman saat filter berubah
  useEffect(() => {
    setCurrentOngoingPage(1)
    setCurrentUpcomingPage(1)
  }, [selectedCategory])

  // Modal handlers
  const handleRegister = (event: EventData) => {
    if (event.status === "upcoming") {
      setSelectedEvent(event)
      setIsModalOpen(true)
    }
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => { setSelectedEvent(null) }, 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <CustomPointer />
      {/* Hero Section (Sudah diubah ke Gradasi Biru, Rata Kiri, + Gambar) */}
<div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-blue-600 to-blue-500 py-16 md:py-20"> {/* 1. UBAH GRADASI */} 
  {/* 2. UBAH WARNA BLOB */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
    <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
    <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
  </div>

  {/* Container (dihapus 'text-center') */}
  <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
    
    {/* 3. UBAH LAYOUT (Flex 2 kolom) */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">

      {/* Kolom 1: Teks (dibuat rata kiri) */}
      <div className="md:w-2/3 text-center md:text-left">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
          Jadwal Event UMKM Cipayung
        </h1>
        {/* Paragraf (dihapus 'mx-auto' & ubah warna text-blue-100) */}
        <p className="text-lg sm:text-xl text-blue-100 max-w-2xl animate-fade-in animation-delay-200">
          Jangan lewatkan workshop, bazar, dan acara komunitas UMKM yang menarik di sekitar Anda.
        </p>
      </div>

      {/* 4. KOLOM GAMBAR (BARU) */}
      <div 
                className="md:w-1/3 flex justify-center" 
                data-aos="fade-left" 
                data-aos-delay="300"
              >
                <Image
                  src="/Logo/events.svg" // Path dari folder /public
                  alt="Logo UMKM Setu Cipayung"
                  width={200}  // Sesuaikan ukurannya
                  height={200} // Sesuaikan ukurannya
                  priority
                />
              </div>

    </div>
  </div>
</div>

      {/* Filter & Events Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Buttons (INI TOMBOL PENCARIAN/FILTERNYA, TIDAK DIHAPUS) */}
        <div data-aos="fade-up" className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === null
                ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-green-500"
            }`}
          >
            Semua
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-green-500"
              }`}
            >
              {categoryIcons[category]}
              {category}
            </button>
          ))}
        </div>

        {/* Ongoing Events Section */}
        <div className="mb-16" id="ongoing-events-section">
          <div data-aos="fade-right" className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-orange-600 to-red-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900">Events Sedang Berlangsung</h2>
            <span className="ml-auto bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-semibold text-sm">
              {totalOngoingEvents} event{totalOngoingEvents !== 1 ? "s" : ""}
            </span>
          </div>
          {totalOngoingEvents > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedOngoing.map((event, index) => (
                  <div key={event.id} data-aos="fade-up" data-aos-delay={index * 100}>
                    <EventCard
                      event={event}
                      delay={0}
                      isOngoing={true}
                    />
                  </div>
                ))}
              </div>
              
              {/* KONTROL PAGINATION UNTUK ONGOING */}
              {totalOngoingPages > 1 && (
                <PaginationControls
                  currentPage={currentOngoingPage}
                  totalPages={totalOngoingPages}
                  onPageChange={handleOngoingPageChange}
                  themeColor="orange"
                />
              )}
            </>
          ) : (
            <div data-aos="fade-in" className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-gray-500 text-lg">
                Tidak ada event yang sedang berlangsung{selectedCategory ? ` dalam kategori ${selectedCategory}` : ""}.
              </p>
            </div>
          )}
        </div>

        {/* Upcoming Events Section */}
        <div className="mb-16" id="upcoming-events-section">
          <div data-aos="fade-right" className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-green-600 to-emerald-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900">Events Mendatang</h2>
            <span className="ml-auto bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm">
              {totalUpcomingEvents} event{totalUpcomingEvents !== 1 ? "s" : ""}
            </span>
          </div>

          {totalUpcomingEvents > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedUpcoming.map((event, index) => (
                  <div key={event.id} data-aos="fade-up" data-aos-delay={index * 100}>
                    <EventCard
                      event={event}
                      delay={0}
                      onRegister={() => handleRegister(event)}
                      isOngoing={false}
                    />
                  </div>
                ))}
              </div>

              {/* KONTROL PAGINATION UNTUK UPCOMING */}
              {totalUpcomingPages > 1 && (
                <PaginationControls
                  currentPage={currentUpcomingPage}
                  totalPages={totalUpcomingPages}
                  onPageChange={handleUpcomingPageChange}
                  themeColor="green" // Tema warna pagination
                />
              )}
            </>
          ) : (
            <div data-aos="fade-in" className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-gray-500 text-lg">
                Tidak ada event mendatang{selectedCategory ? ` dalam kategori ${selectedCategory}` : ""}.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Registration Modal */}
      {selectedEvent && (
        <EventRegistrationModal event={selectedEvent} isOpen={isModalOpen} onClose={handleCloseModal} />
      )}

      {/* Keyframes */}
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
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        /* .animate-slideUp { animation: slideUp 0.6s ease-out forwards; } */
      `}</style>
    </div>
  )
}

// === KOMPONEN PAGINATION BARU ===
// (Didefinisikan di file yang sama untuk kemudahan)

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  themeColor: "green" | "orange"; // Tema warna
}

function PaginationControls({ currentPage, totalPages, onPageChange, themeColor }: PaginationProps) {
  
  const themeClasses = {
    green: {
      button: "bg-green-600 text-white shadow",
      hover: "hover:bg-gray-100",
    },
    orange: {
      button: "bg-orange-600 text-white shadow",
      hover: "hover:bg-gray-100",
    }
  }
  
  const currentTheme = themeClasses[themeColor] || themeClasses.green;

  return (
    <div data-aos="fade-up" data-aos-delay="100" className="mt-12 flex justify-center items-center gap-3">
      {/* Tombol Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        aria-label="Halaman Sebelumnya"
      >
        Sebelumnya
      </button>

      {/* Nomor Halaman */}
      <div className="flex gap-2">
        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors text-sm font-medium ${
                currentPage === pageNum
                  ? currentTheme.button // Terapkan tema
                  : `bg-white border border-gray-300 text-gray-700 ${currentTheme.hover}`
              }`}
              aria-label={`Pergi ke halaman ${pageNum}`}
              aria-current={currentPage === pageNum ? "page" : undefined}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Tombol Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        aria-label="Halaman Berikutnya"
      >
        Berikutnya
      </button>
    </div>
  );
}
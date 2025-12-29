"use client"

import { useState, useEffect } from "react"
import type { JSX } from "react" 
import EventCard from "@/app/components/event-card"
import EventRegistrationModal from "@/app/components/event-registration-modal"
import { BookOpen, ShoppingCart, Users, GraduationCap, Presentation, MessageSquare } from "lucide-react"
import AOS from "aos" 
import "aos/dist/aos.css" 
import Image from "next/image"
import { useLanguage } from "@/app/context/LanguageContext"

// HAPUS IMPORT CustomPointer DARI SINI
// import CustomPointer from "@/app/components/CustomPointer" <-- HAPUS INI

interface EventData {
  id: number
  title: string
  title_en: string
  description: string
  description_en: string
  date: string
  time: string
  location: string
  category: Category 
  attendees: number
  image: string
  color: string 
  status: "upcoming" | "ongoing"
}

type Category = "Workshop" | "Bazar" | "Networking" | "Pelatihan" | "Seminar" | "Konsultasi"

const categoryTranslationKeys: Record<Category, string> = {
  Workshop: "cat_workshop",
  Bazar: "cat_bazar",
  Networking: "cat_networking",
  Pelatihan: "cat_pelatihan",
  Seminar: "cat_seminar",
  Konsultasi: "cat_konsultasi",
}

const upcomingEvents: EventData[] = [
  {
    id: 1,
    title: "Digital Marketing",
    title_en: "Digital Marketing",
    description: "Pelajari strategi digital marketing terkini untuk UMKM.",
    description_en: "Learn the latest digital marketing strategies for MSMEs.",
    date: "25 Nov 2025",
    time: "10:00 - 13:00 WIB",
    location: "Cipayung Community Center",
    category: "Workshop",
    attendees: 45,
    image: "/Events/workshop-digital-marketing.jpg",
    color: "from-blue-500 to-indigo-600",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Bazar UMKM",
    title_en: "MSME Bazaar",
    description: "Jelajahi dan beli beragam produk unggulan UMKM lokal Cipayung di bazar ini.",
    description_en: "Explore and buy a variety of superior local products at this bazaar.",
    date: "1 Des 2025",
    time: "09:00 - 17:00 WIB",
    location: "Lapangan Cipayung",
    category: "Bazar",
    attendees: 200,
    image: "/Events/Bazar UMKM Cipayung 2025.jpg",
    color: "from-orange-500 to-red-500",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Networking Session",
    title_en: "Networking Session",
    description: "Perluas jaringan Anda dan temukan mitra kolaborasi baru di sesi networking ini.",
    description_en: "Expand your network and find new collaboration partners in this session.",
    date: "8 Des 2025",
    time: "14:00 - 17:00 WIB",
    location: "Cipayung Business Hub",
    category: "Networking",
    attendees: 60,
    image: "/Events/Networking Session UMKM Cipayung.jpg",
    color: "from-purple-500 to-pink-500",
    status: "upcoming",
  },
  {
    id: 4,
    title: "Manajemen Keuangan",
    title_en: "Financial Management",
    description: "Kuasai teknik pengelolaan keuangan yang efektif untuk memajukan bisnis UMKM Anda.",
    description_en: "Master effective financial management techniques to advance your business.",
    date: "15 Des 2025",
    time: "10:00 - 12:00 WIB",
    location: "Cipayung Community Center",
    category: "Pelatihan",
    attendees: 35,
    image: "/Events/Pelatihan Manajemen Keuangan UMKM.jpg",
    color: "from-green-500 to-emerald-600",
    status: "upcoming",
  },
  {
    id: 8,
    title: "Kelas Fotografi Produk",
    title_en: "Product Photography Class",
    description: "Belajar teknik foto produk yang menarik dan menjual untuk meningkatkan omzet.",
    description_en: "Learn attractive product photography techniques to increase sales.",
    date: "18 Des 2025",
    time: "09:00 - 12:00 WIB",
    location: "Studio Kreatif Cipayung",
    category: "Workshop",
    attendees: 20,
    image: "/Events/Kelas Fotografi Produk UMKM.jpg",
    color: "from-blue-500 to-indigo-600",
    status: "upcoming",
  },
  {
    id: 9,
    title: "Diskusi Legalitas Usaha",
    title_en: "Business Legality Discussion",
    description: "Pahami aspek hukum & perizinan usaha agar bisnis UMKM Anda aman dan terdaftar.",
    description_en: "Understand legal aspects & licensing to ensure your business is safe and registered.",
    date: "22 Des 2025",
    time: "13:00 - 15:00 WIB",
    location: "Kantor Kelurahan Setu",
    category: "Seminar",
    attendees: 40,
    image: "/Events/Diskusi Legalitas Usaha UMKM.jpg",
    color: "from-gray-500 to-slate-600",
    status: "upcoming",
  },
]

const ongoingEvents: EventData[] = [
  {
    id: 5,
    title: "Seminar Inovasi Produk",
    title_en: "Product Innovation Seminar",
    description: "Dapatkan wawasan inovasi produk dan desain packaging untuk memenangkan pasar.",
    description_en: "Gain insights on product innovation and packaging design to win the market.",
    date: "28 Okt 2025",
    time: "13:00 - 15:30 WIB",
    location: "Cipayung Innovation Center",
    category: "Seminar",
    attendees: 50,
    image: "/Events/Seminar Inovasi Produk dan Packaging.jpg",
    color: "from-gray-500 to-slate-600",
    status: "ongoing",
  },
  {
    id: 6,
    title: "Konsultasi Bisnis",
    title_en: "Business Consultation",
    description: "Manfaatkan sesi konsultasi bisnis gratis untuk temukan solusi masalah usaha Anda.",
    description_en: "Take advantage of free business consultation sessions to find solutions.",
    date: "29 Okt 2025",
    time: "10:00 - 16:00 WIB",
    location: "Cipayung Business Hub",
    category: "Konsultasi",
    attendees: 25,
    image: "/Events/Konsultasi Bisnis Gratis untuk UMKM.jpg",
    color: "from-rose-500 to-pink-600",
    status: "ongoing",
  },
  {
    id: 7,
    title: "Pameran Foto UMKM",
    title_en: "MSME Photo Exhibition",
    description: "Lihat pameran karya fotografi produk UMKM terbaik dan temukan inspirasi visual.",
    description_en: "See the exhibition of the best MSME product photography works.",
    date: "27 Okt 2025",
    time: "11:00 - 17:00 WIB",
    location: "Galeri Komunitas Cipayung",
    category: "Bazar",
    attendees: 100,
    image: "/Events/Pameran Foto Produk UMKM.jpg",
    color: "from-orange-500 to-red-500",
    status: "ongoing",
  },
  {
    id: 10,
    title: "Pelatihan Live Selling",
    title_en: "Live Selling Training",
    description: "Kuasai tips & trik sukses live selling di TikTok untuk tingkatkan omzet Anda.",
    description_en: "Master tips & tricks for successful live selling on TikTok to increase revenue.",
    date: "29 Okt 2025",
    time: "14:00 - 16:00 WIB",
    location: "Cipayung Community Center",
    category: "Pelatihan",
    attendees: 50,
    image: "/Events/Pelatihan Live Selling TikTok.jpg",
    color: "from-lime-500 to-green-500",
    status: "ongoing",
  },
  {
    id: 11,
    title: "Workshop Pembukuan",
    title_en: "Bookkeeping Workshop",
    description: "Pelajari cara praktis membuat pembukuan sederhana agar keuangan bisnis rapi.",
    description_en: "Learn practical ways to create simple bookkeeping to organize finances.",
    date: "30 Okt 2025",
    time: "09:00 - 12:00 WIB",
    location: "Cipayung Business Hub",
    category: "Workshop",
    attendees: 30,
    image: "/Events/Workshop Pembukuan Sederhana.jpg",
    color: "from-sky-500 to-indigo-500",
    status: "ongoing",
  },
  {
    id: 12,
    title: "Sesi Pitching Investor",
    title_en: "Investor Pitching Session",
    description: "Presentasikan ide bisnis Anda dan dapatkan kesempatan pendanaan dari investor lokal.",
    description_en: "Present your business idea and get funding opportunities from local investors.",
    date: "30 Okt 2025",
    time: "15:00 - 17:00 WIB",
    location: "Cipayung Innovation Center",
    category: "Networking",
    attendees: 15,
    image: "/Events/Sesi Pitching Investor Lokal.jpg",
    color: "from-fuchsia-500 to-pink-500",
    status: "ongoing",
  },
]

const categoryIcons: Record<Category, JSX.Element> = {
  Workshop: <BookOpen className="w-5 h-5" />,
  Bazar: <ShoppingCart className="w-5 h-5" />,
  Networking: <Users className="w-5 h-5" />,
  Pelatihan: <GraduationCap className="w-5 h-5" />,
  Seminar: <Presentation className="w-5 h-5" />,
  Konsultasi: <MessageSquare className="w-5 h-5" />,
}

const categories: Category[] = ["Workshop", "Bazar", "Networking", "Pelatihan", "Seminar", "Konsultasi"]

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { t, language } = useLanguage()

  const [currentOngoingPage, setCurrentOngoingPage] = useState(1)
  const [currentUpcomingPage, setCurrentUpcomingPage] = useState(1)
  const itemsPerPage = 3

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      offset: 50,
      easing: "ease-out-quad",
    })
  }, [])

  const filteredUpcoming = selectedCategory
    ? upcomingEvents.filter((event) => event.category === selectedCategory)
    : upcomingEvents
  const filteredOngoing = selectedCategory
    ? ongoingEvents.filter((event) => event.category === selectedCategory)
    : ongoingEvents

  const totalOngoingEvents = filteredOngoing.length
  const totalOngoingPages = Math.ceil(totalOngoingEvents / itemsPerPage)
  const paginatedOngoing = filteredOngoing.slice(
    (currentOngoingPage - 1) * itemsPerPage,
    currentOngoingPage * itemsPerPage,
  )

  const totalUpcomingEvents = filteredUpcoming.length
  const totalUpcomingPages = Math.ceil(totalUpcomingEvents / itemsPerPage)
  const paginatedUpcoming = filteredUpcoming.slice(
    (currentUpcomingPage - 1) * itemsPerPage,
    currentUpcomingPage * itemsPerPage,
  )

  const createPageChangeHandler =
    (setCurrentPage: React.Dispatch<React.SetStateAction<number>>, totalPages: number, sectionId: string) =>
    (pageNumber: number) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber)
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }

  const handleOngoingPageChange = createPageChangeHandler(
    setCurrentOngoingPage,
    totalOngoingPages,
    "ongoing-events-section",
  )
  const handleUpcomingPageChange = createPageChangeHandler(
    setCurrentUpcomingPage,
    totalUpcomingPages,
    "upcoming-events-section",
  )

  useEffect(() => {
    setCurrentOngoingPage(1)
    setCurrentUpcomingPage(1)
  }, [selectedCategory])

  const handleRegister = (event: EventData) => {
    if (event.status === "upcoming") {
      setSelectedEvent(event)
      setIsModalOpen(true)
    }
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      setSelectedEvent(null)
    }, 300)
  }

  return (
    <>
      {/* UPDATE: Background Dark Mode */}
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 overflow-x-hidden transition-colors duration-300">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-blue-600 to-blue-500 dark:from-indigo-900 dark:via-blue-900 dark:to-slate-900 py-16 md:py-20 transition-colors duration-300">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
              <div className="md:w-2/3 text-center md:text-left">
                {/* UPDATE: Text Color Dark Mode */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white dark:text-slate-100 mb-6 animate-fade-in">
                  {t('events_page_title')}
                </h1>
                <p className="text-lg sm:text-xl text-blue-100 dark:text-slate-300 max-w-2xl animate-fade-in animation-delay-200">
                  {t('events_page_desc')}
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center" data-aos="fade-left" data-aos-delay="300">
                <Image
                  src="/Logo/events.svg"
                  alt="Logo UMKM Setu Cipayung"
                  width={200}
                  height={200}
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Events Container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div data-aos="fade-up" className="relative z-40 flex flex-nowrap justify-start md:justify-center gap-3 overflow-x-auto mb-12 pb-4 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              // UPDATE: Style Filter Button Dark Mode
              className={`px-10 py-2 dan md:px-6 md:py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === null
                  ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-green-500 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700"
              }`}
            >
              {t('events_filter_all')}
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                // UPDATE: Style Filter Button Dark Mode
                className={`px-1 py-1.5 md:px-4 md:py-1 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-green-500 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700"
                }`}
              >
                {categoryIcons[category]}
                {t(categoryTranslationKeys[category])}
              </button>
            ))}
          </div>

          {/* Ongoing Events Section */}
          <div className="mb-16" id="ongoing-events-section">
            <div data-aos="fade-right" className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-orange-600 to-red-500 rounded-full"></div>
              {/* UPDATE: Title Color Dark Mode */}
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('events_ongoing_title')}</h2>
              <span className="ml-auto bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 px-4 py-2 rounded-full font-semibold text-sm">
                {totalOngoingEvents} event{totalOngoingEvents !== 1 ? "s" : ""}
              </span>
            </div>
            {totalOngoingEvents > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {paginatedOngoing.map((event, index) => {
                    const localizedEvent = {
                      ...event,
                      title: language === 'id' ? event.title : event.title_en,
                      description: language === 'id' ? event.description : event.description_en,
                    }

                    return (
                      <div
                        key={event.id}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                        className="relative group pt-4 aspect-[3/4]"
                      >
                        <div className="absolute inset-0 z-40 pointer-events-none">
                          <Image
                            src="/Events/Subtract.svg"
                            alt="Event Frame"
                            fill
                            className="object-fill transition-transform duration-300 ease-in-out group-hover:scale-105"
                          />
                        </div>
                        <div className="relative z-10 h-full pt-4 pb-6 px-[15px] md:pt-6 md:px-15 transition-transform duration-300 ease-in-out group-hover:scale-105">
                          {/* EventCard sudah diupdate di file terpisah untuk support dark mode */}
                          <EventCard event={localizedEvent} delay={0} isOngoing={true} />
                        </div>
                      </div>
                    )
                  })}
                </div>

                {totalOngoingPages > 1 && (
                  <PaginationControls
                    currentPage={currentOngoingPage}
                    totalPages={totalOngoingPages}
                    onPageChange={handleOngoingPageChange}
                    themeColor="orange"
                    language={language}
                  />
                )}
                
                {!selectedCategory && (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-between items-center py-13 my-5">
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
              </>
            ) : (
              <div
                data-aos="fade-in"
                // UPDATE: Empty State Dark Mode
                className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-700"
              >
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {t('events_no_ongoing')}
                </p>
              </div>
            )}
          </div>


          {/* Upcoming Events Section */}
          <div className="mb-16" id="upcoming-events-section">
            <div data-aos="fade-right" className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-green-600 to-emerald-500 rounded-full"></div>
              {/* UPDATE: Title Color Dark Mode */}
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('events_upcoming_title')}</h2>
              <span className="ml-auto bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-4 py-2 rounded-full font-semibold text-sm">
                {totalUpcomingEvents} event{totalUpcomingEvents !== 1 ? "s" : ""}
              </span>
            </div>

            {totalUpcomingEvents > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {paginatedUpcoming.map((event, index) => {
                    const localizedEvent = {
                      ...event,
                      title: language === 'id' ? event.title : event.title_en,
                      description: language === 'id' ? event.description : event.description_en,
                    }

                    return (
                      <div
                        key={event.id}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                        className="relative group pt-4 aspect-[3/4]"
                      >
                        <div className="absolute inset-0 z-40 pointer-events-none">
                          <Image
                            src="/Events/Subtract.svg"
                            alt="Event Frame"
                            fill
                            className="object-fill transition-transform duration-300 ease-in-out group-hover:scale-105"
                          />
                        </div>
                        <div className="relative z-10 h-full pt-4 pb-6 px-[15px] md:pt-6 md:px-15 transition-transform duration-300 ease-in-out group-hover:scale-105">
                          <EventCard
                            event={localizedEvent}
                            delay={0}
                            onRegister={() => handleRegister(localizedEvent)}
                            isOngoing={false}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>

                {totalUpcomingPages > 1 && (
                  <PaginationControls
                    currentPage={currentUpcomingPage}
                    totalPages={totalUpcomingPages}
                    onPageChange={handleUpcomingPageChange}
                    themeColor="green" 
                    language={language}
                  />
                )}
              </>
            ) : (
              <div
                data-aos="fade-in"
                // UPDATE: Empty State Dark Mode
                className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-700"
              >
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {t('events_no_upcoming')}
                </p>
              </div>
            )}
          </div>
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
          
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>

      {/* PERBAIKAN: Pindahkan Modal ke luar div utama untuk menghindari masalah z-index/fixed positioning */}
      {selectedEvent && (
        <EventRegistrationModal event={selectedEvent} isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </>
  )
}

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  themeColor: "green" | "orange"
  language: string 
}

function PaginationControls({ currentPage, totalPages, onPageChange, themeColor, language }: PaginationProps) {
  const themeClasses = {
    green: {
      button: "bg-green-600 text-white shadow",
      // UPDATE: Hover Dark Mode
      hover: "hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-600",
    },
    orange: {
      button: "bg-orange-600 text-white shadow",
      // UPDATE: Hover Dark Mode
      hover: "hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-600",
    },
  }

  const currentTheme = themeClasses[themeColor] || themeClasses.green

  return (
    <div data-aos="fade-up" data-aos-delay="100" className="mt-12 flex justify-center items-center gap-3">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        // UPDATE: Button Style Dark Mode
        className="px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        aria-label="Halaman Sebelumnya"
      >
        {language === 'id' ? 'Sebelumnya' : 'Previous'}
      </button>

      <div className="flex gap-2">
        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors text-sm font-medium ${
                currentPage === pageNum
                  ? currentTheme.button 
                  : `bg-white border border-gray-300 text-gray-700 ${currentTheme.hover}`
              }`}
              aria-label={`Pergi ke halaman ${pageNum}`}
              aria-current={currentPage === pageNum ? "page" : undefined}
            >
              {pageNum}
            </button>
          )
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        // UPDATE: Button Style Dark Mode
        className="px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        aria-label="Halaman Berikutnya"
      >
        {language === 'id' ? 'Berikutnya' : 'Next'}
      </button>
    </div>
  )
}
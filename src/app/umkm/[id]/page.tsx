"use client"

import { umkmData, type UmkmData, type UmkmCategory } from "@/data/umkm"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useToast } from "@/app/hooks/use-toast" 
import { ShoppingCart, Trash2, Send, X, Loader2, CheckCircle } from "lucide-react"
// 1. Import Hooks Bahasa
import { useLanguage } from "@/app/context/LanguageContext"

interface CartItem {
  name: string
  price: number
  quantity: number
}

function getUmkmById(id: string): UmkmData | undefined {
  const umkm = umkmData.find((item) => item.id.toString() === id)
  return umkm
}

const categoryTranslationKeys: Record<UmkmCategory, string> = {
  "Kuliner": "cat_kuliner",
  "Fashion": "cat_fashion",
  "Jasa & Lainnya": "cat_jasa"
};

export default function UMKMDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const umkm = getUmkmById(id)

  // 2. Ambil fungsi t dan language
  const { t, language } = useLanguage()

  const [showAllImages, setShowAllImages] = useState(false)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [feedbackRating, setFeedbackRating] = useState(5)
  const [feedbackText, setFeedbackText] = useState("")
  const [feedbackName, setFeedbackName] = useState("")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const { toast } = useToast()

  if (!umkm) {
    notFound()
  }

  // 3. Pilih konten berdasarkan bahasa
  const description = language === 'id' ? umkm.description : (umkm.description_en || umkm.description)
  const promoText = language === 'id' ? umkm.promo : (umkm.promo_en || umkm.promo)

  const displayedImages = showAllImages ? umkm.gallery : umkm.gallery.slice(0, 3)
  const hasMoreImages = umkm.gallery.length > 3

  const handleAddToCart = (itemName: string, itemPrice: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === itemName)
      if (existingItem) {
        return prevItems.map((item) => (item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevItems, { name: itemName, price: itemPrice, quantity: 1 }]
      }
    })
    toast({ title: t('detail_added_cart'), description: `${itemName} ${t('detail_added_desc')}`, variant: "success" })
  }

  const handleRemoveFromCart = (itemName: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.name !== itemName))
    toast({ title: t('detail_removed'), description: `${itemName} ${t('detail_removed_desc')}`, variant: "info" })
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: t('detail_cart_empty_warning'),
        description: t('detail_cart_empty_desc'),
        variant: "warning",
      })
      return
    }
    setShowCheckoutModal(true)
    setIsProcessingPayment(true)

    setTimeout(() => {
      setIsProcessingPayment(false)
      setTimeout(() => {
        setShowCheckoutModal(false)
        setCartItems([])
        toast({
          title: t('detail_success'),
          description: t('detail_success_desc'),
          variant: "success",
        })
      }, 1500)
    }, 2500)
  }

  const handleSubmitFeedback = () => {
    if (!feedbackName.trim() || !feedbackText.trim()) {
      toast({ title: t('detail_input_error'), description: t('detail_input_desc'), variant: "destructive" })
      return
    }
    toast({ title: t('detail_review_success'), description: t('detail_review_desc'), variant: "success" })
    setFeedbackName("")
    setFeedbackText("")
    setFeedbackRating(5)
    setShowFeedbackForm(false)
  }

  return (
    // UPDATE BACKGROUND: Mendukung Dark Mode (slate-900)
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 transition-colors duration-300">
      
      {/* <CustomPointer /> Sudah dihapus agar tidak double */}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tombol Kembali */}
        <Link
          href="/umkm"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold mb-8 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          {t('detail_back')}
        </Link>

        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 md:p-10 mb-10 border border-slate-100 dark:border-slate-700 transition-colors duration-300">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6 mb-6">
            <div className="flex-1">
              {/* Kategori Badge */}
              <span className="inline-block bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800 text-blue-700 dark:text-blue-100 text-xs font-bold px-4 py-2 rounded-full mb-4 border border-blue-200 dark:border-blue-700">
                {t(categoryTranslationKeys[umkm.category as UmkmCategory] || "cat_jasa")}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 text-balance leading-tight">
                {umkm.name}
              </h1>
              {/* Rating */}
              <div className="flex items-center gap-3 mt-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-xl ${i < Math.floor(umkm.rating ?? 0) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{umkm.rating?.toFixed(1) ?? "N/A"}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">({umkm.reviews ?? 0} {t('umkm_reviews_count') || 'ulasan'})</span>
              </div>
            </div>
            {/* Promo Badge */}
            {promoText && (
              <div className="flex-shrink-0 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 border border-red-300 dark:border-red-800 rounded-xl p-4 shadow-sm">
                <p className="text-red-700 dark:text-red-300 font-bold text-sm flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                  </svg>
                  {promoText}
                </p>
              </div>
            )}
          </div>
          {/* Alamat */}
          <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300 border-t border-slate-100 dark:border-slate-700 pt-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5 text-blue-600 dark:text-blue-400">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <p className="text-base leading-relaxed">{umkm.address}</p>
          </div>
        </div>

        {/* Layout Utama (Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Kolom Kiri & Tengah (Konten Utama) */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Galeri Foto */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 overflow-hidden">
              <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('detail_gallery')}</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6 md:p-8">
                {displayedImages.map((imgUrl, index) => (
                  <div
                    key={index}
                    className="relative aspect-video rounded-lg shadow-sm group cursor-pointer bg-gray-100 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 overflow-hidden" 
                  >
                    <Image
                      src={imgUrl || "/placeholder.svg"}
                      alt={`Galeri ${umkm.name} ${index + 1}`}
                      fill
                      className="object-contain hover:scale-110 transition-transform duration-300 ease-in-out"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  </div>
                ))}
              </div>
              {hasMoreImages && (
                <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2 flex justify-center">
                  <button
                    onClick={() => setShowAllImages(!showAllImages)}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200"
                  >
                    {showAllImages ? t('umkm_btn_show_less') : `${t('detail_see_all_photos')} (${umkm.gallery.length})`}
                  </button>
                </div>
              )}
            </div>

            {/* Menu & Layanan */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 overflow-hidden">
              <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('detail_menu')}</h2>
              </div>
              <div className="p-6 md:p-8 space-y-4">
                {(umkm.menu ?? []).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 border border-slate-100 dark:border-slate-600"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Rp {item.price.toLocaleString("id-ID")}</p>
                    </div>
                    <button
                      onClick={() => handleAddToCart(item.name, item.price)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 flex-shrink-0"
                    >
                      <ShoppingCart size={16} /> {t('detail_add')}
                    </button>
                  </div>
                ))}
                {(umkm.menu ?? []).length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-6">{t('detail_menu_empty')}</p>
                )}
              </div>
            </div>

            {/* Keranjang Pesanan */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 overflow-hidden">
              <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <ShoppingCart size={24} className="text-blue-600 dark:text-blue-400" /> {t('detail_cart')}
                </h2>
              </div>
              <div className="p-6 md:p-8 space-y-4">
                {cartItems.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">{t('detail_cart_empty')}</p>
                ) : (
                  <>
                    {cartItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-100 dark:border-slate-600"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Rp {item.price.toLocaleString("id-ID")} x {item.quantity}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(item.name)}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                    <div className="pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {t('detail_total')}: Rp {calculateTotal().toLocaleString("id-ID")}
                      </span>
                      <button
                        onClick={handleCheckout}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        {t('detail_checkout')}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Peta Lokasi */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 overflow-hidden">
              <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('detail_location')}</h2>
              </div>
              <div className="w-full h-96 md:h-[400px]">
                <iframe
                  src={umkm.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Peta Lokasi ${umkm.name}`}
                ></iframe>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-700/30 text-center border-t border-slate-100 dark:border-slate-700">
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(umkm.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold transition-colors duration-200"
                >
                  {t('open_maps')} <span>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Kolom Kanan (Sidebar) */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl shadow-md p-6 md:p-8 border border-blue-200 dark:border-slate-600">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('about')}</h2>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-sm md:text-base">{description}</p>
              </div>

              {/* Info Kategori & Alamat */}
              <div className="space-y-4">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-5 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">{t('umkm_category_all')}</p>
                  <p className="text-gray-900 dark:text-white font-semibold">{t(categoryTranslationKeys[umkm.category as UmkmCategory] || "cat_jasa")}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-5 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">{t('umkm_address')}</p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{umkm.address}</p>
                </div>
              </div>

              {/* Tombol Hubungi */}
              <button
                onClick={() => alert(`Hubungi ${umkm.name}...`)}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {t('detail_contact')}
              </button>

              {/* Ulasan Pelanggan */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 flex items-center justify-between flex-wrap gap-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('detail_reviews')}</h2>
                  <button
                    onClick={() => setShowFeedbackForm(!showFeedbackForm)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 text-sm"
                    aria-expanded={showFeedbackForm}
                  >
                    {showFeedbackForm ? t('detail_close') : t('detail_write_review')}
                  </button>
                </div>
                {/* Form Ulasan */}
                {showFeedbackForm && (
                  <div className="p-6 md:p-8 bg-blue-50 dark:bg-slate-700/50 border-b border-blue-200 dark:border-slate-600 space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">{t('detail_your_name')}</label>
                      <input
                        type="text"
                        value={feedbackName}
                        onChange={(e) => setFeedbackName(e.target.value)}
                        placeholder={t('detail_name_placeholder')}
                        className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">{t('detail_rating')}</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setFeedbackRating(star)}
                            className={`text-2xl transition-colors duration-200 ${star <= feedbackRating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">{t('detail_review_label')}</label>
                      <textarea
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder={t('detail_review_placeholder')}
                        rows={4}
                        className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none"
                      />
                    </div>
                    <button
                      onClick={handleSubmitFeedback}
                      className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Send size={16} /> {t('detail_send_review')}
                    </button>
                  </div>
                )}
                {/* Daftar Ulasan */}
                <div className="p-6 md:p-8 space-y-4 max-h-96 overflow-y-auto">
                  {(umkm.reviews_data ?? []).map((review, index) => (
                    <div key={index} className="pb-4 border-b border-slate-100 dark:border-slate-700 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-semibold text-gray-900 dark:text-white">{review.name}</p>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${i < (review.rating ?? 0) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      {/* Ulasan Dinamis (ID/EN) */}
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {language === 'id' ? review.text : (review.text_en || review.text)}
                      </p>
                    </div>
                  ))}
                  {(umkm.reviews_data ?? []).length === 0 && !showFeedbackForm && (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-6">{t('detail_no_reviews')}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center border border-slate-100 dark:border-slate-700">
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <X size={24} />
            </button>
            {isProcessingPayment ? (
              <>
                <Loader2 className="w-16 h-16 text-blue-600 mx-auto animate-spin mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{t('detail_processing')}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t('detail_wait')}</p>
              </>
            ) : (
              <>
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{t('detail_success')}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t('detail_success_desc')}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
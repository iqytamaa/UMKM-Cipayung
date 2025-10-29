"use client"

import { umkmData, type UmkmData } from "@/data/umkm"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
// Pastikan path ke hook toast Anda sudah benar
import { useToast } from "@/app/hooks/use-toast" 
import { ShoppingCart, Trash2, Send, X, Loader2, CheckCircle } from "lucide-react"

interface CartItem {
  name: string
  price: number
  quantity: number
}

function getUmkmById(id: string): UmkmData | undefined {
  const umkm = umkmData.find((item) => item.id.toString() === id)
  return umkm
}

export default function UMKMDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const umkm = getUmkmById(id)

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
    toast({ title: "Ditambahkan!", description: `${itemName} masuk keranjang.`, variant: "success" })
  }

  const handleRemoveFromCart = (itemName: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.name !== itemName))
    toast({ title: "Dihapus", description: `${itemName} dihapus dari keranjang.`, variant: "info" })
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Keranjang Kosong",
        description: "Tambahkan item ke keranjang sebelum checkout.",
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
          title: "Pembayaran Berhasil!",
          description: "Terima kasih telah memesan. Silakan hubungi UMKM.",
          variant: "success",
        })
      }, 1500)
    }, 2500)
  }

  const handleSubmitFeedback = () => {
    if (!feedbackName.trim() || !feedbackText.trim()) {
      toast({ title: "Input Tidak Lengkap", description: "Mohon isi nama dan ulasan Anda.", variant: "destructive" })
      return
    }
    toast({ title: "Terima Kasih!", description: "Ulasan Anda telah dikirim.", variant: "success" })
    setFeedbackName("")
    setFeedbackText("")
    setFeedbackRating(5)
    setShowFeedbackForm(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tombol Kembali */}
        <Link
          href="/umkm"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-8 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Kembali ke Direktori
        </Link>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 mb-10 border border-slate-100">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6 mb-6">
            <div className="flex-1">
              <span className="inline-block bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 text-xs font-bold px-4 py-2 rounded-full mb-4 border border-blue-200">
                {umkm.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 text-balance leading-tight">
                {umkm.name}
              </h1>
              {/* Rating */}
              <div className="flex items-center gap-3 mt-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-xl ${i < Math.floor(umkm.rating ?? 0) ? "text-yellow-400" : "text-gray-300"}`}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-lg font-bold text-gray-800">{umkm.rating?.toFixed(1) ?? "N/A"}</span>
                <span className="text-sm text-gray-500">({umkm.reviews ?? 0} ulasan)</span>
              </div>
            </div>
            {/* Promo Badge */}
            {umkm.promo && (
              <div className="flex-shrink-0 bg-gradient-to-br from-red-50 to-red-100 border border-red-300 rounded-xl p-4 shadow-sm">
                <p className="text-red-700 font-bold text-sm flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                  </svg>
                  {umkm.promo}
                </p>
              </div>
            )}
          </div>
          {/* Alamat */}
          <div className="flex items-start gap-3 text-gray-700 border-t border-slate-100 pt-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5 text-blue-600">
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
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100">
              <div className="p-6 md:p-8 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <h2 className="text-2xl font-bold text-gray-900">Galeri Foto</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6 md:p-8">
                {displayedImages.map((imgUrl, index) => (
                  <div
                    key={index}
                    // Ganti bg-gray-100 jika ingin latar belakang 'contain' yang berbeda
                    className="relative aspect-video rounded-lg overflow-hidden shadow-sm group cursor-pointer bg-gray-100 border border-slate-100" 
                  >
                    <Image
                      src={imgUrl || "/placeholder.svg"}
                      alt={`Galeri ${umkm.name} ${index + 1}`}
                      fill
                      // === PERBAIKAN DI SINI ===
                      className="object-contain hover:scale-110 transition-transform duration-300 ease-in-out" // Ganti 'object-cover' menjadi 'object-contain'
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  </div>
                ))}
              </div>
              {hasMoreImages && (
                <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2 flex justify-center">
                  <button
                    onClick={() => setShowAllImages(!showAllImages)}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
                  >
                    {showAllImages ? "Tampilkan Lebih Sedikit" : `Lihat Semua (${umkm.gallery.length}) Foto`}
                  </button>
                </div>
              )}
            </div>

            {/* Menu & Layanan */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100">
              <div className="p-6 md:p-8 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <h2 className="text-2xl font-bold text-gray-900">Menu & Layanan</h2>
              </div>
              <div className="p-6 md:p-8 space-y-4">
                {(umkm.menu ?? []).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200 border border-slate-100"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600 mt-1">Rp {item.price.toLocaleString("id-ID")}</p>
                    </div>
                    <button
                      onClick={() => handleAddToCart(item.name, item.price)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 flex-shrink-0"
                    >
                      <ShoppingCart size={16} /> Tambah
                    </button>
                  </div>
                ))}
                {(umkm.menu ?? []).length === 0 && (
                  <p className="text-gray-500 text-center py-6">Menu belum tersedia.</p>
                )}
              </div>
            </div>

            {/* Keranjang Pesanan */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100">
              <div className="p-6 md:p-8 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <ShoppingCart size={24} className="text-blue-600" /> Keranjang Pesanan
                </h2>
              </div>
              <div className="p-6 md:p-8 space-y-4">
                {cartItems.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Keranjang Anda masih kosong.</p>
                ) : (
                  <>
                    {cartItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            Rp {item.price.toLocaleString("id-ID")} x {item.quantity}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(item.name)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                    <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">
                        Total: Rp {calculateTotal().toLocaleString("id-ID")}
                      </span>
                      <button
                        onClick={handleCheckout}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Peta Lokasi */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100">
              <div className="p-6 md:p-8 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <h2 className="text-2xl font-bold text-gray-900">Lokasi Kami</h2>
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
              <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(umkm.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
                >
                  Buka di Google Maps <span>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Kolom Kanan (Sidebar) */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-md p-6 md:p-8 border border-blue-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Kami</h2>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">{umkm.description}</p>
              </div>

              {/* Info Kategori & Alamat */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 md:p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Kategori</p>
                  <p className="text-gray-900 font-semibold">{umkm.category}</p>
                </div>
                <div className="bg-white rounded-xl p-4 md:p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Alamat</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{umkm.address}</p>
                </div>
              </div>

              {/* Tombol Hubungi */}
              <button
                onClick={() => alert(`Hubungi ${umkm.name}...`)}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Hubungi UMKM Ini
              </button>

              {/* Ulasan Pelanggan */}
              <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100">
                <div className="p-6 md:p-8 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-center justify-between flex-wrap gap-4">
                  <h2 className="text-2xl font-bold text-gray-900">Ulasan Pelanggan</h2>
                  <button
                    onClick={() => setShowFeedbackForm(!showFeedbackForm)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 text-sm"
                    aria-expanded={showFeedbackForm}
                  >
                    {showFeedbackForm ? "Tutup" : "Tulis Ulasan"}
                  </button>
                </div>
                {/* Form Ulasan */}
                {showFeedbackForm && (
                  <div className="p-6 md:p-8 bg-blue-50 border-b border-blue-200 space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Nama Anda</label>
                      <input
                        type="text"
                        value={feedbackName}
                        onChange={(e) => setFeedbackName(e.target.value)}
                        placeholder="Masukkan nama Anda"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setFeedbackRating(star)}
                            className={`text-2xl transition-colors duration-200 ${star <= feedbackRating ? "text-yellow-400" : "text-gray-300"}`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Ulasan</label>
                      <textarea
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="Bagikan pengalaman Anda..."
                        rows={4}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none"
                      />
                    </div>
                    <button
                      onClick={handleSubmitFeedback}
                      className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Send size={16} /> Kirim Ulasan
                    </button>
                  </div>
                )}
                {/* Daftar Ulasan */}
                <div className="p-6 md:p-8 space-y-4 max-h-96 overflow-y-auto">
                  {(umkm.reviews_data ?? []).map((review, index) => (
                    <div key={index} className="pb-4 border-b border-slate-100 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-semibold text-gray-900">{review.name}</p>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${i < (review.rating ?? 0) ? "text-yellow-400" : "text-gray-300"}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                  {(umkm.reviews_data ?? []).length === 0 && !showFeedbackForm && (
                    <p className="text-gray-500 text-center py-6">Belum ada ulasan.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4 transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center border border-slate-100">
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X size={24} />
            </button>
            {isProcessingPayment ? (
              <>
                <Loader2 className="w-16 h-16 text-blue-600 mx-auto animate-spin mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Memproses Pembayaran...</h3>
                <p className="text-gray-600 text-sm">Mohon tunggu sebentar.</p>
              </>
            ) : (
              <>
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Pembayaran Berhasil!</h3>
                <p className="text-gray-600 text-sm">Terima kasih atas pesanan Anda.</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
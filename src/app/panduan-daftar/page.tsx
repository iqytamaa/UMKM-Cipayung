"use client"

import { useState } from "react"
// Tambahkan import Link dari Next.js
import Link from "next/link"
import { ChevronRight, ChevronLeft, Upload, CheckCircle2, AlertCircle } from "lucide-react"
import CustomPointer from "@/app/components/CustomPointer"


// 1. Definisikan tipe untuk state formData
interface FormDataState {
  businessName: string;
  businessCategory: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  ownerName: string;
  photos: string[]; // Menyimpan nama file (string), jadi string[]
}

// 2. Definisikan tipe untuk state errors
type FormErrors = {
  businessName?: string;
  businessCategory?: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  ownerName?: string;
  photos?: string; // Error untuk 'photos' adalah satu pesan (string)
}

export default function PanduanDaftarPage() {
  const [currentStep, setCurrentStep] = useState(1)

  // 3. Terapkan tipe ke useState
  const [formData, setFormData] = useState<FormDataState>({
    businessName: "",
    businessCategory: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    ownerName: "",
    photos: [], // Sekarang TS tahu ini adalah string[]
  })

  // 4. Terapkan tipe ke useState
  const [errors, setErrors] = useState<FormErrors>({}) // Sekarang TS tahu ini adalah objek error

  const [submitted, setSubmitted] = useState(false)

  const steps = [
    { number: 1, title: "Informasi Dasar", description: "Data usaha Anda" },
    { number: 2, title: "Kontak & Lokasi", description: "Alamat dan kontak" },
    { number: 3, title: "Foto Produk", description: "Unggah 3-5 foto" },
    { number: 4, title: "Konfirmasi", description: "Tinjau data Anda" },
  ]

  const categories = [
    "Makanan & Minuman",
    "Kerajinan Tangan",
    "Fashion & Tekstil",
    "Elektronik",
    "Jasa & Layanan",
    "Pertanian",
    "Lainnya",
  ]

  // 5. Tipekan parameter 'step'
  const validateStep = (step: number) => {
    // Tipekan 'newErrors' agar sesuai dengan FormErrors
    const newErrors: FormErrors = {}

    if (step === 1) {
      if (!formData.businessName.trim()) newErrors.businessName = "Nama usaha wajib diisi"
      if (!formData.businessCategory) newErrors.businessCategory = "Kategori wajib dipilih"
      if (!formData.description.trim()) newErrors.description = "Deskripsi wajib diisi"
    }

    if (step === 2) {
      if (!formData.address.trim()) newErrors.address = "Alamat wajib diisi"
      
      if (!formData.phone.trim()) {
        newErrors.phone = "Nomor telepon wajib diisi"
      } else if (!/^[0-9]+$/.test(formData.phone)) {
        newErrors.phone = "Nomor telepon harus berupa angka"
      }
      
      if (!formData.email.trim()) newErrors.email = "Email wajib diisi"
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Format email tidak valid"
    }

    if (step === 3) {
      if (formData.photos.length < 3) newErrors.photos = "Minimal 3 foto harus diunggah"
      if (formData.photos.length > 5) newErrors.photos = "Maksimal 5 foto"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setErrors({})
    }
  }

  // 6. Tipekan parameter 'e' (event)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    let processedValue = value

    if (name === "phone") {
      processedValue = value.replace(/[^0-9]/g, "")
    }

    setFormData((prev) => ({ ...prev, [name]: processedValue }))

    // Perbaiki cara menghapus error
    const key = name as keyof FormErrors
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined })) // Hapus key error
    }
  }

  // 7. Tipekan parameter 'e' (event)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Pastikan TS tahu 'f' adalah File
    const files = Array.from(e.target.files || []).map((f: File) => f.name)

    if (formData.photos.length + files.length <= 5) {
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...files],
      }))
      
      if (errors.photos) {
        setErrors((prev) => ({ ...prev, photos: undefined })) // Hapus key error
      }
    }
  }

  // 8. Tipekan parameter 'index'
  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = () => {
    // Validasi semua langkah sebelumnya sebelum submit
    if (validateStep(1) && validateStep(2) && validateStep(3)) {
      setSubmitted(true)
      console.log("Form submitted:", formData)
    } else {
      // Jika ada error di langkah sebelumnya, pindah ke langkah pertama yg error
      if (!validateStep(1)) setCurrentStep(1)
      else if (!validateStep(2)) setCurrentStep(2)
      else if (!validateStep(3)) setCurrentStep(3)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Pendaftaran Berhasil!</h1>
          <p className="text-gray-600 mb-8">
            Terima kasih telah mendaftar. Tim kami akan meninjau data Anda dalam 3-5 hari kerja. Kami akan menghubungi
            Anda melalui email atau telepon.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-blue-900">
              <strong>Email konfirmasi telah dikirim ke:</strong>
              <br />
              {formData.email}
            </p>
          </div>
          {/* 9. Ganti <a> dengan <Link> untuk navigasi Next.js */}
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-8 rounded-full hover:shadow-lg transition-all duration-300"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <CustomPointer />
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">Daftarkan Usaha Anda</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan UMKM di Cipayung dan jangkau lebih banyak pelanggan
          </p>
        </div>

        {/* Important Info Box */}
        <div className="mb-8 bg-white rounded-xl p-6 border-l-4 border-blue-600 shadow-md">
          <div className="flex gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <h3 className="font-bold text-gray-900 text-lg">Informasi Penting Sebelum Mendaftar</h3>
          </div>
          <ul className="space-y-3 text-sm text-gray-700 ml-9">
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Pastikan semua data yang Anda masukkan akurat dan lengkap</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Foto produk harus berkualitas baik dan menampilkan produk/tempat usaha dengan jelas</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Proses verifikasi memakan waktu 3-5 hari kerja</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Kami akan menghubungi Anda jika ada data yang perlu diperbaiki</span>
            </li>
          </ul>
        </div>

        {/* Progress Steps Container */}
        <div className="mb-12">
          <div className="relative">
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 z-0 w-3/4 mx-auto">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-green-600 transition-all duration-500 ease-in-out rounded-full"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
            <div className="relative z-10 grid grid-cols-4">
              {steps.map((step) => (
                <div key={step.number} className="flex justify-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                      currentStep >= step.number
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {currentStep > step.number ? <CheckCircle2 className="w-6 h-6" /> : step.number}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <p className="font-semibold text-gray-900 text-sm">{step.title}</p>
                <p className="text-xs text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Nama Usaha <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Contoh: Warung Kopi Cipayung"
                  className={`w-full px-4 py-3 rounded-lg border-2 bg-gray-50 transition-all duration-200 focus:bg-white ${
                    errors.businessName
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  } focus:outline-none`}
                />
                {/* Sekarang 'errors.businessName' valid */}
                {errors.businessName && (
                  <p className="text-red-600 text-sm mt-2 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-4 h-4" /> {errors.businessName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Kategori Usaha <span className="text-red-500">*</span>
                </label>
                <select
                  name="businessCategory"
                  value={formData.businessCategory}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 bg-gray-50 transition-all duration-200 focus:bg-white ${
                    errors.businessCategory
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  } focus:outline-none`}
                >
                  <option value="">Pilih kategori...</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.businessCategory && (
                  <p className="text-red-600 text-sm mt-2 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-4 h-4" /> {errors.businessCategory}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Deskripsi Usaha <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Ceritakan tentang usaha Anda, produk/jasa yang ditawarkan, dan keunikan bisnis Anda..."
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border-2 bg-gray-50 transition-all duration-200 focus:bg-white resize-none ${
                    errors.description
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  } focus:outline-none`}
                />
                {errors.description && (
                  <p className="text-red-600 text-sm mt-2 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-4 h-4" /> {errors.description}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Contact & Location */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Nama Pemilik</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  placeholder="Nama lengkap pemilik usaha"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 hover:border-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Alamat Lengkap <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Jalan, nomor, kelurahan, kecamatan, kota, provinsi, kode pos"
                  rows={3}
                  className={`w-full px-4 py-3 rounded-lg border-2 bg-gray-50 transition-all duration-200 focus:bg-white resize-none ${
                    errors.address
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  } focus:outline-none`}
                />
                {errors.address && (
                  <p className="text-red-600 text-sm mt-2 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-4 h-4" /> {errors.address}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Nomor Telepon <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="08xxxxxxxxxx"
                    className={`w-full px-4 py-3 rounded-lg border-2 bg-gray-50 transition-all duration-200 focus:bg-white ${
                      errors.phone
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    } focus:outline-none`}
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-4 h-4" /> {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    className={`w-full px-4 py-3 rounded-lg border-2 bg-gray-50 transition-all duration-200 focus:bg-white ${
                      errors.email
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    } focus:outline-none`}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-4 h-4" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Photos */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-4">
                  Unggah Foto Produk/Tempat Usaha (3-5 foto) <span className="text-red-500">*</span>
                </label>

                <div className="border-2 border-dashed border-blue-400 rounded-xl p-8 text-center bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer block">
                    <Upload className="w-12 h-12 text-blue-600 mx-auto mb-3 transition-transform hover:scale-110" />
                    <p className="font-semibold text-gray-900 mb-1">Klik atau drag foto di sini</p>
                    <p className="text-sm text-gray-600">PNG, JPG, GIF hingga 10MB</p>
                  </label>
                </div>

                {errors.photos && (
                  <p className="text-red-600 text-sm mt-3 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-4 h-4" /> {errors.photos}
                  </p>
                )}

                {formData.photos.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-gray-900 mb-3">
                      Foto yang diunggah ({formData.photos.length}/5)
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {formData.photos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg p-4 aspect-square flex items-center justify-center border-2 border-blue-200 shadow-sm hover:shadow-md transition-all">
                            <div className="text-center">
                              <Upload className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                              <p className="text-xs text-gray-700 truncate">{photo}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removePhoto(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 border border-blue-200">
                <h3 className="font-bold text-gray-900 mb-4">Ringkasan Data Pendaftaran</h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-start pb-4 border-b border-gray-200">
                    <span className="text-gray-600">Nama Usaha:</span>
                    <span className="font-semibold text-gray-900">{formData.businessName}</span>
                  </div>

                  <div className="flex justify-between items-start pb-4 border-b border-gray-200">
                    <span className="text-gray-600">Kategori:</span>
                    <span className="font-semibold text-gray-900">{formData.businessCategory}</span>
                  </div>

                  <div className="flex justify-between items-start pb-4 border-b border-gray-200">
                    <span className="text-gray-600">Pemilik:</span>
                    <span className="font-semibold text-gray-900">{formData.ownerName || "-"}</span>
                  </div>

                  <div className="flex justify-between items-start pb-4 border-b border-gray-200">
                    <span className="text-gray-600">Telepon:</span>
                    <span className="font-semibold text-gray-900">{formData.phone}</span>
                  </div>

                  <div className="flex justify-between items-start pb-4 border-b border-gray-200">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-semibold text-gray-900">{formData.email}</span>
                  </div>

                  <div className="flex justify-between items-start pb-4 border-b border-gray-200">
                    <span className="text-gray-600">Foto Diunggah:</span>
                    <span className="font-semibold text-gray-900">{formData.photos.length} foto</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="text-sm text-green-900">
                  <strong>✓ Semua data sudah lengkap!</strong> Klik tombol &quot;Kirim Pendaftaran&quot; untuk menyelesaikan
                  proses pendaftaran. Tim kami akan meninjau data Anda dalam 3-5 hari kerja.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {/* Navigation Buttons */}
<div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
  <button
    onClick={handlePrevious}
    disabled={currentStep === 1}
    // MODIFIKASI: Padding diubah menjadi px-4 di mobile, sm:px-6 di desktop
    className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
      currentStep === 1
        ? "text-gray-400 cursor-not-allowed"
        : "text-blue-600 hover:bg-blue-50 active:scale-95"
    }`}
  >
    <ChevronLeft className="w-5 h-5" />
        {/* MODIFIKASI: Teks dibungkus span dan disembunyikan di mobile */}
        <span className="hidden sm:inline">Sebelumnya</span>
      </button>

      <div className="text-sm text-gray-600 text-center flex-shrink-0 px-2">
        Langkah {currentStep} dari {steps.length}
      </div>

      {currentStep === steps.length ? (
        <button
          onClick={handleSubmit}
          // MODIFIKASI: Padding diubah menjadi px-4 di mobile, sm:px-8 di desktop
          className="flex items-center gap-2 px-4 sm:px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg active:scale-95 transition-all duration-300"
        >
          {/* MODIFIKASI: Teks dibungkus span dan disembunyikan di mobile */}
          <span className="hidden sm:inline">Kirim Pendaftaran</span>
          <CheckCircle2 className="w-5 h-5" />
        </button>
      ) : (
        <button
          onClick={handleNext}
          // MODIFIKASI: Padding diubah menjadi px-4 di mobile, sm:px-8 di desktop
          className="flex items-center gap-2 px-4 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg active:scale-95 transition-all duration-300"
        >
          {/* MODIFIKASI: Teks dibungkus span dan disembunyikan di mobile */}
          <span className="hidden sm:inline">Selanjutnya</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
        </div>
      </div>
    </div>
  )
}
"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, ChevronLeft, Upload, CheckCircle2, AlertCircle } from "lucide-react"
// Pastikan CustomPointer sudah dihapus di sini jika sudah ada di layout.tsx agar tidak double
// import CustomPointer from "@/app/components/CustomPointer" 
import { useLanguage } from "@/app/context/LanguageContext"

interface FormDataState {
  businessName: string;
  businessCategory: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  ownerName: string;
  photos: string[];
}

type FormErrors = {
  businessName?: string;
  businessCategory?: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  ownerName?: string;
  photos?: string;
}

export default function PanduanDaftarPage() {
  const { t } = useLanguage()

  const [currentStep, setCurrentStep] = useState(1)

  const [formData, setFormData] = useState<FormDataState>({
    businessName: "",
    businessCategory: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    ownerName: "",
    photos: [],
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const [submitted, setSubmitted] = useState(false)

  const steps = [
    { number: 1, title: t('step_1_title'), description: t('step_1_desc') },
    { number: 2, title: t('step_2_title'), description: t('step_2_desc') },
    { number: 3, title: t('step_3_title'), description: t('step_3_desc') },
    { number: 4, title: t('step_4_title'), description: t('step_4_desc') },
  ]

  const categoryKeys = [
    "opt_food",
    "opt_craft",
    "opt_fashion",
    "opt_electronic",
    "opt_service",
    "opt_agriculture",
    "opt_other",
  ]

  const validateStep = (step: number) => {
    const newErrors: FormErrors = {}

    if (step === 1) {
      if (!formData.businessName.trim()) newErrors.businessName = t('err_business_name')
      if (!formData.businessCategory) newErrors.businessCategory = t('err_category')
      if (!formData.description.trim()) newErrors.description = t('err_desc')
    }

    if (step === 2) {
      if (!formData.address.trim()) newErrors.address = t('err_address')
      
      if (!formData.phone.trim()) {
        newErrors.phone = t('err_phone_req')
      } else if (!/^[0-9]+$/.test(formData.phone)) {
        newErrors.phone = t('err_phone_num')
      }
      
      if (!formData.email.trim()) newErrors.email = t('err_email_req')
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = t('err_email_fmt')
    }

    if (step === 3) {
      if (formData.photos.length < 3) newErrors.photos = t('err_photos_min')
      if (formData.photos.length > 5) newErrors.photos = t('err_photos_max')
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    let processedValue = value

    if (name === "phone") {
      processedValue = value.replace(/[^0-9]/g, "")
    }

    setFormData((prev) => ({ ...prev, [name]: processedValue }))

    const key = name as keyof FormErrors
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined })) 
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).map((f: File) => f.name)

    if (formData.photos.length + files.length <= 5) {
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...files],
      }))
      
      if (errors.photos) {
        setErrors((prev) => ({ ...prev, photos: undefined })) 
      }
    }
  }

  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = () => {
    if (validateStep(1) && validateStep(2) && validateStep(3)) {
      setSubmitted(true)
      console.log("Form submitted:", formData)
    } else {
      if (!validateStep(1)) setCurrentStep(1)
      else if (!validateStep(2)) setCurrentStep(2)
      else if (!validateStep(3)) setCurrentStep(3)
    }
  }

  // === HALAMAN SUKSES (DARK MODE) ===
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center px-4 py-16 transition-colors duration-300">
        <div className="max-w-md w-full text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('success_title')}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {t('success_desc')}
          </p>
          <div className="bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-lg p-4 mb-8">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              <strong>{t('success_email_sent')}</strong>
              <br />
              {formData.email}
            </p>
          </div>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-full hover:shadow-lg transition-all duration-300"
          >
            {t('btn_home')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    // 1. BACKGROUND UTAMA DARK MODE
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-900 dark:to-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* <CustomPointer /> */}
      
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-balance">{t('register_page_title')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('register_page_desc')}
          </p>
        </div>

        {/* Important Info Box (DARK MODE) */}
        <div className="mb-8 bg-white dark:bg-slate-800 rounded-xl p-6 border-l-4 border-blue-600 dark:border-blue-500 shadow-md transition-colors duration-300">
          <div className="flex gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">{t('info_important_title')}</h3>
          </div>
          <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300 ml-9">
            <li className="flex gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
              <span>{t('info_point_1')}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
              <span>{t('info_point_2')}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
              <span>{t('info_point_3')}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
              <span>{t('info_point_4')}</span>
            </li>
          </ul>
        </div>

        {/* Progress Steps Container */}
        <div className="mb-12">
          <div className="relative">
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 dark:bg-slate-700 z-0 w-3/4 mx-auto">
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
                        : "bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-400"
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
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{step.title}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card (DARK MODE) */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-slate-700 transition-colors duration-300">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  {t('form_business_name')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder={t('form_ph_business_name')}
                  // 2. STYLE INPUT DARK MODE
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 outline-none ${
                    errors.businessName
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900"
                      : "border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 placeholder-gray-400 dark:placeholder-slate-400"
                  }`}
                />
                {errors.businessName && (
                  <p className="text-red-600 dark:text-red-400 text-sm mt-2 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-4 h-4" /> {errors.businessName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  {t('form_category')} <span className="text-red-500">*</span>
                </label>
                <select
                  name="businessCategory"
                  value={formData.businessCategory}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 outline-none ${
                    errors.businessCategory
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900"
                      : "border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900"
                  }`}
                >
                  <option value="">{t('form_ph_category')}</option>
                  {categoryKeys.map((key) => (
                    <option key={key} value={key}>
                      {t(key)}
                    </option>
                  ))}
                </select>
                {errors.businessCategory && (
                  <p className="text-red-600 dark:text-red-400 text-sm mt-2 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-4 h-4" /> {errors.businessCategory}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  {t('form_desc')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder={t('form_ph_desc')}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 outline-none resize-none ${
                    errors.description
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900"
                      : "border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 placeholder-gray-400 dark:placeholder-slate-400"
                  }`}
                />
                {errors.description && (
                  <p className="text-red-600 dark:text-red-400 text-sm mt-2 flex items-center gap-1 font-medium">
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
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">{t('form_owner')}</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  placeholder={t('form_ph_owner')}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 outline-none transition-all duration-200 placeholder-gray-400 dark:placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  {t('form_address')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder={t('form_ph_address')}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 outline-none resize-none ${
                    errors.address
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900"
                      : "border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 placeholder-gray-400 dark:placeholder-slate-400"
                  }`}
                />
                {errors.address && (
                  <p className="text-red-600 dark:text-red-400 text-sm mt-2 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-4 h-4" /> {errors.address}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    {t('form_phone')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t('form_ph_phone')}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 outline-none ${
                      errors.phone
                        ? "border-red-500 bg-red-50 dark:bg-red-900/20 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900"
                        : "border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 placeholder-gray-400 dark:placeholder-slate-400"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-2 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-4 h-4" /> {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    {t('form_email')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('form_ph_email')}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 outline-none ${
                      errors.email
                        ? "border-red-500 bg-red-50 dark:bg-red-900/20 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900"
                        : "border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 placeholder-gray-400 dark:placeholder-slate-400"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-2 flex items-center gap-1 font-medium">
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
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-4">
                  {t('form_photos_label')} <span className="text-red-500">*</span>
                </label>

                {/* Update Upload Area Dark Mode */}
                <div className="border-2 border-dashed border-blue-400 dark:border-blue-500 rounded-xl p-8 text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-700 dark:to-slate-600 hover:from-blue-100 hover:to-blue-200 dark:hover:from-slate-600 dark:hover:to-slate-500 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer block">
                    <Upload className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-3 transition-transform hover:scale-110" />
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">{t('form_drag_drop')}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{t('form_file_types')}</p>
                  </label>
                </div>

                {errors.photos && (
                  <p className="text-red-600 dark:text-red-400 text-sm mt-3 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-4 h-4" /> {errors.photos}
                  </p>
                )}

                {formData.photos.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      {t('form_photos_uploaded')} ({formData.photos.length}/5)
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {formData.photos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <div className="bg-gradient-to-br from-blue-100 to-green-100 dark:from-slate-700 dark:to-slate-600 rounded-lg p-4 aspect-square flex items-center justify-center border-2 border-blue-200 dark:border-slate-500 shadow-sm hover:shadow-md transition-all">
                            <div className="text-center">
                              <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                              <p className="text-xs text-gray-700 dark:text-gray-200 truncate">{photo}</p>
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
              {/* Update Summary Box Dark Mode */}
              <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-700 dark:to-slate-600 rounded-lg p-6 border border-blue-200 dark:border-slate-500">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">{t('summary_title')}</h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-start pb-4 border-b border-gray-200 dark:border-slate-500">
                    <span className="text-gray-600 dark:text-gray-300">{t('form_business_name')}:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{formData.businessName}</span>
                  </div>

                  <div className="flex justify-between items-start pb-4 border-b border-gray-200 dark:border-slate-500">
                    <span className="text-gray-600 dark:text-gray-300">{t('form_category')}:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formData.businessCategory ? t(formData.businessCategory) : "-"}
                    </span>
                  </div>

                  <div className="flex justify-between items-start pb-4 border-b border-gray-200 dark:border-slate-500">
                    <span className="text-gray-600 dark:text-gray-300">{t('form_owner')}:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{formData.ownerName || "-"}</span>
                  </div>

                  <div className="flex justify-between items-start pb-4 border-b border-gray-200 dark:border-slate-500">
                    <span className="text-gray-600 dark:text-gray-300">{t('form_phone')}:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{formData.phone}</span>
                  </div>

                  <div className="flex justify-between items-start pb-4 border-b border-gray-200 dark:border-slate-500">
                    <span className="text-gray-600 dark:text-gray-300">{t('form_email')}:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{formData.email}</span>
                  </div>

                  <div className="flex justify-between items-start pb-4 border-b border-gray-200 dark:border-slate-500">
                    <span className="text-gray-600 dark:text-gray-300">{t('form_photos_uploaded')}:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{formData.photos.length} foto</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 p-4 rounded">
                <p className="text-sm text-green-900 dark:text-green-100">
                  <strong>✓ {t('summary_ready')}</strong> {t('summary_ready_desc')}
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-slate-700">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                currentStep === 1
                  ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                  : "text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 active:scale-95"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">{t('btn_prev')}</span>
            </button>

            <div className="text-sm text-gray-600 dark:text-gray-400 text-center flex-shrink-0 px-2">
              {t('step_count')} {currentStep} {t('step_of')} {steps.length}
            </div>

            {currentStep === steps.length ? (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-4 sm:px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-semibold hover:shadow-lg active:scale-95 transition-all duration-300"
              >
                <span className="hidden sm:inline">{t('btn_submit')}</span>
                <CheckCircle2 className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-4 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold hover:shadow-lg active:scale-95 transition-all duration-300"
              >
                <span className="hidden sm:inline">{t('btn_next')}</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
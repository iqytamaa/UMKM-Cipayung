"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { X, CheckCircle } from "lucide-react" 
import { useLanguage } from "@/app/context/LanguageContext"

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  category: string
}

interface EventRegistrationModalProps {
  event: Event
  isOpen: boolean
  onClose: () => void
}

export default function EventRegistrationModal({ event, isOpen, onClose }: EventRegistrationModalProps) {
  const { t } = useLanguage()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isVisible, setIsVisible] = useState(false) 
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    let visibilityTimer: NodeJS.Timeout;

    if (isOpen) {
      setIsVisible(true);
      setIsSubmitted(false);
      setFormData({ fullName: "", email: "", phone: "", company: "", message: "" });
      document.body.style.overflow = 'hidden'; 
    } else {
      visibilityTimer = setTimeout(() => setIsVisible(false), 300); 
      document.body.style.overflow = 'unset';
    }

    return () => {
      clearTimeout(visibilityTimer);
      document.body.style.overflow = 'unset'; 
    };
  }, [isOpen]); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === "phone") {
      const numericValue = value.replace(/[^0-9]/g, '')
      setFormData((prev) => ({ ...prev, [name]: numericValue }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email || !formData.phone) {
        alert(t('modal_validation_error'));
        return;
    }
    console.log("Form Submitted:", formData); 
    setIsSubmitted(true) 

    setTimeout(() => {
      onClose(); 
    }, 2000) 
  }

  if (!mounted || (!isVisible && !isOpen)) return null;

  // Style Input untuk Dark Mode
  const inputStyle = "w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition text-sm shadow-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400";

  const modalContent = (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 z-[9999] flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none" 
      }`}
      onClick={onClose} 
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        // UPDATE: Background Modal Dark Mode
        className={`bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-10 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white rounded-full p-2 transition-colors duration-200 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Tutup modal"
          >
            <X size={24}/> 
          </button>
          <h2 id="modal-title" className="text-xl font-bold mb-1">{t('modal_title')}</h2>
          <p className="text-sm text-green-100">{event.title}</p>
        </div>

        {/* Form or Success Message */}
        <div className="p-6 max-h-[70vh] overflow-y-auto"> 
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <CheckCircle className="w-8 h-8 text-green-600" /> 
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('modal_success_title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t('modal_success_desc')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5"> 
                    {t('modal_label_name')} <span className="text-red-500">*</span>
                </label>
                <input id="fullName" type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className={inputStyle} placeholder={t('modal_placeholder_name')} />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                    {t('modal_label_email')} <span className="text-red-500">*</span>
                </label>
                <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required className={inputStyle} placeholder={t('modal_placeholder_email')} />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                    {t('modal_label_phone')} <span className="text-red-500">*</span>
                </label>
                <input id="phone" type="tel" inputMode="numeric" name="phone" value={formData.phone} onChange={handleChange} required className={inputStyle} placeholder={t('modal_placeholder_phone')} />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                    {t('modal_label_company')}
                </label>
                <input id="company" type="text" name="company" value={formData.company} onChange={handleChange} className={inputStyle} placeholder={t('modal_placeholder_company')} />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                    {t('modal_label_message')}
                </label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={3} className={`${inputStyle} resize-none`} placeholder={t('modal_placeholder_message')} />
              </div>

              {/* Event Details Summary - UPDATE DARK MODE */}
              <div className="bg-gray-100 dark:bg-slate-700/50 p-3 rounded-lg border border-gray-200 dark:border-slate-600 text-xs mt-6"> 
                <p className="text-gray-700 dark:text-gray-300 mb-1"><span className="font-semibold">{t('modal_summary_event')}:</span> {event.title}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-1"><span className="font-semibold">{t('modal_summary_date')}:</span> {event.date}, {event.time}</p>
                <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">{t('modal_summary_location')}:</span> {event.location}</p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 mt-6" 
              >
                {t('modal_btn_submit')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
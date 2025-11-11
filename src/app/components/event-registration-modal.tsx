"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, CheckCircle } from "lucide-react" // Import icons

// Define interface inline or import if used elsewhere
interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  category: string
  // Add other fields if needed by the modal, otherwise keep minimal
}

interface EventRegistrationModalProps {
  event: Event
  isOpen: boolean
  onClose: () => void
}

export default function EventRegistrationModal({ event, isOpen, onClose }: EventRegistrationModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isVisible, setIsVisible] = useState(false) // State for controlling visibility for animation

  // Effect to handle modal open/close animation and reset form on open
  useEffect(() => {
    let visibilityTimer: NodeJS.Timeout;

    if (isOpen) {
      // Immediately make visible for entry animation
      setIsVisible(true);
      // Ensure form is reset when opening for a new event (or re-opening)
      setIsSubmitted(false);
      setFormData({ fullName: "", email: "", phone: "", company: "", message: "" });
    } else {
      // Start fade-out animation
      // Delay setting visibility to false to allow fade-out animation
      visibilityTimer = setTimeout(() => setIsVisible(false), 300); // Match animation duration
    }

    // Cleanup visibility timer on unmount or if isOpen changes before timer completes
    return () => {
      clearTimeout(visibilityTimer);
    };
  }, [isOpen]); // Depend only on isOpen

  // Handle input changes, filtering non-numeric for phone
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === "phone") {
      const numericValue = value.replace(/[^0-9]/g, '')
      setFormData((prev) => ({ ...prev, [name]: numericValue }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple validation
    if (!formData.fullName || !formData.email || !formData.phone) {
        // You might want to use a toast here instead of alert
        alert("Nama Lengkap, Email, dan Nomor Telepon wajib diisi.");
        return;
    }
    console.log("Form Submitted:", formData); // Log data (replace with actual submission logic)
    setIsSubmitted(true) // Show success message

    // Automatically close modal after showing success message
    setTimeout(() => {
      onClose(); // Trigger the close process (which handles animation via useEffect)
    }, 2000) // Show success message for 2 seconds
  }

  // Render nothing if not visible and not currently opening (allows animation out)
   if (!isVisible && !isOpen) return null;

  // Define common input style using Tailwind classes
  const inputStyle = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition text-sm shadow-sm";

  return (
    // Modal Overlay - Handles centering and background dimming
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 z-40 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none" // Use pointer-events-none when hidden
      }`}
      onClick={onClose} // Close modal if overlay is clicked
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Modal Content - Prevent closing when clicking inside, adjust max-width here */}
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-10 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside content
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white rounded-full p-2 transition-colors duration-200 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Tutup modal"
          >
            <X size={24}/> {/* Using Lucide Icon */}
          </button>
          <h2 id="modal-title" className="text-xl font-bold mb-1">Daftar Event</h2>
          <p className="text-sm text-green-100">{event.title}</p>
        </div>

        {/* Form or Success Message */}
        <div className="p-6 max-h-[70vh] overflow-y-auto"> {/* Added max-height and scroll */}
          {isSubmitted ? (
            // Success State
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <CheckCircle className="w-8 h-8 text-green-600" /> {/* Using Lucide Icon */}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Pendaftaran Berhasil!</h3>
              <p className="text-gray-600 text-sm">
                Terima kasih! Konfirmasi akan dikirim ke email Anda.
              </p>
            </div>
          ) : (
            // Form State
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form Fields - Applied inputStyle */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1.5"> {/* Increased margin */}
                   Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input id="fullName" type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className={inputStyle} placeholder="Nama Anda" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email <span className="text-red-500">*</span>
                </label>
                <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required className={inputStyle} placeholder="email@example.com" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nomor Telepon <span className="text-red-500">*</span>
                </label>
                <input id="phone" type="tel" inputMode="numeric" name="phone" value={formData.phone} onChange={handleChange} required className={inputStyle} placeholder="08xx xxxx xxxx" />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nama Perusahaan/UMKM (Opsional)
                </label>
                <input id="company" type="text" name="company" value={formData.company} onChange={handleChange} className={inputStyle} placeholder="Nama bisnis Anda" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Pesan (Opsional)
                </label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={3} className={`${inputStyle} resize-none`} placeholder="Tulis pesan atau pertanyaan..." />
              </div>

              {/* Event Details Summary */}
              <div className="bg-gray-100 p-3 rounded-lg border border-gray-200 text-xs mt-6"> {/* Added margin top */}
                <p className="text-gray-700 mb-1"><span className="font-semibold">Event:</span> {event.title}</p>
                <p className="text-gray-700 mb-1"><span className="font-semibold">Tanggal:</span> {event.date}, {event.time}</p>
                <p className="text-gray-700"><span className="font-semibold">Lokasi:</span> {event.location}</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 mt-6" // Added margin top
              >
                Konfirmasi Pendaftaran
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
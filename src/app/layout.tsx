import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Perbaikan Path: Hapus '/app' jika folder components ada di src/components
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Toaster } from "sonner"; // <-- 1. Import Toaster

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TemuCipayung - Direktori UMKM", // Nama bisa disesuaikan
  description: "Temukan dan dukung UMKM lokal di Setu, Cipayung, Jakarta Timur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">{/* Ganti 'grow' jadi 'flex-grow' untuk konsistensi */}
          {children}
        </main>
        <Footer />
        <Toaster richColors position="top-right" /> {/* <-- 2. Render Toaster di sini */}
      </body>
    </html>
  );
}
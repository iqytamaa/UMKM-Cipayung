'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import type React from 'react'; // Import React untuk tipe data

// 1. Definisikan Tipe untuk Props (Memperbaiki error 'categories')
interface SearchFilterProps {
  categories: string[]; // Tentukan bahwa 'categories' adalah array of strings
}

// Terapkan tipe props di sini
export default function SearchFilter({ categories }: SearchFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('cat') || '');

  // 2. Beri Tipe pada Parameter 'e' (Memperbaiki error 'e')
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'search') {
      setSearchTerm(value);
    } else if (name === 'category') {
      setCategory(value);
    }
  };

  const applyFilter = () => {
    const params = new URLSearchParams(searchParams);

    if (searchTerm) {
      params.set('q', searchTerm);
    } else {
      params.delete('q');
    }

    if (category) {
      params.set('cat', category);
    } else {
      params.delete('cat');
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8 sticky top-20 z-40">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Bar */}
        <input
          type="text"
          name="search"
          value={searchTerm}
          onChange={handleFilterChange} // 'e' di sini sudah memiliki tipe
          placeholder="Cari nama UMKM..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Filter Kategori */}
        <select
          name="category"
          value={category}
          onChange={handleFilterChange} // 'e' di sini sudah memiliki tipe
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Semua Kategori</option>
          {/* 3. 'cat' di sini tipenya otomatis ter-infer (diketahui)
             karena 'categories' sudah didefinisikan sebagai string[] */}
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {/* Tombol Terapkan */}
        <button
          onClick={applyFilter}
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Cari
        </button>
      </div>
    </div>
  );
}
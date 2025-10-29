// File: src/data/umkm.ts

// 1. TAMBAHKAN DAN EKSPOR TIPE KATEGORI INI
export type UmkmCategory = "Kuliner" | "Fashion" | "Jasa & Lainnya";

// 2. PERBARUI INTERFACE UmkmData
export interface UmkmData {
  id: number | string;
  gallery: string[];
  name: string;
  category: UmkmCategory; // <-- DIUBAH DARI 'string'
  description: string;
  address: string;
  rating: number;
  reviews: number;
  mapEmbedUrl: string;
  promo?: string;
  menu?: { name: string; price: number }[];
  reviews_data?: { name: string; rating: number; text: string }[];
}

// Data UMKM Setu Cipayung, Jakarta Timur (6 per Kategori)
export const umkmData: UmkmData[] = [
  // Kategori: Kuliner (6)
  {
    id: 1,
    name: "ASSYIIK Resto Setu Cipayung",
    category: "Kuliner",
    description:
      "Restoran semi-outdoor dengan pemandangan Danau Setu. Menyajikan masakan Indonesia seperti ikan bakar dan soto.",
    address: "Jl. Setu Cipayung Timur, RT.5/RW.1, Setu, Cipayung, Jakarta Timur",
    gallery: [
      "/UMKM/Asyiik/1.jpg", "/UMKM/Asyiik/2.jpg", "/UMKM/Asyiik/3.jpg",
      "/UMKM/Asyiik/4.jpg", "/UMKM/Asyiik/5.jpg", "/UMKM/Asyiik/6.jpg"
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126900.96044443594!2d106.83255755296423!3d-6.308973127939453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699338c8859de5%3A0x9d97cd0cff55cba6!2sASSYIIK%20Resto%20Setu%20Cipayung!5e0!3m2!1sen!2sid!4v1761745527414!5m2!1sen!2sid",
    rating: 4.8,
    reviews: 156,
    promo: "Diskon 10% Makan Siang",
    menu: [
      { name: "Ikan Bakar Spesial", price: 85000 },
      { name: "Soto Betawi", price: 35000 },
      { name: "Es Kelapa Muda", price: 15000 },
    ],
    reviews_data: [
      { name: "Budi S.", rating: 5, text: "Tempatnya nyaman, pemandangan bagus, ikan bakarnya mantap!" },
      { name: "Citra L.", rating: 4, text: "Cocok buat kumpul keluarga, harga standar." },
    ],
  },
  {
    id: 2,
    name: "Bagi Kopi",
    category: "Kuliner",
    description:
      "Coffee shop modern dengan suasana yang nyaman untuk bekerja atau nongkrong. Menyajikan berbagai kopi, non-kopi, dan makanan ringan.",
    address: "Jl. Mandor Munding, RT.4/RW.1, Setu, Cipayung, Jakarta Timur, 13880",
    gallery: [
      "/UMKM/bagi kopi/1.jpg", "/UMKM/bagi kopi/2.jpg", "/UMKM/bagi kopi/3.jpg",
      "/UMKM/bagi kopi/4.jpg", "/UMKM/bagi kopi/5.jpg", "/UMKM/bagi kopi/6.jpg"
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.670465385229!2d106.9130425749912!3d-6.306953593682291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69930dc1d555bd%3A0x218b2cefc31ee02b!2sBagi%20Kopi%20Setu%20Cipayung!5e0!3m2!1sen!2sid!4v1761745725040!5m2!1sen!2sid", 
    rating: 4.7,
    reviews: 180,
    promo: "Gratis Croissant (min. beli 2 kopi)",
    menu: [
      { name: "Kopi Susu Gula Aren", price: 22000 },
      { name: "Americano", price: 20000 },
      { name: "Matcha Latte", price: 25000 },
      { name: "Croissant Cokelat", price: 18000 },
    ],
    reviews_data: [
      { name: "Rina A.", rating: 5, text: "Kopinya enak, tempatnya cozy banget buat nugas!" },
      { name: "Dito M.", rating: 4, text: "Matcha-nya mantap, parkiran agak susah." },
    ],
  },
  {
    id: 3,
    name: "Walungan Rasa Cipayung",
    category: "Kuliner",
    description:
      "Restoran khas Sunda yang menawarkan suasana makan di saung (gasebo) yang asri dan sejuk. Dikelilingi kolam ikan, cocok untuk makan bersama keluarga.",
    address: "Jl. Bambu Apus Raya No.64, RT.4/RW.3, Bambu Apus, Kec. Cipayung, Jakarta Timur",
    gallery: [
      "/UMKM/walungan/1.jpg", "/UMKM/walungan/2.jpg", "/UMKM/walungan/3.jpg",
      "/UMKM/walungan/4.jpg", "/UMKM/walungan/5.jpg", "/UMKM/walungan/6.jpg"
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.692605729374!2d106.9156138749911!3d-6.304058693685147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699329cad9f139%3A0x277e8c73c875f37d!2sWalungan%20Rasa!5e0!3m2!1sen!2sid!4v1761745863288!5m2!1sen!2sid", 
    rating: 4.6,
    reviews: 215,
    promo: "Paket Nasi Liwet 4 Orang",
    menu: [
      { name: "Gurame Bakar", price: 95000 },
      { name: "Nasi Liwet Komplit", price: 150000 },
      { name: "Karedok", price: 25000 },
      { name: "Ayam Goreng Lengkuas", price: 28000 },
    ],
    reviews_data: [
      { name: "Keluarga Budi", rating: 5, text: "Suasananya adem banget, makan di saung. Guramenya enak!" },
      { name: "Arini L.", rating: 4, text: "Tempat yang pas buat makan keluarga besar, pelayanannya ramah." },
    ],
  },
  {
    id: 4,
    name: "Druma Cafe",
    category: "Kuliner",
    description:
      "Cafe modern dan sangat luas dengan arsitektur industrial unik. Memiliki area indoor dan outdoor yang teduh, cocok untuk WFC (Work From Cafe) atau nongkrong santai.",
    address: "Jl. Bina Marga No.21, RT.5/RW.5, Ceger, Kec. Cipayung, Jakarta Timur",
    gallery: [
      "/UMKM/druma/1.jpg", "/UMKM/druma/2.jpg", "/UMKM/druma/3.jpg",
      "/UMKM/druma/4.jpg", "/UMKM/druma/5.jpg", "/UMKM/druma/6.jpg"
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63449.446440182466!2d106.84978369860961!3d-6.3174109680152535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69edb81c23f6c3%3A0xeee91ea95b64ef63!2sdruma.!5e0!3m2!1sid!2sid!4v1761655158991!5m2!1sid!2sid", 
    rating: 4.5,
    reviews: 320,
    promo: "Diskon 20% Kopi (Weekday)",
    menu: [
      { name: "Kopi Susu Gula Aren", price: 24000 },
      { name: "Americano", price: 23000 },
      { name: "Truffle Fettucine", price: 55000 },
      { name: "Donat Gula", price: 15000 },
    ],
    reviews_data: [
      { name: "Andi F.", rating: 5, text: "Tempatnya luas banget dan arsitekturnya keren. Kopi enak, wifi kenceng, pas buat kerja." },
      { name: "Siska", rating: 4, text: "Suka sama area outdoor-nya, adem banyak pohon. Makanannya lumayan, donatnya wajib coba." },
    ],
  },
  {
    id: 5,
    name: "Pecel Lele Cak Syam",
    category: "Kuliner",
    description:
      "Warung pecel lele kaki lima populer di area Pagelarang. Ada pecel lele, ayam, dan soto lamongan.",
    address: "Jl. Pagelarang No. 27, Setu, Cipayung, Jakarta Timur",
    gallery: [
      "/UMKM/cak syam/1.jpg", "/UMKM/cak syam/2.jpg", "/UMKM/cak syam/3.jpg",
      "/UMKM/cak syam/4.jpg", "/UMKM/cak syam/5.jpg", "/UMKM/cak syam/6.jpg"
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.685007766503!2d106.91869007499108!3d-6.305052293684155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6992afcce14f3f%3A0xf2faa900070da904!2sPecel%20Lele%20Cak%20Syam!5e0!3m2!1sen!2sid!4v1761746017652!5m2!1sen!2sid",
    rating: 4.4,
    reviews: 87,
    // Tidak ada promo
    menu: [
      { name: "Pecel Lele + Nasi", price: 18000 },
      { name: "Ayam Goreng + Nasi", price: 20000 },
      { name: "Soto Ayam Lamongan", price: 15000 },
    ],
    reviews_data: [
      { name: "Bambang S.", rating: 4, text: "Lelenya garing, sambelnya pas." },
      { name: "Susi H.", rating: 4, text: "Harga merakyat, rasa oke." },
    ],
  },
  {
    id: 6,
    name: " ",
    category: "Kuliner",
    description:
      "Restoran & cafe kekinian dengan konsep interior tanaman yang rimbun dan Instagramable. Menawarkan menu Asia & Barat, serta aneka kopi, teh premium, dan mocktail.",
    address: "Jl. Raya Mabes Hankam No.36, Bambu Apus, Kec. Cipayung, Jakarta Timur",
    gallery: [
      "/UMKM/seatap/1.jpg", "/UMKM/seatap/2.jpg", "/UMKM/seatap/3.jpg",
      "/UMKM/seatap/4.jpg", "/UMKM/seatap/5.jpg", "/UMKM/seatap/6.jpg"
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.6272063580564!2d106.90157117499108!3d-6.312605993676711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69edcc77bec471%3A0x978b88223e8c258!2sSEATAP%20Tea%20and%20Sky!5e0!3m2!1sen!2sid!4v1761745974872!5m2!1sen!2sid", 
    rating: 4.6,
    reviews: 420,
    promo: "Diskon 15% Minuman Teh Premium",
    menu: [
      { name: "Ice SEATAP Aren (Kopi Susu)", price: 31250 },
      { name: "Nasi Wagyu Sambal Matah", price: 56250 },
      { name: "Ice Lychee Tea", price: 31250 },
      { name: "Beef Burger", price: 40000 },
    ],
    reviews_data: [
      { name: "Clara S.", rating: 5, text: "Tempatnya cantik banget buat foto-foto, nuansa hijau bikin adem. Makanannya juga enak!" },
      { name: "Reza P.", rating: 4, text: "Pilihan teh-nya unik dan enak. Cocok buat santai sore." },
    ],
  },

  // Kategori: Fashion (6)
  {
    id: 7,
    name: "Restu Anggraini (Butik Muslim)",
    category: "Fashion",
    description:
      "Butik desainer busana muslim modern (modest wear) wanita. Ada gamis dan tunik.",
    address: "Jl. Bambu Hitam No. 20, Bambu Apus, Cipayung, Jakarta Timur",
    gallery: [
      "/UMKM/RA/1.jpg", "/UMKM/RA/2.jpg", "/UMKM/RA/3.jpg"
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63448.42963977438!2d106.85760969863765!3d-6.325699267291632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed5673b3473d%3A0x450f0a18b4088389!2sETU%20Design%20Center!5e0!3m2!1sid!2sid!4v1761657094697!5m2!1sid!2sid", 
    rating: 4.7,
    reviews: 134,
    promo: "Diskon 15% Member Baru",
    menu: [
      { name: "Gamis Series A", price: 350000 },
      { name: "Tunik Series B", price: 250000 },
    ],
    reviews_data: [
      { name: "Nur A.", rating: 5, text: "Desainnya elegan, bahannya adem." },
      { name: "Fatimah Z.", rating: 5, text: "Pelayanan sangat baik." },
    ],
  },
  {
    id: 8,
    name: "HEYBEB Factory Outlet",
    category: "Fashion",
    description: "Factory outlet pakaian branded sisa ekspor untuk wanita, pria, dan anak-anak.",
    address: "Ruko Puri Cilangkap, Jl. Assyafi'iyah No.221 1, RT.1/RW.5, Cilangkap, Kec. Cipayung, Kota Jakarta Timur",
    gallery: [
      "/UMKM/HEYBEB/1.jpg", "/UMKM/HEYBEB/2.jpg", "/UMKM/HEYBEB/3.jpg"
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63447.160543929036!2d106.8596702986726!3d-6.336028966392463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed5c628f9bc3%3A0x1d1a6edd0cfa24e2!2sHeybeb%20Factory%20Outlet!5e0!3m2!1sid!2sid!4v1761657570538!5m2!1sid!2sid", 
    rating: 4.5,
    reviews: 167,
    // Tidak ada promo
    menu: [
        { name: "Kaos Pria Branded", price: 75000 },
        { name: "Dress Anak Sisa Ekspor", price: 60000 },
    ],
    reviews_data: [
      { name: "Sinta K.", rating: 5, text: "Banyak pilihan, harga miring." },
      { name: "Dina M.", rating: 4, text: "Harus teliti pilih barangnya." },
    ],
  },
  {
    id: 9,
    name: "Agam Tailor",
    category: "Fashion",
    description:
      "Jasa penjahit (tailor) pembuatan dan permak pakaian pria (kemeja, celana, jas).",
    address: "Jl. Cipayung RT 003 RW 003 No 10 Kel Setu Kec Cipayung, Jakarta Timur",
    gallery: [
      "/UMKM/agam/1.jpg", "/UMKM/agam/2.jpg", "/UMKM/agam/3.jpg"
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126899.36757139757!2d106.82895975302233!3d-6.315474721378141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed4aed3c3f57%3A0xb88ef3c98a12c97b!2sAgam%20Tailor!5e0!3m2!1sid!2sid!4v1761658409281!5m2!1sid!2sid",
    rating: 4.8,
    reviews: 89,
    // Tidak ada promo
    menu: [
        { name: "Jahit Kemeja Custom", price: 150000 },
        { name: "Permak Celana", price: 30000 },
    ],
    reviews_data: [
      { name: "Hendra W.", rating: 5, text: "Jahitannya rapi banget, pas di badan." },
      { name: "Bambang I.", rating: 5, text: "Pengerjaan cepat dan hasilnya bagus." },
    ],
  },
  {
    id: 10,
    name: "Flaneliajasmine (Rumahjasmine)",
    category: "Fashion",
    description:
      "UMKM busana muslim modern (gamis, tunik, hijab) online dan offline.",
    address: "Djimbo RT 01 RW 03 NO 61 Bambu Apus Cipayung, Jakarta Timur",
    gallery: [
      "/UMKM/Flaneliajasmine/1.jpg", "/UMKM/Flaneliajasmine/2.jpg", "/UMKM/Flaneliajasmine/3.jpg"
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31725.225249098974!2d106.89106710569072!3d-6.309215895514308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed49d765bc1f%3A0xf4fcfd5854780959!2sRumahjasmineMart!5e0!3m2!1sid!2sid!4v1761660857393!5m2!1sid!2sid", 
    rating: 4.6,
    reviews: 145,
    promo: "Gratis Ongkir Jabodetabek",
    menu: [
        { name: "Set Gamis & Khimar", price: 300000 },
        { name: "Pashmina Instan", price: 50000 },
    ],
    reviews_data: [
      { name: "Ayu R.", rating: 5, text: "Modelnya simpel tapi cantik, bahan nyaman." },
      { name: "Lina S.", rating: 4, text: "Pengiriman standar, barang sesuai foto." },
    ],
  },
  {
    id: 11,
    name: "Kaski Atelier",
    category: "Fashion",
    description:
      "Toko fashion muslimah (gamis, tunik, hijab) dengan desain modern dan syar'i.",
    address: "Jl. Kp. Ratu Jaya No.46, RT.4/RW.5, Ratu Jaya, Kec. Cipayung, Kota Depok", // Ini Depok, tapi dekat
    gallery: [
      "/UMKM/Kaski Atelier/1.jpg", "/UMKM/Kaski Atelier/2.jpg", "/UMKM/Kaski Atelier/3.jpg"
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.8309647996134!2d106.8153365!3d-6.4157604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e97de0e039e5%3A0xbe63063b60305c49!2sKaski!5e0!3m2!1sid!2sid!4v1761662042594!5m2!1sid!2sid", 

    rating: 4.7,
    reviews: 156,
    // Tidak ada promo
    menu: [
      { name: "Gamis Ceruti Premium", price: 280000 },
      { name: "Tunik Katun Rayon", price: 150000 },
    ],
    reviews_data: [
      { name: "Riska A.", rating: 5, text: "Model gamisnya cantik-cantik, bahannya adem banget." },
      { name: "Yulia N.", rating: 4, text: "Pilihan hijab motifnya banyak, harga standar." },
    ],
  },
  {
    id: 12,
    name: "Nita Fashion",
    category: "Fashion",
    description:
      "Butik lokal pakaian kasual dan formal wanita. Koleksi blouse, kemeja, celana, dan rok terbaru.",
    address: "Jl. Pagelarang No.10, RT.2/RW.1, Setu, Kec. Cipayung, Jakarta Timur",
    gallery: [
      "/UMKM/Nita Fashion/1.jpg", "/UMKM/Nita Fashion/2.jpg", "/UMKM/Nita Fashion/3.jpg"
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126902.17641521127!2d106.83514135291988!3d-6.304005432953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6992add17e2fe5%3A0x348ae30e1076e1ba!2sNita%20Fashion!5e0!3m2!1sid!2sid!4v1761662652937!5m2!1sid!2sid", 
    rating: 4.4,
    reviews: 98,
    promo: "Diskon 25% Min. Belanja 500rb",
    menu: [
      { name: "Blouse Wanita Katun", price: 120000 },
      { name: "Celana Kulot Linen", price: 175000 },
    ],
    reviews_data: [
      { name: "Rendi H.", rating: 4, text: "Pilihan baju kantornya cukup banyak." },
      { name: "Anita P.", rating: 4, text: "Model blousenya lumayan update." },
    ],
  },

  // Kategori: Jasa & Lainnya (6)
  {
    id: 13,
    name: "TJM Auto Care",
    category: "Jasa & Lainnya",
    description:
      "Bengkel mobil modern: servis rutin, ganti oli, spooring, balancing, perbaikan mesin.",
    address: "Jl. Setu Cipayung No.15, Cilangkap, Cipayung, Jakarta Timur",
    gallery: [
      "/UMKM/TJM Auto Care/1.jpg", "/UMKM/TJM Auto Care/2.jpg", "/UMKM/TJM Auto Care/3.jpg"
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.519053386893!2d106.90059057499117!3d-6.326715693662807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69edce732c3f95%3A0x7c61bb5124769f2a!2sTJM%20Auto%20Care%20Cilangkap!5e0!3m2!1sen!2sid!4v1761745781322!5m2!1sen!2sid",
    rating: 4.8,
    reviews: 178,
    promo: "Gratis Cek Kaki-kaki",
    menu: [
        { name: "Paket Servis Berkala", price: 450000 },
        { name: "Ganti Oli + Filter", price: 300000 },
    ],
    reviews_data: [
      { name: "Pak Surya", rating: 5, text: "Montirnya handal, penjelasan detail." },
      { name: "Ibu Ratna", rating: 5, text: "Tempat tunggu nyaman, pengerjaan cepat." },
    ],
  },
  {
    id: 14,
    name: "Planet Ban Cipayung Setu",
    category: "Jasa & Lainnya",
    description:
      "Toko ritel & jasa: ban motor, ganti oli, servis ringan motor.",
    address: "Jln. Cipayung Setu, Cilangkap, Cipayung, Jakarta Timur",
    gallery: [
      "/UMKM/Planet Ban Cipayung Setu/1.jpg", "/UMKM/Planet Ban Cipayung Setu/2.jpg", "/UMKM/Planet Ban Cipayung Setu/3.jpg"
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31724.281147953032!2d106.85024321079256!3d-6.324618553896057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed3d4ca262dd%3A0xa6095fae44dd42b6!2sPlanet%20Ban%20Cipayung!5e0!3m2!1sid!2sid!4v1761668114038!5m2!1sid!2sid", 
    rating: 4.6,
    reviews: 134,
    // Tidak ada promo
    menu: [
        { name: "Ban Tubeless Matic", price: 180000 },
        { name: "Oli Mesin X-Ten", price: 55000 },
    ],
    reviews_data: [
      { name: "Budi S.", rating: 5, text: "Pilihan ban lengkap, pemasangan cepat." },
      { name: "Hendra K.", rating: 4, text: "Stafnya ramah dan informatif." },
    ],
  },
  {
    id: 15,
    name: "Swan Laundry Cipayung",
    category: "Jasa & Lainnya",
    description:
      "Jasa penatu (laundry) kiloan dan satuan: cuci, kering, setrika.",
    address: "Jl. Setu Cipayung, No.20A, Cipayung, Jakarta Timur",
    gallery: [
      "/UMKM/Swan Laundry Cipayung/1.jpg", "/UMKM/Swan Laundry Cipayung/2.jpg", "/UMKM/Swan Laundry Cipayung/3.jpg"
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.4931148484943!2d106.8978740749913!3d-6.330094993659463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed2f7e04b613%3A0x149b042841dd8a5a!2sSwan%20Laundry%20Cipayung!5e0!3m2!1sid!2sid!4v1761668229905!5m2!1sid!2sid", 
    rating: 4.7,
    reviews: 156,
    promo: "Cuci 5kg Gratis 1kg",
    menu: [
        { name: "Cuci Kering Setrika (per kg)", price: 7000 },
        { name: "Cuci Bed Cover (Queen)", price: 25000 },
    ],
    reviews_data: [
      { name: "Ibu Indah", rating: 5, text: "Bersih, wangi, dan tepat waktu." },
      { name: "Mas Doni", rating: 4, text: "Harga standar, hasil lumayan." },
    ],
  },
  {
    id: 16,
    name: "Toko Sembako Fano",
    category: "Jasa & Lainnya",
    description:
      "Toko kelontong (perdagangan) menjual kebutuhan pokok harian (sembako).",
    address: "Jl. Raya Setu Cipayung, No. 1A, RT 1 RW 4, Cipayung",
    gallery: [
      "/UMKM/Toko Sembako Fano/1.jpg", "/UMKM/Toko Sembako Fano/2.jpg", "/UMKM/Toko Sembako Fano/3.jpg"
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.5274116015626!2d106.90214692499119!3d-6.325626393663885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed302d9095e9%3A0x4d6840c63532073!2sToko%20Fano!5e0!3m2!1sid!2sid!4v1761668446720!5m2!1sid!2sid", 
    rating: 4.5,
    reviews: 112,
    // Tidak ada promo
    menu: [], // Menu tidak relevan
    reviews_data: [
      { name: "Pak Bams", rating: 4, text: "Cukup lengkap untuk kebutuhan sehari-hari." },
      { name: "Ibu Ani", rating: 5, text: "Pelayanan ramah, dekat rumah." },
    ],
  },
  {
    id: 17,
    name: "Penyewaan Perahu Bebek Waduk Setu",
    category: "Jasa & Lainnya",
    description: "Jasa rekreasi menyewakan perahu bebek keliling Danau Setu.",
    address: "Area Ekowisata Waduk Setu, Setu, Cipayung, Jakarta Timur",
    gallery: [
      "/UMKM/Penyewaan Perahu Bebek Waduk Setu/1.jpg", "/UMKM/Penyewaan Perahu Bebek Waduk Setu/2.jpg", "/UMKM/Penyewaan Perahu Bebek Waduk Setu/3.jpg"
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.6400765913604!2d106.91230612499113!3d-6.310924843678374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69934f830cd31f%3A0xce4be07f2bf80267!2sWaduk%20Setu%20Cipayung!5e0!3m2!1sen!2sid!4v1761745662966!5m2!1sen!2sid",
    rating: 4.8,
    reviews: 189,
    // Tidak ada promo
    menu: [
        { name: "Sewa 30 Menit", price: 25000 },
        { name: "Sewa 1 Jam", price: 40000 },
    ],
    reviews_data: [
      { name: "Keluarga Rahman", rating: 5, text: "Anak-anak senang banget naik perahu bebek." },
      { name: "Pasangan Muda", rating: 4, text: "Tempat rekreasi murah meriah." },
    ],
  },
  {
    id: 18,
    name: "Terdekat Self Photo Studio",
    category: "Jasa & Lainnya",
    description:
      "Studio foto mandiri (self-photo) kekinian. Ambil foto sepuasnya dengan peralatan profesional dan remote shutter.",
    address: "Jl. Cipayung Setu No. 200, Cipayung, Jakarta Timur",
    gallery: [
      "/UMKM/Terdekat Self Photo Studio/1.jpg", "/UMKM/Terdekat Self Photo Studio/2.jpg", "/UMKM/Terdekat Self Photo Studio/3.jpg"
    ],
    mapEmbedUrl:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126890.50351052811!2d106.81204835334556!3d-6.351533884993843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69edab7e610c95%3A0xe3f404b9eb657ee8!2sTerdekat%20Self%20Photo%20Studio!5e0!3m2!1sen!2sid!4v1761745614881!5m2!1sen!2sid", 
    rating: 4.9,
    reviews: 201,
    promo: "Paket Pelajar - Diskon 20%",
    menu: [
      { name: "Paket Sesi 15 Menit", price: 80000 },
      { name: "Paket Sesi 25 Menit", price: 120000 },
    ],
    reviews_data: [
      { name: "Rani & Doni", rating: 5, text: "Seru banget foto berdua! Nggak canggung karena nggak ada fotografer." },
      { name: "Geng Ceria", rating: 5, text: "Tempatnya oke, propertinya lucu-lucu." },
    ],
  },
];

// 3. EKSPOR TIPE KATEGORI YANG BENAR
export const categories: UmkmCategory[] = ["Kuliner", "Fashion", "Jasa & Lainnya"];

// 4. EKSPOR WARNA KATEGORI DENGAN TIPE YANG BENAR
export const categoryColors: Record<UmkmCategory, { from: string; to: string; badge: string }> = {
  Kuliner: { from: "from-orange-400", to: "to-red-500", badge: "bg-orange-500" },
  Fashion: { from: "from-pink-400", to: "to-purple-500", badge: "bg-pink-500" },
  "Jasa & Lainnya": { from: "from-blue-400", to: "to-cyan-500", badge: "bg-blue-500" },
};

/*
CATATAN PENTING UNTUK IMPORT:
Karena file ini berada di `src/data/umkm.ts`, saat mengimpornya dari file
lain di dalam `src/app/...`, gunakan path alias:

import { umkmData, categories, categoryColors, UmkmData, UmkmCategory } from "@/data/umkm";

JANGAN gunakan '/app' di path import untuk file data ini.
Alias '@/' sudah menunjuk ke folder 'src/'.
*/
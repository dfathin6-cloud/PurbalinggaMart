"use client";

import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [dataUMKM, setDataUMKM] = useState([
    {
      kategori: "MAKANAN & MINUMAN",
      items: [
        {
          id: 101,
          nama: "Mendoan Khas Purbalingga",
          toko: "Warung Mendoan Budi",
          harga: 15000,
          wa: "6281234567890",
          gambar: "https://placehold.co/600x400/f59e0b/ffffff?text=Mendoan+Khas"
        },
        {
          id: 102,
          nama: "Soto Kriyik Purbalingga",
          toko: "Soto Bu Yuni",
          harga: 20000,
          wa: "6281234567891",
          gambar: "https://placehold.co/600x400/f59e0b/ffffff?text=Soto+Kriyik"
        },
        {
          id: 103,
          nama: "Sate Ayam Blater",
          toko: "Sate Blater Pak Tejo",
          harga: 25000,
          wa: "6281234567892",
          gambar: "https://placehold.co/600x400/f59e0b/ffffff?text=Sate+Blater"
        },
        {
          id: 104,
          nama: "Nasi Goreng Spesial",
          toko: "Nasgor Mas Daffa",
          harga: 18000,
          wa: "6281234567893",
          gambar: "https://placehold.co/600x400/f59e0b/ffffff?text=Nasi+Goreng"
        },
        {
          id: 105,
          nama: "Es Duren Purbalingga",
          toko: "Kedai Es Duren Segar",
          harga: 22000,
          wa: "6281234567894",
          gambar: "https://placehold.co/600x400/f59e0b/ffffff?text=Es+Duren"
        },
        {
          id: 106,
          nama: "Wedang Uwuh Hangat",
          toko: "Omah Wedang",
          harga: 10000,
          wa: "6281234567895",
          gambar: "https://placehold.co/600x400/f59e0b/ffffff?text=Wedang+Uwuh"
        },
        {
          id: 107,
          nama: "Buntil Daun Singkong",
          toko: "Dapur Emak",
          harga: 12000,
          wa: "6281234567896",
          gambar: "https://placehold.co/600x400/f59e0b/ffffff?text=Buntil+Singkong"
        },
        {
          id: 108,
          nama: "Kue Nopia & Mino",
          toko: "Oleh-oleh Purbalingga",
          harga: 25000,
          wa: "6281234567897",
          gambar: "https://placehold.co/600x400/f59e0b/ffffff?text=Kue+Nopia"
        },
        {
          id: 109,
          nama: "Kopi Gunung Slamet",
          toko: "Slamet Roastery",
          harga: 35000,
          wa: "6281234567898",
          gambar: "https://placehold.co/600x400/f59e0b/ffffff?text=Kopi+Slamet"
        },
        {
          id: 110,
          nama: "Kerupuk Antor Khas",
          toko: "Toko Snack Bu Siti",
          harga: 15000,
          wa: "6281234567899",
          gambar: "https://placehold.co/600x400/f59e0b/ffffff?text=Kerupuk+Antor"
        }
      ]
    },
    {
      kategori: "KERAJINAN & KRIYA",
      items: [
        {
          id: 201,
          nama: "Knalpot Racing Jet",
          toko: "Jaya Knalpot",
          harga: 250000,
          wa: "6281234567892",
          gambar: "https://placehold.co/600x400/0f172a/ffffff?text=Knalpot+Jet"
        },
        {
          id: 202,
          nama: "Knalpot Klasik Custom",
          toko: "Braling Exhaust",
          harga: 350000,
          wa: "6281234567893",
          gambar: "https://placehold.co/600x400/0f172a/ffffff?text=Knalpot+Custom"
        },
        {
          id: 203,
          nama: "Minyak Atsiri Super",
          toko: "Penyulingan Purba",
          harga: 75000,
          wa: "6281234567894",
          gambar: "https://placehold.co/600x400/0f172a/ffffff?text=Minyak+Atsiri"
        },
        {
          id: 204,
          nama: "Batik Tulis Purbalingga",
          toko: "Galeri Batik Purbasari",
          harga: 150000,
          wa: "6281234567895",
          gambar: "https://placehold.co/600x400/0f172a/ffffff?text=Batik+Tulis"
        },
        {
          id: 205,
          nama: "Anyaman Bambu Hias",
          toko: "Wirasaba Craft",
          harga: 45000,
          wa: "6281234567896",
          gambar: "https://placehold.co/600x400/0f172a/ffffff?text=Anyaman+Bambu"
        },
        {
          id: 206,
          nama: "Sapu Glagah Premium",
          toko: "UMKM Sapu Purbalingga",
          harga: 25000,
          wa: "6281234567897",
          gambar: "https://placehold.co/600x400/0f172a/ffffff?text=Sapu+Glagah"
        },
        {
          id: 207,
          nama: "Wayang Suket",
          toko: "Kriya Suket Mbah Dirjo",
          harga: 85000,
          wa: "6281234567898",
          gambar: "https://placehold.co/600x400/0f172a/ffffff?text=Wayang+Suket"
        },
        {
          id: 208,
          nama: "Tas Anyaman Rotan",
          toko: "Rattan Aesthetic",
          harga: 120000,
          wa: "6281234567899",
          gambar: "https://placehold.co/600x400/0f172a/ffffff?text=Tas+Rotan"
        },
        {
          id: 209,
          nama: "Peci Rajut Lokal",
          toko: "Konveksi Rajut Berkah",
          harga: 30000,
          wa: "6281234567810",
          gambar: "https://placehold.co/600x400/0f172a/ffffff?text=Peci+Rajut"
        },
        {
          id: 210,
          nama: "Patung Kayu Estetik",
          toko: "Pahatan Kayu Mulyo",
          harga: 200000,
          wa: "6281234567811",
          gambar: "https://placehold.co/600x400/0f172a/ffffff?text=Patung+Kayu"
        }
      ]
    }
  ]);

  const [pendaftarUMKM, setPendaftarUMKM] = useState([
    { id: 901, nama: "Gula Merah Organik", toko: "Gula Manggar Sari", kategori: "MAKANAN & MINUMAN", tanggal: "24 Mei 2026" },
    { id: 902, nama: "Gelang Akar Bahar", toko: "Kriya Mistis", kategori: "KERAJINAN & KRIYA", tanggal: "24 Mei 2026" }
  ]);

  const setujuiUMKM = (id) => {
    setPendaftarUMKM(pendaftarUMKM.filter(toko => toko.id !== id));
  };

  return (
    <AppContext.Provider value={{ dataUMKM, setDataUMKM, pendaftarUMKM, setujuiUMKM }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
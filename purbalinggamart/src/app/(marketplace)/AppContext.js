"use client";

import { createContext, useContext, useState } from "react";

const AppContext = createContext();

// Data awal katalog produk PurbalinggaMart kamu
const initialDataUMKM = [
  {
    kategori: "MAKANAN & MINUMAN",
    items: [
      { id: 1, nama: "NOPIA ASLI PAK SLAMET", toko: "Toko Berkah", wa: "628123456789" },
      { id: 2, nama: "TEMPE MENDOAN GURIH", toko: "Warung Bu Siti", wa: "628123456789" },
      { id: 3, nama: "SOTO BANCAR KHAS", toko: "Warung Soto Ibu Sari", wa: "628123456789" },
      { id: 4, nama: "GULA KELAPA ORGANIK", toko: "Koperasi Aren Jaya", wa: "628123456789" },
      { id: 5, nama: "KRIPIK TEMPE SAGU", toko: "Oleh-Oleh Khas", wa: "628123456789" },
    ],
  },
  {
    kategori: "KERAJINAN & KRIYA",
    items: [
      { id: 6, nama: "KNALPOT RACING JET", toko: "Jaya Knalpot", wa: "628123456789" },
      { id: 7, nama: "MINYAK ATSIRI SUPER", toko: "Penyulingan Purba", wa: "628123456789" },
      { id: 8, nama: "BATIK PURBALINGGA", toko: "Galeri Batik Purbasari", wa: "628123456789" },
      { id: 9, nama: "ANYAMAN BAMBU", toko: "Wirasaba Craft", wa: "628123456789" },
      { id: 10, nama: "HIASAN DINDING KAYU", toko: "Bengkel Seni", wa: "628123456789" },
    ],
  },
];

// Data antrean pendaftaran toko baru yang ada di halaman Admin Hub
const initialPendaftar = [
  { id: 11, nama: "ES DAWET AYU SEGAR", toko: "Mendoan Kriuk Blater", pemilik: "Ahmad Fauzi", kategori: "MAKANAN & MINUMAN", wa: "6289658008022", tanggal: "21 Mei 2026" },
  { id: 12, nama: "KNALPOT BULAT BENZ", toko: "Wirasaba Craft", pemilik: "Budi Santoso", kategori: "KERAJINAN & KRIYA", wa: "6289658008022", tanggal: "20 Mei 2026" },
];

export function AppProvider({ children }) {
  const [dataUMKM, setDataUMKM] = useState(initialDataUMKM);
  const [pendaftarUMKM, setPendaftarUMKM] = useState(initialPendaftar);

  // Logika ketika admin menekan tombol "Setujui"
  const setujuiUMKM = (id) => {
    const itemDisetujui = pendaftarUMKM.find((item) => item.id === id);
    if (!itemDisetujui) return;

    // Masukkan produk baru secara dinamis ke kategori yang sesuai di halaman utama
    setDataUMKM((prevData) =>
      prevData.map((cat) => {
        if (cat.kategori === itemDisetujui.kategori) {
          return {
            ...cat,
            items: [
              ...cat.items,
              { id: itemDisetujui.id, nama: itemDisetujui.nama, toko: itemDisetujui.toko, wa: itemDisetujui.wa },
            ],
          };
        }
        return cat;
      })
    );

    // Hapus dari daftar antrean admin
    setPendaftarUMKM((prevList) => prevList.filter((item) => item.id !== id));
  };

  return (
    <AppContext.Provider value={{ dataUMKM, pendaftarUMKM, setujuiUMKM }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
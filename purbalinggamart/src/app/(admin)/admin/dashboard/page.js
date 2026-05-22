"use client";

import { useApp } from "@/app/(marketplace)/AppContext";
export default function AdminDashboardPage() {
  // Ambil data antrean dan fungsi setujui langsung dari global state
  const { pendaftarUMKM, setujuiUMKM } = useApp(); 

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Admin */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 gap-2">
        <div>
          <h2 className="text-2xl font-black text-slate-950 tracking-tight uppercase">Super Admin Hub</h2>
          <p className="text-xs text-slate-400 font-medium">Sistem kendali terpusat data dan verifikasi merchant PurbalinggaMart.</p>
        </div>
        <div className="text-xs font-bold text-slate-500 bg-slate-200/60 px-3 py-1.5 rounded-sm">
          Update Sistem: <span className="text-emerald-600">Online</span>
        </div>
      </div>

      {/* Grid Utama Statistik Keseluruhan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 p-6 shadow-sm relative overflow-hidden">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Total UMKM Terdaftar</span>
          <p className="text-4xl font-black text-slate-950 mt-1">10 Toko</p>
          <div className="h-1 w-12 bg-slate-950 mt-4" />
        </div>
        
        <div className="bg-white border border-slate-200 p-6 shadow-sm relative overflow-hidden">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Akumulasi Seluruh Produk</span>
          <p className="text-4xl font-black text-slate-950 mt-1">54 Item</p>
          <div className="h-1 w-12 bg-slate-950 mt-4" />
        </div>

        <div className="bg-white border border-emerald-500 p-6 shadow-sm relative overflow-hidden bg-gradient-to-br from-white to-emerald-50/10">
          <span className="text-[10px] font-bold tracking-widest text-emerald-600 uppercase">Menunggu Verifikasi</span>
          <p className="text-4xl font-black text-emerald-600 mt-1">{pendaftarUMKM.length} Calon</p>
          <span className="inline-block mt-3 text-[9px] font-bold uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 animate-pulse">
            Butuh Action
          </span>
        </div>
      </div>

      {/* Bagian Verifikasi Toko UMKM Baru */}
      <div className="border border-slate-200 bg-white p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-950">Persetujuan Pendaftaran UMKM</h3>
            <p className="text-[10px] text-slate-400 font-medium">Verifikasi berkas usaha pelaku UMKM lokal sebelum tampil publik</p>
          </div>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 font-bold">Sesi Terjaga</span>
        </div>

        {pendaftarUMKM.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-6 text-center border border-dashed border-slate-200 bg-slate-50">
            Semua pengajuan pendaftaran UMKM sudah disetujui! Antrean kosong.
          </p>
        ) : (
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-bold bg-slate-50">
                  <th className="p-3 font-bold">Nama Produk Baru</th>
                  <th className="p-3 font-bold">Nama Toko</th>
                  <th className="p-3 font-bold">Kategori Sektor</th>
                  <th className="p-3 font-bold">Tanggal Daftar</th>
                  <th className="p-3 font-bold text-center">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {pendaftarUMKM.map((toko) => (
                  <tr key={toko.id} className="text-slate-700 hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-bold text-slate-950">📦 {toko.nama}</td>
                    <td className="p-3 text-slate-500">{toko.toko}</td>
                    <td className="p-3">
                      <span className="border border-slate-200 text-slate-600 px-2 py-0.5 text-[10px]">
                        {toko.kategori}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400">{toko.tanggal}</td>
                    <td className="p-3 flex gap-2 justify-center">
                      <button 
                        onClick={() => setujuiUMKM(toko.id)} // Menjalankan fungsi approval ke katalog utama
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[9px] uppercase tracking-wider px-3 py-1.5 transition-colors"
                      >
                        Setujui
                      </button>
                      <button className="border border-red-200 hover:border-red-600 text-red-500 font-bold text-[9px] uppercase tracking-wider px-3 py-1.5 transition-colors">
                        Tolak
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
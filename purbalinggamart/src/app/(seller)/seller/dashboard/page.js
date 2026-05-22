export default function SellerDashboardPage() {
  // Data dummy simulasi pesanan masuk untuk UMKM
  const pesananTerbaru = [
    { id: "PBM-1024", produk: "Knalpot Racing Jet", pembeli: "Rian Purbalingga", total: "Rp 450.000", status: "Diproses" },
    { id: "PBM-1023", produk: "Nopia Asli Pak Slamet (2 Box)", pembeli: "Siti Blater", total: "Rp 70.000", status: "Selesai" },
    { id: "PBM-1022", produk: "Batik Purbalingga Motif Goa Lawa", pembeli: "Hendra Jatibarang", total: "Rp 250.000", status: "Selesai" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-950 to-slate-800 text-white p-8 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-amber-500 uppercase">Seller Center</span>
          <h2 className="text-2xl font-black tracking-tight uppercase mt-1">Selamat Datang, Mitra UMKM 👋</h2>
          <p className="text-xs text-slate-400 mt-1">Kelola dagangan dan pantau minat pembeli PurbalinggaMart dari satu panel.</p>
        </div>
        <div className="flex gap-2">
          <a href="/seller/produk" className="bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2.5 transition-colors">
            + Tambah Produk
          </a>
        </div>
      </div>

      {/* Grid Statistik Toko */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border border-slate-200 p-5 bg-white shadow-sm">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Total Pendapatan</p>
          <p className="text-2xl font-black text-slate-950 mt-1">Rp 770.000</p>
          <p className="text-[10px] text-emerald-600 font-semibold mt-2">↑ 12% dari minggu lalu</p>
        </div>
        <div className="border border-slate-200 p-5 bg-white shadow-sm">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Pesanan Baru</p>
          <p className="text-2xl font-black text-amber-600 mt-1">1 Pesanan</p>
          <p className="text-[10px] text-slate-400 mt-2">Perlu segera diproses</p>
        </div>
        <div className="border border-slate-200 p-5 bg-white shadow-sm">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Produk Tayang</p>
          <p className="text-2xl font-black text-slate-950 mt-1">5 Barang</p>
          <p className="text-[10px] text-slate-400 mt-2">Status: Aktif di Marketplace</p>
        </div>
        <div className="border border-slate-200 p-5 bg-white shadow-sm">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Klik Link Hubungi</p>
          <p className="text-2xl font-black text-slate-950 mt-1">42 Kali</p>
          <p className="text-[10px] text-emerald-600 font-semibold mt-2">Calon pembeli via WhatsApp</p>
        </div>
      </div>

      {/* Grafik Kunjungan & Tabel Pesanan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Grafik Mini (CSS Murni) */}
        <div className="border border-slate-200 p-6 bg-white lg:col-span-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-950 mb-1">Grafik Pengunjung</h3>
            <p className="text-[10px] text-slate-400 font-medium mb-6">Statistik kunjungan tokomu minggu ini</p>
          </div>
          {/* Batang Grafik */}
          <div className="flex items-end justify-between h-32 px-2 border-b border-slate-200 pb-2">
            <div className="w-6 bg-slate-200 h-10 rounded-t" title="Senin"></div>
            <div className="w-6 bg-slate-200 h-16 rounded-t" title="Selasa"></div>
            <div className="w-6 bg-slate-200 h-24 rounded-t" title="Rabu"></div>
            <div className="w-6 bg-amber-500 h-32 rounded-t" title="Kamis (Hari Ini)"></div>
            <div className="w-6 bg-slate-200 h-12 rounded-t" title="Jumat"></div>
          </div>
          <p className="text-[10px] text-center text-slate-400 font-bold mt-3">SEN — SL — RB — KM — JM</p>
        </div>

        {/* Tabel Pesanan */}
        <div className="border border-slate-200 p-6 bg-white lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-950">Aktivitas Pesanan Terbaru</h3>
            <span className="text-[10px] text-slate-400 font-bold underline cursor-pointer hover:text-slate-950">Lihat Semua</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-bold">
                  <th className="pb-3 font-bold">ID Pesanan</th>
                  <th className="pb-3 font-bold">Produk</th>
                  <th className="pb-3 font-bold">Pembeli</th>
                  <th className="pb-3 font-bold text-right">Total</th>
                  <th className="pb-3 font-bold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {pesananTerbaru.map((order) => (
                  <tr key={order.id} className="text-slate-700 hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 font-bold text-slate-950">{order.id}</td>
                    <td className="py-3.5">{order.produk}</td>
                    <td className="py-3.5 text-slate-400">{order.pembeli}</td>
                    <td className="py-3.5 text-right font-bold text-slate-950">{order.total}</td>
                    <td className="py-3.5 text-center">
                      <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                        order.status === "Diproses" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
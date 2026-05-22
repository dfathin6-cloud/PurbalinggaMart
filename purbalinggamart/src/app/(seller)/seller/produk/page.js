export default function SellerProdukPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center max-w-3xl">
        <h2 className="text-xl font-black text-slate-950 tracking-tight uppercase">Daftar Produk Toko</h2>
        <button className="bg-amber-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 hover:bg-amber-700 transition-colors">
          + Tambah Produk
        </button>
      </div>
      
      <div className="border border-dashed border-slate-300 p-12 text-center max-w-3xl">
        <p className="text-sm text-slate-400 font-medium">Belum ada produk dinamis. Data masih mengambil dari file prototype utama.</p>
      </div>
    </div>
  );
}
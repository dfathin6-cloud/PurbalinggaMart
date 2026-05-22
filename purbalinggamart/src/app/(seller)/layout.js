import "../globals.css"; // Path ini krusial buat narik Tailwind kamu

export default function SellerLayout({ children }) {
  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-950 text-white flex flex-col justify-between hidden md:flex border-r border-slate-800">
        <div className="p-6">
          <h2 className="text-xl font-black tracking-tighter uppercase text-white">
            Purbalingga <span className="text-amber-500">Mart</span>
          </h2>
          <div className="h-0.5 w-8 bg-amber-500 rounded-full mt-1.5" />
          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mt-2">Seller Center</p>
          
          <nav className="mt-10 space-y-1">
            <a href="/seller/dashboard" className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest rounded bg-slate-900 text-amber-500 border border-slate-800">
              📊 Dashboard
            </a>
            <a href="/seller/produk" className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest rounded text-slate-400 hover:bg-slate-900 hover:text-white border border-transparent hover:border-slate-800 transition">
              📦 Kelola Produk
            </a>
          </nav>
        </div>
        <div className="p-6 border-t border-slate-900 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Status: <span className="text-emerald-500">Seller Aktif</span>
        </div>
      </aside>

      {/* AREA KONTEN UTAMA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h1 className="text-sm font-bold uppercase tracking-widest text-slate-950">Dashboard Toko</h1>
          <a href="/" className="text-[10px] font-bold uppercase tracking-widest border border-slate-200 px-4 py-2 hover:border-slate-950 transition-colors">
            Lihat Toko 🌐
          </a>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}
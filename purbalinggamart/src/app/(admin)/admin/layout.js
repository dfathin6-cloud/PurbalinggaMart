import "@/app/globals.css";// Tetap ambil dari CSS utama global

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-900">
      {/* SIDEBAR ADMIN UTAMA */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between hidden md:flex border-r border-slate-700">
        <div className="p-6">
          <h2 className="text-xl font-black tracking-tighter uppercase text-white">
            PBMART <span className="text-emerald-500">ADMIN</span>
          </h2>
          <div className="h-0.5 w-8 bg-emerald-500 rounded-full mt-1.5" />
          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-2">Control Panel</p>
          
          <nav className="mt-10 space-y-1">
            <a href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest rounded bg-slate-800 text-emerald-400 border border-slate-700">
              👑 Main Statistik
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest rounded text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent hover:border-slate-700 transition">
              🏪 Verifikasi UMKM
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest rounded text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent hover:border-slate-700 transition">
              📂 Kelola Kategori
            </a>
          </nav>
        </div>
        <div className="p-6 border-t border-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Role: <span className="text-emerald-400">Super Admin</span>
        </div>
      </aside>

      {/* AREA KONTEN UTAMA ADMIN */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h1 className="text-sm font-bold uppercase tracking-widest text-slate-950">Overview Sistem PurbalinggaMart</h1>
          <a href="/" className="text-[10px] font-bold uppercase tracking-widest border border-slate-200 px-4 py-2 hover:border-slate-950 transition-colors">
            Ke Marketplace 🌐
          </a>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8 bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react"; 
import { useApp } from "@/app/(marketplace)/AppContext";

export default function Home() {
  const { dataUMKM } = useApp(); 

  const [activeCategory, setActiveCategory] = useState("MAKANAN & MINUMAN");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Halo! Selamat datang di PurbalinggaMart. Ada yang bisa asisten AI bantu hari ini? Coba ketik rekomendasi makanan atau rekomendasi kerajinan ya!" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isChatOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    const newMessages = [...messages, { sender: "user", text: userText }];
    setMessages(newMessages);
    setInputMessage("");

    setTimeout(() => {
      const inputLow = userText.toLowerCase();
      let aiResponse = "Maaf, asisten PurbalinggaMart belum memahami maksudmu. Coba ketik kata kunci seperti rekomendasi makanan, lapar, oleh-oleh, atau knalpot ya!";

      if (inputLow.includes("makanan") || inputLow.includes("lapar") || inputLow.includes("kuliner") || inputLow.includes("minum")) {
        const makananCat = dataUMKM.find(c => c.kategori === "MAKANAN & MINUMAN");
        if (makananCat && makananCat.items.length > 0) {
          const daftarRekomendasi = makananCat.items
            .map(item => `- ${item.nama} (Kemitraan: ${item.toko})`)
            .join("\n");
          aiResponse = `Rekomendasi Pintar AI PurbalinggaMart:\n\nBerdasarkan data UMKM kuliner lokal terverifikasi, berikut pilihan terbaik untukmu:\n\n${daftarRekomendasi}\n\nKamu bisa klik tombol HUBUNGI pada kartu produk untuk memesan langsung via WhatsApp!`;
        } else {
          aiResponse = "Saat ini belum ada produk makanan terverifikasi di sistem kami.";
        }
      }
      else if (inputLow.includes("kerajinan") || inputLow.includes("oleh-oleh") || inputLow.includes("kriya") || inputLow.includes("knalpot") || inputLow.includes("batik")) {
        const kriyaCat = dataUMKM.find(c => c.kategori === "KERAJINAN & KRIYA");
        if (kriyaCat && kriyaCat.items.length > 0) {
          const daftarRekomendasi = kriyaCat.items
            .map(item => `- ${item.nama} (Kemitraan: ${item.toko})`)
            .join("\n");
          aiResponse = `Rekomendasi Pintar AI PurbalinggaMart:\n\nUntuk cinderamata, batik, atau kerajinan khas logam Purbalingga, AI merekomendasikan ini:\n\n${daftarRekomendasi}\n\nMau cari rekomendasi produk lainnya?`;
        } else {
          aiResponse = "Saat ini belum ada produk kerajinan terverifikasi di sistem kami.";
        }
      }

      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    }, 800);
  };

  const currentCategoryData = dataUMKM.find(c => c.kategori === activeCategory);
  const displayItems = currentCategoryData ? currentCategoryData.items : [];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans relative pb-20 overflow-x-hidden">
      
      {/* 🧭 NAVIGATION */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <a href="/seller/dashboard" className="bg-slate-950 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-2 hover:bg-amber-600 transition-colors shadow-md rounded-lg">
          🏪 Seller Panel
        </a>
        <a href="/admin/dashboard" className="bg-slate-950 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-2 hover:bg-emerald-600 transition-colors shadow-md rounded-lg">
          👑 Admin Panel
        </a>
      </div>

      {/* 🏛️ HEADER */}
      <header className="pt-16 pb-8 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-950 uppercase">
          PURBALINGGA MART
        </h1>
        <div className="h-1 w-20 bg-amber-500 mx-auto mt-4 rounded-full" />
      </header>

      {/* 🎆 BANNER PROMO */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <div className="bg-slate-950 rounded-[2rem] p-8 md:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between relative overflow-hidden border border-slate-800">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
          
          <div className="md:w-2/3 relative z-10">
            <span className="inline-block py-1.5 px-4 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-widest mb-4 border border-amber-500/30">
              🔥 Spesial Hari Ini
            </span>
            <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
              Belanja Mudah,<br/>Dukung UMKM Lokal.
            </h2>
            <p className="text-slate-300 text-sm md:text-base mb-8 max-w-lg leading-relaxed">
              Temukan kerajinan kriya, aneka kuliner, dan produk unggulan khas Purbalingga. Harga terbaik langsung dari sumbernya.
            </p>
            <button 
              onClick={() => document.getElementById('produk-section').scrollIntoView({ behavior: 'smooth' })} 
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs md:text-sm px-8 py-3.5 rounded-xl uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 shadow-lg"
            >
              🚀 Mulai Cari Produk
            </button>
          </div>
          
          <div className="md:w-1/3 mt-10 md:mt-0 relative z-10 flex justify-center">
            <div className="w-56 h-56 bg-slate-900 border border-slate-700/50 rounded-3xl flex items-center justify-center shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500 group">
              <span className="text-7xl group-hover:scale-110 transition-transform duration-300">🛍️</span>
            </div>
          </div>
        </div>
      </section>

      {/* 🗂️ TABS */}
      <section id="produk-section" className="flex justify-center gap-6 border-b border-slate-200 max-w-3xl mx-auto mb-10 overflow-x-auto px-4 scrollbar-hide">
        {dataUMKM.map((cat) => (
          <button
            key={cat.kategori}
            onClick={() => setActiveCategory(cat.kategori)}
            className={`pb-4 text-[11px] md:text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
              activeCategory === cat.kategori
                ? "border-b-2 border-amber-500 text-amber-600 font-black"
                : "text-slate-400 hover:text-slate-900"
            }`}
          >
            {cat.kategori}
          </button>
        ))}
      </section>

      {/* 📦 PRODUCTS GRID */}
      <section className="max-w-6xl mx-auto px-4">
        {displayItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <span className="text-4xl mb-4 opacity-50">📭</span>
            <p className="text-center text-sm font-medium text-slate-500">Belum ada produk di kategori ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {displayItems.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col border border-slate-100 cursor-pointer"
                >
                  {/* 🖼️ AREA GAMBAR DENGAN FOTO ASLI */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    {item.gambar ? (
                      <img 
                        src={item.gambar} 
                        alt={`Foto Produk ${item.nama}`} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-200 text-xs font-bold text-slate-400">
                        Belum ada Foto
                      </div>
                    )}
                    
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-[9px] font-black text-amber-600 shadow-sm uppercase tracking-wider z-10">
                      Rekomendasi
                    </div>
                  </div>

                  {/* 📝 INFORMASI PRODUK */}
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="w-5 h-5 bg-amber-100 rounded flex items-center justify-center text-[10px]">
                        🏪
                      </div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider truncate">
                        {item.toko}
                      </p>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                      {item.nama}
                    </h3>

                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-amber-400 text-xs">★</span>
                      <span className="text-[11px] font-bold text-slate-700">4.8</span>
                      <span className="text-[9px] text-slate-400 ml-1">(120+ terjual)</span>
                    </div>

                    <div className="mt-auto pt-4">
                      <p className="text-base font-black text-slate-900">
                        {item.harga ? `Rp ${item.harga.toLocaleString('id-ID')}` : "Rp 25.000"}
                      </p>
                    </div>
                    
                    {/* 🚀 TOMBOL CTA */}
                    <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100 overflow-hidden rounded-b-2xl">
                      <button className="flex-none p-2 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50 text-slate-600 hover:text-amber-600 transition-colors flex items-center justify-center" title="Lihat Lokasi">
                        📍
                      </button>
                      <a
                        href={`https://wa.me/${item.wa}?text=Halo%20${encodeURIComponent(item.toko)},%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(item.nama)}%20di%20PurbalinggaMart.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-wide py-2.5 flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow active:scale-95"
                      >
                        <span>💬</span> Chat WA
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* 🤖 CHATBOT WINDOW */}
      <div className="fixed bottom-6 right-6 z-50 overflow-hidden rounded-full shadow-lg">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-amber-600 hover:bg-amber-700 text-white p-4 rounded-full transition-transform hover:scale-105"
        >
          {isChatOpen ? "❌" : "💬"}
        </button>

        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="absolute bottom-16 right-0 w-[85vw] md:w-96 h-[450px] bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden rounded-2xl"
            >
              <div className="bg-slate-950 text-white p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white">Asisten PurbalinggaMart</h3>
                  <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider mt-0.5 animate-pulse">🤖 AI Engine Active</p>
                </div>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 text-xs">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl whitespace-pre-wrap leading-relaxed shadow-sm ${
                        msg.sender === "user"
                          ? "bg-slate-900 text-white font-medium rounded-br-sm"
                          : "bg-white border border-slate-200 text-slate-800 rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Tanya rekomendasi makanan..."
                  className="flex-1 border border-slate-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-slate-50 font-medium transition-all"
                />
                <button type="submit" className="bg-slate-950 hover:bg-amber-600 text-white font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded-xl transition-colors">
                  Kirim
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </main>
  );
}
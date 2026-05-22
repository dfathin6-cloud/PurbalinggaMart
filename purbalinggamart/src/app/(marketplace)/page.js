"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react"; 
import { useApp } from "@/app/(marketplace)/AppContext";export default function Home() {
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
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans relative pb-20">
      
      {/* 🧭 NAVIGATION */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <a href="/seller/dashboard" className="bg-slate-950 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-2 hover:bg-amber-600 transition-colors shadow-md">
          🏪 Seller Panel
        </a>
        <a href="/admin/dashboard" className="bg-slate-950 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-2 hover:bg-emerald-600 transition-colors shadow-md">
          👑 Admin Panel
        </a>
      </div>

      {/* 🏛️ HEADER */}
      <header className="py-16 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-950 uppercase">
          PURBALINGGA MART
        </h1>
        <div className="h-1 w-20 bg-amber-500 mx-auto mt-4 rounded-full" />
      </header>

      {/* 🗂️ TABS */}
      <section className="flex justify-center gap-6 border-b border-slate-200 max-w-2xl mx-auto mb-12">
        {dataUMKM.map((cat) => (
          <button
            key={cat.kategori}
            onClick={() => setActiveCategory(cat.kategori)}
            className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all ${
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
          <p className="text-center text-xs text-slate-400 italic py-12">Belum ada produk tayang di kategori ini.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {displayItems.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  className="bg-white border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:border-slate-400 transition-colors group relative"
                >
                  <div>
                    <h3 className="text-sm font-black text-slate-950 tracking-tight group-hover:text-amber-600 transition-colors uppercase">
                      {item.nama}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium mt-1 uppercase tracking-wide">
                      🏢 {item.toko}
                    </p>
                  </div>
                  
                  <div className="flex gap-2 mt-6">
                    <button className="flex-1 border border-slate-200 hover:border-slate-950 text-slate-700 hover:text-slate-950 text-[10px] font-bold uppercase tracking-wider py-2 transition-colors">
                      Lokasi
                    </button>
                    <a
                      href={`https://wa.me/${item.wa}?text=Halo%20${encodeURIComponent(item.toko)},%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(item.nama)}%20di%20PurbalinggaMart.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold uppercase tracking-wider py-2 text-center transition-colors shadow-sm"
                    >
                      Hubungi
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* 🤖 CHATBOT WINDOW */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-amber-600 hover:bg-amber-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105"
        >
          {isChatOpen ? "❌" : "💬"}
        </button>

        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="absolute bottom-16 right-0 w-80 md:w-96 h-[450px] bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden"
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
                      className={`max-w-[80%] p-3 whitespace-pre-wrap leading-relaxed shadow-sm ${
                        msg.sender === "user"
                          ? "bg-slate-900 text-white font-medium"
                          : "bg-white border border-slate-200 text-slate-800"
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
                  placeholder="Tanya rekomendasi makanan atau kerajinan..."
                  className="flex-1 border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:border-slate-950 bg-slate-50 font-medium"
                />
                <button type="submit" className="bg-slate-950 hover:bg-amber-600 text-white font-bold text-[10px] uppercase tracking-wider px-4 py-2 transition-colors">
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
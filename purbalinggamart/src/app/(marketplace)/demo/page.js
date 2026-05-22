"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react"; 
import { useApp } from "../AppContext.js"; 

export default function DemoPage() {
  const { dataUMKM, pendaftarUMKM, setujuiUMKM } = useApp(); 

  // State Halaman Utama
  const [activeCategory, setActiveCategory] = useState("MAKANAN & MINUMAN");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Halo! Selamat datang di PurbalinggaMart. Ada yang bisa asisten AI bantu hari ini? Coba ketik rekomendasi makanan ya!" }
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
      let aiResponse = "Maaf, asisten PurbalinggaMart belum memahami maksudmu. Coba ketik kata kunci seperti rekomendasi makanan atau lapar ya!";

      if (inputLow.includes("makanan") || inputLow.includes("lapar") || inputLow.includes("kuliner") || inputLow.includes("minum") || inputLow.includes("seger")) {
        const makananCat = dataUMKM.find(c => c.kategori === "MAKANAN & MINUMAN");
        if (makananCat && makananCat.items.length > 0) {
          const daftarRekomendasi = makananCat.items
            .map(item => `- ${item.nama} (Kemitraan: ${item.toko})`)
            .join("\n");
          aiResponse = `Rekomendasi Pintar AI PurbalinggaMart:\n\nBerdasarkan data UMKM kuliner lokal terverifikasi, berikut pilihan terbaik untukmu:\n\n${daftarRekomendasi}\n\nKamu bisa klik tombol HUBUNGI pada kartu produk untuk memesan langsung via WhatsApp!`;
        }
      }
      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    }, 800);
  };

  const currentCategoryData = dataUMKM.find(c => c.kategori === activeCategory);
  const displayItems = currentCategoryData ? currentCategoryData.items : [];

  return (
    <div className="min-h-screen bg-slate-900 p-4 lg:p-8 font-sans grid grid-cols-1 lg:grid-cols-12 gap-8 text-slate-900">
      
      {/* ================= PANELS KIRI: SUPER ADMIN HUB ================= */}
      <div className="lg:col-span-4 bg-slate-50 border border-slate-200 p-6 flex flex-col justify-between shadow-2xl h-[calc(100vh-4rem)] overflow-y-auto">
        <div>
          <div className="border-b border-slate-200 pb-4 mb-6">
            <span className="inline-block bg-emerald-600 text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm mb-2">Simulasi Backend</span>
            <h2 className="text-xl font-black tracking-tight uppercase text-slate-950">Super Admin Hub</h2>
            <p className="text-[11px] text-slate-400 font-medium">Klik "Setujui" di sini untuk melihat efek instan di sebelah kanan.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Antrean Verifikasi ({pendaftarUMKM.length})</h3>
            
            {pendaftarUMKM.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-6 text-center border border-dashed border-slate-200 bg-white">
                Semua pengajuan pendaftaran UMKM sudah disetujui!
              </p>
            ) : (
              <div className="space-y-3">
                {pendaftarUMKM.map((toko) => (
                  <div key={toko.id} className="bg-white border border-slate-200 p-4 shadow-sm rounded-sm">
                    <p className="text-xs font-black text-slate-950 uppercase">📦 {toko.nama}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Toko: {toko.toko} | Sektor: {toko.kategori}</p>
                    <div className="flex gap-2 mt-3">
                      <button 
                        onClick={() => setujuiUMKM(toko.id)}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[9px] uppercase tracking-wider py-1.5 transition-colors"
                      >
                        Setujui & Tayangkan
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="text-[10px] bg-slate-200/60 p-3 font-bold text-center text-slate-500 mt-6">
          Sistem Terkoneksi Melalui Context API
        </div>
      </div>

      {/* ================= PANELS KANAN: HALAMAN UTAMA LIVE CLIENT ================= */}
      <div className="lg:col-span-8 bg-white border border-slate-200 shadow-2xl h-[calc(100vh-4rem)] overflow-y-auto relative p-6">
        
        {/* Header App */}
        <header className="py-6 text-center border-b border-slate-100 mb-6">
          <h1 className="text-2xl font-black tracking-tighter text-slate-950 uppercase">PURBALINGGA MART</h1>
          <p className="text-[10px] tracking-widest text-amber-600 font-bold uppercase mt-1">Etalase Publik Digital</p>
        </header>

        {/* Tabs Kategori */}
        <section className="flex justify-center gap-6 border-b border-slate-200 mb-6">
          {dataUMKM.map((cat) => (
            <button
              key={cat.kategori}
              onClick={() => setActiveCategory(cat.kategori)}
              className={`pb-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeCategory === cat.kategori ? "border-b-2 border-amber-500 text-amber-600 font-black" : "text-slate-400"
              }`}
            >
              {cat.kategori}
            </button>
          ))}
        </section>

        {/* Grid Produk */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {displayItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={item.id}
                className="bg-slate-50 border border-slate-200 p-4 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xs font-black text-slate-950 uppercase">{item.nama}</h3>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">🏢 {item.toko}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <span className="flex-1 text-center bg-amber-500 text-white text-[9px] font-bold uppercase py-1.5 rounded-sm">Verified Product</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>

        {/* CHATBOT MINIMALIS */}
        <div className="absolute bottom-4 right-4 z-50">
          <button onClick={() => setIsChatOpen(!isChatOpen)} className="bg-amber-600 text-white p-3 rounded-full shadow-lg text-sm">
            {isChatOpen ? "❌ Tutup AI" : "💬 Tanya AI"}
          </button>

          <AnimatePresence>
            {isChatOpen && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="absolute bottom-14 right-0 w-72 h-80 bg-white border border-slate-300 shadow-2xl flex flex-col overflow-hidden rounded-sm">
                <div className="bg-slate-950 text-white p-3 text-[10px] font-bold uppercase">Asisten AI Engine</div>
                <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-slate-50 text-[11px]">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`p-2 shadow-sm rounded-sm max-w-[85%] ${msg.sender === "user" ? "bg-slate-900 text-white" : "bg-white border text-slate-800"}`}>{msg.text}</div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                <form onSubmit={handleSendMessage} className="p-2 border-t flex gap-1 bg-white">
                  <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="Ketik kata kunci..." className="flex-1 border px-2 py-1 text-[11px] focus:outline-none" />
                  <button type="submit" className="bg-slate-950 text-white px-3 text-[10px] font-bold uppercase">Kirim</button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
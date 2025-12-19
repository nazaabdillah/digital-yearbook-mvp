import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

// 1. DEFINISI TEMA (Warna + Ikon)
// Kita kasih ID biar gampang dilacak, dan CSS untuk styling
const themes = [
  { id: 'love', name: 'Love', css: 'bg-gradient-to-br from-pink-100 to-rose-200 text-rose-800 border-rose-100', icon: '💖' },
  { id: 'sky', name: 'Chill', css: 'bg-gradient-to-br from-blue-100 to-cyan-200 text-blue-800 border-blue-100', icon: '☁️' },
  { id: 'sun', name: 'Happy', css: 'bg-gradient-to-br from-yellow-100 to-amber-200 text-amber-800 border-amber-100', icon: '☀️' },
  { id: 'nature', name: 'Fresh', css: 'bg-gradient-to-br from-green-100 to-emerald-200 text-emerald-800 border-emerald-100', icon: '🌿' },
  { id: 'magic', name: 'Mystic', css: 'bg-gradient-to-br from-purple-100 to-violet-200 text-purple-800 border-violet-100', icon: '🔮' },
  { id: 'fire', name: 'Spicy', css: 'bg-gradient-to-br from-orange-100 to-red-200 text-red-800 border-red-100', icon: '🔥' },
  { id: 'dark', name: 'Sad', css: 'bg-gradient-to-br from-gray-200 to-slate-400 text-slate-800 border-slate-300', icon: '🌧️' }
];

export default function SecretWall() {
  const [secrets, setSecrets] = useState<any[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [showGallery, setShowGallery] = useState(false); // <--- State buat Galeri Mode
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  // State untuk tema yang dipilih user (Default: Love)
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);

  const fetchSecrets = async () => {
    const { data, error } = await supabase
      .from('secrets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error("❌ Gagal ambil pesan:", error.message);
    else setSecrets(data || []);
  };

  useEffect(() => {
    fetchSecrets();
    // Auto refresh tiap 15 detik biar pesan baru masuk sendiri
    const interval = setInterval(fetchSecrets, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async () => {
    if(!message.trim()) return;
    setIsLoading(true);

    // Gunakan CSS dari tema yang DIPILIH USER
    const themeColor = selectedTheme.css; 

    const { error } = await supabase
      .from('secrets')
      .insert([
        { message: message, color: themeColor }
      ]);

    if (error) {
        alert("Gagal kirim pesan! Cek koneksi.");
        setIsLoading(false);
    } else {
        setIsSent(true);
        setMessage("");
        setIsLoading(false);
        fetchSecrets(); 
        
        setTimeout(() => {
          setIsSent(false);
          setShowInput(false);
          // Reset tema ke default setelah kirim
          setSelectedTheme(themes[0]);
        }, 2000);
    }
  };

  return (
    <div className="relative py-20 overflow-hidden bg-white/50 backdrop-blur-sm border-y border-gray-100">
      
      {/* Header Section */}
      <div className="text-center mb-10 px-4 relative z-10">
        <span className="text-4xl animate-bounce inline-block mb-2">💌</span>
        <h2 className="text-3xl font-extrabold text-gray-800">
            NGL / Menfess Angkatan
        </h2>
        <p className="text-gray-500 mt-2 max-w-md mx-auto mb-6">
            Kirim salam, confess crush, atau sekadar curhat anonim. Identitasmu aman bersama Tuhan.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            {/* Tombol Tulis */}
            <button 
                onClick={() => setShowInput(true)}
                className="bg-black text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all active:scale-95 flex items-center gap-2"
            >
                <span>✍️</span> Kirim Pesan
            </button>
            
            {/* Tombol Buka Galeri (Mode Diam) */}
            <button 
                onClick={() => setShowGallery(true)}
                className="bg-white text-gray-800 border border-gray-200 px-8 py-3 rounded-full font-bold shadow-sm hover:bg-gray-50 transition-all active:scale-95 flex items-center gap-2"
            >
                <span>📂</span> Lihat Semua Pesan
            </button>
        </div>
      </div>

      {/* === ANIMATED MARQUEE (Mode Bergerak) === */}
      {/* Hanya muncul kalau Gallery Mode MATI */}
      <div className="space-y-6">
          {/* Row 1 */}
          <div className="flex gap-6 animate-marquee whitespace-nowrap w-max hover:paused">
            {secrets.length > 0 ? [...secrets, ...secrets, ...secrets].map((secret, i) => (
              <SecretCard key={`r1-${i}`} secret={secret} />
            )) : <EmptyState />}
          </div>
          
          {/* Row 2 */}
          {secrets.length > 3 && (
            <div className="flex gap-6 animate-marquee-reverse whitespace-nowrap w-max hover:paused">
                {secrets.length > 0 ? [...secrets, ...secrets, ...secrets].reverse().map((secret, i) => (
                <SecretCard key={`r2-${i}`} secret={secret} />
                )) : null}
            </div>
          )}
      </div>

      {/* Gradient Fade pinggiran */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />


      {/* === MODAL INPUT DENGAN PILIHAN TEMA === */}
      {showInput && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
           <div className={`p-1 rounded-3xl w-full max-w-md shadow-2xl animate-slide-up relative ${selectedTheme.css.split(' ')[0]}`}> {/* Border ikut warna tema */}
              
              <button 
                onClick={() => setShowInput(false)}
                className="absolute -top-12 right-0 text-white font-bold text-sm bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 backdrop-blur-md"
              >
                BATAL ✕
              </button>

              <div className="bg-white rounded-[20px] p-6 text-center relative overflow-hidden">
                
                {isSent ? (
                    <div className="py-10">
                        <div className="text-6xl mb-4 animate-bounce">🚀</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Terkirim!</h3>
                        <p className="text-gray-500">Pesanmu sedang dikirim...</p>
                    </div>
                ) : (
                    <>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">Tulis Pesan</h3>
                        <p className="text-xs text-gray-400 mb-4">Pilih tema yang sesuai mood kamu</p>

                        {/* PILIHAN TEMA (Horizontal Scroll) */}
                        <div className="flex gap-3 overflow-x-auto pb-4 mb-2 scrollbar-hide snap-x">
                            {themes.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => setSelectedTheme(t)}
                                    className={`
                                        snap-start shrink-0 px-4 py-2 rounded-xl border-2 flex items-center gap-2 transition-all
                                        ${selectedTheme.id === t.id ? 'border-black bg-gray-50 scale-105' : 'border-transparent bg-gray-50 opacity-60 hover:opacity-100'}
                                    `}
                                >
                                    <span>{t.icon}</span>
                                    <span className="text-xs font-bold text-gray-700">{t.name}</span>
                                </button>
                            ))}
                        </div>

                        {/* Text Area (Background ngikutin tema) */}
                        <div className={`p-4 rounded-xl mb-6 transition-colors duration-300 border ${selectedTheme.css}`}>
                            <textarea 
                                className="w-full bg-transparent border-none focus:ring-0 outline-none h-32 resize-none text-gray-800 placeholder:text-gray-500/70 font-medium text-lg text-center"
                                placeholder={`Ketik pesan ${selectedTheme.name.toLowerCase()} di sini...`}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                disabled={isLoading}
                                autoFocus
                            />
                        </div>

                        <button 
                            onClick={handleSend}
                            disabled={isLoading}
                            className={`w-full bg-black text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${isLoading ? 'opacity-50' : 'hover:scale-[1.02]'}`}
                        >
                            {isLoading ? "Mengirim..." : `Kirim Pesan ${selectedTheme.icon}`}
                        </button>
                    </>
                )}
              </div>
           </div>
        </div>
      )}

      {/* === MODAL GALERI (Tampilan Semua Pesan Tanpa Jalan) === */}
      {showGallery && (
          <div className="fixed inset-0 z-[70] bg-gray-50/95 backdrop-blur-xl overflow-y-auto animate-fade-in">
              <div className="max-w-6xl mx-auto p-6 md:p-12 min-h-screen">
                  
                  {/* Header Galeri */}
                  <div className="flex justify-between items-center mb-8 sticky top-0 bg-gray-50/95 py-4 z-10 border-b border-gray-200">
                      <div>
                          <h2 className="text-2xl font-black text-gray-900">Galeri Rahasia 📂</h2>
                          <p className="text-gray-500 text-sm">Total {secrets.length} pesan tersimpan</p>
                      </div>
                      <button 
                        onClick={() => setShowGallery(false)}
                        className="bg-white border border-gray-300 p-2 px-4 rounded-full font-bold hover:bg-gray-100 shadow-sm"
                      >
                        Tutup ✕
                      </button>
                  </div>

                  {/* Grid Layout (Diam & Mudah Dibaca) */}
                  {secrets.length > 0 ? (
                      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                          {secrets.map((secret) => (
                              <div key={secret.id} className={`break-inside-avoid p-6 rounded-3xl border shadow-sm ${secret.color || themes[0].css} hover:scale-[1.02] transition-transform duration-300`}>
                                  <div className="flex justify-between items-start mb-4 opacity-50">
                                      <span className="text-[10px] font-bold uppercase tracking-widest border border-current px-2 py-0.5 rounded-full">Secret</span>
                                      {/* Coba tebak ikon berdasarkan warna background, atau default */}
                                      <span>💬</span> 
                                  </div>
                                  <p className="font-handwriting text-xl font-medium leading-relaxed">"{secret.message}"</p>
                                  <div className="mt-4 pt-4 border-t border-black/5 flex justify-between items-center opacity-40 text-xs font-bold">
                                      <span>ANONIM</span>
                                      <span>{new Date(secret.created_at).toLocaleDateString()}</span>
                                  </div>
                              </div>
                          ))}
                      </div>
                  ) : (
                      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                          <span className="text-4xl mb-2">📭</span>
                          <p>Belum ada pesan masuk.</p>
                      </div>
                  )}

                  {/* Tombol Tulis di Galeri */}
                  <div className="fixed bottom-8 right-8">
                      <button 
                        onClick={() => { setShowGallery(false); setShowInput(true); }}
                        className="bg-black text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-2xl hover:scale-110 transition-transform"
                      >
                          ✍️
                      </button>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
}

// Komponen Kecil untuk Kartu Marquee
function SecretCard({ secret }: { secret: any }) {
    // Fallback css kalau data lama gak punya warna
    const css = secret.color || "bg-gray-100 text-gray-800";
    return (
        <div className={`w-[300px] md:w-[350px] p-6 rounded-3xl shrink-0 whitespace-normal shadow-sm border ${css} hover:scale-105 transition-transform duration-300`}>
            <div className="flex justify-between items-start mb-4 opacity-50">
            <span className="text-[10px] font-bold uppercase tracking-widest border border-current px-2 py-0.5 rounded-full">Secret</span>
            <span>🤫</span>
            </div>
            <p className="font-handwriting text-lg font-medium leading-relaxed">"{secret.message}"</p>
        </div>
    )
}

function EmptyState() {
    return (
        <div className="px-10 py-4 bg-gray-100 rounded-full text-gray-400 italic">
            Belum ada pesan rahasia...
        </div>
    )
}
import React, { useState } from 'react';
import secretsData from '../data/secrets.json';

export default function SecretWall() {
  const [showInput, setShowInput] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if(!message) return;
    // Simulasi kirim
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setShowInput(false);
      setMessage("");
    }, 2000);
  };

  return (
    <div className="relative py-20 overflow-hidden bg-white/50 backdrop-blur-sm border-y border-gray-100">
      
      {/* Header Section */}
      <div className="text-center mb-12 px-4 relative z-10">
        <span className="text-4xl animate-bounce inline-block mb-2">💌</span>
        <h2 className="text-3xl font-extrabold text-gray-800">
            NGL / Menfess Angkatan
        </h2>
        <p className="text-gray-500 mt-2 max-w-md mx-auto">
            Kirim salam, confess crush, atau sekadar curhat anonim. Identitasmu aman bersama Tuhan.
        </p>
        
        <button 
            onClick={() => setShowInput(true)}
            className="mt-6 bg-black text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all active:scale-95 flex items-center gap-2 mx-auto"
        >
            <span>+</span> Kirim Pesan Anonim
        </button>
      </div>

      {/* === ANIMATED MARQUEE ROW 1 (Left) === */}
      <div className="flex gap-6 animate-marquee whitespace-nowrap mb-6 w-max hover:paused cursor-grab active:cursor-grabbing">
        {/* Kita duplicate array biar loopingnya seamless */}
        {[...secretsData, ...secretsData, ...secretsData].map((secret, i) => (
          <div key={`row1-${i}`} className={`w-[300px] md:w-[350px] p-6 rounded-3xl shrink-0 whitespace-normal shadow-sm border border-white/50 ${secret.color} hover:scale-105 transition-transform duration-300`}>
             <div className="flex justify-between items-start mb-4 opacity-50">
                <span className="text-[10px] font-bold uppercase tracking-widest border border-current px-2 py-0.5 rounded-full">Secret #{secret.id}</span>
                <span>🤫</span>
             </div>
             <p className="font-handwriting text-lg font-medium leading-relaxed">"{secret.message}"</p>
          </div>
        ))}
      </div>

      {/* === ANIMATED MARQUEE ROW 2 (Right/Reverse) === */}
      <div className="flex gap-6 animate-marquee-reverse whitespace-nowrap w-max hover:paused cursor-grab active:cursor-grabbing">
        {[...secretsData, ...secretsData, ...secretsData].reverse().map((secret, i) => (
          <div key={`row2-${i}`} className={`w-[300px] md:w-[350px] p-6 rounded-3xl shrink-0 whitespace-normal shadow-sm border border-white/50 ${secret.color} hover:scale-105 transition-transform duration-300`}>
             <div className="flex justify-between items-start mb-4 opacity-50">
                <span className="text-[10px] font-bold uppercase tracking-widest border border-current px-2 py-0.5 rounded-full">Secret #{secret.id}</span>
                <span>🤫</span>
             </div>
             <p className="font-handwriting text-lg font-medium leading-relaxed">"{secret.message}"</p>
          </div>
        ))}
      </div>

      {/* Gradient Fade di Kiri & Kanan biar makin smooth */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />


      {/* === MODAL INPUT ALA INSTAGRAM STORY === */}
      {showInput && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
           <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-1 rounded-3xl w-full max-w-md shadow-2xl animate-slide-up relative">
              
              {/* Tombol Close */}
              <button 
                onClick={() => setShowInput(false)}
                className="absolute -top-12 right-0 text-white font-bold text-sm bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 backdrop-blur-md"
              >
                BATAL ✕
              </button>

              <div className="bg-white rounded-[20px] p-8 text-center relative overflow-hidden">
                
                {isSent ? (
                    // Tampilan Sukses
                    <div className="py-10">
                        <div className="text-6xl mb-4 animate-bounce">🚀</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Terkirim!</h3>
                        <p className="text-gray-500">Pesan rahasiamu sudah terbang ke server.</p>
                    </div>
                ) : (
                    // Tampilan Input
                    <>
                        <div className="mb-6">
                            <img 
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Secret" 
                                className="w-16 h-16 rounded-full mx-auto mb-4 bg-gray-100 border-4 border-white shadow-md"
                            />
                            <h3 className="text-lg font-bold text-gray-800">Kirim Pesan Rahasia</h3>
                            <p className="text-xs text-gray-400">Tenang, nama kamu gak bakal ketahuan.</p>
                        </div>

                        <textarea 
                            className="w-full bg-gray-50 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none h-32 resize-none mb-6 text-gray-700 placeholder:text-gray-300 font-medium"
                            placeholder="Tulis pesan jujurmu di sini..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />

                        <button 
                            onClick={handleSend}
                            className="w-full bg-black text-white font-bold py-4 rounded-xl hover:opacity-80 transition-opacity flex items-center justify-center gap-2"
                        >
                            KIRIM SEKARANG 🔥
                        </button>
                        
                        <p className="text-[10px] text-gray-300 mt-4">*Pesan akan dimoderasi sebelum tampil.</p>
                    </>
                )}
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
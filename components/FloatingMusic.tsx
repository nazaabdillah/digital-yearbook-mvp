import React, { useState, useRef } from 'react';

interface FloatingMusicProps {
  minimal?: boolean; // Props baru: Mode Mini
}

export default function FloatingMusic({ minimal = false }: FloatingMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // LOGIC STYLE:
  // Kalau Minimal: Bulat kecil, di pojok kiri bawah (desktop) atau kanan atas/bawah (mobile)
  // Kalau Full: Kapsul lebar
  
  const containerStyle = minimal 
    ? "bg-black/80 w-12 h-12 rounded-full justify-center" // Mode Mini (Bulat)
    : "bg-[#121212]/90 w-auto rounded-full px-2 py-2 pr-5 gap-3"; // Mode Full (Kapsul)

  return (
    <div className={`fixed z-50 transition-all duration-500 ease-in-out
      ${minimal 
         ? "bottom-6 right-6 md:bottom-8 md:left-8" // Posisi Mini (Pojok)
         : "bottom-24 left-1/2 -translate-x-1/2 md:bottom-8 md:left-8 md:translate-x-0" // Posisi Full (Tengah/Kiri)
       }
    `}>
      <audio ref={audioRef} src="/music/anthem.mp3" loop />

      <button 
        onClick={togglePlay}
        className={`
            backdrop-blur-md text-white shadow-2xl border border-white/10 ring-1 ring-black/20 
            flex items-center hover:scale-105 transition-all group overflow-hidden
            ${containerStyle}
        `}
      >
        
        {/* 1. VINYL ANIMATION */}
        {/* Di mode mini, ini jadi tombol utamanya */}
        <div className={`relative shrink-0 border border-gray-700 rounded-full overflow-hidden ${minimal ? 'w-8 h-8' : 'w-10 h-10'} ${isPlaying ? 'animate-spin-slow' : ''}`}>
           <img 
             src="https://cdn-icons-png.flaticon.com/512/10885/10885201.png" 
             alt="Music"
             className={`w-full h-full object-cover transition-opacity ${minimal ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}
           />
           <div className="absolute inset-0 m-auto w-1.5 h-1.5 bg-[#121212] rounded-full border border-gray-600" />
        </div>

        {/* 2. INFO & CONTROLS (Hanya muncul di Mode Full) */}
        {!minimal && (
          <>
            <div className="flex flex-col min-w-[90px] text-left">
              <span className="text-xs font-bold text-white leading-tight truncate max-w-[120px]">
                Laskar Pelangi
              </span>
              <span className="text-[10px] text-gray-400 leading-tight flex items-center gap-1">
                {isPlaying ? <span className="text-green-500 animate-pulse">Playing...</span> : "Nidji"}
              </span>
            </div>

            {/* Tombol Play/Pause Hijau (Icon Only) */}
            <div className="w-8 h-8 rounded-full bg-[#1ed760] text-black flex items-center justify-center shadow-lg">
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5"><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" /></svg>
              )}
            </div>
          </>
        )}
      </button>
    </div>
  );
}
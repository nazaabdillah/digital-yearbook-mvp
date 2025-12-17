import React, { useState, useRef } from 'react';

export default function FloatingMusic() {
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

  return (
    // Container utama dibuat lebih besar dan glassmorphism lebih kuat
    <div className="fixed bottom-8 left-8 z-50 animate-slide-up group">
        
      {/* Ganti src dengan file lokalmu: "/music/anthem.mp3" */}
      <audio ref={audioRef} src="/music/anthem.mp3" loop />

      <div className={`relative bg-white/80 backdrop-blur-xl p-3 rounded-full shadow-2xl border border-white/50 flex items-center gap-4 transition-all duration-500 hover:scale-105 hover:bg-white/95 hover:shadow-blue-200/50 ${isPlaying ? 'pr-6 ring-4 ring-blue-400/20' : 'pr-3'}`}>
        
        {/* EFEK BARU: Nada Melayang (Hanya muncul saat Play) */}
        {isPlaying && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 pointer-events-none">
                <span className="absolute text-xl text-blue-500 animate-float-note-1">🎵</span>
                <span className="absolute text-lg text-purple-500 animate-float-note-2 left-4">🎼</span>
                <span className="absolute text-sm text-pink-500 animate-float-note-3 -left-4">✨</span>
            </div>
        )}

        {/* Tombol Vinyl */}
        <button 
          onClick={togglePlay}
          className="relative w-12 h-12 rounded-full flex items-center justify-center overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow"
        >
            {/* Gambar Vinyl berputar */}
           <img 
             src="https://cdn-icons-png.flaticon.com/512/10885/10885201.png" // Icon Vinyl Keren
             alt="Vinyl"
             className={`w-full h-full object-cover ${isPlaying ? 'animate-spin-slow' : ''}`}
           />
           {/* Lubang tengah & Icon Play/Pause */}
           <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <span className="text-white text-lg drop-shadow-md">
                     {isPlaying ? '⏸' : '▶'}
                </span>
           </div>
        </button>

        {/* Teks Info (Melebar saat hover atau play) */}
        <div className={`flex flex-col overflow-hidden transition-all duration-500 ${isPlaying || 'group-hover:w-32 w-0 opacity-0 group-hover:opacity-100'} ${isPlaying ? 'w-32 opacity-100' : ''}`}>
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider whitespace-nowrap">Now Playing</span>
          <span className="text-xs font-medium text-gray-700 truncate leading-tight whitespace-nowrap">
            Anthem Angkatan
          </span>
        </div>

        {/* Visualizer Bar (Hanya muncul saat Play) */}
        {isPlaying && (
             <div className="flex items-end gap-[3px] h-4">
                <span className="w-1 bg-blue-400 rounded-full animate-music-bar-1 h-full"></span>
                <span className="w-1 bg-purple-400 rounded-full animate-music-bar-2 h-3"></span>
                <span className="w-1 bg-pink-400 rounded-full animate-music-bar-3 h-full"></span>
            </div>
        )}
      </div>
    </div>
  );
}
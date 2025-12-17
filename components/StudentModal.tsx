import React from 'react';

// Kita definisikan tipe data khusus untuk Modal
interface ModalProps {
  student: any;         // Data siswa yang sedang dipilih
  onClose: () => void;  // Fungsi untuk menutup modal
}

export default function StudentModal({ student, onClose }: ModalProps) {
  if (!student) return null; // Jaga-jaga kalau datanya kosong, jangan render apa-apa

  return (
    // 1. Overlay Hitam Transparan (Background)
    // Saat area hitam diklik, jalankan fungsi onClose (tutup modal)
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      
      {/* 2. Kotak Modal (Konten Utama) */}
      {/* onClick stopPropagation: Biar kalau klik kotak putih, modalnya GAK ketutup */}
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden relative animate-bounce-in"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Tombol Close (X) di pojok kanan atas */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors bg-white/80 rounded-full p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Layout Modal: Header Gambar + Konten */}
        <div className="flex flex-col">
          {/* Header Warna / Foto */}
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          
          {/* Foto Profil Nyembul ke Atas (-mt-16) */}
          <div className="px-6 relative">
            <div className="-mt-16 border-4 border-white rounded-full w-32 h-32 overflow-hidden shadow-lg mx-auto">
              <img src={student.foto} alt={student.nama} className="w-full h-full object-cover" />
            </div>
            
            <div className="text-center mt-4">
              <h2 className="text-2xl font-bold text-gray-800">{student.nama}</h2>
              <p className="text-blue-600 font-medium">{student.nim} • {student.cita_cita}</p>
            </div>
          </div>

          {/* Body Konten */}
          <div className="p-6 space-y-4">
             {/* Bio */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <h3 className="text-xs uppercase text-gray-400 font-bold mb-1">Bio Singkat</h3>
              <p className="text-gray-700 italic">"{student.bio}"</p>
            </div>

            {/* Quote */}
            <div>
               <h3 className="text-xs uppercase text-gray-400 font-bold mb-1">Quote Andalan</h3>
               <p className="text-gray-800 font-serif text-lg">“{student.quote}”</p>
            </div>

            {/* Instagram Link Button */}
            <a 
              href={`https://instagram.com/${student.instagram.replace('@', '')}`} 
              target="_blank" 
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all"
            >
              Follow {student.instagram}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
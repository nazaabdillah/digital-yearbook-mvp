import React from 'react';

interface StudentModalProps {
  student: any;
  onClose: () => void;
}

export default function StudentModal({ student, onClose }: StudentModalProps) {
  if (!student) return null;

  // === SAFETY CHECK ===
  // Cek apakah ada instagram? Kalau ada, buang @ nya. Kalau tidak, set string kosong.
  const instagramUsername = student.instagram 
    ? student.instagram.replace('@', '').trim() 
    : '';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
      
      {/* Backdrop Gelap (Klik buat tutup) */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-scale-up">
        
        {/* Tombol Close */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-md"
        >
          ✕
        </button>

        {/* Foto Header Besar */}
        <div className="h-64 relative bg-gray-200">
           <img 
             src={student.foto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.nama}`} 
             alt={student.nama}
             className="w-full h-full object-cover"
           />
           {/* Gradient Overlay biar teks putih kebaca */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
           
           <div className="absolute bottom-0 left-0 p-6 text-white">
             <span className="bg-blue-600 text-xs font-bold px-2 py-1 rounded-md mb-2 inline-block border border-blue-400">
               {student.role || "Siswa"}
             </span>
             <h2 className="text-3xl font-bold leading-tight">{student.nama}</h2>
             <p className="text-white/80 font-mono text-sm mt-1">{student.nim}</p>
           </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6">
           
           {/* Quote Section */}
           <div className="relative pl-4 border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-xl">
             <span className="text-4xl text-blue-200 absolute top-0 left-2">"</span>
             <p className="text-gray-700 italic font-medium relative z-10">
               {student.quote || "Tidak ada kata-kata hari ini."}
             </p>
           </div>

           {/* Tombol Instagram (HANYA MUNCUL KALAU ADA USERNAME) */}
           {instagramUsername ? (
               <a 
                 href={`https://instagram.com/${instagramUsername}`} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="block w-full text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                 Follow @{instagramUsername}
               </a>
           ) : (
               // Tampilan kalau tidak ada IG (Disabled Button)
               <button disabled className="block w-full text-center bg-gray-100 text-gray-400 font-bold py-3 rounded-xl cursor-not-allowed border border-gray-200">
                 🚫 No Social Media
               </button>
           )}

        </div>
      </div>
    </div>
  );
}
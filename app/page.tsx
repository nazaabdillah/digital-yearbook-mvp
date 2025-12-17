"use client";

import React, { useState, useEffect } from 'react';
import studentsData from '../data/students.json';
import classesData from '../data/classes.json';
import secretsData from '../data/secrets.json';
import StudentCard from '../components/StudentCard';
import StudentModal from '../components/StudentModal';
import Footer from '../components/Footer';
import FloatingMusic from '../components/FloatingMusic';
import SecretWall from '../components/SecretWall'; // <--- Import Ini

export default function Home() {
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [classPosts, setClassPosts] = useState<any[]>([]); 
  const [isScrolled, setIsScrolled] = useState(false); // Deteksi scroll untuk sticky header

  useEffect(() => {
    if (selectedClass) {
      setClassPosts(selectedClass.posts || []);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Auto scroll ke atas pas ganti kelas
    }
  }, [selectedClass]);

  // Efek untuk mendeteksi scroll (biar header berubah warna)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackToMenu = () => {
    setSelectedClass(null);
    setSearchQuery("");
  };

  const studentsInClass = selectedClass 
    ? studentsData.filter(s => s.kelasId === selectedClass.id)
    : [];
  const filteredStudents = studentsInClass.filter((student) => 
    student.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen font-sans text-gray-800 relative overflow-x-hidden">
      
      {/* 1. BACKGROUND AURORA (ANIMATED GRADIENT) */}
      <div className="fixed inset-0 -z-50 bg-[#f8fafc]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/30 blur-[100px] animate-spin-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-200/30 blur-[100px] animate-spin-slow" />
      </div>

      {!selectedClass ? (
        // === HALAMAN DEPAN (LANDING PAGE) ===
        <div className="max-w-6xl mx-auto p-8 min-h-screen flex flex-col justify-center animate-fade-in">
             
             {/* Header Judul dengan Gradient Text */}
             <div className="text-center mb-16 space-y-4">
                <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest border border-blue-100 uppercase">
                  Digital Yearbook 2025
                </span>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Kenangan Abadi
                  </span>
                  <br />
                  <span className="text-gray-900">Masa Putih Abu</span>
                </h1>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                  Setiap wajah punya cerita, setiap kelas punya legenda. Pilih kelasmu dan putar kembali waktu.
                </p>
             </div>

             {/* Grid Kelas */}
              {/* Grid Kelas - CINEMATIC REVEAL STYLE */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24 px-4">
                {classesData.map((kelas) => (
                  <div 
                    key={kelas.id}
                    onClick={() => setSelectedClass(kelas)} 
                    // Container Utama: Rounded besar, Shadow tebal,Overflow hidden wajib!
                    className="group relative h-[400px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl shadow-blue-900/20 transition-all duration-500 hover:shadow-blue-900/40 hover:-translate-y-3"
                  >
                    {/* 1. Gambar Background (Zoom In saat hover) */}
                    <img 
                        src={kelas.cover} 
                        alt={kelas.nama} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    
                    {/* 2. Overlay Gradient Gelap (Selalu ada tapi tipis) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/80" />

                    {/* 3. Konten Tulisan (Judul selalu muncul, Deskripsi muncul saat hover) */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end text-white z-20">
                        {/* Badge Tahun/Angkatan */}
                        <div className="self-start mb-4 overflow-hidden">
                             <span className="inline-block px-3 py-1 text-xs font-bold bg-blue-600/80 backdrop-blur-md rounded-full transform transition-transform duration-500 translate-y-10 group-hover:translate-y-0">
                                CLASS OF 2025
                             </span>
                        </div>

                        {/* Judul Kelas Besar */}
                        <h2 className="text-4xl font-extrabold mb-2 drop-shadow-lg transform transition-all duration-500 group-hover:-translate-y-2">
                            {kelas.nama}
                        </h2>
                        
                        {/* Deskripsi & Tombol (Disembunyikan di bawah layar, muncul saat hover) */}
                        <div className="transform translate-y-full transition-transform duration-500 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                            <p className="text-gray-200 text-sm mb-6 line-clamp-2 drop-shadow-md">
                                {kelas.deskripsi}
                            </p>
                            
                             {/* Tombol "Jelajahi" yang menggoda */}
                            <button className="bg-white text-blue-900 px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-all hover:bg-blue-50 hover:gap-4 active:scale-95">
                                Jelajahi Album
                                <span>→</span>
                            </button>
                        </div>
                    </div>
                  </div>
                ))}
             </div>

             {/* Secret Message Section */}
              <div className="mb-24">
                <SecretWall />
              </div>

             <Footer />
        </div>
      ) : (
        
        // === HALAMAN DETAIL KELAS (UPGRADED UX) ===
        <div className="animate-slide-up pb-20">
          
          {/* 2. STICKY GLASS HEADER (NAVIGASI CANGGIH) */}
          <div className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent py-6'}`}>
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                <button 
                  onClick={handleBackToMenu} 
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm"
                >
                  ←
                </button>
                <div>
                   <h1 className={`font-bold text-gray-900 transition-all ${isScrolled ? 'text-xl' : 'text-2xl md:text-3xl'}`}>
                     {selectedClass.nama}
                   </h1>
                   {!isScrolled && <p className="text-gray-500 text-sm hidden md:block">Album Kenangan Resmi</p>}
                </div>
              </div>

              {/* Search Bar yang selalu ada di atas */}
              <div className="relative w-full md:w-96">
                <input 
                  type="text"
                  placeholder="Cari nama teman / role..."
                  className="w-full pl-12 pr-4 py-3 rounded-full bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="absolute left-4 top-3 text-gray-400">🔍</span>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-6 mt-8">
            
            {/* Timeline Gallery */}
            <div className="mb-16">
               <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                 📸 Momen Terbaik
                 <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full font-normal">Scroll ke samping</span>
               </h3>
               
               {/* Horizontal Scroll Container */}
               <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x">
                  {classPosts.length > 0 ? classPosts.map((post) => (
                    <div key={post.id} className="snap-center shrink-0 w-[300px] md:w-[400px] group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                      <img src={post.image} className="w-full h-64 object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100" />
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <p className="text-sm font-bold opacity-90">{post.author}</p>
                        <p className="text-xs opacity-70 mb-1">{post.date}</p>
                        <p className="text-sm line-clamp-2">"{post.caption}"</p>
                      </div>
                    </div>
                  )) : (
                    <div className="w-full text-center py-10 bg-white/50 border border-dashed rounded-xl">
                      <p className="text-gray-400">Belum ada momen yang diabadikan.</p>
                    </div>
                  )}
               </div>
            </div>

            <hr className="border-gray-200 mb-12" />

            {/* Grid Siswa (Lezat Maksimal) */}
            <div>
               <div className="flex justify-between items-end mb-8">
                 <h3 className="text-2xl font-bold text-gray-800">
                   Warga Kelas 
                   <span className="ml-2 text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                     {filteredStudents.length} Siswa
                   </span>
                 </h3>
               </div>

               {filteredStudents.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {filteredStudents.map((student) => (
                    // Disini StudentCard sudah ada efek Tilt dari kode sebelumnya
                    <StudentCard 
                      key={student.id}
                      nama={student.nama}
                      nim={student.nim}
                      quote={student.quote}
                      foto={student.foto}
                      role={student.role}
                      onClick={() => setSelectedStudent(student)} 
                    />
                  ))}
                </div>
               ) : (
                 <div className="text-center py-20">
                   <div className="text-6xl mb-4">🤔</div>
                   <h3 className="text-xl font-bold text-gray-800">Waduh, nggak ketemu!</h3>
                   <p className="text-gray-500">Coba cari nama panggilan atau cek ejaan lagi.</p>
                 </div>
               )}
            </div>

          </div>

          <div className="mt-20">
             <Footer />
          </div>

          {selectedStudent && (
            <StudentModal 
              student={selectedStudent} 
              onClose={() => setSelectedStudent(null)} 
            />
          )}

        </div>
      )}

      {/* Floating Music tetap setia menemani */}
      <FloatingMusic />

    </main>
  );
}
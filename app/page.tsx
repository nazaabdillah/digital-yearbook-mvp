"use client";

import React, { useState, useEffect } from 'react';
import classesData from '../data/classes.json';
import StudentCard from '../components/StudentCard';
import StudentModal from '../components/StudentModal';
import Footer from '../components/Footer';
import FloatingMusic from '../components/FloatingMusic';
import SecretWall from '../components/SecretWall';
import BottomNav from '../components/BottomNav';
import { supabase } from '../lib/supabaseClient'; 

export default function Home() {
  // === STATE MANAGEMENT ===
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  
  // State Navigasi
  const [activeTab, setActiveTab] = useState<'home' | 'secrets' | 'gallery'>('home');

  // State Database
  const [dbStudents, setDbStudents] = useState<any[]>([]); 
  const [dbPosts, setDbPosts] = useState<any[]>([]); // Data Foto Galeri
  const [isLoadingStudents, setIsLoadingStudents] = useState(true);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

  // === 1. FETCH DATA SISWA (Sekali saat load) ===
  useEffect(() => {
    const fetchStudents = async () => {
      const { data, error } = await supabase.from('students').select('*');
      if (error) console.error("❌ Error fetch students:", error.message);
      else setDbStudents(data || []);
      setIsLoadingStudents(false); 
    };
    fetchStudents();
  }, []);

  // === 2. FETCH GALERI POSTS (Saat pilih kelas) ===
  useEffect(() => {
    const fetchPosts = async () => {
      if (!selectedClass) return;
      
      setIsLoadingPosts(true);
      // Ambil data dari tabel 'class_posts'
      const { data, error } = await supabase
        .from('class_posts')
        .select('*')
        .eq('kelas_id', selectedClass.id) // Filter by ID Kelas
        .order('created_at', { ascending: false });

      if (error) {
        console.error("❌ Error fetch posts:", error.message);
        setDbPosts([]); 
      } else {
        setDbPosts(data || []);
      }
      setIsLoadingPosts(false);
    };

    fetchPosts();
  }, [selectedClass]);

  // Effect: Sticky Header Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // === LOGIC NAVIGASI KEMBALI ===
  const handleBackToMenu = () => {
    setSelectedClass(null);
    setSearchQuery("");
    setDbPosts([]); // Bersihkan galeri saat kembali
    setActiveTab('home');
  };

  // === LOGIC NAVIGASI BOTTOM BAR ===
  const handleNavigate = (tab: 'home' | 'secrets' | 'gallery') => {
    setActiveTab(tab);

    if (tab === 'home') {
      // Reset pilihan kelas (Keluar dari detail)
      setSelectedClass(null);
      
      // Tunggu sebentar biar halaman Home render, baru scroll
      setTimeout(() => {
        const section = document.getElementById('home-section');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } 
    else if (tab === 'secrets') {
      // Paksa balik ke Home dulu
      setSelectedClass(null);

      // Tunggu render, baru cari elemen Secret Wall
      setTimeout(() => {
        const section = document.getElementById('secret-section');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    else if (tab === 'gallery') {
       alert("🚧 Fitur Galeri Angkatan (All Classes) sedang dibangun!");
    }
  };

  // === LOGIC FILTER DATA SISWA ===
  const studentsInClass = selectedClass 
    ? dbStudents.filter(s => {
        const dbClassId = s.kelas_id ? s.kelas_id.toLowerCase() : "";
        const selectedId = selectedClass.id ? selectedClass.id.toLowerCase() : "";
        return dbClassId === selectedId;
      })
    : [];

  const filteredStudents = studentsInClass.filter((student) => 
    student.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (student.role && student.role.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <main className="min-h-screen font-sans text-gray-800 relative overflow-x-hidden">
      
      {/* BACKGROUND AURORA */}
      <div className="fixed inset-0 -z-50 bg-[#f8fafc]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/30 blur-[100px] animate-spin-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-200/30 blur-[100px] animate-spin-slow" />
      </div>

      {!selectedClass ? (
        // ==========================================
        //        HALAMAN DEPAN (LANDING PAGE)
        // ==========================================
        <div className="max-w-6xl mx-auto p-8 min-h-screen flex flex-col animate-fade-in">
             
             {/* ID Scroll Spy Home */}
             <div id="home-section" className="pt-10"></div>

             {/* Header Judul */}
             <div className="text-center mb-16 space-y-4 pt-10">
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
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-32 px-4">
                {classesData.map((kelas) => (
                  <div 
                    key={kelas.id}
                    onClick={() => setSelectedClass(kelas)} 
                    className="group relative h-[400px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl shadow-blue-900/20 transition-all duration-500 hover:shadow-blue-900/40 hover:-translate-y-3"
                  >
                    <img 
                        src={kelas.cover} 
                        alt={kelas.nama} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/80" />

                    <div className="absolute inset-0 p-8 flex flex-col justify-end text-white z-20">
                        <div className="self-start mb-4 overflow-hidden">
                             <span className="inline-block px-3 py-1 text-xs font-bold bg-blue-600/80 backdrop-blur-md rounded-full transform transition-transform duration-500 translate-y-10 group-hover:translate-y-0">
                                CLASS OF 2025
                             </span>
                        </div>
                        <h2 className="text-4xl font-extrabold mb-2 drop-shadow-lg transform transition-all duration-500 group-hover:-translate-y-2">
                            {kelas.nama}
                        </h2>
                        
                        <div className="transform translate-y-full transition-transform duration-500 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                            <p className="text-gray-200 text-sm mb-6 line-clamp-2 drop-shadow-md">
                                {kelas.deskripsi}
                            </p>
                            <button className="bg-white text-blue-900 px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-all hover:bg-blue-50 hover:gap-4 active:scale-95">
                                Jelajahi Album <span>→</span>
                            </button>
                        </div>
                    </div>
                  </div>
                ))}
             </div>

             {/* ID Scroll Spy Secret Wall */}
             <div id="secret-section" className="mb-24 scroll-mt-20">
                <SecretWall />
             </div>

             <Footer />
             <div className="h-32 md:h-20"></div> {/* Spacer Bottom Nav */}
        </div>
      ) : (
        
        // ==========================================
        //        HALAMAN DETAIL KELAS
        // ==========================================
        <div className="animate-slide-up pb-20">
          
          {/* Sticky Header */}
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
            
            {/* === BENTO GRID GALLERY (Collage Style) === */}
            <div className="mb-24">
               <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                 📸 Gallery of Moments
                 <span className="text-xs bg-black text-white px-3 py-1 rounded-full font-normal">
                    {dbPosts.length} Kenangan
                 </span>
               </h3>
               
               {isLoadingPosts ? (
                 <div className="w-full h-40 flex items-center justify-center text-gray-400">
                    Loading gallery...
                 </div>
               ) : dbPosts.length > 0 ? (
                 // GRID LAYOUT CONFIG
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
                    {dbPosts.map((post) => {
                        // LOGIC: Baca kolom 'type' dari Supabase
                        let spanClass = "";
                        if (post.type === 'wide') spanClass = "md:col-span-2";
                        else if (post.type === 'tall') spanClass = "md:row-span-2";
                        else if (post.type === 'big') spanClass = "md:col-span-2 md:row-span-2";
                        else spanClass = "md:col-span-1"; 

                        return (
                            <div 
                                key={post.id} 
                                className={`group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer ${spanClass}`}
                            >
                                <img 
                                    src={post.image_url} 
                                    alt="Moment" 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-white font-bold text-lg drop-shadow-md">
                                        {post.caption || ""}
                                    </p>
                                    <p className="text-white/70 text-xs uppercase tracking-widest mt-1">
                                        {new Date(post.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                 </div>
               ) : (
                 <div className="w-full text-center py-16 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl">
                    <p className="text-4xl mb-4">📷</p>
                    <p className="text-gray-500 font-medium">Belum ada momen yang diupload.</p>
                    <p className="text-xs text-gray-400 mt-2">Data diambil dari tabel 'class_posts' di Supabase.</p>
                 </div>
               )}
            </div>

            <hr className="border-gray-200 mb-12" />

            {/* === GRID SISWA === */}
            <div>
               <div className="flex justify-between items-end mb-8">
                 <h3 className="text-2xl font-bold text-gray-800">
                   Warga Kelas 
                   <span className="ml-2 text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                     {isLoadingStudents ? "..." : filteredStudents.length} Siswa
                   </span>
                 </h3>
               </div>

               {isLoadingStudents ? (
                  <div className="flex justify-center py-20">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
               ) : filteredStudents.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {filteredStudents.map((student) => (
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
                   <h3 className="text-xl font-bold text-gray-800">Waduh, kosong!</h3>
                   <p className="text-gray-500">
                     Tidak ditemukan siswa di kelas <span className="font-mono bg-gray-100 px-1">{selectedClass.id}</span>
                   </p>
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

      {/* === KOMPONEN FLOATING UTAMA === */}
      
      {/* 1. Bottom Nav (HANYA DI HOME PAGE) */}
      {!selectedClass ? (
         <BottomNav activeTab={activeTab} onNavigate={handleNavigate} />
      ) : (
         // 2. Floating Back Button (HANYA DI DETAIL KELAS)
         <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
            <button 
               onClick={handleBackToMenu}
               className="bg-white/90 backdrop-blur-md border border-gray-200 text-gray-800 px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 hover:bg-white hover:scale-105 transition-all group"
            >
               <span className="group-hover:-translate-x-1 transition-transform">←</span>
               Kembali ke Menu
            </button>
         </div>
      )}

      {/* 3. Music Player (Adaptif: Minimal saat di dalam kelas) */}
      <FloatingMusic minimal={!!selectedClass} />

    </main>
  );
}
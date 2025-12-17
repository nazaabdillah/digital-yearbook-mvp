"use client";

import React, { useState, useEffect } from 'react'; // Tambah useEffect
import studentsData from '../data/students.json';
import classesData from '../data/classes.json';
import StudentCard from '../components/StudentCard';
import StudentModal from '../components/StudentModal';
import Footer from '../components/Footer';
import secretsData from '../data/secrets.json';
import CreatePostModal from '../components/CreatePostModal'; // <--- Import Baru

export default function Home() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // STATE BARU: Untuk Mengelola Postingan
  const [showPostModal, setShowPostModal] = useState(false);
  const [classPosts, setClassPosts] = useState([]); // Menyimpan list postingan

  // EFFECT: Saat ganti kelas, load postingan dari JSON
  useEffect(() => {
    if (selectedClass) {
      setClassPosts(selectedClass.posts || []); // Ambil posts dari JSON
    }
  }, [selectedClass]);

  // LOGIC: Menambah Postingan Baru (Tanpa Refresh)
  const handleNewPost = (postData) => {
    const newPostObject = {
      id: Date.now(), // ID unik pakai waktu sekarang
      author: "Kamu (Guest)", // Ceritanya user yang login
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Guest",
      image: postData.image,
      caption: postData.caption,
      date: postData.date
    };

    // Update state: Postingan baru ditaruh paling atas (...)
    setClassPosts([newPostObject, ...classPosts]);
    setShowPostModal(false); // Tutup modal
  };

  const handleBackToMenu = () => {
    setSelectedClass(null);
    setSearchQuery("");
  };

  // Filter logic (Sama seperti sebelumnya)
  const studentsInClass = selectedClass 
    ? studentsData.filter(s => s.kelasId === selectedClass.id)
    : [];
  const filteredStudents = studentsInClass.filter((student) => 
    student.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      
      {!selectedClass ? (
        // === TAMPILAN MENU KELAS (Copy dari kode sebelumnya) ===
        <div className="max-w-6xl mx-auto p-8 min-h-screen flex flex-col justify-center">
             {/* ... (Kode Menu Kelas Biarkan Sama) ... */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {classesData.map((kelas) => (
              <div 
                key={kelas.id}
                onClick={() => setSelectedClass(kelas)} 
                className="group cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className="h-48 overflow-hidden relative">
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all z-10"/>
                   <img src={kelas.cover} alt={kelas.nama} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-8 text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{kelas.nama}</h2>
                  <p className="text-gray-500">{kelas.deskripsi}</p>
                  <button className="mt-4 text-blue-600 font-bold group-hover:underline">Buka Galeri &rarr;</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        
        // === TAMPILAN DETAIL KELAS ===
        <div className="p-4 md:p-8"> {/* Padding responsif */}
          
          {/* Header & Navigasi */}
          <div className="max-w-4xl mx-auto mb-8">
            <button onClick={handleBackToMenu} className="text-gray-500 hover:text-blue-600 font-bold mb-4">
              &larr; Kembali
            </button>
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900">{selectedClass.nama}</h1>
          </div>

          {/* === BAGIAN 1: FEED / POSTINGAN (FITUR BARU) === */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Timeline Kelas 📢</h3>
                <p className="text-gray-500 text-sm">Update seru dari warga kelas</p>
              </div>
              {/* <button 
                onClick={() => setShowPostModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow-lg hover:bg-blue-700 active:scale-95 transition-all text-sm flex items-center gap-2"
              >
                <span>+</span> Buat Post
              </button> */}
            </div>

            {/* List Postingan (Vertical Feed ala Instagram) */}
            <div className="space-y-6">
              {classPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Post Header */}
                  <div className="p-4 flex items-center gap-3">
                    <img src={post.avatar || "/images/budi.jpg"} className="w-10 h-10 rounded-full bg-gray-200" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{post.author}</p>
                      <p className="text-gray-400 text-xs">{post.date}</p>
                    </div>
                  </div>
                  
                  {/* Post Image */}
                  <img src={post.image} className="w-full h-auto object-cover max-h-96 bg-gray-100" />
                  
                  {/* Post Caption */}
                  <div className="p-4">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      <span className="font-bold mr-2">{post.author}</span>
                      {post.caption}
                    </p>
                  </div>
                </div>
              ))}

              {classPosts.length === 0 && (
                <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
                  <p className="text-gray-400">Belum ada postingan. Jadilah yang pertama!</p>
                </div>
              )}
            </div>
          </div>
          {/* === BATAS BAGIAN FEED === */}

          <hr className="border-gray-200 my-12 max-w-4xl mx-auto" />

          {/* === BAGIAN 2: DAFTAR SISWA (Seperti Sebelumnya) === */}
          <div className="max-w-6xl mx-auto">
             <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Daftar Warga Kelas 🎓</h3>
             
             {/* Search Bar */}
             <div className="mb-8 flex justify-center">
                <input 
                  type="text"
                  placeholder="Cari teman..."
                  className="w-full max-w-md p-3 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-center"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>

             {/* Grid Siswa */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          </div>
          <div className="mt-20 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">💌 Kotak Surat Rahasia</h2>
              <p className="text-gray-500">Pesan-pesan misterius dari warga angkatan.</p>
            </div>

            {/* Grid Kartu Pesan (Masonry Style Simpel) */}
            <div className="columns-1 md:columns-3 gap-6 space-y-6">
              {/* Import secretsData di paling atas dulu ya! */}
              {secretsData.map((secret) => (
                <div key={secret.id} className={`break-inside-avoid p-6 rounded-xl shadow-sm border border-gray-100 ${secret.color} hover:scale-105 transition-transform duration-300`}>
                  <p className="text-gray-700 font-handwriting text-lg leading-relaxed">
                    "{secret.message}"
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Anonymous</span>
                    <span className="text-lg">🤫</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Tombol Kirim Pesan (Fake Action) */}
            <div className="mt-10 text-center">
              <button 
                onClick={() => alert("Fitur Kirim Pesan sedang dimatikan sementara untuk moderasi konten! \n(Ini cuma simulasi keamanan ya Bos! 😉)")}
                className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gray-800 transition-all active:scale-95"
              >
                + Kirim Pesan Rahasia
              </button>
              <p className="text-xs text-gray-400 mt-3">*Pesan akan direview admin sebelum tampil.</p>
            </div>
          </div>

          <Footer />

          {/* Render Modal Post (Jika showPostModal true) */}
          {showPostModal && (
            <CreatePostModal 
              onClose={() => setShowPostModal(false)}
              onSubmit={handleNewPost}
            />
          )}

          {/* Render Modal Siswa */}
          {selectedStudent && (
            <StudentModal 
              student={selectedStudent} 
              onClose={() => setSelectedStudent(null)} 
            />
          )}

        </div>
      )}
    </main>
  );
}
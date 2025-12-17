import React from 'react';

interface StudentProps {
  nama: string;
  nim: string;
  quote: string;
  foto: string;
  role: string; // <--- 1. Tambah tipe data role
  onClick: () => void;
}

export default function StudentCard({ nama, nim, quote, foto, role, onClick }: StudentProps) {
  
  // 2. LOGIKA WARNA (Conditional Styling)
  // Fungsi ini menentukan warna badge berdasarkan role
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Programmer':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Designer':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'Hustler': // Anak Bisnis/Bendahara
        return 'bg-green-100 text-green-800 border-green-200';
      default: // Default (Gamer, dll)
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div 
      className="w-full bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 flex flex-col items-center text-center cursor-pointer hover:scale-105 relative overflow-hidden"
      onClick={onClick}
    >
      
      {/* 3. Tampilkan Badge Role */}
      {/* Kita panggil fungsi getRoleColor di dalam className */}
      <span className={`text-xs font-bold px-3 py-1 rounded-full border mb-4 ${getRoleColor(role)}`}>
        {role}
      </span>

      <img 
        src={foto} 
        alt={nama} 
        className="w-24 h-24 rounded-full mb-4 bg-gray-50 object-cover border-2 border-gray-200"
      />

      <h2 className="text-lg font-bold text-gray-800">{nama}</h2>
      <p className="text-sm text-gray-500 font-medium mb-3">{nim}</p>

      <blockquote className="text-gray-500 text-sm italic line-clamp-2">
        "{quote}"
      </blockquote>
      
    </div>
  );
}
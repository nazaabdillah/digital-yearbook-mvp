import React from 'react';
import Tilt from 'react-parallax-tilt'; // <--- Import Library

interface StudentProps {
  nama: string;
  nim: string;
  quote: string;
  foto: string;
  role: string;
  onClick: () => void;
}

export default function StudentCard({ nama, nim, quote, foto, role, onClick }: StudentProps) {
  
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Programmer': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Designer': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'Hustler': return 'bg-green-100 text-green-800 border-green-200';
      case 'Gamer': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    // Bungkus div utama dengan <Tilt>
    // glareEnable={true} memberikan efek kilau cahaya (shiny)
    <Tilt glareEnable={true} glareMaxOpacity={0.3} scale={1.05} transitionSpeed={2000}>
      <div 
        className="w-full h-full bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 flex flex-col items-center text-center cursor-pointer relative overflow-hidden group"
        onClick={onClick}
      >
        {/* Hiasan Background Abstrak */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-gray-50 to-transparent -z-10" />

        <span className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full border mb-4 ${getRoleColor(role)}`}>
          {role}
        </span>

        {/* Foto dengan Border Gradient */}
        <div className="p-1 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400 mb-4 group-hover:rotate-6 transition-transform duration-500">
             <img 
            src={foto} 
            alt={nama} 
            className="w-24 h-24 rounded-full bg-white object-cover border-2 border-white"
            />
        </div>

        <h2 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{nama}</h2>
        <p className="text-xs text-gray-400 font-medium mb-4 font-mono">{nim}</p>

        <blockquote className="text-gray-500 text-sm italic line-clamp-3 relative">
          <span className="text-2xl text-gray-200 absolute -top-2 -left-2">"</span>
          {quote}
          <span className="text-2xl text-gray-200 absolute -bottom-4 -right-2">"</span>
        </blockquote>
        
      </div>
    </Tilt>
  );
}
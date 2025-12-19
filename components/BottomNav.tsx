import React from 'react';

type NavItem = 'home' | 'secrets' | 'gallery';

interface BottomNavProps {
  activeTab: NavItem;
  onNavigate: (tab: NavItem) => void;
}

export default function BottomNav({ activeTab, onNavigate }: BottomNavProps) {
  
  const navItems = [
    { id: 'home', label: 'Home', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    )},
    { id: 'secrets', label: 'Secrets', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    )},
    { id: 'gallery', label: 'Gallery', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
    )},
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-full px-2 py-2 ring-1 ring-black/5">
        
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as NavItem)}
              className={`
                relative flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300
                ${isActive ? 'bg-black text-white shadow-lg scale-105' : 'text-gray-500 hover:bg-gray-100'}
              `}
            >
              {/* Icon */}
              <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
                {item.icon}
              </span>
              
              {/* Label (Hanya muncul kalau aktif biar hemat tempat di HP) */}
              {isActive && (
                <span className="text-sm font-bold animate-fade-in whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}

      </div>
    </div>
  );
}
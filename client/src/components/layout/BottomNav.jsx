import React from 'react';
import { Home, BookOpen, User } from 'lucide-react';

const BottomNav = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'events', label: 'Program', icon: BookOpen },
    { id: 'dashboard', label: 'Akun', icon: User },
  ];

  return (
    // 'md:hidden' = Hilang di Desktop (Medium screen ke atas)
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50 safe-area-bottom shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => (
        <button 
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex flex-col items-center gap-1 transition-colors duration-200 ${
            activeTab === item.id ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <item.icon size={24} strokeWidth={activeTab === item.id ? 2.5 : 2} />
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNav;
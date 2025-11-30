import React from 'react';
import { Award, User, Search } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const Home = ({ setActiveTab, events }) => {
  // Pastikan events ada sebelum melakukan slice untuk menghindari error jika data belum siap
  const featuredEvents = events ? events.slice(0, 3) : [];

  return (
    <div className="pb-24 animate-fade-in">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white rounded-b-[2.5rem] shadow-xl relative overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-400 opacity-20 rounded-full -mr-10 -mt-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-10 -mb-10 blur-2xl"></div>
        
        <div className="p-6 pt-10 relative z-10">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-blue-100 text-sm">Selamat Datang,</p>
              <h1 className="text-2xl font-bold">Pejuang Karir 👋</h1>
            </div>
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              <User size={20} />
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2 leading-tight">
              Masa Depan <br/> 
              <span className="text-yellow-400">Dimulai Disini.</span>
            </h2>
            <p className="text-blue-100 text-sm max-w-[80%]">
              Platform nirlaba untuk upgrade skill & karir kamu.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md p-1 rounded-xl flex items-center border border-white/20">
            <Search className="text-blue-200 ml-3" size={18} />
            <input 
              type="text" 
              placeholder="Cari Bootcamp..." 
              className="bg-transparent border-none text-white placeholder-blue-200 text-sm w-full p-2 focus:ring-0 focus:outline-none"
              onClick={() => setActiveTab('events')} // Pindah ke tab events saat diklik
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-3 px-6 -mt-8 relative z-20">
        {[
          { label: 'Event', val: '50+' },
          { label: 'Mentor', val: '20+' },
          { label: 'Alumni', val: '1k+' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-3 rounded-xl shadow-lg text-center border-b-4 border-yellow-400">
            <div className="font-bold text-blue-900 text-lg">{stat.val}</div>
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wide">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Featured Events */}
      <div className="px-6 mt-10">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-lg font-bold text-blue-900">Program Pilihan</h3>
          <button onClick={() => setActiveTab('events')} className="text-xs text-blue-600 font-bold">Lihat Semua</button>
        </div>
        
        {/* Horizontal Scroll List */}
        <div className="flex overflow-x-auto gap-4 pb-4 -mx-6 px-6 scrollbar-hide">
          {featuredEvents.map(event => (
            <div key={event.id} onClick={() => setActiveTab('events')} className="min-w-[260px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer active:scale-95 transition-transform">
              <div className="h-32 bg-gray-200 relative">
                 <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                 <div className="absolute top-2 left-2">
                   <Badge type={event.category}>{event.category}</Badge>
                 </div>
              </div>
              <div className="p-3">
                <h4 className="font-bold text-gray-800 text-sm mb-1 line-clamp-1">{event.title}</h4>
                <p className="text-xs text-gray-500">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
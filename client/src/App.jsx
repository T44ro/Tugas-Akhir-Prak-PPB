import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, User, Users, Search, Loader, Trash2, Info, HandHeart, BookOpen, 
  ArrowLeft, Calendar, Clock, MapPin, CheckCircle, Share2, Mail, Globe, Github, Heart, Briefcase
} from 'lucide-react';

// --- 1. KOMPONEN UI DASAR ---

const Button = ({ children, onClick, variant = 'primary', className = '', fullWidth = false, type = 'button' }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer";
  const variants = {
    primary: "bg-yellow-400 text-blue-900 hover:bg-yellow-300 shadow-md border border-transparent", 
    secondary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm", 
    outline: "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "bg-transparent text-gray-500 hover:bg-gray-100"
  };
  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}>
      {children}
    </button>
  );
};

const Badge = ({ children, type }) => {
  const styles = {
    'Webinar': 'bg-blue-100 text-blue-800 border border-blue-200',
    'Bootcamp': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    'Seminar': 'bg-green-100 text-green-800 border border-green-200',
    'Workshop': 'bg-purple-100 text-purple-800 border border-purple-200',
    'Project Based': 'bg-purple-100 text-purple-800 border border-purple-200',
    'Remote': 'bg-teal-100 text-teal-800 border border-teal-200'
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${styles[type] || 'bg-gray-100 text-gray-800 border border-gray-200'}`}>
      {children}
    </span>
  );
};

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Ya, Batalkan", cancelText = "Kembali" }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all scale-100">
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">{message}</p>
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-white font-medium">{cancelText}</button>
            <button onClick={onConfirm} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium shadow-md">{confirmText}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EventCard = ({ event, onRegister, isRegistered }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow h-full">
      <div className="h-40 relative group overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3"><Badge type={event.category}>{event.category}</Badge></div>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4"><span className="text-white font-bold text-xs bg-yellow-500 px-2 py-1 rounded shadow-sm">{event.price}</span></div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-900 text-lg mb-2 leading-snug line-clamp-2">{event.title}</h3>
        <div className="space-y-2 text-sm text-gray-600 mb-4 flex-grow">
          <div className="flex items-center gap-2"><Calendar size={14} className="text-blue-500"/> <span>{event.date}</span></div>
          <div className="flex items-center gap-2"><MapPin size={14} className="text-blue-500"/> <span>{event.type}</span></div>
        </div>
        {isRegistered ? <Button variant="ghost" className="bg-green-50 text-green-700 border border-green-200">✓ Terdaftar</Button> : <Button onClick={() => onRegister(event)}>Detail & Daftar</Button>}
      </div>
    </div>
  );
};

// --- 2. HALAMAN-HALAMAN ---

const Home = ({ setActiveTab, events }) => {
  // [FIX] Tambahkan pengecekan Array.isArray sebelum slice
  // Jika events null/object/undefined, gunakan array kosong agar tidak error "slice is not function"
  const safeEvents = Array.isArray(events) ? events : [];
  const featuredEvents = safeEvents.slice(0, 3);
  
  return (
    <div className="pb-24 animate-fade-in">
      <div className="bg-blue-600 text-white rounded-b-[2.5rem] shadow-xl p-6 pt-10 md:p-12 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-2">Pejuang Karir 👋</h1>
          <h2 className="text-3xl font-bold mb-6">Masa Depan <span className="text-yellow-400">Dimulai Disini.</span></h2>
          <div className="bg-white/10 p-2 rounded-xl flex items-center border border-white/20"><Search className="text-blue-200 ml-2" size={18}/><input type="text" placeholder="Cari Bootcamp..." className="bg-transparent border-none text-white placeholder-blue-200 text-sm w-full p-2 focus:outline-none" onClick={() => setActiveTab('events')} /></div>
        </div>
      </div>
      <div className="px-6 mt-8">
        <div className="flex justify-between items-end mb-4"><h3 className="text-lg font-bold text-blue-900">Program Pilihan</h3><button onClick={() => setActiveTab('events')} className="text-sm text-blue-600 font-bold">Lihat Semua</button></div>
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
          {featuredEvents.length > 0 ? (
             featuredEvents.map(event => (
              <div key={event.id} onClick={() => setActiveTab('events')} className="min-w-[260px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer">
                <div className="h-32 bg-gray-200 relative"><img src={event.image} className="w-full h-full object-cover" /><div className="absolute top-2 left-2"><Badge type={event.category}>{event.category}</Badge></div></div>
                <div className="p-3"><h4 className="font-bold text-gray-800 text-sm mb-1 line-clamp-1">{event.title}</h4><p className="text-xs text-gray-500">{event.date}</p></div>
              </div>
            ))
          ) : (
            <div className="w-full text-center p-4 text-gray-400 text-sm">Belum ada program unggulan.</div>
          )}
        </div>
      </div>
    </div>
  );
};

const EventDetail = ({ event, onBack, onRegister, isRegistered }) => {
  if (!event) return null;
  return (
    <div className="animate-fade-in pb-24 bg-white min-h-screen">
      <div className="relative h-64 md:h-80 w-full">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover"/>
        <button onClick={onBack} className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-md"><ArrowLeft size={24} className="text-gray-700" /></button>
      </div>
      <div className="p-6 -mt-6 relative bg-white rounded-t-3xl shadow-xl">
        <div className="flex justify-between items-center mb-4"><Badge type={event.category}>{event.category}</Badge><span className="text-lg font-bold text-green-600">{event.price}</span></div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{event.title}</h1>
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2 text-gray-600"><Calendar size={16} className="text-blue-600"/> {event.date}</div>
          <div className="flex items-center gap-2 text-gray-600"><Clock size={16} className="text-blue-600"/> {event.time}</div>
          <div className="col-span-2 flex items-center gap-2 text-gray-600"><MapPin size={16} className="text-blue-600"/> {event.type}</div>
        </div>
        <div className="prose text-gray-600 mb-20"><h3 className="font-bold text-gray-900 mb-2">Deskripsi</h3><p>{event.description || "Deskripsi event belum tersedia."}</p></div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t z-20 shadow-lg">
        {isRegistered ? <Button fullWidth className="bg-green-100 text-green-700 cursor-default"><CheckCircle size={18}/> Terdaftar</Button> : <Button fullWidth onClick={() => onRegister(event)}>Daftar Sekarang</Button>}
      </div>
    </div>
  );
};

const About = ({ onBack }) => (
  <div className="min-h-screen bg-gray-50 animate-fade-in pb-20">
    <div className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center gap-3"><button onClick={onBack}><ArrowLeft size={20}/></button><h1 className="font-bold text-lg">Tentang Aplikasi</h1></div>
    <div className="p-6">
      <div className="bg-white rounded-3xl p-8 shadow-sm text-center mb-6 border border-gray-100">
        <div className="w-16 h-16 bg-yellow-400 rounded-2xl mx-auto flex items-center justify-center mb-4"><Info size={32} className="text-white" /></div>
        <h2 className="text-xl font-bold text-blue-900">BinaKarier</h2>
        <p className="text-gray-500 text-xs mt-1">v1.0.0</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"><h3 className="font-bold text-gray-800 mb-2">Misi Kami</h3><p className="text-gray-600 text-sm">Mendemokratisasi akses pengembangan diri untuk seluruh anak muda Indonesia.</p></div>
    </div>
  </div>
);

const GetInvolved = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const roles = [
    { id: 1, title: 'Event Organizer', type: 'Project Based', loc: 'Hybrid', img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800', desc: 'Bantu kelola event bulanan.' },
    { id: 2, title: 'Social Media Specialist', type: 'Remote', loc: 'Online', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800', desc: 'Kelola konten Instagram & LinkedIn.' },
    { id: 3, title: 'Community Manager', type: 'Remote', loc: 'Online', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800', desc: 'Moderasi grup komunitas.' }
  ];

  if (selectedRole) {
    return (
      <div className="animate-fade-in pb-24 bg-white min-h-screen">
        <div className="relative h-64 w-full"><img src={selectedRole.img} className="w-full h-full object-cover"/><button onClick={() => setSelectedRole(null)} className="absolute top-4 left-4 p-2 bg-white/20 rounded-full text-white"><ArrowLeft size={24} /></button><div className="absolute bottom-0 left-0 p-6 text-white w-full"><span className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-xs font-bold uppercase mb-2 inline-block">{selectedRole.type}</span><h1 className="text-2xl font-bold">{selectedRole.title}</h1></div></div>
        <div className="p-6"><h3 className="font-bold text-lg mb-2">Deskripsi</h3><p className="text-gray-600">{selectedRole.desc}</p></div>
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t z-20"><div className="md:max-w-4xl md:mx-auto"><Button fullWidth onClick={() => window.open('https://forms.google.com', '_blank')}>Daftar Volunteer</Button></div></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in min-h-screen bg-gray-50 pb-24 md:p-8">
      <div className="bg-white p-6 mb-6 shadow-sm"><h1 className="text-2xl font-bold text-blue-900 mb-2">Mari Berkontribusi 🤝</h1><p className="text-gray-600 text-sm">Bergabunglah dengan gerakan kami.</p></div>
      <div className="px-6 mb-10"><h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Users className="text-blue-600"/> Lowongan Volunteer</h2><div className="grid gap-4">{roles.map(role => (<div key={role.id} onClick={() => setSelectedRole(role)} className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer"><div className="h-32 bg-gray-200 relative"><img src={role.img} className="w-full h-full object-cover"/><div className="absolute top-3 left-3"><Badge type={role.type}>{role.type}</Badge></div></div><div className="p-4"><h3 className="font-bold text-gray-900">{role.title}</h3><p className="text-sm text-gray-500 mt-1"><Users size={14} className="inline mr-1"/> {role.loc}</p></div></div>))}</div></div>
      <div className="px-6"><div className="bg-blue-900 rounded-2xl p-6 text-white"><h2 className="font-bold mb-2 flex items-center gap-2"><Briefcase className="text-yellow-400"/> Kolaborasi</h2><p className="text-blue-100 text-sm mb-4">Ingin bermitra dengan kami?</p><button className="bg-white text-blue-900 px-4 py-2 rounded-lg font-bold text-sm w-full">Hubungi Kami</button></div></div>
    </div>
  );
};

// --- 3. MAIN APP ---

// Mock Data Service (Simulasi - Fallback)
const MOCK_EVENTS = [
  { id: '1', title: 'Webinar Personal Branding', category: 'Webinar', date: '12 Okt 2025', time: '19:00 WIB', type: 'Online', price: 'Gratis', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800', description: 'Pelajari cara membangun brand diri.' },
  { id: '2', title: 'Bootcamp Fullstack Dev', category: 'Bootcamp', date: '20 Okt 2025', time: '09:00 WIB', type: 'Hybrid', price: 'Beasiswa', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800', description: 'Belajar coding dari nol sampai mahir.' },
  { id: '3', title: 'Mental Health Seminar', category: 'Seminar', date: '25 Okt 2025', time: '13:00 WIB', type: 'Online', price: 'Gratis', image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800', description: 'Menjaga kewarasan di dunia kerja.' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [myRegistrations, setMyRegistrations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idToCancel, setIdToCancel] = useState(null);

  // State untuk data dan loading
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        // Mengambil data dari Backend
        const response = await fetch(`${API_URL}/api/events`);
        
        if (!response.ok) {
          throw new Error('Gagal mengambil data');
        }

        const result = await response.json();
        
        // [FIX] Perbaikan Logika Pengambilan Data
        // Backend kamu mengirim: { success: true, data: [...] }
        if (result.success && Array.isArray(result.data)) {
           setEvents(result.data); // Ambil array di dalam properti .data
        } else if (Array.isArray(result)) {
           setEvents(result); // Fallback jika backend mengirim array langsung
        } else {
           console.error("Format data tidak dikenali:", result);
           setEvents([]); // Set kosong agar tidak error
        }

      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents(MOCK_EVENTS); 
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleRegister = (event) => {
    if (myRegistrations.find(r => r.id === event.id)) { alert('Sudah terdaftar!'); return; }
    setMyRegistrations([...myRegistrations, event]);
    alert('Berhasil mendaftar!');
  };

  const confirmUnregister = () => {
    setMyRegistrations(myRegistrations.filter(r => r.id !== idToCancel));
    setIsModalOpen(false);
  };

  const goToAbout = () => {
    setShowAbout(true);
    setSelectedEvent(null);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    setShowAbout(false);
    setSelectedEvent(null);
    window.scrollTo(0, 0);
  };

  const NavButton = ({ id, label, icon: Icon }) => (
    <button 
      onClick={() => { 
        if (id === 'about') {
          goToAbout();
        } else {
          setActiveTab(id); 
          setSelectedEvent(null); 
          setShowAbout(false); 
        }
      }} 
      className={`flex flex-col items-center gap-1 ${
        activeTab === id && !showAbout ? 'text-blue-600' : (id === 'about' && showAbout ? 'text-blue-600' : 'text-gray-400')
      }`}
    >
      <Icon size={24} strokeWidth={(activeTab === id && !showAbout) || (id === 'about' && showAbout) ? 2.5 : 2} /> 
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );

  // --- RENDER ---
  
  if (selectedEvent) return <EventDetail event={selectedEvent} onBack={goBack} onRegister={handleRegister} isRegistered={myRegistrations.some(r => r.id === selectedEvent.id)} />;
  if (showAbout) return <About onBack={goBack} />;

  // [FIX] Pastikan events selalu array sebelum difilter
  const safeEventsList = Array.isArray(events) ? events : [];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <ConfirmModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={confirmUnregister} title="Batal Daftar?" message="Yakin ingin membatalkan pendaftaran ini?" />
      
      {/* Header */}
      <div className="hidden md:flex bg-white px-8 py-4 justify-between items-center shadow-sm sticky top-0 z-50">
        <h1 className="font-bold text-blue-900 text-xl flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>BinaKarier</h1>
        <div className="flex gap-6">
          {['home', 'events', 'get-involved', 'dashboard'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`text-sm font-bold capitalize ${activeTab === tab ? 'text-blue-600' : 'text-gray-500'}`}>{tab.replace('-', ' ')}</button>
          ))}
        </div>
        <button onClick={goToAbout} className="text-gray-500 flex items-center gap-1 text-sm"><Info size={16}/> Tentang</button>
      </div>
      
      <div className="md:hidden bg-white px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-40">
        <h1 className="font-bold text-blue-900 text-lg">BinaKarier</h1>
      </div>

      {/* Main Content */}
      <main className="md:max-w-7xl md:mx-auto md:px-8 md:py-6 min-h-screen">
        {activeTab === 'home' && <Home setActiveTab={setActiveTab} events={events} />}
        
        {activeTab === 'events' && (
          <div className="p-6 md:p-0 animate-fade-in">
            <div className="mb-6"><h2 className="text-2xl font-bold text-blue-900 mb-2">Program Kami</h2><div className="relative"><input type="text" placeholder="Cari..." className="w-full pl-10 pr-4 py-3 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-blue-500 bg-white" onChange={(e) => setSearchQuery(e.target.value)} /><Search className="absolute left-3 top-3.5 text-gray-400" size={20} /></div></div>
            {loading ? <div className="flex justify-center py-20"><Loader className="animate-spin text-blue-600"/></div> : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-24">
                {safeEventsList.length > 0 ? (
                    safeEventsList.filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase())).map(event => (
                      <div key={event.id} onClick={() => { setSelectedEvent(event); window.scrollTo(0,0); }} className="cursor-pointer">
                        <EventCard event={event} onRegister={(e) => { e.stopPropagation(); handleRegister(event); }} isRegistered={myRegistrations.some(r => r.id === event.id)} />
                      </div>
                    ))
                ) : (
                    <div className="col-span-3 text-center py-10 text-gray-400">Belum ada data event.</div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'get-involved' && <GetInvolved />}

        {activeTab === 'dashboard' && (
          <div className="p-6 md:p-0 animate-fade-in">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Akun Saya</h2>
            <div className="bg-blue-600 p-6 rounded-xl text-white shadow-lg mb-8"><div className="text-4xl font-bold mb-1">{myRegistrations.length}</div><div className="text-blue-100 text-sm">Event Diikuti</div></div>
            <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Event Terdaftar</h3>
            <div className="space-y-3 pb-24">
              {myRegistrations.length === 0 ? <p className="text-gray-400 text-center py-10">Belum ada event.</p> : 
                myRegistrations.map(event => (
                  <div key={event.id} onClick={() => setSelectedEvent(event)} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-yellow-400 flex justify-between items-center cursor-pointer">
                    <div className="flex-1"><h4 className="font-bold text-gray-900">{event.title}</h4><span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">TERDAFTAR</span></div>
                    <button onClick={(e) => { e.stopPropagation(); setIdToCancel(event.id); setIsModalOpen(true); }} className="p-2 text-red-500 hover:bg-red-50 rounded-full"><Trash2 size={20} /></button>
                  </div>
                ))
              }
            </div>
          </div>
        )}
      </main>

      {/* Bottom Nav Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-2 flex justify-between z-50 shadow-lg safe-area-bottom">
        <NavButton id="home" label="Beranda" icon={Award} />
        <NavButton id="events" label="Program" icon={BookOpen} />
        <NavButton id="get-involved" label="Gabung" icon={HandHeart} />
        <NavButton id="dashboard" label="Akun" icon={User} />
        <NavButton id="about" label="About" icon={Info} />
      </div>
    </div>
  );
}
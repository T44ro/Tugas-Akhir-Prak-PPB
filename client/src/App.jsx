import React, { useState, useEffect } from 'react';
import { 
  Award, User, Users, Search, Loader, Trash2, Info, HandHeart, BookOpen, 
  ArrowLeft, Calendar, Clock, MapPin, CheckCircle, Briefcase, LogOut, ExternalLink, Plus, Pencil
} from 'lucide-react';
import Login from './Login'; 
import AddEventModal from './AddEventModal'; 
import { BASE_URL } from './config/api';

// --- 1. KOMPONEN UI DASAR ---

const Button = ({ children, onClick, variant = 'primary', className = '', fullWidth = false, type = 'button' }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer";
  const variants = {
    primary: "bg-yellow-400 text-blue-900 hover:bg-yellow-300 shadow-md/100 border border-transparent", 
    secondary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm/100", 
    outline: "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "bg-transparent text-gray-500 hover:bg-gray-100",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
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
            <button onClick={onConfirm} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium shadow-md/100">{confirmText}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EventCard = ({ event, onRegister, isRegistered, isAdmin, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm/50 border border-gray-100 overflow-hidden flex flex-col hover:shadow-md/50 transition-shadow h-full relative group">
      <div className="h-40 relative overflow-hidden">
        <img src={event.image || 'https://via.placeholder.com/400x200'} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3"><Badge type={event.category}>{event.category}</Badge></div>
        
        {isAdmin && (
           <div className="absolute top-2 right-2 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={(e) => { e.stopPropagation(); onEdit(event); }} className="bg-yellow-400 text-blue-900 p-2 rounded-full shadow-md/100 hover:bg-yellow-300 transition-colors" title="Edit Event"><Pencil size={16} /></button>
              <button onClick={(e) => { e.stopPropagation(); onDelete(e, event.id); }} className="bg-red-500 text-white p-2 rounded-full shadow-md/100 hover:bg-red-600 transition-colors" title="Hapus Event"><Trash2 size={16} /></button>
           </div>
        )}

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

const Home = ({ setActiveTab, events, user }) => {
  const safeEvents = Array.isArray(events) ? events : [];
  const featuredEvents = safeEvents.slice(0, 3);
  
  return (
    <div className="pb-24 animate-fade-in">
      <div className="bg-blue-600 text-white rounded-b-[2.5rem] shadow-xl/20 p-6 pt-10 md:p-12 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-2">Halo, {user?.name || 'Pejuang Karir'} 👋</h1>
          <h2 className="text-3xl font-bold mb-6">Langkah Kamu <span className="text-yellow-400">Dimulai Disini.</span></h2>
          <div className="bg-white/10 p-2 rounded-xl flex items-center border border-white/20"><Search className="text-blue-200 ml-2" size={18}/><input type="text" placeholder="Cari Bootcamp..." className="bg-transparent border-none text-white placeholder-blue-200 text-sm w-full p-2 focus:outline-none" onClick={() => setActiveTab('events')} /></div>
        </div>
      </div>
      <div className="px-6 mt-8">
        <div className="flex justify-between items-end mb-4"><h3 className="text-lg font-bold text-blue-900">Program Pilihan</h3><button onClick={() => setActiveTab('events')} className="text-sm text-blue-600 font-bold">Lihat Semua</button></div>
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
          {featuredEvents.length > 0 ? (
             featuredEvents.map(event => (
              <div key={event.id} onClick={() => setActiveTab('events')} className="min-w-[260px] bg-white rounded-xl shadow-sm/50 border border-blue-200 overflow-hidden cursor-pointer">
                <div className="h-32 bg-gray-200 relative"><img src={event.image || 'https://via.placeholder.com/400x200'} className="w-full h-full object-cover" /><div className="absolute top-2 left-2"><Badge type={event.category}>{event.category}</Badge></div></div>
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

  const handleRegistrationClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const registrationLink = event.link_registration || event.link_google_form;
    if (registrationLink) {
      window.open(registrationLink, '_blank');
      onRegister(event); 
    } else {
      alert("Maaf, link pendaftaran belum tersedia.");
    }
  };

  return (
    <div className="animate-fade-in pb-24 bg-white min-h-screen">
      <div className="relative h-64 md:h-80 w-full">
        <img src={event.image || 'https://via.placeholder.com/400x200'} alt={event.title} className="w-full h-full object-cover"/>
        <button onClick={onBack} className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-md/100"><ArrowLeft size={24} className="text-gray-700" /></button>
      </div>
      <div className="p-6 -mt-6 relative bg-white rounded-t-3xl shadow-xl/100">
        <div className="flex justify-between items-center mb-4"><Badge type={event.category}>{event.category}</Badge><span className="text-lg font-bold text-green-600">{event.price}</span></div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{event.title}</h1>
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2 text-gray-600"><Calendar size={16} className="text-blue-600"/> {event.date}</div>
          <div className="flex items-center gap-2 text-gray-600"><Clock size={16} className="text-blue-600"/> {event.time}</div>
          <div className="col-span-2 flex items-center gap-2 text-gray-600"><MapPin size={16} className="text-blue-600"/> {event.type}</div>
        </div>
        <div className="prose text-gray-600 mb-20"><h3 className="font-bold text-gray-900 mb-2">Deskripsi</h3><p>{event.description || "Deskripsi event belum tersedia."}</p></div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t z-20 shadow-lg/100">
        {isRegistered ? (
          <Button fullWidth className="bg-green-100 text-green-700 cursor-default"><CheckCircle size={18}/> Terdaftar</Button> 
        ) : (
          <Button fullWidth onClick={handleRegistrationClick}>
            Daftar Sekarang <ExternalLink size={16} className="ml-2 opacity-70"/>
          </Button>
        )}
      </div>
    </div>
  );
};

const About = ({ onBack }) => (
  // [MODIFIED] bg-transparent agar background doodle terlihat di bagian bawah
  <div className="min-h-screen bg-transparent animate-fade-in pb-20">
    <div className="bg-white/90 backdrop-blur-sm p-4 shadow-sm/100 sticky top-0 z-10 flex items-center gap-3"><button onClick={onBack}><ArrowLeft size={20}/></button><h1 className="font-bold text-lg">Tentang Aplikasi</h1></div>
    <div className="p-6">
      <div className="bg-white/90 rounded-3xl p-8 shadow-sm/100 text-center mb-6 border border-gray-100">
        <div className="w-16 h-16 bg-yellow-400 rounded-2xl mx-auto flex items-center justify-center mb-4"><Info size={32} className="text-white" /></div>
        <h2 className="text-xl font-bold text-blue-900">FirstStep Journey</h2>
        <p className="text-gray-500 text-xs mt-1">v1.0.0</p>
      </div>
      <div className="bg-white/90 p-6 rounded-2xl shadow-sm/100 border border-gray-100"><h3 className="font-bold text-gray-800 mb-2">Misi Kami</h3><p className="text-gray-600 text-sm">Mendemokratisasi akses pengembangan diri untuk seluruh anak muda Indonesia.</p></div>
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
    // [MODIFIED] Transparan agar doodle terlihat
    <div className="animate-fade-in min-h-screen bg-transparent pb-24 md:p-8">
      <div className="bg-transparent p-6 mb-6"><h1 className="text-2xl font-bold text-blue-900 mb-2">Mari Berkontribusi 🤝</h1><p className="text-gray-600 text-sm">Bergabunglah dengan gerakan kami.</p></div>
      <div className="px-6 mb-10"><h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Users className="text-blue-600"/> Lowongan Volunteer</h2><div className="grid gap-4">{roles.map(role => (<div key={role.id} onClick={() => setSelectedRole(role)} className="bg-white rounded-xl shadow-sm/100 overflow-hidden cursor-pointer"><div className="h-32 bg-gray-200 relative"><img src={role.img} className="w-full h-full object-cover"/><div className="absolute top-3 left-3"><Badge type={role.type}>{role.type}</Badge></div></div><div className="p-4"><h3 className="font-bold text-gray-900">{role.title}</h3><p className="text-sm text-gray-500 mt-1"><Users size={14} className="inline mr-1"/> {role.loc}</p></div></div>))}</div></div>
      <div className="px-6"><div className="bg-blue-900 rounded-2xl p-6 text-white"><h2 className="font-bold mb-2 flex items-center gap-2"><Briefcase className="text-yellow-400"/> Kolaborasi</h2><p className="text-blue-100 text-sm mb-4">Ingin bermitra dengan kami?</p><button className="bg-white text-blue-900 px-4 py-2 rounded-lg font-bold text-sm w-full">Hubungi Kami</button></div></div>
    </div>
  );
};

// --- 3. MAIN APP ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [myRegistrations, setMyRegistrations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idToCancel, setIdToCancel] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://tugas-akhir-prak-ppb-lknt.vercel.app/';
  const userRole = (user?.role || '').toLowerCase().trim();
  const isAdmin = userRole === 'admin' || (user?.email === 'admin@test.com');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchMyRegistrations(parsedUser.id);
    }
  }, []);

  const fetchMyRegistrations = async (userId) => {
    try {
      const res = await fetch(`${API_URL}/api/registrations/${userId}`);
      const result = await res.json();
      if (result.success) setMyRegistrations(result.data);
    } catch (error) { console.error("Gagal load registrasi:", error); }
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/events`);
      if (!response.ok) throw new Error('Gagal mengambil data');
      const result = await response.json();
      if (result.success && Array.isArray(result.data)) setEvents(result.data); 
      else if (Array.isArray(result)) setEvents(result); 
      else setEvents([]); 
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]); 
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleRegister = async (event) => {
    if (!user) { alert('Silakan login dulu!'); return; }
    if (myRegistrations.find(r => r.id === event.id)) { return; }

    try {
      setMyRegistrations((prev) => [...prev, event]);
      const res = await fetch(`${API_URL}/api/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, event_id: event.id })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
    } catch (error) {
      console.error("Gagal simpan ke DB:", error);
      setMyRegistrations((prev) => prev.filter(r => r.id !== event.id));
    }
  };

  const confirmUnregister = async () => {
    try {
        const res = await fetch(`${API_URL}/api/registrations`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: user.id, event_id: idToCancel })
        });
        const result = await res.json();
        if(!res.ok) throw new Error(result.message);
        setMyRegistrations(myRegistrations.filter(r => r.id !== idToCancel));
        setIsModalOpen(false);
    } catch (error) { alert("Gagal membatalkan: " + error.message); }
  };

  const handleDeleteEvent = async (e, eventId) => {
    e.stopPropagation(); 
    if (!confirm("Yakin ingin menghapus event ini secara permanen dari Database?")) return;
    try {
      const res = await fetch(`${API_URL}/api/events/${eventId}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.success) { alert("Event berhasil dihapus!"); fetchEvents(); } 
      else { throw new Error(result.message); }
    } catch (err) { alert("Gagal hapus: " + err.message); }
  };

  const handleLogout = () => { localStorage.removeItem('user'); setUser(null); setMyRegistrations([]); };
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setMyRegistrations([]); 
    fetchMyRegistrations(userData.id);
  };

  const goToAbout = () => { setShowAbout(true); setSelectedEvent(null); window.scrollTo(0, 0); };
  const goBack = () => { setShowAbout(false); setSelectedEvent(null); window.scrollTo(0, 0); };
  const handleOpenAddModal = () => { setEventToEdit(null); setIsAddModalOpen(true); };
  const handleOpenEditModal = (event) => { setEventToEdit(event); setIsAddModalOpen(true); };

  const NavButton = ({ id, label, icon: Icon }) => (
    <button 
      onClick={() => { 
        if (id === 'about') { goToAbout(); } 
        else { setActiveTab(id); setSelectedEvent(null); setShowAbout(false); }
      }} 
      className={`flex flex-col items-center gap-1 ${activeTab === id && !showAbout ? 'text-blue-600' : (id === 'about' && showAbout ? 'text-blue-600' : 'text-gray-400')}`}
    >
      <Icon size={24} strokeWidth={(activeTab === id && !showAbout) || (id === 'about' && showAbout) ? 2.5 : 2} /> 
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );

  if (!user) return <Login onLogin={handleLogin} />;
  if (selectedEvent) return <EventDetail event={selectedEvent} onBack={goBack} onRegister={handleRegister} isRegistered={myRegistrations.some(r => r.id === selectedEvent.id)} />;
  if (showAbout) return <About onBack={goBack} />;

  const safeEventsList = Array.isArray(events) ? events : [];

  return (
    // [UPDATE] Container utama dengan background putih, namun footer doodle di layer bawah
    <div className="min-h-screen font-sans relative bg-transparent">
      
      {/* 1. BACKGROUND DOODLE STATIS DI FOOTER */}
      <div className="footer-doodle-bg"></div>

      <ConfirmModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={confirmUnregister} title="Batal Daftar?" message="Yakin ingin membatalkan pendaftaran ini?" />
      
      {isAdmin && isAddModalOpen && (
        <AddEventModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onEventAdded={fetchEvents} eventToEdit={eventToEdit} />
      )}

      {/* Header dengan efek backdrop blur */}
      <div className="hidden md:flex bg-white backdrop-blur-sm px-8 py-3 justify-between items-center shadow-sm sticky top-0 z-50">
        <div className="font-bold text-yellow-500 text-xl flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
             <img src="/logo.png" alt="FirstStep Journey" className="h-12 w-auto object-contain" />
             <span>FirstStep Journey</span>
        </div>
        <div className="flex gap-6">
          {['home', 'events', 'get-involved', 'dashboard'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`text-sm font-bold capitalize ${activeTab === tab ? 'text-blue-700' : 'text-gray-500'}`}>{tab.replace('-', ' ')}</button>
          ))}
        </div>
        <div className="flex items-center gap-4">
            <button onClick={goToAbout} className="text-white flex items-center gap-1 text-sm"><Info size={16}/> Tentang</button>
            <button onClick={handleLogout} className="text-red-600 flex items-center gap-1 text-sm font-bold bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100"><LogOut size={16}/> Keluar</button>
        </div>
      </div>
      
      <div className="md:hidden bg-white backdrop-blur-sm px-6 py-3 flex justify-between items-center shadow-sm sticky top-0 z-40">
        <div className="font-bold text-yellow-500 text-lg flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
            <span>FirstStep Journey</span>
        </div>
        <button onClick={handleLogout} className="text-red-500"><LogOut size={20}/></button>
      </div>

      {/* Main Content dengan background transparan agar footer doodle terlihat */}
      <main className="md:max-w-7xl md:mx-auto md:px-8 md:py-6 min-h-screen relative z-10">
        {activeTab === 'home' && <Home setActiveTab={setActiveTab} events={events} user={user} />}
        
        {activeTab === 'events' && (
          <div className="p-6 md:p-0 animate-fade-in">
            <div className="mb-6 flex justify-between items-end">
                <div className="flex-1 mr-4">
                    <h2 className="text-2xl font-bold text-blue-900 mb-2">Program Kami</h2>
                    <div className="relative"><input type="text" placeholder="Cari..." className="w-full pl-10 pr-4 py-3 rounded-xl border-none shadow-sm/100 focus:ring-2 focus:ring-blue-500 bg-white" onChange={(e) => setSearchQuery(e.target.value)} /><Search className="absolute left-3 top-3.5 text-gray-400" size={20} /></div>
                </div>
                {isAdmin && (
                  <button onClick={handleOpenAddModal} className="bg-blue-600 text-white p-3 rounded-xl shadow-lg/100 hover:bg-blue-700 transition flex items-center gap-2 font-bold mb-1">
                      <Plus size={20} /> <span className="hidden md:inline">Buat Event</span>
                  </button>
                )}
            </div>

            {loading ? <div className="flex justify-center py-20"><Loader className="animate-spin text-blue-600"/></div> : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-24">
                {safeEventsList.length > 0 ? (
                    safeEventsList.filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase())).map(event => (
                      <div key={event.id} onClick={() => { setSelectedEvent(event); window.scrollTo(0,0); }} className="cursor-pointer relative group">
                        <EventCard event={event} onRegister={(e) => { e.stopPropagation(); handleRegister(event); }} isRegistered={myRegistrations.some(r => r.id === event.id)} isAdmin={isAdmin} onDelete={handleDeleteEvent} onEdit={handleOpenEditModal} />
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
            <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-bold text-blue-900">Akun Saya</h2>
                 <button onClick={handleLogout} className="md:hidden text-red-600 font-bold text-sm">Logout</button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm/100 border border-gray-100 mb-6 flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                    <h3 className="font-bold text-lg text-gray-900">{user?.name}</h3>
                    <p className="text-gray-500 text-sm">{user?.email}</p>
                </div>
            </div>

            <div className="bg-blue-600 p-6 rounded-xl text-white shadow-lg/20 mb-8"><div className="text-4xl font-bold mb-1">{myRegistrations.length}</div><div className="text-blue-100 text-sm">Event Diikuti</div></div>
            <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Event Terdaftar</h3>
            <div className="space-y-3 pb-24">
              {myRegistrations.length === 0 ? <p className="text-gray-400 text-center py-10">Belum ada event.</p> : 
                myRegistrations.map(event => (
                  <div key={event.id} onClick={() => setSelectedEvent(event)} className="bg-white p-4 rounded-xl shadow-sm/100 border-l-4 border-yellow-400 flex justify-between items-center cursor-pointer">
                    <div className="flex-1"><h4 className="font-bold text-gray-900">{event.title}</h4><span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">TERDAFTAR</span></div>
                    <button onClick={(e) => { e.stopPropagation(); setIdToCancel(event.id); setIsModalOpen(true); }} className="p-2 text-red-500 hover:bg-red-50 rounded-full"><Trash2 size={20} /></button>
                  </div>
                ))
              }
            </div>
          </div>
        )}
      </main>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-2 flex justify-between z-50 shadow-lg/100 safe-area-bottom">
        <NavButton id="home" label="Beranda" icon={Award} />
        <NavButton id="events" label="Program" icon={BookOpen} />
        <NavButton id="get-involved" label="Gabung" icon={HandHeart} />
        <NavButton id="dashboard" label="Akun" icon={User} />
        <NavButton id="about" label="About" icon={Info} />
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Award, User, Search, Loader, Trash2, Info } from 'lucide-react';

// Import Hooks & Service
import { useEvents } from './hooks/useEvents';

// Import Komponen UI
import Layout from './components/layout/Layout';
import BottomNav from './components/layout/BottomNav';
import ConfirmModal from './components/ui/ConfirmModal';
import EventCard from './components/fragments/EventCard'; 

// Import Halaman
import Home from './pages/Home';
import EventDetail from './pages/EventDetail';
import About from './pages/About';

export default function App() {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('home');
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [showAbout, setShowAbout] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data Pendaftaran (LocalStorage)
  const [myRegistrations, setMyRegistrations] = useState(() => {
    const saved = localStorage.getItem('my_registrations');
    return saved ? JSON.parse(saved) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIdToCancel, setSelectedIdToCancel] = useState(null);

  // --- EFFECT ---
  useEffect(() => {
    localStorage.setItem('my_registrations', JSON.stringify(myRegistrations));
  }, [myRegistrations]);

  // Fetch Data
  const { events, loading, error, refetch } = useEvents({
    search: searchQuery
  });

  // --- LOGIC NAVIGASI ---
  const goToDetail = (event) => {
    setSelectedEvent(event);
    window.scrollTo(0, 0);
  };

  const goToAbout = () => {
    setShowAbout(true);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (selectedEvent) setSelectedEvent(null);
    if (showAbout) setShowAbout(false);
    window.scrollTo(0, 0);
  };

  // --- LOGIC TRANSAKSI ---
  const handleRegister = (event) => {
    if (myRegistrations.find(r => r.id === event.id)) {
      alert("Anda sudah terdaftar di event ini!");
      return;
    }
    const newRegistration = { 
      ...event, 
      registeredAt: new Date().toLocaleDateString('id-ID') 
    };
    setMyRegistrations([...myRegistrations, newRegistration]);
    alert("Berhasil mendaftar!");
  };

  const initiateUnregister = (eventId) => {
    setSelectedIdToCancel(eventId);
    setIsModalOpen(true);
  };

  const confirmUnregister = () => {
    if (selectedIdToCancel) {
      setMyRegistrations(myRegistrations.filter(r => r.id !== selectedIdToCancel));
      setIsModalOpen(false);
      setSelectedIdToCancel(null);
    }
  };

  // --- RENDERING PAGE ---

  // 1. Prioritas Tertinggi: Halaman DETAIL
  if (selectedEvent) {
    return (
      <EventDetail 
        event={selectedEvent} 
        onBack={goBack} 
        onRegister={handleRegister}
        isRegistered={myRegistrations.some(r => r.id === selectedEvent.id)}
      />
    );
  }

  // 2. Prioritas Kedua: Halaman ABOUT
  if (showAbout) {
    return <About onBack={goBack} />;
  }

  // 3. Tampilan Utama (Tab Based)
  const DesktopHeader = () => (
    <div className="hidden md:flex bg-white px-8 py-4 justify-between items-center shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="flex items-center gap-8">
        <h1 className="font-bold text-blue-900 text-xl flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-blue-900"><Award size={18}/></div>
            BinaKarier
        </h1>
        <nav className="flex gap-6">
            <button onClick={() => setActiveTab('home')} className={`text-sm font-semibold transition-colors ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>Beranda</button>
            <button onClick={() => setActiveTab('events')} className={`text-sm font-semibold transition-colors ${activeTab === 'events' ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>Program</button>
            <button onClick={() => setActiveTab('dashboard')} className={`text-sm font-semibold transition-colors ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>Akun Saya</button>
        </nav>
      </div>
      <div className="flex items-center gap-3">
         <button onClick={goToAbout} className="text-gray-500 hover:text-blue-600 font-medium text-sm flex items-center gap-1">
            <Info size={18} /> Tentang
         </button>
         <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold cursor-pointer hover:bg-blue-200 transition-colors">U</div>
      </div>
    </div>
  );

  return (
    <Layout>
      <ConfirmModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmUnregister}
        title="Batalkan Pendaftaran?"
        message="Tindakan ini akan menghapus event dari daftar Anda."
      />

      <DesktopHeader />

      {activeTab !== 'home' && (
        <div className="md:hidden bg-white px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-40">
           <h1 className="font-bold text-blue-900 text-lg flex items-center gap-2">
             <div className="w-6 h-6 bg-yellow-400 rounded flex items-center justify-center text-blue-900"><Award size={14}/></div>
             BinaKarier
           </h1>
           <button onClick={goToAbout} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
             <Info size={22} />
           </button>
        </div>
      )}

      <main className="min-h-screen bg-gray-50 md:px-8 md:py-6">
        
        {/* HALAMAN 1: HOME */}
        {activeTab === 'home' && (
          <div onClick={(e) => {}}>
             <Home setActiveTab={setActiveTab} events={events} />
          </div>
        )}
        
        {/* HALAMAN 2: PROGRAM (EVENTS) */}
        {activeTab === 'events' && (
          <div className="p-6 md:p-0 animate-fade-in">
             <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <h2 className="text-2xl font-bold text-blue-900 mb-2 md:mb-0">Program Kami</h2>
                <div className="relative w-full md:w-72">
                  <input type="text" placeholder="Cari webinar..." className="w-full pl-10 pr-4 py-3 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-blue-500 bg-white" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
                </div>
             </div>

             {loading ? (
               <div className="flex flex-col items-center justify-center py-20"><Loader className="w-10 h-10 text-blue-600 animate-spin mb-4" /><p className="text-gray-500">Memuat program...</p></div>
             ) : error ? (
               <div className="text-center py-20 text-red-500"><p>Gagal memuat data</p><button onClick={refetch} className="underline">Coba Lagi</button></div>
             ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
                 {events.map(event => (
                   <div key={event.id} onClick={() => goToDetail(event)} className="cursor-pointer transition-transform hover:scale-[1.02]">
                     <EventCard 
                        event={event} 
                        onRegister={(e) => { e.stopPropagation(); handleRegister(event); }} 
                        isRegistered={myRegistrations.some(r => r.id === event.id)}
                     />
                   </div>
                 ))}
               </div>
             )}
          </div>
        )}

        {/* HALAMAN 3: AKUN SAYA (DASHBOARD) */}
        {activeTab === 'dashboard' && (
           <div className="p-6 md:p-0 animate-fade-in max-w-5xl mx-auto">
             <h2 className="text-2xl font-bold text-blue-900 mb-2">Akun Saya</h2>
             
             <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4">
                <div className="bg-blue-600 p-6 rounded-xl text-white shadow-lg col-span-2 md:col-span-1"><div className="text-4xl font-bold mb-1">{myRegistrations.length}</div><div className="text-blue-100 text-sm">Event Diikuti</div></div>
                <div className="bg-white p-6 rounded-xl text-blue-900 shadow-sm border border-blue-50 col-span-2 md:col-span-1"><div className="text-4xl font-bold mb-1">0</div><div className="text-gray-500 text-sm">Sertifikat</div></div>
             </div>
             
             <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
                <h3 className="font-bold text-gray-800 text-lg">Event Terdaftar</h3>
                <button onClick={goToAbout} className="text-sm text-blue-600 hover:underline md:hidden">Tentang App</button>
             </div>

             <div className="space-y-3 pb-24 grid md:grid-cols-2 md:space-y-0 md:gap-4">
                {myRegistrations.length === 0 ? (
                  <div className="md:col-span-2 text-center py-12 bg-white rounded-xl border border-dashed border-gray-300"><p className="text-gray-400 mb-2">Belum ada event.</p><button onClick={() => setActiveTab('events')} className="text-blue-600 font-bold hover:underline">Cari Event</button></div>
                ) : (
                  myRegistrations.map(event => (
                    <div key={event.id} onClick={() => goToDetail(event)} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-yellow-400 flex justify-between items-center cursor-pointer hover:shadow-md transition-shadow">
                       <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">{event.title}</h4>
                          <span className="inline-block mt-2 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded font-bold">TERDAFTAR</span>
                       </div>
                       <button onClick={(e) => { e.stopPropagation(); initiateUnregister(event.id); }} className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full"><Trash2 size={20} /></button>
                    </div>
                  ))
                )}
             </div>
           </div>
        )}
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </Layout>
  );
}
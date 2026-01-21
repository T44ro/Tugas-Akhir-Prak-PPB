import React, { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import Button from '../components/ui/Button'; 
import EventCard from '../components/fragments/EventCard';
import AddEventModal from '../AddEventModal'; 

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  // --- LOGIKA PENENTUAN ADMIN (SANGAT KETAT) ---
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : {};
  
  // Normalisasi data: ubah ke huruf kecil & hapus spasi
  const userRole = (user?.role || '').toLowerCase().trim();
  const userEmail = (user?.email || '').toLowerCase().trim();

  // Admin valid JIKA role adalah 'admin' ATAU email 'admin@test.com'
  const isAdmin = userRole === 'admin' || userEmail === 'admin@test.com';

  // DEBUG DI CONSOLE (Cek tab Console browser)
  console.log("=== DEBUG LOGIKA ADMIN ===");
  console.log("1. Raw User Storage:", user);
  console.log("2. Role Terbaca:", userRole);
  console.log("3. Email Terbaca:", userEmail);
  console.log("4. Status isAdmin Akhir:", isAdmin);
  console.log("==========================");

  // Fetch Events
  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API_URL}/api/events`);
      const data = await res.json();
      if (data.success) {
        setEvents(data.data);
      }
    } catch (error) {
      console.error("Gagal load events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    if(!confirm("Apakah Anda yakin ingin menghapus event ini?")) return;
    
    try {
      const res = await fetch(`${API_URL}/api/events/${id}`, { method: 'DELETE' });
      const data = await res.json();
      
      if(data.success) {
        alert("Event berhasil dihapus");
        fetchEvents(); 
      } else {
        alert("Gagal menghapus: " + data.message);
      }
    } catch(err) {
      console.error(err);
      alert("Terjadi kesalahan server");
    }
  };

  return (
    <div className="pb-24 pt-6 px-6 min-h-screen bg-gray-50">
      
      {/* --- DEBUG BANNER (Hanya muncul untuk memastikan status Anda) --- */}
      <div className={`mb-6 p-4 rounded-lg text-sm border-l-4 ${isAdmin ? 'bg-red-50 border-red-500 text-red-700' : 'bg-green-50 border-green-500 text-green-700'}`}>
        <p className="font-bold uppercase tracking-wide">Status Akun: {isAdmin ? 'ADMIN MODE' : 'USER MODE'}</p>
        <p className="font-mono text-xs mt-1">Logged in as: {userEmail || 'Guest'} (Role: {userRole || '-'})</p>
        <p className="text-xs mt-2 italic opacity-80">
            {isAdmin 
                ? "Anda melihat tombol Tambah & Hapus karena sistem mendeteksi Anda sebagai Admin." 
                : "Tombol Tambah & Hapus DISEMBUNYIKAN karena Anda bukan Admin."}
        </p>
      </div>
      {/* ---------------------------------------------------------------- */}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-900">Jelajahi Event</h2>
        
        {/* LOGIKA TOMBOL TAMBAH */}
        {isAdmin && (
          <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
            <Plus size={18} /> Tambah Event
          </Button>
        )}
      </div>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <input 
          type="text" 
          placeholder="Cari webinar, bootcamp..." 
          className="w-full pl-10 pr-4 py-3 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-blue-500 bg-white"
        />
        <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
      </div>

      {loading ? (
        <p className="text-center py-10 text-gray-500">Memuat event...</p>
      ) : (
        <div className="space-y-4">
          {events.map(event => (
            <EventCard 
              key={event.id} 
              event={event}
              isAdmin={isAdmin}    // PENTING: Oper status admin
              onDelete={handleDelete}
              onRegister={() => alert("Fitur daftar belum diimplementasikan")} 
              isRegistered={false}
            />
          ))}
        </div>
      )}

      {/* Modal hanya dirender jika Admin */}
      {isAdmin && isModalOpen && (
        <AddEventModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={() => { setIsModalOpen(false); fetchEvents(); }}
        />
      )}
    </div>
  );
};

export default Events;
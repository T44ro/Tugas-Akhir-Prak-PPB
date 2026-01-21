import React, { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react'; // Import icon Plus
import Button from '../components/ui/Button'; 
import EventCard from '../components/fragments/EventCard';
import AddEventModal from '../AddEventModal'; // Pastikan path ini benar

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  // 1. Ambil User dari LocalStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  // 2. Cek apakah Admin (berdasarkan role dari backend atau email khusus)
  const isAdmin = user?.role === 'admin' || user?.email === 'admin@test.com';

  // 3. Fetch Data dari API
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

  // 4. Handle Delete
  const handleDelete = async (id) => {
    if(!confirm("Yakin hapus event ini?")) return;
    
    try {
      const res = await fetch(`${API_URL}/api/events/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if(data.success) {
        alert("Event dihapus");
        fetchEvents(); // Refresh list
      }
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div className="pb-24 pt-6 px-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-900">Jelajahi Event</h2>
        
        {/* LOGIKA: Tombol hanya muncul jika isAdmin = true */}
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
        <p className="text-center py-10">Memuat event...</p>
      ) : (
        <div className="space-y-4">
          {events.map(event => (
            <EventCard 
              key={event.id} 
              event={event}
              isAdmin={isAdmin}    // Oper status admin ke Card
              onDelete={handleDelete} // Oper fungsi hapus ke Card
              // Placeholder register
              onRegister={() => console.log("Daftar")} 
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
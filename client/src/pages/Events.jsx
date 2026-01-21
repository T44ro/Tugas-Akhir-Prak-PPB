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

  // 1. Ambil User
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  // 2. Logic Admin
  const isAdmin = user?.role === 'admin' || user?.email === 'admin@test.com';

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API_URL}/api/events`);
      const data = await res.json();
      if (data.success) setEvents(data.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if(!confirm("Hapus event?")) return;
    try {
      await fetch(`${API_URL}/api/events/${id}`, { method: 'DELETE' });
      fetchEvents();
    } catch(err) { console.error(err); }
  };

  return (
    <div className="pb-24 pt-6 px-6 min-h-screen bg-gray-50">
      
      {/* --- KOTAK DEBUG (HAPUS NANTI JIKA SUDAH FIX) --- */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 text-xs font-mono">
        <p><strong>DEBUG INFO:</strong></p>
        <p>Email: {user.email || 'Belum Login'}</p>
        <p>Role dari DB: {String(user.role)}</p>
        <p>Status Admin: {isAdmin ? "TRUE (Admin)" : "FALSE (User Biasa)"}</p>
      </div>
      {/* ------------------------------------------------ */}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-900">Jelajahi Event</h2>
        {isAdmin && (
          <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
            <Plus size={18} /> Tambah Event
          </Button>
        )}
      </div>
      
      {/* Search ... */}
      <div className="relative mb-6">
        <input type="text" placeholder="Cari..." className="w-full pl-10 pr-4 py-3 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-blue-500 bg-white"/>
        <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="space-y-4">
          {events.map(event => (
            <EventCard 
              key={event.id} 
              event={event}
              isAdmin={isAdmin} // PENTING
              onDelete={handleDelete}
              onRegister={() => {}} 
              isRegistered={false}
            />
          ))}
        </div>
      )}

      {isAdmin && isModalOpen && (
        <AddEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={() => { setIsModalOpen(false); fetchEvents(); }} />
      )}
    </div>
  );
};

export default Events;
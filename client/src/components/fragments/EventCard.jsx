import React from 'react';
import { Calendar, Clock, MapPin, Trash2 } from 'lucide-react'; // Import Trash2
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const EventCard = ({ event, onRegister, isRegistered, isAdmin, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col relative">
      
      {/* TOMBOL HAPUS: Hanya muncul jika isAdmin true */}
      {isAdmin && (
        <button 
          onClick={() => onDelete(event.id)}
          className="absolute top-2 right-2 z-10 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition"
        >
          <Trash2 size={16} />
        </button>
      )}

      <div className="h-40 relative group">
        {/* Fallback image jika event.image null */}
        <img 
          src={event.image || "https://via.placeholder.com/400x200"} 
          alt={event.title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-3 left-3">
            <Badge type={event.category}>{event.category}</Badge>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-900 text-lg mb-2">{event.title}</h3>
        
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-blue-500"/> 
            <span>{event.date}</span>
          </div>
          {/* Tambahkan info lain jika ada di database, misal event.time */}
        </div>
        
        {isRegistered ? (
          <Button fullWidth variant="ghost" className="bg-green-50 text-green-700">✓ Terdaftar</Button>
        ) : (
          <Button fullWidth variant="primary" onClick={() => onRegister(event)}>Daftar Sekarang</Button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
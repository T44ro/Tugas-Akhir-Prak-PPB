import React from 'react';
import { Calendar, Clock, MapPin, Trash2 } from 'lucide-react'; // Pastikan Trash2 diimport
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const EventCard = ({ event, onRegister, isRegistered, isAdmin, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col relative group-card">
      
      {/* LOGIKA TOMBOL HAPUS: Hanya render jika isAdmin === true */}
      {isAdmin && (
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Mencegah klik tembus ke card
            onDelete(event.id);
          }}
          className="absolute top-2 right-2 z-20 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-all transform hover:scale-110"
          title="Hapus Event (Admin Only)"
        >
          <Trash2 size={16} />
        </button>
      )}

      <div className="h-40 relative group">
        <img 
          src={event.image || "https://via.placeholder.com/400x200"} 
          alt={event.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-3 left-3">
            <Badge type={event.category}>{event.category}</Badge>
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
          <span className="text-white font-bold text-xs bg-yellow-500 px-2 py-1 rounded shadow-sm">
            {event.price || 'Gratis'}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-900 text-lg mb-2 leading-snug line-clamp-2">{event.title}</h3>
        
        <div className="space-y-2 text-sm text-gray-600 mb-4 flex-grow">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-blue-500"/> 
            <span>{event.date}</span>
          </div>
          {event.time && (
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-blue-500"/> 
              <span>{event.time}</span>
            </div>
          )}
          {event.type && (
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-blue-500"/> 
              <span>{event.type}</span>
            </div>
          )}
        </div>
        
        {isRegistered ? (
          <Button fullWidth variant="ghost" className="bg-green-50 text-green-700 cursor-default">
            ✓ Terdaftar
          </Button>
        ) : (
          <Button fullWidth variant="primary" onClick={() => onRegister(event)}>
            Daftar Sekarang
          </Button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
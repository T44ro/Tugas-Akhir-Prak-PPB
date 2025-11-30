import React from 'react';
import { Search, Calendar, Clock, MapPin } from 'lucide-react';
// Pastikan path import komponen UI Anda benar
import Button from '../components/ui/Button'; 
import Badge from '../components/ui/Badge';

const Events = () => {
  // Data Dummy Event
  const events = [
    {
        id: 1,
        title: 'Webinar Personal Branding',
        category: 'Webinar',
        date: '12 Okt',
        price: 'Gratis',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 2,
        title: 'Bootcamp Fullstack React',
        category: 'Bootcamp',
        date: '20 Okt',
        price: 'Beasiswa',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="pb-24 pt-6 px-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Jelajahi Event</h2>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <input 
          type="text" 
          placeholder="Cari webinar, bootcamp..." 
          className="w-full pl-10 pr-4 py-3 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-blue-500 bg-white"
        />
        <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
      </div>

      <div className="space-y-4">
        {events.map(event => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="h-40 relative">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                   <Badge type={event.category}>{event.category}</Badge>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-lg mb-2">{event.title}</h3>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500">{event.date}</span>
                    <Button variant="primary">Detail</Button>
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Events; // <--- INI PENTING
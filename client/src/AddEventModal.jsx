import React, { useState } from 'react';
import { X, Save, Loader } from 'lucide-react';

export default function AddEventModal({ isOpen, onClose, onEventAdded }) {
  const [loading, setLoading] = useState(false);
  // State untuk form data sesuai kolom database
  const [formData, setFormData] = useState({
    title: '',
    category: 'Webinar',
    date: '',
    time: '',
    type: 'Online',
    price: 'Gratis',
    image: '',
    description: '',
    link_registration: ''
  });

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      alert('Event berhasil ditambahkan!');
      onEventAdded(); // Refresh list event di App.jsx
      onClose(); // Tutup modal
      
      // Reset form
      setFormData({
        title: '', category: 'Webinar', date: '', time: '', type: 'Online', 
        price: 'Gratis', image: '', description: '', link_registration: ''
      });

    } catch (error) {
      alert("Gagal menambah event: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-800">Tambah Event Baru</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X size={20}/></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Judul Event</label>
            <input type="text" name="title" required className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" value={formData.title} onChange={handleChange} placeholder="Contoh: Webinar React JS" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Kategori</label>
              <select name="category" className="w-full p-3 border rounded-xl" value={formData.category} onChange={handleChange}>
                <option>Webinar</option><option>Bootcamp</option><option>Seminar</option><option>Workshop</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Tipe</label>
              <select name="type" className="w-full p-3 border rounded-xl" value={formData.type} onChange={handleChange}>
                <option>Online</option><option>Offline</option><option>Hybrid</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Tanggal</label>
              <input type="text" name="date" required className="w-full p-3 border rounded-xl" value={formData.date} onChange={handleChange} placeholder="12 Okt 2025" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Waktu</label>
              <input type="text" name="time" required className="w-full p-3 border rounded-xl" value={formData.time} onChange={handleChange} placeholder="19:00 WIB" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Harga</label>
            <input type="text" name="price" className="w-full p-3 border rounded-xl" value={formData.price} onChange={handleChange} placeholder="Gratis / Rp 50.000" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Link Gambar (URL)</label>
            <input type="text" name="image" required className="w-full p-3 border rounded-xl" value={formData.image} onChange={handleChange} placeholder="https://..." />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Link Pendaftaran (G-Form)</label>
            <input type="text" name="link_registration" className="w-full p-3 border rounded-xl" value={formData.link_registration} onChange={handleChange} placeholder="https://forms.google..." />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi</label>
            <textarea name="description" rows="3" className="w-full p-3 border rounded-xl" value={formData.description} onChange={handleChange} placeholder="Jelaskan detail event..." />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 flex justify-center items-center gap-2">
            {loading ? <Loader className="animate-spin" /> : <><Save size={20}/> Simpan Event</>}
          </button>
        </form>
      </div>
    </div>
  );
}
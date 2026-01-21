import React, { useState, useEffect } from 'react';
import { X, Save, Loader } from 'lucide-react';

// Terima props baru: eventToEdit
const AddEventModal = ({ isOpen, onClose, onEventAdded, eventToEdit = null }) => {
  const [loading, setLoading] = useState(false);
  
  // State Form
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

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://tugas-akhir-prak-ppb-lknt.vercel.app/';

  // [LOGIKA EDIT]: Jika ada eventToEdit, isi form dengan data tersebut
  useEffect(() => {
    if (eventToEdit) {
      setFormData({
        title: eventToEdit.title || '',
        category: eventToEdit.category || 'Webinar',
        date: eventToEdit.date || '',
        time: eventToEdit.time || '',
        type: eventToEdit.type || 'Online',
        price: eventToEdit.price || 'Gratis',
        image: eventToEdit.image || '',
        description: eventToEdit.description || '',
        link_registration: eventToEdit.link_registration || ''
      });
    } else {
      // Jika mode tambah baru, reset form
      setFormData({
        title: '', category: 'Webinar', date: '', time: '', 
        type: 'Online', price: 'Gratis', image: '', description: '', link_registration: ''
      });
    }
  }, [eventToEdit, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Tentukan URL dan Metode (POST untuk baru, PUT untuk edit)
      const url = eventToEdit 
        ? `${API_URL}/api/events/${eventToEdit.id}` 
        : `${API_URL}/api/events`;
      
      const method = eventToEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        alert(eventToEdit ? "Event berhasil diupdate!" : "Event berhasil dibuat!");
        onEventAdded(); // Refresh data di halaman utama
        onClose();      // Tutup modal
      } else {
        alert("Gagal: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-blue-900">
            {eventToEdit ? 'Edit Event' : 'Tambah Event Baru'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X size={20}/></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Judul */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Judul Event</label>
            <input required name="title" value={formData.title} onChange={handleChange} type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Contoh: Webinar React JS"/>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Kategori</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded-lg">
                <option value="Webinar">Webinar</option>
                <option value="Bootcamp">Bootcamp</option>
                <option value="Seminar">Seminar</option>
                <option value="Workshop">Workshop</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Tipe Lokasi</label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded-lg">
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Tanggal</label>
              <input required name="date" value={formData.date} onChange={handleChange} type="text" className="w-full p-2 border rounded-lg" placeholder="12 Okt 2025"/>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Waktu</label>
              <input required name="time" value={formData.time} onChange={handleChange} type="text" className="w-full p-2 border rounded-lg" placeholder="09:00 WIB"/>
            </div>
          </div>

          <div>
             <label className="block text-sm font-bold text-gray-700 mb-1">Harga / Status</label>
             <input name="price" value={formData.price} onChange={handleChange} type="text" className="w-full p-2 border rounded-lg" placeholder="Gratis / Rp 50.000"/>
          </div>

          <div>
             <label className="block text-sm font-bold text-gray-700 mb-1">URL Gambar (Link)</label>
             <input name="image" value={formData.image} onChange={handleChange} type="text" className="w-full p-2 border rounded-lg" placeholder="https://..."/>
          </div>

          <div>
             <label className="block text-sm font-bold text-gray-700 mb-1">Link Pendaftaran (Google Form dll)</label>
             <input name="link_registration" value={formData.link_registration} onChange={handleChange} type="text" className="w-full p-2 border rounded-lg" placeholder="https://forms.google.com/..."/>
          </div>

          <div>
             <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Lengkap</label>
             <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full p-2 border rounded-lg" placeholder="Jelaskan detail event..."></textarea>
          </div>

          <div className="pt-4 flex gap-3 justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg font-bold text-gray-600 hover:bg-gray-50">Batal</button>
            <button disabled={loading} type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2">
              {loading ? <Loader className="animate-spin" size={18}/> : <Save size={18}/>}
              {eventToEdit ? 'Simpan Perubahan' : 'Buat Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
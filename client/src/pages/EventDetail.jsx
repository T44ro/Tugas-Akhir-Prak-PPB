import React from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, CheckCircle, Share2, ExternalLink } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function EventDetail({ event, onBack, onRegister, isRegistered }) {
  // Jika data event tidak ada (misal refresh halaman dan state hilang), kembalikan null atau loading
  if (!event) return null;

  // --- LOGIKA BARU: Handle Link Google Form ---
  const handleRegistrationClick = () => {
    // --- DEBUGGING ---
    console.log("Data Event saat ini:", event);
    console.log("Link yang dicoba akses:", event.link_registration);
    // -----------------

    const registrationLink = event.link_registration;

    if (registrationLink) {
      window.open(registrationLink, '_blank');
      onRegister(event); 
    } else {
      alert("Maaf, link pendaftaran belum tersedia (kosong) di database.");
    }
  };

  return (
    <div className="animate-fade-in pb-24 bg-white min-h-screen">
      {/* --- HEADER GAMBAR --- */}
      <div className="relative h-64 md:h-96 w-full">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        {/* Overlay Gradient supaya teks tombol kembali terlihat jelas */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent md:hidden" />
        
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-md hover:bg-white transition-all z-10"
        >
          <ArrowLeft size={24} className="text-gray-700" />
        </button>

        <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-md hover:bg-white transition-all z-10">
          <Share2 size={20} className="text-gray-700" />
        </button>
      </div>

      {/* --- KONTEN UTAMA --- */}
      <div className="p-6 md:p-10 md:max-w-5xl md:mx-auto -mt-6 md:-mt-20 relative bg-white rounded-t-3xl md:rounded-3xl shadow-xl z-0">
        
        {/* Kategori & Harga */}
        <div className="flex justify-between items-center mb-4">
          <Badge type={event.category}>{event.category}</Badge>
          <span className="text-xl font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg">
            {event.price}
          </span>
        </div>

        {/* Judul */}
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
          {event.title}
        </h1>

        {/* Info Grid (Waktu & Tempat) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Tanggal</p>
              <p className="font-bold text-gray-800">{event.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Waktu</p>
              <p className="font-bold text-gray-800">{event.time}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Lokasi</p>
              <p className="font-bold text-gray-800">{event.type}</p>
            </div>
          </div>
        </div>

        {/* Deskripsi & Detail */}
        <div className="space-y-8 mb-24 md:mb-8">
          <section>
            <h3 className="font-bold text-xl text-gray-900 mb-3">Tentang Program Ini</h3>
            <p className="text-gray-600 leading-relaxed text-base">
              {event.description || 
               "Program ini dirancang khusus untuk membantu Anda meningkatkan keterampilan profesional. Anda akan belajar langsung dari para ahli industri dan mendapatkan wawasan praktis yang dapat langsung diterapkan dalam karir Anda."}
            </p>
          </section>

          <section>
            <h3 className="font-bold text-xl text-gray-900 mb-3">Apa yang Akan Anda Pelajari?</h3>
            <ul className="space-y-2">
              {[
                "Memahami fundamental dan konsep dasar",
                "Studi kasus nyata di industri",
                "Sesi tanya jawab interaktif dengan mentor",
                "Networking dengan sesama peserta"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-600">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-xl text-gray-900 mb-3">Mentor</h3>
            <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden">
                 {/* Placeholder Avatar */}
                 <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold">
                    M
                 </div>
              </div>
              <div>
                <p className="font-bold text-gray-900">Tim Ahli FirsStep Journey</p>
                <p className="text-sm text-gray-500">Senior Practitioner</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* --- FLOATING ACTION BUTTON (Tombol Daftar) --- */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 md:sticky md:bottom-0 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="md:max-w-5xl md:mx-auto flex items-center justify-between gap-4">
          <div className="hidden md:block">
            <p className="text-sm text-gray-500">Biaya Pendaftaran</p>
            <p className="text-xl font-bold text-gray-900">{event.price}</p>
          </div>
          
          <div className="flex-1 md:flex-none md:w-64">
            {isRegistered ? (
              <Button fullWidth className="bg-green-100 text-green-700 hover:bg-green-200 border-transparent cursor-default">
                <CheckCircle size={18} /> Kamu Sudah Terdaftar
              </Button>
            ) : (
              // UPDATE: Menggunakan handler baru untuk redirect ke Google Form
              <Button fullWidth onClick={handleRegistrationClick}>
                Daftar Sekarang <ExternalLink size={16} className="ml-2 opacity-70"/>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Users, 
  Mail, 
  CheckCircle, 
  ArrowRight, 
  Briefcase 
} from 'lucide-react';
// Pastikan path ini sesuai dengan struktur folder Anda
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

// DATA MOCK VOLUNTEER (Data Sementara)
const VOLUNTEER_ROLES = [
  {
    id: 'vol-1',
    title: 'Event Organizer',
    type: 'Project Based',
    location: 'Hybrid (Jakarta)',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
    description: 'Membantu merencanakan dan mengeksekusi event webinar serta bootcamp bulanan FirstStep Journey. Anda akan belajar manajemen acara dari A-Z.',
    requirements: [
      'Memiliki pengalaman mengurus event kampus/organisasi',
      'Komunikatif dan bisa bekerja dalam tim',
      'Domisili Jabodetabek diutamakan'
    ],
    benefits: ['Sertifikat Volunteer', 'Networking dengan pembicara', 'Mentoring gratis']
  },
  {
    id: 'vol-2',
    title: 'Social Media Specialist',
    type: 'Remote',
    location: 'Online',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
    description: 'Mengelola konten Instagram dan LinkedIn FirstStep Journey untuk menyebarkan dampak positif dan tips karir kepada audiens yang lebih luas.',
    requirements: [
      'Kreatif dan up-to-date dengan tren media sosial',
      'Bisa menggunakan Canva/Figma dasar',
      'Komitmen minimal 3 bulan'
    ],
    benefits: ['Portofolio karya', 'Akses gratis ke semua paid event', 'Surat rekomendasi']
  },
  {
    id: 'vol-3',
    title: 'Community Manager',
    type: 'Remote',
    location: 'Online',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800',
    description: 'Menjadi moderator di grup Telegram/Discord, menyambut anggota baru, dan membangun suasana komunitas yang positif dan suportif.',
    requirements: [
      'Suka berinteraksi dengan orang baru',
      'Fast response',
      'Memiliki jiwa melayani'
    ],
    benefits: ['Personal branding', 'Networking luas', 'Merchandise eksklusif']
  }
];

export default function GetInvolved() {
  // State untuk menyimpan peran yang dipilih (untuk mode Detail)
  const [selectedRole, setSelectedRole] = useState(null);

  // --- MODE 1: TAMPILAN DETAIL (Jika ada role yang dipilih) ---
  if (selectedRole) {
    return (
      <div className="animate-fade-in pb-24 bg-white min-h-screen">
        {/* Header Gambar */}
        <div className="relative h-64 md:h-80 w-full">
          <img 
            src={selectedRole.image} 
            alt={selectedRole.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Tombol Kembali */}
          <button 
            onClick={() => setSelectedRole(null)}
            className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all z-10"
          >
            <ArrowLeft size={24} />
          </button>
          
          {/* Judul & Tipe */}
          <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white w-full">
            <span className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-xs font-bold uppercase mb-2 inline-block shadow-sm">
              {selectedRole.type}
            </span>
            <h1 className="text-2xl md:text-4xl font-bold text-shadow-sm mb-1">{selectedRole.title}</h1>
            <p className="text-sm opacity-90 flex items-center gap-1 font-medium">
              <Users size={16} /> {selectedRole.location}
            </p>
          </div>
        </div>

        {/* Konten Detail */}
        <div className="p-6 md:p-10 md:max-w-4xl md:mx-auto">
          <section className="mb-8">
            <h3 className="font-bold text-gray-900 text-lg mb-3 border-l-4 border-blue-600 pl-3">Deskripsi Peran</h3>
            <p className="text-gray-600 leading-relaxed">{selectedRole.description}</p>
          </section>

          <section className="mb-8">
            <h3 className="font-bold text-gray-900 text-lg mb-3 border-l-4 border-blue-600 pl-3">Persyaratan</h3>
            <ul className="space-y-3">
              {selectedRole.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-24">
            <h3 className="font-bold text-gray-900 text-lg mb-3 border-l-4 border-blue-600 pl-3">Benefit</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedRole.benefits.map((benefit, idx) => (
                <div key={idx} className="bg-blue-50 p-4 rounded-xl text-blue-800 text-sm font-medium flex items-center gap-3 border border-blue-100">
                  <div className="p-2 bg-white rounded-full text-blue-600 shadow-sm">
                    <Heart size={16} /> 
                  </div>
                  {benefit}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Tombol Daftar (Floating) */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-20 md:sticky md:bottom-0 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <div className="md:max-w-4xl md:mx-auto">
            <Button fullWidth onClick={() => window.open('https://forms.google.com', '_blank')}>
              Daftar Volunteer Sekarang
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // --- MODE 2: TAMPILAN LIST (Daftar Lowongan) ---
  return (
    <div className="animate-fade-in min-h-screen bg-gray-50 pb-24 md:p-8">
      {/* Header Halaman */}
      <div className="bg-white p-8 md:rounded-3xl shadow-sm mb-8 text-center md:text-left border-b md:border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3">Mari Berkontribusi 🤝</h1>
        <p className="text-gray-600 max-w-2xl">Bergabunglah dengan gerakan kami untuk memajukan karir anak muda Indonesia. Kontribusimu sangat berarti.</p>
      </div>

      {/* Daftar Lowongan */}
      <div className="px-6 md:px-0 mb-12 max-w-6xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Users className="text-blue-600" /> Lowongan Volunteer Tersedia
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VOLUNTEER_ROLES.map((role) => (
            <div 
              key={role.id} 
              onClick={() => {
                setSelectedRole(role);
                window.scrollTo(0, 0);
              }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all group duration-300"
            >
              {/* Gambar Kartu */}
              <div className="h-40 bg-gray-200 relative overflow-hidden">
                <img src={role.image} alt={role.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <Badge type={role.type}>{role.type}</Badge>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              
              {/* Info Kartu */}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 mb-1 text-lg group-hover:text-blue-600 transition-colors">{role.title}</h3>
                <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
                  <Users size={14} /> {role.location}
                </p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-xs text-gray-400 font-medium">Detail Program</span>
                  <div className="flex items-center text-blue-600 text-sm font-bold">
                    Lihat <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bagian Kolaborasi (Mitra) */}
      <div className="px-6 md:px-0 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
          {/* Dekorasi Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400 opacity-10 rounded-full -ml-10 -mb-10 blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-lg"><Briefcase size={24} className="text-yellow-400" /></div>
                Kolaborasi & Partner
              </h2>
              <p className="text-blue-100 text-sm md:text-base leading-relaxed">
                Apakah Anda mewakili perusahaan atau organisasi? Mari bekerja sama untuk mengadakan webinar, bootcamp, atau program CSR yang berdampak luas.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <a 
                href="mailto:firststepjourney12@gmail.com" 
                className="flex items-center justify-center gap-2 bg-white text-blue-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg"
              >
                <Mail size={18} /> Kirim Proposal
              </a>
              <button 
                onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
                className="flex items-center justify-center gap-2 bg-transparent border-2 border-white/30 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors"
              >
                WhatsApp Kami
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
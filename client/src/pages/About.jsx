import React from 'react';
import { Info, Mail, Globe, ArrowLeft, Github, Heart } from 'lucide-react';

export default function About({ onBack }) {
  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in pb-20">
      {/* Header Sederhana */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center gap-3">
        <button 
          onClick={onBack} 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600"/>
        </button>
        <h1 className="font-bold text-lg text-gray-800">Tentang Aplikasi</h1>
      </div>

      <div className="p-6 md:max-w-2xl md:mx-auto">
        {/* Logo & Versi */}
        <div className="bg-white rounded-3xl p-8 shadow-sm text-center mb-6 border border-gray-100">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg transform rotate-3 hover:rotate-0 transition-all">
            <Info size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-blue-900 mb-1">FirstStep Journey</h2>
          <p className="text-gray-500 text-sm">Versi 1.0.0 (Beta)</p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
            <Heart size={12} className="fill-current" /> Dibuat dengan Cinta
          </div>
        </div>

        <div className="space-y-4">
          {/* Deskripsi */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-2 text-lg">Misi Kami</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              FirstStep Journey adalah platform digital yang didedikasikan untuk mendemokratisasi akses pengembangan diri. Kami menghubungkan pemateri profesional dengan generasi muda Indonesia melalui webinar dan bootcamp gratis berkualitas.
            </p>
          </div>

          {/* Tim Pengembang */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 text-lg">Tim Pengembang</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">
                  M
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Mahasiswa PPB</p>
                  <p className="text-xs text-gray-500">Lead Developer</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 text-lg">Hubungi Kami</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-3 text-gray-600 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
                <Mail size={18} className="text-blue-500" />
                <span className="text-sm font-medium">firststepjourney12@gmail.com</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-gray-600 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
                <Globe size={18} className="text-blue-500" />
                <span className="text-sm font-medium">www.firststepjourney.com</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-400 text-xs">
          &copy; 2025 FirstStep Journey Foundation. Hak Cipta Dilindungi.
        </div>
      </div>
    </div>
  );
}
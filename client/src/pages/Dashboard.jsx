import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  // Data dummy sementara
  const myRegistrations = []; 

  return (
    <div className="p-6 pb-24 animate-fade-in">
      <h2 className="text-2xl font-bold text-blue-900 mb-2">Dashboard Saya</h2>
      <p className="text-gray-500 mb-6 text-sm">Kelola jadwal belajar dan sertifikatmu.</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-600 p-4 rounded-xl text-white shadow-lg shadow-blue-200">
           <div className="text-3xl font-bold mb-1">0</div>
           <div className="text-blue-100 text-sm">Event Diikuti</div>
        </div>
        <div className="bg-white p-4 rounded-xl text-blue-900 shadow-sm border border-blue-50">
           <div className="text-3xl font-bold mb-1">0</div>
           <div className="text-gray-500 text-sm">Sertifikat</div>
        </div>
      </div>

      <h3 className="font-bold text-gray-800 mb-4">Jadwal Mendatang</h3>
      
      <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
        <Calendar size={40} className="mx-auto text-gray-300 mb-3" />
        <p className="text-gray-500 text-sm">Belum ada event yang diikuti.</p>
      </div>
    </div>
  );
};

export default Dashboard; // <--- INI PENTING (Default Export)
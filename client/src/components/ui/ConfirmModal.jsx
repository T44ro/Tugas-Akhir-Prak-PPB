import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Konfirmasi", 
  message = "Apakah Anda yakin?", 
  confirmText = "Ya, Batalkan",
  cancelText = "Kembali"
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all scale-100">
        
        {/* Header Modal */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
              <AlertTriangle size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Isi Pesan */}
        <div className="p-6">
          <p className="text-gray-600 text-sm leading-relaxed">
            {message}
          </p>
        </div>

        {/* Tombol Aksi */}
        <div className="flex gap-3 p-5 bg-gray-50 rounded-b-2xl">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-white font-medium transition-all"
          >
            {cancelText}
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium shadow-md hover:shadow-lg transition-all"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
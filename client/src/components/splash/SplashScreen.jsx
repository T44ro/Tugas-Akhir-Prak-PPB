import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 1. Animasi Masuk (Fade In)
    setTimeout(() => {
      setFadeIn(true);
    }, 100);

    // 2. Simulasi Loading Bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // 3. Mulai Animasi Keluar (Fade Out)
          setTimeout(() => {
            setFadeOut(true);
            
            // 4. Hapus komponen dari DOM & Panggil Callback
            setTimeout(() => {
              setIsVisible(false);
              if (onComplete) onComplete();
            }, 600); // Waktu transisi fade-out
          }, 500); // Delay sebentar saat 100%

          return 100;
        }
        // Tambah progress secara acak agar terlihat alami
        return Math.min(prev + Math.random() * 15, 100);
      });
    }, 150); // Kecepatan update progress

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 transition-all duration-700 ease-in-out ${
        !fadeIn ? 'opacity-0' : 'opacity-100'
      } ${fadeOut ? 'opacity-0 scale-110 pointer-events-none' : ''}`}
    >
      {/* Background Pattern (Hiasan) */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-yellow-400 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Animasi */}
        <div className={`mb-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl transition-all duration-1000 ${
            fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="bg-yellow-400 p-3 rounded-xl shadow-lg">
             <Award className="w-12 h-12 text-blue-900" />
          </div>
        </div>

        {/* Teks Judul */}
        <h1 className={`text-3xl font-bold text-white mb-2 tracking-tight transition-all duration-1000 delay-100 ${
            fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          FirstStep Journey
        </h1>
        <p className={`text-blue-100 text-sm mb-12 font-medium transition-all duration-1000 delay-200 ${
            fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          First Step Matters
        </p>

        {/* Loading Bar */}
        <div className={`w-64 h-1.5 bg-black/20 rounded-full overflow-hidden transition-all duration-1000 delay-300 ${
            fadeIn ? 'opacity-100' : 'opacity-0'
        }`}>
          <div 
            className="h-full bg-yellow-400 rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(250,204,21,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Persentase Teks */}
        <p className="mt-2 text-xs text-blue-200 font-mono">
          {Math.round(progress)}%
        </p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-blue-200/60 text-xs">
        © 2025 Platform Nirlaba
      </div>
    </div>
  );
}
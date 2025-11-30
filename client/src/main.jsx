import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import SplashScreen from './components/splash/SplashScreen';
import './index.css';

// Komponen Root untuk mengatur transisi Splash -> App
function Root() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <React.StrictMode>
      {/* 1. Tampilkan Splash Screen jika state showSplash masih true */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
      {/* 2. App utama di-render tapi disembunyikan (hidden) sampai splash selesai */}
      {/* Teknik ini memastikan App sudah siap (loaded) saat splash hilang */}
      <div className={showSplash ? 'hidden' : 'block animate-fade-in'}>
        <App />
      </div>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
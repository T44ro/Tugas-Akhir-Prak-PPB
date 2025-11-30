import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* LOGIKA RESPONSIF:
         - w-full: Lebar penuh di HP
         - md:max-w-7xl: Maksimal lebar 1280px di Desktop
         - md:mx-auto: Posisi tengah di Desktop
      */}
      <div className="w-full md:max-w-7xl md:mx-auto bg-white min-h-screen shadow-xl relative overflow-x-hidden pb-20 md:pb-0">
        {children}
      </div>
    </div>
  );
};

export default Layout;
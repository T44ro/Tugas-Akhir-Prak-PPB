import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', fullWidth = false, type = 'button' }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer";
  
  const variants = {
    primary: "bg-yellow-400 text-blue-900 hover:bg-yellow-300 shadow-md border border-transparent", // Kuning aksen
    secondary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm", // Biru utama
    outline: "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "bg-transparent text-gray-500 hover:bg-gray-100"
  };
  
  return (
    <button 
      type={type}
      onClick={onClick} 
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
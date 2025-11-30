import React from 'react';

const Badge = ({ children, type }) => {
  const styles = {
    'Webinar': 'bg-blue-100 text-blue-800 border border-blue-200',
    'Bootcamp': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    'Seminar': 'bg-green-100 text-green-800 border border-green-200',
    'Workshop': 'bg-purple-100 text-purple-800 border border-purple-200'
  };

  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${styles[type] || 'bg-gray-100 text-gray-800'}`}>
      {children}
    </span>
  );
};

export default Badge;
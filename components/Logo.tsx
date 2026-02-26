import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex items-center ${className}`}>
    <div className="relative w-32 h-auto overflow-hidden" style={{ clipPath: 'inset(0 8% 10% 0)' }}>
      <img
        src="/logo-technical-solutions.jpg"
        alt="CodeRed Technical Solutions"
        className="w-full h-full object-contain"
      />
    </div>
  </div>
);

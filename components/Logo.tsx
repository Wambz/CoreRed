import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="relative w-12 h-12 flex items-center justify-center bg-codered-500 rounded-lg shadow-[0_0_20px_rgba(220,20,60,0.6)] shrink-0 overflow-hidden">
      {/* Wallstreet Bull Icon - Larger and clearer */}
      <svg
        viewBox="0 0 512 512"
        fill="currentColor"
        className="text-black w-9 h-9"
        style={{ transform: 'translateY(2px)' }} // Slight adjustment for optical centering
      >
        <path d="M480 224c-11.8-31-48.5-44.5-72-51.5-16.2-4.8-33.3-7-50.7-6.5-11.5 0-23 1-34.4 3-17.4-15.5-40-25-64.9-25-26 0-49.7 10.4-67.6 27.2-13.3-4-27.3-6.1-41.6-6.1-23.7 0-45.9 6-65.7 16.7-33 17.8-57 48.7-64.2 85.5-1.5 7.6-2.3 15.3-2.3 23.2 0 25.1 7.6 48.6 20.8 68.6 9.4 14.3 22 26 36.8 34.6 2.4 1.4 4.8 2.7 7.3 3.9 14 6.7 29.8 10.4 46.5 10.4 16.1 0 31.4-3.5 45.3-9.8 24.3 18.7 54.5 30 87.2 30 14.6 0 28.7-2.3 42.1-6.5 31.1-9.9 57.5-31.5 74.2-59.9 8.6-14.6 13.5-31.6 13.5-49.6 0-6.1-0.6-12.1-1.7-18 6.7-10.2 10.6-22.3 10.6-35.3 0-11.7-3.1-22.6-8.6-32.1zM113 353c-14.6-8.5-26-21.7-32-37.3-3.6-9.4-5.5-19.6-5.5-30.2 0-24.8 10.2-47.3 26.8-63.6 12.8-12.6 30.4-20.4 49.7-20.4 6.9 0 13.6 1 20 2.9-1.9 6.6-2.9 13.6-2.9 20.9 0 43.1 35.1 78.2 78.2 5.1 0 10-0.5 14.8-1.4-6.3 14.5-16.2 26.9-28.5 36.3-13.3 10.2-29.8 16.3-47.8 16.3-17.3 0-33.3-5.7-46.3-15.3-1.6-1.2-3.1-2.5-4.6-3.8-6.1-5.5-11.8-11.5-16.7-18-1.6-2.1-3.2-4.3-4.7-6.5l-0.5-0.7c0 0-0.1-0.1-0.1-0.1z m228.6 7.6c-13.8 8.1-29.8 12.8-46.8 12.8-16.1 0-31.2-4.2-44.5-11.6 11.2-12.7 18.2-29.3 18.2-47.6 0-9.8-2-19.1-5.7-27.6-0.3-0.7-0.6-1.4-1-2.1l-0.1-0.2c2.1-0.4 4.3-0.6 6.5-0.6 37.9 0 68.6-30.7 68.6-68.6 0-3.1-0.2-6.1-0.6-9.1 27.5 9.2 56 20.3 64.1 41.7 5.6 14.7 4.5 33.7-2.9 51.5-7.3 17.6-23.7 40-55.8 61.4z"/>
      </svg>
    </div>
    <div className="flex flex-col">
      <span className="font-heading font-black text-2xl tracking-tight text-white leading-none">
        Code<span className="text-codered-500">Red</span>
      </span>
      <span className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">Tech Solutions</span>
    </div>
  </div>
);

'use client';

import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-slate-950/80 border-b border-slate-900 px-4 py-2 flex items-center justify-between">
      <div className="text-sm font-black tracking-wider text-slate-200">
        GEOGO <span className="text-xs font-normal text-slate-500">| Türkiye Harita Testi</span>
      </div>
    </nav>
  );
};

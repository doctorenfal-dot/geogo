'use client';

import React from 'react';

interface ResultModalProps {
  isOpen: boolean;
  score: number;
  accuracy: number;
  formattedTime: string;
  stats: {
    firstTry: number;
    secondTry: number;
    thirdTry: number;
    failed: number;
    total: number;
  };
  regionName: string;
  onRestart: () => void;
  isDark: boolean;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  accuracy,
  formattedTime,
  stats,
  regionName,
  onRestart,
  isDark,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className={`rounded-xl p-6 max-w-sm w-full border text-center shadow-xl transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <h2 className="text-xl font-bold tracking-tight mb-1">Test Tamamlandı</h2>
        <p className={`text-xs mb-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {regionName} ({stats.total} İl)
        </p>

        {/* Skor & Süre */}
        <div className="grid grid-cols-2 gap-2 mb-5 font-mono">
          <div className={`p-3 rounded-lg border ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="text-[10px] uppercase font-sans font-medium text-slate-500 mb-0.5">Doğruluk</div>
            <div className="text-2xl font-black text-emerald-500">%{accuracy}</div>
          </div>
          <div className={`p-3 rounded-lg border ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="text-[10px] uppercase font-sans font-medium text-slate-500 mb-0.5">Süre</div>
            <div className="text-2xl font-black text-slate-300">{formattedTime}</div>
          </div>
        </div>

        {/* Hak Dağılım Tablosu */}
        <div className={`rounded-lg border p-3 mb-5 text-xs font-mono space-y-1.5 text-left ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex justify-between items-center text-emerald-500 font-medium">
            <span className="flex items-center gap-1.5 font-sans">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> 1. Hakta (%100):
            </span>
            <span className="font-bold">{stats.firstTry}</span>
          </div>

          <div className="flex justify-between items-center text-yellow-500 font-medium">
            <span className="flex items-center gap-1.5 font-sans">
              <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" /> 2. Hakta (%66):
            </span>
            <span className="font-bold">{stats.secondTry}</span>
          </div>

          <div className="flex justify-between items-center text-orange-500 font-medium">
            <span className="flex items-center gap-1.5 font-sans">
              <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" /> 3. Hakta (%33):
            </span>
            <span className="font-bold">{stats.thirdTry}</span>
          </div>

          <div className={`flex justify-between items-center text-red-500 font-medium pt-1.5 border-t ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}>
            <span className="flex items-center gap-1.5 font-sans">
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Bilemedi (%0):
            </span>
            <span className="font-bold">{stats.failed}</span>
          </div>
        </div>

        {/* Buton */}
        <button
          onClick={onRestart}
          className={`w-full py-2.5 px-4 font-bold text-sm rounded-lg transition-colors ${
            isDark
              ? 'bg-slate-100 text-slate-950 hover:bg-white'
              : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          Tekrar Oyna
        </button>
      </div>
    </div>
  );
};

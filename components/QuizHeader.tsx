'use client';

import React from 'react';

interface QuizHeaderProps {
  currentTargetName: string | null;
  currentTargetPlate: number | null;
  remainingCount: number;
  totalCount: number;
  accuracy: number;
  formattedTime: string;
  onRestart: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  isPlateMode: boolean;
  onTogglePlateMode: () => void;
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  currentTargetName,
  currentTargetPlate,
  remainingCount,
  totalCount,
  accuracy,
  formattedTime,
  onRestart,
  isDark,
  onToggleTheme,
  isPlateMode,
  onTogglePlateMode,
}) => {
  const solvedCount = totalCount - remainingCount;
  const progressPercent = totalCount > 0 ? (solvedCount / totalCount) * 100 : 0;

  const plateString = currentTargetPlate ? currentTargetPlate.toString().padStart(2, '0') : '--';

  return (
    <div className={`w-full p-4 rounded-xl border mb-3 transition-colors ${
      isDark
        ? 'bg-slate-900 border-slate-800 text-slate-100'
        : 'bg-white border-slate-200 text-slate-900 shadow-sm'
    }`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Bulunacak İl veya Plaka */}
        <div className="flex items-center gap-3">
          <span className={`text-xs font-bold uppercase tracking-wider ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            {isPlateMode ? 'Plaka:' : 'Tıkla:'}
          </span>

          {currentTargetName ? (
            isPlateMode ? (
              /* Türk Plaka Tasarımı */
              <div className="inline-flex items-center h-10 px-1 bg-white rounded border-2 border-slate-900 shadow-sm select-none font-mono">
                <div className="bg-blue-600 text-white font-sans text-[10px] font-black px-1.5 py-1 rounded-sm flex flex-col items-center justify-center leading-none mr-2">
                  <span>TR</span>
                </div>
                <span className="text-2xl sm:text-3xl font-black text-black tracking-widest px-2">
                  {plateString}
                </span>
              </div>
            ) : (
              <span className="text-2xl sm:text-4xl font-black tracking-tight">
                {currentTargetName}
              </span>
            )
          ) : (
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-500">
              Test Tamamlandı! 🎉
            </span>
          )}
        </div>

        {/* Skor & Kontroller */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {/* İlerleme */}
          <div className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs sm:text-sm font-semibold ${
            isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <span className="text-[10px] uppercase font-sans font-medium text-slate-500 mr-1.5">Kalan</span>
            {solvedCount}/{totalCount}
          </div>

          {/* Doğruluk */}
          <div className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs sm:text-sm font-semibold ${
            isDark ? 'bg-slate-950 border-slate-800 text-emerald-400' : 'bg-slate-50 border-slate-200 text-emerald-600'
          }`}>
            <span className="text-[10px] uppercase font-sans font-medium text-slate-500 mr-1.5">Skor</span>
            %{accuracy}
          </div>

          {/* Süre */}
          <div className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs sm:text-sm font-semibold ${
            isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            {formattedTime}
          </div>

          {/* Plaka Modu Toggle Butonu */}
          <button
            onClick={onTogglePlateMode}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
              isPlateMode
                ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                : isDark
                ? 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-400'
                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600'
            }`}
            title="Plaka kodlarını öğrenme modu"
          >
            {isPlateMode ? '🔢 Plaka Modu: AÇIK' : '🔢 Plaka Modu'}
          </button>

          {/* Yeniden Başlat */}
          <button
            onClick={onRestart}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
            }`}
          >
            Yeniden Başlat
          </button>

          {/* Tema Değiştirici */}
          <button
            onClick={onToggleTheme}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              isDark
                ? 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-slate-200'
                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600'
            }`}
          >
            {isDark ? 'Klasik Atlas' : 'Koyu Mod'}
          </button>
        </div>
      </div>

      {/* İlerleme Çizgisi */}
      <div className={`w-full h-1 rounded-full overflow-hidden mt-3 ${
        isDark ? 'bg-slate-800' : 'bg-slate-100'
      }`}>
        <div
          className={`h-full transition-all duration-200 ${
            isDark ? 'bg-slate-300' : 'bg-slate-900'
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

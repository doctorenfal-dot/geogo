'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { PROVINCES, Province } from '@/data/provincesData';

interface SilhouetteGameProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

// Bounding box hesaplayıcı (SVG siluetini tam ortalamak ve büyütmek için)
function getPathBBox(pathStr: string) {
  const coords = pathStr.match(/-?[0-9]+(\.[0-9]+)?/g);
  if (!coords) return { minX: 0, minY: 0, width: 200, height: 200 };
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (let i = 0; i < coords.length; i += 2) {
    const x = parseFloat(coords[i]);
    const y = parseFloat(coords[i + 1]);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const padding = 15;
  return {
    minX: minX - padding,
    minY: minY - padding,
    width: Math.max(maxX - minX + padding * 2, 30),
    height: Math.max(maxY - minY + padding * 2, 30),
  };
}

export const SilhouetteGame: React.FC<SilhouetteGameProps> = ({ isDark, onToggleTheme }) => {
  const [shuffledList, setShuffledList] = useState<Province[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [inputVal, setInputVal] = useState<string>('');
  const [feedback, setFeedback] = useState<{ text: string; type: 'correct' | 'wrong' | 'revealed' } | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [totalSolved, setTotalSolved] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Başlangıçta illeri karıştır
  const initGame = useCallback(() => {
    const shuffled = [...PROVINCES].sort(() => Math.random() - 0.5);
    setShuffledList(shuffled);
    setCurrentIndex(0);
    setInputVal('');
    setFeedback(null);
    setAttempts(0);
    setScore(0);
    setTotalSolved(0);
    setIsCompleted(false);
    setShowHint(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const currentProv = shuffledList[currentIndex] || null;

  // Siluetin ViewBox'ı
  const viewBox = useMemo(() => {
    if (!currentProv) return '0 0 200 200';
    const box = getPathBBox(currentProv.path);
    return `${box.minX} ${box.minY} ${box.width} ${box.height}`;
  }, [currentProv]);

  // Tahmin gönderme
  const handleGuess = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentProv || isCompleted) return;

    const trimmed = inputVal.trim().toLocaleLowerCase('tr-TR');
    if (!trimmed) return;

    const correctName = currentProv.name.toLocaleLowerCase('tr-TR');

    if (trimmed === correctName) {
      // Doğru bildi
      let pts = 100;
      if (attempts === 1) pts = 60;
      else if (attempts >= 2) pts = 30;

      setScore((prev) => prev + pts);
      setTotalSolved((prev) => prev + 1);
      setFeedback({ text: `Doğru! ${currentProv.name}`, type: 'correct' });

      setTimeout(() => {
        advanceNext();
      }, 1000);
    } else {
      // Yanlış tahmin
      const nextAtt = attempts + 1;
      setAttempts(nextAtt);

      setInputVal(''); // Yanlış yazılanı otomatik temizle
      if (nextAtt >= 3) {
        setFeedback({ text: `Bu il: ${currentProv.name}`, type: 'revealed' });
        setTimeout(() => {
          advanceNext();
        }, 1800);
      } else {
        setFeedback({ text: `Yanlış (${3 - nextAtt} deneme kaldı)`, type: 'wrong' });
      }
    }
  };

  const advanceNext = () => {
    setInputVal('');
    setFeedback(null);
    setAttempts(0);
    setShowHint(false);

    if (currentIndex + 1 < shuffledList.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleSkip = () => {
    if (!currentProv) return;
    setFeedback({ text: `Pas geçildi: ${currentProv.name}`, type: 'revealed' });
    setTimeout(() => {
      advanceNext();
    }, 1500);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Üst Bar */}
      <div className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-3 ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <span className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
            👤 İl Silueti Modu
          </span>
          <span className={`text-xs px-2.5 py-1 rounded font-semibold ${
            isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
          }`}>
            Şekle bakarak ili tahmin et
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          <div className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs sm:text-sm font-semibold ${
            isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <span className="text-[10px] uppercase font-sans font-medium text-slate-500 mr-1.5">Soru</span>
            {currentIndex + 1} / {shuffledList.length}
          </div>

          <div className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs sm:text-sm font-semibold ${
            isDark ? 'bg-slate-950 border-slate-800 text-emerald-400' : 'bg-slate-50 border-slate-200 text-emerald-600'
          }`}>
            <span className="text-[10px] uppercase font-sans font-medium text-slate-500 mr-1.5">Puan</span>
            {score}
          </div>

          <button
            onClick={initGame}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
            }`}
          >
            Yeniden Başlat
          </button>

          <button
            onClick={onToggleTheme}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              isDark
                ? 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-400'
                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600'
            }`}
          >
            {isDark ? 'Klasik Atlas' : 'Koyu Mod'}
          </button>
        </div>
      </div>

      {/* Siluet Vitrini & Tahmin Alanı */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
        {/* Siluet SVG Kartı */}
        <div className={`md:col-span-8 rounded-xl border flex flex-col items-center justify-center p-6 relative min-h-[360px] sm:min-h-[440px] overflow-hidden ${
          isDark ? 'bg-[#090d14] border-slate-800' : 'bg-[#e2edf6] border-slate-300'
        }`}>
          {currentProv && (
            <svg
              viewBox={viewBox}
              className="w-full max-h-[340px] select-none filter drop-shadow-md transition-all duration-300"
            >
              <path
                d={currentProv.path}
                className={`${
                  isDark
                    ? 'fill-slate-100 stroke-slate-400 stroke-[0.8]'
                    : 'fill-slate-900 stroke-slate-700 stroke-[0.8]'
                }`}
              />
            </svg>
          )}

          {/* İpucu Göstergesi (Plaka veya Bölge) */}
          {showHint && currentProv && (
            <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-lg border text-xs font-mono font-bold shadow-sm ${
              isDark ? 'bg-slate-900 border-slate-700 text-yellow-300' : 'bg-white border-slate-300 text-yellow-800'
            }`}>
              💡 Plaka: [TR | {currentProv.plateCode.toString().padStart(2, '0')}] • Bölge: {currentProv.regionId.toUpperCase()}
            </div>
          )}
        </div>

        {/* Yan Panel: Cevap Girişi ve Skor */}
        <div className={`md:col-span-4 rounded-xl border p-5 flex flex-col justify-between ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Bu il hangisidir?
            </span>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Dış hatlarına, burunlarına veya göl girintilerine bakarak tahmin et.
            </p>

            <form onSubmit={handleGuess} className="mt-4 flex flex-col gap-2.5">
              <input
                type="text"
                autoFocus
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="İl adını yaz ve Enter'a bas..."
                className={`w-full px-4 py-3 rounded-lg border font-semibold text-sm outline-none transition-all ${
                  isDark
                    ? 'bg-slate-950 border-slate-700 text-white focus:border-slate-400'
                    : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-slate-800'
                }`}
              />

              <button
                type="submit"
                className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all ${
                  isDark
                    ? 'bg-slate-100 hover:bg-white text-slate-950 shadow-sm'
                    : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
                }`}
              >
                Tahmini Gönder (Enter)
              </button>
            </form>

            {/* Geri Bildirim */}
            {feedback && (
              <div className={`mt-3 p-3 rounded-lg text-xs font-bold text-center transition-all ${
                feedback.type === 'correct'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : feedback.type === 'wrong'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
              }`}>
                {feedback.text}
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
            {!showHint && (
              <button
                type="button"
                onClick={() => setShowHint(true)}
                className={`w-full py-2 rounded-lg text-xs font-semibold border transition-all ${
                  isDark
                    ? 'border-slate-800 hover:bg-slate-800 text-slate-300'
                    : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                💡 İpucu Al (Plaka & Bölge)
              </button>
            )}

            <button
              type="button"
              onClick={handleSkip}
              className={`w-full py-2 rounded-lg text-xs font-semibold border transition-all ${
                isDark
                  ? 'border-slate-800 hover:bg-slate-800 text-slate-400'
                  : 'border-slate-200 hover:bg-slate-100 text-slate-600'
              }`}
            >
              Cevabı Göster ve Geç ⏭️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

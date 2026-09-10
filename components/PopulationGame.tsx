'use client';

import React, { useState, useEffect } from 'react';
import { PROVINCES, Province } from '@/data/provincesData';
import { NEIGHBOR_COUNTRIES } from '@/data/neighborsData';
import { TURKEY_LAKES } from '@/data/lakesData';
import { SORTED_BY_POPULATION, ProvincePopulation } from '@/data/populationData';

interface PopulationGameProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export const PopulationGame: React.FC<PopulationGameProps> = ({ isDark, onToggleTheme }) => {
  // Büyükten küçüğe sıra: 0'dan başlar (1. En kalabalık il)
  const [currentRankIndex, setCurrentRankIndex] = useState<number>(0);
  const [solvedMap, setSolvedMap] = useState<Record<string, { rank: number; name: string; formatted: string }>>({});
  const [wrongClickProvince, setWrongClickProvince] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Aranan nüfus sırası (1'den 81'e)
  const currentRank = currentRankIndex + 1;
  const targetPopItem: ProvincePopulation | null = SORTED_BY_POPULATION[currentRankIndex] || null;

  // Sayaç
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && !isCompleted) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isCompleted]);

  const handleRestart = () => {
    setCurrentRankIndex(0);
    setSolvedMap({});
    setWrongClickProvince(null);
    setAttempts(0);
    setScore(0);
    setIsCompleted(false);
    setTimerSeconds(0);
    setIsTimerRunning(true);
  };

  const handleProvinceClick = (prov: Province) => {
    if (isCompleted || !targetPopItem) return;

    // Kullanıcı haritadan ili tahmin eder (İlin adı soru yerinde yazmıyor!)
    if (prov.name.toLowerCase() === targetPopItem.provinceName.toLowerCase()) {
      // Doğru bildi: İlin üstüne SADECE nüfusu ve sırası yazılır (İl adı yazmaz!)
      setSolvedMap((prev) => ({
        ...prev,
        [prov.id]: {
          rank: targetPopItem.rank,
          name: targetPopItem.provinceName,
          formatted: targetPopItem.formatted,
        },
      }));

      let pts = 100;
      if (attempts === 1) pts = 60;
      else if (attempts >= 2) pts = 30;
      setScore((prev) => prev + pts);

      setAttempts(0);
      setWrongClickProvince(null);

      if (currentRankIndex + 1 < SORTED_BY_POPULATION.length) {
        setCurrentRankIndex((prev) => prev + 1);
      } else {
        setIsCompleted(true);
        setIsTimerRunning(false);
      }
    } else {
      // Yanlış tıklandı
      setAttempts((prev) => prev + 1);
      setWrongClickProvince(prov.name);
      setTimeout(() => setWrongClickProvince(null), 1000);
    }
  };

  const formattedTime = `${Math.floor(timerSeconds / 60)
    .toString()
    .padStart(2, '0')}:${(timerSeconds % 60).toString().padStart(2, '0')}`;

  const accuracy = currentRankIndex > 0 ? Math.round((score / (currentRankIndex * 100)) * 100) : 100;

  return (
    <div className="w-full flex flex-col gap-2.5">
      {/* Üst Bar: Asla ilin adını yazmaz, sadece sırayı sorar! */}
      <div className={`p-4 rounded-xl border transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Soru: İsim YOK, sadece sıra ve yönlendirme */}
          <div className="flex items-center gap-3">
            <span className={`text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Hedef:
            </span>

            {!isCompleted && targetPopItem ? (
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-black text-base shadow-sm">
                  #{currentRank}. EN KALABALIK İLİ BUL
                </span>
                <span className={`text-xs font-medium ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  (Türkiye&apos;nin nüfusu en büyük {currentRank}. iline haritada tıkla)
                </span>
              </div>
            ) : (
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-500">
                81 İl Nüfus Sıralaması Tamamlandı! 🎉
              </span>
            )}
          </div>

          {/* Skor & Kontroller */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <div className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs sm:text-sm font-semibold ${
              isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <span className="text-[10px] uppercase font-sans font-medium text-slate-500 mr-1.5">Sıra</span>
              {currentRankIndex + 1} / 81
            </div>

            <div className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs sm:text-sm font-semibold ${
              isDark ? 'bg-slate-950 border-slate-800 text-emerald-400' : 'bg-slate-50 border-slate-200 text-emerald-600'
            }`}>
              <span className="text-[10px] uppercase font-sans font-medium text-slate-500 mr-1.5">Skor</span>
              %{accuracy}
            </div>

            <div className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs sm:text-sm font-semibold ${
              isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              {formattedTime}
            </div>

            <button
              onClick={handleRestart}
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
      </div>

      {/* Harita */}
      <div className={`relative w-full aspect-[1100/540] ${
        isDark ? 'bg-[#0b0e14]' : 'bg-[#9fc7ea]'
      } rounded-xl border ${
        isDark ? 'border-slate-800' : 'border-slate-300'
      } overflow-hidden flex items-center justify-center select-none shadow-sm transition-colors`}>
        <svg
          viewBox="0 0 1100 540"
          className="w-full h-full select-none"
          style={{ touchAction: 'manipulation' }}
        >
          {/* Komşular */}
          <g className="pointer-events-none">
            {NEIGHBOR_COUNTRIES.map((neighbor) => (
              <path
                key={neighbor.id}
                d={neighbor.path}
                className={`${isDark ? 'fill-[#141a24] stroke-[#1e2736]' : 'fill-[#c6d7e6] stroke-[#8ea5bc]'} stroke-[0.8]`}
              />
            ))}
          </g>

          {/* İller */}
          <g>
            {PROVINCES.map((prov) => {
              const isSolved = Boolean(solvedMap[prov.id]);
              const isWrong = wrongClickProvince === prov.name;

              let fillClass = isDark
                ? 'fill-[#1c2432] hover:fill-[#263245] stroke-[#2d394d] stroke-[0.8] cursor-pointer'
                : 'fill-[#ffffff] hover:fill-[#eef2f6] stroke-[#64748b] stroke-[0.8] cursor-pointer';

              if (isSolved) {
                fillClass = isDark
                  ? 'fill-emerald-800/80 stroke-emerald-950 stroke-[0.8]'
                  : 'fill-emerald-400 stroke-slate-700 stroke-[0.8]';
              } else if (isWrong) {
                fillClass = 'fill-red-600 stroke-red-300 stroke-[1.5]';
              }

              return (
                <path
                  key={prov.id}
                  d={prov.path}
                  className={`transition-colors duration-75 ${fillClass}`}
                  onClick={() => handleProvinceClick(prov)}
                />
              );
            })}
          </g>

          {/* Büyük Göller */}
          <g className="pointer-events-none select-none">
            {TURKEY_LAKES.map((lake) => (
              <path
                key={lake.id}
                d={lake.path}
                fill={isDark ? '#0b0e14' : '#9fc7ea'}
                stroke={isDark ? '#242e3f' : '#628db3'}
                strokeWidth="0.8"
              />
            ))}
          </g>

          {/* Çözülen İllerde İSİM YOKTUR: Sadece sıra numarası ve net nüfus sayısı yazar! */}
          <g className="pointer-events-none select-none">
            {PROVINCES.map((prov) => {
              const solvedInfo = solvedMap[prov.id];
              if (!solvedInfo) return null;

              return (
                <g key={`pop-${prov.id}`}>
                  <text
                    x={prov.center[0]}
                    y={prov.center[1] - 4}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={isDark ? '#fef08a' : '#0f172a'}
                    stroke={isDark ? '#000000' : '#ffffff'}
                    strokeWidth={2.5}
                    paintOrder="stroke"
                    strokeLinejoin="round"
                    className="text-[9px] font-black tracking-tight"
                  >
                    #{solvedInfo.rank}
                  </text>
                  <text
                    x={prov.center[0]}
                    y={prov.center[1] + 6}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={isDark ? '#ffffff' : '#042f2e'}
                    stroke={isDark ? '#000000' : '#ffffff'}
                    strokeWidth={2.5}
                    paintOrder="stroke"
                    strokeLinejoin="round"
                    className="text-[8.5px] font-bold tracking-tighter"
                  >
                    {solvedInfo.formatted}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Yanlış Tıklanan İlin Yanıp Sönmesi (Seterra tarzı) */}
          {wrongClickProvince && (
            <g className="pointer-events-none select-none animate-pulse">
              <text
                x="550"
                y="40"
                textAnchor="middle"
                fill="#ef4444"
                stroke={isDark ? '#000000' : '#ffffff'}
                strokeWidth={3}
                paintOrder="stroke"
                className="text-[14px] font-black tracking-wider uppercase"
              >
                ✕ Yanlış Sıra! ({wrongClickProvince})
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

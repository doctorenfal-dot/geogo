'use client';

import React, { useState, useCallback } from 'react';
import { PROVINCES, Province } from '@/data/provincesData';
import { NEIGHBOR_COUNTRIES } from '@/data/neighborsData';
import { TURKEY_LAKES } from '@/data/lakesData';
import { CLIMATE_REGIONS, ClimateRegion } from '@/data/climateData';

interface ClimateGameProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onBackToHome?: () => void;
}

export const ClimateGame: React.FC<ClimateGameProps> = ({ isDark, onToggleTheme, onBackToHome }) => {
  const [climateIndex, setClimateIndex] = useState<number>(0);
  const currentClimate: ClimateRegion | null = CLIMATE_REGIONS[climateIndex] || null;

  // Hangi iller tıklandı (İl bazında tek tek boyama)
  const [clickedProvinces, setClickedProvinces] = useState<Record<string, string>>({}); // provName -> color
  const [wrongProvince, setWrongProvince] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Mevcut iklimde kaç il kaldı
  const targetProvinces = currentClimate ? currentClimate.provinces : [];
  const foundInCurrentClimate = targetProvinces.filter((p) => Boolean(clickedProvinces[p]));
  const remainingInCurrent = targetProvinces.length - foundInCurrentClimate.length;

  const initGame = useCallback(() => {
    setClimateIndex(0);
    setClickedProvinces({});
    setWrongProvince(null);
    setScore(0);
    setIsCompleted(false);
  }, []);

  const handleProvinceClick = (prov: Province) => {
    if (isCompleted || !currentClimate) return;

    // Zaten bu il tıklandı mı?
    if (clickedProvinces[prov.name]) return;

    // Tıklanan il şu an sorulan iklim kuşağına ait mi?
    const isBelong = targetProvinces.some(
      (p) => p.toLowerCase() === prov.name.toLowerCase()
    );

    if (isBelong) {
      const color = isDark ? currentClimate.colorDark : currentClimate.colorLight;
      const updated = {
        ...clickedProvinces,
        [prov.name]: color,
      };
      setClickedProvinces(updated);
      setScore((prev) => prev + 25);

      // Bu iklimdeki tüm iller bulundu mu?
      const nowFound = targetProvinces.filter((p) => Boolean(updated[p]));
      if (nowFound.length === targetProvinces.length) {
        // Sonraki iklime geç
        if (climateIndex + 1 < CLIMATE_REGIONS.length) {
          setClimateIndex((prev) => prev + 1);
        } else {
          setIsCompleted(true);
        }
      }
    } else {
      setWrongProvince(prov.name);
      setTimeout(() => setWrongProvince(null), 1000);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2.5">
      {/* Üst Bar */}
      <div className={`p-4 rounded-xl border transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                  isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white' : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-black'
                }`}
              >
                ← Ana Sayfa
              </button>
            )}

            <span className={`text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              İklim:
            </span>

            {currentClimate ? (
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-500">
                  {currentClimate.name}
                </span>
                <span className={`text-xs font-medium italic ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  ({currentClimate.shortDesc})
                </span>
              </div>
            ) : (
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-500">
                Tüm İklim Kuşakları Tamamlandı
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {currentClimate && (
              <div className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs sm:text-sm font-semibold ${
                isDark ? 'bg-slate-950 border-slate-800 text-amber-400' : 'bg-slate-50 border-slate-200 text-amber-700'
              }`}>
                <span className="text-[10px] uppercase font-sans font-medium text-slate-500 mr-1.5">Bu İklimde Kalan İl</span>
                {remainingInCurrent} / {targetProvinces.length}
              </div>
            )}

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
          <g className="pointer-events-none">
            {NEIGHBOR_COUNTRIES.map((neighbor) => (
              <path
                key={neighbor.id}
                d={neighbor.path}
                className={`${isDark ? 'fill-[#141a24] stroke-[#1e2736]' : 'fill-[#c6d7e6] stroke-[#8ea5bc]'} stroke-[0.8]`}
              />
            ))}
          </g>

          {/* İller: Yalnızca TIKLANAN il boyanır! */}
          <g>
            {PROVINCES.map((prov) => {
              const isWrong = wrongProvince === prov.name;
              const color = clickedProvinces[prov.name];

              let fillClass = isDark
                ? 'fill-[#1c2432] hover:fill-[#263245] stroke-[#2d394d] stroke-[0.8] cursor-pointer'
                : 'fill-[#ffffff] hover:fill-[#eef2f6] stroke-[#64748b] stroke-[0.8] cursor-pointer';

              if (isWrong) {
                fillClass = 'fill-red-600 stroke-red-300 stroke-[1.5]';
              }

              return (
                <path
                  key={prov.id}
                  d={prov.path}
                  fill={color || undefined}
                  className={`transition-colors duration-75 ${!color ? fillClass : 'stroke-slate-900 stroke-[0.8]'}`}
                  onClick={() => handleProvinceClick(prov)}
                />
              );
            })}
          </g>

          {/* Göller */}
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

          {/* Çözülen İllerin İsimleri */}
          <g className="pointer-events-none select-none">
            {PROVINCES.map((prov) => {
              if (!clickedProvinces[prov.name]) return null;
              return (
                <text
                  key={`name-${prov.id}`}
                  x={prov.center[0]}
                  y={prov.center[1]}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={isDark ? '#ffffff' : '#0f172a'}
                  stroke={isDark ? '#000000' : '#ffffff'}
                  strokeWidth={2}
                  paintOrder="stroke"
                  strokeLinejoin="round"
                  className="text-[9px] font-bold tracking-tight pointer-events-none select-none"
                >
                  {prov.name}
                </text>
              );
            })}
          </g>

          {/* Yanlış Tıklama */}
          {wrongProvince && (
            <g className="pointer-events-none select-none animate-pulse">
              <text
                x="550"
                y="40"
                textAnchor="middle"
                fill="#ef4444"
                stroke={isDark ? '#000000' : '#ffffff'}
                strokeWidth={3}
                paintOrder="stroke"
                className="text-[13px] font-black tracking-wider uppercase"
              >
                {wrongProvince} ilinde {currentClimate?.name} görülmez
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { Province } from '@/data/provincesData';
import { NEIGHBOR_COUNTRIES } from '@/data/neighborsData';
import { TURKEY_LAKES } from '@/data/lakesData';

interface WrongClickInfo {
  id: string;
  name: string;
  center: [number, number];
}

interface TurkeyMapProps {
  provinces: Province[];
  provinceStatuses: Record<string, 'green' | 'yellow' | 'orange' | 'darkred'>;
  flashingProvinceId: string | null;
  wrongClick: WrongClickInfo | null;
  onProvinceClick: (provinceId: string) => void;
  activeRegionId: string;
  isDark: boolean;
}

export const TurkeyMap: React.FC<TurkeyMapProps> = ({
  provinces,
  provinceStatuses,
  flashingProvinceId,
  wrongClick,
  onProvinceClick,
  activeRegionId,
  isDark,
}) => {
  const getProvinceFill = (province: Province) => {
    // 3 Hata sonrası doğru yerin yanıp sönmesi (Seterra tarzı düz flaş)
    if (flashingProvinceId === province.id) {
      return 'animate-seterra-flash cursor-pointer stroke-black stroke-[1.5]';
    }

    const status = provinceStatuses[province.id];
    if (status === 'green') return isDark ? 'fill-emerald-600 stroke-slate-900 stroke-[0.8]' : 'fill-emerald-500 stroke-slate-700 stroke-[0.8]';
    if (status === 'yellow') return isDark ? 'fill-yellow-500 stroke-slate-900 stroke-[0.8]' : 'fill-yellow-400 stroke-slate-700 stroke-[0.8]';
    if (status === 'orange') return isDark ? 'fill-orange-600 stroke-slate-900 stroke-[0.8]' : 'fill-orange-500 stroke-slate-700 stroke-[0.8]';
    if (status === 'darkred') return isDark ? 'fill-red-800 stroke-slate-900 stroke-[0.8]' : 'fill-red-700 stroke-slate-700 stroke-[0.8]';

    // Seçili bölge dışındaki iller
    if (activeRegionId !== 'all' && province.regionId !== activeRegionId) {
      return isDark
        ? 'fill-[#171d27] stroke-[#242d3d] stroke-[0.5] opacity-35 pointer-events-none'
        : 'fill-[#dbe3eb] stroke-[#94a3b8] stroke-[0.5] opacity-40 pointer-events-none';
    }

    // Normal tıklanabilir il
    return isDark
      ? 'fill-[#222b3a] hover:fill-[#2d394d] stroke-[#0f141c] stroke-[0.8] cursor-pointer'
      : 'fill-[#ffffff] hover:fill-[#eef2f6] stroke-[#475569] stroke-[0.8] cursor-pointer';
  };

  const seaBgColor = isDark ? 'bg-[#0b0e14]' : 'bg-[#9fc7ea]';
  const seaTextColor = isDark ? 'fill-slate-700/40' : 'fill-[#628db3]';
  const neighborFill = isDark ? 'fill-[#141a24] stroke-[#1e2736]' : 'fill-[#c6d7e6] stroke-[#8ea5bc]';
  const neighborTextColor = isDark ? 'fill-slate-600' : 'fill-[#516f8c]';

  return (
    <div className={`relative w-full aspect-[1100/540] ${seaBgColor} rounded-xl border ${
      isDark ? 'border-slate-800' : 'border-slate-300'
    } overflow-hidden flex items-center justify-center select-none shadow-sm transition-colors`}>
      <svg
        viewBox="0 0 1100 540"
        className="w-full h-full select-none"
        style={{ touchAction: 'manipulation' }}
      >
        {/* Deniz İsimleri */}
        <text x="560" y="55" className={`text-[13px] font-bold tracking-[0.3em] ${seaTextColor} pointer-events-none select-none`} textAnchor="middle">
          KARADENİZ
        </text>
        <text x="440" y="515" className={`text-[13px] font-bold tracking-[0.3em] ${seaTextColor} pointer-events-none select-none`} textAnchor="middle">
          AKDENİZ
        </text>
        <text x="110" y="360" className={`text-[12px] font-bold tracking-[0.25em] ${seaTextColor} pointer-events-none select-none`} textAnchor="middle">
          EGE DENİZİ
        </text>
        <text x="185" y="115" className={`text-[9px] font-bold tracking-wider ${seaTextColor} pointer-events-none select-none`} textAnchor="middle">
          MARMARA DENİZİ
        </text>

        {/* 1. Komşu Ülkeler */}
        <g className="pointer-events-none">
          {NEIGHBOR_COUNTRIES.map((neighbor) => (
            <path
              key={neighbor.id}
              d={neighbor.path}
              className={`${neighborFill} stroke-[0.8]`}
            />
          ))}
          {/* Komşu İsimleri */}
          {NEIGHBOR_COUNTRIES.map((neighbor) => (
            <text
              key={`label-${neighbor.id}`}
              x={neighbor.center[0]}
              y={neighbor.center[1]}
              textAnchor="middle"
              className={`text-[10px] font-bold tracking-widest ${neighborTextColor} select-none pointer-events-none uppercase`}
            >
              {neighbor.name}
            </text>
          ))}
        </g>

        {/* 2. Türkiye İlleri */}
        <g>
          {provinces.map((prov) => {
            const isDimmed = activeRegionId !== 'all' && prov.regionId !== activeRegionId;
            return (
              <path
                key={prov.id}
                d={prov.path}
                className={`transition-colors duration-75 ${getProvinceFill(prov)}`}
                onClick={() => {
                  if (!isDimmed) {
                    onProvinceClick(prov.id);
                  }
                }}
              />
            );
          })}
        </g>

        {/* 2.5 Büyük Göller (Van, Tuz, Beyşehir, Eğirdir, İznik...) */}
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

        {/* 3. Doğru Bilinen / Çözülen İllerin Kalıcı İsimleri */}
        <g className="pointer-events-none select-none">
          {provinces.map((prov) => {
            const isSolved = Boolean(provinceStatuses[prov.id]);
            if (!isSolved) return null;

            return (
              <text
                key={`solved-${prov.id}`}
                x={prov.center[0]}
                y={prov.center[1]}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isDark ? '#ffffff' : '#0f172a'}
                stroke={isDark ? '#000000' : '#ffffff'}
                strokeWidth={isDark ? 2.5 : 3}
                paintOrder="stroke"
                strokeLinejoin="round"
                className="text-[10px] sm:text-[11px] font-bold tracking-tight pointer-events-none select-none"
              >
                {prov.name}
              </text>
            );
          })}
        </g>

        {/* 4. Yanlış Tıklanan İlin Üstünde Yanıp Sönen İsim */}
        {wrongClick && (
          <g className="pointer-events-none select-none animate-wrong-blink">
            <text
              x={wrongClick.center[0]}
              y={wrongClick.center[1]}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#dc2626"
              stroke={isDark ? '#000000' : '#ffffff'}
              strokeWidth="3.5"
              paintOrder="stroke"
              strokeLinejoin="round"
              className="text-[12px] font-black pointer-events-none select-none"
            >
              {wrongClick.name}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { PROVINCES } from '@/data/provincesData';
import { NEIGHBOR_COUNTRIES } from '@/data/neighborsData';
import { PHYSICAL_ENTITIES, PhysicalEntity } from '@/data/physicalGeoData';

interface PhysicalGeoGameProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

type CategoryFilter = 'all' | 'mountain' | 'lake' | 'river' | 'plain';

export const PhysicalGeoGame: React.FC<PhysicalGeoGameProps> = ({ isDark, onToggleTheme }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [pool, setPool] = useState<PhysicalEntity[]>([]);
  const [currentEntity, setCurrentEntity] = useState<PhysicalEntity | null>(null);

  const [attempts, setAttempts] = useState<number>(0);
  const [solvedEntities, setSolvedEntities] = useState<
    Record<string, { status: 'green' | 'yellow' | 'orange' | 'darkred'; entity: PhysicalEntity }>
  >({});
  const [flashingEntityId, setFlashingEntityId] = useState<string | null>(null);
  const [wrongClickName, setWrongClickName] = useState<string | null>(null);

  const [score, setScore] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const initGame = useCallback((cat: CategoryFilter) => {
    let list = PHYSICAL_ENTITIES;
    if (cat !== 'all') {
      list = PHYSICAL_ENTITIES.filter((item) => item.category === cat);
    }
    const shuffled = [...list].sort(() => Math.random() - 0.5);

    setPool(shuffled);
    setCurrentEntity(shuffled[0] || null);
    setAttempts(0);
    setSolvedEntities({});
    setFlashingEntityId(null);
    setWrongClickName(null);
    setScore(0);
    setTimerSeconds(0);
    setIsTimerRunning(true);
    setIsCompleted(false);
  }, []);

  useEffect(() => {
    initGame(selectedCategory);
  }, [selectedCategory, initGame]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && !isCompleted) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isCompleted]);

  // Fiziki unsura tıklama (Seterra mekaniği)
  const handleEntityClick = (entity: PhysicalEntity) => {
    if (isCompleted || !currentEntity) return;

    if (flashingEntityId === currentEntity.id) {
      setFlashingEntityId(null);
      advanceNext();
      return;
    }

    if (entity.id === currentEntity.id) {
      let status: 'green' | 'yellow' | 'orange' = 'green';
      let pts = 100;
      if (attempts === 1) {
        status = 'yellow';
        pts = 60;
      } else if (attempts >= 2) {
        status = 'orange';
        pts = 30;
      }

      setScore((prev) => prev + pts);
      setSolvedEntities((prev) => ({
        ...prev,
        [currentEntity.id]: { status, entity: currentEntity },
      }));
      advanceNext();
    } else {
      const nextAtt = attempts + 1;
      setAttempts(nextAtt);
      setWrongClickName(entity.name);
      setTimeout(() => setWrongClickName(null), 1100);

      if (nextAtt >= 3) {
        setSolvedEntities((prev) => ({
          ...prev,
          [currentEntity.id]: { status: 'darkred', entity: currentEntity },
        }));
        setFlashingEntityId(currentEntity.id);
      }
    }
  };

  const advanceNext = () => {
    setAttempts(0);
    const nextList = pool.slice(1);
    setPool(nextList);
    if (nextList.length > 0) {
      setCurrentEntity(nextList[0]);
    } else {
      setIsCompleted(true);
      setIsTimerRunning(false);
      setCurrentEntity(null);
    }
  };

  const formattedTime = `${Math.floor(timerSeconds / 60)
    .toString()
    .padStart(2, '0')}:${(timerSeconds % 60).toString().padStart(2, '0')}`;

  const currentCategoryFeatures =
    selectedCategory === 'all'
      ? PHYSICAL_ENTITIES
      : PHYSICAL_ENTITIES.filter((f) => f.category === selectedCategory);

  const solvedCount = currentCategoryFeatures.length - pool.length;

  return (
    <div className="w-full flex flex-col gap-2.5">
      {/* Kategori Filtresi */}
      <div className="w-full overflow-x-auto pb-1 scrollbar-none">
        <div className={`inline-flex items-center gap-1 p-1 rounded-lg border ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          {[
            { id: 'all', label: 'Tüm Unsurlar' },
            { id: 'mountain', label: '▲ Dağlar' },
            { id: 'lake', label: '● Göller' },
            { id: 'river', label: '〜 Nehirler' },
            { id: 'plain', label: '◼ Ovalar & Deltalar' },
          ].map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as CategoryFilter)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? isDark
                      ? 'bg-slate-100 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-900 text-white font-bold shadow-sm'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Seterra Başlık & Skor Çubuğu */}
      <div className={`p-4 rounded-xl border transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className={`text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {currentEntity ? currentEntity.categoryLabel : 'Sonuç'}:
            </span>
            {currentEntity ? (
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-2xl sm:text-4xl font-black tracking-tight text-emerald-500">
                  {currentEntity.name}
                </span>
                {currentEntity.elevationOrLength && (
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {currentEntity.elevationOrLength}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-500">
                Tüm Fiziki Unsurlar Bulundu! 🎉
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <div className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs sm:text-sm font-semibold ${
              isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <span className="text-[10px] uppercase font-sans font-medium text-slate-500 mr-1.5">Kalan</span>
              {solvedCount} / {currentCategoryFeatures.length}
            </div>

            <div className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs sm:text-sm font-semibold ${
              isDark ? 'bg-slate-950 border-slate-800 text-emerald-400' : 'bg-slate-50 border-slate-200 text-emerald-600'
            }`}>
              <span className="text-[10px] uppercase font-sans font-medium text-slate-500 mr-1.5">Puan</span>
              {score}
            </div>

            <div className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs sm:text-sm font-semibold ${
              isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              {formattedTime}
            </div>

            <button
              onClick={() => initGame(selectedCategory)}
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

      {/* Seterra Tarzı Gerçek Fiziki Harita */}
      <div className={`relative w-full aspect-[1100/540] ${
        isDark ? 'bg-[#090d14]' : 'bg-[#95bfdf]'
      } rounded-xl border ${
        isDark ? 'border-slate-800' : 'border-slate-300'
      } overflow-hidden flex items-center justify-center select-none shadow-sm transition-colors`}>
        <svg
          viewBox="0 0 1100 540"
          className="w-full h-full select-none"
          style={{ touchAction: 'manipulation' }}
        >
          {/* Deniz İsimleri */}
          <text x="560" y="55" className={`text-[13px] font-bold tracking-[0.3em] ${isDark ? 'fill-slate-700/40' : 'fill-[#628db3]'} pointer-events-none`} textAnchor="middle">
            KARADENİZ
          </text>
          <text x="440" y="515" className={`text-[13px] font-bold tracking-[0.3em] ${isDark ? 'fill-slate-700/40' : 'fill-[#628db3]'} pointer-events-none`} textAnchor="middle">
            AKDENİZ
          </text>
          <text x="110" y="360" className={`text-[12px] font-bold tracking-[0.25em] ${isDark ? 'fill-slate-700/40' : 'fill-[#628db3]'} pointer-events-none`} textAnchor="middle">
            EGE DENİZİ
          </text>

          {/* Komşu Ülkeler */}
          <g className="pointer-events-none">
            {NEIGHBOR_COUNTRIES.map((neighbor) => (
              <path
                key={neighbor.id}
                d={neighbor.path}
                className={`${isDark ? 'fill-[#12161f] stroke-[#1a202c]' : 'fill-[#c0d3e2] stroke-[#8ea5bc]'} stroke-[0.8]`}
              />
            ))}
          </g>

          {/* Türkiye Sınırları & İlleri (Seterra açık gri/bej altlık) */}
          <g className="pointer-events-none">
            {PROVINCES.map((prov) => (
              <path
                key={prov.id}
                d={prov.path}
                className={`${
                  isDark
                    ? 'fill-[#17202d] stroke-[#243042] stroke-[0.6]'
                    : 'fill-[#ffffff] stroke-[#cbd5e1] stroke-[0.6]'
                }`}
              />
            ))}
          </g>

          {/* ================= 1. GÖLLER (Poligonlar) ================= */}
          <g>
            {PHYSICAL_ENTITIES.filter((f) => f.category === 'lake').map((lake) => {
              const solved = solvedEntities[lake.id];
              const isFlashing = flashingEntityId === lake.id;

              let fill = isDark ? '#1e3a8a' : '#38bdf8';
              let stroke = isDark ? '#3b82f6' : '#0284c7';

              if (solved) {
                if (solved.status === 'green') fill = '#10b981';
                else if (solved.status === 'yellow') fill = '#f59e0b';
                else if (solved.status === 'orange') fill = '#f97316';
                else fill = '#dc2626';
                stroke = '#000000';
              } else if (isFlashing) {
                fill = '#ef4444';
                stroke = '#ffffff';
              }

              return (
                <path
                  key={lake.id}
                  d={lake.pathData!}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={isFlashing ? 2.5 : 1}
                  className={`cursor-pointer transition-all hover:brightness-110 ${isFlashing ? 'animate-pulse' : ''}`}
                  onClick={() => handleEntityClick(lake)}
                />
              );
            })}
          </g>

          {/* ================= 2. NEHİRLER (Çizgiler) ================= */}
          <g>
            {PHYSICAL_ENTITIES.filter((f) => f.category === 'river').map((river) => {
              const solved = solvedEntities[river.id];
              const isFlashing = flashingEntityId === river.id;

              let strokeColor = isDark ? '#60a5fa' : '#0284c7';
              if (solved) {
                if (solved.status === 'green') strokeColor = '#10b981';
                else if (solved.status === 'yellow') strokeColor = '#f59e0b';
                else if (solved.status === 'orange') strokeColor = '#f97316';
                else strokeColor = '#dc2626';
              } else if (isFlashing) {
                strokeColor = '#ef4444';
              }

              return (
                <g key={river.id} className="cursor-pointer" onClick={() => handleEntityClick(river)}>
                  {/* Geniş tıklama alanı */}
                  <path
                    d={river.pathData!}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="18"
                  />
                  {/* Nehir çizgisi */}
                  <path
                    d={river.pathData!}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={solved || isFlashing ? 4 : 2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-all ${isFlashing ? 'animate-pulse' : ''}`}
                  />
                </g>
              );
            })}
          </g>

          {/* ================= 3. DAĞLAR (Seterra Zirve Noktaları) ================= */}
          <g>
            {PHYSICAL_ENTITIES.filter((f) => f.category === 'mountain').map((mnt) => {
              const solved = solvedEntities[mnt.id];
              const isFlashing = flashingEntityId === mnt.id;

              let color = isDark ? '#d97706' : '#92400e';
              if (solved) {
                if (solved.status === 'green') color = '#10b981';
                else if (solved.status === 'yellow') color = '#f59e0b';
                else if (solved.status === 'orange') color = '#f97316';
                else color = '#dc2626';
              } else if (isFlashing) {
                color = '#ef4444';
              }

              const [cx, cy] = mnt.center;
              const triangle = `M ${cx} ${cy - 10} L ${cx - 8} ${cy + 5} L ${cx + 8} ${cy + 5} Z`;

              return (
                <g
                  key={mnt.id}
                  className={`cursor-pointer transition-transform hover:scale-125 ${isFlashing ? 'animate-pulse' : ''}`}
                  onClick={() => handleEntityClick(mnt)}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                >
                  {/* Tıklama alanı genişletici */}
                  <circle cx={cx} cy={cy} r={14} fill="transparent" />
                  <path
                    d={triangle}
                    fill={color}
                    stroke="#000000"
                    strokeWidth="1.2"
                  />
                  {/* Zirve karı */}
                  <path
                    d={`M ${cx} ${cy - 10} L ${cx - 3.5} ${cy - 3} L ${cx + 3.5} ${cy - 3} Z`}
                    fill="#ffffff"
                  />
                </g>
              );
            })}
          </g>

          {/* ================= 4. OVALAR & DELTALAR (Seterra Kare/Kare Noktaları) ================= */}
          <g>
            {PHYSICAL_ENTITIES.filter((f) => f.category === 'plain').map((plain) => {
              const solved = solvedEntities[plain.id];
              const isFlashing = flashingEntityId === plain.id;

              let color = isDark ? '#84cc16' : '#4d7c0f';
              if (solved) {
                if (solved.status === 'green') color = '#10b981';
                else if (solved.status === 'yellow') color = '#f59e0b';
                else if (solved.status === 'orange') color = '#f97316';
                else color = '#dc2626';
              } else if (isFlashing) {
                color = '#ef4444';
              }

              const [cx, cy] = plain.center;

              return (
                <g
                  key={plain.id}
                  className={`cursor-pointer transition-transform hover:scale-125 ${isFlashing ? 'animate-pulse' : ''}`}
                  onClick={() => handleEntityClick(plain)}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                >
                  {/* Tıklama alanı */}
                  <circle cx={cx} cy={cy} r={14} fill="transparent" />
                  <rect
                    x={cx - 5.5}
                    y={cy - 5.5}
                    width={11}
                    height={11}
                    transform={`rotate(45 ${cx} ${cy})`}
                    fill={color}
                    stroke="#000000"
                    strokeWidth="1.2"
                  />
                </g>
              );
            })}
          </g>

          {/* ================= 5. ÇÖZÜLEN UNSURLARIN KALICI İSİMLERİ ================= */}
          <g className="pointer-events-none select-none">
            {Object.values(solvedEntities).map(({ entity }) => {
              return (
                <text
                  key={`label-${entity.id}`}
                  x={entity.center[0]}
                  y={entity.center[1] - 10}
                  textAnchor="middle"
                  fill={isDark ? '#ffffff' : '#0f172a'}
                  stroke={isDark ? '#000000' : '#ffffff'}
                  strokeWidth={2.5}
                  paintOrder="stroke"
                  strokeLinejoin="round"
                  className="text-[10px] font-black tracking-tight pointer-events-none select-none"
                >
                  {entity.name}
                </text>
              );
            })}
          </g>

          {/* ================= 6. YANLIŞ TIKLANAN UNSURUN HARİTADA YANIP SÖNMESİ ================= */}
          {wrongClickName && (
            <g className="pointer-events-none select-none">
              <text
                x="550"
                y="40"
                textAnchor="middle"
                fill="#dc2626"
                stroke={isDark ? '#000000' : '#ffffff'}
                strokeWidth={3.5}
                paintOrder="stroke"
                className="text-[14px] font-black tracking-wider uppercase"
              >
                ✕ {wrongClickName} tıklandı!
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

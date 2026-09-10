'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { PROVINCES, Province } from '@/data/provincesData';
import { NEIGHBOR_COUNTRIES } from '@/data/neighborsData';
import { TURKEY_LAKES } from '@/data/lakesData';
import { FAMOUS_DISTRICTS, FamousDistrict } from '@/data/districtsData';
import { TURKEY_DISTRICTS_BY_PROVINCE, DistrictFeature } from '@/data/districtsFullData';

interface DistrictsGameProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onBackToHome?: () => void;
}

type SubMode = 'famous' | 'by_city';

export const DistrictsGame: React.FC<DistrictsGameProps> = ({ isDark, onToggleTheme, onBackToHome }) => {
  const [subMode, setSubMode] = useState<SubMode>('famous');

  // ================= 1. MEŞHUR İLÇELER DURUMLARI =================
  const [districtPool, setDistrictPool] = useState<FamousDistrict[]>([]);
  const [currentDistrict, setCurrentDistrict] = useState<FamousDistrict | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  const [solvedMap, setSolvedMap] = useState<
    Record<string, { status: 'green' | 'yellow' | 'orange' | 'darkred'; district: FamousDistrict }>
  >({});
  const [flashingDistrictId, setFlashingDistrictId] = useState<string | null>(null);
  const [wrongClickProvince, setWrongClickProvince] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [activeFact, setActiveFact] = useState<FamousDistrict | null>(null);

  // ================= 2. ŞEHİR SEÇİP İLÇELERİNİ HARİTADAN TIKLAYARAK BİLME =================
  const [selectedCityName, setSelectedCityName] = useState<string>('İstanbul');
  const [cityDistrictPool, setCityDistrictPool] = useState<DistrictFeature[]>([]);
  const [currentCityDistrictTarget, setCurrentCityDistrictTarget] = useState<DistrictFeature | null>(null);
  const [cityAttempts, setCityAttempts] = useState<number>(0);
  const [solvedCityDistrictsMap, setSolvedCityDistrictsMap] = useState<
    Record<string, { status: 'green' | 'yellow' | 'orange' | 'darkred'; name: string }>
  >({});
  const [flashingCityDistrictId, setFlashingCityDistrictId] = useState<string | null>(null);
  const [wrongCityDistrictClick, setWrongCityDistrictClick] = useState<string | null>(null);
  const [cityScore, setCityScore] = useState<number>(0);
  const [isCityCompleted, setIsCityCompleted] = useState<boolean>(false);

  // Meşhur ilçeler testini başlat
  const initFamousGame = useCallback(() => {
    const shuffled = [...FAMOUS_DISTRICTS].sort(() => Math.random() - 0.5);
    setDistrictPool(shuffled);
    setCurrentDistrict(shuffled[0] || null);
    setAttempts(0);
    setSolvedMap({});
    setFlashingDistrictId(null);
    setWrongClickProvince(null);
    setScore(0);
    setIsCompleted(false);
    setActiveFact(null);
  }, []);

  // Şehir ilçe testini başlat (Gerçek vektör haritası)
  const initCityGame = useCallback((cityName: string) => {
    const cityData = TURKEY_DISTRICTS_BY_PROVINCE[cityName];
    if (cityData && cityData.districts.length > 0) {
      const shuffled = [...cityData.districts].sort(() => Math.random() - 0.5);
      setCityDistrictPool(shuffled);
      setCurrentCityDistrictTarget(shuffled[0] || null);
      setCityAttempts(0);
      setSolvedCityDistrictsMap({});
      setFlashingCityDistrictId(null);
      setWrongCityDistrictClick(null);
      setCityScore(0);
      setIsCityCompleted(false);
    }
  }, []);

  useEffect(() => {
    if (subMode === 'famous') {
      initFamousGame();
    } else {
      initCityGame(selectedCityName);
    }
  }, [subMode, selectedCityName, initFamousGame, initCityGame]);

  // Meşhur ilçe harita tıklaması
  const handleProvinceClick = (prov: Province) => {
    if (isCompleted || !currentDistrict) return;

    const isCorrect = prov.name.toLocaleLowerCase('tr-TR') === currentDistrict.provinceName.toLocaleLowerCase('tr-TR');

    if (flashingDistrictId === currentDistrict.id) {
      setFlashingDistrictId(null);
      setActiveFact(currentDistrict);
      advanceNextFamous();
      return;
    }

    if (isCorrect) {
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
      setSolvedMap((prev) => ({
        ...prev,
        [currentDistrict.id]: { status, district: currentDistrict },
      }));
      setActiveFact(currentDistrict);
      advanceNextFamous();
    } else {
      const nextAtt = attempts + 1;
      setAttempts(nextAtt);
      setWrongClickProvince(prov.name);
      setTimeout(() => setWrongClickProvince(null), 1000);

      if (nextAtt >= 3) {
        setSolvedMap((prev) => ({
          ...prev,
          [currentDistrict.id]: { status: 'darkred', district: currentDistrict },
        }));
        setFlashingDistrictId(currentDistrict.id);
      }
    }
  };

  const advanceNextFamous = () => {
    setAttempts(0);
    const nextList = districtPool.slice(1);
    setDistrictPool(nextList);
    if (nextList.length > 0) {
      setCurrentDistrict(nextList[0]);
    } else {
      setIsCompleted(true);
      setCurrentDistrict(null);
    }
  };

  // Şehir haritasında ilçeye doğrudan tıklama (Seterra ilçe modu)
  const handleDistrictMapClick = (dist: DistrictFeature) => {
    if (isCityCompleted || !currentCityDistrictTarget) return;

    if (flashingCityDistrictId === currentCityDistrictTarget.id) {
      setFlashingCityDistrictId(null);
      advanceNextCityDistrict();
      return;
    }

    if (dist.id === currentCityDistrictTarget.id) {
      let status: 'green' | 'yellow' | 'orange' = 'green';
      let pts = 100;
      if (cityAttempts === 1) pts = 60;
      else if (cityAttempts >= 2) pts = 30;

      setCityScore((prev) => prev + pts);
      setSolvedCityDistrictsMap((prev) => ({
        ...prev,
        [dist.id]: { status, name: dist.name },
      }));
      advanceNextCityDistrict();
    } else {
      const nextAtt = cityAttempts + 1;
      setCityAttempts(nextAtt);
      setWrongCityDistrictClick(dist.name);
      setTimeout(() => setWrongCityDistrictClick(null), 1100);

      if (nextAtt >= 3) {
        setSolvedCityDistrictsMap((prev) => ({
          ...prev,
          [currentCityDistrictTarget.id]: { status: 'darkred', name: currentCityDistrictTarget.name },
        }));
        setFlashingCityDistrictId(currentCityDistrictTarget.id);
      }
    }
  };

  const advanceNextCityDistrict = () => {
    setCityAttempts(0);
    const nextList = cityDistrictPool.slice(1);
    setCityDistrictPool(nextList);
    if (nextList.length > 0) {
      setCurrentCityDistrictTarget(nextList[0]);
    } else {
      setIsCityCompleted(true);
      setCurrentCityDistrictTarget(null);
    }
  };

  const currentCityMapData = TURKEY_DISTRICTS_BY_PROVINCE[selectedCityName] || TURKEY_DISTRICTS_BY_PROVINCE['İstanbul'];
  const solvedCityCount = currentCityMapData.districts.length - cityDistrictPool.length;

  return (
    <div className="w-full flex flex-col gap-2.5">
      {/* Üst Çubuk: Mod Seçici & Şehir Değiştirici */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white' : 'bg-white border-slate-300 text-slate-700 hover:text-black'
              }`}
            >
              ← Ana Sayfa
            </button>
          )}

          <div className={`inline-flex p-1 rounded-lg border ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-200 border-slate-300'
          }`}>
            <button
              onClick={() => setSubMode('famous')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                subMode === 'famous'
                  ? isDark
                    ? 'bg-slate-100 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-900 text-white font-bold shadow-sm'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Meşhur İlçeler (Türkiye)
            </button>

            <button
              onClick={() => setSubMode('by_city')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                subMode === 'by_city'
                  ? isDark
                    ? 'bg-slate-100 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-900 text-white font-bold shadow-sm'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              İl Seç ve İlçelerini Bul
            </button>
          </div>
        </div>

        {subMode === 'by_city' && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-slate-500">Şehir:</span>
            {['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa', 'Adana', 'Konya', 'Trabzon', 'Diyarbakır'].map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCityName(c)}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                  selectedCityName === c
                    ? 'bg-blue-600 text-white shadow-sm'
                    : isDark
                    ? 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ================= MOD 1: MEŞHUR İLÇELER ================= */}
      {subMode === 'famous' && (
        <>
          <div className={`p-4 rounded-xl border transition-colors ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
          }`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Hangi İlde?:
                </span>
                {currentDistrict ? (
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black tracking-tight text-blue-500">
                      {currentDistrict.name}
                    </span>
                    <span className={`text-xs font-medium italic ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      — {currentDistrict.hint}
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-500">
                    Tüm İlçeler Tamamlandı
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 sm:gap-3 ml-auto">
                <div className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs sm:text-sm font-semibold ${
                  isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  <span className="text-[10px] uppercase font-sans font-medium text-slate-500 mr-1.5">Kalan</span>
                  {FAMOUS_DISTRICTS.length - districtPool.length} / {FAMOUS_DISTRICTS.length}
                </div>

                <div className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs sm:text-sm font-semibold ${
                  isDark ? 'bg-slate-950 border-slate-800 text-emerald-400' : 'bg-slate-50 border-slate-200 text-emerald-600'
                }`}>
                  <span className="text-[10px] uppercase font-sans font-medium text-slate-500 mr-1.5">Puan</span>
                  {score}
                </div>

                <button
                  onClick={initFamousGame}
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

            {/* Bilgi Kartı: Net kontrastlı ve okunaklı */}
            {activeFact && (
              <div className={`mt-3 p-3.5 rounded-xl border flex items-center justify-between gap-3 shadow-sm transition-all ${
                isDark
                  ? 'bg-slate-950 border-blue-600 text-slate-100'
                  : 'bg-blue-50/90 border-blue-300 text-slate-900'
              }`}>
                <div className="flex items-center gap-2.5 text-sm">
                  <div>
                    <strong className={`font-black ${isDark ? 'text-blue-400' : 'text-blue-800'}`}>
                      {activeFact.name} ({activeFact.provinceName}):
                    </strong>{' '}
                    <span className="font-medium leading-relaxed">
                      {activeFact.fact}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveFact(null)}
                  className={`p-1 px-2.5 rounded-lg text-xs font-bold transition-colors ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-300'
                  }`}
                >
                  Kapat
                </button>
              </div>
            )}
          </div>

          {/* Türkiye Haritası */}
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

              <g>
                {PROVINCES.map((prov) => {
                  const isWrong = wrongClickProvince === prov.name;
                  const isFlashing = flashingDistrictId && currentDistrict && prov.name === currentDistrict.provinceName;

                  let fillClass = isDark
                    ? 'fill-[#1c2432] hover:fill-[#263245] stroke-[#2d394d] stroke-[0.8] cursor-pointer'
                    : 'fill-[#ffffff] hover:fill-[#eef2f6] stroke-[#64748b] stroke-[0.8] cursor-pointer';

                  if (isFlashing) {
                    fillClass = 'fill-red-600 animate-pulse stroke-white stroke-[2] cursor-pointer';
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

              <g className="pointer-events-none select-none">
                {Object.values(solvedMap).map(({ district, status }) => {
                  const prov = PROVINCES.find((p) => p.name === district.provinceName);
                  if (!prov) return null;

                  return (
                    <g key={`badge-${district.id}`}>
                      <circle
                        cx={prov.center[0]}
                        cy={prov.center[1]}
                        r={status === 'green' ? 4.5 : 4}
                        fill={status === 'green' ? '#10b981' : status === 'yellow' ? '#f59e0b' : '#dc2626'}
                        stroke="#ffffff"
                        strokeWidth="1.2"
                      />
                      <text
                        x={prov.center[0]}
                        y={prov.center[1] - 7}
                        textAnchor="middle"
                        fill={isDark ? '#ffffff' : '#0f172a'}
                        stroke={isDark ? '#000000' : '#ffffff'}
                        strokeWidth={2.5}
                        paintOrder="stroke"
                        strokeLinejoin="round"
                        className="text-[9.5px] font-black tracking-tight"
                      >
                        {district.name}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>
        </>
      )}

      {/* ================= MOD 2: ŞEHİR SEÇİP İLÇELERİ TIKLAYARAK BULMA (GERÇEK SINIRLARLA) ================= */}
      {subMode === 'by_city' && (
        <>
          <div className={`p-4 rounded-xl border transition-colors ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
          }`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {selectedCityName} İlçesi:
                </span>
                {currentCityDistrictTarget ? (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl sm:text-3xl font-black tracking-tight text-blue-500">
                      {currentCityDistrictTarget.name}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      Haritada tıkla
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-500">
                    {selectedCityName} İlçeleri Tamamlandı
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 sm:gap-3 ml-auto">
                <div className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs sm:text-sm font-semibold ${
                  isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  <span className="text-[10px] uppercase font-sans font-medium text-slate-500 mr-1.5">Kalan</span>
                  {solvedCityCount} / {currentCityMapData.districts.length}
                </div>

                <div className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs sm:text-sm font-semibold ${
                  isDark ? 'bg-slate-950 border-slate-800 text-emerald-400' : 'bg-slate-50 border-slate-200 text-emerald-600'
                }`}>
                  <span className="text-[10px] uppercase font-sans font-medium text-slate-500 mr-1.5">Puan</span>
                  {cityScore}
                </div>

                <button
                  onClick={() => initCityGame(selectedCityName)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                      : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                  }`}
                >
                  Yeniden Başlat
                </button>
              </div>
            </div>
          </div>

          {/* Şehrin İlçeler Haritası (Seterra İller Haritası Gibi Vektör Sınırlarıyla) */}
          <div className={`relative w-full aspect-[800/550] ${
            isDark ? 'bg-[#090d14]' : 'bg-[#eef4f8]'
          } rounded-xl border ${
            isDark ? 'border-slate-800' : 'border-slate-300'
          } overflow-hidden flex items-center justify-center select-none shadow-sm transition-colors`}>
            <svg
              viewBox={currentCityMapData.viewBox || '0 0 800 600'}
              className="w-full h-full select-none"
              style={{ touchAction: 'manipulation' }}
            >
              <g>
                {currentCityMapData.districts.map((dist) => {
                  const solved = solvedCityDistrictsMap[dist.id];
                  const isWrong = wrongCityDistrictClick === dist.name;
                  const isFlashing = flashingCityDistrictId === dist.id;

                  let fillClass = isDark
                    ? 'fill-[#1c2432] hover:fill-[#2a364a] stroke-[#38475e] stroke-[1] cursor-pointer'
                    : 'fill-[#ffffff] hover:fill-[#f1f5f9] stroke-[#64748b] stroke-[1] cursor-pointer';

                  if (solved) {
                    if (solved.status === 'green') fillClass = 'fill-emerald-500 stroke-slate-900 stroke-[1]';
                    else if (solved.status === 'yellow') fillClass = 'fill-yellow-400 stroke-slate-900 stroke-[1]';
                    else if (solved.status === 'orange') fillClass = 'fill-orange-500 stroke-slate-900 stroke-[1]';
                    else fillClass = 'fill-red-700 stroke-slate-900 stroke-[1]';
                  } else if (isFlashing) {
                    fillClass = 'fill-red-600 animate-pulse stroke-white stroke-[2] cursor-pointer';
                  } else if (isWrong) {
                    fillClass = 'fill-red-600 stroke-red-300 stroke-[1.5]';
                  }

                  return (
                    <path
                      key={dist.id}
                      d={dist.path}
                      className={`transition-colors duration-75 ${fillClass}`}
                      onClick={() => handleDistrictMapClick(dist)}
                    />
                  );
                })}
              </g>

              {/* Çözülen İlçelerin Kalıcı İsimleri */}
              <g className="pointer-events-none select-none">
                {Object.entries(solvedCityDistrictsMap).map(([distId, info]) => {
                  const distObj = currentCityMapData.districts.find((d) => d.id === distId);
                  if (!distObj) return null;

                  return (
                    <text
                      key={`label-${distId}`}
                      x={distObj.center[0]}
                      y={distObj.center[1]}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill={isDark ? '#ffffff' : '#0f172a'}
                      stroke={isDark ? '#000000' : '#ffffff'}
                      strokeWidth={2.5}
                      paintOrder="stroke"
                      strokeLinejoin="round"
                      className="text-[11px] font-bold tracking-tight pointer-events-none select-none"
                    >
                      {info.name}
                    </text>
                  );
                })}
              </g>

              {/* Yanlış Tıklanan İlçe Yanıp Sönmesi */}
              {wrongCityDistrictClick && (
                <g className="pointer-events-none select-none">
                  <text
                    x="400"
                    y="35"
                    textAnchor="middle"
                    fill="#dc2626"
                    stroke={isDark ? '#000000' : '#ffffff'}
                    strokeWidth={3}
                    paintOrder="stroke"
                    className="text-[14px] font-black tracking-wider uppercase"
                  >
                    {wrongCityDistrictClick} değil
                  </text>
                </g>
              )}
            </svg>
          </div>
        </>
      )}
    </div>
  );
};

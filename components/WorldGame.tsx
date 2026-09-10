'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

interface WorldGameProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onBackToHome?: () => void;
}

type WorldCategory =
  | 'europe'
  | 'turkey_neighbors'
  | 'balkans'
  | 'middle_east'
  | 'north_africa'
  | 'south_america'
  | 'major_powers'
  | 'asia'
  | 'africa'
  | 'americas'
  | 'all';

interface CountryItem {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  center: [number, number];
}

const REGIONAL_MEMBERS: Record<string, string[]> = {
  north_africa: ['Fas', 'Cezayir', 'Tunus', 'Libya', 'Mısır'],
  turkey_neighbors: ['Yunanistan', 'Bulgaristan', 'Gürcistan', 'Ermenistan', 'Azerbaycan', 'İran', 'Irak', 'Suriye'],
  balkans: ['Yunanistan', 'Bulgaristan', 'Kuzey Makedonya', 'Arnavutluk', 'Kosova', 'Karadağ', 'Bosna-Hersek', 'Hırvatistan', 'Slovenya', 'Romanya', 'Sırbistan'],
  middle_east: ['Türkiye', 'Suriye', 'Lübnan', 'İsrail', 'Ürdün', 'Irak', 'İran', 'Suudi Arabistan', 'Kuveyt', 'Birleşik Arap Emirlikleri', 'Katar', 'Umman', 'Yemen', 'Bahreyn'],
  south_america: ['Brezilya', 'Arjantin', 'Kolombiya', 'Peru', 'Şili', 'Ekvador', 'Bolivya', 'Paraguay', 'Uruguay', 'Venezuela', 'Guyana', 'Surinam'],
  major_powers: ['Amerika Birleşik Devletleri', 'Çin', 'Almanya', 'Birleşik Krallık', 'Fransa', 'İtalya', 'Japonya', 'Kanada', 'Hindistan', 'Rusya', 'Brezilya'],
};

const CATEGORY_BOUNDS: Record<WorldCategory, [[number, number], [number, number]]> = {
  europe: [[34, -12], [71, 45]],
  turkey_neighbors: [[29, 19], [44, 52]],
  balkans: [[35, 13], [48, 30]],
  middle_east: [[12, 32], [42, 63]],
  north_africa: [[15, -18], [38, 36]],
  south_america: [[-56, -82], [13, -34]],
  major_powers: [[-45, -130], [70, 145]],
  asia: [[0, 40], [60, 145]],
  africa: [[-36, -20], [38, 55]],
  americas: [[-56, -170], [72, -30]],
  all: [[-55, -165], [75, 175]],
};

export const WorldGame: React.FC<WorldGameProps> = ({ isDark, onToggleTheme, onBackToHome }) => {
  const [selectedCategory, setSelectedCategory] = useState<WorldCategory>('europe');
  const [allCountries, setAllCountries] = useState<CountryItem[]>([]);
  const [remainingCountries, setRemainingCountries] = useState<CountryItem[]>([]);
  const [currentTarget, setCurrentTarget] = useState<CountryItem | null>(null);

  const [attempts, setAttempts] = useState<number>(0);
  const [solvedStatuses, setSolvedStatuses] = useState<
    Record<string, 'green' | 'yellow' | 'orange' | 'darkred'>
  >({});
  const [flashingCountryId, setFlashingCountryId] = useState<string | null>(null);

  const [stats, setStats] = useState({
    firstTry: 0,
    secondTry: 0,
    thirdTry: 0,
    failed: 0,
    total: 0,
  });

  const [score, setScore] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // REFS for keeping fresh state inside Leaflet event handlers (prevent stale closures)
  const currentTargetRef = useRef<CountryItem | null>(null);
  const selectedCategoryRef = useRef<WorldCategory>('europe');
  const attemptsRef = useRef<number>(0);
  const flashingCountryIdRef = useRef<string | null>(null);
  const isCompletedRef = useRef<boolean>(false);
  const onFeatureClickRef = useRef<any>(null);

  useEffect(() => { currentTargetRef.current = currentTarget; }, [currentTarget]);
  useEffect(() => { selectedCategoryRef.current = selectedCategory; }, [selectedCategory]);
  useEffect(() => { attemptsRef.current = attempts; }, [attempts]);
  useEffect(() => { flashingCountryIdRef.current = flashingCountryId; }, [flashingCountryId]);
  useEffect(() => { isCompletedRef.current = isCompleted; }, [isCompleted]);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<any>(null);
  const geoJsonLayerRef = useRef<any>(null);
  const rawGeoDataRef = useRef<any>(null);
  const countryLayersRef = useRef<Record<string, any>>({});
  const flashIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const popupTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Kategoriye ait olup olmadığını kontrol eden yardımcı fonksiyon
  const isMemberOfCategory = useCallback(
    (featOrItem: any, cat: WorldCategory) => {
      const name = featOrItem.properties ? featOrItem.properties.name : featOrItem.name;
      const category = featOrItem.properties ? featOrItem.properties.category : featOrItem.category;

      if (cat === 'all') return true;
      if (REGIONAL_MEMBERS[cat]) {
        return REGIONAL_MEMBERS[cat].includes(name);
      }
      return category === cat;
    },
    []
  );

  // Renk ve stil hesaplayıcı
  const getFeatureStyle = useCallback(
    (feat: any, cat: WorldCategory, dark: boolean, solvedStatus?: string, isFlashing?: boolean) => {
      const isMember = isMemberOfCategory(feat, cat);

      if (!isMember) {
        return {
          fillColor: dark ? '#141a24' : '#dbe3eb',
          fillOpacity: 0.35,
          color: dark ? '#1e293b' : '#cbd5e1',
          weight: 0.5,
          cursor: 'default',
        };
      }

      if (isFlashing) {
        return {
          fillColor: '#dc2626',
          fillOpacity: 0.95,
          color: '#ffffff',
          weight: 2,
          cursor: 'pointer',
        };
      }

      if (solvedStatus === 'green') {
        return {
          fillColor: '#10b981',
          fillOpacity: 0.85,
          color: dark ? '#0f172a' : '#1e293b',
          weight: 1,
          cursor: 'default',
        };
      }
      if (solvedStatus === 'yellow') {
        return {
          fillColor: '#facc15',
          fillOpacity: 0.85,
          color: dark ? '#0f172a' : '#1e293b',
          weight: 1,
          cursor: 'default',
        };
      }
      if (solvedStatus === 'orange') {
        return {
          fillColor: '#f97316',
          fillOpacity: 0.85,
          color: dark ? '#0f172a' : '#1e293b',
          weight: 1,
          cursor: 'default',
        };
      }
      if (solvedStatus === 'darkred') {
        return {
          fillColor: '#b91c1c',
          fillOpacity: 0.85,
          color: dark ? '#0f172a' : '#1e293b',
          weight: 1,
          cursor: 'default',
        };
      }

      // Kategoriye dahil ve henüz bulunmamış ülke: Beyaz ve tıklanabilir
      return {
        fillColor: dark ? '#1e293b' : '#ffffff',
        fillOpacity: dark ? 0.9 : 0.95,
        color: dark ? '#334155' : '#475569',
        weight: 0.8,
        cursor: 'pointer',
      };
    },
    [isMemberOfCategory]
  );

  // Hedef Ülkeyi İlerlet
  const advanceToNext = useCallback(() => {
    setAttempts(0);
    setRemainingCountries((prev) => {
      const nextList = prev.slice(1);
      if (nextList.length > 0) {
        setCurrentTarget(nextList[0]);
      } else {
        setIsCompleted(true);
        setIsTimerRunning(false);
        setCurrentTarget(null);
      }
      return nextList;
    });
  }, []);

  // 3 Hata Sonrası Yanıp Sönme
  const startFlashing = useCallback((targetId: string) => {
    setFlashingCountryId(targetId);
    const layer = countryLayersRef.current[targetId];
    if (!layer) return;

    let isRed = true;
    if (flashIntervalRef.current) clearInterval(flashIntervalRef.current);

    flashIntervalRef.current = setInterval(() => {
      isRed = !isRed;
      layer.setStyle({
        fillColor: isRed ? '#dc2626' : '#facc15',
        fillOpacity: 0.95,
        color: isRed ? '#ffffff' : '#000000',
        weight: 2,
      });
    }, 350);
  }, []);

  const stopFlashing = useCallback((targetId: string) => {
    if (flashIntervalRef.current) {
      clearInterval(flashIntervalRef.current);
      flashIntervalRef.current = null;
    }
    setFlashingCountryId(null);
    const layer = countryLayersRef.current[targetId];
    if (layer) {
      layer.setStyle({
        fillColor: '#b91c1c',
        fillOpacity: 0.85,
        color: '#1e293b',
        weight: 1,
      });
    }
  }, []);

  // Tıklama Olayı (Ref tabanlı taze durum okuyucu - closure bug içermez)
  const handleCountryClick = useCallback(
    (feature: any, clickLatLng?: any) => {
      const currentCat = selectedCategoryRef.current;
      const target = currentTargetRef.current;
      const isComp = isCompletedRef.current;
      const flashId = flashingCountryIdRef.current;
      const currentAttempts = attemptsRef.current;

      if (isComp || !target) return;
      if (!isMemberOfCategory(feature, currentCat)) return;

      const clickedId = feature.properties.id;
      const clickedName = feature.properties.name;

      // Durum 1: 3 Hatada bilemedi, hedef ülke yanıp sönüyor
      if (flashId) {
        if (clickedId === flashId) {
          stopFlashing(flashId);
          setSolvedStatuses((prev) => ({ ...prev, [flashId]: 'darkred' }));
          setStats((prev) => ({ ...prev, failed: prev.failed + 1 }));
          advanceToNext();
        }
        return;
      }

      // Durum 2: Doğru Ülke Tıklandı
      if (clickedId === target.id) {
        let status: 'green' | 'yellow' | 'orange' = 'green';
        let pts = 100;

        if (currentAttempts === 0) {
          status = 'green';
          pts = 100;
          setStats((prev) => ({ ...prev, firstTry: prev.firstTry + 1 }));
        } else if (currentAttempts === 1) {
          status = 'yellow';
          pts = 66;
          setStats((prev) => ({ ...prev, secondTry: prev.secondTry + 1 }));
        } else {
          status = 'orange';
          pts = 33;
          setStats((prev) => ({ ...prev, thirdTry: prev.thirdTry + 1 }));
        }

        setScore((prev) => prev + pts);
        setSolvedStatuses((prev) => ({ ...prev, [clickedId]: status }));

        const layer = countryLayersRef.current[clickedId];
        if (layer) {
          const color = status === 'green' ? '#10b981' : status === 'yellow' ? '#facc15' : '#f97316';
          layer.setStyle({
            fillColor: color,
            fillOpacity: 0.85,
            color: '#1e293b',
            weight: 1,
          });
        }

        advanceToNext();
      } else {
        // Durum 3: Yanlış Ülke Tıklandı (Harita üzerinde transient etiket)
        if (leafletMapRef.current && clickLatLng) {
          import('leaflet').then((L) => {
            const popup = L.popup({
              closeButton: false,
              autoClose: true,
              closeOnClick: false,
              className: 'seterra-wrong-popup',
            })
              .setLatLng(clickLatLng)
              .setContent(
                `<div style="background:#dc2626; color:#ffffff; font-weight:900; font-size:11px; padding:4px 8px; border-radius:6px; box-shadow:0 3px 10px rgba(0,0,0,0.3); text-transform:uppercase; letter-spacing:0.05em; pointer-events:none;">${clickedName}</div>`
              )
              .openOn(leafletMapRef.current);

            if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
            popupTimerRef.current = setTimeout(() => {
              if (leafletMapRef.current) {
                leafletMapRef.current.closePopup(popup);
              }
            }, 1000);
          });
        }

        const nextAttempts = currentAttempts + 1;
        setAttempts(nextAttempts);

        if (nextAttempts >= 3) {
          startFlashing(target.id);
        }
      }
    },
    [isMemberOfCategory, stopFlashing, advanceToNext, startFlashing]
  );

  useEffect(() => {
    onFeatureClickRef.current = handleCountryClick;
  }, [handleCountryClick]);

  // GeoJSON Katmanını Kur (Sadece GeoJSON ve Map hazır olduğunda)
  const setupGeoJsonLayer = useCallback(
    (geoData: any) => {
      if (!leafletMapRef.current) return;

      import('leaflet').then((L) => {
        if (geoJsonLayerRef.current) {
          leafletMapRef.current.removeLayer(geoJsonLayerRef.current);
        }

        countryLayersRef.current = {};

        const layer = L.geoJSON(geoData, {
          style: (feat: any) => getFeatureStyle(feat, selectedCategoryRef.current, isDark),
          onEachFeature: (feat: any, l: any) => {
            const id = feat.properties.id;
            countryLayersRef.current[id] = l;

            l.on({
              click: (e: any) => {
                if (onFeatureClickRef.current) {
                  onFeatureClickRef.current(feat, e.latlng);
                }
              },
              mouseover: () => {
                if (isMemberOfCategory(feat, selectedCategoryRef.current)) {
                  l.setStyle({ weight: 1.8 });
                }
              },
              mouseout: () => {
                if (isMemberOfCategory(feat, selectedCategoryRef.current)) {
                  l.setStyle({ weight: 0.8 });
                }
              },
            });
          },
        }).addTo(leafletMapRef.current);

        geoJsonLayerRef.current = layer;
      });
    },
    [isDark, getFeatureStyle, isMemberOfCategory]
  );

  // 1. GeoJSON Yükle
  useEffect(() => {
    fetch('/world-geo.json')
      .then((res) => res.json())
      .then((geoData) => {
        rawGeoDataRef.current = geoData;
        const list: CountryItem[] = geoData.features.map((f: any) => ({
          id: f.properties.id,
          name: f.properties.name,
          nameEn: f.properties.nameEn,
          category: f.properties.category,
          center: f.properties.center || [0, 0],
        }));
        setAllCountries(list);

        if (leafletMapRef.current && !geoJsonLayerRef.current) {
          setupGeoJsonLayer(geoData);
        }
      });
  }, [setupGeoJsonLayer]);

  // 2. Leaflet Haritasını Başlat (Sadece 1 Kere)
  useEffect(() => {
    if (!mapContainerRef.current || leafletMapRef.current) return;

    let isMounted = true;

    import('leaflet').then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      const southWest = L.latLng(-65, -180);
      const northEast = L.latLng(82, 180);
      const maxBounds = L.latLngBounds(southWest, northEast);

      const map = L.map(mapContainerRef.current, {
        center: [52, 15],
        zoom: 4,
        minZoom: 2,
        maxZoom: 8,
        maxBounds: maxBounds,
        maxBoundsViscosity: 1.0,
        zoomControl: true,
        attributionControl: false,
      });

      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 16, noWrap: true }
      ).addTo(map);

      leafletMapRef.current = map;

      if (rawGeoDataRef.current && !geoJsonLayerRef.current) {
        setupGeoJsonLayer(rawGeoDataRef.current);
      }
    });

    return () => {
      isMounted = false;
      if (flashIntervalRef.current) clearInterval(flashIntervalRef.current);
      if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
        geoJsonLayerRef.current = null;
      }
    };
  }, [setupGeoJsonLayer]);

  // Tema veya Kategori Değiştiğinde Tüm Ülke Stillerini Güncelle
  useEffect(() => {
    if (!geoJsonLayerRef.current || !rawGeoDataRef.current) return;

    geoJsonLayerRef.current.eachLayer((l: any) => {
      const feat = l.feature;
      if (!feat) return;
      const id = feat.properties.id;
      const status = solvedStatuses[id];
      const isFlashing = flashingCountryId === id;
      l.setStyle(getFeatureStyle(feat, selectedCategory, isDark, status, isFlashing));
    });
  }, [isDark, selectedCategory, solvedStatuses, flashingCountryId, getFeatureStyle]);

  // Oyunu Başlat / Sıfırla
  const initGame = useCallback(
    (cat: WorldCategory) => {
      if (allCountries.length === 0) return;

      if (flashIntervalRef.current) {
        clearInterval(flashIntervalRef.current);
        flashIntervalRef.current = null;
      }

      const activeList = allCountries.filter((c) => isMemberOfCategory(c, cat));
      const shuffled = [...activeList].sort(() => Math.random() - 0.5);

      setRemainingCountries(shuffled);
      setCurrentTarget(shuffled[0] || null);
      setAttempts(0);
      setSolvedStatuses({});
      setFlashingCountryId(null);
      setScore(0);
      setTimerSeconds(0);
      setIsTimerRunning(true);
      setIsCompleted(false);
      setStats({
        firstTry: 0,
        secondTry: 0,
        thirdTry: 0,
        failed: 0,
        total: activeList.length,
      });

      // Harita bakışını kategori sınırlarına odakla
      if (leafletMapRef.current) {
        const bounds = CATEGORY_BOUNDS[cat];
        if (bounds) {
          leafletMapRef.current.fitBounds(bounds, { padding: [25, 25], maxZoom: 6, animate: true });
        }
      }
    },
    [allCountries, isMemberOfCategory]
  );

  useEffect(() => {
    if (allCountries.length > 0) {
      initGame(selectedCategory);
    }
  }, [selectedCategory, allCountries, initGame]);

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

  const activeCategoryList = allCountries.filter((c) => isMemberOfCategory(c, selectedCategory));
  const solvedCount = activeCategoryList.length - remainingCountries.length;

  const formattedTime = `${Math.floor(timerSeconds / 60)
    .toString()
    .padStart(2, '0')}:${(timerSeconds % 60).toString().padStart(2, '0')}`;

  const maxPossibleScore = stats.total * 100;
  const accuracy = stats.total > 0 ? Math.round((score / maxPossibleScore) * 100) : 0;

  return (
    <div className="w-full flex flex-col gap-2.5">
      {/* Üst Kategori Menüsü */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                  : 'bg-white border-slate-300 text-slate-700 hover:text-black shadow-sm'
              }`}
            >
              ← Ana Sayfa
            </button>
          )}

          <div
            className={`inline-flex items-center gap-1 p-1 rounded-lg border flex-wrap ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}
          >
            {[
              { id: 'europe', label: 'Avrupa' },
              { id: 'turkey_neighbors', label: 'Sınır Komşularımız' },
              { id: 'balkans', label: 'Balkanlar' },
              { id: 'middle_east', label: 'Orta Doğu' },
              { id: 'north_africa', label: 'Kuzey Afrika' },
              { id: 'south_america', label: 'Güney Amerika' },
              { id: 'major_powers', label: 'Büyük Güçler' },
              { id: 'asia', label: 'Asya' },
              { id: 'africa', label: 'Afrika' },
              { id: 'americas', label: 'Amerika' },
              { id: 'all', label: 'Tüm Dünya' },
            ].map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as WorldCategory)}
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

        <button
          onClick={onToggleTheme}
          className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
            isDark
              ? 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-400'
              : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600 shadow-sm'
          }`}
        >
          {isDark ? 'Klasik Atlas' : 'Koyu Mod'}
        </button>
      </div>

      {/* Soru Barı (Birebir Türkiye Haritası Kalitesi) */}
      <div
        className={`p-4 rounded-xl border transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Bulunacak Ülke:
            </span>

            {currentTarget ? (
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-blue-600 dark:text-blue-400">
                {currentTarget.name}
              </span>
            ) : (
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-500">
                Test Tamamlandı
              </span>
            )}

            {flashingCountryId && (
              <span className="text-xs font-bold text-red-500 animate-pulse uppercase">
                (Haritada yanıp sönen ülkeye tıkla)
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <div
              className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs sm:text-sm font-semibold ${
                isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <span className="text-[10px] uppercase font-sans font-medium text-slate-500 mr-1.5">Kalan</span>
              {solvedCount} / {activeCategoryList.length}
            </div>

            <div
              className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs sm:text-sm font-semibold ${
                isDark ? 'bg-slate-950 border-slate-800 text-emerald-400' : 'bg-slate-50 border-slate-200 text-emerald-600'
              }`}
            >
              <span className="text-[10px] uppercase font-sans font-medium text-slate-500 mr-1.5">Puan</span>
              {score}
            </div>

            <div
              className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs sm:text-sm font-semibold ${
                isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
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
          </div>
        </div>
      </div>

      {/* İnteraktif Harita Alanı (Leaflet Shaded Relief) */}
      <div
        ref={mapContainerRef}
        className={`w-full h-[580px] rounded-xl border ${
          isDark ? 'border-slate-800 bg-[#090d14]' : 'border-slate-300 bg-[#9fc7ea]'
        } overflow-hidden shadow-sm`}
        style={{ zIndex: 0 }}
      />

      {/* Sonuç Modalı */}
      {isCompleted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl flex flex-col gap-5 ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="text-center">
              <h2 className="text-2xl font-black tracking-tight">Tebrikler!</h2>
              <p className="text-xs text-slate-500 mt-1">Test başarıyla tamamlandı.</p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="text-xs font-medium text-slate-500">Puan</div>
                <div className="text-2xl font-black text-emerald-500 mt-0.5">{score}</div>
              </div>
              <div
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="text-xs font-medium text-slate-500">Başarı</div>
                <div className="text-2xl font-black text-blue-500 mt-0.5">%{accuracy}</div>
              </div>
              <div
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="text-xs font-medium text-slate-500">Süre</div>
                <div className="text-2xl font-black text-slate-600 dark:text-slate-300 mt-0.5">{formattedTime}</div>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border flex flex-col gap-2 text-xs ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  1. Hakta Doğru Bilinen
                </span>
                <span className="font-mono font-bold">{stats.firstTry}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  2. Hakta Doğru Bilinen
                </span>
                <span className="font-mono font-bold">{stats.secondTry}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  3. Hakta Doğru Bilinen
                </span>
                <span className="font-mono font-bold">{stats.thirdTry}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                  Bilinemeyen / Pas Geçilen
                </span>
                <span className="font-mono font-bold">{stats.failed}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => initGame(selectedCategory)}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
              >
                Tekrar Oyna
              </button>
              {onBackToHome && (
                <button
                  onClick={onBackToHome}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-colors ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                      : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                  }`}
                >
                  Ana Sayfa
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

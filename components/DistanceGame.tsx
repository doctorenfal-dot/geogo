'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PROVINCES, Province } from '@/data/provincesData';
import { NEIGHBOR_COUNTRIES } from '@/data/neighborsData';
import { getShortestPath } from '@/data/adjacencyData';
import { getRealHighwayDistance } from '@/data/realDistances';
import { WORLD_DISTANCE_POOL, WorldDistancePair } from '@/data/worldDistances';
import { WORLD_COUNTRIES } from '@/data/worldData';

interface DistanceGameProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onBackToHome?: () => void;
}

type DistanceCategory = 'turkey' | 'europe' | 'asia' | 'africa' | 'americas' | 'world';

const TURKEY_ROUTE_POOL = [
  ['İstanbul', 'Antalya'],
  ['İzmir', 'Trabzon'],
  ['Edirne', 'Gaziantep'],
  ['Muğla', 'Erzurum'],
  ['Sinop', 'Hatay'],
  ['Çanakkale', 'Van'],
  ['Bartın', 'Mersin'],
  ['Bursa', 'Diyarbakır'],
  ['Samsun', 'Adana'],
  ['Balıkesir', 'Kars'],
  ['Ankara', 'Rize'],
  ['Konya', 'Artvin'],
  ['Kastamonu', 'Malatya'],
  ['Aydın', 'Sivas'],
  ['Tekirdağ', 'Şanlıurfa'],
  ['Kayseri', 'Zonguldak'],
  ['Eskişehir', 'Hakkari'],
  ['Manisa', 'Mardin'],
  ['Denizli', 'Ordu'],
  ['Giresun', 'Mersin'],
];

export const DistanceGame: React.FC<DistanceGameProps> = ({ isDark, onToggleTheme, onBackToHome }) => {
  const [category, setCategory] = useState<DistanceCategory>('turkey');
  const [startPoint, setStartPoint] = useState<string>('İstanbul');
  const [targetPoint, setTargetPoint] = useState<string>('Antalya');
  const [actualDistance, setActualDistance] = useState<number>(695);

  const [inputVal, setInputVal] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [guessedKm, setGuessedKm] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [totalRounds, setTotalRounds] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const pickNewRoute = (cat: DistanceCategory) => {
    if (cat === 'turkey') {
      const allNames = PROVINCES.map((p) => p.name);
      let s = 'İstanbul', t = 'Antalya';
      for (let i = 0; i < 50; i++) {
        const randS = allNames[Math.floor(Math.random() * allNames.length)];
        const randT = allNames[Math.floor(Math.random() * allNames.length)];
        if (randS !== randT) {
          const d = getRealHighwayDistance(randS, randT);
          if (d >= 200) {
            s = randS; t = randT; break;
          }
        }
      }
      setStartPoint(s);
      setTargetPoint(t);
      setActualDistance(getRealHighwayDistance(s, t));
    } else {
      const pool = cat === 'world' ? WORLD_DISTANCE_POOL : WORLD_DISTANCE_POOL.filter(p => p.region === cat);
      const activePool = pool.length > 0 ? pool : WORLD_DISTANCE_POOL;
      const pair = activePool[Math.floor(Math.random() * activePool.length)];
      setStartPoint(pair.country1);
      setTargetPoint(pair.country2);
      setActualDistance(pair.actualKm);
    }

    setInputVal('');
    setSubmitted(false);
    setGuessedKm(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  useEffect(() => {
    pickNewRoute(category);
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitted) {
      pickNewRoute(category);
      return;
    }

    const val = parseInt(inputVal.replace(/\D/g, ''), 10);
    if (isNaN(val) || val <= 0) return;

    const diff = Math.abs(val - actualDistance);
    const errPct = diff / actualDistance;
    let roundScore = 0;
    if (errPct <= 0.05) roundScore = 100;
    else if (errPct <= 0.10) roundScore = 80;
    else if (errPct <= 0.20) roundScore = 50;
    else if (errPct <= 0.35) roundScore = 25;

    setGuessedKm(val);
    setScore(prev => prev + roundScore);
    setTotalRounds(prev => prev + 1);
    setSubmitted(true);
  };

  // Türkiye için rota çizgisi
  const turkeyPath = category === 'turkey' ? getShortestPath(startPoint, targetPoint) || [] : [];
  const turkeyPolyline = turkeyPath.map(cityName => {
    const p = PROVINCES.find(x => x.name === cityName);
    return p ? `${p.center[0]},${p.center[1]}` : '';
  }).filter(Boolean).join(' ');

  // Dünya için rota çizgisi
  const country1 = WORLD_COUNTRIES.find(c => c.name === startPoint);
  const country2 = WORLD_COUNTRIES.find(c => c.name === targetPoint);

  const [rawGeoData, setRawGeoData] = useState<any>(null);
  const leafletMapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const lineLayerRef = useRef<any>(null);
  const countriesLayerRef = useRef<any>(null);

  // GeoJSON Yükle
  useEffect(() => {
    fetch('/world-geo.json')
      .then(res => res.json())
      .then(data => setRawGeoData(data));
  }, []);

  // Leaflet Harita Başlatıcı (Dünya / Kıtalar için)
  useEffect(() => {
    if (category === 'turkey') {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
      return;
    }

    if (!mapContainerRef.current || leafletMapRef.current) return;

    let isMounted = true;

    import('leaflet').then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      const southWest = L.latLng(-65, -180);
      const northEast = L.latLng(82, 180);
      const bounds = L.latLngBounds(southWest, northEast);

      const map = L.map(mapContainerRef.current, {
        center: [20, 10],
        zoom: 2,
        minZoom: 2,
        maxZoom: 7,
        maxBounds: bounds,
        maxBoundsViscosity: 1.0,
        zoomControl: true,
        attributionControl: false,
      });

      // ArcGIS Shaded Relief (Sıfır yazı/etiket, tertemiz coğrafi taban)
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 16, noWrap: true }
      ).addTo(map);

      leafletMapRef.current = map;
    });

    return () => {
      isMounted = false;
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [category]);

  // Leaflet GeoJSON Katmanı ve Rota Çizgisi Güncelleme
  useEffect(() => {
    if (category === 'turkey' || !leafletMapRef.current || !rawGeoData) return;

    import('leaflet').then((L) => {
      if (countriesLayerRef.current) {
        leafletMapRef.current.removeLayer(countriesLayerRef.current);
      }
      if (lineLayerRef.current) {
        leafletMapRef.current.removeLayer(lineLayerRef.current);
      }

      let c1LatLng: [number, number] | null = null;
      let c2LatLng: [number, number] | null = null;

      const layer = L.geoJSON(rawGeoData, {
        style: (feat: any) => {
          const name = feat.properties.name;
          const isStart = name === startPoint;
          const isTarget = name === targetPoint;

          if (isStart) {
            return {
              fillColor: '#3b82f6',
              fillOpacity: 0.85,
              color: '#1d4ed8',
              weight: 2,
            };
          }
          if (isTarget) {
            return {
              fillColor: '#10b981',
              fillOpacity: 0.85,
              color: '#047857',
              weight: 2,
            };
          }

          return {
            fillColor: isDark ? '#1e293b' : '#ffffff',
            fillOpacity: 0.6,
            color: isDark ? '#334155' : '#cbd5e1',
            weight: 0.8,
          };
        },
        onEachFeature: (feat: any, l: any) => {
          const name = feat.properties.name;
          if (name === startPoint || name === targetPoint) {
            try {
              const b = l.getBounds();
              const center = b.getCenter();
              if (name === startPoint) c1LatLng = [center.lat, center.lng];
              if (name === targetPoint) c2LatLng = [center.lat, center.lng];
            } catch (err) {}
          }
        },
      }).addTo(leafletMapRef.current);

      countriesLayerRef.current = layer;

      // İki ülke arasına kuş uçuşu kesikli çizgi çek
      if (c1LatLng && c2LatLng) {
        const polyline = L.polyline([c1LatLng, c2LatLng], {
          color: '#f59e0b',
          weight: 3.5,
          dashArray: '8, 6',
          opacity: 0.95,
        }).addTo(leafletMapRef.current);
        lineLayerRef.current = polyline;

        // İki ülkeyi çerçeveye alacak şekilde haritayı yumuşakça kaydır
        const pairBounds = L.latLngBounds([c1LatLng, c2LatLng]);
        leafletMapRef.current.fitBounds(pairBounds, { padding: [50, 50], maxZoom: 5, animate: true });
      }
    });
  }, [category, startPoint, targetPoint, rawGeoData, isDark]);

  return (
    <div className="w-full flex flex-col gap-2.5">
      {/* Üst Bar */}
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

          <div className={`inline-flex p-1 rounded-lg border flex-wrap gap-1 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-200 border-slate-300'
          }`}>
            {[
              { id: 'turkey', label: 'Türkiye Karayolu' },
              { id: 'europe', label: 'Avrupa' },
              { id: 'asia', label: 'Asya' },
              { id: 'africa', label: 'Afrika' },
              { id: 'americas', label: 'Amerika' },
              { id: 'world', label: 'Tüm Dünya' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCategory(tab.id as DistanceCategory)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  category === tab.id
                    ? isDark ? 'bg-slate-100 text-slate-950 font-bold shadow-sm' : 'bg-slate-900 text-white font-bold shadow-sm'
                    : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onToggleTheme}
          className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
            isDark ? 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-400' : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600'
          }`}
        >
          {isDark ? 'Klasik Atlas' : 'Koyu Mod'}
        </button>
      </div>

      {/* Soru Kartı */}
      <div className={`p-4 rounded-xl border transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Mesafe Tahmini</span>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xl sm:text-2xl font-black text-blue-500">{startPoint}</span>
              <span className="text-slate-400 font-bold">→</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-500">{targetPoint}</span>
            </div>
          </div>

          {/* Tahmin Formu */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            {!submitted ? (
              <>
                <input
                  ref={inputRef}
                  type="number"
                  autoFocus
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="km tahmini..."
                  className={`w-36 px-3 py-2 rounded-lg border font-mono font-bold text-sm outline-none transition-all ${
                    isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 shadow-sm"
                >
                  Tahmin Et
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="text-xs font-mono">
                  Tahmin: <strong>{guessedKm} km</strong> | Gerçek: <strong className="text-emerald-500">{actualDistance} km</strong> (Fark: {Math.abs(guessedKm - actualDistance)} km)
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-blue-600 text-white shadow-sm"
                >
                  Sonraki Rota →
                </button>
              </div>
            )}
          </form>

          {/* Skor */}
          <div className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold ${
            isDark ? 'bg-slate-950 border-slate-800 text-emerald-400' : 'bg-slate-50 border-slate-200 text-emerald-600'
          }`}>
            Toplam Puan: {score} ({totalRounds} tur)
          </div>
        </div>
      </div>

      {/* Harita */}
      {category === 'turkey' ? (
        <div className={`relative w-full aspect-[1100/540] ${
          isDark ? 'bg-[#0b0e14]' : 'bg-[#9fc7ea]'
        } rounded-xl border ${
          isDark ? 'border-slate-800' : 'border-slate-300'
        } overflow-hidden flex items-center justify-center select-none shadow-sm transition-colors`}>
          <svg viewBox="0 0 1100 540" className="w-full h-full select-none">
            <g className="pointer-events-none">
              {NEIGHBOR_COUNTRIES.map(neighbor => (
                <path key={neighbor.id} d={neighbor.path} className={`${isDark ? 'fill-[#141a24] stroke-[#1e2736]' : 'fill-[#c6d7e6] stroke-[#8ea5bc]'} stroke-[0.8]`} />
              ))}
            </g>
            <g>
              {PROVINCES.map(prov => {
                const isStart = prov.name === startPoint;
                const isTarget = prov.name === targetPoint;
                let fill = isDark ? '#1c2432' : '#ffffff';
                if (isStart) fill = '#3b82f6';
                if (isTarget) fill = '#10b981';

                return (
                  <path key={prov.id} d={prov.path} fill={fill} className="stroke-[#64748b] stroke-[0.8]" />
                );
              })}
            </g>
            {turkeyPolyline && (
              <polyline points={turkeyPolyline} fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 4" />
            )}
          </svg>
        </div>
      ) : (
        <div
          ref={mapContainerRef}
          className="w-full h-[520px] rounded-xl border border-slate-300 dark:border-slate-800 overflow-hidden shadow-sm"
          style={{ zIndex: 0 }}
        />
      )}
    </div>
  );
};


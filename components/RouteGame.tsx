'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PROVINCES } from '@/data/provincesData';
import { NEIGHBOR_COUNTRIES } from '@/data/neighborsData';
import {
  areNeighbors,
  getShortestPath,
} from '@/data/adjacencyData';
import {
  WORLD_ADJACENCY,
  EUROPE_ADJACENCY,
  getShortestPathEurope,
  getShortestPathWorld,
} from '@/data/worldAdjacency';

interface RouteGameProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onBackToHome?: () => void;
}

type RouteScope = 'turkey' | 'europe' | 'asia' | 'africa' | 'americas' | 'world';

const TURKEY_PRESETS = [
  { start: 'Edirne', target: 'Kars' },
  { start: 'Muğla', target: 'Artvin' },
  { start: 'Çanakkale', target: 'Hakkari' },
  { start: 'Sinop', target: 'Hatay' },
  { start: 'İzmir', target: 'Van' },
  { start: 'İstanbul', target: 'Gaziantep' },
  { start: 'Antalya', target: 'Trabzon' },
  { start: 'Mersin', target: 'Zonguldak' },
];

const EUROPE_PRESETS = [
  { start: 'Portekiz', target: 'Almanya' },
  { start: 'İspanya', target: 'Polonya' },
  { start: 'Fransa', target: 'Yunanistan' },
  { start: 'Hollanda', target: 'İtalya' },
  { start: 'Almanya', target: 'Türkiye' },
  { start: 'İtalya', target: 'Romanya' },
  { start: 'İsviçre', target: 'Bulgaristan' },
  { start: 'Belçika', target: 'Türkiye' },
  { start: 'Danimarka', target: 'Hırvatistan' },
  { start: 'Portekiz', target: 'Rusya' },
  { start: 'İsveç', target: 'Yunanistan' },
];

const ASIA_PRESETS = [
  { start: 'Türkiye', target: 'Çin' },
  { start: 'Gürcistan', target: 'Hindistan' },
  { start: 'İran', target: 'Kazakistan' },
  { start: 'Ürdün', target: 'Pakistan' },
  { start: 'Suudi Arabistan', target: 'Özbekistan' },
];

const AFRICA_PRESETS = [
  { start: 'Fas', target: 'Nijerya' },
  { start: 'Mısır', target: 'Güney Afrika' },
  { start: 'Tunus', target: 'Kamerun' },
  { start: 'Senegal', target: 'Çad' },
  { start: 'Kenya', target: 'Angola' },
];

const AMERICAS_PRESETS = [
  { start: 'Kanada', target: 'Meksika' },
  { start: 'Amerika Birleşik Devletleri', target: 'Panama' },
  { start: 'Kolombiya', target: 'Arjantin' },
  { start: 'Peru', target: 'Brezilya' },
  { start: 'Şili', target: 'Venezuela' },
];

const WORLD_PRESETS = [
  { start: 'Portekiz', target: 'Çin' },
  { start: 'Almanya', target: 'Hindistan' },
  { start: 'Fransa', target: 'Mısır' },
  { start: 'Türkiye', target: 'Güney Afrika' },
  { start: 'Norveç', target: 'İran' },
  { start: 'İtalya', target: 'Kazakistan' },
];

function normalizeTR(text: string): string {
  return text
    .trim()
    .replace(/İ/g, 'i')
    .replace(/I/g, 'ı')
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c');
}

export const RouteGame: React.FC<RouteGameProps> = ({ isDark, onToggleTheme, onBackToHome }) => {
  const [scope, setScope] = useState<RouteScope>('turkey');
  const [startPoint, setStartPoint] = useState<string>('Edirne');
  const [targetPoint, setTargetPoint] = useState<string>('Kars');
  const [userPath, setUserPath] = useState<string[]>(['Edirne']);
  const [inputValue, setInputValue] = useState<string>('');
  const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [showOptimalPath, setShowOptimalPath] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const currentPosition = userPath[userPath.length - 1];

  // Leaflet Refs for Continent / World scopes
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<any>(null);
  const geoJsonLayerRef = useRef<any>(null);
  const rawGeoDataRef = useRef<any>(null);

  // GeoJSON Yükle
  useEffect(() => {
    fetch('/world-geo.json')
      .then((res) => res.json())
      .then((data) => {
        rawGeoDataRef.current = data;
      });
  }, []);

  const initRoute = (sc: RouteScope) => {
    let pool = TURKEY_PRESETS;
    if (sc === 'europe') pool = EUROPE_PRESETS;
    else if (sc === 'asia') pool = ASIA_PRESETS;
    else if (sc === 'africa') pool = AFRICA_PRESETS;
    else if (sc === 'americas') pool = AMERICAS_PRESETS;
    else if (sc === 'world') pool = WORLD_PRESETS;

    const p = pool[Math.floor(Math.random() * pool.length)];
    setStartPoint(p.start);
    setTargetPoint(p.target);
    setUserPath([p.start]);
    setInputValue('');
    setFeedback(null);
    setIsFinished(false);
    setShowOptimalPath(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  useEffect(() => {
    initRoute(scope);
  }, [scope]);

  // Optimal BFS Rota
  const optimalPath =
    scope === 'turkey'
      ? getShortestPath(startPoint, targetPoint) || []
      : scope === 'europe'
      ? getShortestPathEurope(startPoint, targetPoint) || []
      : getShortestPathWorld(startPoint, targetPoint) || [];

  // Leaflet Başlatıcı (Dünya / Kıta modları için)
  useEffect(() => {
    if (scope === 'turkey') {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
        geoJsonLayerRef.current = null;
      }
      return;
    }

    if (!mapContainerRef.current || leafletMapRef.current) return;

    let isMounted = true;

    import('leaflet').then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      const southWest = L.latLng(-65, -180);
      const northEast = L.latLng(82, 180);
      const maxBounds = L.latLngBounds(southWest, northEast);

      const map = L.map(mapContainerRef.current, {
        center: [45, 20],
        zoom: 3.5,
        minZoom: 2,
        maxZoom: 7,
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

      if (rawGeoDataRef.current) {
        renderLeafletLayers(L, map, rawGeoDataRef.current);
      }
    });

    return () => {
      isMounted = false;
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
        geoJsonLayerRef.current = null;
      }
    };
  }, [scope]);

  // Leaflet Katman Çizimi
  const renderLeafletLayers = (L: any, map: any, geoData: any) => {
    if (geoJsonLayerRef.current) {
      map.removeLayer(geoJsonLayerRef.current);
    }

    const routeCountries = new Set([startPoint, targetPoint, ...userPath]);
    const optimalSet = new Set(showOptimalPath ? optimalPath : []);

    const layer = L.geoJSON(geoData, {
      style: (feat: any) => {
        const name = feat.properties.name;
        const isStart = name === startPoint;
        const isTarget = name === targetPoint;
        const isInUserPath = userPath.includes(name);
        const isInOptimal = optimalSet.has(name);

        if (isStart) {
          return {
            fillColor: '#2563eb',
            fillOpacity: 0.9,
            color: '#1d4ed8',
            weight: 1.5,
          };
        }
        if (isTarget) {
          return {
            fillColor: '#059669',
            fillOpacity: 0.9,
            color: '#047857',
            weight: 1.5,
          };
        }
        if (isInUserPath) {
          return {
            fillColor: '#60a5fa',
            fillOpacity: 0.85,
            color: '#2563eb',
            weight: 1.2,
          };
        }
        if (isInOptimal) {
          return {
            fillColor: '#f59e0b',
            fillOpacity: 0.85,
            color: '#d97706',
            weight: 1.2,
          };
        }

        return {
          fillColor: isDark ? '#1e293b' : '#ffffff',
          fillOpacity: isDark ? 0.8 : 0.9,
          color: isDark ? '#334155' : '#64748b',
          weight: 0.6,
        };
      },
    }).addTo(map);

    geoJsonLayerRef.current = layer;

    // Rota ülkelerine göre otomatik odaklanma
    const focusFeatures = geoData.features.filter(
      (f: any) => routeCountries.has(f.properties.name) || optimalSet.has(f.properties.name)
    );

    if (focusFeatures.length > 0) {
      const tempGroup = L.geoJSON({ type: 'FeatureCollection', features: focusFeatures });
      const bounds = tempGroup.getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 5.5 });
      }
    }
  };

  // State değişimlerinde Leaflet güncelle
  useEffect(() => {
    if (scope !== 'turkey' && leafletMapRef.current && rawGeoDataRef.current) {
      import('leaflet').then((L) => {
        renderLeafletLayers(L, leafletMapRef.current, rawGeoDataRef.current);
      });
    }
  }, [userPath, showOptimalPath, isFinished, startPoint, targetPoint, isDark, scope]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFinished || !inputValue.trim()) return;

    const raw = inputValue.trim();
    const norm = normalizeTR(raw);

    if (scope === 'turkey') {
      const matched = PROVINCES.find((p) => normalizeTR(p.name) === norm);
      if (!matched) {
        setFeedback({ text: `"${raw}" adında bir il bulunamadı.`, type: 'error' });
        setInputValue('');
        return;
      }

      const nextCity = matched.name;
      if (nextCity === currentPosition) {
        setFeedback({ text: `Zaten ${currentPosition} ilindesiniz.`, type: 'error' });
        setInputValue('');
        return;
      }
      if (userPath.includes(nextCity)) {
        setFeedback({ text: `"${nextCity}" ilinden daha önce geçtiniz.`, type: 'error' });
        setInputValue('');
        return;
      }
      if (!areNeighbors(currentPosition, nextCity)) {
        setFeedback({ text: `"${nextCity}" ili "${currentPosition}" ile komşu değil.`, type: 'error' });
        setInputValue('');
        return;
      }

      const newPath = [...userPath, nextCity];
      setUserPath(newPath);
      setInputValue('');

      if (nextCity === targetPoint) {
        setIsFinished(true);
        setFeedback({ text: `Tebrikler! ${targetPoint} hedefine ulaştınız.`, type: 'success' });
      } else {
        setFeedback({ text: `${nextCity} iline geçildi.`, type: 'success' });
      }
    } else {
      // Dünya ve Kıtalar rotası
      const graph = scope === 'europe' ? EUROPE_ADJACENCY : WORLD_ADJACENCY;
      const countryNames = Object.keys(graph);
      const matched = countryNames.find((c) => normalizeTR(c) === norm);
      if (!matched) {
        setFeedback({ text: `"${raw}" adında bir ülke bulunamadı veya kara sınırı ağında yok.`, type: 'error' });
        setInputValue('');
        return;
      }

      const nextCountry = matched;
      if (nextCountry === currentPosition) {
        setFeedback({ text: `Zaten ${currentPosition} ülkesindesiniz.`, type: 'error' });
        setInputValue('');
        return;
      }
      if (userPath.includes(nextCountry)) {
        setFeedback({ text: `"${nextCountry}" ülkesinden daha önce geçtiniz.`, type: 'error' });
        setInputValue('');
        return;
      }

      const neighbors = graph[currentPosition] || [];
      if (!neighbors.includes(nextCountry)) {
        setFeedback({ text: `"${nextCountry}" ülkesi "${currentPosition}" ile doğrudan kara sınırı komşusu değil.`, type: 'error' });
        setInputValue('');
        return;
      }

      const newPath = [...userPath, nextCountry];
      setUserPath(newPath);
      setInputValue('');

      if (nextCountry === targetPoint) {
        setIsFinished(true);
        setFeedback({ text: `Tebrikler! ${targetPoint} hedefine ulaştınız.`, type: 'success' });
      } else {
        setFeedback({ text: `${nextCountry} ülkesine geçildi.`, type: 'success' });
      }
    }
  };

  const handleUndo = () => {
    if (userPath.length > 1 && !isFinished) {
      setUserPath((prev) => prev.slice(0, prev.length - 1));
      setInputValue('');
      setFeedback(null);
    }
  };

  const userStepCount = userPath.length - 1;
  const optimalStepCount = optimalPath.length > 0 ? optimalPath.length - 1 : 0;
  const stepDiff = userStepCount - optimalStepCount;

  return (
    <div className="w-full flex flex-col gap-2.5">
      {/* Üst Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white' : 'bg-white border-slate-300 text-slate-700 hover:text-black shadow-sm'
              }`}
            >
              ← Ana Sayfa
            </button>
          )}

          <div className={`inline-flex p-1 rounded-lg border flex-wrap ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-200 border-slate-300'
          }`}>
            {[
              { id: 'turkey', label: 'Türkiye' },
              { id: 'europe', label: 'Avrupa' },
              { id: 'asia', label: 'Asya' },
              { id: 'africa', label: 'Afrika' },
              { id: 'americas', label: 'Amerika' },
              { id: 'world', label: 'Tüm Dünya' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setScope(item.id as RouteScope)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  scope === item.id
                    ? isDark ? 'bg-slate-100 text-slate-950 font-bold shadow-sm' : 'bg-slate-900 text-white font-bold shadow-sm'
                    : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onToggleTheme}
          className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
            isDark ? 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-400' : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600 shadow-sm'
          }`}
        >
          {isDark ? 'Klasik Atlas' : 'Koyu Mod'}
        </button>
      </div>

      {/* Rota Durum Kartı */}
      <div className={`p-4 rounded-xl border transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {scope === 'turkey' ? 'En Kısa Rota (Zihinden Komşu İller)' : 'Kara Sınırı Komşu Zinciri (Zihinden İlerle)'}
            </span>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xl sm:text-2xl font-black text-blue-500">{startPoint}</span>
              <span className="text-slate-400 font-bold">→</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-500">{targetPoint}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => initRoute(scope)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                isDark ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
              }`}
            >
              Yeni Rota
            </button>
            <button
              onClick={handleUndo}
              disabled={userPath.length <= 1 || isFinished}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors disabled:opacity-40 ${
                isDark ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
              }`}
            >
              Geri Al
            </button>
          </div>
        </div>

        {/* Input Alanı */}
        {!isFinished ? (
          <form onSubmit={handleFormSubmit} className="mt-4 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              autoFocus
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Şu anki yer: ${currentPosition}. Komşusunu yaz ve Enter'a bas...`}
              className={`flex-1 px-4 py-2.5 rounded-lg border font-semibold text-sm outline-none transition-all ${
                isDark ? 'bg-slate-950 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
              }`}
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-sm"
            >
              İlerle
            </button>
          </form>
        ) : (
          /* Bitiş Analizi ve Değerlendirmesi */
          <div className={`mt-4 p-4 rounded-xl border ${
            stepDiff === 0
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
          }`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-black text-sm">
                  {stepDiff === 0
                    ? 'Mükemmel! En kısa ideal rotayı tam adımda buldunuz.'
                    : `Hedefe ulaştınız! Ancak ideal yoldan ${stepDiff} adım daha uzattınız.`}
                </div>
                <div className="text-xs opacity-80 mt-0.5">
                  Sizin adım sayınız: <span className="font-bold">{userStepCount}</span> | İdeal en kısa: <span className="font-bold">{optimalStepCount}</span>
                </div>
              </div>

              <button
                onClick={() => setShowOptimalPath(!showOptimalPath)}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-white text-slate-900 hover:bg-slate-100 shadow-sm"
              >
                {showOptimalPath ? 'İdeal Rotayı Gizle' : 'İdeal Rotayı Gör'}
              </button>
            </div>

            {/* Karşılaştırmalı Rota Detayı */}
            {showOptimalPath && (
              <div className="mt-3 pt-3 border-t border-current/20 text-xs">
                <div className="font-bold mb-1.5 opacity-90">İdeal En Kısa Yol ({optimalStepCount} adım):</div>
                <div className="flex items-center gap-1.5 flex-wrap font-mono font-bold">
                  {optimalPath.map((item, idx) => (
                    <span key={idx} className="flex items-center gap-1">
                      <span className={`px-2 py-0.5 rounded ${
                        idx === 0 ? 'bg-blue-600 text-white' : idx === optimalPath.length - 1 ? 'bg-emerald-600 text-white' : isDark ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-800'
                      }`}>
                        {item}
                      </span>
                      {idx < optimalPath.length - 1 && <span className="opacity-50">→</span>}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Geri Bildirim */}
        {feedback && !isFinished && (
          <div className={`mt-3 p-2.5 rounded-lg text-xs font-bold ${
            feedback.type === 'success'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {feedback.text}
          </div>
        )}

        {/* İzlenen Yol */}
        <div className="mt-3 flex items-center gap-1.5 flex-wrap text-xs">
          <span className="font-bold text-slate-500">İzlenen Yol ({userStepCount} adım):</span>
          {userPath.map((item, idx) => (
            <span key={idx} className="flex items-center gap-1">
              <span className={`px-2 py-0.5 rounded font-mono font-bold ${
                idx === 0 ? 'bg-blue-600 text-white' : idx === userPath.length - 1 && isFinished ? 'bg-emerald-600 text-white' : isDark ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-800'
              }`}>
                {item}
              </span>
              {idx < userPath.length - 1 && <span className="text-slate-400">→</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Harita */}
      {scope === 'turkey' ? (
        <div className={`relative w-full aspect-[1100/540] ${
          isDark ? 'bg-[#0b0e14]' : 'bg-[#9fc7ea]'
        } rounded-xl border ${
          isDark ? 'border-slate-800' : 'border-slate-300'
        } overflow-hidden flex items-center justify-center select-none shadow-sm transition-colors`}>
          <svg viewBox="0 0 1100 540" className="w-full h-full select-none pointer-events-none">
            <g>
              {NEIGHBOR_COUNTRIES.map((neighbor) => (
                <path key={neighbor.id} d={neighbor.path} className={`${isDark ? 'fill-[#141a24] stroke-[#1e2736]' : 'fill-[#c6d7e6] stroke-[#8ea5bc]'} stroke-[0.8]`} />
              ))}
            </g>
            <g>
              {PROVINCES.map((prov) => {
                const isStart = prov.name === startPoint;
                const isTarget = prov.name === targetPoint;
                const isInPath = userPath.includes(prov.name);
                const isInOptimal = isFinished && showOptimalPath && optimalPath.includes(prov.name);

                let fill = isDark ? '#18202d' : '#ffffff';
                if (isStart) fill = '#2563eb';
                else if (isTarget) fill = '#059669';
                else if (isInPath) fill = isDark ? '#3b82f6' : '#93c5fd';
                else if (isInOptimal) fill = '#f59e0b';

                return (
                  <path key={prov.id} d={prov.path} fill={fill} className={`${isDark ? 'stroke-[#232d3f]' : 'stroke-[#94a3b8]'} stroke-[0.6]`} />
                );
              })}
            </g>
          </svg>
        </div>
      ) : (
        <div
          ref={mapContainerRef}
          className={`w-full h-[540px] rounded-xl border ${
            isDark ? 'border-slate-800 bg-[#090d14]' : 'border-slate-300 bg-[#9fc7ea]'
          } overflow-hidden shadow-sm`}
          style={{ zIndex: 0 }}
        />
      )}
    </div>
  );
};

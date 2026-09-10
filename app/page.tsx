'use client';

import React, { useState } from 'react';
import { QuizManager } from '@/components/QuizManager';
import { PhysicalGeoGame } from '@/components/PhysicalGeoGame';
import { ClimateGame } from '@/components/ClimateGame';
import { RouteGame } from '@/components/RouteGame';
import { DistanceGame } from '@/components/DistanceGame';
import { SilhouetteGame } from '@/components/SilhouetteGame';
import { PopulationGame } from '@/components/PopulationGame';
import { DistrictsGame } from '@/components/DistrictsGame';
import { CultureGame } from '@/components/CultureGame';
import { WorldGame } from '@/components/WorldGame';

type AppMode =
  | 'lobby'
  | 'seterra'
  | 'silhouette'
  | 'population'
  | 'districts'
  | 'physical'
  | 'climate'
  | 'culture'
  | 'world'
  | 'route'
  | 'distance';

interface ModeCard {
  id: AppMode;
  category: 'Türkiye' | 'Dünya' | 'Özel';
  title: string;
  desc: string;
}

const ALL_MODES: ModeCard[] = [
  // Türkiye
  { id: 'seterra', category: 'Türkiye', title: 'İl & Plaka Testi', desc: '81 ili harita üzerinde bulma ve plaka kodları.' },
  { id: 'districts', category: 'Türkiye', title: 'İlçeler', desc: 'Meşhur ilçeler veya seçtiğin ilin tüm ilçe sınırları.' },
  { id: 'population', category: 'Türkiye', title: 'Nüfus Sıralaması', desc: 'En kalabalık ilden en tenhaya 81 ili sırasıyla bulma.' },
  { id: 'physical', category: 'Türkiye', title: 'Fiziki Coğrafya', desc: 'Toroslar, Ağrı, Kaçkar, nehir yatakları ve göller.' },
  { id: 'climate', category: 'Türkiye', title: 'İklim Kuşakları', desc: 'Karadeniz, Akdeniz, Karasal ve Geçiş iklimleri.' },
  { id: 'culture', category: 'Türkiye', title: 'Nesi Meşhur?', desc: 'Yöresel lezzetler, tarihi eserler ve simgeler.' },
  { id: 'silhouette', category: 'Türkiye', title: 'İl Silueti', desc: 'Sadece dış hatlarına bakarak ili tahmin etme.' },

  // Dünya
  { id: 'world', category: 'Dünya', title: 'Dünya Haritası', desc: 'Avrupa, Asya, Afrika ve Amerika kıtalarındaki ülkeler.' },

  // Özel
  { id: 'route', category: 'Özel', title: 'En Kısa Rota', desc: 'Komşu illeri zihinden yazarak hedefe ulaşma oyunu.' },
  { id: 'distance', category: 'Özel', title: 'Mesafe Tahmini', desc: 'Karayolları Genel Müdürlüğü gerçek yol mesafeleri.' },
];

export default function Home() {
  const [gameMode, setGameMode] = useState<AppMode>('lobby');
  const [isDark, setIsDark] = useState<boolean>(false);

  return (
    <div className={`min-h-screen transition-colors p-3 sm:p-6 ${
      isDark ? 'bg-[#090b10] text-slate-100' : 'bg-[#f4f7fa] text-slate-900'
    }`}>
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-4">
        {/* ================= LOBBY (BAŞLANGIÇ EKRANI) ================= */}
        {gameMode === 'lobby' ? (
          <div className="flex flex-col gap-6 py-4">
            {/* Sade Üst Başlık & Tema */}
            <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-800">
              <div>
                <h1 className="text-2xl font-black tracking-tight">Coğrafya Atlası</h1>
                <p className="text-xs text-slate-500 mt-0.5">Çalışmak istediğin haritayı veya oyun modunu seç.</p>
              </div>

              <button
                onClick={() => setIsDark(!isDark)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                  isDark
                    ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
                    : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700 shadow-sm'
                }`}
              >
                {isDark ? 'Klasik Atlas' : 'Koyu Mod'}
              </button>
            </div>

            {/* Türkiye Kategorisi */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Türkiye Haritaları</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {ALL_MODES.filter((m) => m.category === 'Türkiye').map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setGameMode(m.id)}
                    className={`p-3.5 rounded-xl border text-left flex flex-col justify-between gap-2 transition-all ${
                      isDark
                        ? 'bg-slate-900/90 border-slate-800 hover:border-slate-600 hover:bg-slate-800/80'
                        : 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-sm'
                    }`}
                  >
                    <div>
                      <h3 className="text-sm font-black">{m.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{m.desc}</p>
                    </div>
                    <span className="text-[11px] font-bold text-blue-500 mt-1">Başlat →</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dünya Kategorisi */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Dünya Haritaları</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {ALL_MODES.filter((m) => m.category === 'Dünya').map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setGameMode(m.id)}
                    className={`p-3.5 rounded-xl border text-left flex flex-col justify-between gap-2 transition-all ${
                      isDark
                        ? 'bg-slate-900/90 border-slate-800 hover:border-slate-600 hover:bg-slate-800/80'
                        : 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-sm'
                    }`}
                  >
                    <div>
                      <h3 className="text-sm font-black">{m.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{m.desc}</p>
                    </div>
                    <span className="text-[11px] font-bold text-blue-500 mt-1">Başlat →</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Zihin & Mesafe Oyunları */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Rota & Mesafe</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {ALL_MODES.filter((m) => m.category === 'Özel').map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setGameMode(m.id)}
                    className={`p-3.5 rounded-xl border text-left flex flex-col justify-between gap-2 transition-all ${
                      isDark
                        ? 'bg-slate-900/90 border-slate-800 hover:border-slate-600 hover:bg-slate-800/80'
                        : 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-sm'
                    }`}
                  >
                    <div>
                      <h3 className="text-sm font-black">{m.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{m.desc}</p>
                    </div>
                    <span className="text-[11px] font-bold text-blue-500 mt-1">Başlat →</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ================= AKTİF OYUN EKRANI ================= */
          <div className="flex flex-col gap-2">
            {/* Üstte sadece ana sayfaya dönme butonu ve mod adı */}
            <div className="flex items-center justify-between pb-1">
              <button
                onClick={() => setGameMode('lobby')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                    : 'bg-white border-slate-300 text-slate-700 hover:text-black shadow-sm'
                }`}
              >
                ← Tüm Haritalar
              </button>
            </div>

            {gameMode === 'seterra' && (
              <QuizManager
                isDark={isDark}
                onToggleTheme={() => setIsDark(!isDark)}
              />
            )}

            {gameMode === 'districts' && (
              <DistrictsGame
                isDark={isDark}
                onToggleTheme={() => setIsDark(!isDark)}
                onBackToHome={() => setGameMode('lobby')}
              />
            )}

            {gameMode === 'population' && (
              <PopulationGame
                isDark={isDark}
                onToggleTheme={() => setIsDark(!isDark)}
              />
            )}

            {gameMode === 'physical' && (
              <PhysicalGeoGame
                isDark={isDark}
                onToggleTheme={() => setIsDark(!isDark)}
              />
            )}

            {gameMode === 'climate' && (
              <ClimateGame
                isDark={isDark}
                onToggleTheme={() => setIsDark(!isDark)}
              />
            )}

            {gameMode === 'culture' && (
              <CultureGame
                isDark={isDark}
                onToggleTheme={() => setIsDark(!isDark)}
              />
            )}

            {gameMode === 'world' && (
              <WorldGame
                isDark={isDark}
                onToggleTheme={() => setIsDark(!isDark)}
                onBackToHome={() => setGameMode('lobby')}
              />
            )}

            {gameMode === 'silhouette' && (
              <SilhouetteGame
                isDark={isDark}
                onToggleTheme={() => setIsDark(!isDark)}
              />
            )}

            {gameMode === 'route' && (
              <RouteGame
                isDark={isDark}
                onToggleTheme={() => setIsDark(!isDark)}
              />
            )}

            {gameMode === 'distance' && (
              <DistanceGame
                isDark={isDark}
                onToggleTheme={() => setIsDark(!isDark)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

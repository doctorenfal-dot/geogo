'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { PROVINCES, Province } from '@/data/provincesData';
import { NEIGHBOR_COUNTRIES } from '@/data/neighborsData';
import { TURKEY_LAKES } from '@/data/lakesData';
import { CULTURE_QUESTIONS, CultureQuestion } from '@/data/cultureData';

interface CultureGameProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export const CultureGame: React.FC<CultureGameProps> = ({ isDark, onToggleTheme }) => {
  const [questionPool, setQuestionPool] = useState<CultureQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<CultureQuestion | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  const [solvedMap, setSolvedMap] = useState<
    Record<string, { status: 'green' | 'yellow' | 'orange' | 'darkred'; q: CultureQuestion }>
  >({});
  const [flashingProvinceId, setFlashingProvinceId] = useState<string | null>(null);
  const [wrongClickProvince, setWrongClickProvince] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  const initGame = useCallback(() => {
    const shuffled = [...CULTURE_QUESTIONS].sort(() => Math.random() - 0.5);
    setQuestionPool(shuffled);
    setCurrentQuestion(shuffled[0] || null);
    setAttempts(0);
    setSolvedMap({});
    setFlashingProvinceId(null);
    setWrongClickProvince(null);
    setScore(0);
    setTimerSeconds(0);
    setIsTimerRunning(true);
    setIsCompleted(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && !isCompleted) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isCompleted]);

  const handleProvinceClick = (prov: Province) => {
    if (isCompleted || !currentQuestion) return;

    const isCorrect =
      prov.name.toLocaleLowerCase('tr-TR') === currentQuestion.provinceName.toLocaleLowerCase('tr-TR');

    if (flashingProvinceId) {
      setFlashingProvinceId(null);
      advanceNext();
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
        [currentQuestion.id]: { status, q: currentQuestion },
      }));
      advanceNext();
    } else {
      const nextAtt = attempts + 1;
      setAttempts(nextAtt);
      setWrongClickProvince(prov.name);
      setTimeout(() => setWrongClickProvince(null), 1000);

      if (nextAtt >= 3) {
        const correctProv = PROVINCES.find(
          (p) => p.name.toLocaleLowerCase('tr-TR') === currentQuestion.provinceName.toLocaleLowerCase('tr-TR')
        );
        if (correctProv) {
          setFlashingProvinceId(correctProv.id);
        }
        setSolvedMap((prev) => ({
          ...prev,
          [currentQuestion.id]: { status: 'darkred', q: currentQuestion },
        }));
      }
    }
  };

  const advanceNext = () => {
    setAttempts(0);
    const nextList = questionPool.slice(1);
    setQuestionPool(nextList);
    if (nextList.length > 0) {
      setCurrentQuestion(nextList[0]);
    } else {
      setIsCompleted(true);
      setIsTimerRunning(false);
      setCurrentQuestion(null);
    }
  };

  const formattedTime = `${Math.floor(timerSeconds / 60)
    .toString()
    .padStart(2, '0')}:${(timerSeconds % 60).toString().padStart(2, '0')}`;

  const solvedCount = CULTURE_QUESTIONS.length - questionPool.length;

  return (
    <div className="w-full flex flex-col gap-2.5">
      {/* Soru Barı: Meşhur Şeyin Adı Yazar, İle Sen Tıklarsın */}
      <div className={`p-4 rounded-xl border transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className={`text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Nerenin Meşhuru?:
            </span>

            {currentQuestion ? (
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-amber-500">
                  {currentQuestion.item}
                </span>
                <span className={`text-xs font-medium italic ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  ({currentQuestion.description})
                </span>
              </div>
            ) : (
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-500">
                Tüm Kültür Testi Tamamlandı! 🎉
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <div className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs sm:text-sm font-semibold ${
              isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <span className="text-[10px] uppercase font-sans font-medium text-slate-500 mr-1.5">Kalan</span>
              {solvedCount} / {CULTURE_QUESTIONS.length}
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
              const isWrong = wrongClickProvince === prov.name;
              const isFlashing = flashingProvinceId === prov.id;

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

          {/* Doğru Bilinen Kültür Unsurlarının İsimleri İlin Üstünde Belirir */}
          <g className="pointer-events-none select-none">
            {Object.values(solvedMap).map(({ q, status }) => {
              const prov = PROVINCES.find(
                (p) => p.name.toLocaleLowerCase('tr-TR') === q.provinceName.toLocaleLowerCase('tr-TR')
              );
              if (!prov) return null;

              return (
                <g key={`badge-${q.id}`}>
                  <circle
                    cx={prov.center[0]}
                    cy={prov.center[1]}
                    r={4}
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
                    ✨ {prov.name}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Yanlış Tıklama Uyarı */}
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
                className="text-[13px] font-black tracking-wider uppercase"
              >
                ✕ {wrongClickProvince} değil!
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

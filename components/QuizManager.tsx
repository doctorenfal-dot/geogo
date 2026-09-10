'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PROVINCES, Province } from '@/data/provincesData';
import { REGIONS } from '@/data/regions';
import { TurkeyMap } from './TurkeyMap';
import { QuizHeader } from './QuizHeader';
import { RegionFilter } from './RegionFilter';
import { ResultModal } from './ResultModal';

interface QuizManagerProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export const QuizManager: React.FC<QuizManagerProps> = ({ isDark, onToggleTheme }) => {
  const [activeRegionId, setActiveRegionId] = useState<string>('all');
  const [isPlateMode, setIsPlateMode] = useState<boolean>(false);
  const [provincesPool, setProvincesPool] = useState<Province[]>([]);
  const [remainingProvinces, setRemainingProvinces] = useState<Province[]>([]);
  const [currentTarget, setCurrentTarget] = useState<Province | null>(null);

  const [attempts, setAttempts] = useState<number>(0);
  const [provinceStatuses, setProvinceStatuses] = useState<
    Record<string, 'green' | 'yellow' | 'orange' | 'darkred'>
  >({});
  const [flashingProvinceId, setFlashingProvinceId] = useState<string | null>(null);

  // Yanlış tıklanan ilin harita üstünde flaş yapması
  const [wrongClick, setWrongClick] = useState<{
    id: string;
    name: string;
    center: [number, number];
  } | null>(null);
  const wrongClickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const [stats, setStats] = useState({
    firstTry: 0,
    secondTry: 0,
    thirdTry: 0,
    failed: 0,
    total: 0,
  });

  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Testi başlat veya sıfırla
  const initQuiz = useCallback((regionId: string) => {
    if (wrongClickTimerRef.current) {
      clearTimeout(wrongClickTimerRef.current);
    }
    setWrongClick(null);

    let filtered = PROVINCES;
    if (regionId !== 'all') {
      filtered = PROVINCES.filter((p) => p.regionId === regionId);
    }

    const shuffled = [...filtered].sort(() => Math.random() - 0.5);

    setProvincesPool(filtered);
    setRemainingProvinces(shuffled);
    setCurrentTarget(shuffled[0] || null);

    setAttempts(0);
    setProvinceStatuses({});
    setFlashingProvinceId(null);
    setTimerSeconds(0);
    setIsTimerRunning(true);
    setIsCompleted(false);
    setScore(0);

    setStats({
      firstTry: 0,
      secondTry: 0,
      thirdTry: 0,
      failed: 0,
      total: filtered.length,
    });
  }, []);

  useEffect(() => {
    initQuiz(activeRegionId);
  }, [activeRegionId, initQuiz]);

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

  const formattedTime = `${Math.floor(timerSeconds / 60)
    .toString()
    .padStart(2, '0')}:${(timerSeconds % 60).toString().padStart(2, '0')}`;

  // İl Tıklama Olayı
  const handleProvinceClick = (clickedId: string) => {
    if (isCompleted || !currentTarget) return;

    const clickedProvince = PROVINCES.find((p) => p.id === clickedId);

    // Durum 1: 3 defa yanlış tıklanıp bilemedi, hedef il yanıp sönüyor. Tıklayınca öğrenip kalıcı isim yazılır.
    if (flashingProvinceId) {
      if (clickedId === flashingProvinceId) {
        setFlashingProvinceId(null);
        advanceToNextTarget();
      }
      return;
    }

    // Durum 2: Doğru İl Tıklandı
    if (clickedId === currentTarget.id) {
      if (wrongClickTimerRef.current) {
        clearTimeout(wrongClickTimerRef.current);
      }
      setWrongClick(null);

      let status: 'green' | 'yellow' | 'orange' = 'green';
      let addedScore = 100;

      if (attempts === 0) {
        status = 'green';
        addedScore = 100;
        setStats((prev) => ({ ...prev, firstTry: prev.firstTry + 1 }));
      } else if (attempts === 1) {
        status = 'yellow';
        addedScore = 66;
        setStats((prev) => ({ ...prev, secondTry: prev.secondTry + 1 }));
      } else {
        status = 'orange';
        addedScore = 33;
        setStats((prev) => ({ ...prev, thirdTry: prev.thirdTry + 1 }));
      }

      setScore((prev) => prev + addedScore);
      setProvinceStatuses((prev) => ({ ...prev, [currentTarget.id]: status }));
      advanceToNextTarget();
    } else {
      // Durum 3: Yanlış İl Tıklandı
      if (clickedProvince) {
        if (wrongClickTimerRef.current) {
          clearTimeout(wrongClickTimerRef.current);
        }
        setWrongClick({
          id: clickedProvince.id,
          name: clickedProvince.name,
          center: clickedProvince.center,
        });
        wrongClickTimerRef.current = setTimeout(() => {
          setWrongClick(null);
        }, 1100);
      }

      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);

      if (nextAttempts >= 3) {
        // 3 Hakta da bilemedi: Koyu kırmızı yap ve doğru yerini yanıp sönerek göster
        setProvinceStatuses((prev) => ({ ...prev, [currentTarget.id]: 'darkred' }));
        setStats((prev) => ({ ...prev, failed: prev.failed + 1 }));
        setFlashingProvinceId(currentTarget.id);
      }
    }
  };

  const advanceToNextTarget = () => {
    setAttempts(0);
    const nextRemaining = remainingProvinces.slice(1);
    setRemainingProvinces(nextRemaining);

    if (nextRemaining.length > 0) {
      setCurrentTarget(nextRemaining[0]);
    } else {
      setIsCompleted(true);
      setIsTimerRunning(false);
      setCurrentTarget(null);
    }
  };

  const maxPossibleScore = stats.total * 100;
  const accuracy = stats.total > 0 ? Math.round((score / maxPossibleScore) * 100) : 0;
  const currentRegionObj = REGIONS.find((r) => r.id === activeRegionId);

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Bölge Butonları */}
        <RegionFilter
          activeRegionId={activeRegionId}
          onSelectRegion={(id) => setActiveRegionId(id)}
          isDark={isDark}
        />

        {/* Skor & Hedef İl Çubuğu */}
        <QuizHeader
          currentTargetName={currentTarget?.name || null}
          currentTargetPlate={currentTarget?.plateCode || null}
          remainingCount={remainingProvinces.length}
          totalCount={provincesPool.length}
          accuracy={accuracy}
          formattedTime={formattedTime}
          onRestart={() => initQuiz(activeRegionId)}
          isDark={isDark}
          onToggleTheme={onToggleTheme}
          isPlateMode={isPlateMode}
          onTogglePlateMode={() => setIsPlateMode(!isPlateMode)}
        />

        {/* Harita */}
        <TurkeyMap
          provinces={PROVINCES}
          provinceStatuses={provinceStatuses}
          flashingProvinceId={flashingProvinceId}
          wrongClick={wrongClick}
          onProvinceClick={handleProvinceClick}
          activeRegionId={activeRegionId}
          isDark={isDark}
        />

        {/* Sonuç Modalı */}
        <ResultModal
          isOpen={isCompleted}
          score={score}
          accuracy={accuracy}
          formattedTime={formattedTime}
          stats={stats}
          regionName={currentRegionObj?.name || 'Türkiye'}
          onRestart={() => initQuiz(activeRegionId)}
          isDark={isDark}
        />
    </div>
  );
};

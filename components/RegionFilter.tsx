'use client';

import React from 'react';
import { REGIONS, Region } from '@/data/regions';

interface RegionFilterProps {
  activeRegionId: string;
  onSelectRegion: (regionId: string) => void;
  isDark: boolean;
}

export const RegionFilter: React.FC<RegionFilterProps> = ({
  activeRegionId,
  onSelectRegion,
  isDark,
}) => {
  return (
    <div className="w-full overflow-x-auto pb-1 scrollbar-none">
      <div className={`inline-flex items-center gap-1 p-1 rounded-lg border ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
      }`}>
        {REGIONS.map((region: Region) => {
          const isActive = activeRegionId === region.id;
          return (
            <button
              key={region.id}
              onClick={() => onSelectRegion(region.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? isDark
                    ? 'bg-slate-100 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-900 text-white font-bold shadow-sm'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              {region.name}
              <span className={`ml-1.5 text-[10px] font-mono ${
                isActive
                  ? isDark ? 'text-slate-700' : 'text-slate-300'
                  : isDark ? 'text-slate-500' : 'text-slate-400'
              }`}>
                ({region.count})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

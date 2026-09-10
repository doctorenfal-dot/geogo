import worldCountriesRaw from './worldCountriesCatalog.json';

export interface WorldCountry {
  id: string;
  name: string;
  originalName: string;
  category: 'europe' | 'africa' | 'asia' | 'americas' | 'oceania' | 'other';
  center: [number, number];
  bounds?: [[number, number], [number, number]];
  path?: string;
}

export const WORLD_COUNTRIES: WorldCountry[] = worldCountriesRaw as unknown as WorldCountry[];

export const WORLD_CATEGORIES = [
  { id: 'all', label: 'Tüm Dünya' },
  { id: 'europe', label: 'Avrupa Ülkeleri' },
  { id: 'asia', label: 'Asya Ülkeleri' },
  { id: 'africa', label: 'Afrika Ülkeleri' },
  { id: 'americas', label: 'Amerika Ülkeleri' },
];

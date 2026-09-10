export interface Region {
  id: string;
  name: string;
  count: number;
}

export const REGIONS: Region[] = [
  { id: 'all', name: 'Tüm Türkiye', count: 81 },
  { id: 'marmara', name: 'Marmara', count: 11 },
  { id: 'ege', name: 'Ege', count: 8 },
  { id: 'akdeniz', name: 'Akdeniz', count: 8 },
  { id: 'icanadolu', name: 'İç Anadolu', count: 13 },
  { id: 'karadeniz', name: 'Karadeniz', count: 18 },
  { id: 'doguanadolu', name: 'Doğu Anadolu', count: 14 },
  { id: 'guneydogu', name: 'Güneydoğu Anadolu', count: 9 },
];

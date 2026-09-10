export interface WorldDistancePair {
  country1: string;
  country2: string;
  actualKm: number;
  region: 'europe' | 'asia' | 'africa' | 'americas' | 'world';
}

export const WORLD_DISTANCE_POOL: WorldDistancePair[] = [
  // Avrupa
  { country1: 'Fransa', country2: 'Almanya', actualKm: 1050, region: 'europe' },
  { country1: 'İtalya', country2: 'İspanya', actualKm: 1400, region: 'europe' },
  { country1: 'Birleşik Krallık', country2: 'Yunanistan', actualKm: 2400, region: 'europe' },
  { country1: 'Norveç', country2: 'İtalya', actualKm: 2600, region: 'europe' },
  { country1: 'Portekiz', country2: 'Polonya', actualKm: 2750, region: 'europe' },
  { country1: 'Almanya', country2: 'Türkiye', actualKm: 2450, region: 'europe' },
  { country1: 'İsveç', country2: 'Yunanistan', actualKm: 2650, region: 'europe' },
  { country1: 'Avusturya', country2: 'Hollanda', actualKm: 950, region: 'europe' },

  // Asya
  { country1: 'Türkiye', country2: 'Japonya', actualKm: 8900, region: 'asia' },
  { country1: 'Çin', country2: 'Hindistan', actualKm: 3780, region: 'asia' },
  { country1: 'Güney Kore', country2: 'Filipinler', actualKm: 2600, region: 'asia' },
  { country1: 'İran', country2: 'Pakistan', actualKm: 1950, region: 'asia' },
  { country1: 'Suudi Arabistan', country2: 'Malezya', actualKm: 7100, region: 'asia' },
  { country1: 'Kazakistan', country2: 'Tayland', actualKm: 4700, region: 'asia' },

  // Afrika
  { country1: 'Mısır', country2: 'Güney Afrika', actualKm: 7250, region: 'africa' },
  { country1: 'Fas', country2: 'Nijerya', actualKm: 3200, region: 'africa' },
  { country1: 'Kenya', country2: 'Senegal', actualKm: 6100, region: 'africa' },
  { country1: 'Cezayir', country2: 'Madagaskar', actualKm: 7850, region: 'africa' },
  { country1: 'Etiyopya', country2: 'Gana', actualKm: 4400, region: 'africa' },

  // Amerika
  { country1: 'Amerika Birleşik Devletleri', country2: 'Brezilya', actualKm: 7300, region: 'americas' },
  { country1: 'Kanada', country2: 'Arjantin', actualKm: 10400, region: 'americas' },
  { country1: 'Meksika', country2: 'Şili', actualKm: 6600, region: 'americas' },
  { country1: 'Kolombiya', country2: 'Peru', actualKm: 1900, region: 'americas' },

  // Dünya
  { country1: 'Türkiye', country2: 'Amerika Birleşik Devletleri', actualKm: 9700, region: 'world' },
  { country1: 'Birleşik Krallık', country2: 'Japonya', actualKm: 9550, region: 'world' },
  { country1: 'Fransa', country2: 'Avustralya', actualKm: 16900, region: 'world' },
  { country1: 'Brezilya', country2: 'Güney Afrika', actualKm: 7400, region: 'world' },
  { country1: 'Almanya', country2: 'Çin', actualKm: 7200, region: 'world' },
  { country1: 'Mısır', country2: 'Brezilya', actualKm: 9900, region: 'world' }
];

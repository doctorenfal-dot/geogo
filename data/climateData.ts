export interface ClimateRegion {
  id: string;
  name: string;
  shortDesc: string;
  characteristics: string;
  naturalVegetation: string;
  provinces: string[]; // Bu iklim tipine giren iller
  colorLight: string;
  colorDark: string;
}

export const CLIMATE_REGIONS: ClimateRegion[] = [
  {
    id: 'karadeniz_iklimi',
    name: 'Karadeniz İklimi',
    shortDesc: 'Her mevsim yağışlı, ılıman ve nemli.',
    characteristics: 'Yıllık yağış miktarı en yüksek iklimdir (Rize’de 2.400 mm üzeri). Kışlar ılık, yazlar serindir.',
    naturalVegetation: 'Geniş ve iğne yapraklı gür ormanlar.',
    provinces: ['Rize', 'Trabzon', 'Artvin', 'Giresun', 'Ordu', 'Samsun', 'Sinop', 'Kastamonu', 'Bartın', 'Zonguldak', 'Düzce', 'Bolu'],
    colorLight: '#10b981',
    colorDark: '#059669'
  },
  {
    id: 'akdeniz_iklimi',
    name: 'Akdeniz İklimi',
    shortDesc: 'Yazları sıcak ve kurak, kışları ılık ve yağışlı.',
    characteristics: 'Don olayları ve kar yağışı son derece nadirdir. Güneşlenme süresi çok yüksektir.',
    naturalVegetation: 'Maki (zeytin, zakkum, defne, mersin) ve kızılçam ormanları.',
    provinces: ['Antalya', 'Mersin', 'Adana', 'Hatay', 'Osmaniye', 'Muğla', 'Aydın', 'İzmir', 'Manisa', 'Balıkesir', 'Çanakkale'],
    colorLight: '#f59e0b',
    colorDark: '#d97706'
  },
  {
    id: 'step_iklimi',
    name: 'İç Anadolu Step (Ilıman Karasal) İklimi',
    shortDesc: 'Yazları sıcak ve kurak, kışları soğuk ve kar yağışlı.',
    characteristics: 'En fazla yağış ilkbaharda (kırkikindi yağmurları) düşer. Gece-gündüz sıcaklık farkı yüksektir.',
    naturalVegetation: 'İlkbaharda yeşerip yazın kuruyan Bozkır (Step).',
    provinces: ['Konya', 'Ankara', 'Eskişehir', 'Kayseri', 'Sivas', 'Yozgat', 'Kırşehir', 'Nevşehir', 'Niğde', 'Aksaray', 'Karaman', 'Kırıkkale', 'Çankırı', 'Çorum', 'Afyon', 'Uşak', 'Kütahya'],
    colorLight: '#eab308',
    colorDark: '#ca8a04'
  },
  {
    id: 'sert_karasal',
    name: 'Doğu Anadolu Sert Karasal İklimi',
    shortDesc: 'Kışları çok uzun, dondurucu ve yoğun kar yağışlı.',
    characteristics: 'Türkiye’nin en soğuk iklimidir (-40°C’ye varabilir). En fazla yağış yaz başlarında konveksiyonel olarak düşer.',
    naturalVegetation: 'Yaz yağışlarıyla yeşeren Alpin çayırlar ve sarıçam ormanları.',
    provinces: ['Erzurum', 'Kars', 'Ardahan', 'Ağrı', 'Muş', 'Bitlis', 'Van', 'Hakkari'],
    colorLight: '#38bdf8',
    colorDark: '#0284c7'
  },
  {
    id: 'guneydogu_karasal',
    name: 'Güneydoğu Anadolu Kurak Karasal İklimi',
    shortDesc: 'Yazları Türkiye’nin en sıcak ve en kurak iklimi.',
    characteristics: 'Basra alçak basıncının etkisiyle yazın sıcaklık 45°C’yi aşar; şiddetli buharlaşma vardır.',
    naturalVegetation: 'Antropojen bozkır ve kurakçıl çalılar.',
    provinces: ['Şanlıurfa', 'Gaziantep', 'Diyarbakır', 'Mardin', 'Batman', 'Siirt', 'Şırnak', 'Kilis', 'Adıyaman'],
    colorLight: '#f97316',
    colorDark: '#ea580c'
  },
  {
    id: 'marmara_gecis',
    name: 'Marmara Geçiş İklimi',
    shortDesc: 'Akdeniz, Karadeniz ve Karasal iklimlerin harmanlandığı geçiş kuşağı.',
    characteristics: 'Kışın Balkanlar üzerinden gelen soğuk hava dalgalarıyla kar alır, yazları Akdeniz kadar sıcak değildir.',
    naturalVegetation: 'Karışık ormanlar, psödomaki ve tarım alanları.',
    provinces: ['İstanbul', 'Bursa', 'Kocaeli', 'Sakarya', 'Yalova', 'Bilecik', 'Tekirdağ', 'Edirne', 'Kırklareli'],
    colorLight: '#a855f7',
    colorDark: '#9333ea'
  }
];

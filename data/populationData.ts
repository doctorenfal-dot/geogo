export interface ProvincePopulation {
  provinceName: string;
  population: number;
  formatted: string;
  rank: number;
}

// TÜİK 2023 Adrese Dayalı Nüfus Kayıt Sistemi (ADNKS) resmi verileri (Büyükten küçüğe 1 - 81)
export const PROVINCE_POPULATIONS: ProvincePopulation[] = [
  { provinceName: 'İstanbul', population: 15655924, formatted: '15.655.924', rank: 1 },
  { provinceName: 'Ankara', population: 5803482, formatted: '5.803.482', rank: 2 },
  { provinceName: 'İzmir', population: 4479525, formatted: '4.479.525', rank: 3 },
  { provinceName: 'Bursa', population: 3214571, formatted: '3.214.571', rank: 4 },
  { provinceName: 'Antalya', population: 2698249, formatted: '2.698.249', rank: 5 },
  { provinceName: 'Konya', population: 2320241, formatted: '2.320.241', rank: 6 },
  { provinceName: 'Adana', population: 2270298, formatted: '2.270.298', rank: 7 },
  { provinceName: 'Şanlıurfa', population: 2213964, formatted: '2.213.964', rank: 8 },
  { provinceName: 'Gaziantep', population: 2164134, formatted: '2.164.134', rank: 9 },
  { provinceName: 'Kocaeli', population: 2102907, formatted: '2.102.907', rank: 10 },
  { provinceName: 'Mersin', population: 1938389, formatted: '1.938.389', rank: 11 },
  { provinceName: 'Diyarbakır', population: 1818133, formatted: '1.818.133', rank: 12 },
  { provinceName: 'Hatay', population: 1544644, formatted: '1.544.644', rank: 13 },
  { provinceName: 'Manisa', population: 1475716, formatted: '1.475.716', rank: 14 },
  { provinceName: 'Kayseri', population: 1445495, formatted: '1.445.495', rank: 15 },
  { provinceName: 'Samsun', population: 1377546, formatted: '1.377.546', rank: 16 },
  { provinceName: 'Balıkesir', population: 1273519, formatted: '1.273.519', rank: 17 },
  { provinceName: 'Tekirdağ', population: 1167059, formatted: '1.167.059', rank: 18 },
  { provinceName: 'Aydın', population: 1161702, formatted: '1.161.702', rank: 19 },
  { provinceName: 'Van', population: 1127612, formatted: '1.127.612', rank: 20 },
  { provinceName: 'Kahramanmaraş', population: 1116618, formatted: '1.116.618', rank: 21 },
  { provinceName: 'Sakarya', population: 1098115, formatted: '1.098.115', rank: 22 },
  { provinceName: 'Muğla', population: 1066736, formatted: '1.066.736', rank: 23 },
  { provinceName: 'Denizli', population: 1059082, formatted: '1.059.082', rank: 24 },
  { provinceName: 'Eskişehir', population: 915418, formatted: '915.418', rank: 25 },
  { provinceName: 'Mardin', population: 888874, formatted: '888.874', rank: 26 },
  { provinceName: 'Trabzon', population: 824352, formatted: '824.352', rank: 27 },
  { provinceName: 'Ordu', population: 775800, formatted: '775.800', rank: 28 },
  { provinceName: 'Afyon', population: 751344, formatted: '751.344', rank: 29 },
  { provinceName: 'Erzurum', population: 749993, formatted: '749.993', rank: 30 },
  { provinceName: 'Malatya', population: 742725, formatted: '742.725', rank: 31 },
  { provinceName: 'Sivas', population: 650401, formatted: '650.401', rank: 32 },
  { provinceName: 'Batman', population: 647205, formatted: '647.205', rank: 33 },
  { provinceName: 'Tokat', population: 606934, formatted: '606.934', rank: 34 },
  { provinceName: 'Adıyaman', population: 604978, formatted: '604.978', rank: 35 },
  { provinceName: 'Elazığ', population: 604411, formatted: '604.411', rank: 36 },
  { provinceName: 'Zonguldak', population: 591492, formatted: '591.492', rank: 37 },
  { provinceName: 'Kütahya', population: 575670, formatted: '575.670', rank: 38 },
  { provinceName: 'Şırnak', population: 570612, formatted: '570.612', rank: 39 },
  { provinceName: 'Çanakkale', population: 570077, formatted: '570.077', rank: 40 },
  { provinceName: 'Osmaniye', population: 557666, formatted: '557.666', rank: 41 },
  { provinceName: 'Çorum', population: 524130, formatted: '524.130', rank: 42 },
  { provinceName: 'Ağrı', population: 510626, formatted: '510.626', rank: 43 },
  { provinceName: 'Giresun', population: 461154, formatted: '461.154', rank: 44 },
  { provinceName: 'Isparta', population: 449777, formatted: '449.777', rank: 45 },
  { provinceName: 'Aksaray', population: 438504, formatted: '438.504', rank: 46 },
  { provinceName: 'Yozgat', population: 418442, formatted: '418.442', rank: 47 },
  { provinceName: 'Düzce', population: 409865, formatted: '409.865', rank: 48 },
  { provinceName: 'Muş', population: 399879, formatted: '399.879', rank: 49 },
  { provinceName: 'Kastamonu', population: 388990, formatted: '388.990', rank: 50 },
  { provinceName: 'Kırklareli', population: 377156, formatted: '377.156', rank: 51 },
  { provinceName: 'Niğde', population: 377080, formatted: '377.080', rank: 52 },
  { provinceName: 'Uşak', population: 377001, formatted: '377.001', rank: 53 },
  { provinceName: 'Bitlis', population: 359747, formatted: '359.747', rank: 54 },
  { provinceName: 'Rize', population: 350506, formatted: '350.506', rank: 55 },
  { provinceName: 'Siirt', population: 347412, formatted: '347.412', rank: 56 },
  { provinceName: 'Amasya', population: 339529, formatted: '339.529', rank: 57 },
  { provinceName: 'Bolu', population: 324789, formatted: '324.789', rank: 58 },
  { provinceName: 'Nevşehir', population: 315994, formatted: '315.994', rank: 59 },
  { provinceName: 'Yalova', population: 304780, formatted: '304.780', rank: 60 },
  { provinceName: 'Kırıkkale', population: 285744, formatted: '285.744', rank: 61 },
  { provinceName: 'Bingöl', population: 285655, formatted: '285.655', rank: 62 },
  { provinceName: 'Kars', population: 278335, formatted: '278.335', rank: 63 },
  { provinceName: 'Hakkari', population: 287625, formatted: '287.625', rank: 64 },
  { provinceName: 'Burdur', population: 277452, formatted: '277.452', rank: 65 },
  { provinceName: 'Karaman', population: 263960, formatted: '263.960', rank: 66 },
  { provinceName: 'Karabük', population: 255242, formatted: '255.242', rank: 67 },
  { provinceName: 'Kırşehir', population: 247179, formatted: '247.179', rank: 68 },
  { provinceName: 'Erzincan', population: 243399, formatted: '243.399', rank: 69 },
  { provinceName: 'Edirne', population: 242000, formatted: '242.000', rank: 70 },
  { provinceName: 'Sinop', population: 229702, formatted: '229.702', rank: 71 },
  { provinceName: 'Bilecik', population: 228058, formatted: '228.058', rank: 72 },
  { provinceName: 'Iğdır', population: 209738, formatted: '209.738', rank: 73 },
  { provinceName: 'Bartın', population: 207238, formatted: '207.238', rank: 74 },
  { provinceName: 'Çankırı', population: 195766, formatted: '195.766', rank: 75 },
  { provinceName: 'Artvin', population: 172356, formatted: '172.356', rank: 76 },
  { provinceName: 'Kilis', population: 155179, formatted: '155.179', rank: 77 },
  { provinceName: 'Gümüşhane', population: 148539, formatted: '148.539', rank: 78 },
  { provinceName: 'Ardahan', population: 92819, formatted: '92.819', rank: 79 },
  { provinceName: 'Tunceli', population: 89317, formatted: '89.317', rank: 80 },
  { provinceName: 'Bayburt', population: 86047, formatted: '86.047', rank: 81 }
];

// Nüfus sırasına göre sıralı liste (Büyükten küçüğe: 1'den 81'e)
export const SORTED_BY_POPULATION = [...PROVINCE_POPULATIONS].sort((a, b) => b.population - a.population);

// İl isminden hızlı erişim haritası
export const POPULATION_MAP = new Map<string, ProvincePopulation>(
  PROVINCE_POPULATIONS.map(p => [p.provinceName, p])
);

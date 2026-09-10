export interface PhysicalEntity {
  id: string;
  name: string;
  category: 'mountain' | 'lake' | 'river' | 'plain';
  categoryLabel: string;
  type: 'point' | 'path';
  center: [number, number];
  pathData?: string;
  elevationOrLength?: string;
  hint: string;
  fact: string;
}

export const PHYSICAL_ENTITIES: PhysicalEntity[] = [
  // ================= DAĞLAR (Doruklar & Sıradağlar) =================
  {
    id: 'toroslar_aladaglar',
    name: 'Toros Dağları (Aladağlar & Bolkarlar)',
    category: 'mountain',
    categoryLabel: 'Büyük Sıradağ',
    type: 'point',
    center: [544.4, 336.4],
    elevationOrLength: '3.756 m (Demirkazık)',
    hint: 'Akdeniz boyunca uzanan, kanyonları ve buzul gölleriyle ünlü ana sıradağımız.',
    fact: 'Alp-Himalaya orojenez kuşağının Akdeniz kanadıdır; Demirkazık zirvesi dağcılık merkezidir.'
  },
  {
    id: 'toroslar_beydaglari',
    name: 'Batı Toroslar (Beydağları & Tahtalı)',
    category: 'mountain',
    categoryLabel: 'Sıradağ',
    type: 'point',
    center: [319.7, 408.9],
    elevationOrLength: '3.070 m (Kızlarsivrisi)',
    hint: 'Antalya Körfezi’nin batısında denize dik inen görkemli dağ sırası.',
    fact: 'Antalya sahilinde denize girilirken karlı zirveleri görülebilen eşsiz bir topoğrafyaya sahiptir.'
  },
  {
    id: 'agri_dagi',
    name: 'Ağrı Dağı',
    category: 'mountain',
    categoryLabel: 'Volkanik Dağ',
    type: 'point',
    center: [973.0, 221.6],
    elevationOrLength: '5.137 m',
    hint: 'Türkiye’nin ve Ermeni Yaylası’nın en yüksek zirvesi, ebedi doruk buzulu.',
    fact: '5.137 m ile Türkiye’nin çatısıdır; volkanik kökenlidir ve Nuh’un Gemisi efsanesiyle anılır.'
  },
  {
    id: 'cilo_dagi',
    name: 'Cilo Dağı (Reşko / Uludoruk)',
    category: 'mountain',
    categoryLabel: 'Tektonik Dağ',
    type: 'point',
    center: [960.9, 355.8],
    elevationOrLength: '4.135 m',
    hint: 'Türkiye’nin 2. en yüksek zirvesi ve dev vadi buzulları.',
    fact: 'Hakkari Yüksekova sınırında Güneydoğu Toroslar’ın en doğu buzul zirvesidir.'
  },
  {
    id: 'suphan_dagi',
    name: 'Süphan Dağı',
    category: 'mountain',
    categoryLabel: 'Volkanik Dağ',
    type: 'point',
    center: [903.9, 268.3],
    elevationOrLength: '4.058 m',
    hint: 'Van Gölü’nün hemen kuzeyinde yükselen Türkiye’nin 3. en yüksek dağı.',
    fact: 'Van Gölü havzasını kuzeyden çevreleyen sönmüş bir stratovolkandır.'
  },
  {
    id: 'kackar_daglari',
    name: 'Kaçkar Dağları',
    category: 'mountain',
    categoryLabel: 'Sıradağ',
    type: 'point',
    center: [825.5, 152.9],
    elevationOrLength: '3.932 m',
    hint: 'Rize-Artvin hattında Doğu Karadeniz’in en yüksek sıradağları.',
    fact: 'Buzul gölleri, sisli vadileri ve zengin alpin yaylalarıyla ünlüdür.'
  },
  {
    id: 'erciyes_dagi',
    name: 'Erciyes Dağı',
    category: 'mountain',
    categoryLabel: 'Volkanik Dağ',
    type: 'point',
    center: [557.1, 292.3],
    elevationOrLength: '3.917 m',
    hint: 'İç Anadolu’nun en yüksek dağı ve ünlü kış sporları merkezi.',
    fact: 'Kayseri ovası üzerinde tek başına yükselen dev sönmüş volkandır; Kapadokya tüflerini püskürtmüştür.'
  },
  {
    id: 'nemrut_dagi_volkan',
    name: 'Nemrut Dağı (Bitlis / Kaldera)',
    category: 'mountain',
    categoryLabel: 'Kaldera & Volkan',
    type: 'point',
    center: [876.0, 286.9],
    elevationOrLength: '2.948 m',
    hint: 'Zirvesinde dünyanın en büyük 2. krater gölü bulunan volkan.',
    fact: 'Bitlis Tatvan kıyısındaki kalderasıyla bir doğa harikasıdır; lav setiyle Van Gölü’nü oluşturmuştur.'
  },
  {
    id: 'hasan_dagi',
    name: 'Hasan Dağı',
    category: 'mountain',
    categoryLabel: 'Volkanik Dağ',
    type: 'point',
    center: [496.6, 316.6],
    elevationOrLength: '3.268 m',
    hint: 'Aksaray-Niğde düzlüğünde çift zirveli sönmüş volkan.',
    fact: 'Çatalhöyük duvar resimlerinde patlaması resmedilen tarihi volkandır.'
  },
  {
    id: 'uludag',
    name: 'Uludağ',
    category: 'mountain',
    categoryLabel: 'Batolit Dağ',
    type: 'point',
    center: [264.3, 199.4],
    elevationOrLength: '2.543 m',
    hint: 'Bursa sınırında Marmara Bölgesi’nin en yüksek zirvesi.',
    fact: 'Derinlik volkanizması granit kütlesi olup Türkiye’nin ilk kış sporları merkezidir.'
  },
  {
    id: 'kaz_daglari',
    name: 'Kaz Dağları (İda)',
    category: 'mountain',
    categoryLabel: 'Kırık Dağ (Horst)',
    type: 'point',
    center: [152.8, 221.7],
    elevationOrLength: '1.774 m',
    hint: 'Çanakkale-Balıkesir sınırında mitolojik İda Dağı ve oksijen deposu.',
    fact: 'Mitolojide tanrıların Troya Savaşı’nı izlediği kutsal dağ olarak bilinir.'
  },
  {
    id: 'ilgaz_daglari',
    name: 'Ilgaz Dağları',
    category: 'mountain',
    categoryLabel: 'Sıradağ',
    type: 'point',
    center: [482.8, 138.3],
    elevationOrLength: '2.587 m',
    hint: 'Kastamonu-Çankırı arasında Batı Karadeniz’in en yüksek dağ sırası.',
    fact: 'Gür köknar ormanları ve kış sporları merkezidir.'
  },

  // ================= GÖLLER (Gerçek Poligonlar) =================
  {
    id: 'van_golu',
    name: 'Van Gölü',
    category: 'lake',
    categoryLabel: 'Sodalı Göl',
    type: 'path',
    center: [907.3, 285.1],
    pathData: 'M 918.1 305.2 L 912.9 305.2 L 909.8 301.9 L 906.3 294.1 L 900.9 297.5 L 893.1 295.0 L 888.5 295.9 L 884.2 294.4 L 882.0 291.9 L 885.6 280.8 L 895.4 277.1 L 908.0 276.2 L 920.2 273.4 L 921.1 271.2 L 926.8 266.7 L 931.0 263.9 L 940.8 266.1 L 942.9 267.2 L 937.7 268.9 L 934.7 271.9 L 927.9 273.3 L 925.8 275.6 L 922.3 278.8 L 920.3 282.9 L 916.7 287.3 L 923.4 289.6 L 927.3 295.0 L 922.6 299.1 L 918.9 302.3 Z',
    hint: 'Türkiye’nin en büyük gölü ve dünyanın en büyük sodalı gölü.',
    fact: '3.755 km² büyüklüğündedir; içinde endemik inci kefali yaşar.'
  },
  {
    id: 'tuz_golu',
    name: 'Tuz Gölü',
    category: 'lake',
    categoryLabel: 'Tektonik Tuz Gölü',
    type: 'path',
    center: [457.4, 274.2],
    pathData: 'M 462.1 266.4 L 461.9 273.0 L 467.6 278.9 L 468.7 270.5 L 471.5 276.9 L 474.1 284.5 L 475.3 286.8 L 470.0 288.3 L 468.1 293.2 L 465.3 292.4 L 461.7 290.3 L 455.8 285.8 L 449.1 281.6 L 448.8 277.3 L 452.2 268.8 L 457.5 266.5 L 456.4 261.8 L 456.8 259.2 L 457.8 254.8 L 462.7 261.2 Z',
    hint: 'Türkiye’nin 2. büyük gölü ve tuz ihtiyacının %40’ını karşılar.',
    fact: 'Yazın kuruyarak beyaz tuz kütlesi haline gelir; flamingoların üreme merkezidir.'
  },
  {
    id: 'beysehir_golu',
    name: 'Beyşehir Gölü',
    category: 'lake',
    categoryLabel: 'Tatlı Su Gölü',
    type: 'path',
    center: [371.4, 339.5],
    pathData: 'M 370.7 347.9 L 369.5 344.3 L 367.3 336.4 L 362.8 327.4 L 366.4 326.4 L 371.3 329.8 L 375.2 334.4 L 377.3 336.7 L 380.1 340.8 L 379.6 344.6 L 375.2 346.0 L 372.1 346.8 Z',
    hint: 'Konya-Isparta sınırında Türkiye’nin en büyük tatlı su gölü.',
    fact: 'Milli park statüsündedir; içinde irili ufaklı 33 ada bulunur.'
  },
  {
    id: 'egirdir_golu',
    name: 'Eğirdir Gölü',
    category: 'lake',
    categoryLabel: 'Tatlı Su Gölü',
    type: 'path',
    center: [340.8, 321.3],
    pathData: 'M 338.9 308.0 L 342.8 307.8 L 341.1 313.7 L 345.0 318.8 L 345.9 323.0 L 344.0 328.7 L 342.1 333.3 L 339.0 329.8 L 337.1 326.8 L 339.9 321.3 L 339.1 316.0 L 336.2 310.9 Z',
    hint: 'Isparta’da Göller Yöresi’nin en temiz tatlı su göllerinden biri.',
    fact: 'Yeşilada ve Can Ada isimli iki küçük adası vardır.'
  },
  {
    id: 'iznik_golu',
    name: 'İznik Gölü',
    category: 'lake',
    categoryLabel: 'Tektonik Göl',
    type: 'path',
    center: [277.4, 177.6],
    pathData: 'M 265.4 177.6 A 12 6 0 1 0 289.4 177.6 A 12 6 0 1 0 265.4 177.6 Z',
    hint: 'Bursa sınırında Marmara Bölgesi’nin en büyük gölü ve batık bazilika.',
    fact: 'Tarihi surların kıyısındadır; suların altında antik bazilika kalıntıları keşfedilmiştir.'
  },

  // ================= NEHİRLER (Gerçek GIS Projeksiyonlu Vadi Hatları) =================
  {
    id: 'kizilirmak',
    name: 'Kızılırmak',
    category: 'river',
    categoryLabel: 'Nehir',
    type: 'path',
    center: [526.5, 149.2],
    elevationOrLength: '1.355 km',
    pathData: 'M 691.0 215.6 L 629.9 239.8 L 582.9 251.9 L 550.0 264.0 L 526.5 282.1 L 488.9 276.0 L 474.8 251.9 L 465.4 215.6 L 488.9 173.4 L 526.5 149.2 L 554.7 125.0 L 578.2 106.9',
    hint: 'Tamamı Türkiye sınırları içinde doğup denize dökülen en uzun nehir.',
    fact: '1.355 km uzunluğuyla İç Anadolu yayını çizip Bafra deltasından Karadeniz’e dökülür.'
  },
  {
    id: 'firat_nehri',
    name: 'Fırat Nehri',
    category: 'river',
    categoryLabel: 'Uluslararası Nehir',
    type: 'path',
    center: [700.4, 306.2],
    elevationOrLength: '2.800 km',
    pathData: 'M 794.4 215.6 L 709.8 245.8 L 700.4 264.0 L 709.8 276.0 L 700.4 306.2 L 700.4 354.6 L 676.9 384.8 L 676.9 396.8',
    hint: 'Keban, Karakaya ve Atatürk barajlarının kurulu olduğu en coşkun nehir.',
    fact: 'Türkiye’nin hidroelektrik enerjisinin belkemiğidir; Basra Körfezi’ne dökülür.'
  },
  {
    id: 'dicle_nehri',
    name: 'Dicle Nehri',
    category: 'river',
    categoryLabel: 'Uluslararası Nehir',
    type: 'path',
    center: [817.9, 336.4],
    elevationOrLength: '1.900 km',
    pathData: 'M 747.4 300.2 L 780.3 330.4 L 817.9 336.4 L 836.8 342.5 L 874.4 366.6 L 883.8 378.7',
    hint: 'Diyarbakır On Gözlü Köprü ve Hasankeyf’ten geçen kadim Mezopotamya nehri.',
    fact: 'Fırat Nehri ile Irak’ta Şattülarap’ta birleşir.'
  },
  {
    id: 'sakarya_nehri',
    name: 'Sakarya Nehri',
    category: 'river',
    categoryLabel: 'Nehir',
    type: 'path',
    center: [347.9, 203.6],
    elevationOrLength: '824 km',
    pathData: 'M 347.9 239.8 L 385.5 227.7 L 399.6 221.7 L 371.4 203.6 L 300.9 179.4 L 319.7 155.2 L 333.8 137.1',
    hint: 'Eskişehir ve Ankara’dan geçip Karasu’dan Karadeniz’e dökülen nehir.',
    fact: 'Kurtuluş Savaşı’nın dönüm noktası Sakarya Meydan Muharebesi bu nehrin kıyısında verilmiştir.'
  },
  {
    id: 'yesilirmak',
    name: 'Yeşilırmak',
    category: 'river',
    categoryLabel: 'Nehir',
    type: 'path',
    center: [606.4, 191.5],
    elevationOrLength: '519 km',
    pathData: 'M 667.5 203.6 L 606.4 191.5 L 573.5 161.3 L 615.8 131.1',
    hint: 'Amasya’dan geçip Çarşamba deltasını oluşturarak Karadeniz’e dökülen nehir.',
    fact: 'Çarşamba Ovası’nın bereketli alüvyonlarını taşır.'
  },

  // ================= OVALAR & DELTALAR =================
  {
    id: 'cukurova',
    name: 'Çukurova',
    category: 'plain',
    categoryLabel: 'Delta Ovası',
    type: 'point',
    center: [559.4, 390.8],
    hint: 'Seyhan ve Ceyhan nehirlerinin Akdeniz’e döktüğü Türkiye’nin en büyük deltası.',
    fact: 'Pamuk, mısır ve narenciye deposu olup yılda 3 mahsul alınabilir.'
  },
  {
    id: 'konya_ovasi',
    name: 'Konya Ovası',
    category: 'plain',
    categoryLabel: 'İç Ova',
    type: 'point',
    center: [432.5, 330.4],
    hint: 'Türkiye’nin en geniş yüzölçümüne sahip tahıl ambarı ovası.',
    fact: 'Eski göl tabanı alüvyal topraklardan oluşur.'
  },
  {
    id: 'bafra_ovasi',
    name: 'Bafra Ovası',
    category: 'plain',
    categoryLabel: 'Delta Ovası',
    type: 'point',
    center: [580.6, 108.1],
    hint: 'Kızılırmak’ın Karadeniz ağzındaki pirinç ve tütün deltası.',
    fact: 'Kızılırmak Deltası Kuş Cenneti’ne ev sahipliği yapar.'
  },
  {
    id: 'carsamba_ovasi',
    name: 'Çarşamba Ovası',
    category: 'plain',
    categoryLabel: 'Delta Ovası',
    type: 'point',
    center: [618.2, 128.1],
    hint: 'Yeşilırmak’ın Karadeniz ağzındaki verimli meyve ve sebze deltası.',
    fact: 'Alüvyon birikintileriyle oluşmuş kıyı delta ovasıdır.'
  },
  {
    id: 'harran_ovasi',
    name: 'Harran Ovası',
    category: 'plain',
    categoryLabel: 'Tektonik Ova',
    type: 'point',
    center: [723.9, 393.8],
    hint: 'Şanlıurfa’da GAP ile sulanan bereketli kırmızı toprak ovası.',
    fact: 'Tarihi Harran kümbet evleri bu ovada yer alır; pamuk üretiminin kalbidir.'
  }
];

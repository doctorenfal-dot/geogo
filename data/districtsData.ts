export interface FamousDistrict {
  id: string;
  name: string;
  provinceName: string;
  category: 'turizm' | 'tarih' | 'sanayi' | 'tarim' | 'doga';
  hint: string;
  fact: string;
}

export const FAMOUS_DISTRICTS: FamousDistrict[] = [
  {
    id: 'bodrum',
    name: 'Bodrum',
    provinceName: 'Muğla',
    category: 'turizm',
    hint: 'Kalesi, bembeyaz evleri ve Halikarnas Balıkçısı ile ünlü tatil cenneti.',
    fact: 'Antik Dünyanın Yedi Harikası’ndan biri olan Halikarnas Mozolesi buradadır.'
  },
  {
    id: 'alanya',
    name: 'Alanya',
    provinceName: 'Antalya',
    category: 'turizm',
    hint: 'Kızılkule, Damlataş Mağarası ve Kleopatra Plajı ile ünlü Akdeniz ilçesi.',
    fact: 'Selçuklu Sultanı Alaeddin Keykubad tarafından kışlık başkent olarak kullanılmıştır.'
  },
  {
    id: 'safranbolu',
    name: 'Safranbolu',
    provinceName: 'Karabük',
    category: 'tarih',
    hint: 'UNESCO Dünya Mirası tarihi konakları ve lokumuyla ünlü ilçe.',
    fact: 'Osmanlı sivil mimarisini en saf haliyle günümüze taşıyan açık hava müzesi gibidir.'
  },
  {
    id: 'fethiye',
    name: 'Fethiye',
    provinceName: 'Muğla',
    category: 'turizm',
    hint: 'Ölüdeniz, Kelebekler Vadisi ve Babadağ yamaç paraşütü merkezi.',
    fact: 'Antik adı Telmessos olan ilçe, Likya uygarlığının en önemli liman kentlerinden biriydi.'
  },
  {
    id: 'cizre',
    name: 'Cizre',
    provinceName: 'Şırnak',
    category: 'tarih',
    hint: 'Dicle Nehri kenarında, Sibernetik bilgini El Cezeri ve Mem û Zîn türbesiyle tanınır.',
    fact: 'MÖ 4000’lere dayanan tarihiyle Mezopotamya’nın en eski yerleşim merkezlerindendir.'
  },
  {
    id: 'dogubayazit',
    name: 'Doğubayazıt',
    provinceName: 'Ağrı',
    category: 'tarih',
    hint: 'Görkemli İshak Paşa Sarayı ve Ağrı Dağı eteklerindeki sınır ilçemiz.',
    fact: 'İshak Paşa Sarayı, dünyada ilk merkezi ısıtma (kalorifer) sisteminin kurulduğu yapıdır.'
  },
  {
    id: 'inegol',
    name: 'İnegöl',
    provinceName: 'Bursa',
    category: 'sanayi',
    hint: 'Ünlü köftesi ve Türkiye mobilya sanayisinin başkenti olan dev ilçe.',
    fact: 'Türkiye mobilya ihracatının %35’inden fazlasını tek başına karşılar.'
  },
  {
    id: 'siverek',
    name: 'Siverek',
    provinceName: 'Şanlıurfa',
    category: 'tarim',
    hint: 'Karacadağ bazalt taşları ve Türkiye’nin nüfusu en büyük ilçelerinden biri.',
    fact: 'Nüfusu ve yüzölçümüyle Türkiye’deki yaklaşık 30 ilden daha büyüktür.'
  },
  {
    id: 'midyat',
    name: 'Midyat',
    provinceName: 'Mardin',
    category: 'tarih',
    hint: 'Telkâri gümüş işlemeciliği, taş konakları ve Süryani manastırlarıyla meşhur.',
    fact: 'Farklı din ve dillerin (Müslüman, Süryani, Ezidi) asırlardır bir arada yaşadığı hoşgörü kentidir.'
  },
  {
    id: 'bandirma',
    name: 'Bandırma',
    provinceName: 'Balıkesir',
    category: 'sanayi',
    hint: 'Marmara Denizi kıyısında büyük limanı ve bor madeni tesisleriyle ünlü ilçe.',
    fact: 'Kurtuluş Savaşı’nın son kurşununun atıldığı Ayyıldız Tepe buradadır.'
  },
  {
    id: 'polatli',
    name: 'Polatlı',
    provinceName: 'Ankara',
    category: 'tarih',
    hint: 'Sakarya Meydan Muharebesi’nin geçtiği Duatepe ve Gordion Antik Kenti (Kral Midas).',
    fact: 'Gordion, 2023 yılında UNESCO Dünya Mirası Listesi’ne kabul edilmiştir.'
  },
  {
    id: 'corlu',
    name: 'Çorlu',
    provinceName: 'Tekirdağ',
    category: 'sanayi',
    hint: 'Trakya’nın sanayi ve tekstil merkezi, nüfusu yarım milyona yaklaşan ilçe.',
    fact: 'Gelişmiş sanayisiyle bölgenin en büyük ticaret ve ulaşım kavşağıdır.'
  },
  {
    id: 'sebinkarahisar',
    name: 'Şebinkarahisar',
    provinceName: 'Giresun',
    category: 'tarih',
    hint: 'Görkemli kalesi, Meryem Ana Manastırı ve pestiliyle ünlü tarihi ilçe (Eski vilayet).',
    fact: '1933 yılına kadar bağımsız bir ildi; Atatürk 1924’te burayı ziyaret etmiştir.'
  },
  {
    id: 'erbaa',
    name: 'Erbaa',
    provinceName: 'Tokat',
    category: 'tarim',
    hint: 'Dünyaca ünlü asma yaprağı (sarmalık bağ yaprağı) ve verimli ovası.',
    fact: 'Coğrafi işaretli narince bağ yaprağıyla Türkiye’nin yaprak ihracat üssüdür.'
  },
  {
    id: 'elbistan',
    name: 'Elbistan',
    provinceName: 'Kahramanmaraş',
    category: 'tarim',
    hint: 'Ceyhan Nehri’nin doğduğu Pınarbaşı kaynağı ve termik santralleriyle tanınır.',
    fact: 'Dulkadiroğulları Beyliği’ne uzun yıllar başkentlik yapmıştır.'
  },
  {
    id: 'cesme',
    name: 'Çeşme',
    provinceName: 'İzmir',
    category: 'turizm',
    hint: 'Alaçatı rüzgar sörfü, sakızlı dondurması ve kalesiyle ünlü Ege tatil merkezi.',
    fact: 'Dünyanın en iyi rüzgar sörfü parkurlarından biri Alaçatı koyudur.'
  },
  {
    id: 'merzifon',
    name: 'Merzifon',
    provinceName: 'Amasya',
    category: 'tarih',
    hint: 'Merzifonlu Kara Mustafa Paşa Külliyesi ve havalimanıyla Orta Karadeniz’in kavşak noktası.',
    fact: 'Osmanlı döneminde Viyana Kuşatması’nı yöneten sadrazamın memleketidir.'
  },
  {
    id: 'anamur',
    name: 'Anamur',
    provinceName: 'Mersin',
    category: 'tarim',
    hint: 'Yerli muzu, Mamure Kalesi ve Türkiye’nin en güney noktası olan Anamur Burnu.',
    fact: 'Türkiye’nin tropikal mikroklima sayesinde açıkta muz yetiştirilen ilk bölgesidir.'
  },
  {
    id: 'akcay',
    name: 'Edremit',
    provinceName: 'Balıkesir',
    category: 'turizm',
    hint: 'Kaz Dağları etekleri, zeytinyağı ve Akçay-Altınoluk sahil beldeleri.',
    fact: 'Zeytin varlığı ve yüksek oksijen oranıyla mitolojide İda Dağı olarak geçer.'
  },
  {
    id: 'gebze',
    name: 'Gebze',
    provinceName: 'Kocaeli',
    category: 'sanayi',
    hint: 'Bilişim Vadisi, TÜBİTAK ve Fatih Sultan Mehmet’in otağını kurup vefat ettiği Hünkar Çayırı.',
    fact: 'Kartacalı komutan Hannibal’ın mezarı Gebze’de bulunmaktadır.'
  },
  {
    id: 'tatvan',
    name: 'Tatvan',
    provinceName: 'Bitlis',
    category: 'doga',
    hint: 'Van Gölü feribot iskelesi ve Nemrut Krater Gölü eteklerindeki büyük ilçe.',
    fact: 'Van Gölü üzerinden tren vagonlarını taşıyan dev feribotların hareket limanıdır.'
  },
  {
    id: 'urfa_birecik',
    name: 'Birecik',
    provinceName: 'Şanlıurfa',
    category: 'doga',
    hint: 'Nesli tükenmekte olan Kelaynak kuşlarının dünyadaki son doğal üreme merkezi ve patlıcan kebabı.',
    fact: 'Fırat Nehri kıyısında kurulmuş ilçe, Kelaynak Üretme İstasyonu’na ev sahipliği yapar.'
  },
  {
    id: 'marmaris',
    name: 'Marmaris',
    provinceName: 'Muğla',
    category: 'turizm',
    hint: 'Çam balı, yat turizmi ve Ege ile Akdeniz’in kesiştiği koylar.',
    fact: 'Dünya çam balı üretiminin yaklaşık %70’i bu bölgedeki kızılçam ormanlarından sağlanır.'
  },
  {
    id: 'aksehir',
    name: 'Akşehir',
    provinceName: 'Konya',
    category: 'tarih',
    hint: 'Gölüne maya çalınan Nasreddin Hoca’nın türbesi ve tescilli kirazı.',
    fact: 'Kurtuluş Savaşı’nda Batı Cephesi Karargahı olarak tarihi kararlar burada alınmıştır.'
  },
  {
    id: 'kahta',
    name: 'Kâhta',
    provinceName: 'Adıyaman',
    category: 'tarih',
    hint: 'Nemrut Dağı Kommagene Krallığı dev heykellerine çıkış kapısı olan ilçe.',
    fact: 'Cendere Köprüsü ve Arsemia Antik Kenti bu ilçenin sınırları içindedir.'
  },
  {
    id: 'kastamonu_tosya',
    name: 'Tosya',
    provinceName: 'Kastamonu',
    category: 'tarim',
    hint: 'Ünlü Tosya pirinci (sarıkılçık) ve ahşap kapılarıyla meşhur ilçe.',
    fact: 'Ilgaz Dağları’nın güney eteklerinde yer alır ve Türkiye pirinç borsasının kalbidir.'
  },
  {
    id: 'urgup',
    name: 'Ürgüp',
    provinceName: 'Nevşehir',
    category: 'turizm',
    hint: 'Üç Güzeller peribacaları, kaya otelleri ve Asmalı Konak ile Kapadokya’nın merkezi.',
    fact: 'Kapadokya bölgesinin en hareketli turizm ve volkanik kaya yerleşim merkezidir.'
  }
];

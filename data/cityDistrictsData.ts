export interface DistrictPolygon {
  id: string;
  name: string;
  provinceName: string;
  center: [number, number]; // Normalize edilmiş [0-100] veya SVG koordinatı
  hint: string;
}

export interface CityWithDistricts {
  provinceName: string;
  plateCode: number;
  center: [number, number];
  districts: DistrictPolygon[];
}

// Türkiye'nin en popüler illerinin ilçe listeleri ve koordinat merkezleri
export const PROVINCE_DISTRICT_LISTS: Record<string, { plateCode: number; districts: { name: string; isCentral?: boolean; hint: string }[] }> = {
  'İstanbul': {
    plateCode: 34,
    districts: [
      { name: 'Kadıköy', hint: 'Moda sahili, Boğa Heykeli ve Bağdat Caddesi.' },
      { name: 'Beşiktaş', hint: 'Çarşı, Dolmabahçe Sarayı ve Ortaköy Meydanı.' },
      { name: 'Üsküdar', hint: 'Kız Kulesi, Mihrimah Sultan Camii ve Çamlıca Tepesi.' },
      { name: 'Fatih', isCentral: true, hint: 'Tarihi yarımada; Ayasofya, Sultanahmet ve Kapalıçarşı.' },
      { name: 'Beyoğlu', hint: 'İstiklal Caddesi, Taksim Meydanı ve Galata Kulesi.' },
      { name: 'Şişli', hint: 'Nişantaşı, Cevahir AVM ve Atatürk Müzesi.' },
      { name: 'Bakırköy', hint: 'Ataköy sahili ve Özgürlük Meydanı.' },
      { name: 'Sarıyer', hint: 'Rumeli Hisarı, Emirgan Korusu ve Kilyos sahilleri.' },
      { name: 'Beykoz', hint: 'Anadolu Kavağı, Yuşa Tepesi ve Beykoz Kundura.' },
      { name: 'Kartal', hint: 'Aydos Ormanı ve Dragos sahili.' },
      { name: 'Pendik', hint: 'Sabiha Gökçen Havalimanı ve Yüksek Hızlı Tren garı.' },
      { name: 'Maltepe', hint: 'Süreyya Plajı ve Maltepe sahil parkı.' },
      { name: 'Silivri', hint: 'İstanbul’un Trakya çıkışındaki en batı sahil ilçesi.' },
      { name: 'Şile', hint: 'Tarihi deniz feneri ve Karadeniz plajları.' },
      { name: 'Adalar', hint: 'Büyükada, Heybeliada, Burgazada ve Kınalıada.' },
      { name: 'Eyüpsultan', hint: 'Eyüp Sultan Camii ve Pierre Loti Tepesi.' }
    ]
  },
  'Ankara': {
    plateCode: 6,
    districts: [
      { name: 'Çankaya', hint: 'Anıtkabir, Kızılay Meydanı, Atakule ve Tunalı Hilmi.' },
      { name: 'Altındağ', isCentral: true, hint: 'Ankara Kalesi, Hacı Bayram Veli ve Hamamönü.' },
      { name: 'Keçiören', hint: 'Estergon Kalesi ve teleferiğiyle ünlü dev ilçe.' },
      { name: 'Yenimahalle', hint: 'Batıkent, Atatürk Orman Çiftliği ve OSTİM.' },
      { name: 'Mamak', hint: 'Ankara’nın doğu kapısı ve Saimekadın.' },
      { name: 'Etimesgut', hint: 'Eryaman ve Zırhlı Birlikler yerleşkesi.' },
      { name: 'Sincan', hint: 'Lale Meydanı ve Harikalar Diyarı parkı.' },
      { name: 'Gölbaşı', hint: 'Mogan ve Eymir gölleri kıyısındaki sayfiye ilçesi.' },
      { name: 'Polatlı', hint: 'Gordion Antik Kenti ve Sakarya Meydan Muharebesi Duatepe.' },
      { name: 'Beypazarı', hint: 'Tarihi Osmanlı konakları, havuç lokumu ve maden suyu.' },
      { name: 'Kızılcahamam', hint: 'Soğuksu Milli Parkı, çam ormanları ve kaplıcaları.' }
    ]
  },
  'İzmir': {
    plateCode: 35,
    districts: [
      { name: 'Konak', isCentral: true, hint: 'Tarihi Saat Kulesi, Kemeraltı Çarşısı ve Kordon.' },
      { name: 'Karşıyaka', hint: 'Karşıyaka Çarşısı, Bostanlı İskelesi ve sahil bandı.' },
      { name: 'Bornova', hint: 'Ege Üniversitesi, Küçükpark ve tarihi Levanten köşkleri.' },
      { name: 'Buca', hint: 'Dokuz Eylül Üniversitesi, tarihi Protestan kilisesi ve Forbes köşkü.' },
      { name: 'Çeşme', hint: 'Alaçatı rüzgar sörfü, Ilıca Plajı ve Çeşme Kalesi.' },
      { name: 'Urla', hint: 'Enginar festivali, İskele ve zeytinyağı bağ yolu.' },
      { name: 'Seferihisar', hint: 'Türkiye’nin ilk sakin şehri (Cittaslow) ve Sığacık Kalesi.' },
      { name: 'Selçuk', hint: 'Efes Antik Kenti, Meryem Ana Evi ve Şirince köyü.' },
      { name: 'Foça', hint: 'Eski Foça taş evleri ve Akdeniz foklarının barınağı siren kayalıkları.' },
      { name: 'Bergama', hint: 'UNESCO Dünya Mirası Pergamon Akropolü ve Asklepion.' },
      { name: 'Ödemiş', hint: 'Bozdağ, Gölcük Gölü ve Birgi tarihi köyü.' }
    ]
  },
  'Antalya': {
    plateCode: 7,
    districts: [
      { name: 'Muratpaşa', isCentral: true, hint: 'Tarihi Kaleiçi, Üçkapılar (Hadrianus) ve Düden Park.' },
      { name: 'Konyaaltı', hint: 'Ünlü çakıllı Konyaaltı Plajı ve Tünektepe teleferiği.' },
      { name: 'Kepez', hint: 'Yukarı Düden Şelalesi ve Antalya Kent Ormanı.' },
      { name: 'Alanya', hint: 'Kızılkule, Alanya Kalesi, Kleopatra Plajı ve Damlataş Mağarası.' },
      { name: 'Manavgat', hint: 'Manavgat Şelalesi ve Side Antik Tiyatrosu.' },
      { name: 'Kemer', hint: 'Olimpos, Phaselis koyları ve Tahtalı Dağı teleferiği.' },
      { name: 'Kaş', hint: 'Kalkan, Kaputaş Plajı, Kekova batık şehri ve Meis manzarası.' },
      { name: 'Serik', hint: 'Aspendos Tiyatrosu ve Belek golf otelleri.' },
      { name: 'Kumluca', hint: 'Adrasan koyu, Gelidonya Feneri ve örtü altı domates üretimi.' },
      { name: 'Gazipaşa', hint: 'Doğal havuzlar (Koru Plajı) ve tropikal meyve bahçeleri.' }
    ]
  },
  'Bursa': {
    plateCode: 16,
    districts: [
      { name: 'Osmangazi', isCentral: true, hint: 'Ulu Camii, Osman Gazi ve Orhan Gazi Türbeleri, Kapalı Çarşı.' },
      { name: 'Yıldırım', hint: 'Yeşil Türbe, Yeşil Camii ve Cumalıkızık tarihi köyü.' },
      { name: 'Nilüfer', hint: 'FSM Bulvarı, Gölyazı köyü ve çağdaş yerleşimler.' },
      { name: 'İnegöl', hint: 'Ünlü İnegöl Köftesi ve mobilya sanayisi.' },
      { name: 'Mudanya', hint: 'Mudanya Mütareke Evi ve Trilye tarihi zeytin kasabası.' },
      { name: 'Gemlik', hint: 'Coğrafi işaretli sofralık siyah zeytini ve körfez limanı.' },
      { name: 'İznik', hint: 'Çinileri, surları, Ayasofya Orhan Camii ve İznik Gölü.' },
      { name: 'Mustafakemalpaşa', hint: 'Suuçtu Şelalesi ve peynir tatlısı.' },
      { name: 'Karacabey', hint: 'Longoz ormanları ve hara at çiftlikleri.' }
    ]
  }
};

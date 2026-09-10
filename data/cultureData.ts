export interface CultureQuestion {
  id: string;
  item: string; // Soru: meşhur şey (ör. Cağ Kebabı, Zeugma Mozaikleri, Çemenli Pastırma)
  category: 'yemek' | 'tarih' | 'doga' | 'kultur';
  provinceName: string; // Cevap olan il
  description: string;
}

export const CULTURE_QUESTIONS: CultureQuestion[] = [
  {
    id: 'cag_kebabi',
    item: 'Cağ Kebabı & Oltu Taşı',
    category: 'yemek',
    provinceName: 'Erzurum',
    description: 'Yatık şişte pişirilen marine kuzu eti ve siyah tesbih taşı.'
  },
  {
    id: 'manti_pastirma',
    item: 'Pastırma, Sucuk & Mantı',
    category: 'yemek',
    provinceName: 'Kayseri',
    description: 'Çemenli pastırma, fermente sucuk ve bir kaşığa 40 tane sığan meşhur mantı.'
  },
  {
    id: 'etliekmek',
    item: 'Etliekmek & Fırın Kebabı',
    category: 'yemek',
    provinceName: 'Konya',
    description: 'Bıçakarası ince uzun hamurlu etli pide ve taş fırın kuzu tandırı.'
  },
  {
    id: 'baklava_antep',
    item: 'Baklava & Beyran Çorbası',
    category: 'yemek',
    provinceName: 'Gaziantep',
    description: 'İncecik yufkalarla açılan fıstıklı baklava ve acılı sarımsaklı beyran.'
  },
  {
    id: 'kunefe',
    item: 'Künefe & Tepsi Kebabı',
    category: 'yemek',
    provinceName: 'Hatay',
    description: 'Özel tuzsuz peynirli sıcak tatlı ve zırhta çekilen fırın tepsisi kebabı.'
  },
  {
    id: 'adana_kebabi',
    item: 'Zırh Kebabı & Şalgam Suyu',
    category: 'yemek',
    provinceName: 'Adana',
    description: 'Erkek koyun etinden kuyruk yağıyla zırhta çekilen acılı kebap.'
  },
  {
    id: 'iskender_kebap',
    item: 'İskender Kebap & Kestane Şekeri',
    category: 'yemek',
    provinceName: 'Bursa',
    description: 'Pide üzerine döner, domates sosu, kızgın tereyağı ve yoğurt.'
  },
  {
    id: 'gobeklitepe',
    item: 'Göbeklitepe & Balıklıgöl',
    category: 'tarih',
    provinceName: 'Şanlıurfa',
    description: '12.000 yıllık insanlık tarihinin sıfır noktası ve Hz. İbrahim efsanesi.'
  },
  {
    id: 'sumela_manastiri',
    item: 'Sümela Manastırı & Akçaabat Köftesi',
    category: 'tarih',
    provinceName: 'Trabzon',
    description: 'Sarp kayalıklara oyulmuş Meryem Ana manastırı ve sarımsaklı köfte.'
  },
  {
    id: 'efes_antik_kenti',
    item: 'Efes Antik Kenti & Boyoz',
    category: 'tarih',
    provinceName: 'İzmir',
    description: 'Celsus Kütüphanesi, Artemis Tapınağı ve fırından sıcak çıkan mayasız hamur.'
  },
  {
    id: 'ishak_pasa',
    item: 'İshak Paşa Sarayı',
    category: 'tarih',
    provinceName: 'Ağrı',
    description: 'Doğubayazıt ovasına bakan, dünyada ilk kalorifer sistemli Osmanlı sarayı.'
  },
  {
    id: 'anitkabir',
    item: 'Anıtkabir & Beypazarı Kurusu',
    category: 'tarih',
    provinceName: 'Ankara',
    description: 'Gazi Mustafa Kemal Atatürk’ün ebedi istirahatgâhı.'
  },
  {
    id: 'truva_ati',
    item: 'Truva Antik Kenti & Ezine Peyniri',
    category: 'tarih',
    provinceName: 'Çanakkale',
    description: 'Homeros destanlarına konu olan tahta at efsanesi ve meşhur koyun peyniri.'
  },
  {
    id: 'nemrut_heykeller',
    item: 'Nemrut Dağı Dev Tanrı Heykelleri',
    category: 'tarih',
    provinceName: 'Adıyaman',
    description: 'Kommagene Krallığı’nın 2.150 m zirvedeki anıtsal mezar tapınağı.'
  },
  {
    id: 'karpuz_sur',
    item: 'Diyarbakır Karpuzu & Tarihi Taş Surlar',
    category: 'yemek',
    provinceName: 'Diyarbakır',
    description: 'Dicle nehir yatağında güvercin gübresiyle yetişen devasa karpuzlar.'
  },
  {
    id: 'ciborek',
    item: 'Çibörek & Lületaşı',
    category: 'yemek',
    provinceName: 'Eskişehir',
    description: 'Kırım Tatar mutfağının kızgın yağda kabaran kıymalı böreği ve beyaz pipo taşı.'
  },
  {
    id: 'afyon_kaymak',
    item: 'Manda Kaymağı & Afyon Sucuğu',
    category: 'yemek',
    provinceName: 'Afyon',
    description: 'Manda sütünden yapılan kalın kaymak, haşhaş ve tescilli sucuk.'
  },
  {
    id: 'cay_muhlama',
    item: 'Rize Çayı & Muhlama',
    category: 'yemek',
    provinceName: 'Rize',
    description: 'Türkiye’nin yeşil çay bahçeleri, kolot peyniri ve mısır unu lezzeti.'
  },
  {
    id: 'kayisi_malatya',
    item: 'Kuru Kayısı & Arslantepe Höyüğü',
    category: 'yemek',
    provinceName: 'Malatya',
    description: 'Dünya kuru kayısı ihracatının %70’ini karşılayan sarı altın.'
  },
  {
    id: 'inci_kefali',
    item: 'Van Kedisi & Akdamar Adası',
    category: 'doga',
    provinceName: 'Van',
    description: 'Farklı göz renkli kediler ve sodalı gölün ortasındaki tarihi Ermeni kilisesi.'
  },
  {
    id: 'peribacalari',
    item: 'Peribacaları & Testi Kebabı',
    category: 'doga',
    provinceName: 'Nevşehir',
    description: 'Kapadokya volkanik tüfleri, sıcak hava balonları ve testi içinde pişen et.'
  },
  {
    id: 'elma_amasya',
    item: 'Misket Elması & Kral Kaya Mezarları',
    category: 'yemek',
    provinceName: 'Amasya',
    description: 'Ortadan kesildiğinde çekirdeğinde yıldız şekli çıkan hoş kokulu elma.'
  },
  {
    id: 'incir_aydin',
    item: 'Kuru İncir & Afrodisias',
    category: 'yemek',
    provinceName: 'Aydın',
    description: 'Büyük Menderes vadisinde kurutulan bal kıvamında sarı lop incir.'
  },
  {
    id: 'telkari_mardin',
    item: 'Telkâri Gümüş & Taş Konaklar',
    category: 'kultur',
    provinceName: 'Mardin',
    description: 'İnce gümüş tellerin elde işlenmesiyle yapılan sanat ve Süryani manastırları.'
  },
  {
    id: 'zeytinyagi_ayvalik',
    item: 'Höşmerim & Ayvalık Zeytinyağı',
    category: 'yemek',
    provinceName: 'Balıkesir',
    description: 'Tuzsuz peynir mayasından yapılan tatlı ve Kaz Dağları eteklerinin zeytini.'
  },
  {
    id: 'kangal_divrigi',
    item: 'Kangal Köpeği & Divriği Ulu Camii',
    category: 'doga',
    provinceName: 'Sivas',
    description: 'Cesur çoban köpeği ve UNESCO tescilli taş işçiliği harikası ulu cami.'
  },
  {
    id: 'bafra_pidesi',
    item: 'Bafra Pidesi & Bandırma Vapuru',
    category: 'yemek',
    provinceName: 'Samsun',
    description: 'Çıtır kapalı tereyağlı kıymalı pide ve Kurtuluş Savaşı meşalesi.'
  },
  {
    id: 'gravyer_kars',
    item: 'Kars Gravyeri & Ani Harabeleri',
    category: 'yemek',
    provinceName: 'Kars',
    description: 'İsviçre usulü delikli sarı gravyer ve İpek Yolu’nun 1001 Kiliseli Şehri.'
  },
  {
    id: 'piyaz_antalya',
    item: 'Tahinli Piyaz & Kaleiçi',
    category: 'yemek',
    provinceName: 'Antalya',
    description: 'Haşlanmış fasulye, tarator soslu tahin sosu ve tarihi sur içi sokakları.'
  },
  {
    id: 'dondurma_maras',
    item: 'Dövme Maraş Dondurması',
    category: 'yemek',
    provinceName: 'Kahramanmaraş',
    description: 'Ahir Dağı salebi ve keçi sütünden satırla kesilen elastik dondurma.'
  }
];

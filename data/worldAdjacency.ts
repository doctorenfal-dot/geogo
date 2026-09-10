export const WORLD_ADJACENCY: Record<string, string[]> = {
  // BATI VE ORTA AVRUPA
  'Portekiz': ['İspanya'],
  'İspanya': ['Portekiz', 'Fransa', 'Andorra'],
  'Andorra': ['İspanya', 'Fransa'],
  'Fransa': ['İspanya', 'Andorra', 'Belçika', 'Lüksemburg', 'Almanya', 'İsviçre', 'İtalya', 'Monako'],
  'Monako': ['Fransa'],
  'Belçika': ['Fransa', 'Hollanda', 'Almanya', 'Lüksemburg'],
  'Hollanda': ['Belçika', 'Almanya'],
  'Lüksemburg': ['Belçika', 'Fransa', 'Almanya'],
  'Almanya': ['Hollanda', 'Belçika', 'Lüksemburg', 'Fransa', 'İsviçre', 'Avusturya', 'Çekya', 'Polonya', 'Danimarka'],
  'Danimarka': ['Almanya'],
  'İsviçre': ['Fransa', 'Almanya', 'Avusturya', 'İtalya', 'Lihtenştayn'],
  'Lihtenştayn': ['İsviçre', 'Avusturya'],
  'İtalya': ['Fransa', 'İsviçre', 'Avusturya', 'Slovenya', 'San Marino', 'Vatikan'],
  'San Marino': ['İtalya'],
  'Vatikan': ['İtalya'],
  'Avusturya': ['Almanya', 'Çekya', 'Slovakya', 'Macaristan', 'Slovenya', 'İtalya', 'İsviçre', 'Lihtenştayn'],
  'Çekya': ['Almanya', 'Polonya', 'Slovakya', 'Avusturya'],
  'Slovakya': ['Çekya', 'Polonya', 'Ukrayna', 'Macaristan', 'Avusturya'],
  'Polonya': ['Almanya', 'Çekya', 'Slovakya', 'Ukrayna', 'Belarus', 'Litvanya'],
  'Macaristan': ['Avusturya', 'Slovakya', 'Ukrayna', 'Romanya', 'Sırbistan', 'Hırvatistan', 'Slovenya'],
  'Slovenya': ['İtalya', 'Avusturya', 'Macaristan', 'Hırvatistan'],
  'Hırvatistan': ['Slovenya', 'Macaristan', 'Sırbistan', 'Bosna-Hersek', 'Karadağ'],
  'Bosna-Hersek': ['Hırvatistan', 'Sırbistan', 'Karadağ'],
  'Sırbistan': ['Macaristan', 'Romanya', 'Bulgaristan', 'Kuzey Makedonya', 'Kosova', 'Karadağ', 'Bosna-Hersek', 'Hırvatistan'],
  'Karadağ': ['Hırvatistan', 'Bosna-Hersek', 'Sırbistan', 'Kosova', 'Arnavutluk'],
  'Kosova': ['Sırbistan', 'Kuzey Makedonya', 'Arnavutluk', 'Karadağ'],
  'Arnavutluk': ['Karadağ', 'Kosova', 'Kuzey Makedonya', 'Yunanistan'],
  'Kuzey Makedonya': ['Sırbistan', 'Bulgaristan', 'Yunanistan', 'Arnavutluk', 'Kosova'],
  'Yunanistan': ['Arnavutluk', 'Kuzey Makedonya', 'Bulgaristan', 'Türkiye'],
  'Bulgaristan': ['Romanya', 'Sırbistan', 'Kuzey Makedonya', 'Yunanistan', 'Türkiye'],
  'Romanya': ['Ukrayna', 'Moldova', 'Bulgaristan', 'Sırbistan', 'Macaristan'],
  'Moldova': ['Romanya', 'Ukrayna'],
  'Ukrayna': ['Polonya', 'Slovakya', 'Macaristan', 'Romanya', 'Moldova', 'Belarus', 'Rusya'],
  'Belarus': ['Polonya', 'Litvanya', 'Letonya', 'Ukrayna', 'Rusya'],
  'Litvanya': ['Polonya', 'Belarus', 'Letonya'],
  'Estonya': ['Letonya', 'Rusya'],
  'Norveç': ['İsveç', 'Finlandiya', 'Rusya'],
  'İsveç': ['Norveç', 'Finlandiya'],
  'Finlandiya': ['İsveç', 'Norveç', 'Rusya'],
  'Rusya': ['Norveç', 'Finlandiya', 'Estonya', 'Letonya', 'Belarus', 'Ukrayna', 'Gürcistan', 'Azerbaycan', 'Kazakistan', 'Çin', 'Moğolistan'],

  // TÜRKİYE VE ORTA DOĞU / KAFKASLAR
  'Türkiye': ['Yunanistan', 'Bulgaristan', 'Gürcistan', 'Ermenistan', 'Azerbaycan', 'İran', 'Irak', 'Suriye'],
  'Gürcistan': ['Türkiye', 'Ermenistan', 'Azerbaycan', 'Rusya'],
  'Ermenistan': ['Türkiye', 'Gürcistan', 'Azerbaycan', 'İran'],
  'Azerbaycan': ['Gürcistan', 'Ermenistan', 'İran', 'Türkiye', 'Rusya'],
  'Suriye': ['Türkiye', 'Lübnan', 'İsrail', 'Ürdün', 'Irak'],
  'Lübnan': ['Suriye', 'İsrail'],
  'İsrail': ['Lübnan', 'Suriye', 'Ürdün', 'Mısır'],
  'Ürdün': ['İsrail', 'Suriye', 'Irak', 'Suudi Arabistan'],
  'Irak': ['Türkiye', 'Suriye', 'Ürdün', 'Suudi Arabistan', 'Kuveyt', 'İran'],
  'Kuveyt': ['Irak', 'Suudi Arabistan'],
  'Suudi Arabistan': ['Ürdün', 'Irak', 'Kuveyt', 'Birleşik Arap Emirlikleri'],
  'Birleşik Arap Emirlikleri': ['Suudi Arabistan'],
  'İran': ['Türkiye', 'Ermenistan', 'Azerbaycan', 'Türkmenistan', 'Afganistan', 'Pakistan', 'Irak'],

  // ORTA ASYA VE GÜNEY / DOĞU ASYA
  'Türkmenistan': ['İran', 'Kazakistan', 'Özbekistan', 'Afganistan'],
  'Özbekistan': ['Kazakistan', 'Kırgızistan', 'Tacikistan', 'Afganistan', 'Türkmenistan'],
  'Kazakistan': ['Türkmenistan', 'Özbekistan', 'Kırgızistan', 'Çin', 'Rusya'],
  'Kırgızistan': ['Kazakistan', 'Özbekistan', 'Tacikistan', 'Çin'],
  'Tacikistan': ['Özbekistan', 'Kırgızistan', 'Afganistan', 'Çin'],
  'Afganistan': ['İran', 'Türkmenistan', 'Özbekistan', 'Tacikistan', 'Çin', 'Pakistan'],
  'Pakistan': ['İran', 'Afganistan', 'Çin', 'Hindistan'],
  'Hindistan': ['Pakistan', 'Çin'],
  'Çin': ['Kazakistan', 'Kırgızistan', 'Tacikistan', 'Afganistan', 'Pakistan', 'Hindistan', 'Moğolistan', 'Vietnam', 'Rusya'],
  'Moğolistan': ['Çin', 'Rusya'],
  'Vietnam': ['Çin'],
  'Tayland': ['Malezya'],
  'Malezya': ['Tayland'],

  // KUZEY VE BATI AFRİKA
  'Mısır': ['İsrail', 'Libya', 'Sudan'],
  'Libya': ['Mısır', 'Sudan', 'Çad', 'Nijer', 'Cezayir', 'Tunus'],
  'Tunus': ['Libya', 'Cezayir'],
  'Cezayir': ['Tunus', 'Libya', 'Nijer', 'Mali', 'Moritanya', 'Fas'],
  'Fas': ['Cezayir', 'Moritanya'],
  'Moritanya': ['Fas', 'Cezayir', 'Mali', 'Senegal'],
  'Senegal': ['Moritanya', 'Mali', 'Gine'],
  'Gine': ['Senegal', 'Mali', 'Fildişi Sahili'],
  'Mali': ['Moritanya', 'Cezayir', 'Nijer', 'Burkina Faso', 'Fildişi Sahili', 'Gine', 'Senegal'],
  'Burkina Faso': ['Mali', 'Nijer', 'Benin', 'Gana', 'Fildişi Sahili'],
  'Fildişi Sahili': ['Gine', 'Mali', 'Burkina Faso', 'Gana'],
  'Gana': ['Fildişi Sahili', 'Burkina Faso'],
  'Nijer': ['Cezayir', 'Libya', 'Çad', 'Nijerya', 'Benin', 'Burkina Faso', 'Mali'],
  'Nijerya': ['Nijer', 'Çad', 'Kamerun', 'Benin'],
  'Benin': ['Nijer', 'Nijerya', 'Burkina Faso'],
  'Kamerun': ['Nijerya', 'Çad', 'Gabon', 'Kongo'],
  'Çad': ['Libya', 'Sudan', 'Kamerun', 'Nijerya', 'Nijer'],

  // ORTA VE DOĞU AFRİKA
  'Sudan': ['Mısır', 'Libya', 'Çad', 'Etiyopya'],
  'Etiyopya': ['Sudan', 'Somali', 'Kenya'],
  'Somali': ['Etiyopya', 'Kenya'],
  'Kenya': ['Etiyopya', 'Somali', 'Uganda'],
  'Uganda': ['Kenya', 'Ruanda', 'Demokratik Kongo'],
  'Ruanda': ['Uganda', 'Burundi', 'Demokratik Kongo'],
  'Burundi': ['Ruanda', 'Demokratik Kongo'],
  'Gabon': ['Kamerun', 'Kongo'],
  'Kongo': ['Kamerun', 'Gabon', 'Demokratik Kongo', 'Angola'],
  'Demokratik Kongo': ['Kongo', 'Uganda', 'Ruanda', 'Burundi', 'Zambiya', 'Angola'],
  'Angola': ['Kongo', 'Demokratik Kongo', 'Zambiya', 'Namibya'],
  'Zambiya': ['Demokratik Kongo', 'Mozambik', 'Zimbabve', 'Botsvana', 'Namibya', 'Angola'],
  'Mozambik': ['Zambiya', 'Zimbabve', 'Güney Afrika'],
  'Zimbabve': ['Zambiya', 'Mozambik', 'Güney Afrika', 'Botsvana'],
  'Botsvana': ['Namibya', 'Zambiya', 'Zimbabve', 'Güney Afrika'],
  'Namibya': ['Angola', 'Zambiya', 'Botsvana', 'Güney Afrika'],
  'Güney Afrika': ['Namibya', 'Botsvana', 'Zimbabve', 'Mozambik'],

  // GÜNEY VE KUZEY AMERİKA
  'Kanada': ['Amerika Birleşik Devletleri'],
  'Amerika Birleşik Devletleri': ['Kanada', 'Meksika'],
  'Meksika': ['Amerika Birleşik Devletleri', 'Guatemala'],
  'Guatemala': ['Meksika', 'El Salvador', 'Honduras'],
  'El Salvador': ['Guatemala', 'Honduras'],
  'Honduras': ['Guatemala', 'El Salvador', 'Nikaragua'],
  'Nikaragua': ['Honduras', 'Kosta Rika'],
  'Kosta Rika': ['Nikaragua', 'Panama'],
  'Panama': ['Kosta Rika', 'Kolombiya'],
  'Kolombiya': ['Panama', 'Venezuela', 'Brezilya', 'Peru', 'Ekvador'],
  'Venezuela': ['Kolombiya', 'Brezilya'],
  'Ekvador': ['Kolombiya', 'Peru'],
  'Peru': ['Ekvador', 'Kolombiya', 'Brezilya', 'Bolivya', 'Şili'],
  'Bolivya': ['Peru', 'Brezilya', 'Paraguay', 'Arjantin', 'Şili'],
  'Brezilya': ['Venezuela', 'Kolombiya', 'Peru', 'Bolivya', 'Paraguay', 'Arjantin', 'Uruguay'],
  'Paraguay': ['Bolivya', 'Brezilya', 'Arjantin'],
  'Arjantin': ['Şili', 'Bolivya', 'Paraguay', 'Brezilya', 'Uruguay'],
  'Uruguay': ['Brezilya', 'Arjantin'],
  'Şili': ['Peru', 'Bolivya', 'Arjantin'],
};

export const EUROPE_ADJACENCY: Record<string, string[]> = {
  'Portekiz': ['İspanya'],
  'İspanya': ['Portekiz', 'Fransa', 'Andorra'],
  'Andorra': ['İspanya', 'Fransa'],
  'Fransa': ['İspanya', 'Andorra', 'Belçika', 'Lüksemburg', 'Almanya', 'İsviçre', 'İtalya', 'Monako'],
  'Monako': ['Fransa'],
  'Belçika': ['Fransa', 'Hollanda', 'Almanya', 'Lüksemburg'],
  'Hollanda': ['Belçika', 'Almanya'],
  'Lüksemburg': ['Belçika', 'Fransa', 'Almanya'],
  'Almanya': ['Hollanda', 'Belçika', 'Lüksemburg', 'Fransa', 'İsviçre', 'Avusturya', 'Çekya', 'Polonya', 'Danimarka'],
  'Danimarka': ['Almanya'],
  'İsviçre': ['Fransa', 'Almanya', 'Avusturya', 'İtalya', 'Lihtenştayn'],
  'Lihtenştayn': ['İsviçre', 'Avusturya'],
  'İtalya': ['Fransa', 'İsviçre', 'Avusturya', 'Slovenya', 'San Marino', 'Vatikan'],
  'San Marino': ['İtalya'],
  'Vatikan': ['İtalya'],
  'Avusturya': ['Almanya', 'Çekya', 'Slovakya', 'Macaristan', 'Slovenya', 'İtalya', 'İsviçre', 'Lihtenştayn'],
  'Çekya': ['Almanya', 'Polonya', 'Slovakya', 'Avusturya'],
  'Slovakya': ['Çekya', 'Polonya', 'Ukrayna', 'Macaristan', 'Avusturya'],
  'Polonya': ['Almanya', 'Çekya', 'Slovakya', 'Ukrayna', 'Belarus', 'Litvanya'],
  'Macaristan': ['Avusturya', 'Slovakya', 'Ukrayna', 'Romanya', 'Sırbistan', 'Hırvatistan', 'Slovenya'],
  'Slovenya': ['İtalya', 'Avusturya', 'Macaristan', 'Hırvatistan'],
  'Hırvatistan': ['Slovenya', 'Macaristan', 'Sırbistan', 'Bosna-Hersek', 'Karadağ'],
  'Bosna-Hersek': ['Hırvatistan', 'Sırbistan', 'Karadağ'],
  'Sırbistan': ['Macaristan', 'Romanya', 'Bulgaristan', 'Kuzey Makedonya', 'Kosova', 'Karadağ', 'Bosna-Hersek', 'Hırvatistan'],
  'Karadağ': ['Hırvatistan', 'Bosna-Hersek', 'Sırbistan', 'Kosova', 'Arnavutluk'],
  'Kosova': ['Sırbistan', 'Kuzey Makedonya', 'Arnavutluk', 'Karadağ'],
  'Arnavutluk': ['Karadağ', 'Kosova', 'Kuzey Makedonya', 'Yunanistan'],
  'Kuzey Makedonya': ['Sırbistan', 'Bulgaristan', 'Yunanistan', 'Arnavutluk', 'Kosova'],
  'Yunanistan': ['Arnavutluk', 'Kuzey Makedonya', 'Bulgaristan', 'Türkiye'],
  'Bulgaristan': ['Romanya', 'Sırbistan', 'Kuzey Makedonya', 'Yunanistan', 'Türkiye'],
  'Romanya': ['Ukrayna', 'Moldova', 'Bulgaristan', 'Sırbistan', 'Macaristan'],
  'Moldova': ['Romanya', 'Ukrayna'],
  'Ukrayna': ['Polonya', 'Slovakya', 'Macaristan', 'Romanya', 'Moldova', 'Belarus', 'Rusya'],
  'Belarus': ['Polonya', 'Litvanya', 'Letonya', 'Ukrayna', 'Rusya'],
  'Litvanya': ['Polonya', 'Belarus', 'Letonya'],
  'Letonya': ['Litvanya', 'Belarus', 'Estonya', 'Rusya'],
  'Estonya': ['Letonya', 'Rusya'],
  'Norveç': ['İsveç', 'Finlandiya', 'Rusya'],
  'İsveç': ['Norveç', 'Finlandiya'],
  'Finlandiya': ['İsveç', 'Norveç', 'Rusya'],
  'Rusya': ['Norveç', 'Finlandiya', 'Estonya', 'Letonya', 'Belarus', 'Ukrayna'],
  'Türkiye': ['Yunanistan', 'Bulgaristan']
};

export function getShortestPathInGraph(
  graph: Record<string, string[]>,
  start: string,
  target: string
): string[] | null {
  if (start === target) return [start];
  const queue: string[][] = [[start]];
  const visited = new Set<string>([start]);

  while (queue.length > 0) {
    const path = queue.shift()!;
    const lastNode = path[path.length - 1];

    const neighbors = graph[lastNode] || [];
    for (const neighbor of neighbors) {
      if (neighbor === target) {
        return [...path, neighbor];
      }
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([...path, neighbor]);
      }
    }
  }
  return null;
}

export function getShortestPathEurope(start: string, target: string): string[] | null {
  return getShortestPathInGraph(EUROPE_ADJACENCY, start, target);
}

export function getShortestPathWorld(start: string, target: string): string[] | null {
  return getShortestPathInGraph(WORLD_ADJACENCY, start, target);
}

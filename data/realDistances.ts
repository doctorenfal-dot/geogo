import rawDistances from './realHighwayDistances.json';

const DISTANCES: Record<string, Record<string, number>> = rawDistances;

// Returns official KGM real highway driving distance in km
export function getRealHighwayDistance(cityA: string, cityB: string): number {
  if (cityA === cityB) return 0;
  if (DISTANCES[cityA] && DISTANCES[cityA][cityB] !== undefined) {
    return DISTANCES[cityA][cityB];
  }
  if (DISTANCES[cityB] && DISTANCES[cityB][cityA] !== undefined) {
    return DISTANCES[cityB][cityA];
  }
  return 0;
}

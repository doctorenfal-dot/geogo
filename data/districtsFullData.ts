import rawData from './turkeyDistrictsByProvince.json';

export interface DistrictFeature {
  id: string;
  name: string;
  center: [number, number];
  path: string;
}

export interface ProvinceDistrictsMap {
  provinceName: string;
  viewBox: string;
  districts: DistrictFeature[];
}

export const TURKEY_DISTRICTS_BY_PROVINCE = rawData as unknown as Record<string, ProvinceDistrictsMap>;

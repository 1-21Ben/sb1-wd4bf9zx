export interface Location {
  id: string;
  name: string;
  code: string;
  flag: string;
  currency: string;
  sapWarehouseCode: string;
  sapPriceList: number;
}

export const LOCATIONS: Location[] = [
  {
    id: 'martinique',
    name: 'MARTINIQUE',
    code: 'MTQ',
    flag: '🇫🇷',
    currency: 'EUR',
    sapWarehouseCode: 'WH_MTQ',
    sapPriceList: 1,
  },
  {
    id: 'guadeloupe',
    name: 'GUADELOUPE',
    code: 'GLP',
    flag: '🇫🇷',
    currency: 'EUR',
    sapWarehouseCode: 'WH_GLP',
    sapPriceList: 2,
  },
  {
    id: 'reunion',
    name: 'REUNION',
    code: 'REU',
    flag: '🇫🇷',
    currency: 'EUR',
    sapWarehouseCode: 'WH_REU',
    sapPriceList: 3,
  },
  {
    id: 'guyane',
    name: 'GUYANE',
    code: 'GUF',
    flag: '🇫🇷',
    currency: 'EUR',
    sapWarehouseCode: 'WH_GUF',
    sapPriceList: 4,
  },
  {
    id: 'nouvelle-caledonie',
    name: 'NOUVELLE CALEDONIE',
    code: 'NCL',
    flag: '🇫🇷',
    currency: 'XPF',
    sapWarehouseCode: 'WH_NCL',
    sapPriceList: 5,
  },
];

export function getLocationById(id: string): Location | undefined {
  return LOCATIONS.find(location => location.id === id);
}

export function getLocationByWarehouseCode(code: string): Location | undefined {
  return LOCATIONS.find(location => location.sapWarehouseCode === code);
}

export function getLocationByPriceList(priceList: number): Location | undefined {
  return LOCATIONS.find(location => location.sapPriceList === priceList);
}

export const DEFAULT_LOCATION = LOCATIONS[0]; // Martinique as default
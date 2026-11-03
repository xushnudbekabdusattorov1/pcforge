export type Currency = 'USD' | 'UZS';

export interface Product {
  id: string;
  name: string;
  category: 'prebuilt' | 'laptop' | 'component' | 'peripheral';
  subCategory?: string; // e.g., 'GPU', 'CPU', 'Monitor', 'Keyboard', etc.
  priceUSD: number;
  image: string;
  specs: string[];
  popular?: boolean;
  badge?: string;
  inStock: boolean;
  rating: number;
  description: string;
  brand: string;
}

export interface ComponentOption {
  id: string;
  category: 'cpu' | 'gpu' | 'motherboard' | 'ram' | 'storage' | 'cooler' | 'psu' | 'case';
  name: string;
  brand: string;
  priceUSD: number;
  wattage: number;
  socket?: string; // e.g. AM5, LGA1700
  ramType?: string; // e.g. DDR5, DDR4
  specs: string;
  image: string;
  tier: 'Starter' | 'Pro' | 'Extreme';
}

export interface CustomBuildSelection {
  cpu: ComponentOption | null;
  gpu: ComponentOption | null;
  motherboard: ComponentOption | null;
  ram: ComponentOption | null;
  storage: ComponentOption | null;
  cooler: ComponentOption | null;
  psu: ComponentOption | null;
  case: ComponentOption | null;
}

export interface CartItem {
  cartId: string;
  id: string;
  name: string;
  category: string;
  priceUSD: number;
  image: string;
  quantity: number;
  isCustomBuild?: boolean;
  customDetails?: {
    totalWattage: number;
    parts: { [key: string]: string };
  };
  specs?: string[];
}

export interface DiscountOffer {
  code: string;
  percent: number;
  name: string;
  description: string;
}

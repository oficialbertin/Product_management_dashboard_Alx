export type ProductStatus = 'active' | 'archived';

export type StockUnit = 'pcs' | 'kgs' | 'liters' | 'grams' | 'boxes' | 'bags' | 'bottles';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  unit: StockUnit;
  status: ProductStatus;
  created_at: string;
  updated_at: string;
}

export interface ProductPayload {
  name: string;
  description?: string;
  price: number;
  stock?: number;
  unit?: StockUnit;
  status?: ProductStatus;
}


export type ProductStatus = 'active' | 'archived';

export type StockUnit = 'pcs' | 'kgs' | 'liters' | 'grams' | 'boxes' | 'bags' | 'bottles';

export interface Product {
  id: string; // MongoDB uses string IDs
  name: string;
  description: string;
  price: number;
  stock: number;
  unit: StockUnit;
  status: ProductStatus;
  createdAt?: string;
  updatedAt?: string;
  created_at?: string; // For backward compatibility
  updated_at?: string; // For backward compatibility
}

export interface ProductPayload {
  name: string;
  description?: string;
  price: number;
  stock?: number;
  unit?: StockUnit;
  status?: ProductStatus;
}


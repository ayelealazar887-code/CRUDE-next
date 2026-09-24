export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: string | number;
  stock: number;
  createdAt: string;
}
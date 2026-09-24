import type { Product } from "./product";
import type { User } from "./user";

export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "CANCELLED"
  | "COMPLETED";

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: string | number;
  product: Product;
}

export interface Order {
  id: number;
  userId: number;
  total: string | number;
  status: OrderStatus;
  createdAt: string;

  user: User;

  items: OrderItem[];
}
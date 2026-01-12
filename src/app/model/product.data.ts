import { Observable, of, throwError } from 'rxjs';

export interface Product {
  name: string;
  price: number;
  stock: number;
}

export interface CollectedProducts {
  idMachine: number;
  name: string;
  amount: number;
}

export interface Machine {
  id: number;
  balance: number;
  change: number;
}

export const COINS: number[] = [2, 1, 0.5, 0.2, 0.05];

export const PRODUCTS_DRINKS: Product[] = [
  { name: 'Coca-cola', price: 0.8, stock: 3 },
  { name: 'Agua', price: 0.5, stock: 4 },
  { name: 'Fanta', price: 1.0, stock: 5 },
];

export const PRODUCTS_SNACKS: Product[] = [
  { name: 'Doritos', price: 1.5, stock: 6 },
  { name: 'Patatas', price: 1, stock: 2 },
  { name: 'Sandwich', price: 2, stock: 9 },
];

export const MACHINES: Machine[] = [
  { id: 1, balance: 0, change: 0 },
  { id: 2, balance: 0, change: 0 },
];

export interface SignUP {
  name: string;
  email: string;
  password: string;
}
export interface Login {
  email: string;
  password: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  color: string;
  description: string;
  image: string;
  quantity?: number;
  productId: string;
  userId: string;
}

export interface Cart {
  id: string | undefined;
  name: string;
  price: number;
  category: string;
  color: string;
  description: string;
  image: string;
  quantity?: number;
  userId: string;
  productId: string;
}

export interface priceSummary {
  price: number;
  discount: number;
  total: number;
  tex: number;
  delivery: number;
}

export interface order {
  id: string | undefined;
  email: string;
  address: string;
  contact: string;
  totalPrice: number;
  userId: string | undefined;
}
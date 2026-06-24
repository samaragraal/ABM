export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
  productCount?: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  categoryName: string;
  brand: string;
  price: number;
  comparePrice?: number;
  description: string;
  specs: ProductSpec[];
  isFeatured?: boolean;
  isNew?: boolean;
  isComingSoon?: boolean;
  inStock?: boolean;
  images?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: CartItem[];
  total: number;
  createdAt: string;
  shippingAddress?: ShippingAddress;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  area: string;
  block: string;
  street: string;
  building: string;
  apartment?: string;
  notes?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
}

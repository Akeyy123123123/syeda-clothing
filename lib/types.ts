export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  colors: string[];
  sizes: string[];
  inStock: boolean;
  isNew?: boolean;
  description: string;
  fabric: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
  savedForLater?: boolean;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface DesignTheme {
  id: string;
  name: string;
  subtitle: string;
  accentColor: string;
  accentHover: string;
  accentLight: string;
  bgTone: string;
  cardRadius: string;
  buttonRadius: string;
  fontHeading: string;
  fontBody: string;
  borderStyle: string;
  vibe: string;
  previewColor: string;
}

export type Category = 'All' | 'Women' | 'Men' | 'Unisex' | 'Accessories';

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: 'Women' | 'Men' | 'Unisex' | 'Accessories';
  subcategory: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  stockCount: number;
  sizes: string[];
  colors: { name: string; hex: string; inStock?: boolean }[];
  fabric: string;
  fit: 'Relaxed' | 'Slim' | 'Oversized' | 'Regular' | 'Tailored';
  description: string;
  details: string[];
  careInstructions: string[];
  tags: string[];
  variants?: {
    size: string;
    color: string;
    stock: number;
  }[];
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  status: 'approved' | 'pending' | 'rejected';
}

export interface CartItem {
  id: string; // unique item id based on product + size + color
  productId: string;
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface SavedForLaterItem {
  id: string;
  productId: string;
  product: Product;
  selectedSize: string;
  selectedColor: string;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault?: boolean;
  type: 'home' | 'work' | 'other';
}

export type OrderStatus = 'placed' | 'confirmed' | 'shipped' | 'out_for_delivery' | 'delivered' | 'returned';

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: CartItem[];
  shippingAddress: Address;
  paymentMethod: 'card' | 'upi' | 'netbanking' | 'cod';
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  trackingNumber: string;
  estimatedDelivery: string;
  couponCode?: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minSpend: number;
  maxDiscount: number;
  description: string;
  expiryDate: string;
  isActive: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  isLoggedIn: boolean;
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  reason: string;
  comment: string;
  status: 'Requested' | 'Approved' | 'Picked Up' | 'Refunded';
  date: string;
}

export type ActivePage =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'account'
  | 'wishlist'
  | 'admin'
  | 'about'
  | 'size-guide'
  | 'shipping-policy'
  | 'return-policy'
  | 'faq'
  | 'contact';

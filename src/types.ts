export type MenuCategoryId =
  | 'bbq-signatures'
  | 'indian-bbq'
  | 'tikka-kebabs'
  | 'biryani'
  | 'chicken'
  | 'beef-steak'
  | 'seafood'
  | 'chinese'
  | 'pizza'
  | 'naan'
  | 'vurugu-platters'
  | 'vegetarian'
  | 'sides'
  | 'desserts'
  | 'drinks-shakes';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategoryId;
  price: number; // in TZS
  priceFormatted: string; // e.g. "16,000/="
  description: string;
  ingredients: string[]; // 2-5 key ingredients
  image: string;
  isPopular?: boolean;
  isSpicy?: boolean;
  isVeg?: boolean;
  isSignature?: boolean;
  portionSize?: string;
  prepTimeMinutes?: number;
}

export interface CategoryInfo {
  id: MenuCategoryId;
  name: string;
  description: string;
  icon: string;
}

export interface Branch {
  id: string;
  name: string;
  area: string;
  address: string;
  landmark: string;
  phoneNumbers: string[];
  primaryPhone: string;
  whatsappNumber: string;
  hours: string;
  googleMapsUrl: string;
  badge?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
  spiceLevel?: 'Mild' | 'Medium' | 'Pilipili Kali (Hot)';
}

export type OrderType = 'delivery' | 'takeaway' | 'dine-in';
export type PaymentMethod = 'mpesa' | 'tigopesa' | 'airtel' | 'card' | 'cash';

export interface OrderCheckoutData {
  orderId: string;
  customerName: string;
  customerPhone: string;
  branchId: string;
  orderType: OrderType;
  tableNumber?: string;
  deliveryAddress?: string;
  paymentMethod: PaymentMethod;
  paymentRefNumber?: string;
  notes?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: string;
}

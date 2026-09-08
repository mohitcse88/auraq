import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DesignTheme,
  Product,
  CartItem,
  SavedForLaterItem,
  Order,
  Address,
  Coupon,
  UserProfile,
  Review,
  ReturnRequest,
  ActivePage,
  Category,
  OrderStatus,
} from '../types';
import { DESIGN_THEMES } from '../data/designThemes';
import {
  MOCK_PRODUCTS,
  MOCK_REVIEWS,
  MOCK_COUPONS,
  INITIAL_ADDRESSES,
  INITIAL_ORDERS,
} from '../data/mockProducts';

interface StoreContextType {
  // Theme & Design
  currentTheme: DesignTheme;
  setTheme: (theme: DesignTheme) => void;
  isDesignModalOpen: boolean;
  setIsDesignModalOpen: (open: boolean) => void;
  hasSeenDesignPrompt: boolean;
  setHasSeenDesignPrompt: (seen: boolean) => void;

  // Navigation
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (prod: Product | null) => void;
  viewProductDetails: (prod: Product) => void;
  selectedCategory: Category;
  setSelectedCategory: (cat: Category) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  discountAmount: number;
  shippingFee: number;
  taxAmount: number;
  cartTotal: number;
  addToCart: (product: Product, size: string, color: string, qty?: number) => void;
  updateCartQuantity: (itemId: string, qty: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;

  // Saved for later
  savedForLater: SavedForLaterItem[];
  saveForLater: (itemId: string) => void;
  moveToCartFromSaved: (savedId: string) => void;
  removeSavedForLater: (savedId: string) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Coupons
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  createCoupon: (coupon: Coupon) => void;

  // Orders
  orders: Order[];
  latestOrder: Order | null;
  placeOrder: (
    address: Address,
    paymentMethod: 'card' | 'upi' | 'netbanking' | 'cod'
  ) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Addresses
  addresses: Address[];
  addAddress: (addr: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, addr: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  // User
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
  loginUser: (email: string, name?: string) => void;
  logoutUser: () => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'status' | 'helpfulCount'>) => void;
  moderateReview: (reviewId: string, status: 'approved' | 'rejected') => void;

  // Returns
  returnRequests: ReturnRequest[];
  submitReturnRequest: (
    orderId: string,
    productId: string,
    productName: string,
    reason: string,
    comment: string
  ) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [currentTheme, setCurrentTheme] = useState<DesignTheme>(() => {
    const saved = localStorage.getItem('auraq_theme');
    if (saved) {
      const found = DESIGN_THEMES.find((t) => t.id === saved);
      if (found) return found;
    }
    return DESIGN_THEMES[0];
  });

  const [isDesignModalOpen, setIsDesignModalOpen] = useState<boolean>(() => {
    // Show option to select design on initial load if not selected yet
    return !localStorage.getItem('auraq_theme_chosen');
  });
  const [hasSeenDesignPrompt, setHasSeenDesignPrompt] = useState<boolean>(() => {
    return !!localStorage.getItem('auraq_theme_chosen');
  });

  // Navigation
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(MOCK_PRODUCTS[0]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('auraq_products');
    return saved ? JSON.parse(saved) : MOCK_PRODUCTS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('auraq_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Saved for later
  const [savedForLater, setSavedForLater] = useState<SavedForLaterItem[]>(() => {
    const saved = localStorage.getItem('auraq_saved_later');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('auraq_wishlist');
    return saved ? JSON.parse(saved) : ['prod-w1', 'prod-m1'];
  });

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('auraq_coupons');
    return saved ? JSON.parse(saved) : MOCK_COUPONS;
  });
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('auraq_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  // Addresses
  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem('auraq_addresses');
    return saved ? JSON.parse(saved) : INITIAL_ADDRESSES;
  });

  // User
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('auraq_user');
    return saved
      ? JSON.parse(saved)
      : {
          name: 'Mohit Kumar',
          email: 'mohitkumardoctor@gmail.com',
          phone: '+1 (555) 234-5678',
          isLoggedIn: true,
        };
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('auraq_reviews');
    return saved ? JSON.parse(saved) : MOCK_REVIEWS;
  });

  // Returns
  const [returnRequests, setReturnRequests] = useState<ReturnRequest[]>(() => {
    const saved = localStorage.getItem('auraq_returns');
    return saved ? JSON.parse(saved) : [];
  });

  // Apply CSS root variables when currentTheme changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent-color', currentTheme.accentColor);
    root.style.setProperty('--accent-hover', currentTheme.accentHover);
    root.style.setProperty('--accent-light', currentTheme.accentLight);
    root.style.setProperty('--font-heading', currentTheme.fontHeading);
    root.style.setProperty('--font-body', currentTheme.fontBody);
    localStorage.setItem('auraq_theme', currentTheme.id);
  }, [currentTheme]);

  // Persist storage
  useEffect(() => {
    localStorage.setItem('auraq_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('auraq_saved_later', JSON.stringify(savedForLater));
  }, [savedForLater]);

  useEffect(() => {
    localStorage.setItem('auraq_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('auraq_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('auraq_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('auraq_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('auraq_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('auraq_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('auraq_user', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('auraq_returns', JSON.stringify(returnRequests));
  }, [returnRequests]);

  const setTheme = (theme: DesignTheme) => {
    setCurrentTheme(theme);
    localStorage.setItem('auraq_theme', theme.id);
    localStorage.setItem('auraq_theme_chosen', 'true');
    setHasSeenDesignPrompt(true);
  };

  const viewProductDetails = (prod: Product) => {
    setSelectedProduct(prod);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minSpend) {
    const rawDiscount = (cartSubtotal * appliedCoupon.discountPercent) / 100;
    discountAmount = Math.min(rawDiscount, appliedCoupon.maxDiscount);
  }

  // Free shipping above $150
  const shippingFee = cartSubtotal > 150 || cartSubtotal === 0 ? 0 : 15;
  const taxAmount = Math.round((cartSubtotal - discountAmount) * 0.08 * 100) / 100;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee + taxAmount);

  const addToCart = (product: Product, size: string, color: string, qty = 1) => {
    const itemId = `${product.id}-${size}-${color}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          product,
          selectedSize: size,
          selectedColor: color,
          quantity: qty,
        },
      ];
    });
  };

  const updateCartQuantity = (itemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: qty } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const saveForLater = (itemId: string) => {
    const item = cart.find((i) => i.id === itemId);
    if (!item) return;
    setCart((prev) => prev.filter((i) => i.id !== itemId));
    setSavedForLater((prev) => [
      ...prev,
      {
        id: `saved-${item.id}`,
        productId: item.productId,
        product: item.product,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      },
    ]);
  };

  const moveToCartFromSaved = (savedId: string) => {
    const item = savedForLater.find((i) => i.id === savedId);
    if (!item) return;
    setSavedForLater((prev) => prev.filter((i) => i.id !== savedId));
    addToCart(item.product, item.selectedSize, item.selectedColor, 1);
  };

  const removeSavedForLater = (savedId: string) => {
    setSavedForLater((prev) => prev.filter((i) => i.id !== savedId));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === normalized && c.isActive);
    if (!found) {
      return { success: false, message: 'Invalid or expired discount code.' };
    }
    if (cartSubtotal < found.minSpend) {
      return {
        success: false,
        message: `Minimum order of $${found.minSpend} required for code ${found.code}.`,
      };
    }
    setAppliedCoupon(found);
    return {
      success: true,
      message: `Coupon ${found.code} applied! Saved ${found.discountPercent}%.`,
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const createCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [coupon, ...prev]);
  };

  const placeOrder = (
    address: Address,
    paymentMethod: 'card' | 'upi' | 'netbanking' | 'cod'
  ): Order => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      id: `AQ-${randomSuffix}`,
      date: new Date().toISOString().split('T')[0],
      status: 'placed',
      items: [...cart],
      shippingAddress: address,
      paymentMethod,
      subtotal: cartSubtotal,
      discount: discountAmount,
      shippingFee,
      tax: taxAmount,
      total: cartTotal,
      trackingNumber: `AQ-TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(
        'en-US',
        { month: 'short', day: 'numeric', year: 'numeric' }
      ),
      couponCode: appliedCoupon?.code,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLatestOrder(newOrder);
    clearCart();
    setActivePage('order-confirmation');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const addAddress = (addr: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...addr,
      id: `addr-${Date.now()}`,
    };
    if (newAddr.isDefault) {
      setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: false })).concat(newAddr));
    } else {
      setAddresses((prev) => [...prev, newAddr]);
    }
  };

  const updateAddress = (id: string, updates: Partial<Address>) => {
    setAddresses((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          return { ...a, ...updates };
        }
        if (updates.isDefault) {
          return { ...a, isDefault: false };
        }
        return a;
      })
    );
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  const loginUser = (email: string, name = 'Valued Customer') => {
    setUserProfile({
      name,
      email,
      phone: '+1 (555) 234-5678',
      isLoggedIn: true,
    });
  };

  const logoutUser = () => {
    setUserProfile({
      name: 'Guest Shopper',
      email: '',
      phone: '',
      isLoggedIn: false,
    });
  };

  const addProduct = (prod: Product) => {
    setProducts((prev) => [prod, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'status' | 'helpfulCount'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      status: 'approved',
      helpfulCount: 0,
    };
    setReviews((prev) => [newRev, ...prev]);
  };

  const moderateReview = (reviewId: string, status: 'approved' | 'rejected') => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, status } : r))
    );
  };

  const submitReturnRequest = (
    orderId: string,
    productId: string,
    productName: string,
    reason: string,
    comment: string
  ) => {
    const newReq: ReturnRequest = {
      id: `RET-${Date.now().toString().slice(-6)}`,
      orderId,
      productId,
      productName,
      reason,
      comment,
      status: 'Requested',
      date: new Date().toISOString().split('T')[0],
    };
    setReturnRequests((prev) => [newReq, ...prev]);
  };

  return (
    <StoreContext.Provider
      value={{
        currentTheme,
        setTheme,
        isDesignModalOpen,
        setIsDesignModalOpen,
        hasSeenDesignPrompt,
        setHasSeenDesignPrompt,
        activePage,
        setActivePage,
        selectedProduct,
        setSelectedProduct,
        viewProductDetails,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        cartCount,
        cartSubtotal,
        discountAmount,
        shippingFee,
        taxAmount,
        cartTotal,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        savedForLater,
        saveForLater,
        moveToCartFromSaved,
        removeSavedForLater,
        wishlist,
        toggleWishlist,
        isInWishlist,
        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        createCoupon,
        orders,
        latestOrder,
        placeOrder,
        updateOrderStatus,
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        userProfile,
        setUserProfile,
        loginUser,
        logoutUser,
        reviews,
        addReview,
        moderateReview,
        returnRequests,
        submitReturnRequest,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

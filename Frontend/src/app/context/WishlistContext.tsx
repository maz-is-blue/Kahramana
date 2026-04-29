import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { wishlistAPI } from '@/app/services/api';

export interface WishlistItem {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  image: string;
  addedAt: Date;
}

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (itemId: string) => void;
  isInWishlist: (itemId: string) => boolean;
  toggleWishlist: (item: WishlistItem) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('kahramana-wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const token = localStorage.getItem('kahramana-token');
    if (!token) return;
    wishlistAPI.get()
      .then((products: any[]) => {
        const mapped: WishlistItem[] = products.map((p) => ({
          id: p.slug || String(p.id),
          name: p.name,
          nameAr: p.name_ar,
          price: p.price,
          image: p.images?.[0] || '',
          addedAt: new Date(),
        }));
        setItems(mapped);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    localStorage.setItem('kahramana-wishlist', JSON.stringify(items));
  }, [items]);

  const addToWishlist = (item: WishlistItem) => {
    setItems((current) => {
      if (current.find((i) => i.id === item.id)) return current;
      return [...current, { ...item, addedAt: new Date() }];
    });
    const token = localStorage.getItem('kahramana-token');
    if (token) wishlistAPI.toggle(item.id).catch(() => {});
  };

  const removeFromWishlist = (itemId: string) => {
    setItems((current) => current.filter((item) => item.id !== itemId));
    const token = localStorage.getItem('kahramana-token');
    if (token) wishlistAPI.toggle(itemId).catch(() => {});
  };

  const isInWishlist = (itemId: string) => items.some((item) => item.id === itemId);

  const toggleWishlist = (item: WishlistItem) => {
    if (isInWishlist(item.id)) removeFromWishlist(item.id);
    else addToWishlist(item);
  };

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
}

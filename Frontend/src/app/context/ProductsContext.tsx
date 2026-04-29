import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { productsAPI } from '@/app/services/api';

export interface Product {
  id: string;
  _id?: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  category: string;
  year: string;
  image: string;
  images: string[];
  price: number;
  stock: number;
  rating: number;
  numReviews: number;
  notes: string[];
  sizes: { size: string; price: number }[];
  isNew?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
  size?: string;
  origin?: string;
  slug?: string;
}

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  getProduct: (id: string) => Product | undefined;
  getRelatedProducts: (id: string, limit?: number) => Product[];
  fetchProduct: (id: string) => Promise<Product | null>;
  recentlyViewed: string[];
  addToRecentlyViewed: (productId: string) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

const normalizeProduct = (p: any): Product => ({
  id: p.slug || String(p.id),
  _id: String(p.id),
  name: p.name,
  nameAr: p.name_ar,
  description: p.description,
  descriptionAr: p.description_ar,
  category: p.category,
  year: p.year || '2025',
  image: p.images?.[0] || '',
  images: p.images || [],
  price: p.price,
  stock: p.stock,
  rating: p.rating,
  numReviews: p.num_reviews,
  notes: p.notes || [],
  sizes: p.sizes || [{ size: p.size || '50ml', price: p.price }],
  isNew: p.is_new,
  isBestseller: p.is_bestseller,
  isFeatured: p.is_featured,
  size: p.size,
  origin: p.origin,
  slug: p.slug,
});

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = localStorage.getItem('kahramana-recently-viewed');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    productsAPI.getAll({ limit: '100' })
      .then((data) => setProducts(data.products.map(normalizeProduct)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const getProduct = (id: string) =>
    products.find((p) => p.id === id || p._id === id || p.slug === id);

  const fetchProduct = async (id: string): Promise<Product | null> => {
    const cached = getProduct(id);
    if (cached) return cached;
    try {
      const data = await productsAPI.getById(id);
      const product = normalizeProduct(data);
      setProducts((prev) => [...prev.filter((p) => p.id !== product.id), product]);
      return product;
    } catch {
      return null;
    }
  };

  const getRelatedProducts = (id: string, limit = 3) => {
    const product = getProduct(id);
    if (!product) return [];
    return products.filter((p) => p.id !== id && p.category === product.category).slice(0, limit);
  };

  const addToRecentlyViewed = (productId: string) => {
    setRecentlyViewed((current) => {
      const filtered = current.filter((id) => id !== productId);
      const updated = [productId, ...filtered].slice(0, 10);
      localStorage.setItem('kahramana-recently-viewed', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <ProductsContext.Provider value={{ products, loading, getProduct, getRelatedProducts, fetchProduct, recentlyViewed, addToRecentlyViewed }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) throw new Error('useProducts must be used within ProductsProvider');
  return context;
}

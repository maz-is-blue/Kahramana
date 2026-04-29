import { createContext, useContext, useState, ReactNode } from 'react';
import { reviewsAPI } from '@/app/services/api';

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: Date;
  verified: boolean;
  helpful: number;
  images?: string[];
}

interface ReviewsContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'helpful'>) => void;
  getProductReviews: (productId: string) => Review[];
  fetchProductReviews: (productId: string) => Promise<void>;
  getAverageRating: (productId: string) => number;
  getRatingDistribution: (productId: string) => { [key: number]: number };
  markHelpful: (reviewId: string) => void;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

const normalizeReview = (r: any): Review => ({
  id: String(r.id),
  productId: String(r.product_id),
  userId: String(r.user_id),
  userName: r.user?.name || 'Anonymous',
  rating: r.rating,
  title: r.title || '',
  comment: r.comment || r.text || '',
  date: new Date(r.created_at),
  verified: true,
  helpful: 0,
});

export function ReviewsProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchProductReviews = async (productId: string) => {
    try {
      const data = await reviewsAPI.getByProduct(productId);
      const fetched: Review[] = (data.reviews || data).map(normalizeReview);
      setReviews((current) => {
        const others = current.filter((r) => r.productId !== productId);
        return [...others, ...fetched];
      });
    } catch {}
  };

  const addReview = async (review: Omit<Review, 'id' | 'date' | 'helpful'>) => {
    try {
      const data = await reviewsAPI.create(review.productId, { rating: review.rating, text: review.comment });
      const newReview = normalizeReview(data.review || data);
      setReviews((current) => [newReview, ...current]);
    } catch {
      const optimistic: Review = { ...review, id: `local-${Date.now()}`, date: new Date(), helpful: 0 };
      setReviews((current) => [optimistic, ...current]);
    }
  };

  const getProductReviews = (productId: string) =>
    reviews.filter((r) => r.productId === productId || r.productId === productId);

  const getAverageRating = (productId: string) => {
    const productReviews = getProductReviews(productId);
    if (productReviews.length === 0) return 0;
    return productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length;
  };

  const getRatingDistribution = (productId: string) => {
    const productReviews = getProductReviews(productId);
    const distribution: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    productReviews.forEach((r) => { distribution[r.rating]++; });
    return distribution;
  };

  const markHelpful = (reviewId: string) => {
    setReviews((current) =>
      current.map((r) => (r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r))
    );
  };

  return (
    <ReviewsContext.Provider value={{ reviews, addReview, getProductReviews, fetchProductReviews, getAverageRating, getRatingDistribution, markHelpful }}>
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (!context) throw new Error('useReviews must be used within ReviewsProvider');
  return context;
}

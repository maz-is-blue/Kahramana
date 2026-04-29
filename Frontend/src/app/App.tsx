import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { LanguageProvider } from '@/app/context/LanguageContext';
import { CartProvider } from '@/app/context/CartContext';
import { AdminProvider, useAdmin } from '@/app/context/AdminContext';
import { UserProvider } from '@/app/context/UserContext';
import { WishlistProvider } from '@/app/context/WishlistContext';
import { ReviewsProvider } from '@/app/context/ReviewsContext';
import { ProductsProvider } from '@/app/context/ProductsContext';
import { Toaster } from '@/app/components/ui/sonner';
import { GalleryHeader } from '@/app/components/GalleryHeader';
import { GalleryFooter } from '@/app/components/GalleryFooter';
import { LuxuryGalleryHome } from '@/app/components/LuxuryGalleryHome';
import { GalleryShop } from '@/app/components/GalleryShop';
import { EnhancedProductDetail } from '@/app/components/EnhancedProductDetail';
import { GalleryAbout } from '@/app/components/GalleryAbout';
import { GalleryContact } from '@/app/components/GalleryContact';
import { CheckoutPage } from '@/app/components/CheckoutPage';
import { OrderConfirmation } from '@/app/components/OrderConfirmation';
import { CartDrawer } from '@/app/components/CartDrawer';
import { UserLogin } from '@/app/components/user/UserLogin';
import { UserAccount } from '@/app/components/user/UserAccount';
import { BrandStory } from '@/app/components/BrandStory';
import { ScentQuiz } from '@/app/components/ScentQuiz';
import { WishlistPage } from '@/app/components/WishlistPage';
import { CollectionsPage } from '@/app/components/CollectionsPage';
import { AdminLogin } from '@/app/components/admin/AdminLogin';
import { AdminLayout } from '@/app/components/admin/AdminLayout';
import { AdminDashboard } from '@/app/components/admin/AdminDashboard';
import { ProductsManagement } from '@/app/components/admin/ProductsManagement';
import { ProductEditor } from '@/app/components/admin/ProductEditor';
import { ContentEditor } from '@/app/components/admin/ContentEditor';
import { OrdersManagement } from '@/app/components/admin/OrdersManagement';
import { MediaLibrary } from '@/app/components/admin/MediaLibrary';
import { FloatingElements } from '@/app/components/FloatingElements';

// Protected Route Component for Admin
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAdmin();
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />;
}

// Main Layout for Public Pages
function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#FAF7F1] text-[#101010] relative">
      <FloatingElements />
      <GalleryHeader />
      <Routes>
        <Route path="/" element={<LuxuryGalleryHome />} />
        <Route path="/shop" element={<GalleryShop />} />
        <Route path="/product/:id" element={<EnhancedProductDetail />} />
        <Route path="/about" element={<BrandStory />} />
        <Route path="/contact" element={<GalleryContact />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/scent-quiz" element={<ScentQuiz />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/account" element={<UserAccount />} />
      </Routes>
      <GalleryFooter />
      <CartDrawer />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <LanguageProvider>
        <ProductsProvider>
          <WishlistProvider>
            <ReviewsProvider>
              <UserProvider>
                <CartProvider>
                  <AdminProvider>
                    <Routes>
                      {/* Public Routes */}
                      <Route path="/*" element={<PublicLayout />} />

                      {/* Admin Routes */}
                      <Route path="/admin/login" element={<AdminLogin />} />
                      <Route
                        path="/admin/*"
                        element={
                          <ProtectedRoute>
                            <AdminLayout>
                              <Routes>
                                <Route path="dashboard" element={<AdminDashboard />} />
                                <Route path="products" element={<ProductsManagement />} />
                                <Route path="products/new" element={<ProductEditor />} />
                                <Route path="products/:id/edit" element={<ProductEditor />} />
                                <Route path="content" element={<ContentEditor />} />
                                <Route path="media" element={<MediaLibrary />} />
                                <Route path="orders" element={<OrdersManagement />} />
                              </Routes>
                            </AdminLayout>
                          </ProtectedRoute>
                        }
                      />
                    </Routes>
                  </AdminProvider>
                </CartProvider>
              </UserProvider>
            </ReviewsProvider>
          </WishlistProvider>
        </ProductsProvider>
      </LanguageProvider>
    </Router>
  );
}
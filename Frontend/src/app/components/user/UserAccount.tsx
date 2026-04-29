import { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import { 
  User, 
  ShoppingBag, 
  MapPin, 
  LogOut, 
  Package,
  ChevronRight,
  Calendar,
  Mail,
  Phone,
  Edit,
  Shield,
  Heart
} from 'lucide-react';
import { useUser } from '@/app/context/UserContext';
import { useWishlist } from '@/app/context/WishlistContext';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { useLanguage } from '@/app/context/LanguageContext';

export function UserAccount() {
  const { user, logout, isAdmin } = useUser();
  const { items: wishlistItems } = useWishlist();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'wishlist'>('orders');

  // Mock order history - replace with API call
  const orderHistory = [
    {
      id: 'KAH-2026-001',
      date: '2026-02-10T14:30:00',
      status: 'delivered',
      total: 398.90,
      items: [
        {
          id: 'oud-royal',
          name: 'Oud Royal',
          nameAr: 'عود ملكي',
          size: '50ml',
          quantity: 1,
          price: 349,
          image: 'https://images.unsplash.com/photo-1630512873562-ee0deb00ed4f?w=400'
        }
      ],
      shipping: {
        address: 'Dubai Mall, Fashion Avenue',
        city: 'Dubai',
        country: 'UAE'
      },
      tracking: 'DHL-AE-123456789'
    },
    {
      id: 'KAH-2026-002',
      date: '2026-01-28T16:45:00',
      status: 'delivered',
      total: 897.00,
      items: [
        {
          id: 'amber-nights',
          name: 'Amber Nights',
          nameAr: 'ليالي العنبر',
          size: '100ml',
          quantity: 1,
          price: 499,
          image: 'https://images.unsplash.com/photo-1765031117402-93b2e530edec?w=400'
        },
        {
          id: 'rose-mystique',
          name: 'Rose Mystique',
          nameAr: 'الوردة الغامضة',
          size: '30ml',
          quantity: 2,
          price: 199,
          image: 'https://images.unsplash.com/photo-1545936761-c64b78657cb1?w=400'
        }
      ],
      shipping: {
        address: 'Downtown Dubai',
        city: 'Dubai',
        country: 'UAE'
      },
      tracking: 'DHL-AE-987654321'
    },
    {
      id: 'KAH-2026-003',
      date: '2026-01-15T10:20:00',
      status: 'delivered',
      total: 329.00,
      items: [
        {
          id: 'musk-noir',
          name: 'Musk Noir',
          nameAr: 'المسك الأسود',
          size: '50ml',
          quantity: 1,
          price: 329,
          image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400'
        }
      ],
      shipping: {
        address: 'Dubai Marina',
        city: 'Dubai',
        country: 'UAE'
      },
      tracking: 'DHL-AE-555666777'
    }
  ];

  const statusConfig = {
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
    processing: { label: 'Processing', color: 'bg-blue-100 text-blue-700' },
    shipped: { label: 'Shipped', color: 'bg-purple-100 text-purple-700' },
    delivered: { label: 'Delivered', color: 'bg-green-100 text-green-700' },
    cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700' },
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const totalSpent = orderHistory.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orderHistory.length;
  const totalItems = orderHistory.reduce((sum, order) => 
    sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
  );

  return (
    <div className="min-h-screen bg-[#FAF7F1] py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-display mb-4">My Account</h1>
          <p className="text-lg text-[#6B6B6B]">Welcome back, {user.name}</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white border-2 border-[#E8E5E0] p-6 sticky top-24">
              {/* User Info */}
              <div className="mb-8 pb-8 border-b border-[#E8E5E0]">
                <div className="w-20 h-20 bg-gradient-to-br from-[#EC4899] to-[#A855F7] rounded-full flex items-center justify-center mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-display text-xl mb-1">{user.name}</h3>
                <p className="text-sm text-[#6B6B6B]">{user.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2 mb-8">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'orders'
                      ? 'bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white'
                      : 'text-[#6B6B6B] hover:bg-[#FAF7F1]'
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span className="font-medium">Order History</span>
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white'
                      : 'text-[#6B6B6B] hover:bg-[#FAF7F1]'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'addresses'
                      ? 'bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white'
                      : 'text-[#6B6B6B] hover:bg-[#FAF7F1]'
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">Addresses</span>
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'wishlist'
                      ? 'bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white'
                      : 'text-[#6B6B6B] hover:bg-[#FAF7F1]'
                  }`}
                >
                  <Heart className="w-5 h-5" />
                  <span className="font-medium">Wishlist</span>
                </button>
              </nav>

              {/* Stats */}
              <div className="space-y-4 mb-8 pb-8 border-b border-[#E8E5E0]">
                <div>
                  <p className="text-2xl font-display">{totalOrders}</p>
                  <p className="text-xs text-[#6B6B6B]">Total Orders</p>
                </div>
                <div>
                  <p className="text-2xl font-display">${totalSpent.toFixed(2)}</p>
                  <p className="text-xs text-[#6B6B6B]">Total Spent</p>
                </div>
                <div>
                  <p className="text-2xl font-display">{totalItems}</p>
                  <p className="text-xs text-[#6B6B6B]">Fragrances Collected</p>
                </div>
              </div>

              {/* Admin Dashboard Link */}
              {isAdmin && (
                <div className="mb-8 pb-8 border-b border-[#E8E5E0]">
                  <Link
                    to="/admin/dashboard"
                    className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#F59E0B] to-[#EC4899] text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <Shield className="w-5 h-5" />
                    <span className="font-medium">Admin Dashboard</span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </Link>
                </div>
              )}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Order History */}
            {activeTab === 'orders' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-display">Order History</h2>
                  <Link
                    to="/shop"
                    className="text-sm text-[#EC4899] hover:text-[#A855F7] transition-colors"
                  >
                    Continue Shopping →
                  </Link>
                </div>

                {orderHistory.length === 0 ? (
                  <div className="bg-white border-2 border-[#E8E5E0] p-12 text-center">
                    <Package className="w-16 h-16 mx-auto mb-4 text-[#A0A0A0]" />
                    <p className="text-lg text-[#6B6B6B] mb-4">No orders yet</p>
                    <Link
                      to="/shop"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white hover:opacity-90 transition-opacity"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  orderHistory.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border-2 border-[#E8E5E0] hover:shadow-lg transition-shadow"
                    >
                      {/* Order Header */}
                      <div className="p-6 border-b border-[#E8E5E0] flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-6">
                          <div>
                            <p className="text-xs text-[#6B6B6B] mb-1">ORDER ID</p>
                            <p className="font-mono font-medium">{order.id}</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#6B6B6B] mb-1">DATE</p>
                            <p className="font-medium">{new Date(order.date).toLocaleDateString('en-US', { 
                              month: 'long', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#6B6B6B] mb-1">TOTAL</p>
                            <p className="font-display text-lg">${order.total.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-4 py-2 rounded-full text-xs font-medium ${statusConfig[order.status as keyof typeof statusConfig].color}`}>
                            {statusConfig[order.status as keyof typeof statusConfig].label}
                          </span>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="p-6">
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex gap-6">
                              <div className="w-24 h-24 flex-shrink-0 bg-[#FAF7F1] border border-[#E8E5E0] overflow-hidden">
                                <ImageWithFallback
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <Link 
                                  to={`/product/${item.id}`}
                                  className="font-display text-lg hover:text-[#EC4899] transition-colors inline-block mb-1"
                                >
                                  {item.name}
                                </Link>
                                <p className="text-sm text-[#6B6B6B] mb-2">{item.nameAr}</p>
                                <div className="flex items-center gap-4 text-sm">
                                  <span className="text-[#6B6B6B]">Size: {item.size}</span>
                                  <span className="text-[#6B6B6B]">Qty: {item.quantity}</span>
                                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Link
                                  to={`/product/${item.id}`}
                                  className="px-4 py-2 border-2 border-[#E8E5E0] hover:border-[#EC4899] text-sm transition-colors"
                                >
                                  Buy Again
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Shipping Info */}
                        {order.tracking && (
                          <div className="mt-6 pt-6 border-t border-[#E8E5E0]">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs text-[#6B6B6B] mb-1">TRACKING NUMBER</p>
                                <p className="font-mono text-sm">{order.tracking}</p>
                              </div>
                              <button className="text-sm text-[#EC4899] hover:text-[#A855F7] transition-colors">
                                Track Package →
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-display mb-6">Profile Information</h2>
                
                <div className="bg-white border-2 border-[#E8E5E0] p-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#6B6B6B] mb-2">
                        Full Name
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="text"
                          value={user.name}
                          readOnly
                          className="flex-1 px-4 py-3 border-2 border-[#E8E5E0] bg-[#FAF7F1]"
                        />
                        <button className="px-6 py-3 border-2 border-[#E8E5E0] hover:border-[#EC4899] transition-colors flex items-center gap-2">
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#6B6B6B] mb-2">
                        Email Address
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="email"
                          value={user.email}
                          readOnly
                          className="flex-1 px-4 py-3 border-2 border-[#E8E5E0] bg-[#FAF7F1]"
                        />
                        <button className="px-6 py-3 border-2 border-[#E8E5E0] hover:border-[#EC4899] transition-colors flex items-center gap-2">
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#6B6B6B] mb-2">
                        Member Since
                      </label>
                      <p className="px-4 py-3 border-2 border-[#E8E5E0] bg-[#FAF7F1]">
                        {new Date(user.createdAt).toLocaleDateString('en-US', { 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-display">Saved Addresses</h2>
                  <button className="px-6 py-3 bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white hover:opacity-90 transition-opacity">
                    Add New Address
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {orderHistory.slice(0, 2).map((order, index) => (
                    <div key={index} className="bg-white border-2 border-[#E8E5E0] p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-[#EC4899]" />
                          <h3 className="font-display">Address {index + 1}</h3>
                        </div>
                        <button className="text-[#6B6B6B] hover:text-[#EC4899]">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-sm space-y-1">
                        <p>{order.shipping.address}</p>
                        <p>{order.shipping.city}</p>
                        <p>{order.shipping.country}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-display mb-6">Wishlist</h2>
                
                <div className="bg-white border-2 border-[#E8E5E0] p-8">
                  <div className="space-y-6">
                    {wishlistItems.length === 0 ? (
                      <div className="text-center">
                        <Heart className="w-16 h-16 mx-auto mb-4 text-[#A0A0A0]" />
                        <p className="text-lg text-[#6B6B6B] mb-4">No items in your wishlist yet</p>
                        <Link
                          to="/shop"
                          className="inline-block px-6 py-3 bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white hover:opacity-90 transition-opacity"
                        >
                          Start Shopping
                        </Link>
                      </div>
                    ) : (
                      wishlistItems.map((item) => (
                        <div key={item.id} className="flex gap-6">
                          <div className="w-24 h-24 flex-shrink-0 bg-[#FAF7F1] border border-[#E8E5E0] overflow-hidden">
                            <ImageWithFallback
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <Link 
                              to={`/product/${item.id}`}
                              className="font-display text-lg hover:text-[#EC4899] transition-colors inline-block mb-1"
                            >
                              {item.name}
                            </Link>
                            <p className="text-sm text-[#6B6B6B] mb-2">{item.nameAr}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-[#6B6B6B]">Size: {item.size}</span>
                              <span className="font-medium">${item.price.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Link
                              to={`/product/${item.id}`}
                              className="px-4 py-2 border-2 border-[#E8E5E0] hover:border-[#EC4899] text-sm transition-colors"
                            >
                              Buy Now
                            </Link>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
import { ReactNode, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Package,
  FileText,
  Image as ImageIcon,
  ShoppingCart,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { useAdmin } from '@/app/context/AdminContext';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { logout, currentUser } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: FileText, label: 'Content & Text', path: '/admin/content' },
    { icon: ImageIcon, label: 'Media Library', path: '/admin/media' },
    { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F1]">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Mobile Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-[#101010]/40 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 h-full w-80 bg-white border-r-2 border-[#E8E5E0] z-50 flex flex-col"
            >
              {/* Logo */}
              <div className="p-8 border-b-2 border-[#E8E5E0]">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-2xl font-display">Kahramana</h1>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="lg:hidden p-2 hover:bg-[#FAF7F1] rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-[#6B6B6B] tracking-[0.3em] uppercase">Admin Portal</p>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-2">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white shadow-lg'
                            : 'text-[#6B6B6B] hover:bg-[#FAF7F1] hover:text-[#101010]'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                        {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                      </Link>
                    );
                  })}
                </div>
              </nav>

              {/* User Info & Logout */}
              <div className="p-4 border-t-2 border-[#E8E5E0]">
                <div className="mb-4 p-4 bg-[#FAF7F1] rounded-lg">
                  <p className="text-sm font-medium text-[#101010]">{currentUser?.name}</p>
                  <p className="text-xs text-[#6B6B6B]">{currentUser?.email}</p>
                  <p className="text-xs text-[#A0A0A0] mt-1">{currentUser?.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-80' : 'ml-0'}`}>
        {/* Top Bar */}
        <header className="bg-white border-b-2 border-[#E8E5E0] sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-[#FAF7F1] rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-4">
              <Link
                to="/"
                target="_blank"
                className="px-4 py-2 text-sm text-[#6B6B6B] hover:text-[#101010] transition-colors"
              >
                View Website
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
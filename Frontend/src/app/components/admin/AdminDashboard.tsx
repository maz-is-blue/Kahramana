import { motion } from 'motion/react';
import { Package, ShoppingCart, DollarSign, Users, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import { Link } from 'react-router';

export function AdminDashboard() {
  const stats = [
    {
      label: 'Total Revenue',
      value: '$48,392',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-[#EC4899] to-[#A855F7]',
    },
    {
      label: 'Orders',
      value: '156',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'from-[#A855F7] to-[#F59E0B]',
    },
    {
      label: 'Products',
      value: '48',
      change: '+2',
      trend: 'up',
      icon: Package,
      color: 'from-[#F59E0B] to-[#EC4899]',
    },
    {
      label: 'Customers',
      value: '1,248',
      change: '+18.3%',
      trend: 'up',
      icon: Users,
      color: 'from-[#EC4899] to-[#F59E0B]',
    },
  ];

  const recentOrders = [
    { id: 'KAH-001', customer: 'Sarah Al-Mansouri', product: 'Oud Royal 50ml', amount: 349, status: 'Completed' },
    { id: 'KAH-002', customer: 'Ahmed Hassan', product: 'Amber Nights 100ml', amount: 499, status: 'Processing' },
    { id: 'KAH-003', customer: 'Fatima Al-Zahra', product: 'Rose Mystique 30ml', amount: 199, status: 'Shipped' },
    { id: 'KAH-004', customer: 'Omar Al-Khalifa', product: 'Musk Noir 50ml', amount: 329, status: 'Pending' },
    { id: 'KAH-005', customer: 'Layla Ibrahim', product: 'Saffron Gold 100ml', amount: 599, status: 'Completed' },
  ];

  const topProducts = [
    { name: 'Oud Royal', sales: 89, revenue: '$31,061', trend: 'up' },
    { name: 'Amber Nights', sales: 67, revenue: '$20,033', trend: 'up' },
    { name: 'Rose Mystique', sales: 54, revenue: '$15,066', trend: 'down' },
    { name: 'Musk Noir', sales: 43, revenue: '$14,147', trend: 'up' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-display mb-2">Dashboard</h1>
        <p className="text-[#6B6B6B]">Welcome back to Kahramana Admin Portal</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border-2 border-[#E8E5E0] p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                <span className="font-medium">{stat.change}</span>
              </div>
            </div>
            <p className="text-3xl font-display mb-1">{stat.value}</p>
            <p className="text-sm text-[#6B6B6B]">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white border-2 border-[#E8E5E0] p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display">Recent Orders</h2>
            <Link to="/admin/orders" className="text-sm text-[#EC4899] hover:text-[#A855F7]">
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E8E5E0]">
                  <th className="text-left py-3 text-xs uppercase tracking-wider text-[#6B6B6B]">Order ID</th>
                  <th className="text-left py-3 text-xs uppercase tracking-wider text-[#6B6B6B]">Customer</th>
                  <th className="text-left py-3 text-xs uppercase tracking-wider text-[#6B6B6B]">Product</th>
                  <th className="text-right py-3 text-xs uppercase tracking-wider text-[#6B6B6B]">Amount</th>
                  <th className="text-right py-3 text-xs uppercase tracking-wider text-[#6B6B6B]">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-[#F3F1ED] hover:bg-[#FAF7F1] transition-colors">
                    <td className="py-4 font-mono text-sm">{order.id}</td>
                    <td className="py-4 text-sm">{order.customer}</td>
                    <td className="py-4 text-sm text-[#6B6B6B]">{order.product}</td>
                    <td className="py-4 text-sm text-right font-medium">${order.amount}</td>
                    <td className="py-4 text-right">
                      <span
                        className={`inline-block px-3 py-1 text-xs rounded-full ${
                          order.status === 'Completed'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'Processing'
                            ? 'bg-blue-100 text-blue-700'
                            : order.status === 'Shipped'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border-2 border-[#E8E5E0] p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display">Top Products</h2>
            <TrendingUp className="w-5 h-5 text-[#EC4899]" />
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#EC4899] to-[#A855F7] rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm mb-1">{product.name}</p>
                  <p className="text-xs text-[#6B6B6B]">{product.sales} sales</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">{product.revenue}</p>
                  {product.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-600 ml-auto" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-600 ml-auto" />
                  )}
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/admin/products"
            className="block mt-6 text-center py-3 border-2 border-[#E8E5E0] hover:border-[#EC4899] text-sm font-medium transition-colors"
          >
            Manage Products
          </Link>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#F59E0B] p-8 text-white"
      >
        <h2 className="text-2xl font-display mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            to="/admin/products/new"
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 p-6 rounded-lg transition-colors text-center"
          >
            <Package className="w-8 h-8 mx-auto mb-2" />
            <p className="font-medium">Add New Product</p>
          </Link>
          <Link
            to="/admin/orders"
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 p-6 rounded-lg transition-colors text-center"
          >
            <ShoppingCart className="w-8 h-8 mx-auto mb-2" />
            <p className="font-medium">View All Orders</p>
          </Link>
          <Link
            to="/admin/content"
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 p-6 rounded-lg transition-colors text-center"
          >
            <Package className="w-8 h-8 mx-auto mb-2" />
            <p className="font-medium">Edit Website Content</p>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
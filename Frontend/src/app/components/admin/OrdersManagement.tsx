import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Eye, Package, CheckCircle, XCircle, Clock } from 'lucide-react';
import { ordersAPI } from '@/app/services/api';
import { toast } from 'sonner';

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  pending:    { label: 'Pending',    color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  processing: { label: 'Processing', color: 'bg-blue-100 text-blue-700',    icon: Package },
  shipped:    { label: 'Shipped',    color: 'bg-purple-100 text-purple-700', icon: Package },
  completed:  { label: 'Completed',  color: 'bg-green-100 text-green-700',   icon: CheckCircle },
  cancelled:  { label: 'Cancelled',  color: 'bg-red-100 text-red-700',       icon: XCircle },
};

export function OrdersManagement() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<Record<string, string>>({});

  useEffect(() => {
    ordersAPI.getAll()
      .then((data) => setOrders(data.orders || []))
      .catch(() => toast.error('Failed to load orders'))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusUpdate = async (orderId: string) => {
    const status = newStatus[orderId];
    if (!status) return;
    setUpdatingStatus(orderId);
    try {
      const updated = await ordersAPI.updateStatus(orderId, status);
      setOrders((prev) => prev.map((o) => (String(o.id) === String(orderId) ? { ...o, status: updated.status } : o)));
      toast.success('Order status updated');
      setSelectedOrder(null);
    } catch (err: any) {
      toast.error(err.message || 'Failed to update status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const customer = order.user || {};
    const addr = order.shipping_address || {};
    const matchesSearch =
      String(order.id).includes(searchQuery) ||
      (customer.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (customer.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (addr.name || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-[#EC4899] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-display mb-2">Orders</h1>
        <p className="text-[#6B6B6B]">Manage customer orders and shipments</p>
      </div>

      <div className="bg-white border-2 border-[#E8E5E0] p-6">
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0A0]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order ID, customer name, or email..."
              className="w-full pl-12 pr-4 py-3 border-2 border-[#E8E5E0] focus:border-[#EC4899] focus:outline-none transition-colors"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0A0]" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-[#E8E5E0] focus:border-[#EC4899] focus:outline-none transition-colors bg-white appearance-none"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-6 border-t border-[#E8E5E0]">
          <div>
            <p className="text-2xl font-display">{orders.length}</p>
            <p className="text-xs text-[#6B6B6B]">Total Orders</p>
          </div>
          {['pending','processing','shipped','completed'].map((s) => (
            <div key={s}>
              <p className={`text-2xl font-display ${s === 'pending' ? 'text-yellow-600' : s === 'processing' ? 'text-blue-600' : s === 'shipped' ? 'text-purple-600' : 'text-green-600'}`}>
                {orders.filter((o) => o.status === s).length}
              </p>
              <p className="text-xs text-[#6B6B6B] capitalize">{s}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-2 border-[#E8E5E0]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#FAF7F1]">
              <tr className="border-b border-[#E8E5E0]">
                <th className="text-left p-4 text-xs uppercase tracking-wider text-[#6B6B6B]">Order ID</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-[#6B6B6B]">Customer</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-[#6B6B6B]">Date</th>
                <th className="text-right p-4 text-xs uppercase tracking-wider text-[#6B6B6B]">Total</th>
                <th className="text-center p-4 text-xs uppercase tracking-wider text-[#6B6B6B]">Status</th>
                <th className="text-right p-4 text-xs uppercase tracking-wider text-[#6B6B6B]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => {
                const cfg = statusConfig[order.status] || statusConfig.pending;
                const StatusIcon = cfg.icon;
                const customer = order.user || {};
                const addr = order.shipping_address || {};
                return (
                  <motion.tr key={order.id}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                    className="border-b border-[#F3F1ED] hover:bg-[#FAF7F1] transition-colors">
                    <td className="p-4">
                      <p className="font-mono text-sm font-medium">#{order.id}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium">{customer.name || addr.name || '—'}</p>
                      <p className="text-xs text-[#6B6B6B]">{customer.email || addr.email || '—'}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm">{new Date(order.created_at).toLocaleDateString()}</p>
                      <p className="text-xs text-[#6B6B6B]">{new Date(order.created_at).toLocaleTimeString()}</p>
                    </td>
                    <td className="p-4 text-right">
                      <p className="text-sm font-medium">${Number(order.total).toFixed(2)}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${cfg.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {cfg.label}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedOrder(selectedOrder === String(order.id) ? null : String(order.id))}
                          className="p-2 hover:bg-[#FAF7F1] rounded transition-colors"
                          title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (() => {
        const order = orders.find((o) => String(o.id) === selectedOrder);
        if (!order) return null;
        const customer = order.user || {};
        const addr = order.shipping_address || {};
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white border-2 border-[#E8E5E0] p-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-[#E8E5E0]">
                <h2 className="text-2xl font-display">Order Details: #{order.id}</h2>
                <button onClick={() => setSelectedOrder(null)} className="text-[#6B6B6B] hover:text-[#101010]">Close</button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-display text-lg mb-4">Customer Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {customer.name || addr.name || '—'}</p>
                    <p><strong>Email:</strong> {customer.email || addr.email || '—'}</p>
                    {addr.phone && <p><strong>Phone:</strong> {addr.phone}</p>}
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-lg mb-4">Shipping Address</h3>
                  <div className="space-y-1 text-sm">
                    {addr.address && <p>{addr.address}</p>}
                    {addr.city && <p>{addr.city}</p>}
                    {addr.country && <p>{addr.country}</p>}
                  </div>
                  {order.tracking_number && (
                    <div className="mt-4">
                      <p className="text-xs text-[#6B6B6B] mb-1">Tracking Number:</p>
                      <p className="font-mono text-sm">{order.tracking_number}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-display text-lg mb-4">Order Items</h3>
                <div className="space-y-3">
                  {(order.items || []).map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center p-4 bg-[#FAF7F1]">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-[#6B6B6B]">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#E8E5E0]">
                <div className="max-w-md ml-auto space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B6B6B]">Subtotal:</span>
                    <span>${Number(order.subtotal).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B6B6B]">Shipping:</span>
                    <span>${Number(order.shipping).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-display pt-4 border-t border-[#E8E5E0]">
                    <span>Total:</span>
                    <span className="text-[#EC4899]">${Number(order.total).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E8E5E0]">
                <h3 className="font-display text-lg mb-4">Update Order Status</h3>
                <div className="flex gap-3">
                  <select
                    value={newStatus[String(order.id)] || order.status}
                    onChange={(e) => setNewStatus((prev) => ({ ...prev, [String(order.id)]: e.target.value }))}
                    className="flex-1 px-4 py-3 border-2 border-[#E8E5E0] focus:border-[#EC4899] focus:outline-none transition-colors bg-white">
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={() => handleStatusUpdate(String(order.id))}
                    disabled={updatingStatus === String(order.id)}
                    className="px-6 py-3 bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white hover:opacity-90 transition-opacity disabled:opacity-50">
                    {updatingStatus === String(order.id) ? 'Updating...' : 'Update Status'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })()}

      {filteredOrders.length === 0 && (
        <div className="text-center py-12 bg-white border-2 border-[#E8E5E0]">
          <p className="text-[#6B6B6B] mb-4">No orders found matching your criteria</p>
          <button onClick={() => { setSearchQuery(''); setFilterStatus('all'); }}
            className="text-[#EC4899] hover:text-[#A855F7]">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

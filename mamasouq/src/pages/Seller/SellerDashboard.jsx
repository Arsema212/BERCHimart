import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Plus,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  DollarSign,
  Users,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const SellerDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    pendingApproval: 0,
    totalSales: 0,
    monthlyRevenue: 0,
    totalOrders: 0
  });

  const [products, setProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    setStats({
      totalProducts: 24,
      activeProducts: 18,
      pendingApproval: 3,
      totalSales: 1247,
      monthlyRevenue: 2340,
      totalOrders: 89
    });

    setProducts([
      {
        id: 1,
        name: 'Handwoven Ethiopian Scarf',
        price: 45,
        status: 'active',
        sales: 12,
        rating: 4.8,
        image: 'scarf.jpg',
        category: 'Textiles'
      },
      {
        id: 2,
        name: 'Traditional Coffee Set',
        price: 89,
        status: 'pending',
        sales: 0,
        rating: 0,
        image: 'coffee.jpg',
        category: 'Kitchenware'
      },
      {
        id: 3,
        name: 'Wooden Hand Carved Bowl',
        price: 32,
        status: 'active',
        sales: 8,
        rating: 4.6,
        image: 'bowl.jpg',
        category: 'Home Decor'
      },
      {
        id: 4,
        name: 'Silver Jewelry Set',
        price: 67,
        status: 'rejected',
        sales: 0,
        rating: 0,
        image: 'jewelry.jpg',
        category: 'Jewelry'
      }
    ]);

    setRecentOrders([
      { id: 1, product: 'Handwoven Ethiopian Scarf', customer: 'John Doe', amount: 45, status: 'completed', date: '2 hours ago' },
      { id: 2, product: 'Wooden Hand Carved Bowl', customer: 'Jane Smith', amount: 32, status: 'shipped', date: '1 day ago' },
      { id: 3, product: 'Handwoven Ethiopian Scarf', customer: 'Mike Johnson', amount: 45, status: 'pending', date: '2 days ago' }
    ]);
  }, []);

  const handleProductAction = (id, action) => {
    if (action === 'delete') {
      setProducts(prev => prev.filter(item => item.id !== id));
    } else if (action === 'edit') {
      // Handle edit action
      console.log('Edit product:', id);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'pending': return Clock;
      case 'rejected': return XCircle;
      default: return AlertCircle;
    }
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Products',
      value: stats.activeProducts,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Pending Approval',
      value: stats.pendingApproval,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Total Sales',
      value: stats.totalSales,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Monthly Revenue',
      value: `$${stats.monthlyRevenue}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your products and track sales</p>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors">
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Products */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">My Products</h2>
              <span className="text-sm text-gray-500">{products.length} total</span>
            </div>
            
            <div className="space-y-4">
              {products.map((product) => {
                const StatusIcon = getStatusIcon(product.status);
                return (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex space-x-3">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-600">{product.category}</p>
                          <p className="text-lg font-semibold text-gray-900">${product.price}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-500">{product.sales} sales</span>
                            {product.rating > 0 && (
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-500">{product.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                          <StatusIcon className="w-3 h-3 inline mr-1" />
                          {product.status}
                        </span>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleProductAction(product.id, 'edit')}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleProductAction(product.id, 'delete')}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Orders</h2>
            
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{order.product}</h3>
                    <p className="text-sm text-gray-600">by {order.customer}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${order.amount}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'completed' ? 'text-green-600 bg-green-50' :
                      order.status === 'shipped' ? 'text-blue-600 bg-blue-50' :
                      'text-yellow-600 bg-yellow-50'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;

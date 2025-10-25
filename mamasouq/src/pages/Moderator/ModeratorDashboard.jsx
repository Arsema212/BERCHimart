import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  CheckCircle, 
  XCircle, 
  Eye,
  Users,
  TrendingUp,
  AlertTriangle,
  Clock,
  Star
} from 'lucide-react';

const ModeratorDashboard = () => {
  const [stats, setStats] = useState({
    pendingProducts: 0,
    approvedToday: 0,
    rejectedToday: 0,
    totalModerated: 0
  });

  const [pendingProducts, setPendingProducts] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    setStats({
      pendingProducts: 15,
      approvedToday: 8,
      rejectedToday: 2,
      totalModerated: 1247
    });

    setPendingProducts([
      {
        id: 1,
        name: 'Handwoven Ethiopian Scarf',
        seller: 'Ethiopian Crafts Co.',
        category: 'Textiles',
        price: '$45',
        submitted: '2 hours ago',
        images: ['scarf1.jpg', 'scarf2.jpg']
      },
      {
        id: 2,
        name: 'Traditional Coffee Set',
        seller: 'Coffee Culture Ltd',
        category: 'Kitchenware',
        price: '$89',
        submitted: '4 hours ago',
        images: ['coffee1.jpg', 'coffee2.jpg']
      },
      {
        id: 3,
        name: 'Wooden Hand Carved Bowl',
        seller: 'Artisan Woodworks',
        category: 'Home Decor',
        price: '$32',
        submitted: '6 hours ago',
        images: ['bowl1.jpg', 'bowl2.jpg']
      }
    ]);

    setRecentActivity([
      { id: 1, action: 'approved', product: 'Ceramic Vase Collection', time: '1 hour ago' },
      { id: 2, action: 'rejected', product: 'Inappropriate Content', time: '2 hours ago' },
      { id: 3, action: 'approved', product: 'Leather Handbag', time: '3 hours ago' },
      { id: 4, action: 'approved', product: 'Silver Jewelry Set', time: '5 hours ago' }
    ]);
  }, []);

  const handleProductAction = (id, action) => {
    setPendingProducts(prev => prev.filter(item => item.id !== id));
    const product = pendingProducts.find(item => item.id === id);
    setRecentActivity(prev => [{
      id: Date.now(),
      action,
      product: product?.name,
      time: 'Just now'
    }, ...prev]);
    
    setStats(prev => ({
      ...prev,
      pendingProducts: prev.pendingProducts - 1,
      [action === 'approved' ? 'approvedToday' : 'rejectedToday']: 
        prev[action === 'approved' ? 'approvedToday' : 'rejectedToday'] + 1
    }));
  };

  const statCards = [
    {
      title: 'Pending Products',
      value: stats.pendingProducts,
      icon: Package,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Approved Today',
      value: stats.approvedToday,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Rejected Today',
      value: stats.rejectedToday,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Total Moderated',
      value: stats.totalModerated.toLocaleString(),
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Moderator Dashboard</h1>
          <p className="text-gray-600 mt-2">Review and moderate product submissions</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
          {/* Pending Products */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Pending Products</h2>
              <span className="bg-orange-100 text-orange-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {pendingProducts.length} pending
              </span>
            </div>
            
            <div className="space-y-4">
              {pendingProducts.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-600">by {product.seller}</p>
                      <p className="text-sm text-gray-500">{product.category} • {product.price}</p>
                      <p className="text-xs text-gray-400 mt-1">{product.submitted}</p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleProductAction(product.id, 'approved')}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Approve"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleProductAction(product.id, 'rejected')}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Reject"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
            
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.action === 'approved' ? 'bg-green-400' : 'bg-red-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className={`font-medium ${
                        activity.action === 'approved' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {activity.action === 'approved' ? 'Approved' : 'Rejected'}
                      </span> {activity.product}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
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

export default ModeratorDashboard;

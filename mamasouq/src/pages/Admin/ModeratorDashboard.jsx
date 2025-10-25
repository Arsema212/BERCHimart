import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Eye, 
  Filter,
  Search,
  TrendingUp,
  Star,
  Heart
} from 'lucide-react';

const ModeratorDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    {
      title: 'Products Pending Review',
      value: '24',
      change: '+3',
      changeType: 'positive',
      icon: Clock,
      color: 'yellow'
    },
    {
      title: 'Products Approved',
      value: '156',
      change: '+12',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Products Rejected',
      value: '8',
      change: '+2',
      changeType: 'negative',
      icon: AlertCircle,
      color: 'red'
    },
    {
      title: 'Average Review Time',
      value: '2.4h',
      change: '-0.3h',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'blue'
    }
  ];

  const pendingProducts = [
    {
      id: 1,
      name: 'Handwoven Ceramic Bowl',
      artisan: 'Maria Rodriguez',
      category: 'Home Decor',
      price: 45.99,
      submittedDate: '2024-01-15',
      images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200'],
      description: 'Beautiful handcrafted ceramic bowl with intricate patterns',
      tags: ['ceramic', 'handmade', 'bowl', 'decorative']
    },
    {
      id: 2,
      name: 'Artisan Silver Ring',
      artisan: 'Ahmed Hassan',
      category: 'Jewelry',
      price: 89.99,
      submittedDate: '2024-01-14',
      images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200'],
      description: 'Elegant silver ring with unique hand-carved design',
      tags: ['silver', 'ring', 'jewelry', 'handmade']
    },
    {
      id: 3,
      name: 'Hand-knitted Scarf',
      artisan: 'Elena Petrov',
      category: 'Clothing',
      price: 35.99,
      submittedDate: '2024-01-13',
      images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200'],
      description: 'Warm and cozy scarf made with premium wool',
      tags: ['scarf', 'knitted', 'wool', 'clothing']
    }
  ];

  const recentReviews = [
    {
      id: 1,
      product: 'Wooden Art Sculpture',
      artisan: 'James Wilson',
      action: 'approved',
      moderator: 'Sarah Chen',
      time: '2 hours ago',
      notes: 'High quality craftsmanship, meets all standards'
    },
    {
      id: 2,
      product: 'Ceramic Vase Set',
      artisan: 'Maria Rodriguez',
      action: 'rejected',
      moderator: 'Sarah Chen',
      time: '4 hours ago',
      notes: 'Images not clear enough, needs better photos'
    },
    {
      id: 3,
      product: 'Leather Wallet',
      artisan: 'Ahmed Hassan',
      action: 'approved',
      moderator: 'Mike Johnson',
      time: '6 hours ago',
      notes: 'Excellent quality, approved for listing'
    }
  ];

  const getActionColor = (action) => {
    switch (action) {
      case 'approved':
        return 'text-green-600 bg-green-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'approved':
        return CheckCircle;
      case 'rejected':
        return AlertCircle;
      default:
        return Eye;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Moderator Dashboard</h1>
              <p className="text-gray-600 mt-2">Review and moderate product listings</p>
            </div>
            
            <div className="flex items-center gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    stat.color === 'yellow' ? 'bg-yellow-100' :
                    stat.color === 'green' ? 'bg-green-100' :
                    stat.color === 'red' ? 'bg-red-100' :
                    'bg-blue-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      stat.color === 'yellow' ? 'text-yellow-600' :
                      stat.color === 'green' ? 'text-green-600' :
                      stat.color === 'red' ? 'text-red-600' :
                      'text-blue-600'
                    }`} />
                  </div>
                  <div className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pending Products */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Products Pending Review</h2>
                <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {pendingProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex gap-4">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{product.name}</h3>
                            <p className="text-sm text-gray-600">by {product.artisan}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">${product.price}</div>
                            <div className="text-sm text-gray-500">{product.category}</div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {product.tags.slice(0, 3).map((tag, idx) => (
                              <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <button className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors">
                              Reject
                            </button>
                            <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors">
                              Approve
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Reviews */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Reviews</h2>
                <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentReviews.map((review, index) => {
                  const ActionIcon = getActionIcon(review.action);
                  
                  return (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-start gap-3 mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          review.action === 'approved' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          <ActionIcon className={`w-4 h-4 ${
                            review.action === 'approved' ? 'text-green-600' : 'text-red-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-900">{review.product}</h4>
                              <p className="text-sm text-gray-600">by {review.artisan}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(review.action)}`}>
                              {review.action}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mt-2">{review.notes}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-500">{review.time}</span>
                            <span className="text-xs text-gray-500">by {review.moderator}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <ShoppingBag className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Review Products</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="text-gray-700">Flagged Content</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <span className="text-gray-700">Quality Reports</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeratorDashboard;
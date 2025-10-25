import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Store, 
  Package, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Eye,
  BarChart3,
  Settings,
  Shield,
  UserCheck,
  AlertTriangle
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCompanies: 0,
    totalProducts: 0,
    pendingApprovals: 0,
    totalSales: 0,
    activeModerators: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);

  useEffect(() => {
    // Simulate loading data
    setStats({
      totalUsers: 1247,
      totalCompanies: 89,
      totalProducts: 2156,
      pendingApprovals: 23,
      totalSales: 45678,
      activeModerators: 12
    });

    setRecentActivity([
      { id: 1, type: 'company_approval', message: 'New company "Ethiopian Crafts Co." applied for approval', time: '2 hours ago', status: 'pending' },
      { id: 2, type: 'product_approval', message: '15 new products submitted for review', time: '4 hours ago', status: 'pending' },
      { id: 3, type: 'user_registration', message: '23 new users registered today', time: '6 hours ago', status: 'completed' },
      { id: 4, type: 'moderator_action', message: 'Moderator Sarah approved 8 products', time: '8 hours ago', status: 'completed' }
    ]);

    setPendingApprovals([
      { id: 1, name: 'Ethiopian Crafts Co.', type: 'Company', submitted: '2 hours ago', status: 'pending' },
      { id: 2, name: 'Handmade Jewelry Store', type: 'Company', submitted: '5 hours ago', status: 'pending' },
      { id: 3, name: 'Traditional Textiles Ltd', type: 'Company', submitted: '1 day ago', status: 'pending' }
    ]);
  }, []);

  const handleApproval = (id, action) => {
    setPendingApprovals(prev => prev.filter(item => item.id !== id));
    setRecentActivity(prev => [{
      id: Date.now(),
      type: 'admin_action',
      message: `Admin ${action}ed ${pendingApprovals.find(item => item.id === id)?.name}`,
      time: 'Just now',
      status: 'completed'
    }, ...prev]);
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12%'
    },
    {
      title: 'Companies',
      value: stats.totalCompanies.toLocaleString(),
      icon: Store,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+8%'
    },
    {
      title: 'Products',
      value: stats.totalProducts.toLocaleString(),
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+15%'
    },
    {
      title: 'Pending Approvals',
      value: stats.pendingApprovals.toLocaleString(),
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '-3%'
    },
    {
      title: 'Total Sales',
      value: `$${stats.totalSales.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+22%'
    },
    {
      title: 'Active Moderators',
      value: stats.activeModerators.toLocaleString(),
      icon: Shield,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      change: '+2%'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your platform and monitor activity</p>
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
                  <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Approvals */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Pending Approvals</h2>
              <span className="bg-orange-100 text-orange-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {pendingApprovals.length} pending
              </span>
            </div>
            
            <div className="space-y-4">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.type} • {item.submitted}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleApproval(item.id, 'approve')}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleApproval(item.id, 'reject')}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
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
                    activity.status === 'pending' ? 'bg-orange-400' : 'bg-green-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <UserCheck className="w-5 h-5 text-blue-600" />
              <span className="text-blue-900 font-medium">Manage Users</span>
            </button>
            
            <button className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <Store className="w-5 h-5 text-green-600" />
              <span className="text-green-900 font-medium">Company Approvals</span>
            </button>
            
            <button className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <Package className="w-5 h-5 text-purple-600" />
              <span className="text-purple-900 font-medium">Product Management</span>
            </button>
            
            <button className="flex items-center space-x-3 p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <span className="text-indigo-900 font-medium">Analytics</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
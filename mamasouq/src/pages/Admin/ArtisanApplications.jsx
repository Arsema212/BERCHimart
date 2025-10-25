import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, User, Mail, Calendar, FileText } from 'lucide-react';

const ArtisanApplications = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const applications = [
    {
      id: 1,
      name: 'Maria Rodriguez',
      email: 'maria.rodriguez@email.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      status: 'pending',
      submittedDate: '2024-01-15',
      experience: '5 years',
      specialties: ['Ceramics', 'Pottery', 'Handmade Crafts'],
      portfolio: [
        { name: 'Ceramic Bowl Set', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200' },
        { name: 'Hand-painted Vase', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200' }
      ],
      bio: 'Passionate ceramic artist with 5 years of experience creating unique, handcrafted pieces. Specializing in functional pottery and decorative ceramics.',
      motivation: 'I want to share my handmade ceramics with a wider audience and connect with customers who appreciate authentic, handcrafted items.'
    },
    {
      id: 2,
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@email.com',
      phone: '+1 (555) 987-6543',
      location: 'Los Angeles, CA',
      status: 'under_review',
      submittedDate: '2024-01-14',
      experience: '3 years',
      specialties: ['Jewelry', 'Metalwork', 'Silver Crafting'],
      portfolio: [
        { name: 'Silver Ring Collection', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200' },
        { name: 'Handcrafted Necklace', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200' }
      ],
      bio: 'Traditional metalworker specializing in silver jewelry. Creating unique pieces that blend traditional techniques with modern design.',
      motivation: 'I believe in preserving traditional craftsmanship while making it accessible to modern customers through online platforms.'
    },
    {
      id: 3,
      name: 'Elena Petrov',
      email: 'elena.petrov@email.com',
      phone: '+1 (555) 456-7890',
      location: 'Chicago, IL',
      status: 'approved',
      submittedDate: '2024-01-10',
      experience: '8 years',
      specialties: ['Textiles', 'Weaving', 'Fiber Arts'],
      portfolio: [
        { name: 'Handwoven Scarf', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },
        { name: 'Wool Blanket', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' }
      ],
      bio: 'Master weaver with 8 years of experience in traditional and contemporary textile arts. Creating beautiful, functional pieces for everyday use.',
      motivation: 'I want to share the beauty of handwoven textiles and educate customers about the value of traditional craftsmanship.'
    }
  ];

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return CheckCircle;
      case 'under_review':
        return Eye;
      case 'pending':
        return Clock;
      case 'rejected':
        return XCircle;
      default:
        return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Artisan Applications</h1>
          <p className="text-gray-600">Review and manage artisan applications</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <button className="flex-1 bg-primary-500 text-white px-4 py-3 rounded-lg hover:bg-primary-600 transition-colors">
                Bulk Approve
              </button>
              <button className="flex-1 bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          {filteredApplications.map((application, index) => {
            const StatusIcon = getStatusIcon(application.status);
            
            return (
              <motion.div
                key={application.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {application.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{application.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {application.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {application.submittedDate}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                        <StatusIcon className="w-4 h-4" />
                        {application.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Application Details */}
                    <div className="lg:col-span-2 space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Bio</h4>
                        <p className="text-gray-700">{application.bio}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Motivation</h4>
                        <p className="text-gray-700">{application.motivation}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Experience</h4>
                          <p className="text-gray-700">{application.experience}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                          <p className="text-gray-700">{application.location}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Specialties</h4>
                        <div className="flex flex-wrap gap-2">
                          {application.specialties.map((specialty, idx) => (
                            <span key={idx} className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Portfolio */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Portfolio</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {application.portfolio.map((item, idx) => (
                          <div key={idx} className="relative group">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center">
                              <Eye className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <p className="text-xs text-gray-600 mt-1 truncate">{item.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-4">
                      <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        View Full Application
                      </button>
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2">
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {applications.filter(a => a.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {applications.filter(a => a.status === 'under_review').length}
                </div>
                <div className="text-sm text-gray-600">Under Review</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {applications.filter(a => a.status === 'approved').length}
                </div>
                <div className="text-sm text-gray-600">Approved</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{applications.length}</div>
                <div className="text-sm text-gray-600">Total Applications</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanApplications;
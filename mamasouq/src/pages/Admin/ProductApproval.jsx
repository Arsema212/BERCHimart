import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Star,
  Heart,
  Tag,
  User,
  Calendar
} from 'lucide-react';

const ProductApproval = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
      {
        id: 1,
      name: 'Handwoven Ceramic Bowl',
      artisan: 'Maria Rodriguez',
        category: 'Home Decor',
        price: 45.99,
      status: 'pending',
        submittedDate: '2024-01-15',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
      ],
      description: 'Beautiful handcrafted ceramic bowl with intricate patterns. Made from high-quality clay and fired at high temperatures for durability.',
      tags: ['ceramic', 'handmade', 'bowl', 'decorative', 'functional'],
      materials: ['Clay', 'Glaze', 'Natural pigments'],
      dimensions: '8" diameter x 4" height',
      stock: 5,
      rating: { average: 0, count: 0 },
      accessibility: {
        audioDescription: 'A handcrafted ceramic bowl with a smooth, glazed surface featuring traditional patterns',
        altText: 'Ceramic bowl with blue and white geometric patterns',
        brailleAvailable: true
      }
      },
      {
        id: 2,
      name: 'Artisan Silver Ring',
      artisan: 'Ahmed Hassan',
      category: 'Jewelry',
      price: 89.99,
      status: 'under_review',
        submittedDate: '2024-01-14',
      images: [
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400'
      ],
      description: 'Elegant silver ring with unique hand-carved design. Crafted from sterling silver with attention to detail.',
      tags: ['silver', 'ring', 'jewelry', 'handmade', 'sterling'],
      materials: ['Sterling Silver', 'Natural stone'],
      dimensions: 'Size 7, 2mm band width',
      stock: 3,
      rating: { average: 0, count: 0 },
      accessibility: {
        audioDescription: 'A sterling silver ring with intricate hand-carved details and a natural stone centerpiece',
        altText: 'Silver ring with carved geometric patterns and stone',
        brailleAvailable: false
      }
    },
    {
      id: 3,
      name: 'Hand-knitted Scarf',
      artisan: 'Elena Petrov',
      category: 'Clothing',
      price: 35.99,
      status: 'pending',
      submittedDate: '2024-01-13',
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
      ],
      description: 'Warm and cozy scarf made with premium wool. Perfect for cold weather with beautiful color patterns.',
      tags: ['scarf', 'knitted', 'wool', 'clothing', 'warm'],
      materials: ['Premium Wool', 'Natural dyes'],
      dimensions: '60" length x 8" width',
      stock: 8,
      rating: { average: 0, count: 0 },
      accessibility: {
        audioDescription: 'A hand-knitted wool scarf with soft texture and warm earth-tone colors',
        altText: 'Wool scarf in brown and cream colors with knitted pattern',
        brailleAvailable: true
      }
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'jewelry', label: 'Jewelry' },
    { value: 'home-decor', label: 'Home Decor' },
    { value: 'art', label: 'Art' },
    { value: 'food', label: 'Food' },
    { value: 'other', label: 'Other' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.artisan.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || product.category.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesStatus && matchesCategory;
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Approval</h1>
          <p className="text-gray-600">Review and approve product listings</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
                  placeholder="Search products..."
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

            {/* Category Filter */}
            <div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <button className="flex-1 bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors">
                Bulk Approve
              </button>
              <button className="flex-1 bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="space-y-6">
          {filteredProducts.map((product, index) => {
            const StatusIcon = getStatusIcon(product.status);
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {product.artisan}
                          </div>
                          <div className="flex items-center gap-1">
                            <Tag className="w-4 h-4" />
                            {product.category}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {product.submittedDate}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product.status)}`}>
                        <StatusIcon className="w-4 h-4" />
                        {product.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Product Details */}
                    <div className="lg:col-span-2 space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                        <p className="text-gray-700">{product.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Price</h4>
                          <p className="text-2xl font-bold text-gray-900">${product.price}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Stock</h4>
                          <p className="text-gray-700">{product.stock} units</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Materials</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.materials.map((material, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                              {material}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.tags.map((tag, idx) => (
                            <span key={idx} className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Product Images */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Images</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {product.images.map((image, idx) => (
                          <div key={idx} className="relative group">
                            <img
                              src={image}
                              alt={`${product.name} ${idx + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center">
                              <Eye className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Accessibility Features */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-3">Accessibility Features</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-blue-800">Audio Description:</span>
                        <p className="text-sm text-blue-700">{product.accessibility.audioDescription}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-blue-800">Alt Text:</span>
                        <p className="text-sm text-blue-700">{product.accessibility.altText}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-blue-800">Braille Available:</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          product.accessibility.brailleAvailable 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {product.accessibility.brailleAvailable ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-4">
                      <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        View Full Details
                    </button>
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2">
                        <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                      <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2">
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
                  {products.filter(p => p.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600">Pending Review</div>
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
                  {products.filter(p => p.status === 'under_review').length}
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
                  {products.filter(p => p.status === 'approved').length}
                </div>
                <div className="text-sm text-gray-600">Approved</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{products.length}</div>
                <div className="text-sm text-gray-600">Total Products</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductApproval;
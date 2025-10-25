import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Search, 
  Filter, 
  Star, 
  Truck, 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail,
  Globe,
  ShoppingCart,
  Heart,
  Users,
  Award
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const MaterialPartnership = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for material suppliers
  const [suppliers] = useState([
    {
      id: 1,
      name: 'Ethiopian Textile Co.',
      description: 'Premium cotton and wool suppliers for traditional crafts',
      rating: 4.8,
      reviewCount: 156,
      materials: [
        { name: 'Cotton Yarn', category: 'yarn', price: 15, unit: 'kilogram', stock: 500 },
        { name: 'Wool Thread', category: 'yarn', price: 25, unit: 'kilogram', stock: 200 },
        { name: 'Silk Fabric', category: 'fabric', price: 45, unit: 'meter', stock: 100 }
      ],
      delivery: {
        available: true,
        cost: 5,
        estimatedDays: 3,
        areas: ['Addis Ababa', 'Bahir Dar', 'Hawassa']
      },
      contact: {
        phone: '+251 911 234 567',
        email: 'contact@ethiotextile.com',
        website: 'www.ethiotextile.com'
      },
      location: 'Addis Ababa, Ethiopia',
      logo: 'https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=ETC'
    },
    {
      id: 2,
      name: 'Artisan Beads & Crafts',
      description: 'Specialized in traditional beads, stones, and decorative materials',
      rating: 4.6,
      reviewCount: 89,
      materials: [
        { name: 'Glass Beads', category: 'beads', price: 8, unit: 'dozen', stock: 1000 },
        { name: 'Wooden Beads', category: 'beads', price: 12, unit: 'dozen', stock: 500 },
        { name: 'Metal Findings', category: 'metal', price: 20, unit: 'set', stock: 200 }
      ],
      delivery: {
        available: true,
        cost: 3,
        estimatedDays: 2,
        areas: ['Addis Ababa', 'Dire Dawa', 'Gondar']
      },
      contact: {
        phone: '+251 922 345 678',
        email: 'info@artisanbeads.com',
        website: 'www.artisanbeads.com'
      },
      location: 'Dire Dawa, Ethiopia',
      logo: 'https://via.placeholder.com/100x100/059669/FFFFFF?text=ABC'
    },
    {
      id: 3,
      name: 'Sustainable Wood Supply',
      description: 'Eco-friendly wood and carving materials for artisans',
      rating: 4.9,
      reviewCount: 234,
      materials: [
        { name: 'Oak Wood Blocks', category: 'wood', price: 35, unit: 'piece', stock: 150 },
        { name: 'Carving Tools Set', category: 'tools', price: 85, unit: 'set', stock: 50 },
        { name: 'Wood Stain', category: 'paint', price: 12, unit: 'liter', stock: 100 }
      ],
      delivery: {
        available: true,
        cost: 8,
        estimatedDays: 5,
        areas: ['Addis Ababa', 'Jimma', 'Arba Minch']
      },
      contact: {
        phone: '+251 933 456 789',
        email: 'orders@sustainablewood.com',
        website: 'www.sustainablewood.com'
      },
      location: 'Jimma, Ethiopia',
      logo: 'https://via.placeholder.com/100x100/DC2626/FFFFFF?text=SWS'
    },
    {
      id: 4,
      name: 'Ceramic & Clay Works',
      description: 'High-quality clay and ceramic materials for pottery',
      rating: 4.7,
      reviewCount: 178,
      materials: [
        { name: 'Pottery Clay', category: 'clay', price: 18, unit: 'kilogram', stock: 300 },
        { name: 'Glaze Colors', category: 'paint', price: 22, unit: 'liter', stock: 80 },
        { name: 'Pottery Tools', category: 'tools', price: 45, unit: 'set', stock: 60 }
      ],
      delivery: {
        available: true,
        cost: 6,
        estimatedDays: 4,
        areas: ['Addis Ababa', 'Hawassa', 'Mekelle']
      },
      contact: {
        phone: '+251 944 567 890',
        email: 'sales@ceramicworks.com',
        website: 'www.ceramicworks.com'
      },
      location: 'Hawassa, Ethiopia',
      logo: 'https://via.placeholder.com/100x100/7C3AED/FFFFFF?text=CCW'
    }
  ]);

  const categories = [
    { value: 'all', label: 'All Categories', icon: Package },
    { value: 'fabric', label: 'Fabric & Textiles', icon: Package },
    { value: 'yarn', label: 'Yarn & Thread', icon: Package },
    { value: 'beads', label: 'Beads & Stones', icon: Package },
    { value: 'wood', label: 'Wood & Carving', icon: Package },
    { value: 'metal', label: 'Metal & Findings', icon: Package },
    { value: 'clay', label: 'Clay & Ceramics', icon: Package },
    { value: 'paint', label: 'Paints & Dyes', icon: Package },
    { value: 'tools', label: 'Tools & Equipment', icon: Package }
  ];

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.materials.some(material => 
                           material.name.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    
    const matchesCategory = selectedCategory === 'all' || 
                           supplier.materials.some(material => material.category === selectedCategory);
    
    const matchesPrice = (!priceRange.min || supplier.materials.some(m => m.price >= parseFloat(priceRange.min))) &&
                        (!priceRange.max || supplier.materials.some(m => m.price <= parseFloat(priceRange.max)));
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price_low':
        return Math.min(...a.materials.map(m => m.price)) - Math.min(...b.materials.map(m => m.price));
      case 'price_high':
        return Math.max(...b.materials.map(m => m.price)) - Math.max(...a.materials.map(m => m.price));
      default:
        return 0;
    }
  });

  const handleContactSupplier = (supplier) => {
    toast.success(`Contacting ${supplier.name}...`);
    // In a real app, this would open a contact form or redirect to supplier's page
  };

  const handleRequestQuote = (supplier) => {
    toast.success(`Quote request sent to ${supplier.name}!`);
    // In a real app, this would open a quote request form
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-700 text-white p-4 rounded-2xl shadow-lg">
            <Package className="w-8 h-8" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Material Partnership Portal
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connect with trusted suppliers of raw materials and tools for your artisan business. 
          Find quality materials at competitive prices with reliable delivery.
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search materials, suppliers, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="lg:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="lg:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="rating">Sort by Rating</option>
              <option value="name">Sort by Name</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 pt-6 border-t border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Price
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Price
                </label>
                <input
                  type="number"
                  placeholder="1000"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setPriceRange({ min: '', max: '' });
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Results */}
      <div className="mb-6">
        <p className="text-gray-600">
          Found {sortedSuppliers.length} supplier{sortedSuppliers.length !== 1 ? 's' : ''} 
          {searchTerm && ` for "${searchTerm}"`}
        </p>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {sortedSuppliers.map((supplier, index) => (
          <motion.div
            key={supplier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
          >
            {/* Supplier Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start space-x-4">
                <img
                  src={supplier.logo}
                  alt={supplier.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {supplier.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {supplier.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{supplier.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{supplier.rating} ({supplier.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Materials */}
            <div className="p-6">
              <h4 className="font-medium text-gray-900 mb-3">Available Materials</h4>
              <div className="space-y-2 mb-4">
                {supplier.materials.slice(0, 3).map((material, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-50">
                    <div>
                      <span className="font-medium text-gray-800">{material.name}</span>
                      <span className="text-sm text-gray-500 ml-2">({material.category})</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-primary-600">${material.price}</span>
                      <span className="text-sm text-gray-500 ml-1">/{material.unit}</span>
                    </div>
                  </div>
                ))}
                {supplier.materials.length > 3 && (
                  <p className="text-sm text-gray-500">
                    +{supplier.materials.length - 3} more materials
                  </p>
                )}
              </div>

              {/* Delivery Info */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                  <Truck className="w-4 h-4" />
                  <span>Delivery: ${supplier.delivery.cost} • {supplier.delivery.estimatedDays} days</span>
                </div>
                <p className="text-xs text-gray-500">
                  Available in: {supplier.delivery.areas.join(', ')}
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{supplier.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{supplier.contact.email}</span>
                </div>
                {supplier.contact.website && (
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4" />
                    <a 
                      href={`https://${supplier.contact.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      {supplier.contact.website}
                    </a>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => handleContactSupplier(supplier)}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Contact</span>
                </button>
                <button
                  onClick={() => handleRequestQuote(supplier)}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Get Quote</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {sortedSuppliers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Suppliers Found</h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your search criteria or filters to find more suppliers.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setPriceRange({ min: '', max: '' });
            }}
            className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Clear All Filters
          </button>
        </motion.div>
      )}

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-16 bg-gradient-to-r from-primary-500 to-primary-700 text-white p-8 rounded-2xl text-center"
      >
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">Become a Material Supplier</h2>
        <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
          Are you a supplier of raw materials, tools, or equipment for artisans? 
          Join our network and reach thousands of artisans across Ethiopia.
        </p>
        <button className="px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Apply to Become a Supplier
        </button>
      </motion.div>
    </div>
  );
};

export default MaterialPartnership;

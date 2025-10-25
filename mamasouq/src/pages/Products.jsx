import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, Star, Heart, ShoppingCart } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
// Import product images
import pro1 from '../assets/pro1.jpg';
import pro2 from '../assets/pro2.jpg';
import pro3 from '../assets/pro3.jpg';
import pro4 from '../assets/pro4.jpg';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'jewelry', label: 'Jewelry' },
    { value: 'home-decor', label: 'Home Decor' },
    { value: 'art', label: 'Art' },
    { value: 'food', label: 'Food' },
    { value: 'other', label: 'Other' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'priceLow', label: 'Price: Low to High' },
    { value: 'priceHigh', label: 'Price: High to Low' },
    { value: 'name', label: 'Name A-Z' }
  ];

  // Mock products data
  const mockProducts = [
      {
        _id: '1',
      name: 'Handwoven Ceramic Bowl',
      description: 'Beautiful handcrafted ceramic bowl with intricate patterns',
      price: 45.99,
      category: 'home-decor',
      images: [{ url: pro1 }],
      artisan: { name: 'Maria Rodriguez', profile: { avatar: '' } },
      rating: { average: 4.8, count: 24 },
      stock: 5,
      isActive: true
      },
      {
        _id: '2',
      name: 'Artisan Silver Ring',
      description: 'Elegant silver ring with unique hand-carved design',
      price: 89.99,
      category: 'jewelry',
      images: [{ url: pro2 }],
      artisan: { name: 'Ahmed Hassan', profile: { avatar: '' } },
      rating: { average: 4.9, count: 18 },
      stock: 3,
      isActive: true
      },
      {
        _id: '3',
      name: 'Hand-knitted Scarf',
      description: 'Warm and cozy scarf made with premium wool',
      price: 35.99,
      category: 'clothing',
      images: [{ url: pro3 }],
      artisan: { name: 'Elena Petrov', profile: { avatar: '' } },
      rating: { average: 4.7, count: 31 },
      stock: 8,
      isActive: true
      },
      {
        _id: '4',
      name: 'Wooden Art Sculpture',
      description: 'Intricate wooden sculpture carved from reclaimed wood',
      price: 125.99,
      category: 'art',
      images: [{ url: pro4 }],
      artisan: { name: 'James Wilson', profile: { avatar: '' } },
      rating: { average: 4.9, count: 12 },
      stock: 2,
      isActive: true
    }
  ];

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
      
  const sortedProducts = [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
      case 'priceLow':
          return a.price - b.price;
      case 'priceHigh':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Handmade Products</h1>
          <p className="text-lg text-gray-600">
            Discover unique creations from talented artisans around the world
          </p>
          </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
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

              {/* Category Filter */}
            <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {sortedProducts.length} products found
              </span>
            </div>
            
            <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
            >
              Clear Filters
            </button>
            </div>
        ) : (
          <motion.div
            layout
            className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}
          >
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                layout
              >
                <ProductCard 
                  product={product} 
                  viewMode={viewMode}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Products;
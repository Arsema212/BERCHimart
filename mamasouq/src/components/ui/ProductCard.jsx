import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, Eye, User } from 'lucide-react';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    // Add to cart logic here
    console.log('Added to cart:', product.name);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
      >
        <div className="flex gap-6">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <img
              src={product.images[0]?.url || 'https://via.placeholder.com/200x200'}
              alt={product.name}
              className="w-32 h-32 object-cover rounded-xl"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLike}
                  className={`p-2 rounded-lg transition-colors ${
                    isLiked ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 mb-3 line-clamp-2">{product.description}</p>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-700">
                  {product.rating.average}
                </span>
                <span className="text-sm text-gray-500">
                  ({product.rating.count})
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <User className="w-4 h-4" />
                <span>{product.artisan.name}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  {product.stock} in stock
                </span>
              </div>
              <button
                onClick={handleAddToCart}
                className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]?.url || 'https://via.placeholder.com/400x300'}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay Actions */}
        <div className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center gap-2`}>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              scale: isHovered ? 1 : 0.8 
            }}
            transition={{ duration: 0.2 }}
            onClick={handleLike}
            className={`p-3 rounded-full transition-colors ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>
          
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              scale: isHovered ? 1 : 0.8 
            }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="p-3 bg-white text-gray-600 rounded-full hover:bg-primary-500 hover:text-white transition-colors"
          >
            <Eye className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Stock Badge */}
        {product.stock < 5 && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Only {product.stock} left
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">
              {product.rating.average}
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500">{product.artisan.name}</span>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center gap-2 text-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
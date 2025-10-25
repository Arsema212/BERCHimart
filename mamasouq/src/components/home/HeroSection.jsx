import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Award } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Discover Unique
              <span className="block text-yellow-300">Handmade Treasures</span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed">
              Support talented artisans worldwide and find one-of-a-kind products 
              that tell a story.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">10K+</div>
                <div className="text-sm text-blue-100">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">5K+</div>
                <div className="text-sm text-blue-100">Artisans</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">50K+</div>
                <div className="text-sm text-blue-100">Happy Customers</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all duration-200 inline-flex items-center justify-center text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/register"
                className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200 inline-flex items-center justify-center text-lg"
              >
                Become an Artisan
              </Link>
            </div>
          </div>
          
          {/* Image/Visual */}
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 bg-yellow-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <Star className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-white font-semibold">Premium Quality</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 bg-green-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-white font-semibold">Artisan Support</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 bg-purple-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <Award className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-white font-semibold">Unique Items</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 bg-pink-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <Star className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-white font-semibold">5-Star Reviews</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

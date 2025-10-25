import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Award, Users, TrendingUp, Star, Quote } from 'lucide-react';

const ArtisanStories = () => {
  const stories = [
    {
      id: 1,
      name: 'Alemitu Tadesse',
      location: 'Addis Ababa, Ethiopia',
      craft: 'Traditional Pottery',
      story: 'Despite losing her sight at age 12, Alemitu has become one of the most skilled potters in her community. She creates beautiful ceramic pieces using traditional techniques passed down through generations.',
      achievement: 'Sold 500+ pieces in 2023',
      rating: 4.9,
      image: 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Alemitu',
      quote: 'My hands see what my eyes cannot. Every piece I create tells a story of resilience and beauty.',
      earnings: '$2,400',
      products: 45
    },
    {
      id: 2,
      name: 'Meron Gebre',
      location: 'Bahir Dar, Ethiopia',
      craft: 'Handwoven Textiles',
      story: 'Meron started her weaving business after a car accident left her with limited mobility. She now employs 8 other women with disabilities, creating stunning traditional textiles.',
      achievement: 'Featured in Vogue Africa',
      rating: 4.8,
      image: 'https://via.placeholder.com/300x200/059669/FFFFFF?text=Meron',
      quote: 'Disability is not inability. We create the most beautiful textiles in Ethiopia.',
      earnings: '$3,200',
      products: 67
    },
    {
      id: 3,
      name: 'Tewodros Assefa',
      location: 'Hawassa, Ethiopia',
      craft: 'Wood Carving',
      story: 'Born with cerebral palsy, Tewodros discovered his talent for wood carving at a young age. His intricate sculptures have been exhibited in galleries across Ethiopia.',
      achievement: 'Award-winning sculptor',
      rating: 5.0,
      image: 'https://via.placeholder.com/300x200/DC2626/FFFFFF?text=Tewodros',
      quote: 'Every piece of wood has a story waiting to be told. I just help it speak.',
      earnings: '$4,100',
      products: 23
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-4 rounded-2xl shadow-lg">
              <Heart className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Inspiring Artisan Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the incredible artisans who are breaking barriers and creating beautiful handmade products. 
            Their stories of resilience, creativity, and success inspire us all.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Artisan Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-2 text-white">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{story.rating}</span>
                    <span className="text-sm opacity-75">({story.products} products)</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {story.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">{story.location}</p>
                    <p className="text-sm font-medium text-primary-600">{story.craft}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{story.earnings}</div>
                    <div className="text-xs text-gray-500">Total Earnings</div>
                  </div>
                </div>

                {/* Quote */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <Quote className="w-5 h-5 text-primary-500 mb-2" />
                  <p className="text-sm text-gray-700 italic">"{story.quote}"</p>
                </div>

                {/* Story */}
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {story.story}
                </p>

                {/* Achievement */}
                <div className="flex items-center space-x-2 mb-4">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-800">{story.achievement}</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary-600">{story.products}</div>
                    <div className="text-xs text-gray-500">Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{story.rating}</div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-4xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 text-white p-3 rounded-full">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Own Success Story?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of artisans who are already earning a living through their craft. 
              Our platform provides the tools, support, and community you need to succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors">
                Become an Artisan
              </button>
              <button className="px-8 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors">
                Register Your Company
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ArtisanStories;

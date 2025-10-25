import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Users, 
  DollarSign, 
  Award, 
  TrendingUp, 
  Heart,
  Star,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Shield,
  Globe
} from 'lucide-react';

const MotivationSection = () => {
  const achievements = [
    {
      icon: Users,
      number: '2,500+',
      label: 'Active Artisans',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: DollarSign,
      number: '$180K+',
      label: 'Total Earnings',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Award,
      number: '15K+',
      label: 'Products Sold',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Heart,
      number: '98%',
      label: 'Satisfaction Rate',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Inclusive Platform',
      description: 'Designed specifically for artisans with disabilities, ensuring equal opportunities for all.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connect with customers worldwide and expand your market beyond local boundaries.',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Target,
      title: 'Fair Pricing',
      description: 'Set your own prices and receive fair compensation for your hard work and creativity.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Lightbulb,
      title: 'Skill Development',
      description: 'Access training resources and workshops to improve your craft and business skills.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Customer',
      location: 'New York, USA',
      content: 'The quality of handmade products on MamaSouk is incredible. Every purchase supports talented artisans and their communities.',
      rating: 5,
      avatar: 'https://via.placeholder.com/60x60/4F46E5/FFFFFF?text=SJ'
    },
    {
      name: 'Ahmed Hassan',
      role: 'Artisan',
      location: 'Cairo, Egypt',
      content: 'MamaSouk has transformed my life. I can now support my family through my pottery business, and the platform is so accessible.',
      rating: 5,
      avatar: 'https://via.placeholder.com/60x60/059669/FFFFFF?text=AH'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Company Partner',
      location: 'Mexico City, Mexico',
      content: 'Working with MamaSouk has been amazing. We can support local artisans while building a sustainable business model.',
      rating: 5,
      avatar: 'https://via.placeholder.com/60x60/DC2626/FFFFFF?text=MR'
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Together, we're building a more inclusive and sustainable economy
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 ${achievement.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <achievement.icon className={`w-8 h-8 ${achievement.color}`} />
                </div>
                <div className={`text-3xl font-bold ${achievement.color} mb-2`}>
                  {achievement.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose MamaSouk?
            </h2>
            <p className="text-xl text-gray-600">
              We're more than just a marketplace - we're a movement for inclusive commerce
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${feature.bgColor} p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow`}
              >
                <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from real people making a difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl p-12 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                <Heart className="w-8 h-8" />
              </div>
            </div>
            
            <h2 className="text-4xl font-bold mb-4">
              Join the Movement
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Whether you're an artisan, a company, or a customer, you can be part of creating 
              a more inclusive and sustainable future for handmade crafts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                Start Selling
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-colors flex items-center justify-center">
                Browse Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MotivationSection;

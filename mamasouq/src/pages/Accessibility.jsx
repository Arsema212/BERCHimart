import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Ear, 
  Hand, 
  Brain, 
  Volume2, 
  Mic, 
  ZoomIn, 
  Contrast, 
  Settings, 
  CheckCircle,
  ArrowRight,
  Heart,
  Users,
  Award,
  Zap
} from 'lucide-react';

const Accessibility = () => {
  const [activeFeature, setActiveFeature] = useState('voice');

  const features = [
    {
      id: 'voice',
      title: 'Voice Navigation',
      description: 'Navigate the entire platform using voice commands',
      icon: Mic,
      color: 'blue',
      benefits: [
        'Hands-free navigation for users with limited mobility',
        'Natural language processing for intuitive commands',
        'Voice feedback for all actions and confirmations',
        'Customizable voice settings and speed'
      ],
      commands: [
        'Say "Go to products" to browse items',
        'Say "Read page" to hear content aloud',
        'Say "Search for [item]" to find products',
        'Say "Help" to learn available commands'
      ]
    },
    {
      id: 'visual',
      title: 'Visual Accessibility',
      description: 'Enhanced visual support for better readability',
      icon: Eye,
      color: 'green',
      benefits: [
        'High contrast mode for better visibility',
        'Adjustable text size and font options',
        'Screen reader optimization',
        'Color-blind friendly design patterns'
      ],
      commands: [
        'Toggle high contrast mode',
        'Increase/decrease text size',
        'Customize color schemes',
        'Enable focus indicators'
      ]
    },
    {
      id: 'motor',
      title: 'Motor Support',
      description: 'Alternative input methods for limited mobility',
      icon: Hand,
      color: 'purple',
      benefits: [
        'Large, easy-to-click buttons and links',
        'Keyboard-only navigation support',
        'Gesture controls for touch devices',
        'Simplified interface options'
      ],
      commands: [
        'Use Tab to navigate between elements',
        'Press Enter to activate buttons',
        'Use arrow keys for menu navigation',
        'Customize click targets and spacing'
      ]
    },
    {
      id: 'audio',
      title: 'Audio Enhancement',
      description: 'Comprehensive audio support and feedback',
      icon: Ear,
      color: 'orange',
      benefits: [
        'Audio descriptions for all visual content',
        'Adjustable playback speeds',
        'Hearing aid compatibility',
        'Visual sound indicators'
      ],
      commands: [
        'Enable audio descriptions',
        'Adjust speech rate and volume',
        'Use visual sound alerts',
        'Customize audio feedback'
      ]
    }
  ];

  const stats = [
    { number: '98%', label: 'Accessibility Score', icon: Award, color: 'text-green-600' },
    { number: 'WCAG 2.1', label: 'Compliance Level', icon: CheckCircle, color: 'text-blue-600' },
    { number: '50+', label: 'Accessibility Features', icon: Settings, color: 'text-purple-600' },
    { number: '24/7', label: 'AI Support', icon: Brain, color: 'text-orange-600' }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Artisan with limited mobility',
      content: 'The voice controls let me manage my shop independently for the first time!',
      avatar: '👩‍🦽'
    },
    {
      name: 'James Wilson',
      role: 'Visually impaired customer',
      content: 'The audio descriptions and voice navigation make shopping enjoyable and accessible.',
      avatar: '👨‍🦯'
    },
    {
      name: 'Grandma Elena',
      role: 'Elderly artisan',
      content: 'So simple to use! I can focus on my crafts while the AI helps with selling.',
      avatar: '👵'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-500',
        light: 'bg-blue-50',
        border: 'border-blue-500',
        text: 'text-blue-600'
      },
      green: {
        bg: 'bg-green-500',
        light: 'bg-green-50',
        border: 'border-green-500',
        text: 'text-green-600'
      },
      purple: {
        bg: 'bg-purple-500',
        light: 'bg-purple-50',
        border: 'border-purple-500',
        text: 'text-purple-600'
      },
      orange: {
        bg: 'bg-orange-500',
        light: 'bg-orange-50',
        border: 'border-orange-500',
        text: 'text-orange-600'
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg mb-8 border border-white/20">
              <Heart className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-semibold text-gray-700">ACCESSIBILITY FIRST</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
              Built for <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Everyone</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              MamaSouk is designed with accessibility at its core, ensuring that every artisan and customer can participate fully in our marketplace, regardless of ability.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
          <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 mb-4 ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                      </div>
                    <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                );
              })}
                    </div>
                  </motion.div>
              </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Comprehensive Accessibility Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform includes a wide range of accessibility features designed to meet the needs of users with different abilities and preferences.
            </p>
            </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Feature Navigation */}
            <div className="space-y-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                const colors = getColorClasses(feature.color);
                const isActive = activeFeature === feature.id;
                
                return (
                  <motion.button
                    key={feature.id}
                    onClick={() => setActiveFeature(feature.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-6 rounded-2xl transition-all duration-300 text-left ${
                      isActive 
                        ? `${colors.light} ${colors.border} border-2 shadow-lg` 
                        : 'bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isActive ? colors.bg : 'bg-gray-100'
                      }`}>
                        <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                </div>
                      <div>
                        <h3 className={`text-lg font-semibold ${isActive ? colors.text : 'text-gray-800'}`}>
                      {feature.title}
                    </h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Feature Details */}
          <motion.div
              key={activeFeature}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20"
            >
              {(() => {
                const feature = features.find(f => f.id === activeFeature);
                const colors = getColorClasses(feature.color);
                const Icon = feature.icon;
                
                return (
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${colors.bg}`}>
                        <Icon className="w-8 h-8 text-white" />
                  </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                </div>
                </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Benefits</h4>
                        <ul className="space-y-2">
                          {feature.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">How to Use</h4>
                        <ul className="space-y-2">
                          {feature.commands.map((command, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <ArrowRight className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{command}</span>
                    </li>
                          ))}
                  </ul>
                </div>
              </div>
            </div>
                );
              })()}
          </motion.div>
        </div>
      </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Real Stories from Our Community
            </h2>
            <p className="text-xl text-gray-600">
              See how accessibility features are making a difference in people's lives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-2xl p-8 border border-primary-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{testimonial.avatar}</div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-800">{testimonial.name}</div>
                  <div className="text-primary-600 text-sm">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
              </div>
            </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-purple-600">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Experience Accessible Commerce Today
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already benefiting from our comprehensive accessibility features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-3">
                <Users className="w-5 h-5" />
                Start Shopping
                  </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-3">
                <Heart className="w-5 h-5" />
                Become an Artisan
                  </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Accessibility;
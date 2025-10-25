// client/src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArtisanStories from '../components/home/ArtisanStories';
import MotivationSection from '../components/home/MotivationSection';
import { 
  Heart, 
  Users, 
  Accessibility, 
  Star, 
  Mic, 
  ArrowRight, 
  Sparkles, 
  Palette,
  Globe,
  Shield,
  Zap,
  Brain,
  Eye,
  Ear,
  Hand,
  Clock,
  TrendingUp,
  Award,
  Store,
  Home as HomeIcon,
  Laptop,
  Smartphone,
  Package,
  DollarSign,
  Smile,
  GraduationCap,
  Rocket
} from 'lucide-react';

const Home = () => {
  const { t } = useTranslation();
  const [currentScene, setCurrentScene] = useState(0);
  const [showStory, setShowStory] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStory(false);
    }, 8000); // Show story for 8 seconds then transition to main content

    return () => clearTimeout(timer);
  }, []);

  const storyScenes = [
    {
      title: "A Dream at Home",
      description: "Maria, a talented artisan with mobility challenges, creates beautiful crafts but struggles to reach customers.",
      icon: "🏠",
      bg: "from-green-100 to-green-200",
      image: "👩‍🎨"
    },
    {
      title: "Discovery",
      description: "She discovers BERCHimart - a platform designed specifically for artisans like her.",
      icon: "💡",
      bg: "from-green-100 to-green-200",
      image: "📱"
    },
    {
      title: "Transformation Begins",
      description: "With voice-controlled setup and accessible tools, Maria starts her online shop effortlessly.",
      icon: "🚀",
      bg: "from-green-100 to-teal-100",
      image: "👩‍💻"
    },
    {
      title: "Success Story",
      description: "Her crafts reach global customers, bringing financial independence and recognition.",
      icon: "⭐",
      bg: "from-green-100 to-green-200",
      image: "🏆"
    }
  ];

  useEffect(() => {
    if (showStory) {
      const sceneTimer = setInterval(() => {
        setCurrentScene((prev) => (prev + 1) % storyScenes.length);
      }, 2000);
      return () => clearInterval(sceneTimer);
    }
  }, [showStory]);

  const features = [
    {
      icon: <Brain className="w-10 h-10" />,
      title: "AI Voice Assistant",
      description: "Natural language processing for hands-free navigation and product discovery",
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100"
    },
    {
      icon: <Eye className="w-10 h-10" />,
      title: "Visual Accessibility",
      description: "Smart contrast adjustment, text scaling, and screen reader optimization",
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100"
    },
    {
      icon: <Hand className="w-10 h-10" />,
      title: "Motor Support",
      description: "Voice commands, gesture controls, and simplified navigation for limited mobility",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      icon: <Ear className="w-10 h-10" />,
      title: "Audio Enhancement",
      description: "Clear audio descriptions, adjustable playback speeds, and hearing aid compatibility",
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100"
    }
  ];

  const stats = [
    { number: "500+", label: "Artisans Empowered", icon: <Users className="w-6 h-6" />, color: "text-green-600" },
    { number: "2K+", label: "Unique Products", icon: <Store className="w-6 h-6" />, color: "text-green-600" },
    { number: "98%", label: "Accessibility Score", icon: <Award className="w-6 h-6" />, color: "text-green-600" },
    { number: "24/7", label: "AI Support", icon: <Zap className="w-6 h-6" />, color: "text-green-600" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Artisan with limited mobility",
      content: "BERCHimart's voice controls let me manage my shop independently for the first time!",
      avatar: "👩‍🦽"
    },
    {
      name: "James Wilson",
      role: "Visually impaired customer",
      content: "The audio descriptions and voice navigation make shopping enjoyable and accessible.",
      avatar: "👨‍🦯"
    },
    {
      name: "Grandma Elena",
      role: "Elderly artisan",
      content: "So simple to use! I can focus on my crafts while the AI helps with selling.",
      avatar: "👵"
    }
  ];

  const successStories = [
    {
      name: "Maria Rodriguez",
      from: "Home-based crafter",
      to: "Successful Entrepreneur",
      income: "5x increase",
      products: "Handmade ceramics",
      image: "🏺"
    },
    {
      name: "Aisha Khan",
      from: "Stay-at-home mom",
      to: "Featured Artisan",
      income: "Financial independence",
      products: "Textile arts",
      image: "🧵"
    },
    {
      name: "Grandma Li",
      from: "Retired teacher",
      to: "Community Mentor",
      income: "Supplemental income",
      products: "Traditional crafts",
      image: "👵"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-green-100">
      {/* Animated Story Section */}
      <AnimatePresence>
        {showStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-green-600 via-green-700 to-green-800"
          >
            <div className="text-center text-white px-8 max-w-4xl mx-auto">
              {/* Animated Character */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-8xl mb-8"
              >
                {storyScenes[currentScene].image}
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScene}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <motion.div
                    className={`inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/30`}
                  >
                    <Sparkles className="w-5 h-5" />
                    <span className="text-sm font-semibold">{storyScenes[currentScene].icon} {storyScenes[currentScene].title}</span>
                  </motion.div>
                  
                  <motion.h2 className="text-4xl md:text-6xl font-bold mb-6">
                    Transforming Lives Through Technology
                  </motion.h2>
                  
                  <motion.p className="text-xl md:text-2xl opacity-90 leading-relaxed">
                    {storyScenes[currentScene].description}
                  </motion.p>
                </motion.div>
              </AnimatePresence>

              {/* Progress Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {storyScenes.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === currentScene ? 'bg-white' : 'bg-white/30'
                    }`}
                    animate={{
                      scale: index === currentScene ? 1.2 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>

              {/* Skip Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={() => setShowStory(false)}
                className="mt-8 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                Skip Introduction
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {!showStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
              <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-75"></div>
              <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-150"></div>
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
              <div className="container mx-auto text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="mb-8"
                >
                  <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg mb-8 border border-white/20">
                    <Sparkles className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-gray-700">Transforming Lives Through Accessible Commerce</span>
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-green-600 via-green-700 to-green-800 bg-clip-text text-transparent"
                >
                  {t('app.title')}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
                >
                  {t('app.tagline')}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
                >
                  <Link 
                    to="/products" 
                    className="group relative bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-10 py-5 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-green-500/25 flex items-center gap-3 focus-accessible overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <Palette className="w-6 h-6" />
                    {t('navigation.products')}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <Link 
                    to="/sell" 
                    className="group bg-white/90 backdrop-blur-sm border-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 px-10 py-5 rounded-2xl font-semibold transition-all duration-300 shadow-xl hover:shadow-green-500/10 flex items-center gap-3 focus-accessible"
                  >
                    <Heart className="w-6 h-6" />
                    {t('navigation.sell')}
                    <Sparkles className="w-5 h-5" />
                  </Link>
                </motion.div>

                {/* Success Stories Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 max-w-4xl mx-auto"
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Real Stories of Transformation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {successStories.map((story, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center border border-green-100"
                      >
                        <div className="text-4xl mb-3">{story.image}</div>
                        <h4 className="font-bold text-gray-800 mb-2">{story.name}</h4>
                        <div className="text-sm text-green-600 mb-2">
                          <div>From: {story.from}</div>
                          <div>To: {story.to}</div>
                        </div>
                        <div className="text-xs text-gray-600">
                          {story.income} • {story.products}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Scroll Indicator */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              >
                <div className="w-6 h-10 border-2 border-green-300 rounded-full flex justify-center">
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1 h-3 bg-green-500 rounded-full mt-2"
                  />
                </div>
              </motion.div>
            </section>

            {/* Rest of your existing sections (Features, Stats, Testimonials, CTA) */}
            {/* Features Section */}
            <section className="py-20 px-4 relative">
              <div className="container mx-auto">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={containerVariants}
                  className="text-center mb-20"
                >
                  <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-green-200 rounded-full px-6 py-3 mb-6">
                    <Sparkles className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-green-700">ACCESSIBILITY INNOVATION</span>
                  </motion.div>
                  
                  <motion.h2 variants={itemVariants} className="text-5xl font-bold text-gray-800 mb-6">
                    Designed for <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">Every Ability</span>
                  </motion.h2>
                  
                  <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Our platform breaks down barriers with intelligent features that adapt to your unique needs and preferences.
                  </motion.p>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={containerVariants}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.05,
                        y: -10
                      }}
                      className="group relative"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-3xl transform group-hover:scale-105 transition-transform duration-300`} />
                      <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white/20 shadow-xl group-hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed flex-grow">
                          {feature.description}
                        </p>
                        <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent rounded-full" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white">
              <div className="container mx-auto">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={containerVariants}
                  className="grid grid-cols-2 lg:grid-cols-4 gap-8"
                >
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.1 }}
                      className="text-center group"
                    >
                      <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl group-hover:bg-white/20 transition-all duration-300">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-4 ${stat.color}`}>
                          {stat.icon}
                        </div>
                        <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                          {stat.number}
                        </div>
                        <div className="text-green-100 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* Artisan Stories Section */}
            <ArtisanStories />

            {/* Motivation Section */}
            <MotivationSection />

            {/* Testimonials Section */}
            <section className="py-20 px-4 bg-white">
              <div className="container mx-auto">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={containerVariants}
                  className="text-center mb-16"
                >
                  <motion.h2 variants={itemVariants} className="text-5xl font-bold text-gray-800 mb-6">
                    Voices from Our <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">Community</span>
                  </motion.h2>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={containerVariants}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ y: -10 }}
                      className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 border border-green-100 shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                        {testimonial.avatar}
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                        "{testimonial.content}"
                      </p>
                      <div>
                        <div className="font-semibold text-gray-800">{testimonial.name}</div>
                        <div className="text-green-600 text-sm">{testimonial.role}</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-green-900 to-green-800 text-white">
              <div className="container mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="max-w-4xl mx-auto"
                >
                  <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-5xl font-bold mb-6"
                  >
                    Ready to Create <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">Without Limits</span>?
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
                  >
                    Join thousands of artisans and customers who are building a more inclusive marketplace, one handmade product at a time.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                  >
                    <Link
                      to="/products"
                      className="group bg-white text-gray-900 hover:bg-gray-100 px-12 py-5 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-white/25 flex items-center gap-3 focus-accessible"
                    >
                      <Store className="w-6 h-6" />
                      Discover Handmade Treasures
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    <Link
                      to="/sell"
                      className="group border-2 border-white/30 text-white hover:bg-white/10 px-12 py-5 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-sm flex items-center gap-3 focus-accessible"
                    >
                      <Heart className="w-6 h-6" />
                      Begin Your Artisan Journey
                      <Sparkles className="w-5 h-5" />
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
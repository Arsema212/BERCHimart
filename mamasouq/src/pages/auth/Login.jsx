// client/src/pages/auth/Login.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Store, Shield, Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { ROLE_REDIRECTS } from '../../config/admin';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'user'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        toast.success(`Welcome back, ${result.user.name}!`);
        
        // Redirect based on user role using config
        const redirectPath = ROLE_REDIRECTS[result.user.role] || '/profile';
        navigate(redirectPath);
      } else {
        toast.error(result.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const userTypes = [
    {
      value: 'user',
      label: 'Customer',
      description: 'Shop for unique handmade products',
      icon: User,
      color: 'blue'
    },
    {
      value: 'artisan',
      label: 'Artisan Seller',
      description: 'Sell your handmade creations',
      icon: Store,
      color: 'emerald'
    },
    {
      value: 'moderator',
      label: 'Moderator',
      description: 'Help maintain platform quality',
      icon: Shield,
      color: 'violet'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-green-500',
        light: 'bg-green-50',
        border: 'border-green-500',
        text: 'text-green-600'
      },
      emerald: {
        bg: 'bg-emerald-500',
        light: 'bg-emerald-50',
        border: 'border-emerald-500',
        text: 'text-emerald-600'
      },
      violet: {
        bg: 'bg-violet-500',
        light: 'bg-violet-50',
        border: 'border-violet-500',
        text: 'text-violet-600'
      }
    };
    return colors[color] || colors.blue;
  };

  // Demo credentials for easy testing

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding & Demo Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block"
        >
          <div className="space-y-8">
            <div className="text-center">
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-2xl shadow-lg">
                  <Heart className="w-12 h-12" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mt-6">MamaSouk</h1>
              <p className="text-xl text-gray-600 max-w-md mx-auto mt-4">
                Where handmade meets heart. Discover unique creations from talented artisans worldwide.
              </p>
            </div>

          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">{t('auth.welcomeBack')}</h2>
              <p className="text-gray-600 mt-2">{t('auth.signInToAccount')}</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('common.email')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('common.password')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl font-medium hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-green-500/25"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {t('common.submit')}...
                  </div>
                ) : (
                  t('common.login')
                )}
              </button>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link
                    to="/auth/signup"
                    className="font-medium text-green-600 hover:text-green-500 transition-colors"
                  >
                    Create one here
                  </Link>
                </p>
              </div>
            </form>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
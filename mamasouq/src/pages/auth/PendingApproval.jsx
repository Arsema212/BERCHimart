import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Mail, CheckCircle, Heart, ArrowRight } from 'lucide-react';

const PendingApproval = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Clock className="w-10 h-10 text-yellow-600" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Application Under Review
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              Thank you for applying to become an artisan on MamaSouk! Your application is currently being reviewed by our team.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-blue-800 mb-3">What happens next?</h2>
              <div className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Application Review</p>
                    <p className="text-sm text-blue-700">Our team will review your application and portfolio</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Verification Process</p>
                    <p className="text-sm text-blue-700">We may contact you for additional information</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Approval Notification</p>
                    <p className="text-sm text-blue-700">You'll receive an email with the decision within 24-48 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800 mb-1">Quality Check</h3>
                <p className="text-sm text-gray-600">Ensuring high standards</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <Mail className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800 mb-1">Email Updates</h3>
                <p className="text-sm text-gray-600">Stay informed on progress</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800 mb-1">Support</h3>
                <p className="text-sm text-gray-600">We're here to help</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                In the meantime, you can explore our platform and learn about our accessibility features.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" />
                  Explore Platform
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="border border-primary-500 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PendingApproval;
// client/src/components/layout/Footer.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, ChevronDown, ChevronUp } from 'lucide-react';

const Footer = () => {
  const [openSections, setOpenSections] = useState({
    quickLinks: false,
    support: false,
    contact: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand - Always visible */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="bg-primary-500 text-white p-2 rounded-xl">
                <Heart className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold">MamaSouk</span>
            </Link>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Empowering elders and people with disabilities through accessible e-commerce and AI technology.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links - Hidden by default on mobile */}
          <div>
            <button 
              className="flex items-center justify-between w-full md:justify-start md:cursor-default mb-4 hover:bg-gray-700 md:hover:bg-transparent p-2 rounded-lg transition-all duration-200"
              onClick={() => toggleSection('quickLinks')}
            >
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <span className="md:hidden transform transition-transform duration-300">
                {openSections.quickLinks ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </span>
            </button>
            <div className={`
              ${openSections.quickLinks ? 'block' : 'hidden'} 
              md:block
            `}>
              <ul className="space-y-2">
                <li>
                  <Link to="/products" className="text-gray-300 hover:text-white transition-colors block py-2 px-2 rounded-lg hover:bg-gray-700">
                    Browse Products
                  </Link>
                </li>
                <li>
                  <Link to="/sell" className="text-gray-300 hover:text-white transition-colors block py-2 px-2 rounded-lg hover:bg-gray-700">
                    Start Selling
                  </Link>
                </li>
                <li>
                  <Link to="/accessibility" className="text-gray-300 hover:text-white transition-colors block py-2 px-2 rounded-lg hover:bg-gray-700">
                    Accessibility Features
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Support - Hidden by default on mobile */}
          <div>
            <button 
              className="flex items-center justify-between w-full md:justify-start md:cursor-default mb-4 hover:bg-gray-700 md:hover:bg-transparent p-2 rounded-lg transition-all duration-200"
              onClick={() => toggleSection('support')}
            >
              <h3 className="text-lg font-semibold">Support</h3>
              <span className="md:hidden transform transition-transform duration-300">
                {openSections.support ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </span>
            </button>
            <div className={`
              ${openSections.support ? 'block' : 'hidden'} 
              md:block
            `}>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors block py-2 px-2 rounded-lg hover:bg-gray-700">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors block py-2 px-2 rounded-lg hover:bg-gray-700">
                    Accessibility Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors block py-2 px-2 rounded-lg hover:bg-gray-700">
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info - Hidden by default on mobile */}
          <div>
            <button 
              className="flex items-center justify-between w-full md:justify-start md:cursor-default mb-4 hover:bg-gray-700 md:hover:bg-transparent p-2 rounded-lg transition-all duration-200"
              onClick={() => toggleSection('contact')}
            >
              <h3 className="text-lg font-semibold">Contact Info</h3>
              <span className="md:hidden transform transition-transform duration-300">
                {openSections.contact ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </span>
            </button>
            <div className={`
              ${openSections.contact ? 'block' : 'hidden'} 
              md:block
            `}>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>support@mamasouk.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-HELP</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <MapPin className="w-4 h-4" />
                  <span>Accessibility First Street</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 MamaSouk. All rights reserved. Built with ❤️ for accessibility.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
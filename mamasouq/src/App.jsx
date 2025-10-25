import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

// Auth Provider
import { AuthProvider } from './hooks/useAuth';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AccessibilityBar from './components/ui/AccessibilityBar';
import VoiceAssistant from './components/ui/VoiceAssistant';
import AIAssistant from './components/AIAssistant';
import VoiceReader from './components/VoiceReader';
import LanguageToggle from './components/LanguageToggle';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import Sell from './pages/Sell';
import Profile from './pages/Profile';
import Accessibility from './pages/Accessibility';
import CompanyRegistration from './pages/CompanyRegistration';
import MaterialPartnership from './pages/MaterialPartnership';

// Auth Pages
// Auth Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// Admin & Moderator Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import ModeratorDashboard from './pages/Moderator/ModeratorDashboard';
import SellerDashboard from './pages/Seller/SellerDashboard';
import UserManagement from './pages/Admin/UserManagement';
import ProductApproval from './pages/Admin/ProductApproval';
import ArtisanApplications from './pages/Admin/ArtisanApplications';

// Protected Route Component
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
          <AccessibilityBar />
          <VoiceAssistant />
          <VoiceReader />
          <AIAssistant />
          <Header />
          
          <main className="min-h-screen">
            <AnimatePresence mode="wait">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/accessibility" element={<Accessibility />} />
                <Route path="/company-registration" element={<CompanyRegistration />} />
                <Route path="/materials" element={<MaterialPartnership />} />
                
                {/* Auth Routes */}
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<Signup />} />
                
                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/users" element={
                  <ProtectedRoute requiredRole="admin">
                    <UserManagement />
                  </ProtectedRoute>
                } />
                <Route path="/admin/applications" element={
                  <ProtectedRoute requiredRole="admin">
                    <ArtisanApplications />
                  </ProtectedRoute>
                } />
                
                {/* Moderator Routes */}
                <Route path="/moderator/dashboard" element={
                  <ProtectedRoute requiredRole={['admin', 'moderator']}>
                    <ModeratorDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/moderator" element={
                  <ProtectedRoute requiredRole={['admin', 'moderator']}>
                    <ModeratorDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/moderator/products" element={
                  <ProtectedRoute requiredRole={['admin', 'moderator']}>
                    <ProductApproval />
                  </ProtectedRoute>
                } />
                
                {/* Seller Routes */}
                <Route path="/seller/dashboard" element={
                  <ProtectedRoute requiredRole={['admin', 'moderator', 'artisan']}>
                    <SellerDashboard />
                  </ProtectedRoute>
                } />
              </Routes>
            </AnimatePresence>
          </main>
          
          <Footer />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
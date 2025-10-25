import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Mail, 
  Phone, 
  MapPin,
  Globe,
  Users,
  Target,
  Heart
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const CompanyRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    description: '',
    email: '',
    phone: '',
    website: '',
    
    // Address
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    },
    
    // Business Details
    businessType: '',
    focusArea: '',
    
    // Contact Person
    contactPerson: {
      name: '',
      email: '',
      phone: '',
      position: ''
    },
    
    // Social Media
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: ''
    },
    
    // Documents
    documents: {
      registrationCertificate: null,
      taxCertificate: null,
      bankStatement: null,
      otherDocuments: []
    }
  });

  const businessTypes = [
    { value: 'NGO', label: 'Non-Governmental Organization', icon: Heart },
    { value: 'Cooperative', label: 'Cooperative', icon: Users },
    { value: 'Private Company', label: 'Private Company', icon: Building2 },
    { value: 'Government Organization', label: 'Government Organization', icon: Building2 },
    { value: 'Other', label: 'Other', icon: Building2 }
  ];

  const focusAreas = [
    { value: 'Women Empowerment', label: 'Women Empowerment', icon: Heart },
    { value: 'Disability Support', label: 'Disability Support', icon: Heart },
    { value: 'Artisan Development', label: 'Artisan Development', icon: Target },
    { value: 'Rural Development', label: 'Rural Development', icon: MapPin },
    { value: 'Other', label: 'Other', icon: Target }
  ];

  const steps = [
    { number: 1, title: 'Basic Information', description: 'Company details and contact information' },
    { number: 2, title: 'Business Details', description: 'Business type and focus area' },
    { number: 3, title: 'Documents', description: 'Verification documents and certificates' },
    { number: 4, title: 'Review & Submit', description: 'Review your application and submit' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [field]: file
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Company registration submitted successfully!');
      navigate('/auth/pending', { 
        state: { 
          userEmail: formData.email, 
          userRole: 'company',
          applicationType: 'company'
        } 
      });
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your company name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Company Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                placeholder="Describe your company's mission and activities..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                    placeholder="company@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                    placeholder="+123 456 7890"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                Website (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                  placeholder="https://www.example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="address.street" className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  id="address.street"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                  placeholder="123 Main Street"
                />
              </div>

              <div>
                <label htmlFor="address.city" className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  id="address.city"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                  placeholder="City"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Business Type *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {businessTypes.map((type) => (
                  <motion.label
                    key={type.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      formData.businessType === type.value
                        ? 'border-primary-500 bg-primary-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="businessType"
                      value={type.value}
                      checked={formData.businessType === type.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-3">
                      <type.icon className="w-6 h-6 text-primary-500" />
                      <div>
                        <div className="font-medium text-gray-800">{type.label}</div>
                      </div>
                    </div>
                    {formData.businessType === type.value && (
                      <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-primary-500" />
                    )}
                  </motion.label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Focus Area *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {focusAreas.map((area) => (
                  <motion.label
                    key={area.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      formData.focusArea === area.value
                        ? 'border-primary-500 bg-primary-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="focusArea"
                      value={area.value}
                      checked={formData.focusArea === area.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-3">
                      <area.icon className="w-6 h-6 text-primary-500" />
                      <div>
                        <div className="font-medium text-gray-800">{area.label}</div>
                      </div>
                    </div>
                    {formData.focusArea === area.value && (
                      <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-primary-500" />
                    )}
                  </motion.label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contactPerson.name" className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Person Name *
                </label>
                <input
                  type="text"
                  id="contactPerson.name"
                  name="contactPerson.name"
                  value={formData.contactPerson.name}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Full Name"
                />
              </div>

              <div>
                <label htmlFor="contactPerson.position" className="block text-sm font-medium text-gray-700 mb-2">
                  Position *
                </label>
                <input
                  type="text"
                  id="contactPerson.position"
                  name="contactPerson.position"
                  value={formData.contactPerson.position}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g., Program Manager"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                <h3 className="font-medium text-blue-800">Document Requirements</h3>
              </div>
              <p className="text-sm text-blue-700 mt-2">
                Please upload the following documents to verify your organization. All documents should be clear and readable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="registrationCertificate" className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Certificate *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary-500 transition-colors">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <input
                    type="file"
                    id="registrationCertificate"
                    onChange={(e) => handleFileChange(e, 'registrationCertificate')}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                  />
                  <label htmlFor="registrationCertificate" className="cursor-pointer">
                    <span className="text-sm text-gray-600">Click to upload or drag and drop</span>
                    <p className="text-xs text-gray-500 mt-1">PDF, PNG, JPG up to 10MB</p>
                  </label>
                </div>
                {formData.documents.registrationCertificate && (
                  <p className="text-sm text-green-600 mt-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {formData.documents.registrationCertificate.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="taxCertificate" className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Certificate *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary-500 transition-colors">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <input
                    type="file"
                    id="taxCertificate"
                    onChange={(e) => handleFileChange(e, 'taxCertificate')}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                  />
                  <label htmlFor="taxCertificate" className="cursor-pointer">
                    <span className="text-sm text-gray-600">Click to upload or drag and drop</span>
                    <p className="text-xs text-gray-500 mt-1">PDF, PNG, JPG up to 10MB</p>
                  </label>
                </div>
                {formData.documents.taxCertificate && (
                  <p className="text-sm text-green-600 mt-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {formData.documents.taxCertificate.name}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="bankStatement" className="block text-sm font-medium text-gray-700 mb-2">
                Bank Statement (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary-500 transition-colors">
                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <input
                  type="file"
                  id="bankStatement"
                  onChange={(e) => handleFileChange(e, 'bankStatement')}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                />
                <label htmlFor="bankStatement" className="cursor-pointer">
                  <span className="text-sm text-gray-600">Click to upload or drag and drop</span>
                  <p className="text-xs text-gray-500 mt-1">PDF, PNG, JPG up to 10MB</p>
                </label>
              </div>
              {formData.documents.bankStatement && (
                <p className="text-sm text-green-600 mt-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {formData.documents.bankStatement.name}
                </p>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-green-50 p-6 rounded-xl">
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800">Application Summary</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Company Information</h4>
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  <p><strong>Business Type:</strong> {businessTypes.find(t => t.value === formData.businessType)?.label}</p>
                  <p><strong>Focus Area:</strong> {focusAreas.find(f => f.value === formData.focusArea)?.label}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Contact Person</h4>
                  <p><strong>Name:</strong> {formData.contactPerson.name}</p>
                  <p><strong>Position:</strong> {formData.contactPerson.position}</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <h4 className="font-medium text-yellow-800">What happens next?</h4>
              </div>
              <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                <li>• Our team will review your application within 2-3 business days</li>
                <li>• You'll receive an email notification about the status</li>
                <li>• If approved, a moderator account will be created for your company</li>
                <li>• You can then start adding artisans and managing products</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-primary-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-700 text-white p-8">
            <div className="flex items-center space-x-3 mb-4">
              <Building2 className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Company Registration</h1>
            </div>
            <p className="text-primary-100">
              Join MamaSouk as a partner organization and help empower artisans in your community.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.number
                      ? 'bg-primary-500 border-primary-500 text-white'
                      : 'border-gray-300 text-gray-400'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="font-semibold">{step.number}</span>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-primary-600' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      currentStep > step.number ? 'bg-primary-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-medium"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </div>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CompanyRegistration;

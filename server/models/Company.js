import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Company description is required'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  website: {
    type: String,
    match: [/^https?:\/\/.+/, 'Please enter a valid website URL']
  },
  businessType: {
    type: String,
    enum: ['NGO', 'Cooperative', 'Private Company', 'Government Organization', 'Other'],
    required: true
  },
  focusArea: {
    type: String,
    enum: ['Women Empowerment', 'Disability Support', 'Artisan Development', 'Rural Development', 'Other'],
    required: true
  },
  verificationDocuments: {
    registrationCertificate: String,
    taxCertificate: String,
    bankStatement: String,
    otherDocuments: [String]
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'suspended'],
    default: 'pending'
  },
  moderator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  stats: {
    totalArtisans: { type: Number, default: 0 },
    totalProducts: { type: Number, default: 0 },
    totalSales: { type: Number, default: 0 },
    totalOrders: { type: Number, default: 0 }
  },
  settings: {
    autoApproveProducts: { type: Boolean, default: false },
    allowDirectSelling: { type: Boolean, default: true },
    commissionRate: { type: Number, default: 10 }, // Percentage
    paymentTerms: { type: String, default: 'monthly' }
  },
  socialMedia: {
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String
  },
  logo: {
    url: String,
    public_id: String
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: Date,
  rejectionReason: String
}, {
  timestamps: true
});

// Index for search functionality
companySchema.index({ 
  name: 'text', 
  description: 'text',
  focusArea: 'text'
});

// Virtual for full address
companySchema.virtual('fullAddress').get(function() {
  const parts = [this.address.street, this.address.city, this.address.state, this.address.country];
  return parts.filter(part => part).join(', ');
});

// Method to get company statistics
companySchema.methods.getStats = async function() {
  const Product = mongoose.model('Product');
  const User = mongoose.model('User');
  
  const totalArtisans = await User.countDocuments({ 
    company: this._id, 
    role: 'seller' 
  });
  
  const totalProducts = await Product.countDocuments({ 
    company: this._id,
    isActive: true 
  });
  
  this.stats.totalArtisans = totalArtisans;
  this.stats.totalProducts = totalProducts;
  
  await this.save();
  return this.stats;
};

export default mongoose.model('Company', companySchema);

import mongoose from 'mongoose';

const materialSupplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Supplier name is required'],
    trim: true,
    maxlength: [100, 'Supplier name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
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
  materials: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    category: {
      type: String,
      enum: ['fabric', 'yarn', 'beads', 'wood', 'metal', 'clay', 'paint', 'tools', 'other'],
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    unit: {
      type: String,
      enum: ['piece', 'meter', 'kilogram', 'liter', 'set', 'dozen'],
      required: true
    },
    stock: {
      type: Number,
      default: 0,
      min: 0
    },
    images: [{
      url: String,
      alt: String,
      public_id: String
    }],
    isAvailable: {
      type: Boolean,
      default: true
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'suspended'],
    default: 'pending'
  },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  delivery: {
    available: { type: Boolean, default: true },
    cost: { type: Number, default: 0 },
    estimatedDays: { type: Number, default: 7 },
    areas: [String]
  },
  payment: {
    methods: [{
      type: String,
      enum: ['cash', 'bank_transfer', 'mobile_money', 'credit_card']
    }],
    terms: String
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
materialSupplierSchema.index({ 
  name: 'text', 
  description: 'text',
  'materials.name': 'text',
  'materials.description': 'text'
});

// Virtual for full address
materialSupplierSchema.virtual('fullAddress').get(function() {
  const parts = [this.address.street, this.address.city, this.address.state, this.address.country];
  return parts.filter(part => part).join(', ');
});

export default mongoose.model('MaterialSupplier', materialSupplierSchema);

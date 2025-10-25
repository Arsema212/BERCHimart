Uncaught SyntaxError: The requested module '/node_modules/.vite/deps/lucide-react.js?v=70263a11' does not provide an export named 'HandHeart' (at Home.jsx:13:3)import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/berchimart', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;

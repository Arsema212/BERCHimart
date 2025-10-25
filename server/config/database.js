import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

dotenv.config();

const connectDB = async () => {
  try {
    console.log('🔗 Connecting to MongoDB Atlas...');
    
    // Fix DNS resolution - CRITICAL for ETIMEOUT issues
    dns.setDefaultResultOrder('ipv4first');
    
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority',
      // Network-specific options
      family: 4, // Force IPv4
      keepAlive: true,
      keepAliveInitialDelay: 300000,
    };

    console.log('Testing connection to:', process.env.MONGODB_URI.replace(/mongodb\+srv:\/\/([^:]+):([^@]+)@/, 'mongodb+srv://USER:PASSWORD@'));
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    
    console.log('✅ MongoDB Atlas Connected Successfully!');
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🏠 Host: ${conn.connection.host}`);
    
    return conn;
  } catch (error) {
    console.error('❌ MongoDB Atlas Connection Failed:');
    console.error('Error:', error.message);
    console.error('Error Code:', error.code);
    
    await diagnoseNetworkIssues();
    process.exit(1);
  }
};

async function diagnoseNetworkIssues() {
  console.log('\n🔧 Network Diagnosis:');
  
  // Test basic internet connectivity
  try {
    const { Resolver } = await import('dns').promises;
    const resolver = new Resolver();
    
    // Test with different DNS servers
    const dnsServers = [
      ['8.8.8.8', '8.8.4.4'], // Google DNS
      ['1.1.1.1', '1.0.0.1'], // Cloudflare DNS
    ];
    
    for (const [primary, secondary] of dnsServers) {
      try {
        resolver.setServers([primary, secondary]);
        const addresses = await resolver.resolve4('cluster0.aeg5eko.mongodb.net');
        console.log(`✅ DNS ${primary}: Resolved to ${addresses.join(', ')}`);
      } catch (dnsError) {
        console.log(`❌ DNS ${primary}: Failed - ${dnsError.message}`);
      }
    }
  } catch (error) {
    console.log('❌ DNS test failed:', error.message);
  }
}

export default connectDB;
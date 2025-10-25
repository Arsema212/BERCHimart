// find-correct-domain.js
import dns from 'dns/promises';

async function findCorrectDomain() {
  console.log('🔍 Testing DNS Resolution for Common Domains...\n');
  
  const testDomains = [
    'cluster0.aeg5eko.mongodb.net',  // Your current cluster
    'cluster0.0mxad94.mongodb.net',  // Your original cluster
    'google.com',                    // Should work for comparison
    'mongodb.net',                   // MongoDB main domain
  ];

  for (const domain of testDomains) {
    try {
      console.log(`Testing: ${domain}`);
      const addresses = await dns.resolve4(domain);
      console.log(`✅ SUCCESS: ${addresses.join(', ')}\n`);
    } catch (error) {
      console.log(`❌ FAILED: ${error.code}\n`);
    }
  }

  console.log('💡 If MongoDB domains fail but google.com works:');
  console.log('1. Your cluster might be paused in MongoDB Atlas');
  console.log('2. The cluster name might be different');
  console.log('3. Get the exact connection string from MongoDB Atlas');
}

findCorrectDomain();
import dns from 'dns/promises';

async function testDNSFix() {
  console.log('🌐 Testing DNS Resolution After Fix...\n');

  // Test with different DNS servers
  const dnsServers = [
    { name: 'Google DNS', servers: ['8.8.8.8', '8.8.4.4'] },
    { name: 'Cloudflare DNS', servers: ['1.1.1.1', '1.0.0.1'] },
    { name: 'System Default', servers: [] }
  ];

  for (const config of dnsServers) {
    console.log(`🔧 Testing with ${config.name}...`);
    
    try {
      const resolver = new dns.Resolver();
      if (config.servers.length > 0) {
        resolver.setServers(config.servers);
      }
      
      const addresses = await resolver.resolve4('cluster0.aeg5eko.mongodb.net');
      console.log(`✅ ${config.name}: ${addresses.join(', ')}`);
      
      // Test connectivity to the resolved IPs
      for (const ip of addresses) {
        try {
          const { exec } = await import('child_process');
          const { promisify } = await import('util');
          const execAsync = promisify(exec);
          
          // Test ping to the IP (Windows)
          const result = await execAsync(`ping -n 1 ${ip}`);
          console.log(`   📡 ${ip}: Reachable`);
        } catch (pingError) {
          console.log(`   ❌ ${ip}: Unreachable`);
        }
      }
      
    } catch (error) {
      console.log(`❌ ${config.name}: ${error.message}`);
    }
    console.log('');
  }
}

testDNSFix();
#!/usr/bin/env node

/**
 * Deployment Test Script
 * Tests if routing works correctly in production
 */

const urls = [
  '/',
  '/admin', 
  '/login',
  '/all-projects',
  '/non-existent-route'
];

const baseUrl = process.argv[2];

if (!baseUrl) {
  console.log('Usage: node test-routes.js <base-url>');
  console.log('Example: node test-routes.js https://your-site.vercel.app');
  process.exit(1);
}

async function testRoute(url) {
  const fullUrl = baseUrl + url;
  try {
    console.log(`Testing: ${fullUrl}`);
    const response = await fetch(fullUrl);
    
    if (response.ok) {
      console.log(`✅ ${url} - ${response.status} ${response.statusText}`);
    } else {
      console.log(`❌ ${url} - ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.log(`❌ ${url} - Error: ${error.message}`);
  }
}

async function runTests() {
  console.log(`🧪 Testing routes for: ${baseUrl}\n`);
  
  for (const url of urls) {
    await testRoute(url);
  }
  
  console.log('\n✨ Route testing complete!');
  console.log('\nIf any routes show 404 errors:');
  console.log('1. Make sure vercel.json is deployed');
  console.log('2. Redeploy your application');
  console.log('3. Check Vercel function logs for errors');
}

runTests();

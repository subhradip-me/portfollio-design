/**
 * Sitemap Generator Script
 * Run this script to generate sitemap.xml in the public folder
 * Usage: node scripts/generateSitemap.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sitemap, SITE_CONFIG } from './config.js';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate XML sitemap content
 */
function generateXMLSitemap() {
  const urls = sitemap
    .filter(page => !page.noindex) // Exclude noindex pages
    .map(page => {
      const fullUrl = `${SITE_CONFIG.baseUrl}${page.url}`;
      return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

/**
 * Generate and save sitemap.xml
 */
function generateSitemap() {
  try {
    // Generate XML content
    const xmlContent = generateXMLSitemap();
    
    // Define output path
    const publicPath = path.join(__dirname, '..', 'public');
    const sitemapPath = path.join(publicPath, 'sitemap.xml');
    
    // Ensure public directory exists
    if (!fs.existsSync(publicPath)) {
      fs.mkdirSync(publicPath, { recursive: true });
    }
    
    // Write sitemap file
    fs.writeFileSync(sitemapPath, xmlContent, 'utf8');
    
    console.log('✅ Sitemap generated successfully at:', sitemapPath);
    console.log('📄 File size:', fs.statSync(sitemapPath).size, 'bytes');
    
    // Log the URLs included
    const urlCount = xmlContent.split('<url>').length - 1;
    console.log('🔗 URLs included:', urlCount);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error.message);
    throw error;
  }
}

/**
 * Generate robots.txt file as well
 */
function generateRobotsTxt() {
  try {
    const robotsContent = `# Robots.txt for Portfolio Website

User-agent: *
Allow: /
Allow: /all-projects

# Disallow admin and authentication pages
Disallow: /admin
Disallow: /login

# Sitemap location
Sitemap: ${SITE_CONFIG.baseUrl}/sitemap.xml

# Crawl delay (optional)
Crawl-delay: 1`;

    const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt');
    fs.writeFileSync(robotsPath, robotsContent, 'utf8');
    
    console.log('✅ Robots.txt generated successfully at:', robotsPath);
    
  } catch (error) {
    console.error('❌ Error generating robots.txt:', error.message);
  }
}

// Run the generators
console.log('🚀 Starting sitemap and robots.txt generation...\n');
generateSitemap();
generateRobotsTxt();
console.log('\n✨ Generation complete!');
console.log('\nNext steps:');
console.log('1. Update the domain in src/config/sitemap.js for production');
console.log('2. Add this script to package.json: "generate-sitemap": "node scripts/generateSitemap.js"');
console.log('3. Run before building for production');

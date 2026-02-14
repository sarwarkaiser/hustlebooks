#!/usr/bin/env node

/**
 * PWA Icon Generator Script
 * 
 * This script generates PWA icons from a source image.
 * 
 * Usage:
 *   1. Place your logo at: public/logo-source.png (1024x1024 recommended)
 *   2. Run: node scripts/generate-icons.js
 *   3. Icons will be created in public/
 * 
 * Requirements:
 *   npm install sharp
 */

const fs = require('fs');
const path = require('path');

const SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
const SOURCE_FILE = path.join(__dirname, '../public/logo-source.png');
const OUTPUT_DIR = path.join(__dirname, '../public');

async function generateIcons() {
  try {
    // Check if sharp is installed
    let sharp;
    try {
      sharp = require('sharp');
    } catch {
      console.log('❌ sharp not installed');
      console.log('📦 Install with: npm install sharp');
      console.log('');
      console.log('🎨 Alternative: Use online generators:');
      console.log('   • https://www.pwabuilder.com/imageGenerator');
      console.log('   • https://tools.crawlink.com/tools/pwa-icon-generator/');
      process.exit(1);
    }

    // Check if source file exists
    if (!fs.existsSync(SOURCE_FILE)) {
      console.log('❌ Source file not found: public/logo-source.png');
      console.log('');
      console.log('📋 To create icons:');
      console.log('   1. Create a 1024x1024 PNG logo');
      console.log('   2. Save it as: public/logo-source.png');
      console.log('   3. Run this script again');
      console.log('');
      console.log('🎨 Or use online generators:');
      console.log('   • https://www.pwabuilder.com/imageGenerator');
      console.log('   • https://tools.crawlink.com/tools/pwa-icon-generator/');
      process.exit(1);
    }

    console.log('🎨 Generating PWA icons...\n');

    for (const size of SIZES) {
      const outputFile = path.join(OUTPUT_DIR, `icon-${size}x${size}.png`);
      
      await sharp(SOURCE_FILE)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 59, g: 130, b: 246, alpha: 1 } // #3B82F6 blue
        })
        .toFile(outputFile);
      
      console.log(`  ✅ icon-${size}x${size}.png`);
    }

    // Generate favicon.ico (multi-size)
    const faviconFile = path.join(OUTPUT_DIR, 'favicon.ico');
    await sharp(SOURCE_FILE)
      .resize(32, 32)
      .toFile(faviconFile.replace('.ico', '-32x32.png'));
    
    console.log(`  ✅ favicon.ico (32x32)`);

    // Generate apple-touch-icon
    const appleIconFile = path.join(OUTPUT_DIR, 'apple-touch-icon.png');
    await sharp(SOURCE_FILE)
      .resize(180, 180)
      .toFile(appleIconFile);
    
    console.log(`  ✅ apple-touch-icon.png (180x180)`);

    console.log('\n✨ All icons generated successfully!');
    console.log(`📁 Location: ${OUTPUT_DIR}`);
    console.log('');
    console.log('🚀 Your PWA is now ready for mobile installation!');

  } catch (error) {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
  }
}

// Check if running directly
if (require.main === module) {
  generateIcons();
}

module.exports = { generateIcons };

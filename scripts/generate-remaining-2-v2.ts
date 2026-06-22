#!/usr/bin/env node
// Generate the 2 remaining images that timed out.
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/z/my-project/public';

const images = [
  {
    filename: 'service-recharge.png',
    size: '1024x1024',
    prompt:
      'A Black Ghanaian automotive technician in his 30s wearing protective gloves and a work uniform, operating a professional refrigerant recharge machine connected to a car air conditioning system, gauges and hoses visible, focused professional expression, modern workshop background, African features, short hair, dark skin, professional automotive photography, clean industrial lighting, high detail',
  },
  {
    filename: 'service-cleaning.png',
    size: '1024x1024',
    prompt:
      'A Black Ghanaian mechanic in his 30s wearing a protective mask and work uniform, using a professional spray cleaning tool on a car air conditioning system, focused expression, AC evaporator and ventilation components visible, modern auto workshop background, dark skin Ghanaian features, short hair, professional automotive photography, bright clean lighting, sharp detail',
  },
];

async function generateOne(zai, image) {
  const outputPath = path.join(OUTPUT_DIR, image.filename);
  console.log(`→ Generating ${image.filename} (${image.size})...`);
  try {
    const response = await zai.images.generations.create({
      prompt: image.prompt,
      size: image.size,
    });
    if (!response.data || !response.data[0] || !response.data[0].base64) {
      throw new Error('No image data in response');
    }
    const buffer = Buffer.from(response.data[0].base64, 'base64');
    fs.writeFileSync(outputPath, buffer);
    console.log(`✓ ${image.filename} saved (${(buffer.length / 1024).toFixed(0)} KB)`);
    return { success: true };
  } catch (error) {
    console.error(`✗ ${image.filename} failed: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function main() {
  const zai = await ZAI.create();
  for (const img of images) {
    await generateOne(zai, img);
    await new Promise((r) => setTimeout(r, 5000));
  }
  console.log('Done.');
}

main().catch(console.error);

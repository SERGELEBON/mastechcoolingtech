#!/usr/bin/env node
/**
 * Generate 5 NEW images for Mastech Cooling Technology
 * featuring Black Ghanaian mechanics working on car AC systems.
 *
 * Sequential calls with delays to avoid 429 rate limits.
 *
 * Images:
 *   1. hero-bg.png             (1344x768, wide hero) — Ghanaian mechanic under open hood with diagnostic tablet
 *   2. service-diagnostic.png  (1024x1024)            — Ghanaian technician with electronic diagnostic scanner
 *   3. service-repair.png      (1024x1024)            — Ghanaian mechanic repairing AC compressor with wrench
 *   4. service-recharge.png    (1024x1024)            — Ghanaian technician operating refrigerant recharge machine
 *   5. service-cleaning.png    (1024x1024)            — Ghanaian mechanic with spray cleaning tool on AC system
 */

import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/z/my-project/public';

const images = [
  {
    filename: 'hero-bg.png',
    size: '1344x768',
    prompt:
      'Professional Black Ghanaian mechanic in his 30s wearing a clean dark blue work uniform, confidently working under the raised hood of a car in a modern well-lit auto repair workshop, focused expression, holding diagnostic equipment, air conditioning compressor visible, warm African workshop lighting, dark moody background suitable for hero banner with text overlay on the left, mechanic visible on the right side of the frame, professional automotive photography, cinematic, high detail, sharp focus, dark teal and purple tones',
  },
  {
    filename: 'service-diagnostic.png',
    size: '1024x1024',
    prompt:
      'Close-up of a Black Ghanaian automotive technician in his 40s wearing safety glasses and dark work shirt, using an electronic diagnostic scanner tablet connected to a car air conditioning system, focused intense expression, modern workshop background slightly blurred, professional AC diagnostic equipment with screen visible, Ghanaian features, short cropped hair, dark skin, professional automotive photography, dramatic lighting, high detail',
  },
  {
    filename: 'service-repair.png',
    size: '1024x1024',
    prompt:
      'A skilled Black Ghanaian mechanic in his 30s wearing a branded work shirt and gloves, repairing a car air conditioning compressor with professional tools, holding a wrench, focused concentration, modern auto repair workshop background, compressor and AC components clearly visible, dark skin Ghanaian features, short hair, professional automotive photography, warm workshop lighting, sharp detail',
  },
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
  console.log('Initializing ZAI SDK...');
  const zai = await ZAI.create();

  console.log(`\nGenerating ${images.length} images sequentially (5s delay between calls)...\n`);

  const results = [];
  for (const img of images) {
    const result = await generateOne(zai, img);
    results.push({ ...result, filename: img.filename });
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  console.log('\n=== Summary ===');
  const succeeded = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);
  console.log(`✓ Succeeded: ${succeeded.length}/${images.length}`);
  if (failed.length > 0) {
    console.log(`✗ Failed:`);
    failed.forEach((f) => console.log(`   - ${f.filename}`));
  }
}

main().catch(console.error);

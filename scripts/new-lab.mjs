#!/usr/bin/env node
// ── new-lab scaffold script ─────────────────────────────────────────────────
//
// Usage:
//   node scripts/new-lab.mjs <slug> "Title" "Description"
//
// Example:
//   node scripts/new-lab.mjs bjt-amplifier "BJT Common-Emitter Amplifier" \
//       "Measure voltage gain and frequency response of a BC547 CE amplifier."
//
// What it does:
//   1. Creates src/labs/circuits/<slug>/index.ts   — circuit template
//   2. Creates src/labs/content/<slug>.ts          — content template
//   3. Patches  src/labs/circuits/index.ts         — registers circuit
//   4. Patches  src/labs/content/index.ts          — registers content
//   5. Patches  src/sections/explore/explore.data.ts — adds to explore page
//   6. Prints   npm run dev and the URL to open

import fs   from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.resolve(__dirname, '..');

// ── Args ─────────────────────────────────────────────────────────────────────
const [slug, title = 'New Experiment', description = 'Lab description.'] = process.argv.slice(2);

if (!slug) {
  console.error('\nUsage: node scripts/new-lab.mjs <slug> "Title" "Description"\n');
  process.exit(1);
}

// Derive names
const constName    = slug.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase()); // kebab → PascalCase
const circuitConst = `${constName}Circuit`;
const contentConst = `${constName}Content`;

// ── File paths ────────────────────────────────────────────────────────────────
const circuitDir  = path.join(ROOT, 'src/labs/circuits', slug);
const circuitFile = path.join(circuitDir, 'index.ts');
const contentFile = path.join(ROOT, 'src/labs/content', `${slug}.ts`);
const circuitsIdx = path.join(ROOT, 'src/labs/circuits/index.ts');
const contentsIdx = path.join(ROOT, 'src/labs/content/index.ts');
const exploreData = path.join(ROOT, 'src/sections/explore/explore.data.ts');

// ── Guard: already exists ─────────────────────────────────────────────────────
if (fs.existsSync(circuitFile)) {
  console.error(`\n✗ Circuit already exists: ${circuitFile}\n`);
  process.exit(1);
}

// ── 1. Circuit template ───────────────────────────────────────────────────────
fs.mkdirSync(circuitDir, { recursive: true });
fs.writeFileSync(circuitFile, `import { CB } from '@/labs/builder';

// ── ${title} ─────────────────────────────────────────────────────────────────
// TODO: build out components and steps below.
//
// Quick reference:
//   .board()                          — adds the breadboard
//   .resistor('r1', 470, 5, 'c')      — 470Ω at col 5, row c
//   .led('led1', 'green', 10, 'c')    — green LED at col 10, row c
//   .gate('xor1', 'xor-gate', 7)      — XOR gate at col 7
//   .wire('w1', 'red', from, to)      — any wire
//   .wireVcc('w_vcc', 5)              — VCC rail to col 5
//   .wireGnd('w_gnd', {led:'led1', end:'cathode'}, 11)
//   .psu('psu', [{board:'bb',rail:'vcc_top',col:5}, {board:'bb',rail:'gnd_top',col:5}])
//   .dmm('dmm', [{board:'bb',col:3,row:'d'}, {board:'bb',col:3,row:'c'}])
//
//   .step('Title', 'Body text.').show('bb')
//   .step('Next step', '...').show('r1').highlight('r1')
//   .step('Power on', '...').show('led1').power({ Vcc: 1 }).glow('led1', 0.8)
//   .build()

export const ${circuitConst} = new CB('${slug}', '${title}', '${description}')
  .board()
  // TODO: add components

  .step('Place the breadboard', 'The 830-point breadboard is your build surface.')
  .show('bb')

  // TODO: add more steps
  .build();
`);
console.log(`✓ Circuit:  src/labs/circuits/${slug}/index.ts`);

// ── 2. Content template ───────────────────────────────────────────────────────
fs.writeFileSync(contentFile, `import { type LabContent } from '@/labs/lab-content.types';

export const ${contentConst}: LabContent = {
  id: '${slug}',
  title: '${title}',
  circuitId: '${slug}',

  sections: [
    // ── THEORY ──────────────────────────────────────────────────────────────
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        // TODO: add theory paragraphs. Supports $inline math$ and $$display math$$.
        '${description}',
      ],
    },

    // ── APPARATUS ───────────────────────────────────────────────────────────
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard', specification: '830 tie-point, solderless', quantity: '1' },
        // TODO: add more apparatus items
      ],
    },

    // ── PROCEDURE ───────────────────────────────────────────────────────────
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Place the breadboard.',
          circuitStepIndex: 0,
          body: 'Place the 830-point breadboard on the bench.',
        },
        // TODO: add more procedure steps. circuitStepIndex maps to circuit.steps[] index.
      ],
    },

    // ── OBSERVATIONS ────────────────────────────────────────────────────────
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        // TODO: add observation notes
      ],
      table: {
        headers: ['Parameter', 'Value'],
        rows: [
          // TODO: add data rows
        ],
      },
    },

    // ── CONCLUSION ───────────────────────────────────────────────────────────
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        // TODO: summarise results
      ],
    },
  ],
};
`);
console.log(`✓ Content:  src/labs/content/${slug}.ts`);

// ── 3. Patch circuits/index.ts ────────────────────────────────────────────────
{
  let src = fs.readFileSync(circuitsIdx, 'utf8');

  // Add import before the `import { type Circuit }` line
  const importLine = `import { ${circuitConst} } from './${slug}';`;
  if (!src.includes(importLine)) {
    src = src.replace(
      `import { type Circuit }`,
      `${importLine}\nimport { type Circuit }`,
    );
  }

  // Add to ALL_CIRCUITS array (before closing bracket)
  if (!src.includes(circuitConst)) {
    src = src.replace(/\];(\s*\nexport \{)/, `  ${circuitConst},\n];$1`);
    // Also add to named exports
    src = src.replace(/(export \{[^}]+)(};)/, `$1  ${circuitConst},\n$2`);
  }

  fs.writeFileSync(circuitsIdx, src);
  console.log(`✓ Registered in src/labs/circuits/index.ts`);
}

// ── 4. Patch content/index.ts ─────────────────────────────────────────────────
{
  let src = fs.readFileSync(contentsIdx, 'utf8');

  const importLine = `import { ${contentConst} } from './${slug}';`;
  if (!src.includes(importLine)) {
    // Add import before the closing blank line before ALL_CONTENTS
    src = src.replace(
      `\n/** All lab content`,
      `${importLine}\n\n/** All lab content`,
    );
  }

  // Add to ALL_CONTENTS map (before closing brace)
  if (!src.includes(`'${slug}':`)) {
    src = src.replace(/\};\s*$/, `  '${slug}': ${contentConst},\n};\n`);
  }

  fs.writeFileSync(contentsIdx, src);
  console.log(`✓ Registered in src/labs/content/index.ts`);
}

// ── 5. Patch explore.data.ts ─────────────────────────────────────────────────
{
  let src = fs.readFileSync(exploreData, 'utf8');

  const expEntry = `
        {
          id: '${slug}',
          title: '${title}',
          description: '${description}',
          circuitId: '${slug}',
          labRoute: '/labs/${slug}',
          tags: [],
        },`;

  if (!src.includes(`id: '${slug}'`)) {
    // Append to the LAST experiments array before its closing bracket
    // Find the last experiments: [ block and append before its ]
    const lastExpIdx = src.lastIndexOf('      ],\n    },');
    if (lastExpIdx !== -1) {
      src = src.slice(0, lastExpIdx) + expEntry + '\n' + src.slice(lastExpIdx);
    }
    fs.writeFileSync(exploreData, src);
    console.log(`✓ Added to src/sections/explore/explore.data.ts`);
  } else {
    console.log(`- explore.data.ts already has '${slug}', skipped.`);
  }
}

// ── Done ─────────────────────────────────────────────────────────────────────
console.log(`
✅ Experiment '${slug}' scaffolded!

Next steps:
  1. Edit circuit:  src/labs/circuits/${slug}/index.ts
  2. Edit content:  src/labs/content/${slug}.ts
  3. Run dev:       npm run dev
  4. Open:          http://localhost:3003/labs/${slug}
`);

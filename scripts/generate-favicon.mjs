/**
 * scripts/generate-favicon.mjs
 * Converts vlabs-logo.svg (recoloured white) → src/app/favicon.ico
 * Uses sharp (bundled with Next.js) for SVG→PNG rasterisation,
 * then hand-writes the ICO binary with 16×16, 32×32, and 48×48 frames.
 */

import sharp from "sharp";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ── White version of the logo SVG ────────────────────────────────────────
const WHITE_SVG = `<svg width="324" height="324" viewBox="0 0 324 324" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="35" y="81" width="83" height="85" fill="white"/>
<rect x="122" y="166" width="42" height="79" fill="white"/>
<rect x="208" y="81" width="81" height="81" fill="white"/>
<rect x="125" y="166" width="81" height="79" fill="white"/>
<rect x="228.607" y="102.157" width="85.0751" height="116.824" transform="rotate(45 228.607 102.157)" fill="white"/>
<line x1="86.8712" y1="133.187" x2="150.468" y2="206.347" stroke="white" stroke-width="19"/>
<line x1="35.0512" y1="82.9654" x2="19.0512" y2="66.9654" stroke="white" stroke-width="2"/>
<line x1="34.2929" y1="165.707" x2="19.2929" y2="150.707" stroke="white" stroke-width="2"/>
<line x1="116.293" y1="81.7071" x2="100.293" y2="65.7071" stroke="white" stroke-width="2"/>
<line x1="19" y1="65" x2="102" y2="65" stroke="white" stroke-width="2"/>
<line x1="20" y1="66" x2="20" y2="151" stroke="white" stroke-width="2"/>
<line x1="209.059" y1="82.9654" x2="192.059" y2="65.9654" stroke="white" stroke-width="2"/>
<line x1="208.293" y1="124.707" x2="191.293" y2="107.707" stroke="white" stroke-width="2"/>
<line x1="207.654" y1="164.354" x2="203.654" y2="160.354" stroke="white"/>
<line x1="288.293" y1="81.7071" x2="271.293" y2="64.7071" stroke="white" stroke-width="2"/>
<line x1="191" y1="64" x2="272" y2="64" stroke="white" stroke-width="2"/>
<line x1="192" y1="65" x2="192" y2="108" stroke="white" stroke-width="2"/>
<line x1="88.7569" y1="161.346" x2="107.755" y2="183.349" stroke="white" stroke-width="2"/>
<line x1="108.253" y1="183.344" x2="122.344" y2="187.747" stroke="white" stroke-width="2" stroke-linecap="round"/>
<path d="M106 236C106 236.552 106.448 237 107 237C107.552 237 108 236.552 108 236H107H106ZM107 183H106V236H107H108V183H107Z" fill="white"/>
<line x1="107.471" y1="236.118" x2="122.471" y2="244.118" stroke="white" stroke-width="2"/>
<line x1="147.289" y1="151.548" x2="191.04" y2="107.297" stroke="white" stroke-width="2"/>
<line x1="163.293" y1="167.707" x2="147.293" y2="151.707" stroke="white" stroke-width="2"/>
<line x1="148" y1="152" x2="111" y2="152" stroke="white" stroke-width="2"/>
</svg>`;

const SIZES = [16, 32, 48];

// ── Rasterise each size via sharp ─────────────────────────────────────────
const pngBuffers = await Promise.all(
  SIZES.map((size) =>
    sharp(Buffer.from(WHITE_SVG))
      .resize(size, size)
      .png()
      .toBuffer()
  )
);

console.log("PNG sizes:", pngBuffers.map((b, i) => `${SIZES[i]}×${SIZES[i]}: ${b.length}B`));

// ── Build ICO binary ──────────────────────────────────────────────────────
// ICO format:
//   6B  header  (reserved=0, type=1, count=N)
//   N×16B directory entries
//   PNG data blocks (we use PNG-in-ICO, supported by all modern browsers)

const count = SIZES.length;
const HEADER_SIZE = 6;
const DIR_ENTRY_SIZE = 16;
const dirOffset = HEADER_SIZE + count * DIR_ENTRY_SIZE;

// calculate data offsets
let dataOffset = dirOffset;
const offsets = pngBuffers.map((buf) => {
  const o = dataOffset;
  dataOffset += buf.length;
  return o;
});

const totalSize = dataOffset;
const ico = Buffer.alloc(totalSize);
let pos = 0;

// Header
ico.writeUInt16LE(0, pos);      // reserved
ico.writeUInt16LE(1, pos + 2);  // type = 1 (ICO)
ico.writeUInt16LE(count, pos + 4);
pos += 6;

// Directory entries
SIZES.forEach((size, i) => {
  ico.writeUInt8(size === 256 ? 0 : size, pos);      // width (0 = 256)
  ico.writeUInt8(size === 256 ? 0 : size, pos + 1);  // height
  ico.writeUInt8(0, pos + 2);   // color count (0 = no palette)
  ico.writeUInt8(0, pos + 3);   // reserved
  ico.writeUInt16LE(1, pos + 4); // color planes
  ico.writeUInt16LE(32, pos + 6); // bits per pixel
  ico.writeUInt32LE(pngBuffers[i].length, pos + 8);  // data size
  ico.writeUInt32LE(offsets[i], pos + 12);            // data offset
  pos += 16;
});

// PNG data blocks
pngBuffers.forEach((buf) => {
  buf.copy(ico, pos);
  pos += buf.length;
});

const outPath = resolve(ROOT, "src/app/favicon.ico");
writeFileSync(outPath, ico);
console.log(`✓ Written ${ico.length}B → ${outPath}`);

/*
 * Renders every lab's 2D schematics to a PNG contact sheet for visual review,
 * with lint findings circled (red = error, amber = warning).
 *
 *   npx tsx scripts/render-schematics.ts [labFilter] [--out dir]
 */
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";
import { CircuitSchematic } from "../src/labs/CircuitSchematic";
import { allSchematics, type SchematicEntry } from "../src/labs/schematics";
import { lintSchematic } from "../src/labs/schematics/lint";

const args = process.argv.slice(2);
const outIdx = args.indexOf("--out");
const outDir = outIdx >= 0 ? args[outIdx + 1] : join(process.cwd(), ".schematic-review");
const filter = args.find((a, i) => !a.startsWith("--") && (outIdx < 0 || i !== outIdx + 1));

const CELL_W = 520;
const CELL_H = 400;
const CAPTION = 28;
const COLS = 3;
const SCALE = 1.5;

function escapeXml(s: string) {
  return s.replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" })[c]!);
}

function cell(entry: SchematicEntry, x: number, y: number): string {
  const { schematic } = entry;
  const w = schematic.width ?? 340;
  const h = schematic.height ?? 260;
  const issues = lintSchematic(schematic).filter((i) => i.severity !== "info");
  const errors = issues.filter((i) => i.severity === "error").length;

  let svg = renderToStaticMarkup(createElement(CircuitSchematic, { schematic }));
  svg = svg.replace(
    /^<svg([^>]*)>/,
    (_m, attrs: string) =>
      `<svg${attrs.replace(/ (width|height|style|overflow|preserveAspectRatio|class)="[^"]*"/g, "")} x="${x}" y="${y + CAPTION}" width="${CELL_W}" height="${CELL_H - CAPTION}" preserveAspectRatio="xMidYMid meet" overflow="hidden">`,
  );
  const markers = issues
    .filter((i) => i.at)
    .map(
      (i) =>
        `<circle cx="${i.at!.x}" cy="${i.at!.y}" r="6" fill="none" stroke="${i.severity === "error" ? "#dc2626" : "#f59e0b"}" stroke-width="1.6"/>`,
    )
    .join("");
  svg = svg.replace(/<\/svg>$/, `${markers}</svg>`);

  const caption = `${entry.name}  ·  ${w}×${h}  ·  ${errors} err / ${issues.length - errors} warn`;
  return [
    `<rect x="${x}" y="${y}" width="${CELL_W}" height="${CELL_H}" fill="#fafafa" stroke="#d4d4d4"/>`,
    `<text x="${x + 8}" y="${y + 19}" font-family="sans-serif" font-size="13" fill="${errors ? "#b91c1c" : "#404040"}">${escapeXml(caption)}</text>`,
    svg,
  ].join("");
}

async function main() {
  mkdirSync(outDir, { recursive: true });
  const byLab = new Map<string, SchematicEntry[]>();
  for (const e of allSchematics()) {
    if (filter && !e.lab.includes(filter)) continue;
    byLab.set(e.lab, [...(byLab.get(e.lab) ?? []), e]);
  }

  for (const [lab, entries] of byLab) {
    const rows = Math.ceil(entries.length / COLS);
    const W = COLS * CELL_W;
    const H = rows * CELL_H + 36;
    const cells = entries.map((e, i) => cell(e, (i % COLS) * CELL_W, 36 + Math.floor(i / COLS) * CELL_H));
    const sheet =
      `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
      `<rect width="${W}" height="${H}" fill="#fff"/>` +
      `<text x="10" y="25" font-family="sans-serif" font-size="18" font-weight="bold" fill="#171717">${escapeXml(lab)}</text>` +
      cells.join("") +
      `</svg>`;
    const file = join(outDir, `${lab.replace(/\//g, "__")}.png`);
    await sharp(Buffer.from(sheet), { density: 72 * SCALE }).png().toFile(file);
    console.log(file);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

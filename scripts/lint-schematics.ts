/*
 * Lints every 2D schematic for layout mistakes (wires through parts, missed
 * pins, T-joins without dots, overlapping labels, off-canvas drawing).
 *
 *   npx tsx scripts/lint-schematics.ts            # errors + warnings
 *   npx tsx scripts/lint-schematics.ts --all      # include info (crossings)
 *   npx tsx scripts/lint-schematics.ts --summary  # one line per lab
 *   npx tsx scripts/lint-schematics.ts zener      # only labs matching "zener"
 */
import { allSchematics } from "../src/labs/schematics";
import { lintSchematic, type LintSeverity } from "../src/labs/schematics/lint";

const args = process.argv.slice(2);
const showInfo = args.includes("--all");
const summary = args.includes("--summary");
const filter = args.find((a) => !a.startsWith("--"));
const shown: LintSeverity[] = showInfo ? ["error", "warn", "info"] : ["error", "warn"];

const totals: Record<LintSeverity, number> = { error: 0, warn: 0, info: 0 };
const perLab = new Map<string, Record<LintSeverity, number>>();
let currentLab = "";

for (const { lab, name, schematic } of allSchematics()) {
  if (filter && !lab.includes(filter)) continue;
  const issues = lintSchematic(schematic).filter((i) => shown.includes(i.severity));
  const labTotals = perLab.get(lab) ?? { error: 0, warn: 0, info: 0 };
  perLab.set(lab, labTotals);
  for (const i of issues) {
    totals[i.severity]++;
    labTotals[i.severity]++;
  }
  if (summary || issues.length === 0) continue;
  if (lab !== currentLab) {
    console.log(`\n■ ${lab}`);
    currentLab = lab;
  }
  console.log(`  ${name}`);
  for (const i of issues) console.log(`    ${i.severity.padEnd(5)} ${i.code.padEnd(18)} ${i.message}`);
}

if (summary) {
  for (const [lab, t] of perLab) console.log(`${lab.padEnd(64)} ${String(t.error).padStart(4)} err ${String(t.warn).padStart(4)} warn`);
}

console.log(`\n${totals.error} errors, ${totals.warn} warnings${showInfo ? `, ${totals.info} info` : ""}`);
process.exitCode = totals.error > 0 ? 1 : 0;

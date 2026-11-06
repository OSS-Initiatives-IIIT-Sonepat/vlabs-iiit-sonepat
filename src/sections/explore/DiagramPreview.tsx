"use client";

import { CircuitSchematic, type SchematicData } from "@/labs/CircuitSchematic";
import { schematicModules, type SchematicLabPath } from "@/labs/schematics";

function isSchematic(value: unknown): value is SchematicData {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as SchematicData).elements)
  );
}

/** The figure a text lab should show on its subject card. */
export function schematicForCircuit(circuitId: string): SchematicData | null {
  const entry = (
    Object.entries(schematicModules) as [
      SchematicLabPath,
      Record<string, unknown>,
    ][]
  ).find(([path]) => path.endsWith(`/${circuitId}`));
  if (!entry) return null;
  const mod = entry[1];
  for (const [name, value] of Object.entries(mod)) {
    if (name.endsWith("TheoryDiagram") && isSchematic(value)) return value;
  }
  let last: SchematicData | null = null;
  for (const value of Object.values(mod)) {
    if (isSchematic(value)) last = value;
    if (!Array.isArray(value)) continue;
    for (const item of value) if (isSchematic(item)) last = item;
  }
  return last;
}

const EXPRESSION_PROGRAM = `#include <stdio.h>
int main(void) {
    printf("%d\\n", 7 / 2);
    printf("%f\\n", 7.0 / 2);
    FILE *out = fopen("scores.txt", "w");
    fprintf(out, "%d\\n", 7 / 2);
    fclose(out);
    return 0;
}`;

function ProgramPreview() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="border-b border-[#e5e5e5] px-3 py-1 font-[family-name:var(--font-sans),sans-serif] text-[11px] font-medium text-[#525252]">
        expressions.c
      </div>
      <pre className="m-0 flex-1 overflow-hidden px-3 py-1 font-mono text-[11px] leading-[14px] text-[#171717]">
        {EXPRESSION_PROGRAM}
      </pre>
    </div>
  );
}

export function DiagramPreview({ circuitId }: { circuitId: string }) {
  const schematic = schematicForCircuit(circuitId);
  if (!schematic) {
    if (circuitId.startsWith("c-")) return <ProgramPreview />;
    return <div className="h-full w-full bg-white" aria-hidden />;
  }
  return (
    <div className="h-full w-full bg-white">
      <CircuitSchematic cover schematic={schematic} />
    </div>
  );
}

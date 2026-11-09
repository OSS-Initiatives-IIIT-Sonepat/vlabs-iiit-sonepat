import { describe, expect, it } from "vitest";

import { CPU8085, assemble, entryAddress } from "@/labs/emulator";
import { type CodeLabSection } from "@/labs/lab-content.types";
import {
  FN_KEYS,
  HEX_KEYS,
  REG8,
  cellOf,
  hex4,
  type KitFrame,
} from "@/labs/mpu8085/trainer";
import { buildTrainerLab } from "@/labs/mpu8085/trainer-steps";
import { codeLab as addSub } from "@/labs/semesters/semester-04/01-8085-assembly-programming/8085-add-sub-8bit/03-code-lab";
import { codeLab as addCarry } from "@/labs/semesters/semester-04/01-8085-assembly-programming/8085-add-sub-carry/03-code-lab";
import { codeLab as square } from "@/labs/semesters/semester-04/01-8085-assembly-programming/8085-array-square/03-code-lab";
import { codeLab as sum } from "@/labs/semesters/semester-04/01-8085-assembly-programming/8085-array-sum/03-code-lab";
import { codeLab as bcd } from "@/labs/semesters/semester-04/01-8085-assembly-programming/8085-bcd-addition/03-code-lab";
import { codeLab as bcdBin } from "@/labs/semesters/semester-04/01-8085-assembly-programming/8085-bcd-binary-conv/03-code-lab";
import { codeLab as bubble } from "@/labs/semesters/semester-04/01-8085-assembly-programming/8085-bubble-sort/03-code-lab";
import { codeLab as divide } from "@/labs/semesters/semester-04/01-8085-assembly-programming/8085-divide-8bit/03-code-lab";
import { codeLab as minMax } from "@/labs/semesters/semester-04/01-8085-assembly-programming/8085-min-max/03-code-lab";
import { codeLab as multiply } from "@/labs/semesters/semester-04/01-8085-assembly-programming/8085-multiply-8bit/03-code-lab";
import { codeLab as sqrt } from "@/labs/semesters/semester-04/01-8085-assembly-programming/8085-sqrt/03-code-lab";

const LABS: [string, CodeLabSection][] = [
  ["add-sub-8bit", addSub],
  ["add-sub-carry", addCarry],
  ["array-square", square],
  ["array-sum", sum],
  ["bcd-addition", bcd],
  ["bcd-binary-conv", bcdBin],
  ["bubble-sort", bubble],
  ["divide-8bit", divide],
  ["min-max", minMax],
  ["multiply-8bit", multiply],
  ["sqrt", sqrt],
];

const KEYS = new Set([...FN_KEYS.flat(), ...HEX_KEYS.flat()]);
const SPOT = /^(A|B|C|D|E|H|L|F|SP|PC|IR|ALU|CODE|RAM|KEYS|M[0-9A-F]{4})$/;

/** The program as the code editor runs it. */
function runInEditor(lab: CodeLabSection) {
  const asm = assemble(lab.starterCode);
  const cpu = new CPU8085();
  cpu.loadProgram(asm.bytes, asm.origin);
  for (const [addr, value] of Object.entries(lab.memoryInit ?? {}))
    cpu.writeMem(parseInt(addr, 16), value);
  cpu.setState({ PC: asm.symbols.get("START") ?? entryAddress(asm) });
  cpu.run(200000);
  return cpu;
}

const kits = (frames: { kit?: KitFrame }[]) =>
  frames.map((s) => s.kit).filter((k): k is KitFrame => !!k);

describe("8085 trainer kit steps", () => {
  for (const [name, lab] of LABS) {
    describe(name, () => {
      const built = buildTrainerLab(
        lab.starterCode,
        lab.memoryInit,
        lab.expectedOutputs,
      );
      const frames = kits(built.steps);

      it("gives every step a kit frame, a label and plain text", () => {
        expect(frames).toHaveLength(built.steps.length);
        for (const step of built.steps) {
          expect(step.label.length).toBeGreaterThan(0);
          expect(step.body).not.toMatch(/undefined|NaN|\[object/);
        }
      });

      it("presses only keys the kit has, and shows six digits", () => {
        for (const f of frames) {
          for (const press of f.keys) {
            expect(KEYS.has(press.key)).toBe(true);
            expect(press.digits).toHaveLength(6);
            expect(press.mem).toHaveLength(16);
          }
          expect(f.after.digits).toHaveLength(6);
        }
      });

      it("puts every key and every move in exactly one command", () => {
        for (const f of frames) {
          expect(f.beats.length).toBeGreaterThan(0);
          let key = 0;
          let stage = 0;
          for (const b of f.beats) {
            expect(b.keys[0]).toBe(key);
            expect(b.stages[0]).toBe(stage);
            expect(b.keys[1]).toBeGreaterThanOrEqual(b.keys[0]);
            expect(b.stages[1]).toBeGreaterThanOrEqual(b.stages[0]);
            expect(b.keys[1] > b.keys[0] || b.stages[1] > b.stages[0]).toBe(
              true,
            );
            expect(b.say).not.toMatch(/undefined|NaN|\[object/);
            key = b.keys[1];
            stage = b.stages[1];
          }
          expect(key).toBe(f.keys.length);
          expect(stage).toBe(f.stages.length);
        }
        expect(built.overview.beats).toEqual([]);
        expect(built.final.beats).toEqual([]);
      });

      it("moves bytes only between places the kit can draw", () => {
        for (const f of frames)
          for (const move of f.stages.flat()) {
            expect(move.from).toMatch(SPOT);
            expect(move.to).toMatch(SPOT);
            expect(move.text.length).toBeGreaterThan(0);
          }
      });

      it("types every program byte in before it runs", () => {
        const typed = new Set<number>();
        for (const f of frames) {
          if (f.focus === "run") break;
          for (const press of f.keys)
            if (press.lcd.mode === "edit") typed.add(press.lcd.upto);
        }
        for (const line of built.program.listing)
          line.bytes.forEach((_, i) =>
            expect(typed.has(line.address + i)).toBe(true),
          );
      });

      it("ends with the registers and memory the editor's run leaves", () => {
        const cpu = runInEditor(lab);
        const s = cpu.getState();
        const end = built.final.after;
        for (const r of REG8) expect(end.regs[r], r).toBe(s[r]);
        expect(end.regs.SP).toBe(s.SP);
        built.program.rows.forEach((base) => {
          for (let i = 0; i < 8; i++) {
            const at = cellOf(built.program.rows, base + i);
            expect(end.mem[at], hex4(base + i)).toBe(cpu.readMem(base + i));
          }
        });
        const halt = frames.find(
          (f) => f.after.lcd.mode === "run" && f.after.lcd.halted,
        );
        expect(halt, "a step halts the 8085").toBeDefined();
      });
    });
  }

  it("says what ADD B does with the numbers it adds", () => {
    const built = buildTrainerLab(addSub.starterCode, addSub.memoryInit);
    const add = built.steps.find((s) => s.label === "ADD B")!;
    expect(add.body).toContain("ADD B adds B (25H) to A (17H). A = 3CH.");
    expect(add.kit!.alu).toBe("17 + 25 = 3C");
    expect(add.kit!.beats.map((b) => b.say)).toEqual([
      "NEXT · fetch 80H (ADD B) from 8107H into IR",
      "A (17H) and B (25H) into the ALU",
      "ALU: 17 + 25 = 3C → A and the flags",
    ]);
    expect(
      add.kit!.stages.map((s) => s.map((m) => `${m.from}>${m.to}`)),
    ).toEqual([["CODE>IR"], ["A>ALU", "B>ALU"], ["ALU>A", "ALU>F"]]);
  });

  it("folds the later passes of a loop into one step each", () => {
    const built = buildTrainerLab(bubble.starterCode, bubble.memoryInit);
    const passes = built.steps.filter(
      (s) =>
        s.label.startsWith("Loop again") ||
        s.label.startsWith("Run the remaining"),
    );
    expect(passes.length).toBeGreaterThan(0);
    expect(passes.length).toBeLessThanOrEqual(6);
    expect(built.steps.length).toBeLessThan(70);
  });
});

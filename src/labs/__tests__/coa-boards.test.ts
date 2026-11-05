import { describe, expect, it } from "vitest";

import { simulate, resetSequentialState } from "@/labs/simulate";
import { type Circuit, type ComponentInstance } from "@/labs/types";
import { components as cla } from "@/labs/semesters/semester-03/01-combinational-arithmetic/cla-adder/components";
import { components as wallace } from "@/labs/semesters/semester-03/01-combinational-arithmetic/wallace-tree/components";
import { components as arrayMul } from "@/labs/semesters/semester-03/01-combinational-arithmetic/combinational-multipliers/components";
import { components as booth } from "@/labs/semesters/semester-03/01-combinational-arithmetic/booths-multiplier/components";
import { components as alu } from "@/labs/semesters/semester-03/02-memory-cpu-systems/alu-simulation/components";
import { components as memory } from "@/labs/semesters/semester-03/02-memory-cpu-systems/memory-design/components";
import { components as assoc } from "@/labs/semesters/semester-03/02-memory-cpu-systems/cache-associative/components";
import { components as direct } from "@/labs/semesters/semester-03/02-memory-cpu-systems/cache-direct-mapped/components";
import { components as cpu } from "@/labs/semesters/semester-03/02-memory-cpu-systems/cpu-design/components";
import { components as ff } from "@/labs/semesters/semester-03/04-computer-organisation-architecture/02-flip-flop-synthesis/components";
import { components as regs } from "@/labs/semesters/semester-03/01-combinational-arithmetic/registers-counters-theory/components";
import { components as kmap } from "@/labs/semesters/semester-03/04-computer-organisation-architecture/03-karnaugh-map/components";
import { components as qm } from "@/labs/semesters/semester-03/04-computer-organisation-architecture/04-quine-mccluskey/components";
import { components as bcd } from "@/labs/semesters/semester-03/05-computer-arithmetic/bcd-adder/components";
import { components as computer } from "@/labs/semesters/semester-03/06-processor-design/basic-computer/components";
import { components as control } from "@/labs/semesters/semester-03/06-processor-design/microprogrammed-control/components";
import { components as regsFile } from "@/labs/semesters/semester-03/06-processor-design/register-organisation/components";
import { components as pipe } from "@/labs/semesters/semester-03/06-processor-design/instruction-pipeline/components";
import { components as memMap } from "@/labs/semesters/semester-03/07-memory-and-io/memory-address-map/components";
import { components as ioPort } from "@/labs/semesters/semester-03/07-memory-and-io/io-organisation/components";
import {
  boardShow,
  components as transfer,
} from "@/labs/semesters/semester-03/05-computer-arithmetic/register-transfer/components";
import {
  boardShow as busShow,
  components as commonBus,
} from "@/labs/semesters/semester-03/05-computer-arithmetic/common-bus/components";
import { procedureSteps as busSteps } from "@/labs/semesters/semester-03/05-computer-arithmetic/common-bus/04-procedure";
import {
  boardShow as triShow,
  components as triBus,
} from "@/labs/semesters/semester-03/05-computer-arithmetic/tri-state-bus/components";
import { procedureSteps as triSteps } from "@/labs/semesters/semester-03/05-computer-arithmetic/tri-state-bus/04-procedure";
import {
  boardShow as addShow,
  components as adder4,
} from "@/labs/semesters/semester-03/05-computer-arithmetic/binary-adder-4/components";
import { procedureSteps as addSteps } from "@/labs/semesters/semester-03/05-computer-arithmetic/binary-adder-4/04-procedure";
import {
  boardShow as subShow,
  components as sub4,
} from "@/labs/semesters/semester-03/05-computer-arithmetic/adder-subtractor/components";
import { procedureSteps as subSteps } from "@/labs/semesters/semester-03/05-computer-arithmetic/adder-subtractor/04-procedure";
import {
  boardShow as incShow,
  components as inc4,
} from "@/labs/semesters/semester-03/05-computer-arithmetic/binary-incrementer/components";
import { procedureSteps as incSteps } from "@/labs/semesters/semester-03/05-computer-arithmetic/binary-incrementer/04-procedure";
import {
  boardShow as arithShow,
  components as arith,
} from "@/labs/semesters/semester-03/05-computer-arithmetic/arithmetic-circuit/components";
import { procedureSteps as arithSteps } from "@/labs/semesters/semester-03/05-computer-arithmetic/arithmetic-circuit/04-procedure";
import {
  boardShow as shiftShow,
  components as shifter,
} from "@/labs/semesters/semester-03/05-computer-arithmetic/combinational-shifter/components";
import { procedureSteps as shiftSteps } from "@/labs/semesters/semester-03/05-computer-arithmetic/combinational-shifter/04-procedure";
import {
  boardShow as alsuShow,
  components as alsu,
} from "@/labs/semesters/semester-03/05-computer-arithmetic/arithmetic-logic-shift/components";
import { procedureSteps as alsuSteps } from "@/labs/semesters/semester-03/05-computer-arithmetic/arithmetic-logic-shift/04-procedure";
import { procedureSteps as transferSteps } from "@/labs/semesters/semester-03/05-computer-arithmetic/register-transfer/04-procedure";

function board(id: string, components: ComponentInstance[]): Circuit {
  return { id, title: id, description: "", components, steps: [] };
}

function leds(
  id: string,
  components: ComponentInstance[],
  inputs: Record<string, 0 | 1>,
) {
  return simulate(board(id, components), inputs).ledOn;
}

function expectOn(map: Map<string, boolean>, on: string[], off: string[]) {
  for (const id of on) expect(map.get(id), `${id} on`).toBe(true);
  for (const id of off) expect(map.get(id), `${id} off`).toBe(false);
}

describe("C.O.A. breadboards", () => {
  it("CLA adds 1010 + 0011 = 1101", () => {
    expectOn(
      leds("cla-adder", cla, {
        A4: 1,
        A3: 0,
        A2: 1,
        A1: 0,
        B4: 0,
        B3: 0,
        B2: 1,
        B1: 1,
      }),
      ["led_s4", "led_s3", "led_s1"],
      ["led_s2", "led_c4"],
    );
  });

  it("Wallace column compresses two 1s into a carry", () => {
    expectOn(
      leds("wallace-tree", wallace, { A1: 1, B0: 1, A0: 1, B1: 1 }),
      ["led_carry"],
      ["led_sum"],
    );
  });

  it("array multiplier does 3 × 3 = 9", () => {
    expectOn(
      leds("combinational-multipliers", arrayMul, {
        A0: 1,
        A1: 1,
        B0: 1,
        B1: 1,
      }),
      ["led_p0", "led_s3"],
      ["led_s1", "led_s2"],
    );
  });

  it("Booth slice adds, then subtracts", () => {
    expectOn(
      leds("booths-multiplier", booth, { M: 1, SUB: 0, ACC: 1 }),
      ["led_s2"],
      ["led_s1"],
    );
    expectOn(
      leds("booths-multiplier", booth, { M: 1, SUB: 1, ACC: 0 }),
      ["led_s1"],
      ["led_s2"],
    );
  });

  it("ALU mux selects AND then XOR", () => {
    expectOn(
      leds("alu-simulation", alu, { A: 1, B: 1, S0: 0, S1: 0 }),
      ["led_y"],
      [],
    );
    expectOn(
      leds("alu-simulation", alu, { A: 1, B: 1, S0: 0, S1: 1 }),
      [],
      ["led_y"],
    );
  });

  it("memory decoder selects word 0, then a clock stores D", () => {
    expectOn(
      leds("memory-design", memory, { A0: 0, A1: 0, A2: 0, D: 0, CLK: 0 }),
      ["led_word"],
      ["led_q"],
    );
    expectOn(
      leds("memory-design", memory, { A0: 1, A1: 0, A2: 0, D: 0, CLK: 0 }),
      [],
      ["led_word", "led_q"],
    );
    resetSequentialState("memory-design");
    leds("memory-design", memory, { A0: 0, A1: 0, A2: 0, D: 1, CLK: 0 });
    expectOn(
      leds("memory-design", memory, { A0: 0, A1: 0, A2: 0, D: 1, CLK: 1 }),
      ["led_word", "led_q"],
      [],
    );
  });

  it("associative compare hits only the stored tag 10", () => {
    expectOn(
      leds("cache-associative", assoc, { T0: 0, T1: 1 }),
      ["led_hit"],
      [],
    );
    expectOn(
      leds("cache-associative", assoc, { T0: 1, T1: 1 }),
      [],
      ["led_hit"],
    );
  });

  it("direct-mapped hit needs both the index and the tag", () => {
    expectOn(
      leds("cache-direct-mapped", direct, { IDX: 0, TAG: 1 }),
      ["led_line", "led_hit"],
      [],
    );
    expectOn(
      leds("cache-direct-mapped", direct, { IDX: 1, TAG: 1 }),
      [],
      ["led_line", "led_hit"],
    );
    expectOn(
      leds("cache-direct-mapped", direct, { IDX: 0, TAG: 0 }),
      ["led_line"],
      ["led_hit"],
    );
  });

  it("CPU fetch walks from instruction 0 to instruction 1", () => {
    resetSequentialState("cpu-design");
    expectOn(leds("cpu-design", cpu, { CLK: 0 }), ["led_i0"], ["led_i1"]);
    expectOn(leds("cpu-design", cpu, { CLK: 1 }), ["led_i1"], ["led_i0"]);
  });

  it("counter increments on rising edges", () => {
    resetSequentialState("registers-counters-theory");
    leds("registers-counters-theory", regs, { CLK: 0 });
    expectOn(
      leds("registers-counters-theory", regs, { CLK: 1 }),
      ["led_q0"],
      ["led_q1", "led_q2", "led_q3"],
    );
    leds("registers-counters-theory", regs, { CLK: 0 });
    expectOn(
      leds("registers-counters-theory", regs, { CLK: 1 }),
      ["led_q1"],
      ["led_q0", "led_q2", "led_q3"],
    );
  });

  it("JK wired as a D flip-flop follows D on the falling edge", () => {
    resetSequentialState("flip-flop-synthesis");
    leds("flip-flop-synthesis", ff, { D: 1, CLK: 0 });
    leds("flip-flop-synthesis", ff, { D: 1, CLK: 1 });
    expectOn(leds("flip-flop-synthesis", ff, { D: 1, CLK: 0 }), ["led_q"], []);
    leds("flip-flop-synthesis", ff, { D: 0, CLK: 1 });
    expectOn(leds("flip-flop-synthesis", ff, { D: 0, CLK: 0 }), [], ["led_q"]);
  });

  it("K-map and Quine–McCluskey boards agree on the 4-variable function", () => {
    const vectors = [
      { A: 0, B: 0, C: 0, D: 0, on: true },
      { A: 1, B: 1, C: 1, D: 0, on: true },
      { A: 0, B: 1, C: 0, D: 1, on: true },
      { A: 1, B: 1, C: 0, D: 0, on: false },
      { A: 0, B: 0, C: 1, D: 1, on: false },
    ] as const;
    for (const v of vectors) {
      const inputs = { A: v.A, B: v.B, C: v.C, D: v.D } as Record<
        string,
        0 | 1
      >;
      const k = leds("karnaugh-map", kmap, inputs).get("led_f");
      const q = leds("quine-mccluskey", qm, inputs).get("led_f");
      expect(k, `kmap ${v.A}${v.B}${v.C}${v.D}`).toBe(v.on);
      expect(q, `qm ${v.A}${v.B}${v.C}${v.D}`).toBe(v.on);
    }
  });

  it("BCD adder turns 9 + 5 into 0001 0100", () => {
    expectOn(
      leds("bcd-adder", bcd, {
        a4: 1,
        a3: 0,
        a2: 0,
        a1: 1,
        b4: 0,
        b3: 1,
        b2: 0,
        b1: 1,
      }),
      ["led_tens", "led_u4"],
      ["led_u8", "led_u2", "led_u1"],
    );
  });

  it("CPU address 0 reads 0001 and one clock reads 0101", () => {
    resetSequentialState("basic-computer");
    expectOn(
      leds("basic-computer", computer, { clk: 0 }),
      ["led_d0"],
      ["led_d1", "led_d2", "led_d3"],
    );
    expectOn(
      leds("basic-computer", computer, { clk: 1 }),
      ["led_d0", "led_d2"],
      ["led_d1", "led_d3"],
    );
    expectOn(
      leds("basic-computer", computer, { clk: 1 }),
      ["led_d0", "led_d2"],
      ["led_d1", "led_d3"],
    );
  });

  it("control memory steps from 0001 to 0010", () => {
    resetSequentialState("microprogrammed-control");
    expectOn(
      leds("microprogrammed-control", control, { clk: 0 }),
      ["led_d0"],
      ["led_d1", "led_d2", "led_d3"],
    );
    expectOn(
      leds("microprogrammed-control", control, { clk: 1 }),
      ["led_d1"],
      ["led_d0", "led_d2", "led_d3"],
    );
  });

  it("the bus lamp follows the selected register", () => {
    resetSequentialState("register-organisation");
    leds("register-organisation", regsFile, { clk: 0, sel: 0 });
    expectOn(
      leds("register-organisation", regsFile, { clk: 1, sel: 0 }),
      ["led_bus"],
      [],
    );
    expectOn(
      leds("register-organisation", regsFile, { clk: 1, sel: 1 }),
      [],
      ["led_bus"],
    );
  });

  it("pipeline lamps follow the active inputs", () => {
    expectOn(
      leds("instruction-pipeline", pipe, { t0: 1, t1: 0, t2: 0, t3: 0 }),
      ["led_if"],
      ["led_id", "led_ex", "led_wb"],
    );
  });

  it("the memory map enables one ROM at a time", () => {
    expectOn(
      leds("memory-address-map", memMap, { a0: 0 }),
      ["led_d0", "led_d1"],
      ["led_d2", "led_d3"],
    );
    expectOn(
      leds("memory-address-map", memMap, { a0: 1 }),
      ["led_d2", "led_d3"],
      ["led_d0", "led_d1"],
    );
  });

  it("R2 copies 1101 from R1 only when P is 1 and the clock rises", () => {
    const known = new Set(transfer.map((part) => part.id));
    for (const [index, shown] of boardShow.entries()) {
      for (const id of shown)
        expect(known.has(id), `step ${index + 1} shows ${id}`).toBe(true);
      const highlight = transferSteps[index]?.highlight;
      if (highlight)
        expect(shown, `step ${index + 1} highlight`).toContain(highlight);
    }
    const r1On = ["led_r1b3", "led_r1b2", "led_r1b0"];
    const r1Off = ["led_r1b1"];
    const r2On = ["led_r2b3", "led_r2b2", "led_r2b0"];
    const r2Off = [
      "led_r2b3",
      "led_r2b2",
      "led_r2b1",
      "led_r2b0",
      "led_loadled",
    ];
    resetSequentialState("register-transfer");
    expectOn(
      leds("register-transfer", transfer, { ld1: 0, p: 0, clk: 0 }),
      [],
      [...r1On, ...r1Off, ...r2Off],
    );
    expectOn(
      leds("register-transfer", transfer, { ld1: 1, p: 0, clk: 0 }),
      r1On,
      [...r1Off, ...r2Off],
    );
    expectOn(
      leds("register-transfer", transfer, { ld1: 1, p: 1, clk: 0 }),
      r1On,
      [...r1Off, ...r2Off],
    );
    expectOn(
      leds("register-transfer", transfer, { ld1: 1, p: 1, clk: 1 }),
      [...r1On, ...r2On, "led_loadled"],
      [...r1Off, "led_r2b1"],
    );
  });

  it("the common bus selects A, then B, then C, then D", () => {
    const known = new Set(commonBus.map((part) => part.id));
    for (const [index, shown] of busShow.entries()) {
      for (const id of shown)
        expect(known.has(id), `step ${index + 1} shows ${id}`).toBe(true);
      const highlight = busSteps[index]?.highlight;
      if (highlight)
        expect(shown, `step ${index + 1} highlight`).toContain(highlight);
    }
    const on = (ids: string[]) => ids;
    resetSequentialState("common-bus");
    expectOn(
      leds("common-bus", commonBus, { s1: 0, s0: 0 }),
      on(["led_b3", "led_b0"]),
      ["led_b2", "led_b1"],
    );
    expectOn(
      leds("common-bus", commonBus, { s1: 0, s0: 1 }),
      ["led_b2", "led_b1"],
      ["led_b3", "led_b0"],
    );
    expectOn(
      leds("common-bus", commonBus, { s1: 1, s0: 0 }),
      ["led_b3", "led_b2"],
      ["led_b1", "led_b0"],
    );
    expectOn(
      leds("common-bus", commonBus, { s1: 1, s0: 1 }),
      ["led_b1", "led_b0"],
      ["led_b3", "led_b2"],
    );
  });

  it("the tri-state bus drives C0 when S1 S0 = 10", () => {
    const known = new Set(triBus.map((part) => part.id));
    for (const [index, shown] of triShow.entries()) {
      for (const id of shown)
        expect(known.has(id), `step ${index + 1} shows ${id}`).toBe(true);
      const highlight = triSteps[index]?.highlight;
      if (highlight)
        expect(shown, `step ${index + 1} highlight`).toContain(highlight);
    }
    resetSequentialState("tri-state-bus");
    expectOn(
      leds("tri-state-bus", triBus, { e: 1, s1: 1, s0: 0 }),
      [],
      ["led_bus"],
    );
    expectOn(
      leds("tri-state-bus", triBus, { e: 0, s1: 0, s0: 0 }),
      ["led_bus"],
      [],
    );
    expectOn(
      leds("tri-state-bus", triBus, { e: 0, s1: 0, s0: 1 }),
      [],
      ["led_bus"],
    );
    expectOn(
      leds("tri-state-bus", triBus, { e: 0, s1: 1, s0: 0 }),
      ["led_bus"],
      [],
    );
    expectOn(
      leds("tri-state-bus", triBus, { e: 0, s1: 1, s0: 1 }),
      [],
      ["led_bus"],
    );
  });

  it("the adder-subtractor adds when M is 0 and subtracts when M is 1", () => {
    const known = new Set(sub4.map((part) => part.id));
    for (const [index, shown] of subShow.entries()) {
      for (const id of shown)
        expect(known.has(id), `step ${index + 1} shows ${id}`).toBe(true);
      const highlight = subSteps[index]?.highlight;
      if (highlight)
        expect(shown, `step ${index + 1} highlight`).toContain(highlight);
    }
    expectOn(
      leds("adder-subtractor", sub4, { m: 0 }),
      ["led_s3", "led_s2", "led_s0"],
      ["led_c4", "led_s1"],
    );
    expectOn(
      leds("adder-subtractor", sub4, { m: 1 }),
      ["led_c4", "led_s2", "led_s1", "led_s0"],
      ["led_s3"],
    );
  });

  it("the incrementer turns 1101 into 1110 when C0 rises", () => {
    const known = new Set(inc4.map((part) => part.id));
    for (const [index, shown] of incShow.entries()) {
      for (const id of shown)
        expect(known.has(id), `step ${index + 1} shows ${id}`).toBe(true);
      const highlight = incSteps[index]?.highlight;
      if (highlight)
        expect(shown, `step ${index + 1} highlight`).toContain(highlight);
    }
    expectOn(
      leds("binary-incrementer", inc4, { cin: 0 }),
      ["led_s3", "led_s2", "led_s0"],
      ["led_c4", "led_s1"],
    );
    expectOn(
      leds("binary-incrementer", inc4, { cin: 1 }),
      ["led_s3", "led_s2", "led_s1"],
      ["led_c4", "led_s0"],
    );
  });

  it("the arithmetic circuit walks all eight microoperations of 1101 and 0011", () => {
    const known = new Set(arith.map((part) => part.id));
    for (const [index, shown] of arithShow.entries()) {
      for (const id of shown)
        expect(known.has(id), `step ${index + 1} shows ${id}`).toBe(true);
      const highlight = arithSteps[index]?.highlight;
      if (highlight)
        expect(shown, `step ${index + 1} highlight`).toContain(highlight);
    }
    const run = (
      s1: 0 | 1,
      s0: 0 | 1,
      cin: 0 | 1,
      on: string[],
      off: string[],
    ) => expectOn(leds("arithmetic-circuit", arith, { s1, s0, cin }), on, off);
    const cout = "led_cout";
    const d3 = "led_d3";
    const d2 = "led_d2";
    const d1 = "led_d1";
    const d0 = "led_d0";
    const all = [cout, d3, d2, d1, d0];
    const dark = (on: string[]) => all.filter((id) => !on.includes(id));
    run(0, 0, 0, [cout], dark([cout]));
    run(0, 0, 1, [cout, d0], dark([cout, d0]));
    run(0, 1, 0, [cout, d3, d0], dark([cout, d3, d0]));
    run(0, 1, 1, [cout, d3, d1], dark([cout, d3, d1]));
    run(1, 0, 0, [d3, d2, d0], dark([d3, d2, d0]));
    run(1, 0, 1, [d3, d2, d1], dark([d3, d2, d1]));
    run(1, 1, 0, [cout, d3, d2], dark([cout, d3, d2]));
    run(1, 1, 1, [cout, d3, d2, d0], dark([cout, d3, d2, d0]));
  });

  it("the combinational shifter shifts 1101 in all six ways", () => {
    const known = new Set(shifter.map((part) => part.id));
    for (const [index, shown] of shiftShow.entries()) {
      for (const id of shown)
        expect(known.has(id), `step ${index + 1} shows ${id}`).toBe(true);
      const highlight = shiftSteps[index]?.highlight;
      if (highlight)
        expect(shown, `step ${index + 1} highlight`).toContain(highlight);
    }
    const h = ["led_h0", "led_h1", "led_h2", "led_h3"];
    const run = (s: 0 | 1, ir: 0 | 1, il: 0 | 1, on: string[]) =>
      expectOn(
        leds("combinational-shifter", shifter, { s, ir, il }),
        on,
        h.filter((id) => !on.includes(id)),
      );
    run(0, 0, 0, ["led_h1", "led_h2"]);
    run(1, 0, 0, ["led_h0", "led_h2"]);
    run(0, 1, 0, ["led_h0", "led_h1", "led_h2"]);
    run(1, 0, 1, ["led_h0", "led_h2", "led_h3"]);
  });

  it("the arithmetic logic shift unit walks the fourteen operations of 1101 and 0011", () => {
    const known = new Set(alsu.map((part) => part.id));
    for (const [index, shown] of alsuShow.entries()) {
      for (const id of shown)
        expect(known.has(id), `step ${index + 1} shows ${id}`).toBe(true);
      const highlight = alsuSteps[index]?.highlight;
      if (highlight)
        expect(shown, `step ${index + 1} highlight`).toContain(highlight);
    }
    const f = ["led_f0", "led_f1", "led_f2", "led_f3"];
    const run = (
      s3: 0 | 1,
      s2: 0 | 1,
      s1: 0 | 1,
      s0: 0 | 1,
      cin: 0 | 1,
      on: string[],
    ) =>
      expectOn(
        leds("arithmetic-logic-shift", alsu, { s3, s2, s1, s0, cin }),
        on,
        f.filter((id) => !on.includes(id)),
      );
    run(0, 0, 0, 0, 0, ["led_f0", "led_f1", "led_f3"]);
    run(0, 0, 0, 0, 1, ["led_f0", "led_f1", "led_f2"]);
    run(0, 0, 0, 1, 0, []);
    run(0, 0, 0, 1, 1, ["led_f3"]);
    run(0, 0, 1, 0, 0, ["led_f0", "led_f3"]);
    run(0, 0, 1, 0, 1, ["led_f0", "led_f2"]);
    run(0, 0, 1, 1, 0, ["led_f0", "led_f1"]);
    run(0, 0, 1, 1, 1, ["led_f0", "led_f1", "led_f3"]);
    run(0, 1, 0, 0, 0, ["led_f3"]);
    run(0, 1, 0, 1, 0, f);
    run(0, 1, 1, 0, 0, ["led_f0", "led_f1", "led_f2"]);
    run(0, 1, 1, 1, 0, ["led_f2"]);
    run(1, 0, 0, 0, 0, ["led_f1", "led_f2"]);
    run(1, 1, 0, 0, 0, ["led_f0", "led_f2"]);
  });

  it("the 4-bit adder sums 1101 and 0111 to 10100", () => {
    const known = new Set(adder4.map((part) => part.id));
    for (const [index, shown] of addShow.entries()) {
      for (const id of shown)
        expect(known.has(id), `step ${index + 1} shows ${id}`).toBe(true);
      const highlight = addSteps[index]?.highlight;
      if (highlight)
        expect(shown, `step ${index + 1} highlight`).toContain(highlight);
    }
    expectOn(
      leds("binary-adder-4", adder4, {}),
      ["led_c4", "led_s2"],
      ["led_s3", "led_s1", "led_s0"],
    );
  });

  it("a rising strobe latches 0101 and raises the flag", () => {
    resetSequentialState("io-organisation");
    expectOn(
      leds("io-organisation", ioPort, { stb: 0, d0: 1, d1: 0, d2: 1, d3: 0 }),
      [],
      ["led_q0", "led_q1", "led_q2", "led_q3", "led_flag"],
    );
    expectOn(
      leds("io-organisation", ioPort, { stb: 1, d0: 1, d1: 0, d2: 1, d3: 0 }),
      ["led_q0", "led_q2", "led_flag"],
      ["led_q1", "led_q3"],
    );
  });
});

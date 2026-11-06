import { type SceneProcedureStep } from "@/labs/experiments/types";
import { cacheAssociativeStepSchematics as fig } from "@/labs/schematics/semester-03/02-memory-cpu-systems/cache-associative";

import { stages } from "../components";

const placed = [...stages.power, ...stages.place];
const wired = [...placed, ...stages.wire];
const all = [...wired, ...stages.lamps];

export const procedureSteps: SceneProcedureStep[] = [
  {
    label: "A hit is a tag compare",
    body: "A fully associative cache may put a block in any line. There is no index. The hardware asks every line 'does your tag match?' and the match is the hit. This board is that question for one line whose stored tag is 10. Two XOR gates compare the bits. A NOR is true only when both differences are 0.",
    show: stages.power,
    highlight: "psu",
    schematic: fig[0],
  },
  {
    label: "Tie the stored tag to 10",
    body: "Place both XOR gates. The stored bit S0 is ground, so it is 0. S1 is +5 V, so it is 1. The incoming tag bits T0 and T1 are the jumpers you will change. Nothing on this board cares which 'row' you meant. The compare is the whole check.",
    show: [
      ...stages.power,
      "xor0",
      "xor1",
      "w_vcc_xor0",
      "w_gnd_xor0",
      "w_vcc_xor1",
      "w_gnd_xor1",
      "w_s0_gnd",
      "w_s1_vcc",
    ],
    highlight: "xor0",
    schematic: fig[1],
  },
  {
    label: "NOR the two XOR outputs",
    body: "Each XOR is 1 when its tag bit disagrees with the stored bit. NOR of those two is 1 only in the case both XORs are 0, which is tag 10. That NOR output is the hit.",
    show: wired,
    highlight: "nor1",
    schematic: fig[2],
  },
  {
    label: "LED on the hit",
    body: "The NOR drives the LED through 330 Ω. Set the tag to 10: T1 = 1 and T0 = 0.",
    show: all,
    highlight: "led_hit",
    activeInputs: { T1: 1, T0: 0 },
    schematic: fig[3],
  },
  {
    label: "10 hits, 11 misses",
    body: "T0 is now 1, so the tag is 11. One XOR is 1, the NOR is 0, and the hit LED is off. The previous step, tag 10, had it on. A direct-mapped cache can miss even when the tag matches, because the index picked a different line. This board never consulted an index. A second line would be a second copy of this compare, ORed into the same hit.",
    show: all,
    highlight: "led_hit",
    activeInputs: { T1: 1, T0: 1 },
    schematic: fig[4],
  },
];

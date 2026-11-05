import { type SceneProcedureStep } from "@/labs/experiments/types";
import { cacheDirectStepSchematics as fig } from "@/labs/schematics/semester-03/02-memory-cpu-systems/cache-direct-mapped";

import { stages } from "../components";

const placed = [...stages.power, ...stages.place];
const wired = [...placed, ...stages.wire];
const all = [...wired, ...stages.lamps];

export const procedureSteps: SceneProcedureStep[] = [
  {
    label: "Index picks the line, then the tag is checked",
    body: "A direct-mapped cache has one legal line for each index. The low address bits select that line. The high bits are the tag, and they still have to match what is stored there. Hit = line selected AND tag equal. Either one failing is a miss, even if the other succeeded.",
    show: stages.power,
    highlight: "psu",
    schematic: fig[0],
  },
  {
    label: "Use the decoder as the index",
    body: "Place the 74HC138. The index jumper is A0. Tie A1 and A2 to ground, and enable the chip (E1 high, E2 and E3 low). Address 0 makes Y0 low. Address 1 makes Y1 low and Y0 stays high. A NOT on Y0 is the active-high 'line 0 selected' signal.",
    show: [...stages.power, "dec", "nline", "w_vcc_dec", "w_gnd_dec", "w_vcc_nline", "w_gnd_nline", "w_a1_gnd", "w_a2_gnd", "w_e1_vcc", "w_e2_gnd", "w_e3_gnd", "w_idx_dec", "w_y0_not"],
    highlight: "dec",
    schematic: fig[1],
  },
  {
    label: "Compare the tag with the stored 1",
    body: "The line's stored tag bit is tied to +5 V, so it is 1. The tag jumper goes into an XOR with that 1. XOR is 0 when they match. A NOT after the XOR is the active-high match.",
    show: [...wired.filter((id) => id !== "hit" && id !== "w_vcc_hit" && id !== "w_gnd_hit" && id !== "w_line_and" && id !== "w_match_and")],
    highlight: "xor1",
    schematic: fig[2],
  },
  {
    label: "AND the line with the match",
    body: "Place the last AND. One input is the line-0 signal. The other is the tag match. Its output is the hit. Both LEDs — line and hit — go through 330 Ω.",
    show: all,
    highlight: "hit",
    schematic: fig[3],
  },
  {
    label: "Index 0 and tag 1 is a hit",
    body: "Set the index to 0 and the tag to 1. Line 0 is selected and the tag matches the stored 1. Both LEDs light. This block is allowed in this line, and the tag says it is the block we stored.",
    show: all,
    highlight: "led_hit",
    activeInputs: { IDX: 0, TAG: 1 },
    schematic: fig[4],
  },
  {
    label: "Index 1 is a conflict miss",
    body: "Leave the tag at 1 and set the index to 1. The tag still matches, but line 0 is not the line this index may use. The line LED and the hit LED both go out. That is a conflict miss: the block is cached under a different index, and direct mapping will not look there. The associative board would still have hit, because it never consulted an index.",
    show: all,
    highlight: "led_line",
    activeInputs: { IDX: 1, TAG: 1 },
    schematic: fig[5],
  },
];

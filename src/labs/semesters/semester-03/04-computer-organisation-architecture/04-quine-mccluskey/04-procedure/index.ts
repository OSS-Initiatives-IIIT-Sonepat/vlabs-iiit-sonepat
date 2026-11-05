import { type SceneProcedureStep } from "@/labs/experiments/types";
import { quineMccluskeyStepSchematics as fig } from "@/labs/schematics/semester-03/04-computer-organisation-architecture/04-quine-mccluskey";

import { stages } from "../components";

const placed = [...stages.power, ...stages.place];
const wired = [...placed, ...stages.wire];
const all = [...wired, ...stages.lamps];

export const procedureSteps: SceneProcedureStep[] = [
  {
    label: "Combine minterms that differ by one bit",
    body: "The minterms are the same list as the K-map: 0, 1, 2, 5, 6, 7, 8, 9, 10, 14. Sort them by the number of 1s. 0 stands alone. Then 1, 2, 8. Then 5, 6, 9, 10. Then 7, 14. Combine any pair that differs in one bit and replace that bit with a dash. Keep combining until nothing new appears. The unticked rows are the primes. Two of them are essential because a minterm sits in no other row: $-00-$ is $\\bar{B}\\bar{C}$ (only it covers 9) and $--10$ is $C\\bar{D}$ (only it covers 14). The pair $01-1$, which is $\\bar{A}BD$, covers the cells those two miss. The other primes, $0-01$, $011-$, and $-0-0$, are redundant. The cover is again $\\bar{B}\\bar{C} + C\\bar{D} + \\bar{A}BD$.",
    show: stages.power,
    highlight: "psu",
    schematic: fig[0],
  },
  {
    label: "Make the literals",
    body: "Place a 74HC04 and invert A, B, C, and D, the same four complements the map needed. The chart has already chosen the products. This chip only supplies the bars.",
    show: [...stages.power, "inv", "w_vcc_inv", "w_gnd_inv", "w_a_inv", "w_b_inv", "w_c_inv", "w_d_inv"],
    highlight: "inv",
    schematic: fig[1],
  },
  {
    label: "NAND each prime",
    body: "A NAND of the literals is the complement of the product. On the first 74HC00, gate 1 is $(\\bar{B}\\bar{C})'$, gate 2 is $(C\\bar{D})'$, and gate 3 is $(\\bar{A}B)'$. A following inverter turns gate 3 back into $\\bar{A}B$, because the third prime still has to be ANDed with D.",
    show: [...stages.power, "inv", "n1", "inv2", "w_vcc_inv", "w_gnd_inv", "w_vcc_n1", "w_gnd_n1", "w_vcc_inv2", "w_gnd_inv2", "w_a_inv", "w_b_inv", "w_b_n1", "w_c_inv", "w_c_n1", "w_d_inv", "w_bp_n1", "w_cp_n1", "w_dp_n1", "w_ap_n1", "w_ab_inv"],
    highlight: "n1",
    schematic: fig[2],
  },
  {
    label: "A NAND of the complements is the OR",
    body: "De Morgan says $T_1 + T_2 + T_3 = (T_1' T_2' T_3')'$. The second 74HC00 builds that with 2-input gates. Gate 1 NANDs $\\bar{A}B$ with D, which is $T_3'$. Gate 2 NANDs $T_1'$ with $T_2'$, which is $T_1 + T_2$. An inverter makes the complement of that sum, and gate 3 NANDs it with $T_3'$. The LED on gate 3 is F. This is the same cover as the K-map, built from NAND instead of AND-OR.",
    show: all,
    highlight: "n2",
    schematic: fig[3],
  },
  {
    label: "Cell 0 matches the map",
    body: "Set ABCD = 0000. The K-map LED was on, because $\\bar{B}\\bar{C}$ covers cell 0. This LED must be on too. If the chart had dropped that essential prime, cell 0 would be dark and the cover would be wrong.",
    show: all,
    highlight: "led_f",
    activeInputs: { A: 0, B: 0, C: 0, D: 0 },
    schematic: fig[4],
  },
  {
    label: "Cell 12 matches the map",
    body: "Set ABCD = 1100. No prime covers it. The LED is off, same as the AND-OR board. A redundant prime such as $-0-0$ also covers some of the 1s, but it is not required, and adding it would not turn this 0 into a 1.",
    show: all,
    highlight: "led_f",
    activeInputs: { A: 1, B: 1, C: 0, D: 0 },
    schematic: fig[5],
  },
  {
    label: "Cell 5 is the prime 01-1",
    body: "Set ABCD = 0101. The essential primes do not cover cell 5. $01-1$ does. The LED lights, which is the same answer the map gave for minterm 5. The two methods are finished when they name the same products, and these two boards are finished when the same input lights both LEDs.",
    show: all,
    highlight: "led_f",
    activeInputs: { A: 0, B: 1, C: 0, D: 1 },
    schematic: fig[6],
  },
];

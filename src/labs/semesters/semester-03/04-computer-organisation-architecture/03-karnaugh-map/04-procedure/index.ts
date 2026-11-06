import { type SceneProcedureStep } from "@/labs/experiments/types";
import { karnaughMapStepSchematics as fig } from "@/labs/schematics/semester-03/04-computer-organisation-architecture/03-karnaugh-map";

import { stages } from "../components";

const placed = [...stages.power, ...stages.place];
const wired = [...placed, ...stages.wire];
const all = [...wired, ...stages.lamps];

export const procedureSteps: SceneProcedureStep[] = [
  {
    label: "Group the 1s",
    body: "The function is $F(A,B,C,D) = \\sum m(0,1,2,5,6,7,8,9,10,14)$. Cells that differ by one variable share an edge, including the wrap from one side of the map to the other. The largest legal groups are the quad 0, 1, 8, 9, which drops A and D and leaves $\\bar{B}\\bar{C}$; the quad 2, 6, 10, 14, which leaves $C\\bar{D}$; and the pair 5, 7, which leaves $\\bar{A}BD$. Cell 12 (1100) is a 0 and is not in any group. So $F = \\bar{B}\\bar{C} + C\\bar{D} + \\bar{A}BD$.",
    show: stages.power,
    highlight: "psu",
    schematic: fig[0],
  },
  {
    label: "Build the four complements",
    body: "Place the 74HC04. Gate 1 inverts B, gate 2 inverts C, gate 3 inverts D, and gate 4 inverts A. The true variables are still on the input jumpers, so each product can take a variable or its complement.",
    show: [
      ...stages.power,
      "inv",
      "w_vcc_inv",
      "w_gnd_inv",
      "w_a_inv",
      "w_b_inv",
      "w_c_inv",
      "w_d_inv",
    ],
    highlight: "inv",
    schematic: fig[1],
  },
  {
    label: "AND each product",
    body: "Place the 74HC08. Gate 1 is $\\bar{B}\\bar{C}$. Gate 2 is $C\\bar{D}$, so it takes C true and D complement. $\\bar{A}BD$ is three literals, and the chip is a 2-input AND, so gate 3 makes $\\bar{A}B$ and gate 4 ANDs that with D.",
    show: [
      ...wired.filter(
        (id) =>
          !id.startsWith("sum") &&
          id !== "w_vcc_sum" &&
          id !== "w_gnd_sum" &&
          id !== "w_t1_or" &&
          id !== "w_t2_or" &&
          id !== "w_or_f" &&
          id !== "w_t3_or",
      ),
    ],
    highlight: "prod",
    schematic: fig[2],
  },
  {
    label: "OR the products into F",
    body: "Place the 74HC32. Gate 1 ORs the two quads. Gate 2 ORs that result with $\\bar{A}BD$. The LED on gate 2's output is F, through 330 Ω. The algebra and the wiring are now the same expression.",
    show: all,
    highlight: "sum",
    schematic: fig[3],
  },
  {
    label: "Cell 0 is inside the first quad",
    body: "Set ABCD = 0000. That is minterm 0. $\\bar{B}\\bar{C}$ is 1, so F is 1 even though the other two products are 0. The LED lights. A group only has to cover a 1. It does not have to be the only group that covers it.",
    show: all,
    highlight: "led_f",
    activeInputs: { A: 0, B: 0, C: 0, D: 0 },
    schematic: fig[4],
  },
  {
    label: "Cell 12 is a 0",
    body: "Set ABCD = 1100. That is minterm 12, which was not in the list. $\\bar{B}\\bar{C}$ is 0 because B is 1, $C\\bar{D}$ is 0 because C is 0, and $\\bar{A}BD$ is 0 because A is 1. The LED is off. If a grouping had swallowed cell 12, this lamp would be a false 1.",
    show: all,
    highlight: "led_f",
    activeInputs: { A: 1, B: 1, C: 0, D: 0 },
    schematic: fig[5],
  },
  {
    label: "Cell 5 is the pair",
    body: "Set ABCD = 0101. That is minterm 5, covered only by $\\bar{A}BD$. The LED lights again. Minterm 7 (0111) is in that same pair and would also light. The Quine–McCluskey lab reduces this same list of minterms from a chart instead of a map, and its LED must agree with this one.",
    show: all,
    highlight: "led_f",
    activeInputs: { A: 0, B: 1, C: 0, D: 1 },
    schematic: fig[6],
  },
];

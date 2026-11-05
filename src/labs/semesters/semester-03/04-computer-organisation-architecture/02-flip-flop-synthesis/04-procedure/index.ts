import { type SceneProcedureStep } from "@/labs/experiments/types";
import { flipFlopSynthesisStepSchematics as fig } from "@/labs/schematics/semester-03/04-computer-organisation-architecture/02-flip-flop-synthesis";

import { stages } from "../components";

const placed = [...stages.power, ...stages.place];
const all = [...placed, ...stages.wire, ...stages.lamps];

export const procedureSteps: SceneProcedureStep[] = [
  {
    label: "Write the excitation, then the wiring",
    body: "Synthesis starts from the characteristic table, not from a pin diagram. A JK does this on the falling edge: J=1 K=0 sets Q, J=0 K=1 clears Q, J=K=1 toggles, J=K=0 holds. To make Q follow D, the set case needs J = 1 whenever D = 1, and the clear case needs K = 1 whenever D = 0. That is J = D and K = NOT D. The forbidden SR input never appears, because J and K are always complements.",
    show: stages.power,
    highlight: "psu",
    schematic: fig[0],
  },
  {
    label: "Hold SET and CLR inactive",
    body: "Place the 74HC73. SET and CLR are active-low, so tie both to +5 V. If either were low it would force Q and the clock would not matter. Give the chip power and ground as well.",
    show: [...stages.power, "jk1", "w_vcc_jk1", "w_gnd_jk1", "w_set_vcc", "w_clr_vcc"],
    highlight: "jk1",
    schematic: fig[1],
  },
  {
    label: "Wire J = D and K = NOT D",
    body: "Place the inverter. D goes to J and to the inverter input. The inverter output goes to K. The clock goes to CLK. Q drives the LED through 330 Ω. The 74HC73 captures on the falling edge, so the procedure will raise the clock and then drop it. Start with D = 1 and the clock low.",
    show: all,
    highlight: "inv",
    activeInputs: { D: 1, CLK: 0 },
    schematic: fig[2],
  },
  {
    label: "D = 1, clock still low",
    body: "J is 1 and K is 0, which is the 'set' excitation, but the edge has not happened. Q stays off. The excitation is waiting at the pins.",
    show: all,
    highlight: "jk1",
    activeInputs: { D: 1, CLK: 0 },
    schematic: fig[3],
  },
  {
    label: "Raise the clock",
    body: "The clock is high. This is not the active edge for a 74HC73. Q does not change. The falling edge is the next step, and it will see J = 1 and K = 0.",
    show: all,
    highlight: "w_clk_jk1",
    activeInputs: { D: 1, CLK: 1 },
    schematic: fig[4],
  },
  {
    label: "Falling edge sets Q",
    body: "Drop the clock. Q lights. J was 1 and K was 0, so the flip-flop set. That is D = 1 copied into Q. A D flip-flop does this in one gate. You built it from the excitation table.",
    show: all,
    highlight: "led_q",
    activeInputs: { D: 1, CLK: 0 },
    schematic: fig[5],
  },
  {
    label: "Change D to 0 while the clock is high",
    body: "Set D = 0 and raise the clock. J is now 0 and K is 1, the 'clear' excitation. Q is still on, because the fall has not arrived. The output is holding the previous D, which is what a flip-flop is for.",
    show: all,
    highlight: "inv",
    activeInputs: { D: 0, CLK: 1 },
    schematic: fig[6],
  },
  {
    label: "Falling edge clears Q",
    body: "Drop the clock. Q goes out. J = 0 and K = 1 cleared it, so Q followed D again. The same two wires — J = D, K = NOT D — are the whole conversion. A T flip-flop is the other common synthesis: tie J and K together and the equation becomes $Q^+ = T \\oplus Q$.",
    show: all,
    highlight: "led_q",
    activeInputs: { D: 0, CLK: 0 },
    schematic: fig[7],
  },
];

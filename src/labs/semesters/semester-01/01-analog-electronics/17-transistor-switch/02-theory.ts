import { type ExperimentDefinition } from "@/labs/experiments/types";
import { transistorSwitchTheoryDiagram } from "@/labs/schematics/semester-01/01-analog-electronics/17-transistor-switch";

type Section = ExperimentDefinition["sections"][number];

export const theory: Section = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A bipolar transistor has three regions of operation. In the active region the collector current is proportional to the base current, Ic = hFE × Ib, and the transistor works as an amplifier. In cut-off and saturation it behaves like an open or a closed switch, which is how it is used in digital and control circuits.",
    "Cut-off (switch OFF). When the input is 0 V, the base-emitter junction is not forward biased (VBE < about 0.5 V), so Ib = 0 and Ic ≈ 0. No current flows through the load, there is no voltage drop across Rc or the LED, and the collector rises to the supply: VCE ≈ VCC = 5 V. The transistor acts as an open switch between collector and emitter.",
    "Saturation (switch ON). When the input is 5 V, the base-emitter junction conducts with VBE ≈ 0.7 V and the base current is Ib = (Vin − VBE) / Rb. If Ib is large enough, the collector current is limited by the load rather than by the transistor: Ic(sat) = (VCC − VLED − VCE(sat)) / Rc. VCE falls to VCE(sat) ≈ 0.1–0.2 V and the transistor acts as a closed switch. The condition for saturation is hFE × Ib > Ic(sat).",
    "Designing the base resistor. The base current needed is Ib(min) = Ic(sat) / hFE(min). In practice Ib is made two to ten times larger (overdrive) so that the transistor saturates for any device of that type: Rb ≤ (Vin − VBE) × hFE(min) / (k × Ic(sat)), where k is the overdrive factor.",
    "Values used in this experiment. VCC = 5 V, Rc = 330 Ω, red LED with VLED ≈ 1.9 V, BC547 with hFE ≈ 200. Ic(sat) ≈ (5 − 1.9 − 0.1) / 330 ≈ 9.1 mA, so Ib(min) ≈ 45 µA. With Rb = 10 kΩ, Ib = (5 − 0.7) / 10 kΩ = 0.43 mA, about nine times Ib(min), so the transistor saturates. With Rb = 1 MΩ, Ib ≈ 4.3 µA and hFE × Ib ≈ 0.86 mA, which is less than Ic(sat); the transistor stays in the active region, the LED is dim and VCE is about 3 V.",
    "Power in the switch. In cut-off the current is zero and in saturation VCE is very small, so in both states the power dissipated in the transistor, P = VCE × Ic, is small. A transistor switch therefore stays cool, while a transistor left in the active region dissipates much more power.",
  ],
  circuitDiagram: transistorSwitchTheoryDiagram,
};

import { type ExperimentDefinition } from "@/labs/experiments/types";
import { rcTransientTheoryDiagram } from "@/labs/schematics/semester-01/01-analog-electronics/15-rc-transient";

type Section = ExperimentDefinition["sections"][number];

export const theory: Section = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "When a DC voltage V is suddenly applied to a resistor R in series with an uncharged capacitor C, the capacitor voltage cannot change instantly, because that would need an infinite current. Instead the capacitor charges gradually. The current is largest at the start (V / R) and falls as the capacitor voltage rises towards V.",
    "Charging. Applying Kirchhoff's voltage law, V = iR + vC with i = C dvC/dt. The solution with vC(0) = 0 is vC(t) = V (1 − e^(−t/τ)), where τ = RC is the time constant in seconds (ohms × farads). The current is i(t) = (V / R) e^(−t/τ).",
    "Discharging. When the input returns to 0 V the capacitor discharges through R: vC(t) = V e^(−t/τ). The current flows in the opposite direction and also decays exponentially.",
    "Meaning of τ. After one time constant the capacitor has charged to 1 − e⁻¹ = 63.2% of V (or discharged to 36.8%). After 2τ, 3τ, 4τ and 5τ it reaches 86.5%, 95.0%, 98.2% and 99.3%. For practical purposes the capacitor is fully charged or discharged after 5τ. τ is also the time at which the tangent drawn at t = 0 meets the final value V.",
    "Using a square wave. A square wave that switches between 0 V and V repeats the charge and discharge continuously, so the transient can be viewed as a stable trace on the CRO. If the half-period T/2 is at least 5τ, the capacitor completes each charge and discharge. If the half-period is much shorter than τ, the capacitor never charges fully and the output becomes a small triangular wave; this is the RC integrator.",
    "Measuring τ on the CRO. Set the vertical scale so that 0 V and 5 V span the screen. On the rising curve, read the time from the start of the edge to the point where the trace crosses 63.2% of 5 V (3.16 V). On the falling curve, read the time to reach 36.8% (1.84 V). Both times equal τ.",
    "Values used in this experiment. R = 10 kΩ and C = 0.1 µF give τ = 1 ms. A 0–5 V square wave at 100 Hz has a half-period of 5 ms = 5τ, so the capacitor charges completely. Replacing R by 4.7 kΩ gives τ = 0.47 ms.",
  ],
  circuitDiagram: rcTransientTheoryDiagram,
};

import { type LabSection } from "@/labs/lab-content.types";
import { mosfetCharacteristicsTheoryDiagram } from "@/labs/schematics/semester-01/01-analog-electronics/11-mosfet-characteristics";

export const theory: LabSection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "An N-channel enhancement MOSFET has three terminals: Gate (G), Drain (D) and Source (S). No channel exists at $V_{GS} = 0$. A channel forms only when $V_{GS}$ exceeds the threshold voltage $V_{th}$, and the drain current $I_D$ is then controlled by the gate voltage.",
    "Drain (output) characteristics: the plot of $I_D$ versus $V_{DS}$ at constant $V_{GS}$. Ohmic (triode) region, for $V_{DS} < V_{GS} - V_{th}$: $I_D = K\\,[\\,2(V_{GS}-V_{th})V_{DS} - V_{DS}^2\\,]$. Saturation region, for $V_{DS} \\ge V_{GS} - V_{th}$: $I_D = K\\,(V_{GS}-V_{th})^2$, which is almost independent of $V_{DS}$. Here $K$ is the device constant in mA/V².",
    "Transfer characteristics: the plot of $I_D$ versus $V_{GS}$ at constant $V_{DS}$ (with $V_{DS}$ large enough for saturation). $I_D$ is zero for $V_{GS} \\le V_{th}$ and rises as a square law above it. The intercept of the $\\sqrt{I_D}$ versus $V_{GS}$ line on the $V_{GS}$ axis gives $V_{th}$.",
    "Transconductance: $g_m = \\Delta I_D / \\Delta V_{GS}$ at constant $V_{DS}$. Drain (output) resistance: $r_d = \\Delta V_{DS} / \\Delta I_D$ at constant $V_{GS}$.",
    "Measurement method: the drain current is found from the voltage across the drain resistor $R_D = 100\\ \\Omega$, so $I_D = V_{R_D} / R_D$. Because $V_{DS} = V_{DD} - V_{R_D}$, $V_{DD}$ must be adjusted until the $V_{DS}$ meter shows the required value.",
  ],
  circuitDiagram: mosfetCharacteristicsTheoryDiagram,
};

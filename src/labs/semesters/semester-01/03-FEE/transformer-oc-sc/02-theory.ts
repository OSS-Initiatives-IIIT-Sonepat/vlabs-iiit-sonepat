import { type TheorySection } from "@/labs/lab-content.types";
import { theoryDiagram as circuitDiagram } from "@/labs/schematics/semester-01/03-FEE/transformer-oc-sc";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The open-circuit test is made on the low-voltage winding with the high-voltage winding left open. Rated voltage is applied, so the core is at its normal flux. The wattmeter reads the core loss $W_0$, because copper loss is negligible at the small no-load current $I_0$. Then $\\cos\\phi_0 = W_0 / (V_0 I_0)$, the working current is $I_w = I_0 \\cos\\phi_0$, the magnetising current is $I_\\mu = I_0 \\sin\\phi_0$, $R_0 = V_0 / I_w$ and $X_0 = V_0 / I_\\mu$.",
    "The short-circuit test is made on the high-voltage winding with the low-voltage winding shorted. A reduced voltage $V_{sc}$ drives full-load current. The core loss is now negligible and the wattmeter reads the full-load copper loss $W_{sc}$. Referred to the high-voltage side, $Z_{01} = V_{sc} / I_{sc}$, $R_{01} = W_{sc} / I_{sc}^2$ and $X_{01} = \\sqrt{Z_{01}^2 - R_{01}^2}$.",
    "This transformer is rated $230 / 115\\,\\mathrm{V}$, $230\\,\\mathrm{VA}$. Full-load currents are $1.00\\,\\mathrm{A}$ on the $230\\,\\mathrm{V}$ side and $2.00\\,\\mathrm{A}$ on the $115\\,\\mathrm{V}$ side. The open-circuit test gives $V_0 = 115\\,\\mathrm{V}$, $I_0 = 0.20\\,\\mathrm{A}$ and $W_0 = 10.0\\,\\mathrm{W}$, so $\\cos\\phi_0 = 0.435$, $R_0 = 1.32\\,\\mathrm{k}\\Omega$ and $X_0 = 639\\,\\Omega$. The short-circuit test gives $V_{sc} = 10.0\\,\\mathrm{V}$, $I_{sc} = 1.00\\,\\mathrm{A}$ and $W_{sc} = 8.0\\,\\mathrm{W}$, so $Z_{01} = 10\\,\\Omega$, $R_{01} = 8\\,\\Omega$ and $X_{01} = 6\\,\\Omega$.",
    "At full load and unity power factor the output is $230\\,\\mathrm{W}$ and the losses are $W_0 + W_{sc} = 18\\,\\mathrm{W}$, so the efficiency is $230 / 248 = 92.7\\%$. Referred to the secondary, $R_{02} = 2\\,\\Omega$ and $X_{02} = 1.5\\,\\Omega$, and the regulation is $I_2 R_{02} / V_2 = 3.48\\%$.",
  ],
  circuitDiagram,
};

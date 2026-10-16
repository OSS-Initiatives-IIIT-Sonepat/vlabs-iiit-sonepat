import { type TheorySection } from "@/labs/lab-content.types";
import { bjtBiasTheoryDiagram } from "@/labs/schematics/semester-01/01-analog-electronics/10-bjt-bias";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "**Fixed bias** is the simplest BJT biasing method: a single resistor $R_B$ connects $V_{CC}$ to the base. The base current is $I_B = (V_{CC} - V_{BE})/R_B$ and the collector current is $I_C = \\beta I_B$. The Q-point ($I_C$, $V_{CE}$) therefore depends directly on $\\beta$, which varies by a factor of 2–4× from device to device and with temperature. A ±50 % change in $\\beta$ shifts $I_C$ by ±50 % — the circuit is thermally **unstable**.",
    "The **voltage-divider bias (VDB)** network uses $R_1$ and $R_2$ to establish a Thévenin base voltage $V_{TH} = V_{CC} \\times R_2/(R_1+R_2)$ that is essentially independent of $\\beta$ when $R_{TH} \\ll \\beta R_E$. The emitter resistor $R_E$ provides **negative feedback**: if $I_C$ rises (e.g. due to temperature), $V_E = I_E R_E$ rises, reducing $V_{BE} = V_B - V_E$, which reduces $I_B$ and hence $I_C$. This self-regulating action stabilises the Q-point.",
    "The Q-point equations for VDB are:$$V_B = V_{CC}\\frac{R_2}{R_1+R_2}, \\quad V_E = V_B - 0.7\\,\\text{V}, \\quad I_C \\approx I_E = \\frac{V_E}{R_E}$$$$V_{CE} = V_{CC} - I_C(R_C + R_E)$$For the circuit under test ($V_{CC}=12\\,\\text{V}$, $R_1=100\\,\\text{k}\\Omega$, $R_2=10\\,\\text{k}\\Omega$, $R_C=4.7\\,\\text{k}\\Omega$, $R_E=1\\,\\text{k}\\Omega$): $V_B \\approx 1.09\\,\\text{V}$, $I_C \\approx 0.39\\,\\text{mA}$, $V_{CE} \\approx 9.8\\,\\text{V}$.",
    "For fixed bias with $R_B = 470\\,\\text{k}\\Omega$ and $\\beta = 200$: $I_B \\approx 24\\,\\mu\\text{A}$, $I_C \\approx 4.8\\,\\text{mA}$, $V_{CE} = 12 - 4.8 \\times 10^{-3}(4700) \\approx -10.6\\,\\text{V}$ — the transistor is **saturated** ($V_{CE} < V_{CE,sat}$). This shows how fixed bias can drive the device out of the active region if $\\beta$ is high, while VDB keeps it well within the linear region for any $\\beta$ in the range 50–600.",
  ],
  circuitDiagram: bjtBiasTheoryDiagram,
};

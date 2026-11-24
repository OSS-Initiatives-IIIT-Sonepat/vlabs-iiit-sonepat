import { type TheorySection } from "@/labs/lab-content.types";
import { theoryDiagram as circuitDiagram } from "@/labs/schematics/semester-01/01-analog-electronics/19-ce-transistor-characteristics";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "In the common-emitter configuration the emitter is common to the input and the output. The input voltage is $V_{BE}$, the input current is $I_B$, the output voltage is $V_{CE}$ and the output current is $I_C$. For active-region operation the base-emitter junction is forward biased and the collector-base junction is reverse biased.",
    "The input characteristic is $I_B$ against $V_{BE}$ at constant $V_{CE}$. It has the shape of a forward diode: $I_B$ is negligible until $V_{BE}$ is about $0.6\\,\\mathrm{V}$ and then rises steeply. A higher $V_{CE}$ shifts the curve slightly. The input resistance is $r_i = \\Delta V_{BE} / \\Delta I_B$ at constant $V_{CE}$, typically about a kilohm.",
    "The output characteristic is $I_C$ against $V_{CE}$ at constant $I_B$. In the active region $I_C = \\beta I_B$ and the curves are nearly flat. The slight upward slope is the Early effect. The output resistance is $r_o = \\Delta V_{CE} / \\Delta I_C$ at constant $I_B$, and the current gain is $\\beta = I_C / I_B$.",
    "This experiment uses a BC547 with $R_B = 100\\,\\mathrm{k}\\Omega$. At $V_{CE} = 5\\,\\mathrm{V}$ and $I_B = 40\\,\\mu\\mathrm{A}$, $V_{BE} = 0.69\\,\\mathrm{V}$ and $I_C = 4.10\\,\\mathrm{mA}$, so $\\beta = 102.5$. From $I_B = 20\\,\\mu\\mathrm{A}$ to $40\\,\\mu\\mathrm{A}$, $r_i = 1.0\\,\\mathrm{k}\\Omega$. From $V_{CE} = 2\\,\\mathrm{V}$ to $5\\,\\mathrm{V}$ at $I_B = 40\\,\\mu\\mathrm{A}$, $r_o = 50\\,\\mathrm{k}\\Omega$.",
  ],
  circuitDiagram,
};

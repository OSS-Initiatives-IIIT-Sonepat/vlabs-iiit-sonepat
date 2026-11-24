import { type TheorySection } from "@/labs/lab-content.types";
import { theoryDiagram as circuitDiagram } from "@/labs/schematics/semester-01/03-FEE/maximum-power-transfer";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A DC source with an internal resistance $R_s$ feeds a load $R_L$. The current is $I_L = V_s / (R_s + R_L)$ and the load voltage is $V_L = I_L R_L$. The power absorbed by the load is $P_L = I_L^2 R_L = V_s^2 R_L / (R_s + R_L)^2$.",
    "Differentiating $P_L$ with respect to $R_L$ and setting the derivative to zero gives the maximum at $R_L = R_s$. The maximum power is $P_{max} = V_s^2 / (4 R_s)$. At that point half the source voltage appears across the load and half across $R_s$, so the efficiency is 50%. A larger load takes less current and the power falls again.",
    "In this experiment $V_s = 9\\,\\mathrm{V}$ and $R_s = 100\\,\\Omega$. Then $P_{max} = 81 / 400 = 202.5\\,\\mathrm{mW}$, at $I_L = 45.0\\,\\mathrm{mA}$ and $V_L = 4.50\\,\\mathrm{V}$. A $47\\,\\Omega$ load draws $61.2\\,\\mathrm{mA}$ at $2.88\\,\\mathrm{V}$ ($176.3\\,\\mathrm{mW}$). A $220\\,\\Omega$ load draws $28.1\\,\\mathrm{mA}$ at $6.19\\,\\mathrm{V}$ ($174.0\\,\\mathrm{mW}$). Both are below the matched value.",
  ],
  circuitDiagram,
};

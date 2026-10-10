import { type LabSection } from "@/labs/lab-content.types";

export const theory: LabSection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A P-N junction diode is a two-terminal semiconductor device that conducts current predominantly in one direction.",
    "In forward bias, the P-side (anode) is connected to the positive terminal and the N-side (cathode) to the negative terminal. The depletion region narrows and the forward current remains small until the applied voltage reaches the knee or cut-in voltage. For a silicon diode, the cut-in voltage is typically around 0.7 V.",
    "In reverse bias, the P-side is connected to the negative terminal and the N-side to the positive terminal. The depletion region widens and only a small reverse saturation current flows until breakdown is reached.",
    "The V-I characteristic is obtained by varying the applied diode voltage and recording the corresponding diode current.",
    "For the forward characteristic, plot diode voltage V_D on the X-axis and diode current I_D on the Y-axis. The reverse characteristic is obtained similarly using reverse voltage and reverse current.",
  ],
};

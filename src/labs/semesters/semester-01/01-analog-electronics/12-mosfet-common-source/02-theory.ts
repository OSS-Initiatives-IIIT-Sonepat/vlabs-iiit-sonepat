import { type TheorySection } from "@/labs/lab-content.types";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "An n-channel enhancement MOSFET has three terminals: gate (G), drain (D) and source (S). No channel exists until $V_{GS}$ exceeds the threshold voltage $V_{th}$ (about 2.1 V for the 2N7000 used here). Below $V_{th}$ the device is in cut-off and $I_D \\approx 0$.",
    "Once $V_{GS} > V_{th}$ a channel forms. For $V_{DS} < V_{GS} - V_{th}$ the MOSFET works in the triode (ohmic) region and behaves like a voltage-controlled resistor. For $V_{DS} \\ge V_{GS} - V_{th}$ the channel pinches off and the device works in the saturation region, where the drain current is given by the square-law relation $I_D = K\\,(V_{GS} - V_{th})^2$.",
    "In the common source configuration the source is the terminal common to input and output. The input signal is applied at the gate and the output is taken from the drain. A drain resistor $R_D$ connects the drain to the supply $V_{DD}$, so the drain voltage is $V_{DS} = V_{DD} - I_D R_D$. This is the DC load line; the operating point (Q-point) is where the load line meets the transfer characteristic. To use the MOSFET as an amplifier, the Q-point is placed in the saturation region.",
    "The gate draws almost no DC current, so the gate bias voltage $V_{GG}$ is applied through a large resistor $R_G$ without changing $V_{GS}$. The input coupling capacitor $C_{in}$ passes the AC signal to the gate while blocking the DC bias of the signal source. The output coupling capacitor $C_{out}$ passes only the AC component of the drain voltage to the load $R_L$.",
    "For small signals the transconductance is $g_m = \\dfrac{\\partial I_D}{\\partial V_{GS}} = 2K\\,(V_{GS} - V_{th})$. The small-signal voltage gain, neglecting the drain resistance $r_o$, is $A_v = \\dfrac{v_{out}}{v_{in}} = -g_m\\,(R_D \\parallel R_L)$. The negative sign means the output is 180° out of phase with the input: when the gate voltage rises, $I_D$ rises, the drop across $R_D$ rises and the drain voltage falls.",
    "For the values used in this experiment ($V_{DD} = 10$ V, $R_D = 1\\,\\text{k}\\Omega$, $R_L = 10\\,\\text{k}\\Omega$, $V_{GS} \\approx 3$ V, $K \\approx 5\\,\\text{mA/V}^2$) the expected values are $I_D \\approx 4$ mA, $V_{DS} \\approx 6$ V, $g_m \\approx 9$ mS and $|A_v| \\approx 8$. Actual values depend on the individual device because $V_{th}$ and $K$ vary from part to part.",
  ],
};

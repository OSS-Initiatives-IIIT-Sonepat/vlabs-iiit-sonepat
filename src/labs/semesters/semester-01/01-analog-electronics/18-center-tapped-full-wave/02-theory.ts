import { type TheorySection } from "@/labs/lab-content.types";
import { theoryDiagram as circuitDiagram } from "@/labs/schematics/semester-01/01-analog-electronics/18-center-tapped-full-wave";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A centre-tapped secondary has two equal voltages in series, with the tap as the common return. During one half-cycle the end S1 is positive with respect to the tap, so D1 conducts and D2 is off. During the next half-cycle S2 is positive, so D2 conducts and D1 is off. The load current is in the same direction on both halves, and the ripple frequency is $2f$.",
    "If each half has peak value $V_m$, one diode drops about $0.7\\,\\mathrm{V}$, and the DC output without a filter is $V_{dc} = 2(V_m - 0.7)/\\pi$. The peak inverse voltage of each diode is $2V_m$, the full end-to-end secondary peak, because the idle diode sees both halves in series.",
    "Each half of this secondary is $12\\,\\mathrm{V}$ rms, so $V_m = 16.97\\,\\mathrm{V}$. Then $V_{dc} = 10.36\\,\\mathrm{V}$ across a $1\\,\\mathrm{k}\\Omega$ load, and $I_{dc} = 10.36\\,\\mathrm{mA}$. With a $100\\,\\mu\\mathrm{F}$ capacitor the ripple is $V_r = I_{dc}/(2fC) = 1.04\\,\\mathrm{V}$ peak-to-peak and the DC voltage rises to about $15.75\\,\\mathrm{V}$.",
  ],
  circuitDiagram,
};

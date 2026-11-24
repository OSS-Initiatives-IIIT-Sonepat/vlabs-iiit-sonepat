import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The centre-tapped rectifier conducts on both half-cycles, so the ripple frequency is 100 Hz and $V_{dc} = 10.36\\,\\mathrm{V}$ without a filter.",
    "The $100\\,\\mu\\mathrm{F}$ capacitor raises the DC output to $15.75\\,\\mathrm{V}$ and cuts the ripple to $1.04\\,\\mathrm{V}$ peak-to-peak. Each diode must be rated for a peak inverse voltage of $2V_m$.",
  ],
};

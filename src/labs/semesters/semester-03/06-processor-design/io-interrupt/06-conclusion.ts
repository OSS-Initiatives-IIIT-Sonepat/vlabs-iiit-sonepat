import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The keyboard fills INPR and raises FGI. The printer takes OUTR and raises FGO when it is finished. AC exchanges the 8-bit character in parallel, and the six input-output instructions move it, test the flags, and turn IEN on or off.",
    "If IEN is set and either flag is set, R becomes 1 and the next cycle is an interrupt. RT0, RT1, and RT2 save PC at location 0, set PC to 1, and clear IEN, R, and SC. The service program returns through the address that was saved.",
  ],
};

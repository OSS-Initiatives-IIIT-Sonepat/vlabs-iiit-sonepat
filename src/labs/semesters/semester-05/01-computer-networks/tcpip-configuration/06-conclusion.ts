import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The address names the host, the mask decides which hosts are local, and the gateway is where everything else is sent. All three must be right for a host to reach beyond its own network.",
    "When a host can reach some hosts but not others, check the mask and gateway first, with ipconfig /all, before looking at cables or routers.",
  ],
};

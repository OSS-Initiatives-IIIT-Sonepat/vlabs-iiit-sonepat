import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "A router is configured in layers of modes: privileged mode to look, global mode to change, and interface mode to set each port. Every port needs an address and no shutdown before it carries traffic, and the result must be saved to NVRAM.",
    "The same commands work in Packet Tracer and on real Cisco routers, so a design can be tried in the simulator first and then typed into the hardware.",
  ],
};

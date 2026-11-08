import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "ipconfig, ping, tracert and netstat each look at one part of the path: the host's own settings, reachability, the routers in between, and the connections in use. Together they place almost any fault at the right layer.",
    "Working from the cable up to names, one command at a time, finds the fault without guessing.",
  ],
};

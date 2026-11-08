import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "Two peers need only matching NICs, the right cable, and addresses in one network. A switch adds ports without changing anything the peers see. A router puts each peer in its own network, so each one needs a gateway, and each hop lowers the TTL.",
  ],
};

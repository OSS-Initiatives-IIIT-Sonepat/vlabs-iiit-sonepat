import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "A NIC needs a slot or port, a driver, and an address before the computer can use the network. Device Manager, the link LED and ipconfig /all confirm each of these in turn.",
    "Wired and wireless NICs both carry Ethernet-style frames with MAC addresses, so file sharing works the same way over each. A switched wired link is full duplex and private to each PC. A Wi-Fi channel is shared, half duplex and slower, but needs no cable.",
  ],
};

import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "TCP turns IP's best-effort packets into a reliable byte stream by setting up a connection, numbering and acknowledging every byte, resending what is lost, and closing the connection in an orderly way.",
    "A TCP server is a listening socket plus one connected socket per client. Each connection is identified by four numbers: the two addresses and the two ports.",
  ],
};

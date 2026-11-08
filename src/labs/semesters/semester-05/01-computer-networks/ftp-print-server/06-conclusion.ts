import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "FTP keeps commands and data apart: one control connection on port 21 and a fresh data connection for each transfer. It is simple and fast on a LAN, but it must be wrapped in TLS, or replaced by SFTP, wherever the traffic could be read.",
    "A print server shares one printer with the whole LAN and queues the jobs. The client needs only the printer's network name.",
  ],
};

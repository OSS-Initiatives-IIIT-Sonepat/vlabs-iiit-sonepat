import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "UDP adds only ports and a checksum to IP. It is fast and simple, and allows broadcast, but leaves reliability, ordering and retrying to the program.",
    "Choose TCP when every byte must arrive in order, such as for files and web pages. Choose UDP when speed matters more than a lost message, or when one message is the whole conversation, as in DNS.",
  ],
};

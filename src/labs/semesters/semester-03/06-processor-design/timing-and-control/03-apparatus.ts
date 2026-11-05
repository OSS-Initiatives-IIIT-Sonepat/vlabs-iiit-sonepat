import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Sequence counter", specification: "Decoded into T0, T1, T2, …", quantity: "1" },
    { name: "Instruction decoder", specification: "D0 to D7 from the opcode", quantity: "1" },
    { name: "Control gates", specification: "A transfer happens when its D and T are both 1", quantity: "1" },
  ],
};

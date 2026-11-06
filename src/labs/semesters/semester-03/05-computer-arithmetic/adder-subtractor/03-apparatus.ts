import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "Breadboard",
      specification: "Long, with 5 V rails",
      quantity: "1",
    },
    { name: "4-bit adder", specification: "74HC283", quantity: "1" },
    {
      name: "XOR gate",
      specification: "74HC86, one gate per B bit",
      quantity: "4",
    },
    {
      name: "Mode switch M",
      specification: "Tied to every XOR and to C0",
      quantity: "1",
    },
    {
      name: "LED",
      specification: "330 Ω, carry C4 and sum bits S3 to S0",
      quantity: "5",
    },
  ],
};

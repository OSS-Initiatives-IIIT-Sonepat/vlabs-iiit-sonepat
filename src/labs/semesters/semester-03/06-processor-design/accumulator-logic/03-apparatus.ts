import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Accumulator", specification: "AC, 16 bits, with LD, INR, and CLR", quantity: "1" },
    { name: "Adder and logic circuit", specification: "forms AND, ADD, transfer, complement, and shift", quantity: "1" },
    { name: "AND gates", specification: "D0T5, D1T5, D2T5, pB11, and rB9", quantity: "5" },
    { name: "OR gate", specification: "combines the load controls into LD", quantity: "1" },
    { name: "Control lines", specification: "B5 to INR, B11 to CLR, and the clock", quantity: "3" },
  ],
};

import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  lead: "The package in the scene is the 8085. These are the parts a board adds around it. This lab names the pins. Nothing is wired on a breadboard.",
  items: [
    {
      name: "8085A microprocessor",
      specification: "40-pin DIP, single +5 V supply, NMOS",
      quantity: "1",
    },
    {
      name: "Crystal",
      specification: "6 MHz across X1 and X2, so CLK (OUT) is 3 MHz",
      quantity: "1",
    },
    {
      name: "Octal latch",
      specification: "74HC373, holds A0 to A7 when ALE falls",
      quantity: "1",
    },
    {
      name: "Pin diagram",
      specification:
        "The corner drawing, filled in one group of pins at a time",
      quantity: "1",
    },
  ],
};

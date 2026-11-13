import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Arduino Uno R3", specification: "ATmega328P, 14 digital + 6 analog pins", quantity: "1" },
    { name: "USB-B cable", specification: "Connects the Uno to the PC", quantity: "1" },
    { name: "Arduino IDE 2.x", specification: "Free editor and uploader (runs on a PC)", quantity: "1" },
  ],
};

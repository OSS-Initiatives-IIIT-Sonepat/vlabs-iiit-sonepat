import { type TheorySection } from "@/labs/lab-content.types";
import { ledFromPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A microcontroller is a computer on one chip. It has a CPU, memory and programmable input/output pins. The PIC18F4550 is a popular 8-bit family with low power use and easy programming. Its GPIO pins drive LEDs and read switches, like the Arduino pins in the earlier subject.",
    "Every instruction takes a fixed number of clock cycles, so the clock sets the time a delay really lasts. The OSCCON register selects the internal oscillator frequency. In this experiment the IRCF bits select 8 MHz (0x70) or 4 MHz (0x60). The same delay routine takes twice as long at 4 MHz, because each cycle is twice as long.",
    "A software delay is a loop that counts down. It wastes CPU time, but it is simple and it shows the link between clock and time. Later experiments use the hardware timer, which does not block the CPU.",
    "The LED is driven from RD0 through a 330 ohm resistor, the same current-limiting rule as before.",
  ],
  circuitDiagram: ledFromPin("PIC18 RD0", "330 ohm")[3],
};

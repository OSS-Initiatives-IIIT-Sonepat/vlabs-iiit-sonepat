import { type TheorySection } from "@/labs/lab-content.types";
import { adcChain } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The ADC0804 is an 8-bit successive-approximation converter in a 20-pin package. It converts the voltage between VIN+ and VIN- into a count from 0 to 255 for a 0 to 5 V input, so each step is 5 / 256 = 19.5 mV. Its clock comes from an RC network on CLKR: 10 kohm and 150 pF give about 640 kHz.",
    "The chip needs three control signals. A low pulse on WR starts a conversion. When the result is ready, INTR goes low. Then RD goes low to put the 8-bit result on the data bus DB0 to DB7. CS is tied low so the chip is always selected.",
    "The 8051 writes 0xFF to P1 first, so the port pins act as inputs, and then reads the data bus. For VIN = 2.5 V the output is 2.5 / 5 x 256 = 128, which is 1000 0000 in binary.",
  ],
  circuitDiagram: adcChain()[4],
};

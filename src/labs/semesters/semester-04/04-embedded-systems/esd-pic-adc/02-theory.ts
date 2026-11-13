import { type TheorySection } from "@/labs/lab-content.types";
import { dividerOnPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The PIC18F4550 has a 10-bit successive-approximation ADC with 13 analog inputs (AN0 to AN12). The converter compares the input with the reference (VDD and VSS here) and returns a count from 0 to 1023. A conversion takes a fixed number of acquisition and conversion time periods, set by ADCON2.",
    "Choose the channel in ADCON0 (CHS bits), turn the module on, set GO, and wait until GO clears. The 10-bit result is in ADRESH and ADRESL. With ADFM = 1 the result is right-justified, so the value is (ADRESH << 8) | ADRESL.",
    "The input here is a voltage divider: two 10 kohm resistors make 2.5 V at the middle. The ADC reads 2.5 / 5 x 1023 = 512. Half-scale is the switching point for the LED.",
  ],
  circuitDiagram: dividerOnPin("PIC18 RA0 (AN0)")[4],
};

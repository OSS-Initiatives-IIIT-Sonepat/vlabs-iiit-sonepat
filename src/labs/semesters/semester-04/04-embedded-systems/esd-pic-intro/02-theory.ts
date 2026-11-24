import { type TheorySection } from "@/labs/lab-content.types";
import { introPicDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The PIC18F4550 is an 8-bit microcontroller from Microchip. It has 32 KB of flash program memory, 2 KB of RAM, a 10-bit ADC with 13 inputs, timers, PWM outputs, a serial port and a full-speed USB port, in a 40-pin package.",
    "Its 35 I/O pins are grouped into ports A to E. Every port has three registers: TRIS sets the direction of each pin (0 = output, 1 = input), LAT is written to drive outputs, and PORT is read to see the level on the pins.",
    "Like any microcontroller it needs a minimal system: supply on both VDD/VSS pairs with a 100 nF capacitor across each, a clock, and MCLR held HIGH. The clock can come from the internal oscillator (up to 8 MHz), so this circuit needs no crystal.",
    "Configuration bits, set with #pragma config lines in the program, choose the oscillator and turn features such as the watchdog timer on or off. They are programmed together with the code.",
  ],
  circuitDiagram: introPicDiagrams[3],
};

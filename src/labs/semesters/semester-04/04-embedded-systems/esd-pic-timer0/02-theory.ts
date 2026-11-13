import { type TheorySection } from "@/labs/lab-content.types";
import { picRd0Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A timer is a counter that increments on every clock pulse. The PIC18F4550 clock here is 8 MHz, and the instruction clock is one quarter of it, 2 MHz. A prescaler divides that again: a 1:64 prescale gives 2 MHz / 64 = 31 250 counts per second.",
    "Timer0 can be 8 or 16 bits wide. In 16-bit mode it counts from its starting value up to 65 536, then overflows back to zero and sets the TMR0IF flag. Starting the count at 49 911 means 65 536 - 49 911 = 15 625 counts, which is 0.5 s at 31 250 counts per second.",
    "An interrupt runs a function as soon as an event happens. When TMR0IF is set and the TMR0 interrupt is enabled, the CPU jumps to the interrupt service routine (ISR). The ISR clears the flag, reloads the timer and toggles the LED. The main loop does nothing, so the timing does not depend on how long the loop takes.",
  ],
  circuitDiagram: picRd0Diagrams[3],
};

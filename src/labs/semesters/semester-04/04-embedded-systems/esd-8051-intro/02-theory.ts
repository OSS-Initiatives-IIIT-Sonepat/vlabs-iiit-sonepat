import { type TheorySection } from "@/labs/lab-content.types";
import { intro8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The 8051 is an 8-bit microcontroller first made by Intel in 1980, and still made by many companies. One chip holds a CPU, program memory, data memory, timers, a serial port and 32 I/O pins. The AT89S52 used here has 8 KB of flash program memory, 256 bytes of RAM and three 16-bit timers, and it can be programmed while it sits in the circuit (ISP).",
    "The 32 I/O pins form four 8-bit ports, P0 to P3. Writing a byte to a port sets all eight pins at once. P1 is plain I/O. P3 pins also have second functions (serial port, interrupts, timer inputs, memory control). P0 and P2 become the address and data bus when external memory is used.",
    "A microcontroller does not run just because it has power. It needs three things, the minimal system: a supply (VCC and GND, with EA tied HIGH to use the internal program memory), a clock (a crystal and two small capacitors on XTAL1 and XTAL2) and a reset (RST held HIGH briefly at power-up). The procedure builds these one at a time.",
    "An 8051 port pin is quasi-bidirectional: a 0 pulls it LOW hard, a 1 only lets an internal pull-up hold it HIGH. That is why LEDs on an 8051 are wired from +5 V into the pin and light on a 0.",
  ],
  circuitDiagram: intro8051Diagrams[4],
};

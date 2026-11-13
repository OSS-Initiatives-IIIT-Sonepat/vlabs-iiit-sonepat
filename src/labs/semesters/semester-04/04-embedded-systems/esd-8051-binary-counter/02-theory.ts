import { type TheorySection } from "@/labs/lab-content.types";
import { ledFromPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The 8051 is an 8-bit microcontroller with four 8-bit ports, P0 to P3. Writing a value to a port sets all its pins at once: writing 0x05 to P1 makes P1.0 and P1.2 high and the rest low. A binary counter is therefore just a number written to a port, increased once every time interval.",
    "Each LED is driven from its port pin through a 330 ohm resistor, the same current limit as before. In this circuit a pin at 5 V lights its LED. The four LEDs show the count from 0000 (0) to 1111 (15) in binary, with P1.0 the least significant bit.",
    "The program masks the count with 0x0F, so after 15 it wraps back to 0. A stop value works the same way: when the count reaches it, the program restarts. The source experiment lets the stop value range from 0 to 255 and the update frequency be changed while it runs; this trainer does the same with the constants in the code.",
  ],
  circuitDiagram: ledFromPin("8051 P1.0", "330 ohm")[3],
};

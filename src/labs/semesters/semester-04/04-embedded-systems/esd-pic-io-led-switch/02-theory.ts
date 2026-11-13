import { type TheorySection } from "@/labs/lab-content.types";
import { buttonOnPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Every PIC18 port has three registers per port. TRISx sets the direction of each pin: a 1 makes it an input and a 0 makes it an output. PORTx reads the pin level, and LATx holds the value written to an output. For example, TRISB bit 0 = 1 makes RB0 an input.",
    "A push-button on an input needs a defined level when it is open. Here a 10 kohm pull-down holds RB0 at 0 V. Pressing the button connects RB0 to +5 V, and the pin reads HIGH. The LED on RD0 is current-sourced: it lights when the pin is HIGH.",
    "The PIC analog pins are shared with the digital inputs. ADCON1 must be set so that RB0 is digital. This experiment writes ADCON1 = 0x0F to make every pin digital.",
    "Two wiring choices are common: a pull-down with a button to VCC (used here), or a pull-up with the button to ground. Both give a steady level when the button is open.",
  ],
  circuitDiagram: buttonOnPin("PIC18 RB0", "down")[3],
};

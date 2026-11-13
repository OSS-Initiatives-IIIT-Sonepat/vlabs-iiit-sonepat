import { type TheorySection } from "@/labs/lab-content.types";
import { arduinoButtonDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A floating input pin picks up noise and reads randomly. A button alone is not enough, because an open button leaves the pin floating. The fix is a pull-up: a resistor that holds the pin at +5 V when nothing else pulls it down.",
    "The ATmega328P has a built-in pull-up of about 20 to 50 kohm on every digital pin. Calling pinMode(2, INPUT_PULLUP) switches it on, so no external resistor is needed. With the button open, D2 reads HIGH (1). When the button is pressed, it joins D2 to GND and D2 reads LOW (0). The logic is therefore inverted: pressed means LOW.",
    "Push-buttons also bounce. The contacts make and break several times in a few milliseconds. Short sketches can read this as several presses. A delay(20) after a change is a common simple fix, and it is good enough for this experiment.",
  ],
  circuitDiagram: arduinoButtonDiagrams[3],
};

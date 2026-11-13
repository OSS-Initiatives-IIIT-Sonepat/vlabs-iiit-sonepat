import { type TheorySection } from "@/labs/lab-content.types";
import { buttonOnPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "An up counter adds one each step and a down counter subtracts one. A single program can do both: it reads an input pin each step and chooses the direction. This is the basic pattern of a control decision in an embedded program.",
    "The 8051 quasi-bidirectional ports have internal pull-ups. Writing 1 to a port pin makes it weakly high, so a button between the pin and ground reads HIGH when released and LOW when pressed. This is why P3.2 is set to 1 before it is read.",
    "The wrap-around is done with the mask 0x0F, so the count runs 0 to 15 and then wraps: 15 to 0 when counting up, and 0 to 15 when counting down.",
  ],
  circuitDiagram: buttonOnPin("8051 P3.2", "up")[3],
};

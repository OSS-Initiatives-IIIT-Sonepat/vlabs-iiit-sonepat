import { type TheorySection } from "@/labs/lab-content.types";
import { triStateBusTheoryDiagram } from "@/labs/schematics/semester-03/05-computer-arithmetic/tri-state-bus";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A tri-state buffer has the usual 0 and 1, and a third state called high impedance. In that state the output is an open circuit. It does not drive the wire.",
    "Control C decides. When C is 1 the buffer copies its normal input, so Y = A. When C is 0 the output stays in high impedance no matter what A is.",
    "Tie the four outputs together and they become one bus line. Only one buffer may be on. The others stay in high impedance, or two drivers would fight.",
    "A 2×4 decoder makes that promise. Its select inputs turn on exactly one output. On the figure, S1 S0 = 10 lights output 2, and the C0 buffer drives the bus. When the decoder enable is 0, every output is 0 and the bus floats.",
    "The parts on the board are a 74HC139 and four 74HC125 buffers. Both use active-low enables, so the decoder output that goes low is the buffer that turns on. A0 is tied to 1, B0 to 0, C0 to 1, and D0 to 0.",
  ],
  circuitDiagram: triStateBusTheoryDiagram,
};

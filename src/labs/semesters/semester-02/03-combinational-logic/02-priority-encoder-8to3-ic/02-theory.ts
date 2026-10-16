import { type ExperimentDefinition } from "@/labs/experiments/types";
import { priorityEncoder8to3IcTheoryDiagram } from "@/labs/schematics/semester-02/03-combinational-logic/02-priority-encoder-8to3-ic";

type Section = ExperimentDefinition["sections"][number];

export const theory: Section = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "An encoder performs the opposite function of a decoder: it has 2ⁿ input lines and n output lines, and produces the binary code of the input that is active. A simple encoder assumes that only one input is active at a time; if two inputs are active together its output is wrong.",
    "A priority encoder removes this restriction by giving each input a priority. When several inputs are active at once, the output is the code of the input with the highest priority, and lower-priority inputs are ignored. Priority encoders are used for interrupt controllers, keyboard encoders and to find the position of the most significant 1 in a binary word.",
    "The 74HC148 is an 8-to-3 line priority encoder in a 16-pin package. I7 has the highest priority and I0 the lowest. All inputs and outputs are active LOW: an input is active when it is 0, and the outputs A2 A1 A0 give the complement of the binary code. For example, if I5 is the highest active input, A2 A1 A0 = 010, which is the complement of 101.",
    "Enable and status signals. EI' (enable input, active LOW) must be 0 for the encoder to work; when EI' = 1 every output is HIGH. GS' (group select) goes LOW when the encoder is enabled and at least one input is active, which distinguishes 'I0 active' from 'no input active' (both give A2 A1 A0 = 111). EO' (enable output) goes LOW when the encoder is enabled but no input is active. Connecting EO' of one chip to EI' of a second chip cascades two encoders into a 16-to-4 priority encoder.",
    "Pin connections (datasheet). I4 pin 1, I5 pin 2, I6 pin 3, I7 pin 4, EI' pin 5, A2 pin 6, A1 pin 7, GND pin 8, A0 pin 9, I0 pin 10, I1 pin 11, I2 pin 12, I3 pin 13, GS' pin 14, EO' pin 15, VCC pin 16.",
    "LED indicators. Each output drives an LED as a current sink, from +5 V through 330 Ω to the output pin, so an LED lights when its output is LOW. Because the code outputs are inverted, the lit pattern of the A2, A1 and A0 LEDs reads the true binary number of the highest active input.",
  ],
  circuitDiagram: priorityEncoder8to3IcTheoryDiagram,
};

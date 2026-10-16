import { type ExperimentDefinition } from "@/labs/experiments/types";
import { decoder3to8IcTheoryDiagram } from "@/labs/schematics/semester-02/03-combinational-logic/01-decoder-3to8-ic";

type Section = ExperimentDefinition["sections"][number];

export const theory: Section = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A decoder is a combinational circuit with n inputs and up to 2ⁿ outputs. For each input combination exactly one output is active, so the decoder recognises a binary code and selects one line. Each output corresponds to one minterm of the inputs, which is why a decoder with an OR gate can implement any Boolean function of its inputs.",
    "The 74HC138 is a 3-to-8 line decoder in a 16-pin package. Its address inputs are A0 (pin 1, least significant), A1 (pin 2) and A2 (pin 3). Its outputs Y0–Y7 are active LOW: the selected output is 0 and the other seven are 1. Output Yn is selected when 4A2 + 2A1 + A0 = n.",
    "Enable inputs. The chip has three enables: E1 (pin 6) is active HIGH and E2' (pin 4) and E3' (pin 5) are active LOW. The decoder works only when E1 = 1 and E2' = E3' = 0; otherwise every output is HIGH. Logically, Yn' = E1 · E2'' · E3'' · mn, where mn is the nth minterm of A2, A1 and A0. The enables make it easy to cascade chips: two 74HC138s with the fourth address bit A3 driving E1 of one chip and E2' of the other form a 4-to-16 decoder.",
    "The same chip can be used as a 1-to-8 demultiplexer: the data signal is applied to one of the enables and appears (inverted or not, depending on the enable used) at the output selected by A2 A1 A0.",
    "Pin connections. VCC is pin 16 and GND is pin 8. Outputs: Y0 pin 15, Y1 pin 14, Y2 pin 13, Y3 pin 12, Y4 pin 11, Y5 pin 10, Y6 pin 9 and Y7 pin 7.",
    "LED indicators for active-LOW outputs. If an LED were connected from an output to ground, seven LEDs would be lit and the selected one dark, which is hard to read. Instead each LED is connected as a current sink, from +5 V through a 330 Ω resistor to the output. Current flows only when the output is LOW, so only the selected output's LED lights. A 74HC output can sink about 4 mA at a guaranteed LOW level and up to 25 mA absolute; with 330 Ω and a red LED the current is about 9 mA, which is acceptable for one output at a time.",
  ],
  circuitDiagram: decoder3to8IcTheoryDiagram,
};

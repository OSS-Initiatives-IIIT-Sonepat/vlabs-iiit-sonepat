import { type TheorySection } from "@/labs/lab-content.types";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A demultiplexer (DEMUX) does the reverse of a multiplexer: it takes one data input and routes it to one of several outputs, chosen by the select lines. A 1:$2^n$ demultiplexer has one data input, $n$ select lines and $2^n$ outputs.",
    "For an ideal active-HIGH 1:4 demultiplexer: $Y_0 = D\\,\\overline{S_1}\\,\\overline{S_0}$, $Y_1 = D\\,\\overline{S_1}\\,S_0$, $Y_2 = D\\,S_1\\,\\overline{S_0}$, $Y_3 = D\\,S_1\\,S_0$. Only the output addressed by $S_1S_0$ follows $D$; the others stay at 0.",
    "The 74HC139 is a dual 2-to-4 decoder/demultiplexer with active-LOW outputs. Section 1 is used here: the select inputs are 1A ($S_0$) and 1B ($S_1$), and the active-LOW enable input $\\overline{1G}$ carries the data $D$. The addressed output $\\overline{Y_n}$ follows $D$, while every other output stays HIGH.",
    "Each output drives an LED connected between VCC (through a 330 Ω resistor) and the output pin. The output sinks the current, so an LED is ON when its output pin is LOW. With $D = 0$ the addressed LED lights; with $D = 1$ all LEDs are OFF.",
    "Applications: data distribution, memory and I/O address decoding, serial-to-parallel conversion, and routing a clock or signal to one of several destinations.",
  ],
};

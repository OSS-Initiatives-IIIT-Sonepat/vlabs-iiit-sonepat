import { type TheorySection } from "@/labs/lab-content.types";

// Overview only. The tour in the procedure explains each part in turn.
export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "An Arduino is a small board built around a microcontroller: one chip that runs one program again and again. The Arduino Uno R3 uses an ATmega328P. It has three jobs: take power in, run your program, and connect that program to the outside world through its pins.",
    "Every part of the board belongs to one of those jobs. Power comes in through the USB jack or the barrel jack, and a regulator makes a steady 5 V. The ATmega328P runs the program, and the 16 MHz crystal sets its clock. The pins are the connection: digital pins switch between 0 V and 5 V, analog pins measure voltage, and power pins supply your parts.",
    "The procedure that follows walks around the board one part at a time. For each part, the arrow on the 3D board points at it, and the text says what the part does and what it connects to.",
  ],
};

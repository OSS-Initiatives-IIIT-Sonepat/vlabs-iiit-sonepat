import { type TheorySection } from "@/labs/lab-content.types";
import { logicGatesTheoryDiagram } from "@/labs/schematics/logic-gates-schematics";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Logic gates are the fundamental building blocks of all digital circuits. Each gate implements a specific Boolean operation on one or more binary inputs and produces a single binary output. The basic gates are AND, OR, NOT (inverter), NAND, NOR, XOR (Exclusive-OR), and XNOR (Exclusive-NOR). In positive logic, a HIGH voltage (logic 1) typically corresponds to the supply rail (e.g., 5 V or 3.3 V) and a LOW voltage (logic 0) corresponds to ground.",
    "The 74HC (High-speed CMOS) logic family operates from 2 V to 6 V supply, offers low power consumption, and has adequate drive strength (fan-out of 10 for LSTTL loads, or up to 50 for CMOS loads at low frequencies). Key ICs: 74HC04 (hex inverter — 6 NOT gates), 74HC08 (quad 2-input AND), 74HC32 (quad 2-input OR), 74HC00 (quad 2-input NAND), 74HC02 (quad 2-input NOR), 74HC86 (quad 2-input XOR). XNOR can be realised by inverting the output of an XOR gate.",
    "Each gate's behaviour is fully described by its truth table. For a 2-input gate, there are 2² = 4 possible input combinations (00, 01, 10, 11). The truth table lists the output for each combination. For AND: output is 1 only when both inputs are 1. For OR: output is 0 only when both inputs are 0. NAND and NOR are the complements of AND and OR respectively, and are functionally complete — any Boolean function can be realised using only NAND gates (or only NOR gates).",
    "In this experiment each gate is individually wired on a breadboard using the corresponding 74HC-series IC, input logic levels are applied via switch-to-Vcc/GND connections, and the output is observed via an LED (lit = logic 1, off = logic 0). The measured truth tables are compared with standard truth tables to verify correct operation.",
  ],
  circuitDiagram: logicGatesTheoryDiagram,
};

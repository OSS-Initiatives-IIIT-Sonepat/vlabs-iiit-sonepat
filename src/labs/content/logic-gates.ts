import { type LabContent } from '@/labs/lab-content.types';

export const LogicGatesContent: LabContent = {
  id: 'logic-gates',
  title: 'Realisation of Basic Logic Gates',
  circuitId: 'logic-gates',
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'Logic gates are the fundamental building blocks of all digital circuits. Each gate implements a specific Boolean operation on one or more binary inputs and produces a single binary output. The basic gates are AND, OR, NOT (inverter), NAND, NOR, XOR (Exclusive-OR), and XNOR (Exclusive-NOR). In positive logic, a HIGH voltage (logic 1) typically corresponds to the supply rail (e.g., 5 V or 3.3 V) and a LOW voltage (logic 0) corresponds to ground.',
        'The 74HC (High-speed CMOS) logic family operates from 2 V to 6 V supply, offers low power consumption, and has adequate drive strength (fan-out of 10 for LSTTL loads, or up to 50 for CMOS loads at low frequencies). Key ICs: 74HC04 (hex inverter — 6 NOT gates), 74HC08 (quad 2-input AND), 74HC32 (quad 2-input OR), 74HC00 (quad 2-input NAND), 74HC02 (quad 2-input NOR), 74HC86 (quad 2-input XOR). XNOR can be realised by inverting the output of an XOR gate.',
        "Each gate's behaviour is fully described by its truth table. For a 2-input gate, there are 2² = 4 possible input combinations (00, 01, 10, 11). The truth table lists the output for each combination. For AND: output is 1 only when both inputs are 1. For OR: output is 0 only when both inputs are 0. NAND and NOR are the complements of AND and OR respectively, and are functionally complete — any Boolean function can be realised using only NAND gates (or only NOR gates).",
        'In this experiment each gate is individually wired on a breadboard using the corresponding 74HC-series IC, input logic levels are applied via switch-to-Vcc/GND connections, and the output is observed via an LED (lit = logic 1, off = logic 0). The measured truth tables are compared with standard truth tables to verify correct operation.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: '74HC04 Hex Inverter IC', specification: 'DIP-14, NOT gate', quantity: '1' },
        { name: '74HC08 Quad 2-input AND IC', specification: 'DIP-14', quantity: '1' },
        { name: '74HC32 Quad 2-input OR IC', specification: 'DIP-14', quantity: '1' },
        { name: '74HC00 Quad 2-input NAND IC', specification: 'DIP-14', quantity: '1' },
        { name: '74HC02 Quad 2-input NOR IC', specification: 'DIP-14', quantity: '1' },
        { name: '74HC86 Quad 2-input XOR IC', specification: 'DIP-14', quantity: '1' },
        { name: 'LED', specification: 'Red, 5 mm, 2 V forward voltage', quantity: '7' },
        { name: 'Resistor (current limiting)', specification: '330 Ω, 0.25 W', quantity: '7' },
        { name: 'SPDT Switch / Jumper', specification: 'For logic input selection', quantity: '4' },
        { name: 'DC Power Supply', specification: '5 V regulated', quantity: '1' },
        { name: 'Bread Board', specification: 'Full size, 830 tie-points', quantity: '1' },
        { name: 'Connecting Wires', specification: '22 AWG solid-core jumper wires', quantity: '25' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Prepare breadboard and power rails',
          body: 'Connect the 5 V regulated supply to the red (+) rail and ground to the blue (−) rail of the breadboard. Insert input switches: wire each switch so that one position connects the input line to +5 V (logic 1) and the other position connects it to GND through a 10 kΩ pull-down resistor (logic 0). Label the input lines A and B. Verify the supply voltage with a multimeter before inserting any IC.',
          circuitStepIndex: 0,
        },
        {
          label: 'Insert and power the first IC (74HC08 AND)',
          body: 'Insert the 74HC08 DIP-14 IC straddling the centre groove of the breadboard so pins 1–7 are on one side and pins 8–14 on the other. Connect pin 14 (Vcc) to the +5 V rail and pin 7 (GND) to the ground rail. This powers the IC. The 74HC08 contains four AND gates; use gate 1 (pins 1, 2 inputs; pin 3 output) for this step.',
          circuitStepIndex: 1,
        },
        {
          label: 'Wire inputs and LED output indicator',
          body: 'Connect input switch A to pin 1 and input switch B to pin 2 of the AND gate. Connect pin 3 (output) through a 330 Ω current-limiting resistor to the anode of an LED; connect the LED cathode to ground. The LED will illuminate when the gate output is logic 1. Verify no short circuits exist before applying power.',
          circuitStepIndex: 2,
        },
        {
          label: 'Test all input combinations and record',
          body: 'Apply all four input combinations sequentially: (A=0,B=0), (A=0,B=1), (A=1,B=0), (A=1,B=1). For each combination, observe whether the LED is ON (logic 1) or OFF (logic 0). Record the output in the truth table. Compare the measured truth table with the theoretical AND truth table. Repeat this step for OR (74HC32), NOT (74HC04 — single input A only), NAND (74HC00), NOR (74HC02), XOR (74HC86), and XNOR (XOR output through an inverter).',
          circuitStepIndex: 3,
        },
        {
          label: 'Verify XNOR using XOR + NOT',
          body: 'To realise XNOR, cascade the XOR output (pin 3 of 74HC86) into the input of an unused NOT gate (pin 1 of 74HC04). Take the NOT output (pin 2 of 74HC04) and connect it to the LED indicator. Test all four input combinations. The result should be the complement of the XOR output: LED ON only for inputs (0,0) and (1,1). This demonstrates gate cascading and the derivation of complex functions from basic gates.',
          circuitStepIndex: 4,
        },
        {
          label: 'Document and compare all truth tables',
          body: 'Consolidate the truth tables for all seven gate types in the observation table. For each gate, mark any discrepancy between observed and expected output. Common failure modes include: incorrect IC orientation (check pin 1 notch/dot), missing Vcc or GND connections, floating inputs (must be tied to Vcc or GND — never left unconnected in CMOS). Verify that all observed truth tables match theory.',
          circuitStepIndex: 5,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Combined truth table for all basic logic gates. Output 1 = LED ON, Output 0 = LED OFF. All observations match the theoretical truth tables.',
      ],
      table: {
        headers: ['A', 'B', 'AND', 'OR', 'NOT A', 'NAND', 'NOR', 'XOR', 'XNOR'],
        rows: [
          [0, 0, 0, 0, 1, 1, 1, 0, 1],
          [0, 1, 0, 1, 1, 1, 0, 1, 0],
          [1, 0, 0, 1, 0, 1, 0, 1, 0],
          [1, 1, 1, 1, 0, 0, 0, 0, 1],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'All seven basic logic gates (AND, OR, NOT, NAND, NOR, XOR, XNOR) have been successfully realised using 74HC-series ICs on a breadboard. The observed truth tables for each gate match the theoretical truth tables exactly.',
        'The XNOR gate was derived by cascading an XOR gate output through a NOT gate, demonstrating that complex logic functions can be built by combining simpler gates. NAND and NOR gates are confirmed to be functionally complete building blocks.',
        'The 74HC logic family proved reliable at 5 V, with clear HIGH (> 4.5 V) and LOW (< 0.1 V) output levels easily distinguished by the LED indicators. This experiment builds the foundational understanding required for designing combinational and sequential digital circuits.',
      ],
    },
  ],
};

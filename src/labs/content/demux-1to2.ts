import { type LabContent } from '@/labs/lab-content.types';

export const Demux1to2Content: LabContent = {
  id: 'demux-1to2',
  title: '1:2 Demultiplexer',
  circuitId: 'demux',
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A Demultiplexer (DEMUX) is the functional inverse of a multiplexer. It takes a single input data line (I) and routes it to one of several output lines selected by the select (address) inputs. A 1:2 DEMUX has one data input (I), one select input (S), and two outputs (Y0 and Y1). When S = 0, the input I is routed to Y0; when S = 1, the input I is routed to Y1. The deselected output is always 0.',
        'The Boolean expressions for a 1:2 DEMUX are: Y0 = I · S\' (input I is passed to Y0 only when S=0) and Y1 = I · S (input I is passed to Y1 only when S=1). These two product terms require only two AND gates and one NOT gate — no OR gate is needed since the outputs are fully independent. The total gate count is minimal: 1× NOT (74HC04) and 2× AND (74HC08, using two of the four gates in the package).',
        'DEMUX circuits are used in digital systems for data distribution (one transmitter to multiple receivers), address decoding (selecting one of N memory banks), time-division demultiplexing (reconstructing parallel data from a serial stream), and display driving (sequentially addressing rows or columns of a multiplexed display matrix).',
        'The 1:2 DEMUX is the smallest DEMUX and serves as the primitive cell from which larger N:2ⁿ DEMUXes are built. A 1:4 DEMUX can be constructed from three 1:2 DEMUXes (one at the first level, two at the second level) in a binary tree arrangement. Note that many commercial DEMUX ICs (e.g., 74HC138, 74HC139) include an enable input for additional flexibility.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: '74HC04 Hex Inverter IC', specification: 'DIP-14 (NOT gate)', quantity: '1' },
        { name: '74HC08 Quad 2-input AND IC', specification: 'DIP-14', quantity: '1' },
        { name: 'LED', specification: 'Green, 5 mm (Y0 output)', quantity: '1' },
        { name: 'LED', specification: 'Yellow, 5 mm (Y1 output)', quantity: '1' },
        { name: 'Resistor (current limiting)', specification: '330 Ω, 0.25 W', quantity: '2' },
        { name: 'SPDT Switch / Jumper', specification: 'Logic input (I, S)', quantity: '2' },
        { name: 'DC Power Supply', specification: '5 V regulated', quantity: '1' },
        { name: 'Bread Board', specification: 'Full size, 830 tie-points', quantity: '1' },
        { name: 'Connecting Wires', specification: '22 AWG solid-core jumper wires', quantity: '15' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Set up breadboard and power supply',
          body: 'Connect the 5 V regulated supply to the breadboard power rails. Insert the 74HC04 and 74HC08 ICs on the breadboard, both straddling the centre groove. Connect pin 14 to +5 V and pin 7 to GND for both ICs. Prepare two input switches for I (data) and S (select). Connect two LEDs with 330 Ω current-limiting resistors for outputs Y0 and Y1.',
          circuitStepIndex: 0,
        },
        {
          label: 'Wire the NOT gate for select complement',
          body: "Wire NOT gate 1 (74HC04, pin 1→2): connect select input S to pin 1. The complement S' emerges at pin 2. This complement is needed to enable the Y0 path when S=0. Verify with a voltmeter that pin 2 is HIGH when S is LOW and vice versa before proceeding to the AND gates.",
          circuitStepIndex: 1,
        },
        {
          label: 'Wire the two AND gates for outputs',
          body: "Wire AND gate 1 (74HC08, pins 1,2→3): connect data input I to pin 1 and S' (74HC04 pin 2) to pin 2. Output Y0 = I·S' appears on pin 3. Connect pin 3 through a 330 Ω resistor to the green LED (Y0). Wire AND gate 2 (74HC08, pins 4,5→6): connect data input I to pin 4 and select S to pin 5. Output Y1 = I·S appears on pin 6. Connect pin 6 through a 330 Ω resistor to the yellow LED (Y1).",
          circuitStepIndex: 2,
        },
        {
          label: 'Connect input lines to both AND gates',
          body: "Verify that data input I reaches both AND gate inputs (pin 1 of AND1 and pin 4 of AND2) via separate wires from the same switch. Select S must reach NOT gate input (pin 1 of 74HC04) and directly to AND2 pin 5. S' from NOT output (pin 2) connects only to AND1 pin 2. Confirm all unused IC inputs are tied to GND.",
          circuitStepIndex: 3,
        },
        {
          label: 'Test S=0 and S=1 routing',
          body: 'Test all four combinations of (I, S). For S=0: Y0 should follow I and Y1 should be 0 — verify (I=0,S=0)→Y0=0,Y1=0 and (I=1,S=0)→Y0=1,Y1=0. For S=1: Y1 should follow I and Y0 should be 0 — verify (I=0,S=1)→Y0=0,Y1=0 and (I=1,S=1)→Y0=0,Y1=1. Record all LED states in the observation table. Confirm only one output LED can be ON at a time, and only when I=1.',
          circuitStepIndex: 4,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        "1:2 DEMUX truth table. Y0 = I·S', Y1 = I·S. Only the selected output follows I; the other output is always 0.",
      ],
      table: {
        headers: ['I', 'S', 'Y0 (observed)', 'Y1 (observed)', 'Y0 (expected)', 'Y1 (expected)'],
        rows: [
          [0, 0, 0, 0, 0, 0],
          [0, 1, 0, 0, 0, 0],
          [1, 0, 1, 0, 1, 0],
          [1, 1, 0, 1, 0, 1],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The 1:2 Demultiplexer has been successfully implemented using 74HC04 (NOT) and 74HC08 (AND) ICs. All four input combinations were tested and the observed outputs Y0 and Y1 correctly reflect the routing of input I based on the select line S.',
        'When S=0, the data input I is routed exclusively to Y0 (Y1 remains 0). When S=1, the data input I is routed exclusively to Y1 (Y0 remains 0). This confirms the DEMUX behaviour as a digital data distributor.',
        'The 1:2 DEMUX is the dual of the 2:1 MUX and serves as the foundation for larger address decoders and data distribution networks. Understanding its operation is essential for designing memory address decoding, display multiplexing, and bus arbitration circuits.',
      ],
    },
  ],
};

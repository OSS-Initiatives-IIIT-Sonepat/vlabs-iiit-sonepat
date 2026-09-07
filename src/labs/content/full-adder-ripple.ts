import { type LabContent } from '@/labs/lab-content.types';

export const FullAdderRippleContent: LabContent = {
  id: 'full-adder-ripple',
  title: '4-bit Ripple Carry Adder',
  circuitId: 'full-adder-ripple',
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A Ripple Carry Adder (RCA) is formed by chaining multiple Full Adder stages in series, with the Carry-out (Cout) of each stage connected to the Carry-in (Cin) of the next more-significant stage. A 4-bit RCA can add two 4-bit numbers A[3:0] and B[3:0] to produce a 4-bit sum S[3:0] and a final carry-out C4. The least-significant bit (bit 0) has Cin = 0 (no initial carry).',
        'The fundamental limitation of the RCA is carry propagation latency. The worst-case scenario occurs when the carry must ripple through all stages: e.g., A = 0111 and B = 0001 → the carry generated at bit 0 propagates through bits 1, 2, and 3. Total worst-case delay = n × t_pd(FA), where n is the number of bits and t_pd(FA) is the carry-propagation delay of one Full Adder stage (approximately 2× t_pd(gate) for the AND+OR carry path).',
        'For a 74HC implementation with t_pd ≈ 7 ns per gate: each Full Adder\'s carry path involves one AND gate and one OR gate, giving t_pd(carry) ≈ 14 ns per stage. A 4-bit RCA has a worst-case latency of 4 × 14 = 56 ns. This limits the maximum clock frequency of any synchronous circuit using this adder. Carry Look-Ahead Adders (CLAs) resolve this by computing all carries simultaneously, reducing latency to O(log n) gate delays.',
        'The 4-bit RCA requires four sets of Full Adder gate circuits: 4× XOR pairs (8 XOR gates total → two 74HC86 ICs), 4× AND pairs (8 AND gates total → two 74HC08 ICs), 4× OR gates (4 gates total → one 74HC32 IC). The carry chain connections (C0→C1→C2→C3→C4) form the critical path. Sum outputs S[3:0] and the final carry C4 are displayed on five LEDs.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: '74HC86 Quad 2-input XOR IC', specification: 'DIP-14 (2 ICs for 8 XOR gates)', quantity: '2' },
        { name: '74HC08 Quad 2-input AND IC', specification: 'DIP-14 (2 ICs for 8 AND gates)', quantity: '2' },
        { name: '74HC32 Quad 2-input OR IC', specification: 'DIP-14 (1 IC for 4 OR gates)', quantity: '1' },
        { name: 'LED', specification: 'Green, 5 mm (Sum bits S3:S0)', quantity: '4' },
        { name: 'LED', specification: 'Red, 5 mm (Carry-out C4)', quantity: '1' },
        { name: 'Resistor (current limiting)', specification: '330 Ω, 0.25 W', quantity: '5' },
        { name: 'SPDT Switch / Jumper', specification: 'Inputs A[3:0] and B[3:0]', quantity: '8' },
        { name: 'DC Power Supply', specification: '5 V regulated, ≥ 500 mA', quantity: '1' },
        { name: 'Bread Board', specification: 'Full size, 830 tie-points', quantity: '2' },
        { name: 'Connecting Wires', specification: '22 AWG solid-core jumper wires', quantity: '50' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Plan the layout and set up power rails',
          body: 'Use two breadboards side by side to accommodate all five ICs and the wiring. Assign one breadboard to the lower two Full Adder stages (FA0, FA1) and the other to FA2, FA3, and the output LEDs. Connect the 5 V supply to the power rails of both breadboards and link the ground rails together with a jumper. Place bypass capacitors (100 nF) on each IC. Set up eight input switches for A[3:0] and B[3:0] on the first breadboard.',
          circuitStepIndex: 0,
        },
        {
          label: 'Build and wire FA0 (bit 0, LSB)',
          body: 'Implement the Full Adder for bit 0: XOR gate 1 computes P0 = A0⊕B0; XOR gate 2 computes S0 = P0⊕C0 (with C0 tied to GND, since there is no carry into the LSB). AND gate 1 computes A0·B0; AND gate 2 computes P0·C0 = 0 (for C0=0 this is always 0). OR gate produces C1 = A0·B0 + P0·C0 = A0·B0. Connect the green LED for S0. Note C1 output — this feeds FA1.',
          circuitStepIndex: 1,
        },
        {
          label: 'Build and wire FA1, FA2, FA3',
          body: 'Replicate the Full Adder structure for FA1 (using A1, B1, Cin=C1), FA2 (A2, B2, Cin=C2), and FA3 (A3, B3, Cin=C3). For each stage, connect the Cout of the previous stage to the Cin of the current stage — this is the carry-ripple chain. Each stage produces a Sum LED (S1, S2, S3) and a carry-out (C2, C3, C4 respectively). Connect the red LED for C4 (final carry-out).',
          circuitStepIndex: 4,
        },
        {
          label: 'Verify carry chain wiring',
          body: 'Trace the carry chain: GND → C0 (FA0 Cin) → C1 (FA0 Cout / FA1 Cin) → C2 (FA1 Cout / FA2 Cin) → C3 (FA2 Cout / FA3 Cin) → C4 (FA3 Cout / final carry LED). Use a multimeter to verify continuity at each carry junction point. Any break in the carry chain will cause all higher-order bits to produce incorrect results — this is the most common wiring error in RCA construction.',
          circuitStepIndex: 10,
        },
        {
          label: 'Test with selected binary additions',
          body: 'Test the following additions and verify the binary outputs: (a) 0001 + 0001 = 0010 (1+1=2); (b) 0111 + 0001 = 1000 (7+1=8, tests carry ripple through 3 stages); (c) 1111 + 0001 = 10000 (15+1=16, S=0000, C4=1); (d) 0101 + 0011 = 1000 (5+3=8); (e) 1010 + 0110 = 10000 (10+6=16, C4=1). Record binary inputs and observed LED outputs for each.',
          circuitStepIndex: 10,
        },
        {
          label: 'Test worst-case carry propagation',
          body: 'Set A = 0111 (0,1,1,1) and B = 0001 (0,0,0,1). The carry must propagate from bit 0 through bits 1, 2, and 3. Expected result: 0111 + 0001 = 1000 (S = 1000, C4 = 0). Verify all four Sum LEDs and C4. Then try A = 1111, B = 0001: expected S = 0000 with C4 = 1. These worst-case patterns exercise the full carry ripple chain and are the critical test vectors for RCA validation.',
          circuitStepIndex: 10,
        },
        {
          label: 'Measure carry ripple delay with oscilloscope',
          body: 'Drive A[3:0] = 0111 and B[3:0] = 0001 with a pulse generator (A0 toggling at 1 MHz, others static). Monitor the A0 input (Ch1) and S3 output (Ch2) on the oscilloscope. The delay from A0 edge to S3 settling is the carry ripple delay through 4 stages. Measure and compare with the calculated estimate (4 × 14 ns = 56 ns for 74HC). This empirically validates the RCA timing model.',
          circuitStepIndex: 10,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        '4-bit RCA test results. A and B are 4-bit binary inputs (MSB first). S[3:0] is the 4-bit sum output and C4 is the carry-out.',
      ],
      table: {
        headers: ['A (decimal)', 'B (decimal)', 'A[3:0]', 'B[3:0]', 'S[3:0] observed', 'C4 obs', 'Expected sum'],
        rows: [
          [1, 1, '0001', '0001', '0010', 0, 2],
          [7, 1, '0111', '0001', '1000', 0, 8],
          [5, 3, '0101', '0011', '1000', 0, 8],
          [10, 6, '1010', '0110', '0000', 1, 16],
          [15, 1, '1111', '0001', '0000', 1, 16],
          [15, 15, '1111', '1111', '1110', 1, 30],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'A 4-bit Ripple Carry Adder was successfully constructed and tested using 74HC-series ICs. All six test vector additions produced correct Sum and Carry-out values, including cases requiring carry propagation through all four stages.',
        'The worst-case carry ripple delay was measured at approximately 54–58 ns (4 stages × ~14 ns/stage), confirming the linear O(n) latency growth of the RCA architecture. This sets an upper bound on the operating frequency of any synchronous circuit employing this adder.',
        'The experiment reinforces the trade-off between circuit simplicity (RCA uses the minimum number of gates) and speed (CLA or prefix adders offer O(log n) carry latency). For small bit widths (≤ 8 bits) and low-frequency applications, the RCA is practical; for high-speed arithmetic in processors, carry look-ahead or Kogge-Stone adder topologies are preferred.',
      ],
    },
  ],
};

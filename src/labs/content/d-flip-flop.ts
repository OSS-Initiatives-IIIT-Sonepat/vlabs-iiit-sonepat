import { type LabContent } from '@/labs/lab-content.types';

export const DFlipFlopContent: LabContent = {
  id: 'd-flip-flop',
  title: 'D Flip-Flop using 74HC74 (Rising-Edge Triggered)',
  circuitId: 'd-flip-flop',

  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A D flip-flop (Data or Delay flip-flop) captures the value of the D input on a specific clock edge and holds it until the next clock edge. The 74HC74 provides two independent rising-edge-triggered D flip-flops in a DIP-14 package.',
        'The characteristic equation is $$Q_{n+1} = D \\quad \\text{(on the rising clock edge)}$$ Between clock edges the output Q is stable — it holds the last captured value regardless of changes on D. This is the "data latch on clock edge" behaviour.',
        'The 74HC74 also has asynchronous override inputs: active-low $\\overline{PRE}$ (preset, forces Q=1) and active-low $\\overline{CLR}$ (clear, forces Q=0). These take effect immediately, independent of the clock. In normal operation both are tied HIGH (inactive). **Setup time** ($t_{su}$) is the minimum time D must be stable before the clock edge. **Hold time** ($t_h$) is the minimum time D must remain stable after the clock edge.',
        'Applications: shift registers, pipeline registers, state machines, frequency dividers (connect Q_bar to D → output toggles every clock cycle = ÷2 counter). The D-FF eliminates the forbidden state of the SR latch, making it the most common storage element in digital systems.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard', specification: '830 tie-point, solderless', quantity: '1' },
        { name: '74HC74 D Flip-Flop IC', specification: 'Dual D-FF, rising-edge, DIP-14, 5 V', quantity: '1' },
        { name: 'Green LED', specification: '5 mm, Q output indicator', quantity: '1' },
        { name: 'Red LED', specification: '5 mm, Q_bar output indicator', quantity: '1' },
        { name: 'Resistor 330 Ω', specification: '¼ W, ×2 — current limiters', quantity: '2' },
        { name: 'DC Power Supply', specification: '+5 V DC, 500 mA', quantity: '1' },
        { name: 'Connecting Wires', specification: 'M-M jumper wires', quantity: '1 set' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Place the breadboard.',
          circuitStepIndex: 0,
          body: 'Place the 830-point breadboard. Identify VCC (red) and GND (blue) rails.',
        },
        {
          label: 'Place the 74HC74 D flip-flop IC.',
          circuitStepIndex: 1,
          body: 'Insert 74HC74 DIP-14 straddling the centre gap. Pin 1 ($\\overline{CLR}_1$) at top-left. Seat all 14 pins.',
        },
        {
          label: 'Tie PRE_bar and CLR_bar HIGH.',
          circuitStepIndex: 2,
          body: 'Connect $\\overline{PRE}$ and $\\overline{CLR}$ pins to VCC rail. This disables asynchronous preset/clear — the flip-flop operates in normal clocked mode only.',
        },
        {
          label: 'Wire D and CLK inputs.',
          circuitStepIndex: 3,
          body: 'Connect D from col 1 row a and CLK from col 2 row a to the IC. D is the data input; CLK triggers the capture on the rising edge.',
        },
        {
          label: 'Add resistors and output LEDs.',
          circuitStepIndex: 4,
          body: 'Place 330 Ω resistors in the Q (green) and Q_bar (red) output paths. Green LED ON = Q=1, Red LED ON = Q=0 (they are always complementary in normal operation).',
        },
        {
          label: 'Connect the output paths.',
          circuitStepIndex: 5,
          body: 'Wire IC Q → resistor → green LED → GND. Wire IC Q_bar → resistor → red LED → GND. Power on.',
        },
        {
          label: 'Test: D=0 then apply rising clock edge.',
          circuitStepIndex: 6,
          body: 'Set D=0 (connect D hole to GND). Pulse CLK HIGH then LOW (rising edge). Observe: Q=0 (green LED OFF), Q_bar=1 (red LED ON). The flip-flop captured D=0.',
        },
        {
          label: 'Test: D=1 then apply rising clock edge.',
          circuitStepIndex: 7,
          body: 'Set D=1 (connect D hole to VCC). Pulse CLK. Observe: Q=1 (green LED ON), Q_bar=0 (red LED OFF). The flip-flop captured D=1.',
        },
        {
          label: 'Test: Change D without clocking — Q holds.',
          circuitStepIndex: 8,
          body: 'While Q=1: change D=0 but do NOT pulse CLK. Observe: Q remains 1 (green LED stays ON). This confirms Q only changes on a clock edge — D changes between clocks are ignored.',
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Supply: +5 V. 74HC74 rising-edge triggered. CLK driven manually (hole-to-VCC pulse).',
      ],
      table: {
        headers: ['D', 'CLK Edge', '$Q_{n+1}$', 'Green LED', 'Red LED'],
        rows: [
          [0, '↑ (Rising)', 0, 'OFF', 'ON'],
          [1, '↑ (Rising)', 1, 'ON', 'OFF'],
          [0, 'None (no edge)', '$Q_n$', 'Unchanged', 'Unchanged'],
          [1, 'None (no edge)', '$Q_n$', 'Unchanged', 'Unchanged'],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The D flip-flop built with 74HC74 correctly captured the D input value on each rising clock edge. Q=D was confirmed after every clock pulse regardless of the prior state.',
        'The hold behaviour was verified: changing D between clock pulses produced no change in Q — the output was stable until the next rising edge. The Q and Q_bar outputs remained complementary throughout.',
        'The rising-edge-triggered D flip-flop is the fundamental building block of registers and pipeline stages. It eliminates the SR latch\'s forbidden state and provides clean, predictable synchronous operation.',
      ],
    },
  ],
};

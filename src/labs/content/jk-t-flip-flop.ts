import { type LabContent } from '@/labs/lab-content.types';

export const JkTFlipFlopContent: LabContent = {
  id: 'jk-t-flip-flop',
  title: 'JK Flip-Flop and T Flip-Flop using 74HC76',
  circuitId: 'jk-t-flip-flop',

  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'The JK flip-flop is the most versatile sequential element. It extends the SR latch by replacing the forbidden state with a **toggle** action. When both J=K=1, Q toggles on each active clock edge. The 74HC76 is a dual falling-edge-triggered JK flip-flop with active-low asynchronous SET ($\\overline{SET}$) and CLR ($\\overline{CLR}$) inputs.',
        'JK characteristic equation: $$Q_{n+1} = J\\bar{Q}_n + \\bar{K}Q_n$$ The four operating modes are: J=0 K=0 → Hold (Q unchanged). J=0 K=1 → Reset (Q=0). J=1 K=0 → Set (Q=1). J=1 K=1 → Toggle (Q flips). All transitions occur on the **falling** clock edge.',
        'The **T flip-flop** is a special case of the JK flip-flop with J and K inputs tied together as the single T input. When T=1 the output toggles on every active clock edge; when T=0 the output holds. The T flip-flop is widely used as a binary frequency divider: each stage divides the clock frequency by 2. $$Q_{n+1} = T\\bar{Q}_n + \\bar{T}Q_n = T \\oplus Q_n$$',
        'Applications: JK flip-flops form the basis of synchronous counters, sequence detectors, and state machines. T flip-flops implement ripple and synchronous counters and are used wherever clean frequency division is needed.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard', specification: '830 tie-point, solderless', quantity: '1' },
        { name: '74HC76 JK Flip-Flop IC', specification: 'Dual JK-FF, falling-edge, DIP-16, 5 V', quantity: '1' },
        { name: 'Green LED', specification: '5 mm, Q output', quantity: '1' },
        { name: 'Yellow LED', specification: '5 mm, Q_bar output', quantity: '1' },
        { name: 'Resistor 330 Ω', specification: '¼ W, ×2', quantity: '2' },
        { name: 'DC Power Supply', specification: '+5 V DC', quantity: '1' },
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
          body: 'Place the breadboard. Red rails = VCC, blue = GND.',
        },
        {
          label: 'Place the 74HC76 JK flip-flop IC.',
          circuitStepIndex: 1,
          body: 'Insert 74HC76 DIP-16 straddling the centre gap. Pin 1 is CLK₁. The 74HC76 is falling-edge triggered — transitions occur on HIGH→LOW clock edges.',
        },
        {
          label: 'Tie SET_bar and CLR_bar HIGH.',
          circuitStepIndex: 2,
          body: 'Connect $\\overline{SET}$ and $\\overline{CLR}$ to VCC. Async controls disabled — flip-flop in normal clocked mode.',
        },
        {
          label: 'Wire J, K, and CLK inputs.',
          circuitStepIndex: 3,
          body: 'Connect J from col 1 row a, K from col 2 row a, CLK from col 3 row a to respective IC pins. These are the primary control inputs.',
        },
        {
          label: 'Add Q and Q_bar output LEDs.',
          circuitStepIndex: 4,
          body: 'Place 330 Ω resistors and two LEDs: green for Q, yellow for Q_bar. They should always be complementary in normal operation.',
        },
        {
          label: 'Test JK=10: SET on falling edge.',
          circuitStepIndex: 5,
          body: 'Set J=1, K=0. Pulse CLK (HIGH→LOW falling edge). Q → 1 (green LED ON). This is the SET mode.',
        },
        {
          label: 'Test JK=01: RESET on falling edge.',
          circuitStepIndex: 6,
          body: 'Set J=0, K=1. Pulse CLK. Q → 0 (green LED OFF). This is the RESET mode.',
        },
        {
          label: 'Test JK=11: TOGGLE on falling edge.',
          circuitStepIndex: 7,
          body: 'Set J=1, K=1. Pulse CLK multiple times. Q toggles on every falling edge — LED alternates ON/OFF. This mode eliminates the SR forbidden state.',
        },
        {
          label: 'Rewire for T mode: connect T to both J and K.',
          circuitStepIndex: 8,
          body: 'Connect the single T input (col 4 row a) to both J and K IC pins. Now the flip-flop acts as a T flip-flop: T=1 → toggle, T=0 → hold.',
        },
        {
          label: 'T mode: T=1 — Q toggles on every clock.',
          circuitStepIndex: 9,
          body: 'Set T=1 (col 4 row a → VCC). Pulse CLK repeatedly. LED alternates with every pulse — this is frequency division by 2. Set T=0 and confirm Q holds.',
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Supply: +5 V. 74HC76 falling-edge triggered. CLK pulsed manually.',
      ],
      table: {
        headers: ['J', 'K', 'CLK Edge', '$Q_{n+1}$', 'Mode'],
        rows: [
          [0, 0, '↓', '$Q_n$', 'Hold'],
          [0, 1, '↓', 0, 'Reset'],
          [1, 0, '↓', 1, 'Set'],
          [1, 1, '↓', '$\\bar{Q}_n$', 'Toggle'],
          ['T', 'T', '↓', '$T \\oplus Q_n$', 'T mode'],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The 74HC76 JK flip-flop demonstrated all four operating modes: Hold, Reset, Set, and Toggle. The falling-edge trigger was confirmed — transitions only occurred on HIGH→LOW clock transitions.',
        'The T flip-flop mode (J=K=T) was verified: Q toggled on every clock pulse when T=1, implementing a ÷2 frequency divider. When T=0, Q held its value.',
        'The JK flip-flop is the most general sequential element: it subsumes SR, D, and T flip-flops and eliminates the forbidden state. Its toggle mode is essential for ripple and synchronous counter design.',
      ],
    },
  ],
};

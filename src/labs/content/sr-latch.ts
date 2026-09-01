import { type LabContent } from '@/labs/lab-content.types';

export const SrLatchContent: LabContent = {
  id: 'sr-latch',
  title: 'SR Latch using 74HC279',
  circuitId: 'sr-latch',

  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'An SR latch is a fundamental bistable memory element. The 74HC279 provides four independent SR latches on a single DIP-16 package with active-low $\\bar{S}$ (Set) and $\\bar{R}$ (Reset) inputs.',
        'Operating states: $\\bar{S}=0, \\bar{R}=1$ → Q=1 (Set). $\\bar{S}=1, \\bar{R}=0$ → Q=0 (Reset). $\\bar{S}=1, \\bar{R}=1$ → Q unchanged (Hold). $\\bar{S}=0, \\bar{R}=0$ → Forbidden — both outputs try to go HIGH simultaneously, violating Q=Q_bar complementarity.',
        'Unlike edge-triggered flip-flops, the SR latch responds immediately (asynchronously) to input changes — there is no clock. The state equation is $$Q_{n+1} = S + \\bar{R}\\,Q_n \\quad (\\text{with constraint } S \\cdot R = 0)$$ Once set or reset, the latch holds its state indefinitely — this is the bistable memory property.',
        'Applications: switch debouncing (transitions on mechanical bounce do not cause spurious state changes), latching alarm circuits, and as the cross-coupled core inside D and JK flip-flops. The forbidden state is the key limitation of the SR latch compared to more advanced sequential elements.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard', specification: '830 tie-point, solderless', quantity: '1' },
        { name: '74HC279 SR Latch IC', specification: 'Quad SR latch, DIP-16, 5 V supply', quantity: '1' },
        { name: 'Green LED', specification: '5 mm, Q output indicator', quantity: '1' },
        { name: 'Resistor 330 Ω', specification: '¼ W, current limiter for LED', quantity: '1' },
        { name: 'DC Power Supply', specification: '+5 V DC, 500 mA', quantity: '1' },
        { name: 'Connecting Wires', specification: 'M-M jumper wires, assorted colours', quantity: '1 set' },
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
          body: 'Place the 830-point solderless breadboard. Red rails = VCC (+5 V), blue rails = GND. The centre gap separates rows a–e from f–j.',
        },
        {
          label: 'Place the 74HC279 SR latch IC.',
          circuitStepIndex: 1,
          body: 'Insert the 74HC279 DIP-16 straddling the centre gap. Pin 1 (notch/dot at top-left) is $\\bar{S}_1$ of Latch 1. Seat all 16 pins firmly.',
        },
        {
          label: 'Wire S_bar and R_bar inputs.',
          circuitStepIndex: 2,
          body: 'Connect $\\bar{S}$ from col 1 row a and $\\bar{R}$ from col 2 row a to the IC. These are active-LOW: HIGH = inactive (use VCC pull-up via 10 kΩ for real buttons). In this lab drive them directly from row holes.',
        },
        {
          label: 'Place the 330 Ω resistor.',
          circuitStepIndex: 3,
          body: 'Insert the 330 Ω current-limiting resistor in the Q output path to protect the LED.',
        },
        {
          label: 'Place the Q output LED.',
          circuitStepIndex: 4,
          body: 'Insert the green LED with anode toward the resistor. LED ON = Q=1 (latch SET). LED OFF = Q=0 (latch RESET).',
        },
        {
          label: 'Connect the output path.',
          circuitStepIndex: 5,
          body: 'Wire IC Q pin → resistor → LED anode. Wire LED cathode → GND rail. Power on.',
        },
        {
          label: 'Test RESET state (S_bar=1, R_bar=0).',
          circuitStepIndex: 6,
          body: 'Assert $\\bar{R}$=LOW (connect R input to GND). Q goes to 0. LED turns OFF. This is the RESET state — latch stores a logical 0.',
        },
        {
          label: 'Test SET state (S_bar=0, R_bar=1).',
          circuitStepIndex: 7,
          body: 'Now assert $\\bar{S}$=LOW (connect S input to GND). Q goes to 1. LED turns ON. This is the SET state — latch stores a logical 1.',
        },
        {
          label: 'Test HOLD state (both=1).',
          circuitStepIndex: 8,
          body: 'Both $\\bar{S}=\\bar{R}=1$ (both HIGH/inactive). Q retains its last value. Toggle S and R back to HIGH — LED remains ON (if previously set). This demonstrates the memory/hold property.',
        },
        {
          label: 'Observe the forbidden state (both=0).',
          circuitStepIndex: 9,
          body: '⚠️ Assert both $\\bar{S}=\\bar{R}=0$ briefly. Both Q and Q_bar go HIGH simultaneously — an undefined state. When inputs return to 11, Q settles unpredictably. Avoid this in real designs.',
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Supply voltage: +5 V DC. 74HC279 operating normally. LED current ≈ (5 − 2) / 330 ≈ 9 mA.',
      ],
      table: {
        headers: ['$\\bar{S}$', '$\\bar{R}$', '$Q_{n+1}$', 'State', 'LED'],
        rows: [
          [1, 0, 0, 'RESET', 'OFF'],
          [0, 1, 1, 'SET', 'ON'],
          [1, 1, '$Q_n$', 'HOLD', 'Unchanged'],
          [0, 0, '?', 'FORBIDDEN', 'Undefined'],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The SR latch constructed using the 74HC279 IC demonstrated all four operating states: Set (Q=1), Reset (Q=0), Hold (Q unchanged), and the Forbidden state (Q=Q_bar=1).',
        'The memory property was verified: once set or reset, the latch maintained its state with both inputs HIGH — confirming bistable operation without a clock.',
        'The SR latch is the building block of all sequential elements. Its active-LOW inputs and forbidden state are its key characteristics that motivate the more robust D and JK flip-flops.',
      ],
    },
  ],
};

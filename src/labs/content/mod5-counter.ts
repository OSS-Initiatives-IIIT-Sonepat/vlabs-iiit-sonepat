import { type LabContent } from '@/labs/lab-content.types';

export const Mod5CounterContent: LabContent = {
  id: 'mod5-counter',
  title: 'MOD-5 Asynchronous Counter using 74HC93',
  circuitId: 'mod5-counter',

  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A MOD-N counter cycles through N states (0 to N−1) and resets to 0. The 74HC93 is a 4-bit asynchronous (ripple) binary counter with two internal flip-flops: FF-A (clocked by CLK_A, output QA) and FF-B/C/D (clocked by CLK_B, outputs QB/QC/QD). Connecting QA to CLK_B gives a 4-bit counter that counts 0–15.',
        'To build a MOD-5 counter, the counter must reset immediately upon reaching count 5 (binary 0101). The reset inputs R01 and R02 are AND-ed internally: when both R01=1 AND R02=1 the counter resets to 0000 asynchronously. Count 5 in binary is 0101, so QA=1 and QC=1. Connecting R01=QA and R02=QC causes immediate reset on reaching 5, giving the sequence: $$0 \\to 1 \\to 2 \\to 3 \\to 4 \\to (5_{\\text{brief}}) \\to 0 \\to 1 \\to \\cdots$$',
        'The reset is so fast that count 5 (0101) is only momentarily present on the outputs before disappearing — the sequence observed is 0,1,2,3,4 and back to 0. This is called an **asynchronous preset** or **feedback reset** technique. The same approach works for any MOD-N: identify which bits are 1 in the binary representation of N and connect those Q outputs to R01 and R02.',
        'Asynchronous counters have a **ripple delay**: each flip-flop is clocked by the preceding output, so the final output (QD) changes last. For high-speed applications, synchronous counters (like the 74HC161) are preferred.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard', specification: '830 tie-point, solderless', quantity: '1' },
        { name: '74HC93 Counter IC', specification: '4-bit async binary counter, DIP-14, 5 V', quantity: '1' },
        { name: 'LEDs', specification: '5 mm — red (QA), yellow (QB), green (QC), blue (QD)', quantity: '4' },
        { name: 'Resistors 330 Ω', specification: '¼ W, ×4 — one per LED', quantity: '4' },
        { name: 'DC Power Supply', specification: '+5 V DC', quantity: '1' },
        { name: 'Clock source / Push Button', specification: 'Manual clock pulse (press = one count)', quantity: '1' },
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
          body: 'Place the breadboard. Red rails = VCC (+5 V), blue = GND.',
        },
        {
          label: 'Place the 74HC93 counter IC.',
          circuitStepIndex: 1,
          body: 'Insert 74HC93 DIP-14 straddling the centre gap. Pin 1 is CLK_B, pin 12 is CLK_A (the A flip-flop input). Seat all 14 pins.',
        },
        {
          label: 'Connect QA → CLK_B (4-bit mode).',
          circuitStepIndex: 2,
          body: 'Wire IC pin QA to IC pin CLK_B. This chains the A flip-flop output to the B flip-flop clock, creating a 4-bit (MOD-16) counter. Without this link, QA and QB/QC/QD would count independently.',
        },
        {
          label: 'Connect MOD-5 reset feedback.',
          circuitStepIndex: 3,
          body: 'Wire QA → R01 and QC → R02. When count reaches 5 (QA=1, QC=1), both reset inputs go HIGH simultaneously and the counter immediately resets to 0000. Count 5 is never fully visible on the outputs.',
        },
        {
          label: 'Add four output LEDs and resistors.',
          circuitStepIndex: 4,
          body: 'Place four 330 Ω resistors and LEDs: Red=QA (LSB), Yellow=QB, Green=QC, Blue=QD (MSB). This visual display shows the binary count as a pattern of lit LEDs.',
        },
        {
          label: 'Connect output wires and CLK input.',
          circuitStepIndex: 5,
          body: 'Wire QA/QB/QC/QD outputs through resistors to LED anodes, LED cathodes to GND. Connect CLK_A from col 1 row a — each HIGH→LOW transition on CLK_A increments the count by 1.',
        },
        {
          label: 'Count 1: CLK pulse → 0001.',
          circuitStepIndex: 6,
          body: 'Apply one falling clock pulse. LEDs show: QA=1 (red ON), QB=QC=QD=0. Count = 1.',
        },
        {
          label: 'Count 2: CLK pulse → 0010.',
          circuitStepIndex: 7,
          body: 'Second pulse. QA=0, QB=1. Count = 2. Red OFF, Yellow ON.',
        },
        {
          label: 'Count 3: CLK pulse → 0011.',
          circuitStepIndex: 8,
          body: 'Third pulse. QA=1, QB=1. Count = 3. Red ON, Yellow ON.',
        },
        {
          label: 'Count 4: CLK pulse → 0100.',
          circuitStepIndex: 9,
          body: 'Fourth pulse. QB=0, QC=1. Count = 4. Yellow OFF, Green ON.',
        },
        {
          label: 'Count 5 → immediate reset back to 0.',
          circuitStepIndex: 10,
          body: 'Fifth pulse. The counter momentarily reaches 0101 (QA=1, QC=1) which triggers R01=R02=1, instantly resetting to 0000. You observe the LEDs jump from count 4 directly to 0. The MOD-5 sequence (0→1→2→3→4→0) repeats.',
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Supply: +5 V. Clock pulsed manually. Count resets at 5 as expected.',
        'Note: count 5 (0101) is too brief to be observed — the asynchronous reset acts within nanoseconds of QA and QC both going HIGH.',
      ],
      table: {
        headers: ['CLK Pulse', 'QD', 'QC', 'QB', 'QA', 'Count', 'LEDs (D C B A)'],
        rows: [
          ['Reset/0', 0, 0, 0, 0, 0, 'off off off off'],
          [1, 0, 0, 0, 1, 1, 'off off off RED'],
          [2, 0, 0, 1, 0, 2, 'off off YEL off'],
          [3, 0, 0, 1, 1, 3, 'off off YEL RED'],
          [4, 0, 1, 0, 0, 4, 'off GRN off off'],
          ['5 → 0', 0, 0, 0, 0, '5→0', 'Reset (instant)'],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The MOD-5 counter was successfully implemented using the 74HC93 by feeding QA and QC back to the R01 and R02 reset inputs. The counter cycled through 0→1→2→3→4→0 as expected, never completing count 5.',
        'The feedback reset technique is general: any MOD-N counter can be built by identifying which bits are 1 in N and connecting those outputs to the reset inputs. MOD-10 (decade counter) uses QB and QD for count=10=1010.',
        'The asynchronous (ripple) nature of the 74HC93 means propagation delay increases with stage count. For reliable high-speed operation in digital systems, synchronous counters like the 74HC161 are preferred.',
      ],
    },
  ],
};

import { type LabContent } from '@/labs/lab-content.types';

export const RegistersCountersTheoryContent: LabContent = {
  id: 'registers-counters-theory',
  title: 'Registers and Counters — Theory',
  labType: 'text',

  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'Registers and counters are sequential logic circuits built from flip-flops. Unlike combinational ' +
        'circuits whose output depends only on current inputs, sequential circuits have memory — their ' +
        'output depends on both current inputs and past history (stored state).',

        'Flip-flop types: ' +
        'SR flip-flop: Set-Reset latch — S=1 sets Q=1, R=1 resets Q=0, S=R=1 is forbidden. ' +
        'D flip-flop: Data/Delay — Q captures D on the clock edge. Simple and most commonly used. ' +
        'JK flip-flop: J (set), K (reset); J=K=1 causes toggle. Universal flip-flop — any other type can be derived from it. ' +
        'T flip-flop: Toggle — T=1 toggles Q, T=0 holds. Used directly in counters.',

        'A register is an array of flip-flops that stores multiple bits. All flip-flops share a common ' +
        'clock. Shift register types: ' +
        'SIPO (Serial-In Parallel-Out): data shifted in 1 bit per clock, all n bits available simultaneously after n clocks. Used in serial-to-parallel conversion. ' +
        'SISO (Serial-In Serial-Out): shift register used as a delay line — data takes n clocks to traverse. ' +
        'PIPO (Parallel-In Parallel-Out): all n bits loaded and output simultaneously on one clock edge. Used as a data buffer or pipeline register. ' +
        'PISO (Parallel-In Serial-Out): n bits loaded in one clock, shifted out one bit per subsequent clock. Used in parallel-to-serial conversion (e.g., SPI transmitter).',

        'A counter is a sequential circuit that cycles through a predefined sequence of states on each ' +
        'clock edge. The modulus (MOD) is the number of states in the sequence. A MOD-8 counter counts ' +
        '0→1→2→3→4→5→6→7→0. ' +
        'Ripple (asynchronous) counter: each flip-flop is clocked by the output of the previous stage. ' +
        'Simple but introduces propagation glitches — the MSB changes only after n flip-flop delays. ' +
        'Synchronous counter: all flip-flops clocked simultaneously. Faster and glitch-free, at the ' +
        'cost of slightly more complex combinational logic for the J/K or T inputs.',

        'Presettable counters can be loaded with any starting value on a LOAD command, enabling ' +
        'arbitrary modulus: for MOD-6, load 0 when count reaches 6 (using a NAND gate detecting state 6). ' +
        'Up/down counters count in either direction based on a control input. ' +
        'Ring counter: a single 1 bit circulates through n flip-flops — n states but requires n flip-flops (less efficient than binary). ' +
        'Johnson (twisted ring) counter: feedback is inverted — 2n states from n flip-flops.',

        'Key ICs: 74HC74 (dual D flip-flop), 74HC76 (dual JK), 74HC194 (4-bit universal shift register), ' +
        '74HC163 (4-bit synchronous binary counter with synchronous load and clear), ' +
        '74HC273 (8-bit D register, used in the SIPO shift register lab).',
      ],
    },

    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Related ICs for Hands-On Labs',
      items: [
        { name: '74HC74 D Flip-Flop',       specification: 'Dual D flip-flop, DIP-14',                    quantity: '1' },
        { name: '74HC76 JK Flip-Flop',      specification: 'Dual JK flip-flop with preset/clear, DIP-16', quantity: '1' },
        { name: '74HC194 Shift Register',   specification: '4-bit bidirectional universal shift register',  quantity: '1' },
        { name: '74HC163 Counter',          specification: '4-bit synchronous binary counter, DIP-16',      quantity: '1' },
        { name: '74HC273 Register',         specification: '8-bit D register (see SIPO shift register lab)', quantity: '1' },
        { name: 'Breadboard',               specification: 'Standard 830-tie-point solderless breadboard', quantity: '1' },
        { name: 'Regulated DC Power Supply', specification: '+5 V DC, 500 mA',                             quantity: '1' },
      ],
    },

    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure — Conceptual Exercises',
      steps: [
        {
          label: 'Derive D flip-flop from JK flip-flop.',
          body: 'For a D flip-flop: Q_next = D. For JK: Q_next = J·Q\' + K\'·Q. ' +
            'Set J = D and K = D\'. Then: Q_next = D·Q\' + D\'\'·Q = D·Q\' + D·Q = D(Q\'+Q) = D. ✓ ' +
            'So connecting J to D and K to NOT(D) converts any JK to a D flip-flop.',
        },
        {
          label: 'Design a MOD-6 synchronous counter.',
          body: 'Use three D flip-flops (Q2, Q1, Q0). Normal sequence: 0→1→2→3→4→5→0. ' +
            'States 6 and 7 are unused. Use NAND(Q2, Q1) to detect state 6 (Q2=1, Q1=1) and ' +
            'synchronously load 000 on the next clock edge. ' +
            'This gives a divide-by-6 counter — used in digital clocks (seconds/minutes modulus).',
        },
        {
          label: 'Trace a 4-bit ripple counter.',
          body: 'Connect the Q̄ output of each flip-flop to the CLK of the next. ' +
            'Start at 0000. On first CLK↓: FF0 toggles → Q0=1. ' +
            'On second CLK↓: FF0 toggles back → Q0=0, Q0↓ triggers FF1 → Q1=1. State=0010. ' +
            'Continue to trace through 16 states. Note the glitch when state 7→8 (all bits change, ' +
            'each after a different delay).',
        },
        {
          label: 'Compare ring counter vs binary counter.',
          body: 'Ring counter (n=4): states 1000→0100→0010→0001→1000 (4 states from 4 flip-flops). ' +
            'Binary counter (n=4): 16 states from 4 flip-flops. ' +
            'Ring counter is less efficient (only n states) but simpler decoder logic — each state ' +
            'is directly indicated by one flip-flop output, no decoding needed.',
        },
      ],
    },

    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Synchronous counters are preferred over ripple counters in high-speed systems due to absence of propagation glitches.',
        'The 74HC163 synchronous counter has synchronous load and synchronous clear — enabling any modulus without external gates.',
        'Universal shift registers (74HC194) support all four modes (SIPO, SISO, PIPO, PISO) via two mode-select inputs.',
      ],
      table: {
        headers: ['Type', 'States', 'Flip-flops needed', 'Decoder needed', 'Common use'],
        rows: [
          ['Binary counter (n-bit)', '2ⁿ', 'n', 'Yes (for MOD-k)', 'General counting, frequency division'],
          ['Ring counter (n-bit)', 'n', 'n', 'No', 'Sequencer, state machine'],
          ['Johnson counter (n-bit)', '2n', 'n', 'Minimal', 'Glitch-free frequency divider'],
          ['LFSR (n-bit)', '2ⁿ−1', 'n', 'No', 'Pseudo-random number generation'],
        ],
      },
    },

    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'Registers and counters are the fundamental building blocks of sequential digital systems. ' +
        'D and JK flip-flops serve as the storage elements, with registers extending them to multi-bit ' +
        'storage and shift operations, and counters adding combinational logic to sequence through states.',

        'Synchronous design (all flip-flops share one clock) is the dominant approach in modern digital ' +
        'design because it eliminates timing hazards and simplifies timing analysis. The 74HC163 ' +
        'synchronous counter and 74HC194 universal shift register exemplify best-practice IC design.',

        'For hands-on implementation of shift registers and counters, refer to the SIPO Shift Register ' +
        'breadboard lab (74HC273) and the planned hands-on counter labs in the Semester 2 practical series.',
      ],
    },
  ],
};

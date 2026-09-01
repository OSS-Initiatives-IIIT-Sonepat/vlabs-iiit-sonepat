// ── Explore page data ──────────────────────────────────────────────────────
// Each subject groups a set of experiments. Semesters contain subjects.

export type ExploreExperiment = {
  id: string;
  title: string;
  description: string;
  circuitId: string;
  labRoute?: string;
  tags: readonly string[];
};

export type ExploreSubject = {
  id: string;
  title: string;
  description: string;
  circuitId: string;
  experiments: ExploreExperiment[];
};

export type ExploreSemester = {
  id: string;
  label: string;
  subjects: ExploreSubject[];
};

// ── Semester 1 ─────────────────────────────────────────────────────────────
const SEMESTER_1: ExploreSemester = {
  id: 'semester-1',
  label: 'Semester 1',
  subjects: [
    {
      id: 'analog-electronics',
      title: 'Analog Electronics',
      description:
        'Study passive and active components, diode characteristics, rectifiers, and transistor amplifiers. ' +
        'Build and test real circuits on a breadboard using oscilloscopes and multimeters.',
      circuitId: 'study-basic-components',
      experiments: [
        {
          id: 'study-basic-components',
          title: 'Study of basic electronic components and laboratory instruments',
          description: 'Get familiar with resistors, capacitors, diodes, LEDs, transistors, and the breadboard. Learn to use the multimeter, function generator, and oscilloscope.',
          circuitId: 'study-basic-components',
          labRoute: '/labs/study-basic-components',
          tags: ['components', 'instruments', 'breadboard', 'multimeter', 'oscilloscope'],
        },
        {
          id: 'pn-junction-diode',
          title: 'V-I characteristics of PN junction diode',
          description: 'Plot the voltage-current characteristic of a 1N4148 diode in both forward and reverse bias. Determine threshold voltage and dynamic resistance.',
          circuitId: 'pn-junction-diode',
          labRoute: '/labs/pn-junction-diode',
          tags: ['diode', 'pn junction', 'forward bias', 'reverse bias', 'characteristics'],
        },
        {
          id: 'zener-diode',
          title: 'V-I characteristics of Zener diode',
          description: 'Study the V-I characteristics of a Zener diode, especially in the reverse breakdown region. Determine the Zener voltage and Zener impedance.',
          circuitId: 'zener-diode',
          labRoute: '/labs/zener-diode',
          tags: ['zener', 'diode', 'breakdown', 'characteristics'],
        },
        {
          id: 'zener-voltage-regulator',
          title: 'Zener diode as a voltage regulator',
          description: 'Build a shunt voltage regulator using a Zener diode. Measure line and load regulation and verify constant output voltage.',
          circuitId: 'zener-voltage-regulator',
          labRoute: '/labs/zener-voltage-regulator',
          tags: ['zener', 'voltage regulator', 'line regulation', 'load regulation'],
        },
        {
          id: 'half-wave-rectifier',
          title: 'Half-wave rectifier',
          description: 'Build and analyse a half-wave rectifier circuit using a single 1N4148 diode. Observe pulsating DC output and measure ripple factor.',
          circuitId: 'half-wave-rectifier',
          labRoute: '/labs/half-wave-rectifier',
          tags: ['rectifier', 'diode', 'half-wave', 'ripple'],
        },
        {
          id: 'full-wave-rectifier',
          title: 'Full-wave rectifier',
          description: 'Build a bridge rectifier using four 1N4007 diodes. Compare output frequency, average voltage, and ripple factor with the half-wave rectifier.',
          circuitId: 'full-wave-rectifier',
          labRoute: '/labs/full-wave-rectifier',
          tags: ['rectifier', 'bridge', 'full-wave', 'ripple'],
        },
        {
          id: 'rectifiers-capacitor-filters',
          title: 'Rectifiers with capacitor filters',
          description: 'Add capacitor filters of varying values to a full-wave rectifier. Observe and quantify ripple reduction as a function of capacitance.',
          circuitId: 'rectifiers-capacitor-filters',
          labRoute: '/labs/rectifiers-capacitor-filters',
          tags: ['rectifier', 'filter', 'capacitor', 'ripple reduction'],
        },
        {
          id: 'ce-amplifier',
          title: 'Common Emitter amplifier',
          description: 'Design, build and characterise a BC547 common-emitter amplifier. Measure voltage gain, input/output impedance, and frequency response.',
          circuitId: 'ce-amplifier',
          labRoute: '/labs/ce-amplifier',
          tags: ['bjt', 'amplifier', 'common emitter', 'frequency response', 'gain'],
        },
        {
          id: 'cb-amplifier',
          title: 'Common-Base Amplifier Characteristics',
          description: 'Wire a BJT in common-base configuration and measure current gain (α), input/output impedance, and frequency response. Compare with CE stage.',
          circuitId: 'ce-amplifier',
          labRoute: '/labs/cb-amplifier',
          tags: ['bjt', 'amplifier', 'common base', 'alpha', 'current gain'],
        },
        {
          id: 'bjt-bias',
          title: 'BJT Bias Configurations',
          description: 'Compare fixed-bias and voltage-divider bias for a BC547 BJT. Measure Q-point stability against β variation and temperature changes.',
          circuitId: 'ce-amplifier',
          labRoute: '/labs/bjt-bias',
          tags: ['bjt', 'bias', 'q-point', 'voltage divider', 'stability'],
        },
        {
          id: 'mosfet-characteristics',
          title: 'MOSFET Drain & Transfer Characteristics',
          description: 'Plot ID vs VDS (output) and ID vs VGS (transfer) characteristics of a 2N7000 N-channel MOSFET. Determine threshold voltage and transconductance.',
          circuitId: 'ce-amplifier',
          labRoute: '/labs/mosfet-characteristics',
          tags: ['mosfet', 'drain characteristics', 'transfer characteristics', '2N7000', 'threshold voltage'],
        },
        {
          id: 'opamp-circuits',
          title: 'Inverting & Non-Inverting Op-Amp Amplifiers',
          description: 'Build inverting (Av = −10) and non-inverting (Av = +11) amplifier configurations using an LM741 op-amp. Verify gain, bandwidth, and phase relationship.',
          circuitId: 'ce-amplifier',
          labRoute: '/labs/opamp-circuits',
          tags: ['op-amp', 'lm741', 'inverting', 'non-inverting', 'voltage gain'],
        },
      ],
    },
    {
      id: 'electronics-and-electrical',
      title: 'Electronics and Electrical',
      description:
        'Verify fundamental DC circuit theorems experimentally. ' +
        'Build circuits with multiple sources and resistors, and apply Ohm\'s Law, KCL, KVL, and network theorems.',
      circuitId: 'ohms-law',
      experiments: [
        {
          id: 'ohms-law',
          title: "Verification of Ohm's Law",
          description: "Verify V = IR experimentally by measuring voltage across and current through resistors. Plot V-I characteristic and compute resistance from slope.",
          circuitId: 'ohms-law',
          labRoute: '/labs/ohms-law',
          tags: ['ohm', 'resistance', 'voltage', 'current', 'v-i graph'],
        },
        {
          id: 'kirchhoff-laws',
          title: "Kirchhoff's Current and Voltage Laws",
          description: "Build a multi-resistor DC circuit and verify KCL at nodes and KVL around loops. Confirm that currents and voltages obey conservation laws.",
          circuitId: 'kirchhoff-laws',
          labRoute: '/labs/kirchhoff-laws',
          tags: ['kirchhoff', 'kcl', 'kvl', 'dc circuit', 'nodes', 'loops'],
        },
        {
          id: 'superposition-theorem',
          title: 'Superposition Theorem',
          description: "Demonstrate that the response of a linear circuit with multiple independent sources equals the sum of responses from each source acting alone.",
          circuitId: 'superposition-theorem',
          labRoute: '/labs/superposition-theorem',
          tags: ['superposition', 'linear circuit', 'multiple sources', 'dc network'],
        },
        {
          id: 'thevenin-theorem',
          title: "Thevenin's Theorem",
          description: "Find the Thevenin equivalent (V_th and R_th) of a two-terminal DC network and verify that it delivers the same current to any load as the original circuit.",
          circuitId: 'thevenin-theorem',
          labRoute: '/labs/thevenin-theorem',
          tags: ['thevenin', 'equivalent circuit', 'V_th', 'R_th'],
        },
        {
          id: 'norton-theorem',
          title: "Norton's Theorem",
          description: "Find the Norton equivalent (I_N and R_N) of a two-terminal network and verify equivalence with the Thevenin circuit. Confirm R_N = R_th.",
          circuitId: 'norton-theorem',
          labRoute: '/labs/norton-theorem',
          tags: ['norton', 'equivalent circuit', 'short circuit current', 'source transformation'],
        },
      ],
    },
    {
      id: 'computer-application',
      title: 'Computer Application',
      description:
        'Implement and verify combinational logic circuits on a breadboard using 74HC-series ICs. ' +
        'Cover basic gates, adders, subtractors, multiplexers, and demultiplexers.',
      circuitId: 'logic-gates',
      experiments: [
        {
          id: 'logic-gates',
          title: 'Realisation of basic logic gates',
          description: 'Implement AND, OR, NOT, NAND, NOR, XOR, and XNOR gates using 74HC-series ICs. Verify the truth table of each gate using LEDs.',
          circuitId: 'logic-gates',
          labRoute: '/labs/logic-gates',
          tags: ['logic gates', 'and', 'or', 'not', 'nand', 'nor', 'xor', '74hc'],
        },
        {
          id: 'half-adder-logic',
          title: 'Half Adder',
          description: 'A half adder adds two single-bit inputs A and B, producing a Sum (XOR) and Carry (AND) bit. Built using 74HC86 and 74HC08 ICs.',
          circuitId: 'half-adder',
          labRoute: '/labs/half-adder',
          tags: ['adder', 'xor', 'and', 'sum', 'carry', 'combinational logic'],
        },
        {
          id: 'full-adder-logic',
          title: 'Full Adder',
          description: 'A full adder accepts carry-in enabling multi-bit addition. Built with two XOR gates, two AND gates, and one OR gate.',
          circuitId: 'full-adder',
          labRoute: '/labs/full-adder',
          tags: ['adder', 'carry-in', 'sum', 'carry-out', 'combinational logic'],
        },
        {
          id: 'half-subtractor-logic',
          title: 'Half Subtractor',
          description: 'The half subtractor computes A − B, yielding a Difference (XOR) and a Borrow ((NOT A) AND B).',
          circuitId: 'half-subtractor',
          labRoute: '/labs/half-subtractor',
          tags: ['subtractor', 'difference', 'borrow', 'xor', 'not', 'and'],
        },
        {
          id: 'full-subtractor-logic',
          title: 'Full Subtractor',
          description: 'The full subtractor handles a borrow-in, allowing cascading multi-bit subtraction. Built with two XOR, NOT, two AND, and OR gates.',
          circuitId: 'full-subtractor',
          labRoute: '/labs/full-subtractor',
          tags: ['subtractor', 'borrow-in', 'difference', 'borrow-out', 'multi-bit'],
        },
        {
          id: 'mux-logic',
          title: '2:1 Multiplexer',
          description: 'A multiplexer selects one of two data inputs and routes it to the output based on a select line. Y = A·S\' + B·S.',
          circuitId: 'mux',
          labRoute: '/labs/mux-2to1',
          tags: ['mux', 'multiplexer', 'selector', 'data routing', 'not', 'and', 'or'],
        },
        {
          id: 'demux-logic',
          title: '1:2 Demultiplexer',
          description: 'A demultiplexer routes a single data input to one of two outputs based on a select line. S=0: Y0=I, Y1=0. S=1: Y0=0, Y1=I.',
          circuitId: 'demux',
          labRoute: '/labs/demux-1to2',
          tags: ['demux', 'demultiplexer', 'address decoding', 'not', 'and'],
        },
      ],
    },
  ],
};

// ── Semester 2 ─────────────────────────────────────────────────────────────
const SEMESTER_2: ExploreSemester = {
  id: 'semester-2',
  label: 'Semester 2',
  subjects: [
    {
      id: 'digital-electronics',
      title: 'Digital Electronics',
      description:
        'Implement encoders, decoders, and MUX/DEMUX-based logic on a breadboard. ' +
        'Explore Boolean minimisation and address decoding used in memory systems.',
      circuitId: 'encoder',
      experiments: [
        {
          id: 'encoder-4to2',
          title: '4:2 Priority Encoder',
          description: 'A priority encoder converts four active-high input lines to a 2-bit binary code. Built from two OR gates using 74HC32.',
          circuitId: 'encoder',
          labRoute: '/labs/encoder-4to2',
          tags: ['encoder', 'priority', 'binary code', 'or gate', '74hc32'],
        },
        {
          id: 'decoder-2to4',
          title: '2:4 Binary Decoder',
          description: 'A binary decoder maps a 2-bit input to one of four mutually exclusive output lines. Built with two NOT and four AND gates.',
          circuitId: 'decoder',
          labRoute: '/labs/decoder-2to4',
          tags: ['decoder', 'binary', 'address decode', 'not', 'and', '74hc04', '74hc08'],
        },
        {
          id: 'mux-based-logic',
          title: 'MUX-based Boolean Logic',
          description: 'Implement arbitrary 2-variable Boolean functions (AND, OR, XOR) using only a 2:1 multiplexer. Foundation of FPGA LUT design.',
          circuitId: 'mux-based-logic',
          labRoute: '/labs/mux-based-logic',
          tags: ['mux', 'lut', 'fpga', 'boolean function', 'universal gate'],
        },
        {
          id: 'demux-address-decoder',
          title: 'DEMUX as Address Decoder',
          description: 'Use a 1:2 DEMUX as an active-low address decoder to select one of two peripheral devices on a shared bus.',
          circuitId: 'demux-address-decoder',
          labRoute: '/labs/demux-address-decoder',
          tags: ['demux', 'address decoder', 'bus', 'peripheral select', 'active-low'],
        },
      ],
    },
    {
      id: 'advanced-adders',
      title: 'Advanced Adder Circuits',
      description:
        'Revisit the half adder with focus on propagation delay and timing, then extend to a 4-bit ripple-carry adder. ' +
        'Measure inter-stage delay using an oscilloscope.',
      circuitId: 'half-adder-revisit',
      experiments: [
        {
          id: 'half-adder-revisit',
          title: 'Half Adder — Propagation Delay Study',
          description: 'Revisit the half adder with a focus on propagation delay, fan-out limits, and supply-voltage effects on switching speed of 74HC-series ICs.',
          circuitId: 'half-adder-revisit',
          labRoute: '/labs/half-adder-revisit',
          tags: ['adder', 'propagation delay', 'fan-out', '74hc', 'timing', 'oscilloscope'],
        },
        {
          id: 'full-adder-ripple',
          title: 'Full Adder (4-bit Ripple Carry)',
          description: 'Chain four full adders to build a 4-bit ripple-carry adder. Observe the cumulative carry propagation delay through all stages.',
          circuitId: 'full-adder-ripple',
          labRoute: '/labs/full-adder-ripple',
          tags: ['ripple carry', '4-bit adder', 'carry propagation', 'alu', 'delay'],
        },
      ],
    },
    {
      id: 'combinational-logic',
      title: 'Combinational Logic',
      description:
        'Extend combinational design to code converters, larger multiplexers/demultiplexers, and multi-bit adder/subtractor ICs. ' +
        'Use standard 74HC MSI parts and verify truth tables experimentally.',
      circuitId: 'decoder',
      experiments: [
        {
          id: 'bcd-xs3-converter',
          title: 'BCD to Excess-3 Code Converter',
          description: 'Design and implement a combinational circuit that converts a 4-bit BCD input to its Excess-3 equivalent using basic logic gates.',
          circuitId: 'decoder',
          labRoute: '/labs/bcd-xs3-converter',
          tags: ['bcd', 'excess-3', 'code converter', 'combinational', 'logic gates'],
        },
        {
          id: 'gray-binary-converter',
          title: 'Gray Code ↔ Binary Converter',
          description: 'Build bidirectional converters between Gray code and binary using XOR gates. Verify all 4-bit input combinations.',
          circuitId: 'decoder',
          labRoute: '/labs/gray-binary-converter',
          tags: ['gray code', 'binary', 'code converter', 'xor', 'combinational'],
        },
        {
          id: 'mux-4to1-ic',
          title: '4:1 Multiplexer using 74HC153',
          description: 'Wire a 74HC153 dual 4:1 MUX IC to route one of four data inputs to the output. Verify operation for all select-line combinations.',
          circuitId: 'mux-based-logic',
          labRoute: '/labs/mux-4to1-ic',
          tags: ['mux', '4:1 multiplexer', '74hc153', 'data selection', 'combinational'],
        },
        {
          id: 'demux-1to4-ic',
          title: '1:4 Demultiplexer using 74HC139',
          description: 'Configure a 74HC139 dual 2:4 decoder/demultiplexer as a 1:4 DEMUX. Route a single input to one of four outputs via address lines.',
          circuitId: 'demux-address-decoder',
          labRoute: '/labs/demux-1to4-ic',
          tags: ['demux', '1:4 demultiplexer', '74hc139', 'address lines', 'combinational'],
        },
        {
          id: 'binary-adder-4bit',
          title: '4-bit Binary Adder using 74HC283',
          description: 'Use the 74HC283 4-bit full adder IC to add two 4-bit numbers. Observe carry-out and verify the sum for all operand combinations.',
          circuitId: 'full-adder-ripple',
          labRoute: '/labs/binary-adder-4bit',
          tags: ['adder', '4-bit', '74hc283', 'carry-out', 'combinational'],
        },
        {
          id: 'binary-subtractor-4bit',
          title: "4-bit Binary Subtractor (2's Complement)",
          description: "Implement a 4-bit subtractor by combining a 74HC283 adder with XOR inverters and carry-in set to 1, realising 2's complement subtraction.",
          circuitId: 'full-adder-ripple',
          labRoute: '/labs/binary-subtractor-4bit',
          tags: ["2's complement", 'subtractor', '4-bit', 'xor', '74hc283'],
        },
      ],
    },
    {
      id: 'sequential-logic',
      title: 'Sequential Logic',
      description:
        'Build and characterise latches, flip-flops, and counters using 74HC-series ICs. ' +
        'Understand state transitions, clock edges, and asynchronous counter operation.',
      circuitId: 'half-adder',
      experiments: [
        {
          id: 'sr-latch',
          title: 'SR Latch using 74HC279',
          description: 'Implement an SR latch using the 74HC279 quad SR latch IC. Observe set, reset, and hold states and identify the forbidden input condition.',
          circuitId: 'half-adder',
          labRoute: '/labs/sr-latch',
          tags: ['latch', 'sr latch', '74hc279', 'sequential', 'set reset'],
        },
        {
          id: 'd-flip-flop',
          title: 'D Flip-Flop using 74HC74',
          description: 'Use the 74HC74 dual D flip-flop IC to capture data on the rising clock edge. Verify the characteristic table and observe propagation delay.',
          circuitId: 'half-adder',
          labRoute: '/labs/d-flip-flop',
          tags: ['flip-flop', 'd flip-flop', '74hc74', 'clock edge', 'sequential'],
        },
        {
          id: 'jk-t-flip-flop',
          title: 'JK and T Flip-Flop using 74HC76',
          description: 'Configure the 74HC76 JK flip-flop in JK and toggle (T) modes. Observe toggle, set, reset, and hold states and verify frequency division.',
          circuitId: 'half-adder',
          labRoute: '/labs/jk-t-flip-flop',
          tags: ['flip-flop', 'jk flip-flop', 't flip-flop', '74hc76', 'toggle', 'sequential'],
        },
        {
          id: 'mod5-counter',
          title: 'MOD-5 Asynchronous Counter using 74HC93',
          description: 'Wire the 74HC93 4-bit ripple counter with feedback to implement a MOD-5 counter. Observe the count sequence and reset glitch on an oscilloscope.',
          circuitId: 'half-adder',
          labRoute: '/labs/mod5-counter',
          tags: ['counter', 'mod-5', 'asynchronous', '74hc93', 'ripple counter', 'sequential'],
        },
      ],
    },
    {
      id: 'digital-logic-design',
      title: 'Digital Logic Design',
      description:
        'Apply systematic minimisation techniques, parity logic, magnitude comparison, and shift registers. ' +
        'Design with Karnaugh maps and verify using 74HC-series ICs.',
      circuitId: 'decoder',
      experiments: [
        {
          id: 'gate-level-minimization',
          title: 'Gate-Level Minimization (K-maps)',
          description: 'Apply Karnaugh map minimisation to reduce multi-variable Boolean expressions to minimal SOP/POS forms and implement the optimised circuit.',
          circuitId: 'decoder',
          labRoute: '/labs/gate-level-minimization',
          tags: ['k-map', 'karnaugh', 'minimization', 'sop', 'pos', 'boolean algebra'],
        },
        {
          id: 'parity-checker',
          title: 'Parity Checker/Generator',
          description: 'Build an even/odd parity generator and checker circuit using XOR gates. Verify error-detection capability by introducing single-bit errors.',
          circuitId: 'decoder',
          labRoute: '/labs/parity-checker',
          tags: ['parity', 'error detection', 'xor', 'parity checker', 'parity generator'],
        },
        {
          id: 'digital-comparator',
          title: '4-bit Digital Magnitude Comparator',
          description: 'Design a 4-bit magnitude comparator that asserts A>B, A=B, or A<B outputs. Implement using XNOR gates and cascaded logic.',
          circuitId: 'decoder',
          labRoute: '/labs/digital-comparator',
          tags: ['comparator', '4-bit', 'magnitude', 'xnor', 'combinational'],
        },
        {
          id: 'shift-register',
          title: '8-bit SIPO Shift Register using 74HC273',
          description: 'Configure the 74HC273 octal D flip-flop as a serial-in parallel-out shift register. Clock in 8 bits serially and read the parallel output.',
          circuitId: 'half-adder',
          labRoute: '/labs/shift-register',
          tags: ['shift register', 'sipo', '74hc273', 'serial to parallel', 'sequential'],
        },
      ],
    },
  ],
};

// ── Semester 3 ─────────────────────────────────────────────────────────────
const SEMESTER_3: ExploreSemester = {
  id: 'semester-3',
  label: 'Semester 3',
  subjects: [
    {
      id: 'combinational-arithmetic',
      title: 'Combinational Arithmetic',
      description:
        'Advance from basic gates to multi-bit adders, carry-lookahead logic, and high-speed multiplier architectures. ' +
        'Covers both interactive simulations and theory-based treatments.',
      circuitId: 'full-adder-ripple',
      experiments: [
        {
          id: 'intro-gates-review',
          title: 'Introduction to Gates — Review',
          description: 'A concise review of all basic and universal logic gates, truth tables, Boolean identities, and De Morgan\'s theorem as a foundation for arithmetic circuits.',
          circuitId: 'full-adder-ripple',
          labRoute: '/labs/intro-gates-review',
          tags: ['gates', 'review', 'boolean algebra', 'de morgan', 'theory'],
        },
        {
          id: 'full-adder-ripple',
          title: 'Ripple Carry Adder',
          description: 'Chain four full adders to build a 4-bit ripple-carry adder and study cumulative carry propagation delay through all stages.',
          circuitId: 'full-adder-ripple',
          labRoute: '/labs/full-adder-ripple',
          tags: ['ripple carry', '4-bit adder', 'carry propagation', 'alu', 'delay'],
        },
        {
          id: 'cla-adder',
          title: 'Carry-Look-Ahead Adder (Theory)',
          description: 'Study the carry-lookahead technique that eliminates ripple delay by computing all carry signals in parallel using generate and propagate terms.',
          circuitId: 'full-adder-ripple',
          labRoute: '/labs/cla-adder',
          tags: ['carry lookahead', 'cla', 'adder', 'generate', 'propagate', 'theory'],
        },
        {
          id: 'registers-counters-theory',
          title: 'Registers and Counters (Theory)',
          description: 'Study the internal structure of shift registers, binary counters, and their use in data storage, frequency division, and sequence generation.',
          circuitId: 'full-adder-ripple',
          labRoute: '/labs/registers-counters-theory',
          tags: ['registers', 'counters', 'shift register', 'binary counter', 'theory'],
        },
        {
          id: 'wallace-tree',
          title: 'Wallace Tree Multiplier (Theory)',
          description: 'Explore the Wallace tree reduction technique that compresses partial products in O(log n) stages to achieve high-speed multiplication.',
          circuitId: 'full-adder-ripple',
          labRoute: '/labs/wallace-tree',
          tags: ['wallace tree', 'multiplier', 'partial products', 'fast adder', 'theory'],
        },
        {
          id: 'combinational-multipliers',
          title: 'Combinational Array Multiplier (Theory)',
          description: 'Study the array multiplier architecture where AND gates generate partial products and a cascade of adder rows accumulates the final product.',
          circuitId: 'full-adder-ripple',
          labRoute: '/labs/combinational-multipliers',
          tags: ['array multiplier', 'partial products', 'combinational', 'multiplication', 'theory'],
        },
        {
          id: 'booths-multiplier',
          title: "Booth's Multiplication Algorithm",
          description: "Learn Booth's radix-2 algorithm for signed binary multiplication. Trace through the add/subtract and shift steps using worked examples.",
          circuitId: 'full-adder-ripple',
          labRoute: '/labs/booths-multiplier',
          tags: ["booth's algorithm", 'signed multiplication', 'radix-2', 'two\'s complement', 'theory'],
        },
      ],
    },
    {
      id: 'memory-cpu-systems',
      title: 'Memory & CPU Systems',
      description:
        'Explore ALU design, memory organisation, cache hierarchies, and the fetch-decode-execute cycle. ' +
        'All experiments in this section are coming soon.',
      circuitId: 'decoder',
      experiments: [
        {
          id: 'alu-simulation',
          title: 'Arithmetic Logic Unit Simulation',
          description: 'Simulate a simple 4-bit ALU supporting ADD, SUB, AND, OR, and NOT operations. Observe flag outputs (carry, zero, overflow).',
          circuitId: 'decoder',
          labRoute: '/labs/alu-simulation',
          tags: ['alu', 'arithmetic logic unit', 'flags', 'simulation', 'cpu'],
        },
        {
          id: 'memory-design',
          title: 'Memory Design — RAM & ROM',
          description: 'Study the internal organisation of static RAM and ROM cells. Simulate read/write operations and understand address decoding.',
          circuitId: 'decoder',
          labRoute: '/labs/memory-design',
          tags: ['ram', 'rom', 'memory', 'address decode', 'read write'],
        },
        {
          id: 'cache-direct-mapped',
          title: 'Direct-Mapped Cache Design',
          description: 'Implement a direct-mapped cache and trace hit/miss behaviour for a sequence of memory accesses. Compute hit rate and average access time.',
          circuitId: 'decoder',
          labRoute: '/labs/cache-direct-mapped',
          tags: ['cache', 'direct mapped', 'hit rate', 'miss penalty', 'memory hierarchy'],
        },
        {
          id: 'cache-associative',
          title: 'Fully-Associative Cache Design',
          description: 'Explore fully-associative cache with LRU replacement policy. Compare hit rates against direct-mapped cache for the same access sequences.',
          circuitId: 'decoder',
          labRoute: '/labs/cache-associative',
          tags: ['cache', 'fully associative', 'lru', 'replacement policy', 'memory'],
        },
        {
          id: 'cpu-design',
          title: 'CPU Fetch-Decode-Execute Simulation',
          description: 'Trace the fetch, decode, and execute stages of a simple single-cycle CPU. Observe register file, ALU, and memory interactions cycle by cycle.',
          circuitId: 'decoder',
          labRoute: '/labs/cpu-design',
          tags: ['cpu', 'fetch decode execute', 'instruction cycle', 'register file', 'simulation'],
        },
      ],
    },
    {
      id: 'programming-fundamentals',
      title: 'Programming Fundamentals',
      description:
        'Write and execute C programs covering mathematical expressions and file I/O. ' +
        'Use an in-browser editor with real-time compilation feedback.',
      circuitId: 'half-adder',
      experiments: [
        {
          id: 'c-expressions',
          title: 'C — Mathematical Expressions',
          description: 'Write C programs that evaluate arithmetic, relational, logical, and bitwise expressions. Observe operator precedence and type-conversion behaviour.',
          circuitId: 'half-adder',
          labRoute: '/labs/c-expressions',
          tags: ['c programming', 'expressions', 'operators', 'precedence', 'type conversion'],
        },
        {
          id: 'c-file-operations-1',
          title: 'C — File Operations I',
          description: 'Open, read, and write text files in C using fopen, fprintf, fscanf, and fclose. Handle common file errors and end-of-file conditions.',
          circuitId: 'half-adder',
          labRoute: '/labs/c-file-operations-1',
          tags: ['c programming', 'file i/o', 'fopen', 'fprintf', 'fscanf'],
        },
        {
          id: 'c-file-operations-2',
          title: 'C — File Operations II',
          description: 'Extend file handling to binary files, random access with fseek/ftell, and structured record read/write using fread and fwrite.',
          circuitId: 'half-adder',
          labRoute: '/labs/c-file-operations-2',
          tags: ['c programming', 'binary files', 'fseek', 'fread', 'fwrite', 'random access'],
        },
      ],
    },
  ],
};

// ── Semester 4 ─────────────────────────────────────────────────────────────
const SEMESTER_4: ExploreSemester = {
  id: 'semester-4',
  label: 'Semester 4',
  subjects: [
    {
      id: '8085-assembly-programming',
      title: '8085 Assembly Programming',
      description:
        'Write and simulate Intel 8085 assembly programs covering arithmetic, sorting, and data conversion. ' +
        'All experiments in this section are coming soon.',
      circuitId: 'half-adder',
      experiments: [
        {
          id: '8085-add-sub-8bit',
          title: 'Addition & Subtraction of 8-bit Numbers',
          description: 'Write 8085 assembly programs to add and subtract two 8-bit numbers stored in memory. Observe the accumulator and flag register after execution.',
          circuitId: 'half-adder',
          labRoute: '/labs/8085-add-sub-8bit',
          tags: ['8085', 'assembly', 'addition', 'subtraction', '8-bit'],
        },
        {
          id: '8085-add-sub-carry',
          title: 'Addition/Subtraction with Carry/Borrow',
          description: 'Handle multi-precision arithmetic by using ADC and SBB instructions to propagate carry and borrow across 8-bit boundaries.',
          circuitId: 'half-adder',
          labRoute: '/labs/8085-add-sub-carry',
          tags: ['8085', 'assembly', 'adc', 'sbb', 'carry', 'borrow'],
        },
        {
          id: '8085-bcd-addition',
          title: 'BCD Addition using DAA',
          description: 'Perform packed BCD addition using the DAA (Decimal Adjust Accumulator) instruction. Verify the result for two-digit BCD operands.',
          circuitId: 'half-adder',
          labRoute: '/labs/8085-bcd-addition',
          tags: ['8085', 'bcd', 'daa', 'decimal adjust', 'assembly'],
        },
        {
          id: '8085-multiply-8bit',
          title: 'Multiplication by Repeated Addition',
          description: 'Implement 8-bit unsigned multiplication in 8085 assembly using a repeated-addition loop. Track the loop counter and accumulator across iterations.',
          circuitId: 'half-adder',
          labRoute: '/labs/8085-multiply-8bit',
          tags: ['8085', 'assembly', 'multiplication', 'repeated addition', 'loop'],
        },
        {
          id: '8085-divide-8bit',
          title: 'Division by Repeated Subtraction',
          description: 'Implement 8-bit unsigned division in 8085 assembly by repeatedly subtracting the divisor. Capture the quotient and remainder.',
          circuitId: 'half-adder',
          labRoute: '/labs/8085-divide-8bit',
          tags: ['8085', 'assembly', 'division', 'repeated subtraction', 'quotient', 'remainder'],
        },
        {
          id: '8085-array-sum',
          title: 'Sum of Array Elements',
          description: 'Write an 8085 program that iterates over an array stored in memory and accumulates the sum, handling carry into a second register.',
          circuitId: 'half-adder',
          labRoute: '/labs/8085-array-sum',
          tags: ['8085', 'assembly', 'array', 'sum', 'loop', 'memory'],
        },
        {
          id: '8085-array-square',
          title: 'Square of Array Elements',
          description: 'Square each element of a byte array using repeated-addition multiplication and store the 16-bit results back in memory.',
          circuitId: 'half-adder',
          labRoute: '/labs/8085-array-square',
          tags: ['8085', 'assembly', 'array', 'square', 'multiplication', 'memory'],
        },
        {
          id: '8085-min-max',
          title: 'Find Smallest & Largest in Array',
          description: 'Scan a byte array using compare instructions to locate the minimum and maximum values. Store both results in designated memory locations.',
          circuitId: 'half-adder',
          labRoute: '/labs/8085-min-max',
          tags: ['8085', 'assembly', 'array', 'minimum', 'maximum', 'compare'],
        },
        {
          id: '8085-bubble-sort',
          title: 'Bubble Sort (Ascending/Descending)',
          description: 'Implement bubble sort on a byte array in 8085 assembly. Support both ascending and descending order by changing the compare condition.',
          circuitId: 'half-adder',
          labRoute: '/labs/8085-bubble-sort',
          tags: ['8085', 'assembly', 'bubble sort', 'sorting', 'array', 'compare'],
        },
        {
          id: '8085-bcd-binary-conv',
          title: 'BCD to Binary Conversion and Vice-Versa',
          description: 'Convert a two-digit packed BCD value to its binary equivalent and back. Validate the round-trip for all BCD values 00–99.',
          circuitId: 'half-adder',
          labRoute: '/labs/8085-bcd-binary-conv',
          tags: ['8085', 'assembly', 'bcd', 'binary', 'conversion'],
        },
        {
          id: '8085-sqrt',
          title: 'Square Root of 8-bit Number',
          description: 'Compute the integer square root of an 8-bit number using a successive-approximation loop in 8085 assembly.',
          circuitId: 'half-adder',
          labRoute: '/labs/8085-sqrt',
          tags: ['8085', 'assembly', 'square root', 'approximation', '8-bit'],
        },
      ],
    },
    {
      id: 'peripheral-interfacing',
      title: 'Peripheral Interfacing',
      description:
        'Interface digital I/O, display, and analog conversion peripherals with a microcontroller. ' +
        'Cover GPIO, 7-segment display driving, ADC, and DAC techniques.',
      circuitId: 'gpio-interfacing',
      experiments: [
        {
          id: 'gpio-interfacing',
          title: 'GPIO Interfacing with LEDs and Switches',
          description: 'Interface GPIO pins with LEDs (via 330 Ω resistors) and switches (with pull-down resistors). Understand current sourcing/sinking and logic levels.',
          circuitId: 'gpio-interfacing',
          labRoute: '/labs/gpio-interfacing',
          tags: ['gpio', 'microcontroller', 'led', 'switch', 'pull-down', 'logic levels'],
        },
        {
          id: 'seven-segment-display',
          title: 'Seven Segment Display Interface',
          description: 'Drive a common-cathode 7-segment display using a decoder IC with 330 Ω current-limiting resistors. Display digits 0–9.',
          circuitId: 'seven-segment-display',
          labRoute: '/labs/seven-segment-display',
          tags: ['seven segment', 'display', 'decoder', '74hc138', 'current limiting'],
        },
        {
          id: 'adc-dac',
          title: 'ADC and DAC Interfacing',
          description: 'Interface an ADC0804 to read analog voltage from a potentiometer. Build an R-2R DAC ladder to convert 4-bit digital input to analog output.',
          circuitId: 'adc-dac',
          labRoute: '/labs/adc-dac',
          tags: ['adc', 'dac', 'analog', 'digital conversion', 'r-2r', 'potentiometer'],
        },
      ],
    },
  ],
};

export const EXPLORE_SEMESTERS: readonly ExploreSemester[] = [SEMESTER_1, SEMESTER_2, SEMESTER_3, SEMESTER_4];

export const FEATURED_SUBJECT = {
  id: SEMESTER_1.subjects[0].experiments[0].id,
  title: SEMESTER_1.subjects[0].experiments[0].title,
  description: SEMESTER_1.subjects[0].experiments[0].description,
  circuitId: SEMESTER_1.subjects[0].experiments[0].circuitId,
  category: SEMESTER_1.subjects[0].title,
  tags: SEMESTER_1.subjects[0].experiments[0].tags,
  labRoute: SEMESTER_1.subjects[0].experiments[0].labRoute,
};

export const ALL_EXPERIMENTS: readonly (ExploreExperiment & { subjectTitle: string; semesterLabel: string })[] =
  EXPLORE_SEMESTERS.flatMap((s) =>
    s.subjects.flatMap((sub) =>
      sub.experiments.map((exp) => ({
        ...exp,
        subjectTitle: sub.title,
        semesterLabel: s.label,
      })),
    ),
  );

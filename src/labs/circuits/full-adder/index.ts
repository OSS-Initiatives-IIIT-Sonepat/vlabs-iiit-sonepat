import { type Circuit } from '@/labs/types';

// Full Adder = two Half Adders + an OR gate
// Inputs: A, B, Cin  →  Outputs: Sum, Cout
// Uses: 2× XOR (74HC86), 2× AND (74HC08), 1× OR (74HC32)

export const FullAdder: Circuit = {
  id: 'full-adder',
  title: 'Full Adder',
  description:
    'A full adder adds three bits: A, B and a carry-in (Cin). ' +
    'It produces a Sum and a Carry-out. ' +
    'Built from two XOR gates, two AND gates, and one OR gate.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // First XOR: Sum1 = A XOR B
    { id: 'xor1', type: 'xor-gate', mountedAt: { board: 'bb', col: 4, row: 'e' } },
    // Second XOR: Sum = Sum1 XOR Cin
    { id: 'xor2', type: 'xor-gate', mountedAt: { board: 'bb', col: 13, row: 'e' } },
    // First AND: A AND B
    { id: 'and1', type: 'and-gate', mountedAt: { board: 'bb', col: 4,  row: 'h' } },
    // Second AND: Sum1 AND Cin
    { id: 'and2', type: 'and-gate', mountedAt: { board: 'bb', col: 13, row: 'h' } },
    // OR: Cout = (A AND B) OR (Sum1 AND Cin)
    { id: 'or1',  type: 'or-gate', mountedAt: { board: 'bb', col: 22, row: 'e' } },

    // Output resistors — r_sum NOT at col24 (or1.Y lands there due to or1 at col22+2=col24)
    // Use col25 to avoid the col24 conflict in the top bank
    { id: 'r_sum',  type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 25, row: 'c' } },
    { id: 'r_cout', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 25, row: 'h' } },

    // Output LEDs — placed past resistor p2 (col25+3=28) to avoid any col overlap
    { id: 'led_sum',  type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 29, row: 'c' } },
    { id: 'led_cout', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 29, row: 'h' } },

    // Input A (red)
    { id: 'w_a_xor1', type: 'wire', color: 'red',  from: { board: 'bb', col: 1, row: 'a' }, to: { ic: 'xor1', pin: 'A' } },
    { id: 'w_a_and1', type: 'wire', color: 'red',  from: { board: 'bb', col: 1, row: 'b' }, to: { ic: 'and1', pin: 'A' } },
    // Input B (blue)
    { id: 'w_b_xor1', type: 'wire', color: 'blue', from: { board: 'bb', col: 2, row: 'a' }, to: { ic: 'xor1', pin: 'B' } },
    { id: 'w_b_and1', type: 'wire', color: 'blue', from: { board: 'bb', col: 2, row: 'b' }, to: { ic: 'and1', pin: 'B' } },
    // Cin (orange)
    { id: 'w_cin_xor2', type: 'wire', color: 'orange', from: { board: 'bb', col: 3, row: 'a' }, to: { ic: 'xor2', pin: 'B' } },
    { id: 'w_cin_and2', type: 'wire', color: 'orange', from: { board: 'bb', col: 3, row: 'b' }, to: { ic: 'and2', pin: 'B' } },
    // XOR1 → XOR2 (Sum1 wire)
    { id: 'w_sum1', type: 'wire', color: 'white', from: { ic: 'xor1', pin: 'Y' }, to: { ic: 'xor2', pin: 'A' } },
    { id: 'w_sum1_and2', type: 'wire', color: 'white', from: { ic: 'xor1', pin: 'Y' }, to: { ic: 'and2', pin: 'A' } },
    // AND outputs to OR
    { id: 'w_and1_or', type: 'wire', color: 'yellow', from: { ic: 'and1', pin: 'Y' }, to: { ic: 'or1', pin: 'A' } },
    { id: 'w_and2_or', type: 'wire', color: 'yellow', from: { ic: 'and2', pin: 'Y' }, to: { ic: 'or1', pin: 'B' } },
    // Sum output
    { id: 'w_sum_r',   type: 'wire', color: 'green',  from: { ic: 'xor2', pin: 'Y' },        to: { component: 'r_sum',  end: 'p1' } },
    { id: 'w_sum_led', type: 'wire', color: 'green',  from: { component: 'r_sum',  end: 'p2' }, to: { led: 'led_sum',  end: 'anode' } },
    // Cout output
    { id: 'w_cout_r',   type: 'wire', color: 'orange', from: { ic: 'or1', pin: 'Y' },          to: { component: 'r_cout', end: 'p1' } },
    { id: 'w_cout_led', type: 'wire', color: 'yellow', from: { component: 'r_cout', end: 'p2' }, to: { led: 'led_cout', end: 'anode' } },
    // Ground
    { id: 'w_gnd1', type: 'wire', color: 'black', from: { led: 'led_sum',  end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 1 } },
    { id: 'w_gnd2', type: 'wire', color: 'black', from: { led: 'led_cout', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 2 } },
  ],

  steps: [
    { title: 'Place the breadboard', body: 'The base for our full adder. We need more columns than the half adder — three inputs, two outputs.', show: ['bb'] },
    { title: 'Place XOR gates', body: 'Two 74HC86 XOR gates: first computes A XOR B (Sum1), second computes Sum1 XOR Cin (final Sum).', show: ['bb','xor1','xor2'], highlight: 'xor1' },
    { title: 'Place AND gates', body: 'Two 74HC08 AND gates: first computes A AND B, second computes Sum1 AND Cin. Both feed the carry logic.', show: ['bb','xor1','xor2','and1','and2'], highlight: 'and1' },
    { title: 'Place OR gate for Carry-out', body: 'One 74HC32 OR gate: Cout = (A AND B) OR (Sum1 AND Cin). If either AND is true, we have a carry.', show: ['bb','xor1','xor2','and1','and2','or1'], highlight: 'or1' },
    { title: 'Wire all inputs', body: 'Red = A, Blue = B, Orange = Cin. Each input fans out to both its XOR and AND gate.', show: ['bb','xor1','xor2','and1','and2','or1','w_a_xor1','w_a_and1','w_b_xor1','w_b_and1','w_cin_xor2','w_cin_and2'], activeInputs: { A: 0, B: 0, Cin: 0 } },
    { title: 'Connect internal wires', body: 'White wires carry Sum1 (XOR1 output) to both XOR2 and AND2. Yellow wires carry both AND outputs to the OR gate.', show: ['bb','xor1','xor2','and1','and2','or1','w_a_xor1','w_a_and1','w_b_xor1','w_b_and1','w_cin_xor2','w_cin_and2','w_sum1','w_sum1_and2','w_and1_or','w_and2_or'], activeInputs: { A: 0, B: 0, Cin: 0 } },
    { title: 'Add output LEDs and test', body: 'Green LED = Sum, Yellow LED = Cout. Test: A=1, B=1, Cin=1 → Sum=1, Cout=1.', show: ['bb','xor1','xor2','and1','and2','or1','w_a_xor1','w_a_and1','w_b_xor1','w_b_and1','w_cin_xor2','w_cin_and2','w_sum1','w_sum1_and2','w_and1_or','w_and2_or','r_sum','r_cout','led_sum','led_cout','w_sum_r','w_sum_led','w_cout_r','w_cout_led','w_gnd1','w_gnd2'], highlight: 'led_sum', activeInputs: { A: 1, B: 1, Cin: 1 } },
  ],

  truthTable: {
    inputs: ['A', 'B', 'Cin'],
    outputs: ['Sum', 'Cout'],
    rows: [
      { inputs: { A:0, B:0, Cin:0 }, outputs: { Sum:0, Cout:0 } },
      { inputs: { A:0, B:0, Cin:1 }, outputs: { Sum:1, Cout:0 } },
      { inputs: { A:0, B:1, Cin:0 }, outputs: { Sum:1, Cout:0 } },
      { inputs: { A:0, B:1, Cin:1 }, outputs: { Sum:0, Cout:1 } },
      { inputs: { A:1, B:0, Cin:0 }, outputs: { Sum:1, Cout:0 } },
      { inputs: { A:1, B:0, Cin:1 }, outputs: { Sum:0, Cout:1 } },
      { inputs: { A:1, B:1, Cin:0 }, outputs: { Sum:0, Cout:1 } },
      { inputs: { A:1, B:1, Cin:1 }, outputs: { Sum:1, Cout:1 } },
    ],
  },
};


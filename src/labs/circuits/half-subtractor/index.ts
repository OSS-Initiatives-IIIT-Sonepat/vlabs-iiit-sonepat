import { type Circuit } from '@/labs/types';

// Half Subtractor: A - B → Difference = A XOR B, Borrow = (NOT A) AND B

export const HalfSubtractor: Circuit = {
  id: 'half-subtractor',
  title: 'Half Subtractor',
  description:
    'A half subtractor computes A minus B. ' +
    'Difference = A XOR B. Borrow = (NOT A) AND B. ' +
    'Built from one XOR gate, one NOT gate, and one AND gate.',

  components: [
    { id: 'bb', type: 'breadboard' },
    { id: 'xor1', type: 'xor-gate', mountedAt: { board: 'bb', col: 5,  row: 'e' } },
    { id: 'not1', type: 'not-gate', mountedAt: { board: 'bb', col: 13, row: 'e' } },
    { id: 'and1', type: 'and-gate', mountedAt: { board: 'bb', col: 20, row: 'e' } },

    { id: 'r_diff',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 24, row: 'c' } },
    { id: 'r_borrow', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 24, row: 'h' } },
    { id: 'led_diff',   type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 28, row: 'c' } },
    { id: 'led_borrow', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 28, row: 'h' } },

    { id: 'w_a_xor', type: 'wire', color: 'red',  from: { board: 'bb', col: 2, row: 'a' }, to: { ic: 'xor1', pin: 'A' } },
    { id: 'w_b_xor', type: 'wire', color: 'blue', from: { board: 'bb', col: 3, row: 'a' }, to: { ic: 'xor1', pin: 'B' } },
    { id: 'w_a_not', type: 'wire', color: 'red',  from: { board: 'bb', col: 2, row: 'b' }, to: { ic: 'not1', pin: 'A' } },
    { id: 'w_not_and', type: 'wire', color: 'white', from: { ic: 'not1', pin: 'Y' }, to: { ic: 'and1', pin: 'A' } },
    { id: 'w_b_and',   type: 'wire', color: 'blue',  from: { board: 'bb', col: 3, row: 'b' }, to: { ic: 'and1', pin: 'B' } },

    { id: 'w_diff_r',   type: 'wire', color: 'green', from: { ic: 'xor1', pin: 'Y' },           to: { component: 'r_diff',   end: 'p1' } },
    { id: 'w_diff_led', type: 'wire', color: 'green', from: { component: 'r_diff',   end: 'p2' }, to: { led: 'led_diff',   end: 'anode' } },
    { id: 'w_bor_r',    type: 'wire', color: 'orange', from: { ic: 'and1', pin: 'Y' },            to: { component: 'r_borrow', end: 'p1' } },
    { id: 'w_bor_led',  type: 'wire', color: 'red',   from: { component: 'r_borrow', end: 'p2' }, to: { led: 'led_borrow', end: 'anode' } },
    { id: 'w_gnd1', type: 'wire', color: 'black', from: { led: 'led_diff',   end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 1 } },
    { id: 'w_gnd2', type: 'wire', color: 'black', from: { led: 'led_borrow', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 2 } },
  ],

  steps: [
    { title: 'Place the breadboard', body: 'Half subtractor uses three gates: XOR, NOT, AND.', show: ['bb'] },
    { title: 'Place XOR and NOT gates', body: 'XOR computes the Difference bit. NOT inverts input A for the borrow logic.', show: ['bb','xor1','not1'], highlight: 'xor1' },
    { title: 'Place AND gate', body: 'AND takes (NOT A) and B. Output is the Borrow: we borrow only when A=0 and B=1.', show: ['bb','xor1','not1','and1'], highlight: 'and1' },
    { title: 'Wire inputs', body: 'Red=A fans to XOR and NOT. Blue=B fans to XOR and AND.', show: ['bb','xor1','not1','and1','w_a_xor','w_b_xor','w_a_not','w_b_and'], activeInputs: { A: 0, B: 0 } },
    { title: 'Connect NOT to AND', body: 'White wire carries the inverted A to AND gate input.', show: ['bb','xor1','not1','and1','w_a_xor','w_b_xor','w_a_not','w_b_and','w_not_and'], activeInputs: { A: 0, B: 0 } },
    { title: 'Add outputs and test', body: 'Green=Difference, Red=Borrow. Test: A=0,B=1 → Diff=1, Borrow=1.', show: ['bb','xor1','not1','and1','w_a_xor','w_b_xor','w_a_not','w_b_and','w_not_and','r_diff','r_borrow','led_diff','led_borrow','w_diff_r','w_diff_led','w_bor_r','w_bor_led','w_gnd1','w_gnd2'], highlight: 'led_borrow', activeInputs: { A: 0, B: 1 } },
  ],

  truthTable: {
    inputs: ['A', 'B'],
    outputs: ['Diff', 'Borrow'],
    rows: [
      { inputs: { A:0, B:0 }, outputs: { Diff:0, Borrow:0 } },
      { inputs: { A:0, B:1 }, outputs: { Diff:1, Borrow:1 } },
      { inputs: { A:1, B:0 }, outputs: { Diff:1, Borrow:0 } },
      { inputs: { A:1, B:1 }, outputs: { Diff:0, Borrow:0 } },
    ],
  },
};

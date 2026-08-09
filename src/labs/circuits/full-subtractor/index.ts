import { type Circuit } from '@/labs/types';

export const FullSubtractor: Circuit = {
  id: 'full-subtractor',
  title: 'Full Subtractor',
  description:
    'A full subtractor computes A - B - Bin. ' +
    'Outputs: Difference = A XOR B XOR Bin, Borrow-out = (NOT A AND B) OR (NOT A AND Bin) OR (B AND Bin). ' +
    'Built from two XOR, three AND, two NOT, one OR gate.',

  components: [
    { id: 'bb', type: 'breadboard' },
    { id: 'xor1', type: 'xor-gate', mountedAt: { board: 'bb', col: 3,  row: 'e' } },
    { id: 'xor2', type: 'xor-gate', mountedAt: { board: 'bb', col: 11, row: 'e' } },
    { id: 'not1', type: 'not-gate', mountedAt: { board: 'bb', col: 3,  row: 'h' } },
    { id: 'and1', type: 'and-gate', mountedAt: { board: 'bb', col: 11, row: 'h' } },
    { id: 'and2', type: 'and-gate', mountedAt: { board: 'bb', col: 16, row: 'h' } },
    { id: 'or1',  type: 'or-gate', mountedAt: { board: 'bb', col: 21, row: 'h' } },

    { id: 'r_diff', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 24, row: 'c' } },
    { id: 'r_bout', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 27, row: 'c' } },
    { id: 'led_diff', type: 'led', color: 'green', mountedAt: { board: 'bb', col: 24, row: 'a' } },
    { id: 'led_bout', type: 'led', color: 'red',   mountedAt: { board: 'bb', col: 27, row: 'a' } },

    { id: 'w_a_xor1', type: 'wire', color: 'red',    from: { board: 'bb', col: 1, row: 'a' }, to: { ic: 'xor1', pin: 'A' } },
    { id: 'w_b_xor1', type: 'wire', color: 'blue',   from: { board: 'bb', col: 2, row: 'a' }, to: { ic: 'xor1', pin: 'B' } },
    { id: 'w_bin_xor2', type: 'wire', color: 'orange', from: { board: 'bb', col: 3, row: 'a' }, to: { ic: 'xor2', pin: 'B' } },
    { id: 'w_d1_xor2', type: 'wire', color: 'white',  from: { ic: 'xor1', pin: 'Y' }, to: { ic: 'xor2', pin: 'A' } },
    { id: 'w_a_not', type: 'wire', color: 'red',   from: { board: 'bb', col: 1, row: 'b' }, to: { ic: 'not1', pin: 'A' } },
    { id: 'w_nota_and1', type: 'wire', color: 'white', from: { ic: 'not1', pin: 'Y' }, to: { ic: 'and1', pin: 'A' } },
    { id: 'w_b_and1',  type: 'wire', color: 'blue',   from: { board: 'bb', col: 2, row: 'b' }, to: { ic: 'and1', pin: 'B' } },
    { id: 'w_nota_and2', type: 'wire', color: 'white', from: { ic: 'not1', pin: 'Y' }, to: { ic: 'and2', pin: 'A' } },
    { id: 'w_bin_and2', type: 'wire', color: 'orange', from: { board: 'bb', col: 3, row: 'b' }, to: { ic: 'and2', pin: 'B' } },
    { id: 'w_and1_or', type: 'wire', color: 'yellow', from: { ic: 'and1', pin: 'Y' }, to: { ic: 'or1', pin: 'A' } },
    { id: 'w_and2_or', type: 'wire', color: 'yellow', from: { ic: 'and2', pin: 'Y' }, to: { ic: 'or1', pin: 'B' } },

    { id: 'w_diff_r',  type: 'wire', color: 'green',  from: { ic: 'xor2', pin: 'Y' },            to: { component: 'r_diff', end: 'p1' } },
    { id: 'w_diff_led',type: 'wire', color: 'green',  from: { component: 'r_diff', end: 'p2' },   to: { led: 'led_diff', end: 'anode' } },
    { id: 'w_bout_r',  type: 'wire', color: 'orange', from: { ic: 'or1',  pin: 'Y' },             to: { component: 'r_bout', end: 'p1' } },
    { id: 'w_bout_led',type: 'wire', color: 'red',    from: { component: 'r_bout', end: 'p2' },   to: { led: 'led_bout', end: 'anode' } },
    { id: 'w_gnd1', type: 'wire', color: 'black', from: { led: 'led_diff', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 1 } },
    { id: 'w_gnd2', type: 'wire', color: 'black', from: { led: 'led_bout', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 2 } },
  ],

  steps: [
    { title: 'Place breadboard', body: 'Full subtractor needs two XOR, one NOT, two AND, one OR gate.', show: ['bb'] },
    { title: 'Place XOR gates', body: 'XOR1: A XOR B = D1. XOR2: D1 XOR Bin = final Difference.', show: ['bb','xor1','xor2'], highlight: 'xor1' },
    { title: 'Place NOT and AND gates', body: 'NOT inverts A. AND1: (NOT A) AND B. AND2: (NOT A) AND Bin.', show: ['bb','xor1','xor2','not1','and1','and2'], highlight: 'not1' },
    { title: 'Place OR gate', body: 'OR combines both AND outputs to produce Borrow-out.', show: ['bb','xor1','xor2','not1','and1','and2','or1'], highlight: 'or1' },
    { title: 'Wire all connections', body: 'Red=A, Blue=B, Orange=Bin. White wires carry intermediate signals.', show: ['bb','xor1','xor2','not1','and1','and2','or1','w_a_xor1','w_b_xor1','w_bin_xor2','w_d1_xor2','w_a_not','w_nota_and1','w_b_and1','w_nota_and2','w_bin_and2','w_and1_or','w_and2_or'], activeInputs: { A:0, B:0, Bin:0 } },
    { title: 'Add outputs and test', body: 'Green=Diff, Red=Borrow. Test A=0,B=1,Bin=0 → Diff=1, Borrow=1.', show: ['bb','xor1','xor2','not1','and1','and2','or1','w_a_xor1','w_b_xor1','w_bin_xor2','w_d1_xor2','w_a_not','w_nota_and1','w_b_and1','w_nota_and2','w_bin_and2','w_and1_or','w_and2_or','r_diff','r_bout','led_diff','led_bout','w_diff_r','w_diff_led','w_bout_r','w_bout_led','w_gnd1','w_gnd2'], highlight: 'led_bout', activeInputs: { A:0, B:1, Bin:0 } },
  ],

  truthTable: {
    inputs: ['A','B','Bin'],
    outputs: ['Diff','Bout'],
    rows: [
      { inputs:{A:0,B:0,Bin:0}, outputs:{Diff:0,Bout:0} },
      { inputs:{A:0,B:0,Bin:1}, outputs:{Diff:1,Bout:1} },
      { inputs:{A:0,B:1,Bin:0}, outputs:{Diff:1,Bout:1} },
      { inputs:{A:0,B:1,Bin:1}, outputs:{Diff:0,Bout:1} },
      { inputs:{A:1,B:0,Bin:0}, outputs:{Diff:1,Bout:0} },
      { inputs:{A:1,B:0,Bin:1}, outputs:{Diff:0,Bout:0} },
      { inputs:{A:1,B:1,Bin:0}, outputs:{Diff:0,Bout:0} },
      { inputs:{A:1,B:1,Bin:1}, outputs:{Diff:1,Bout:1} },
    ],
  },
};


import { type Circuit } from '@/labs/types';

// 2:1 MUX — Y = (A AND NOT S) OR (B AND S)
// S=0 → Y=A, S=1 → Y=B

export const Mux2to1: Circuit = {
  id: 'mux',
  title: '2:1 Multiplexer (MUX)',
  description:
    'A 2-to-1 MUX selects one of two inputs (A or B) based on select line S. ' +
    'When S=0, output Y=A. When S=1, output Y=B. ' +
    'Built from one NOT, two AND, one OR gate.',

  components: [
    { id: 'bb', type: 'breadboard' },
    { id: 'not1', type: 'not-gate', mountedAt: { board: 'bb', col: 4,  row: 'e' } },
    { id: 'and1', type: 'and-gate', mountedAt: { board: 'bb', col: 11, row: 'e' } },
    { id: 'and2', type: 'and-gate', mountedAt: { board: 'bb', col: 18, row: 'e' } },
    { id: 'or1',  type: 'or-gate', mountedAt: { board: 'bb', col: 22, row: 'e' } },

    { id: 'r_out', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 25, row: 'c' } },
    { id: 'led_out', type: 'led', color: 'green', mountedAt: { board: 'bb', col: 25, row: 'a' } },

    // S → NOT
    { id: 'w_s_not', type: 'wire', color: 'orange', from: { board: 'bb', col: 1, row: 'a' }, to: { ic: 'not1', pin: 'A' } },
    // NOT S → AND1
    { id: 'w_nots_and1', type: 'wire', color: 'white', from: { ic: 'not1', pin: 'Y' }, to: { ic: 'and1', pin: 'A' } },
    // A → AND1
    { id: 'w_a_and1', type: 'wire', color: 'red',  from: { board: 'bb', col: 2, row: 'a' }, to: { ic: 'and1', pin: 'B' } },
    // S → AND2
    { id: 'w_s_and2', type: 'wire', color: 'orange', from: { board: 'bb', col: 1, row: 'b' }, to: { ic: 'and2', pin: 'A' } },
    // B → AND2
    { id: 'w_b_and2', type: 'wire', color: 'blue', from: { board: 'bb', col: 3, row: 'a' }, to: { ic: 'and2', pin: 'B' } },
    // AND1 → OR
    { id: 'w_and1_or', type: 'wire', color: 'yellow', from: { ic: 'and1', pin: 'Y' }, to: { ic: 'or1', pin: 'A' } },
    // AND2 → OR
    { id: 'w_and2_or', type: 'wire', color: 'yellow', from: { ic: 'and2', pin: 'Y' }, to: { ic: 'or1', pin: 'B' } },
    // Output
    { id: 'w_out_r',   type: 'wire', color: 'green', from: { ic: 'or1', pin: 'Y' },          to: { component: 'r_out', end: 'p1' } },
    { id: 'w_out_led', type: 'wire', color: 'green', from: { component: 'r_out', end: 'p2' }, to: { led: 'led_out', end: 'anode' } },
    { id: 'w_gnd', type: 'wire', color: 'black', from: { led: 'led_out', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 1 } },
  ],

  steps: [
    { title: 'Place breadboard', body: 'A 2:1 MUX needs NOT + 2×AND + OR. The select line controls which input reaches the output.', show: ['bb'] },
    { title: 'Place NOT gate', body: 'NOT gate inverts the select line S. We need both S and NOT S.', show: ['bb','not1'], highlight: 'not1' },
    { title: 'Place AND gates', body: 'AND1: A AND (NOT S). AND2: B AND S. Each gate passes its data input only when selected.', show: ['bb','not1','and1','and2'], highlight: 'and1' },
    { title: 'Place OR gate', body: 'OR combines both AND outputs. Only one will be active at a time based on S.', show: ['bb','not1','and1','and2','or1'], highlight: 'or1' },
    { title: 'Wire everything', body: 'Orange=S, Red=A, Blue=B. White carries NOT S internally.', show: ['bb','not1','and1','and2','or1','w_s_not','w_nots_and1','w_a_and1','w_s_and2','w_b_and2','w_and1_or','w_and2_or'], activeInputs: { S:0, A:1, B:0 } },
    { title: 'Test: S=0 selects A, S=1 selects B', body: 'S=0, A=1, B=0 → Y=1. S=1, A=1, B=0 → Y=0. The select line routes the signal.', show: ['bb','not1','and1','and2','or1','w_s_not','w_nots_and1','w_a_and1','w_s_and2','w_b_and2','w_and1_or','w_and2_or','r_out','led_out','w_out_r','w_out_led','w_gnd'], highlight: 'led_out', activeInputs: { S:0, A:1, B:0 } },
  ],

  truthTable: {
    inputs: ['S','A','B'],
    outputs: ['Y'],
    rows: [
      { inputs:{S:0,A:0,B:0}, outputs:{Y:0} },
      { inputs:{S:0,A:1,B:0}, outputs:{Y:1} },
      { inputs:{S:0,A:0,B:1}, outputs:{Y:0} },
      { inputs:{S:0,A:1,B:1}, outputs:{Y:1} },
      { inputs:{S:1,A:0,B:0}, outputs:{Y:0} },
      { inputs:{S:1,A:1,B:0}, outputs:{Y:0} },
      { inputs:{S:1,A:0,B:1}, outputs:{Y:1} },
      { inputs:{S:1,A:1,B:1}, outputs:{Y:1} },
    ],
  },
};


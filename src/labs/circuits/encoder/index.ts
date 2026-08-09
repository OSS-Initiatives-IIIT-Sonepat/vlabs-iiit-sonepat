import { type Circuit } from '@/labs/types';

// 4:2 Priority Encoder — encodes which of 4 inputs (I0-I3) is HIGH
// A = I2 OR I3,  B = I1 OR I3

export const Encoder4to2: Circuit = {
  id: 'encoder',
  title: '4:2 Priority Encoder',
  description:
    'A 4-to-2 encoder takes 4 input lines (only one HIGH at a time) and outputs a 2-bit binary code. ' +
    'Input I0→00, I1→01, I2→10, I3→11. ' +
    'Built from two OR gates.',

  components: [
    { id: 'bb', type: 'breadboard' },
    // A = I2 OR I3
    { id: 'or_a', type: 'or-gate', mountedAt: { board: 'bb', col: 8,  row: 'e' } },
    // B = I1 OR I3
    { id: 'or_b', type: 'or-gate', mountedAt: { board: 'bb', col: 16, row: 'e' } },

    { id: 'r_a', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 22, row: 'c' } },
    { id: 'r_b', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 25, row: 'c' } },
    { id: 'led_a', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 22, row: 'a' } },
    { id: 'led_b', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 25, row: 'a' } },

    // I2 → OR_A
    { id: 'w_i2_ora', type: 'wire', color: 'blue',   from: { board: 'bb', col: 3, row: 'a' }, to: { ic: 'or_a', pin: 'A' } },
    // I3 → OR_A and OR_B
    { id: 'w_i3_ora', type: 'wire', color: 'orange', from: { board: 'bb', col: 4, row: 'a' }, to: { ic: 'or_a', pin: 'B' } },
    { id: 'w_i3_orb', type: 'wire', color: 'orange', from: { board: 'bb', col: 4, row: 'b' }, to: { ic: 'or_b', pin: 'B' } },
    // I1 → OR_B
    { id: 'w_i1_orb', type: 'wire', color: 'red',    from: { board: 'bb', col: 2, row: 'a' }, to: { ic: 'or_b', pin: 'A' } },

    { id: 'w_a_r',   type: 'wire', color: 'green',  from: { ic: 'or_a', pin: 'Y' },          to: { component: 'r_a', end: 'p1' } },
    { id: 'w_a_led', type: 'wire', color: 'green',  from: { component: 'r_a', end: 'p2' },   to: { led: 'led_a', end: 'anode' } },
    { id: 'w_b_r',   type: 'wire', color: 'yellow', from: { ic: 'or_b', pin: 'Y' },          to: { component: 'r_b', end: 'p1' } },
    { id: 'w_b_led', type: 'wire', color: 'yellow', from: { component: 'r_b', end: 'p2' },   to: { led: 'led_b', end: 'anode' } },
    { id: 'w_gnd1', type: 'wire', color: 'black', from: { led: 'led_a', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 1 } },
    { id: 'w_gnd2', type: 'wire', color: 'black', from: { led: 'led_b', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 2 } },
  ],

  steps: [
    { title: 'Place breadboard', body: 'A 4:2 encoder needs just two OR gates. Output A is the MSB, B is the LSB.', show: ['bb'] },
    { title: 'Place OR gates', body: 'OR-A produces output bit A = I2 OR I3. OR-B produces output bit B = I1 OR I3.', show: ['bb','or_a','or_b'], highlight: 'or_a' },
    { title: 'Wire inputs', body: 'I1=Red, I2=Blue, I3=Orange. I3 connects to both OR gates since it sets both output bits.', show: ['bb','or_a','or_b','w_i2_ora','w_i3_ora','w_i3_orb','w_i1_orb'], activeInputs: { I0:0, I1:0, I2:0, I3:0 } },
    { title: 'Test encoding', body: 'Assert I3=1: A=1, B=1 → binary 11. Assert I2=1: A=1, B=0 → binary 10.', show: ['bb','or_a','or_b','w_i2_ora','w_i3_ora','w_i3_orb','w_i1_orb','r_a','r_b','led_a','led_b','w_a_r','w_a_led','w_b_r','w_b_led','w_gnd1','w_gnd2'], highlight: 'led_a', activeInputs: { I0:0, I1:0, I2:1, I3:0 } },
  ],

  truthTable: {
    inputs: ['I3','I2','I1','I0'],
    outputs: ['A','B'],
    rows: [
      { inputs:{I3:0,I2:0,I1:0,I0:1}, outputs:{A:0,B:0} },
      { inputs:{I3:0,I2:0,I1:1,I0:0}, outputs:{A:0,B:1} },
      { inputs:{I3:0,I2:1,I1:0,I0:0}, outputs:{A:1,B:0} },
      { inputs:{I3:1,I2:0,I1:0,I0:0}, outputs:{A:1,B:1} },
    ],
  },
};


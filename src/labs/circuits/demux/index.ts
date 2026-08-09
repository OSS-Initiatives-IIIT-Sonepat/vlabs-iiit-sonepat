import { type Circuit } from '@/labs/types';

// 1:2 DEMUX — routes input I to Y0 (S=0) or Y1 (S=1)
// Y0 = I AND (NOT S),  Y1 = I AND S

export const Demux1to2: Circuit = {
  id: 'demux',
  title: '1:2 Demultiplexer (DEMUX)',
  description:
    'A 1-to-2 DEMUX routes a single input I to one of two outputs (Y0 or Y1) based on select line S. ' +
    'S=0 → Y0=I, Y1=0. S=1 → Y0=0, Y1=I. ' +
    'Built from one NOT and two AND gates.',

  components: [
    { id: 'bb', type: 'breadboard' },
    { id: 'not1', type: 'not-gate', mountedAt: { board: 'bb', col: 5,  row: 'e' } },
    { id: 'and1', type: 'and-gate', mountedAt: { board: 'bb', col: 12, row: 'e' } },
    { id: 'and2', type: 'and-gate', mountedAt: { board: 'bb', col: 19, row: 'e' } },

    { id: 'r_y0', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 23, row: 'c' } },
    { id: 'r_y1', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 26, row: 'c' } },
    { id: 'led_y0', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 23, row: 'a' } },
    { id: 'led_y1', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 26, row: 'a' } },

    // S → NOT
    { id: 'w_s_not',   type: 'wire', color: 'orange', from: { board: 'bb', col: 2, row: 'a' }, to: { ic: 'not1', pin: 'A' } },
    // NOT S → AND1
    { id: 'w_ns_and1', type: 'wire', color: 'white',  from: { ic: 'not1', pin: 'Y' },          to: { ic: 'and1', pin: 'A' } },
    // I → AND1, AND2
    { id: 'w_i_and1',  type: 'wire', color: 'red', from: { board: 'bb', col: 1, row: 'a' }, to: { ic: 'and1', pin: 'B' } },
    { id: 'w_i_and2',  type: 'wire', color: 'red', from: { board: 'bb', col: 1, row: 'b' }, to: { ic: 'and2', pin: 'B' } },
    // S → AND2
    { id: 'w_s_and2',  type: 'wire', color: 'orange', from: { board: 'bb', col: 2, row: 'b' }, to: { ic: 'and2', pin: 'A' } },
    // Y0, Y1 outputs
    { id: 'w_y0_r',   type: 'wire', color: 'green',  from: { ic: 'and1', pin: 'Y' },           to: { component: 'r_y0', end: 'p1' } },
    { id: 'w_y0_led', type: 'wire', color: 'green',  from: { component: 'r_y0', end: 'p2' },   to: { led: 'led_y0', end: 'anode' } },
    { id: 'w_y1_r',   type: 'wire', color: 'yellow', from: { ic: 'and2', pin: 'Y' },           to: { component: 'r_y1', end: 'p1' } },
    { id: 'w_y1_led', type: 'wire', color: 'yellow', from: { component: 'r_y1', end: 'p2' },   to: { led: 'led_y1', end: 'anode' } },
    { id: 'w_gnd1', type: 'wire', color: 'black', from: { led: 'led_y0', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 1 } },
    { id: 'w_gnd2', type: 'wire', color: 'black', from: { led: 'led_y1', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 2 } },
  ],

  steps: [
    { title: 'Place breadboard', body: 'DEMUX routes one input to one of several outputs. This 1:2 version uses NOT + 2×AND.', show: ['bb'] },
    { title: 'Place NOT gate', body: 'Inverts S so AND1 (Y0 path) is enabled when S=0.', show: ['bb','not1'], highlight: 'not1' },
    { title: 'Place AND gates', body: 'AND1 = Y0 path (enabled by NOT S). AND2 = Y1 path (enabled by S).', show: ['bb','not1','and1','and2'], highlight: 'and1' },
    { title: 'Wire inputs', body: 'Red=I (data), Orange=S (select). I goes to both ANDs. S controls which one is active.', show: ['bb','not1','and1','and2','w_s_not','w_ns_and1','w_i_and1','w_i_and2','w_s_and2'], activeInputs: { S:0, I:1 } },
    { title: 'Test: S=0 routes to Y0', body: 'S=0, I=1 → Y0=1 (green LED on), Y1=0 (yellow off). The signal takes the Y0 path.', show: ['bb','not1','and1','and2','w_s_not','w_ns_and1','w_i_and1','w_i_and2','w_s_and2','r_y0','r_y1','led_y0','led_y1','w_y0_r','w_y0_led','w_y1_r','w_y1_led','w_gnd1','w_gnd2'], highlight: 'led_y0', activeInputs: { S:0, I:1 } },
  ],

  truthTable: {
    inputs: ['S','I'],
    outputs: ['Y0','Y1'],
    rows: [
      { inputs:{S:0,I:0}, outputs:{Y0:0,Y1:0} },
      { inputs:{S:0,I:1}, outputs:{Y0:1,Y1:0} },
      { inputs:{S:1,I:0}, outputs:{Y0:0,Y1:0} },
      { inputs:{S:1,I:1}, outputs:{Y0:0,Y1:1} },
    ],
  },
};

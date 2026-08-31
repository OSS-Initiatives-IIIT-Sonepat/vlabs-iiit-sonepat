import { type Circuit } from '@/labs/types';

// 2:4 Decoder — enables exactly one of 4 outputs based on 2-bit input (A,B)
// Y0=A'B', Y1=A'B, Y2=AB', Y3=AB

export const Decoder2to4: Circuit = {
  id: 'decoder',
  title: '2:4 Binary Decoder',
  description:
    'A 2-to-4 decoder takes a 2-bit binary input (A,B) and activates exactly one of 4 outputs. ' +
    '00→Y0, 01→Y1, 10→Y2, 11→Y3. ' +
    'Built from two NOT gates and four AND gates.',

  components: [
    { id: 'bb', type: 'breadboard' },
    { id: 'not_a', type: 'not-gate', mountedAt: { board: 'bb', col: 3,  row: 'e' } },
    { id: 'not_b', type: 'not-gate', mountedAt: { board: 'bb', col: 3,  row: 'h' } },
    { id: 'and0',  type: 'and-gate', mountedAt: { board: 'bb', col: 9,  row: 'e' } }, // Y0: A'B'
    { id: 'and1',  type: 'and-gate', mountedAt: { board: 'bb', col: 14, row: 'e' } }, // Y1: A'B
    { id: 'and2',  type: 'and-gate', mountedAt: { board: 'bb', col: 9,  row: 'h' } }, // Y2: AB'
    { id: 'and3',  type: 'and-gate', mountedAt: { board: 'bb', col: 14, row: 'h' } }, // Y3: AB

    // Output layout — resistors at col17 (past and1/and3 col range 14-16),
    // LEDs at col21 (cathode col22, which ≠ r2.p1 col24). 4 independent paths.
    { id: 'r0', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 17, row: 'c' } },
    { id: 'r1', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 17, row: 'h' } },
    { id: 'r2', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 24, row: 'c' } },
    { id: 'r3', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 24, row: 'h' } },
    { id: 'led0', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 21, row: 'c' } },
    { id: 'led1', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 21, row: 'h' } },
    { id: 'led2', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 28, row: 'c' } },
    { id: 'led3', type: 'led', color: 'blue',   mountedAt: { board: 'bb', col: 28, row: 'h' } },

    // Inputs
    { id: 'w_a_na',   type: 'wire', color: 'red',   from: { board: 'bb', col: 1, row: 'a' }, to: { ic: 'not_a', pin: 'A' } },
    { id: 'w_b_nb',   type: 'wire', color: 'blue',  from: { board: 'bb', col: 2, row: 'a' }, to: { ic: 'not_b', pin: 'A' } },
    // AND0: A'B' → Y0
    { id: 'w_na_and0', type: 'wire', color: 'white',  from: { ic: 'not_a', pin: 'Y' }, to: { ic: 'and0', pin: 'A' } },
    { id: 'w_nb_and0', type: 'wire', color: 'white',  from: { ic: 'not_b', pin: 'Y' }, to: { ic: 'and0', pin: 'B' } },
    // AND1: A'B → Y1
    { id: 'w_na_and1', type: 'wire', color: 'white',  from: { ic: 'not_a', pin: 'Y' }, to: { ic: 'and1', pin: 'A' } },
    { id: 'w_b_and1',  type: 'wire', color: 'blue',   from: { board: 'bb', col: 2, row: 'b' }, to: { ic: 'and1', pin: 'B' } },
    // AND2: AB' → Y2
    { id: 'w_a_and2',  type: 'wire', color: 'red',    from: { board: 'bb', col: 1, row: 'b' }, to: { ic: 'and2', pin: 'A' } },
    { id: 'w_nb_and2', type: 'wire', color: 'white',  from: { ic: 'not_b', pin: 'Y' }, to: { ic: 'and2', pin: 'B' } },
    // AND3: AB → Y3
    { id: 'w_a_and3',  type: 'wire', color: 'red',    from: { board: 'bb', col: 1, row: 'c' }, to: { ic: 'and3', pin: 'A' } },
    { id: 'w_b_and3',  type: 'wire', color: 'blue',   from: { board: 'bb', col: 2, row: 'c' }, to: { ic: 'and3', pin: 'B' } },
    // Outputs
    { id: 'w_y0_r',   type: 'wire', color: 'red',    from: { ic: 'and0', pin: 'Y' }, to: { component: 'r0', end: 'p1' } },
    { id: 'w_y0_led', type: 'wire', color: 'red',    from: { component: 'r0', end: 'p2' }, to: { led: 'led0', end: 'anode' } },
    { id: 'w_y1_r',   type: 'wire', color: 'yellow', from: { ic: 'and1', pin: 'Y' }, to: { component: 'r1', end: 'p1' } },
    { id: 'w_y1_led', type: 'wire', color: 'yellow', from: { component: 'r1', end: 'p2' }, to: { led: 'led1', end: 'anode' } },
    { id: 'w_y2_r',   type: 'wire', color: 'green',  from: { ic: 'and2', pin: 'Y' }, to: { component: 'r2', end: 'p1' } },
    { id: 'w_y2_led', type: 'wire', color: 'green',  from: { component: 'r2', end: 'p2' }, to: { led: 'led2', end: 'anode' } },
    { id: 'w_y3_r',   type: 'wire', color: 'blue',   from: { ic: 'and3', pin: 'Y' }, to: { component: 'r3', end: 'p1' } },
    { id: 'w_y3_led', type: 'wire', color: 'blue',   from: { component: 'r3', end: 'p2' }, to: { led: 'led3', end: 'anode' } },
    { id: 'w_g0', type: 'wire', color: 'black', from: { led: 'led0', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 1 } },
    { id: 'w_g1', type: 'wire', color: 'black', from: { led: 'led1', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 2 } },
    { id: 'w_g2', type: 'wire', color: 'black', from: { led: 'led2', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 3 } },
    { id: 'w_g3', type: 'wire', color: 'black', from: { led: 'led3', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 4 } },
  ],

  steps: [
    { title: 'Place breadboard', body: '2:4 decoder: 2 NOT gates + 4 AND gates. Exactly one output goes HIGH at a time.', show: ['bb'] },
    { title: 'Place NOT gates', body: 'NOT-A inverts input A. NOT-B inverts input B. We need both true and complemented forms.', show: ['bb','not_a','not_b'], highlight: 'not_a' },
    { title: 'Place AND gates', body: 'Four AND gates, one per output: Y0=A\'B\', Y1=A\'B, Y2=AB\', Y3=AB.', show: ['bb','not_a','not_b','and0','and1','and2','and3'], highlight: 'and0' },
    { title: 'Wire inputs', body: 'Red=A, Blue=B. Each goes straight to its NOT gate and also fans out to relevant AND gates.', show: ['bb','not_a','not_b','and0','and1','and2','and3','w_a_na','w_b_nb','w_na_and0','w_nb_and0','w_na_and1','w_b_and1','w_a_and2','w_nb_and2','w_a_and3','w_b_and3'], activeInputs: { A:0, B:0 } },
    { title: 'Add outputs and test', body: 'A=1,B=0 → only Y2 (green) lights. A=1,B=1 → only Y3 (blue) lights.', show: ['bb','not_a','not_b','and0','and1','and2','and3','w_a_na','w_b_nb','w_na_and0','w_nb_and0','w_na_and1','w_b_and1','w_a_and2','w_nb_and2','w_a_and3','w_b_and3','r0','r1','r2','r3','led0','led1','led2','led3','w_y0_r','w_y0_led','w_y1_r','w_y1_led','w_y2_r','w_y2_led','w_y3_r','w_y3_led','w_g0','w_g1','w_g2','w_g3'], highlight: 'led2', activeInputs: { A:1, B:0 } },
  ],

  truthTable: {
    inputs: ['A','B'],
    outputs: ['Y0','Y1','Y2','Y3'],
    rows: [
      { inputs:{A:0,B:0}, outputs:{Y0:1,Y1:0,Y2:0,Y3:0} },
      { inputs:{A:0,B:1}, outputs:{Y0:0,Y1:1,Y2:0,Y3:0} },
      { inputs:{A:1,B:0}, outputs:{Y0:0,Y1:0,Y2:1,Y3:0} },
      { inputs:{A:1,B:1}, outputs:{Y0:0,Y1:0,Y2:0,Y3:1} },
    ],
  },
};

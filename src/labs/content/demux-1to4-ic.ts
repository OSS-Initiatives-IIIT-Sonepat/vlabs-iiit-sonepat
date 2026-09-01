import { type LabContent } from '@/labs/lab-content.types';

export const Demux1to4ICContent: LabContent = {
  id: 'demux-1to4-ic',
  title: '1:4 Demultiplexer using 74HC139',
  circuitId: 'demux-1to4-ic',

  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A demultiplexer (DEMUX) is the inverse of a multiplexer: it takes a single input and routes ' +
        'it to one of several outputs based on select lines. A 1:4 DEMUX has one enable/data input, ' +
        'two select lines (A, B), and four outputs (Y0–Y3). Only the selected output reflects the input ' +
        'state; all other outputs remain in their inactive state.',

        'The 74HC139 is a dual 2-to-4 decoder/demultiplexer in a DIP-16 package. ' +
        'It contains two independent 1:4 DEMUX channels, each with an active-LOW enable input (EN_bar), ' +
        'two address/select inputs (A, B), and four active-LOW outputs (Y0–Y3). ' +
        'When EN_bar = LOW (enabled) and the address is AB, the selected output Yn goes LOW ' +
        'while all other outputs remain HIGH. When EN_bar = HIGH, all outputs are HIGH.',

        'The decoding logic for channel 1 is: ' +
        'Y0 = ¬(EN_bar\' · A\' · B\'),  Y1 = ¬(EN_bar\' · A · B\'), ' +
        'Y2 = ¬(EN_bar\' · A\' · B),   Y3 = ¬(EN_bar\' · A · B). ' +
        'The active-LOW outputs mean LEDs connected between output and GND illuminate when selected ' +
        'because the output sinks current to ground.',

        'When used as a pure decoder, the enable input acts as the data line and the address selects ' +
        'which output carries the data. When EN_bar is data (pulsed), the circuit distributes the ' +
        'signal to the output channel addressed by A, B. ' +
        'The 74HC139 is commonly used in memory address decoding and I/O port selection.',
      ],
    },

    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard',               specification: 'Standard 830-tie-point solderless breadboard',   quantity: '1' },
        { name: '74HC139 DEMUX IC',          specification: 'Dual 2:4 decoder/demultiplexer, DIP-16, 5 V',   quantity: '1' },
        { name: 'Red LED',                   specification: '5 mm, Vf ≈ 2.0 V (Y0 output)',                  quantity: '1' },
        { name: 'Yellow LED',                specification: '5 mm, Vf ≈ 2.1 V (Y1 output)',                  quantity: '1' },
        { name: 'Green LED',                 specification: '5 mm, Vf ≈ 2.0 V (Y2 output)',                  quantity: '1' },
        { name: 'Blue LED',                  specification: '5 mm, Vf ≈ 3.0 V (Y3 output)',                  quantity: '1' },
        { name: 'Resistor 330 Ω',            specification: '¼ W, carbon film',                             quantity: '4' },
        { name: 'DIP Switch (2-pole)',        specification: 'For toggling select inputs A and B',            quantity: '1' },
        { name: 'Regulated DC Power Supply', specification: '+5 V DC, 500 mA',                               quantity: '1' },
        { name: 'Connecting Wires',          specification: 'M-M jumper wires, assorted colours',            quantity: '1 set' },
      ],
    },

    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Inspect and place the breadboard.',
          circuitStepIndex: 0,
          body: 'Set up the breadboard. The 74HC139 is a 16-pin DIP IC. ' +
            'Remember that outputs are active-LOW: the selected LED turns ON because the output pin ' +
            'goes to 0 V, forward-biasing the LED through the series resistor to GND.',
        },
        {
          label: 'Mount the 74HC139 IC.',
          circuitStepIndex: 1,
          body: 'Place the 74HC139 at column 7 straddling the centre gap. ' +
            'Pin 1 (EN_bar) is at col 7, row e. Pin 16 (VCC) is at col 7, row f. ' +
            'Connect pin 16 to VCC rail and pin 8 (GND, col 14 row e) to GND rail.',
        },
        {
          label: 'Tie EN_bar to GND.',
          circuitStepIndex: 2,
          body: 'Connect a black wire from pin EN_bar (col 7, row e) to the GND rail. ' +
            'This enables the demultiplexer permanently. ' +
            'The channel is now ready to decode; the output addressed by A,B goes LOW.',
        },
        {
          label: 'Wire select inputs A and B.',
          circuitStepIndex: 3,
          body: 'Red wire: col 4 row a → pin a (col 8, row e). ' +
            'Orange wire: col 5 row a → pin b (col 9, row e). ' +
            'A=0,B=0 selects Y0; A=0,B=1 selects Y1; A=1,B=0 selects Y2; A=1,B=1 selects Y3.',
        },
        {
          label: 'Wire outputs Y0–Y3 to LEDs.',
          circuitStepIndex: 4,
          body: 'Y0 (col 10 row e) → r_y0 (col 18 row c) → led_y0 red → GND. ' +
            'Y1 (col 11 row e) → r_y1 (col 18 row h) → led_y1 yellow → GND. ' +
            'Y2 (col 12 row e) → r_y2 (col 25 row c) → led_y2 green → GND. ' +
            'Y3 (col 13 row e) → r_y3 (col 25 row h) → led_y3 blue → GND. ' +
            'Apply +5 V. All LEDs off initially (outputs all HIGH when nothing selected — ' +
            'wait, AB=00 selects Y0, so red LED should be ON at power-up).',
        },
        {
          label: 'Test A=0, B=0 → Y0 active.',
          circuitStepIndex: 5,
          body: 'Set A=0, B=0 using the DIP switch. Y0 goes LOW; red LED lights. ' +
            'Y1, Y2, Y3 remain HIGH; yellow, green, blue LEDs are off. ' +
            'Confirm that exactly one LED is on at a time.',
        },
        {
          label: 'Test A=1, B=1 → Y3 active.',
          circuitStepIndex: 6,
          body: 'Set A=1, B=1. Y3 goes LOW; blue LED lights. All other LEDs off. ' +
            'Test all four combinations AB=00, 01, 10, 11 and record which LED illuminates in each case.',
        },
      ],
    },

    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Supply voltage VCC = +5 V. 74HC139 EN_bar = LOW (permanently enabled).',
        'Active-LOW outputs: selected output Y goes LOW (0 V), unselected outputs remain HIGH (+5 V).',
        'LED current when ON: I = (VCC − Vf) / R ≈ (5 − 2.0) / 330 ≈ 9.1 mA (within safe range).',
      ],
      table: {
        headers: ['A (LSB)', 'B (MSB)', 'Y0', 'Y1', 'Y2', 'Y3', 'Active LED'],
        rows: [
          [0, 0, 'LOW',  'HIGH', 'HIGH', 'HIGH', 'Red (Y0)'],
          [0, 1, 'HIGH', 'LOW',  'HIGH', 'HIGH', 'Yellow (Y1)'],
          [1, 0, 'HIGH', 'HIGH', 'LOW',  'HIGH', 'Green (Y2)'],
          [1, 1, 'HIGH', 'HIGH', 'HIGH', 'LOW',  'Blue (Y3)'],
        ],
      },
    },

    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The 1:4 demultiplexer experiment using the 74HC139 IC was successfully completed. ' +
        'For each of the four select combinations (AB = 00, 01, 10, 11), exactly one output LED ' +
        'illuminated, confirming that the 74HC139 correctly decodes the address and drives the ' +
        'selected output LOW.',

        'The active-LOW output convention was verified: the lit LED confirms the selected pin is at ' +
        '0 V (LOW), while unlit LEDs confirm their pins are at VCC (HIGH). ' +
        'This active-low behaviour is standard in many TTL-compatible decoder/demultiplexer ICs.',

        'The 74HC139 is a versatile component used in memory bank selection, I/O decoding, and ' +
        'parallel output demultiplexing. Its dual-channel design allows two independent 1:4 ' +
        'demultiplexing operations from a single package, sharing the same select lines.',
      ],
    },
  ],
};

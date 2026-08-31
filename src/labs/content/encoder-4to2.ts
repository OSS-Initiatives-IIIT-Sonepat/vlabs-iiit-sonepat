import { type LabContent } from '@/labs/lab-content.types';

export const Encoder4to2Content: LabContent = {
  id: 'encoder-4to2',
  title: '4:2 Priority Encoder',
  circuitId: 'encoder',
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'An encoder is a combinational circuit that converts 2ⁿ input lines to an n-bit binary code on its output lines. A 4:2 encoder accepts four mutually exclusive input lines (I0, I1, I2, I3) and produces a 2-bit binary output (A, B) representing which input is active. Only one input is assumed to be HIGH at any time in a basic encoder; a priority encoder handles simultaneous inputs by always encoding the highest-numbered active input.',
        'For a 4:2 priority encoder, the output equations are derived by giving I3 the highest priority and I0 the lowest: A (MSB) = I2 + I3 (A is HIGH when input 2 or 3 is active). B (LSB) = I1 + I3 (B is HIGH when input 1 or 3 is active). Note that I3 contributes to both A and B (I3 = binary 11), I2 contributes only to A (I2 = binary 10), I1 contributes only to B (I1 = binary 01), and I0 contributes to neither (I0 = binary 00).',
        'Gate-level implementation requires just two OR gates: one 74HC32 OR gate produces A = I2 + I3, and another produces B = I1 + I3. Total IC count: 1× 74HC32 (uses two of the four available OR gates). This is an extremely efficient implementation. A valid output flag (V) can optionally be added: V = I0 + I1 + I2 + I3 (to distinguish "no input active" from "I0 active", since both give output 00).',
        "Encoders are used to reduce the number of wires carrying a set of one-hot signals (keyboard encoders convert 101+ key presses to a 7-bit ASCII code), in interrupt priority encoders (the processor's interrupt controller encodes which of many devices is requesting service), and in display driver circuits where BCD or binary encoding drives 7-segment displays.",
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: '74HC32 Quad 2-input OR IC', specification: 'DIP-14 (two OR gates used)', quantity: '1' },
        { name: 'LED', specification: 'Red, 5 mm (output A — MSB)', quantity: '1' },
        { name: 'LED', specification: 'Green, 5 mm (output B — LSB)', quantity: '1' },
        { name: 'Resistor (current limiting)', specification: '330 Ω, 0.25 W', quantity: '2' },
        { name: 'SPDT Switch / Jumper', specification: 'Logic input (I0, I1, I2, I3 — one active at a time)', quantity: '4' },
        { name: 'DC Power Supply', specification: '5 V regulated', quantity: '1' },
        { name: 'Bread Board', specification: 'Full size, 830 tie-points', quantity: '1' },
        { name: 'Connecting Wires', specification: '22 AWG solid-core jumper wires', quantity: '15' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Set up breadboard and power supply',
          body: 'Connect the 5 V supply to the breadboard power rails. Insert the 74HC32 IC straddling the centre groove. Connect pin 14 to +5 V and pin 7 to GND. Prepare four input switches (I0, I1, I2, I3), each with a 10 kΩ pull-down resistor ensuring a clean LOW when the switch is open. Only one switch should be HIGH at any given time for the basic encoder operation.',
          circuitStepIndex: 0,
        },
        {
          label: 'Wire OR gates for outputs A and B',
          body: 'Wire OR gate 1 (74HC32, pins 1,2→3): connect I2 to pin 1 and I3 to pin 2. Output A = I2 + I3 (MSB) appears on pin 3. Connect pin 3 through a 330 Ω resistor to the red LED (output A). Wire OR gate 2 (74HC32, pins 4,5→6): connect I1 to pin 4 and I3 to pin 5. Output B = I1 + I3 (LSB) appears on pin 6. Connect pin 6 through a 330 Ω resistor to the green LED (output B). Note that I3 is fanned out to both OR gates.',
          circuitStepIndex: 1,
        },
        {
          label: 'Connect all input lines',
          body: 'Connect I3 to both pin 2 of OR gate 1 and pin 5 of OR gate 2 (fan-out of 2 — well within 74HC drive capability). Connect I2 to pin 1 of OR gate 1 only. Connect I1 to pin 4 of OR gate 2 only. Connect I0 to GND (or leave the input switches for I0 as the default OFF state — activating I0 should produce 00 at the output, same as all-inputs-OFF, which highlights the need for a valid-output flag). Tie unused gate inputs (pins 8–13 of 74HC32) to GND.',
          circuitStepIndex: 2,
        },
        {
          label: 'Test each input line individually',
          body: 'Activate each input switch one at a time (keeping all others LOW). Record the LED states (A, B) for each case: I0=1 → A=0, B=0 (binary 00); I1=1 → A=0, B=1 (binary 01); I2=1 → A=1, B=0 (binary 10); I3=1 → A=1, B=1 (binary 11). The two LEDs should display the binary encoding of the active input. Record all observations in the truth table.',
          circuitStepIndex: 3,
        },
        {
          label: 'Test priority behaviour with simultaneous inputs',
          body: 'Activate two switches simultaneously (e.g., I1=1 and I3=1). Verify the output encodes I3 (the higher priority): A=1, B=1 (binary 11). Try I0=1 and I2=1 simultaneously — output should be A=1, B=0 (encoding I2=binary 10, since I2 > I0). This demonstrates priority encoding behaviour. Document all simultaneous-input combinations tested.',
          circuitStepIndex: 3,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        '4:2 Priority Encoder truth table. A = I2+I3 (MSB), B = I1+I3 (LSB). One input active at a time for basic encoding.',
      ],
      table: {
        headers: ['I3', 'I2', 'I1', 'I0', 'A (observed)', 'B (observed)', 'A (expected)', 'B (expected)', 'Binary code'],
        rows: [
          [0, 0, 0, 1, 0, 0, 0, 0, '00 → I0'],
          [0, 0, 1, 0, 0, 1, 0, 1, '01 → I1'],
          [0, 1, 0, 0, 1, 0, 1, 0, '10 → I2'],
          [1, 0, 0, 0, 1, 1, 1, 1, '11 → I3'],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The 4:2 Priority Encoder has been successfully implemented using a single 74HC32 IC (two OR gates). The observed binary outputs for all four input conditions match the theoretical encodings.',
        'The priority behaviour was confirmed: when multiple inputs are active simultaneously, the output correctly encodes the highest-priority (highest-numbered) active input. This is a fundamental requirement in interrupt controller design.',
        'The efficiency of the implementation — only two OR gates and no other logic — highlights the simplicity of the 4:2 encoder. Adding a valid-output (V) signal using a third OR gate (V = I0+I1+I2+I3) would distinguish the "all-off" case from I0, making the encoder complete for practical applications.',
      ],
    },
  ],
};

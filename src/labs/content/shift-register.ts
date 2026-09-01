import { type LabContent } from '@/labs/lab-content.types';

export const ShiftRegisterContent: LabContent = {
  id: 'shift-register',
  title: '8-bit Serial-In Parallel-Out (SIPO) Shift Register using 74HC273',
  circuitId: 'shift-register',

  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A shift register is a sequential logic circuit that stores multiple bits of data, with the ' +
        'ability to shift the stored data one position on each clock pulse. The 74HC273 is an 8-bit ' +
        'D-type flip-flop register — on each rising edge of the CLK signal, the values present on ' +
        'D0–D7 are captured into the internal flip-flops and simultaneously appear on Q0–Q7.',

        'The Serial-In Parallel-Out (SIPO) operating mode applies data bit by bit on a single data line ' +
        'through multiple clock cycles, progressively filling the register. After 8 clock cycles, all ' +
        '8 bits are stored and all 8 Q outputs are valid in parallel. This is used in serial-to-parallel ' +
        'conversion — for example, receiving serial data from a UART and feeding it to an 8-bit data bus.',

        'The four fundamental shift register configurations are: ' +
        'SIPO (Serial-In Parallel-Out) — serial data in, all bits out simultaneously; ' +
        'SISO (Serial-In Serial-Out) — data shifts through, last bit exits serially; ' +
        'PIPO (Parallel-In Parallel-Out) — all bits loaded at once, output simultaneously; ' +
        'PISO (Parallel-In Serial-Out) — all bits loaded at once, output shifted out serially.',

        'The 74HC273 has an active-low Master Reset pin (MR_bar). When pulled LOW, all Q outputs are ' +
        'asynchronously cleared to 0 regardless of CLK or D inputs. In this experiment MR_bar is tied ' +
        'HIGH to keep the register in normal operating mode. The clock input is edge-triggered (rising ' +
        'edge) — data is captured only at the moment the clock transitions from LOW to HIGH.',

        'Applications of shift registers include: serial communication interfaces (SPI, I²C, UART), ' +
        'LED display drivers (chained 74HC595 for many outputs from few pins), digital delay lines, ' +
        'and pseudo-random number generators (using feedback XOR — LFSR).',
      ],
    },

    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard',               specification: 'Standard 830-tie-point solderless breadboard', quantity: '1' },
        { name: '74HC273 Register IC',      specification: '8-bit D flip-flop, DIP-20, 5 V supply',       quantity: '1' },
        { name: 'LED (assorted colours)',   specification: '5 mm LEDs for Q0–Q7 outputs',                  quantity: '8' },
        { name: 'Resistor 330 Ω',           specification: '¼ W, carbon film, current limiter per LED',    quantity: '8' },
        { name: 'Push Button',              specification: 'Momentary, for CLK input',                     quantity: '1' },
        { name: 'DIP Switch (8-position)',  specification: 'For D0–D7 data inputs',                        quantity: '1' },
        { name: 'Regulated DC Power Supply', specification: '+5 V DC, 500 mA',                             quantity: '1' },
        { name: 'Digital Multimeter',       specification: 'For verifying supply voltage and continuity',  quantity: '1' },
        { name: 'Connecting Wires',         specification: 'M-M jumper wires, assorted colours',           quantity: '1 set' },
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
          body: 'Place the breadboard on a clean, dry surface. ' +
            'The centre gap isolates both banks of the DIP-20 IC. ' +
            'Red rail = VCC (+5 V), blue rail = GND.',
        },
        {
          label: 'Mount the 74HC273 DIP-20 IC at column 3.',
          circuitStepIndex: 1,
          body: 'Orient the 74HC273 so that pin 1 (MR_bar) is at the top-left, straddling the centre gap. ' +
            'Columns 3–12 are occupied (10 pins per side for a 20-pin DIP). ' +
            'Press firmly until all 20 pins are seated. ' +
            'The top-bank pins are the data and control inputs; the bottom-bank pins are the Q outputs.',
        },
        {
          label: 'Tie MR_bar HIGH and wire CLK.',
          circuitStepIndex: 2,
          body: 'Connect a red wire from the VCC rail to pin MR_bar (col 3, row e) — this disables reset. ' +
            'Connect an orange wire from col 1, row a to the CLK pin (col 4, row f). ' +
            'Connect your push-button between VCC and the CLK input node for manual clocking.',
        },
        {
          label: 'Wire D0 and D1 data inputs.',
          circuitStepIndex: 3,
          body: 'Red wire: col 2 row a → D0 pin (col 4, row e). ' +
            'Blue wire: col 2 row b → D1 pin (col 5, row e). ' +
            'Connect D2–D7 pins to the GND rail (all LOW by default). ' +
            'Connect the 8-position DIP switch outputs to the D0–D7 nodes for full control.',
        },
        {
          label: 'Place 8 output LEDs and resistors.',
          circuitStepIndex: 4,
          body: 'Insert 330 Ω resistors at cols 14, 14, 17, 17, 20, 20, 23, 23 (alternating rows c and h). ' +
            'Insert LEDs for Q0–Q7 at cols 16, 16, 19, 19, 22, 22, 25, 25 (alternating rows c and h). ' +
            'Always keep the resistor in series before the LED anode.',
        },
        {
          label: 'Connect Q0–Q7 to resistors and LEDs.',
          circuitStepIndex: 5,
          body: 'Wire each Q pin (on bottom bank, row f) through its 330 Ω resistor to its LED anode. ' +
            'Connect all eight LED cathodes to the GND rail. ' +
            'Connect VCC pin of the 74HC273 (pin 20, col 12 row f) to the VCC rail. ' +
            'Connect GND pin (pin 10, col 3 row f — note: check datasheet pin numbering) to GND rail.',
        },
        {
          label: 'Load data and apply clock.',
          circuitStepIndex: 6,
          body: 'Set D7–D0 = 1011 0100 (0xB4 = 180 decimal) using the DIP switches. ' +
            'Press the CLK push-button (apply a rising edge). ' +
            'Observe: Q7, Q5, Q4, Q2 LEDs should light up (bits that are 1 in 0xB4). ' +
            'Change the data inputs and clock again — outputs update immediately on the next rising edge.',
        },
      ],
    },

    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Supply voltage VCC = +5 V DC. 74HC273 powered from the same VCC/GND rails.',
        'LED forward voltages: red ≈ 1.8 V, yellow ≈ 2.1 V, green ≈ 2.0 V. Series resistors = 330 Ω.',
        'The Q outputs change only on the rising edge of CLK — verify this by changing D inputs without clocking.',
        'With MR_bar = LOW (momentarily ground it), all Q outputs go to 0 regardless of CLK.',
      ],
      table: {
        headers: ['D[7:0] (binary)', 'D (hex)', 'CLK edge', 'Q[7:0]', 'LEDs ON (bit positions)'],
        rows: [
          ['0000 0000', '0x00', 'Rising', '0000 0000', 'None'],
          ['1111 1111', '0xFF', 'Rising', '1111 1111', 'Q7–Q0 all ON'],
          ['1011 0100', '0xB4', 'Rising', '1011 0100', 'Q7, Q5, Q4, Q2'],
          ['0101 0101', '0x55', 'Rising', '0101 0101', 'Q6, Q4, Q2, Q0'],
        ],
      },
    },

    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The 8-bit SIPO register was successfully built using the 74HC273 IC. All 8 Q output LEDs ' +
        'correctly reflected the D0–D7 input data on each rising CLK edge, confirming proper ' +
        'register operation.',

        'The edge-triggered nature of the register was verified: changing D inputs without applying ' +
        'a clock edge had no effect on the Q outputs. The synchronous behaviour ensures that data ' +
        'is only transferred at the controlled moment of the clock edge.',

        'The Master Reset function was tested by briefly pulling MR_bar LOW — all eight output ' +
        'LEDs immediately extinguished regardless of the data inputs, demonstrating asynchronous reset. ' +
        'This circuit serves as a building block for serial-to-parallel data converters, LED display ' +
        'drivers, and any application requiring the conversion of serial data streams into parallel form.',
      ],
    },
  ],
};

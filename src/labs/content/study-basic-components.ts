import { type LabContent } from '@/labs/lab-content.types';

export const StudyBasicComponentsContent: LabContent = {
  id: 'study-basic-components',
  title: 'Basic Electronic Components & Instruments',
  circuitId: 'study-basic-components',

  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'Electronic components are the building blocks of every circuit. Passive components — resistors, capacitors, and inductors — do not require an external power source to operate. Active components — diodes, transistors, and ICs — control or amplify electrical signals and generally require a supply voltage.',
        'A resistor opposes the flow of current and is characterised by its resistance in ohms (Ω). The colour-band code printed on the body encodes its value and tolerance. A capacitor stores energy in an electric field; its value is measured in farads (F), microfarads (µF), or picofarads (pF). An inductor stores energy in a magnetic field and is measured in henrys (H).',
        'Diodes are two-terminal semiconductor devices that allow current in one direction only. The anode is the positive terminal and the cathode (marked with a band) is the negative terminal. A light-emitting diode (LED) emits light when forward-biased. A Zener diode is designed to operate in reverse breakdown for voltage regulation.',
        'The breadboard is a solderless prototyping board. Holes in each terminal strip share a node along the same column (within a half). The two long rails provide VCC and GND. A regulated DC power supply, digital multimeter (DMM), function generator, and oscilloscope (CRO) are the core instruments you will use throughout the lab.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard', specification: '830 tie-point solderless', quantity: '1' },
        { name: 'Resistors', specification: '100 Ω, 470 Ω, 1 kΩ, 10 kΩ (¼ W)', quantity: '2 each' },
        { name: 'Capacitors', specification: '100 nF ceramic, 47 µF electrolytic', quantity: '2 each' },
        { name: 'LED', specification: 'Red 5 mm, forward voltage ≈ 2 V', quantity: '2' },
        { name: '1N4148 Diode', specification: 'Silicon signal diode', quantity: '2' },
        { name: 'BC547 NPN Transistor', specification: 'TO-92 package', quantity: '1' },
        { name: 'Regulated DC Power Supply', specification: '0–12 V, 1 A', quantity: '1' },
        { name: 'Digital Multimeter', specification: 'AC/DC voltage, current, resistance', quantity: '1' },
        { name: 'Function Generator', specification: '1 Hz – 1 MHz', quantity: '1' },
        { name: 'CRO / Oscilloscope', specification: '20 MHz dual channel', quantity: '1' },
        { name: 'Connecting Wires', specification: 'M-M jumper wires', quantity: '1 set' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Identify resistors using colour-band code.',
          circuitStepIndex: 0,
          body: 'Pick up a resistor and hold it with the tolerance band (gold or silver) on the right. Read the first three bands left to right: first digit, second digit, multiplier. Confirm the value with the DMM on resistance mode. Record the nominal value, tolerance, and measured value in your notebook.',
        },
        {
          label: 'Measure capacitor value with the DMM.',
          circuitStepIndex: 0,
          body: 'Set the multimeter to capacitance mode (Cx). Insert the capacitor leads into the test jacks, observing polarity for the electrolytic capacitor (longer lead = positive). Compare the reading with the body marking. Note how electrolytic capacitors have higher capacitance but lower voltage ratings than ceramics.',
        },
        {
          label: 'Test the diode using the DMM diode mode.',
          circuitStepIndex: 0,
          body: 'Set the DMM to diode test (→|). Place the red probe on the anode and black probe on the cathode. A good silicon diode reads approximately 0.55–0.70 V in forward bias. Swap the probes — the display should read OL (open circuit) in reverse bias. Record both readings.',
        },
        {
          label: 'Verify LED operation on the breadboard.',
          circuitStepIndex: 1,
          body: 'Insert a 330 Ω current-limiting resistor in series with the LED anode on the breadboard. Connect +5 V to the resistor and LED cathode to GND. The LED should light. Measure the voltage across the LED — it should be approximately 1.8–2.2 V. Now reverse the LED; it should not light.',
        },
        {
          label: 'Use the CRO to observe a sine wave.',
          circuitStepIndex: 4,
          body: 'Connect the function generator output to Channel 1 of the CRO. Set the generator to 1 kHz, 5 V peak-to-peak, sine wave. Adjust the CRO timebase to 0.5 ms/div and voltage scale to 2 V/div. Count the number of full cycles across 10 divisions and calculate the frequency. Verify against the generator setting.',
        },
        {
          label: 'Measure AC and DC voltages with the DMM.',
          circuitStepIndex: 4,
          body: 'Connect the DMM (set to ACV) across the function generator output. Note the RMS reading. Then switch to DCV — the reading should be near zero for a pure sine wave with no DC offset. Enable the DC offset on the generator (+2 V) and re-measure in both modes. Understand the difference between peak, peak-to-peak, and RMS values.',
        },
        {
          label: 'Explore the breadboard layout.',
          circuitStepIndex: 4,
          body: 'Using the DMM in continuity mode (buzzer), probe pairs of holes in the same terminal strip column — the meter should beep. Probe across the centre gap — no beep. Probe along the red power rail — continuous along the full length. This exercise builds spatial awareness of the breadboard internals essential for circuit assembly.',
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Supply voltage: +5 V DC. Function generator: 1 kHz sine wave, 5 V peak-to-peak.',
        'Diode forward voltage (1N4148): approximately 0.62 V. LED forward voltage: approximately 2.0 V.',
        'LED current: I = (VCC − V_f) / R = (5 − 2.0) / 330 ≈ 9.1 mA.',
      ],
      table: {
        headers: ['Component', 'Marked Value', 'Measured Value', 'Within Tolerance?'],
        rows: [
          ['Resistor 1 (470 Ω)', '470 Ω ±5%', '—', '—'],
          ['Resistor 2 (1 kΩ)',  '1000 Ω ±5%', '—', '—'],
          ['Capacitor (100 nF)', '100 nF', '—', '—'],
          ['Capacitor (47 µF)', '47 µF', '—', '—'],
          ['1N4148 Diode V_f', '~0.65 V', '—', '—'],
          ['LED V_f (red)', '~2.0 V', '—', '—'],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'This experiment provided hands-on familiarity with the fundamental components and instruments of the electronics laboratory. Each component was identified, measured, and verified against its rated value, establishing good practice for all future experiments.',
        'The multimeter proved versatile across resistance, capacitance, voltage, and diode-test modes. The oscilloscope demonstrated its superiority over the multimeter for observing time-varying signals, enabling direct measurement of frequency, period, and amplitude.',
        'The breadboard layout was explored and its internal connectivity understood, which is essential for efficient and error-free circuit assembly. These foundational skills — component identification, instrument operation, and breadboard usage — underpin every experiment in this course.',
      ],
    },
  ],
};

import { type LabContent } from '@/labs/lab-content.types';

export const HalfWaveRectifierContent: LabContent = {
  id: 'half-wave-rectifier',
  title: 'Half Wave Rectifier',
  circuitId: 'half-wave-rectifier',

  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A rectifier is an electronic circuit that converts alternating current (AC) to direct current (DC). ' +
        'The half-wave rectifier is the simplest form of rectifier, using only a single diode to allow current ' +
        'to pass during one half of the AC cycle (either positive or negative) and block the other half.',

        'During the positive half-cycle of the AC input, the diode is forward-biased and conducts current, ' +
        'so the voltage across the load resistor follows the input. During the negative half-cycle, the diode ' +
        'is reverse-biased and blocks current, resulting in zero output voltage. This produces a pulsating ' +
        'DC output with the same frequency as the AC input.',

        'The peak inverse voltage (PIV) rating of the diode must exceed the peak of the AC supply voltage. ' +
        'For the 1N4148 diode, PIV is 75 V, which is sufficient for low-voltage lab experiments. ' +
        'The forward voltage drop across the diode (≈ 0.7 V for silicon) reduces the output peak slightly. ' +
        'A filter capacitor connected in parallel with the load reduces the ripple in the output, ' +
        'smoothing the pulsating DC toward a steadier level.',

        'The average (DC) output voltage of an ideal half-wave rectifier is V_avg = V_m / π, where V_m is ' +
        'the peak of the AC input. With the 0.7 V diode drop, the practical average is (V_m − 0.7) / π. ' +
        'The ripple factor — the ratio of the RMS ripple voltage to the DC output — is approximately 1.21 ' +
        'for a half-wave rectifier without a filter, making it less efficient than a full-wave rectifier.',
      ],
    },

    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard',                    specification: 'Standard 830-tie-point solderless breadboard', quantity: '1' },
        { name: 'Step-down Transformer',          specification: '230 V / 6 V or 9 V, 500 mA',                  quantity: '1' },
        { name: '1N4148 Silicon Diode',           specification: 'PIV 75 V, I_F 200 mA',                        quantity: '1' },
        { name: 'Load Resistor',                  specification: '1 kΩ, ¼ W',                                   quantity: '1' },
        { name: 'Filter Capacitor',               specification: '47 µF, 25 V electrolytic',                    quantity: '1' },
        { name: 'Green LED',                      specification: '5 mm, 2.0 V forward voltage',                  quantity: '1' },
        { name: 'Current-Limiting Resistor',      specification: '330 Ω, ¼ W',                                  quantity: '1' },
        { name: 'CRO / Digital Oscilloscope',     specification: '20 MHz, dual channel',                        quantity: '1' },
        { name: 'Digital Multimeter',             specification: 'AC/DC voltage and frequency measurement',      quantity: '1' },
        { name: 'Regulated DC Power Supply',      specification: '0–12 V, 1 A',                                  quantity: '1' },
        { name: 'Connecting Wires / Jumper Wires', specification: 'M-M and M-F, assorted colours',              quantity: '1 set' },
      ],
    },

    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Bring in the apparatus and inspect all components.',
          circuitStepIndex: 0,
          body:
            'Collect all the required components listed in the apparatus section. Inspect each component ' +
            'for visible damage. Verify the diode polarity (the cathode is marked with a band). Check the ' +
            'capacitor polarity (the longer lead is the anode / positive terminal). Set up your breadboard ' +
            'on a clear, dry surface.',
        },
        {
          label: 'Set up the step-down transformer connections.',
          circuitStepIndex: 0,
          body:
            'Connect the secondary output of the step-down transformer (6 V AC) to the breadboard power rails. ' +
            'The AC input does not have polarity, so either terminal of the secondary can go to either rail. ' +
            'Do NOT connect the primary (mains) side yet — keep it unplugged throughout assembly.',
        },
        {
          label: 'Place the 1N4148 diode on the breadboard.',
          circuitStepIndex: 1,
          body:
            'Insert the 1N4148 diode across the centre gap of the breadboard so that the anode (the end ' +
            'without the band) is connected to the AC input rail and the cathode (band end) points toward ' +
            'the load side. The diode straddles columns such that anode ↔ cathode are separated by the gap.',
        },
        {
          label: 'Connect the load resistor (1 kΩ).',
          circuitStepIndex: 2,
          body:
            'Insert the 1 kΩ load resistor between the cathode of the diode and the ground rail. ' +
            'This resistor represents the load consuming the rectified power. ' +
            'Ensure one end connects to the diode output column and the other end connects to the negative/GND rail.',
        },
        {
          label: 'Add the filter capacitor across the load (optional for Part B).',
          circuitStepIndex: 3,
          body:
            'For Part B of the experiment, connect a 47 µF electrolytic capacitor in parallel with the ' +
            '1 kΩ load resistor. Make sure the positive lead (longer leg) of the capacitor is on the ' +
            'cathode side of the diode (DC positive), and the negative lead is on GND. The capacitor ' +
            'will charge during conduction and discharge slowly through the load, reducing ripple.',
        },
        {
          label: 'Connect the LED output indicator via a 330 Ω resistor.',
          circuitStepIndex: 4,
          body:
            'To visually confirm rectification, connect a 330 Ω current-limiting resistor in series with ' +
            'a green LED from the load node to GND. The LED should glow continuously (with some flicker ' +
            'at 50 Hz) because the DC output keeps it forward-biased during conduction half-cycles.',
        },
        {
          label: 'Double-check all connections before powering on.',
          circuitStepIndex: 5,
          body:
            'Systematically trace each connection: AC source → diode anode → (diode) → cathode → load ' +
            'resistor → GND. Verify the capacitor polarity if installed. Check no wire bridges across ' +
            'the centre gap accidentally. Have your lab partner verify the circuit before you proceed.',
        },
        {
          label: 'Connect the CRO probes to measure input and output.',
          circuitStepIndex: 6,
          body:
            'Connect Channel 1 of the CRO across the AC input (transformer secondary terminals). ' +
            'Connect Channel 2 across the load resistor (cathode of diode to GND). Set the timebase ' +
            'to 5 ms/div and voltage scale to 2 V/div as a starting point. Enable DC coupling on ' +
            'Channel 2 to correctly display the DC component.',
        },
        {
          label: 'Power on and observe the waveforms.',
          circuitStepIndex: 6,
          body:
            'Plug in the transformer. Observe the CRO display. Channel 1 should show a full sine wave ' +
            '(≈ 6 V peak). Channel 2 should show only the positive half-cycles — a series of positive ' +
            'half-sinusoids. The LED should glow. Use the multimeter on DC mode to measure the average ' +
            'output voltage across the load and record it.',
        },
        {
          label: 'Record observations and verify against theoretical values.',
          circuitStepIndex: 6,
          body:
            'Measure V_m (peak input) with the CRO. Calculate theoretical V_avg = (V_m − 0.7) / π. ' +
            'Compare with the multimeter reading. Calculate the ripple factor from the CRO waveform. ' +
            'Repeat with the filter capacitor in place and note the reduction in ripple. ' +
            'Record all values in the observation table.',
        },
      ],
    },

    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Input AC supply frequency: 50 Hz. Secondary transformer voltage (RMS): 6 V AC.',
        'Peak input voltage V_m = √2 × V_rms ≈ 8.49 V. Forward diode drop ≈ 0.7 V.',
        'Theoretical average DC output (no filter): V_avg = (V_m − 0.7) / π ≈ 2.48 V.',
        'Ripple factor (no filter): γ = √[(V_rms_ripple / V_dc)²] ≈ 1.21.',
      ],
      table: {
        headers: ['Parameter', 'Theoretical', 'Measured (No Filter)', 'Measured (With 47 µF Filter)'],
        rows: [
          ['Peak Input Voltage V_m (V)',       '8.49',  '—',   '—'],
          ['Average DC Output V_avg (V)',       '2.48',  '—',   '—'],
          ['RMS Ripple Voltage V_r (V)',        '3.00',  '—',   '—'],
          ['Ripple Factor γ',                  '1.21',  '—',   '—'],
          ['Rectifier Efficiency η (%)',        '40.6',  '—',   '—'],
        ],
      },
    },

    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The half-wave rectifier experiment successfully demonstrated the conversion of AC to pulsating DC ' +
        'using a single 1N4148 silicon diode. The output waveform on the oscilloscope confirmed that only ' +
        'the positive half-cycles of the sinusoidal input appear across the load, while negative half-cycles ' +
        'are blocked by the reverse-biased diode.',

        'The measured average DC output voltage was in close agreement with the theoretical value ' +
        '(V_avg = (V_m − 0.7) / π), with minor deviation due to diode bulk resistance and measurement ' +
        'instrument tolerances. The observed ripple factor of approximately 1.21 confirms the low ' +
        'efficiency of the half-wave rectifier compared to full-wave configurations.',

        'Adding a 47 µF filter capacitor in parallel with the load significantly reduced the output ' +
        'ripple. The capacitor charges to the peak voltage during conduction and slowly discharges ' +
        'through the load during the blocked half-cycle, producing a smoother DC output. This ' +
        'experiment validates the theoretical model and provides hands-on experience with fundamental ' +
        'rectifier design and the role of filter components in power supply circuits.',
      ],
    },
  ],
};

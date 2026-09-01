import { type LabContent } from '@/labs/lab-content.types';

export const BjtBiasContent: LabContent = {
  id: 'bjt-bias',
  title: 'BJT Bias Configurations — Fixed Bias and Voltage-Divider Bias',
  circuitId: 'bjt-bias',

  sections: [
    // ── THEORY ─────────────────────────────────────────────────────────────
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        '**Fixed bias** is the simplest BJT biasing method: a single resistor $R_B$ connects $V_{CC}$ to the base. '
        + 'The base current is $I_B = (V_{CC} - V_{BE})/R_B$ and the collector current is $I_C = \\beta I_B$. '
        + 'The Q-point ($I_C$, $V_{CE}$) therefore depends directly on $\\beta$, which varies by a factor of '
        + '2–4× from device to device and with temperature. A ±50 % change in $\\beta$ shifts $I_C$ by ±50 % — '
        + 'the circuit is thermally **unstable**.',

        'The **voltage-divider bias (VDB)** network uses $R_1$ and $R_2$ to establish a Thévenin base voltage '
        + '$V_{TH} = V_{CC} \\times R_2/(R_1+R_2)$ that is essentially independent of $\\beta$ when '
        + '$R_{TH} \\ll \\beta R_E$. The emitter resistor $R_E$ provides **negative feedback**: if $I_C$ '
        + 'rises (e.g. due to temperature), $V_E = I_E R_E$ rises, reducing $V_{BE} = V_B - V_E$, which '
        + 'reduces $I_B$ and hence $I_C$. This self-regulating action stabilises the Q-point.',

        'The Q-point equations for VDB are:'
        + '$$V_B = V_{CC}\\frac{R_2}{R_1+R_2}, \\quad V_E = V_B - 0.7\\,\\text{V}, \\quad I_C \\approx I_E = \\frac{V_E}{R_E}$$'
        + '$$V_{CE} = V_{CC} - I_C(R_C + R_E)$$'
        + 'For the circuit under test ($V_{CC}=12\\,\\text{V}$, $R_1=100\\,\\text{k}\\Omega$, $R_2=10\\,\\text{k}\\Omega$, '
        + '$R_C=4.7\\,\\text{k}\\Omega$, $R_E=1\\,\\text{k}\\Omega$): '
        + '$V_B \\approx 1.09\\,\\text{V}$, $I_C \\approx 0.39\\,\\text{mA}$, $V_{CE} \\approx 9.8\\,\\text{V}$.',

        'For fixed bias with $R_B = 470\\,\\text{k}\\Omega$ and $\\beta = 200$: '
        + '$I_B \\approx 24\\,\\mu\\text{A}$, $I_C \\approx 4.8\\,\\text{mA}$, '
        + '$V_{CE} = 12 - 4.8 \\times 10^{-3}(4700) \\approx -10.6\\,\\text{V}$ — the transistor is '
        + '**saturated** ($V_{CE} < V_{CE,sat}$). This shows how fixed bias can drive the device out of '
        + 'the active region if $\\beta$ is high, while VDB keeps it well within the linear region for any '
        + '$\\beta$ in the range 50–600.',
      ],
    },

    // ── APPARATUS ───────────────────────────────────────────────────────────
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard',             specification: '830 tie-point, solderless',                  quantity: '1' },
        { name: 'BC547 NPN Transistor',   specification: 'TO-92, $\\beta \\approx 200$',               quantity: '2' },
        { name: 'R_B Fixed Bias',         specification: '$470\\,\\text{k}\\Omega$, ¼ W',             quantity: '1' },
        { name: 'R1 VDB Top Resistor',    specification: '$100\\,\\text{k}\\Omega$, ¼ W',             quantity: '1' },
        { name: 'R2 VDB Bottom Resistor', specification: '$10\\,\\text{k}\\Omega$, ¼ W',              quantity: '1' },
        { name: 'R_C Collector Load',     specification: '$4.7\\,\\text{k}\\Omega$, ¼ W',             quantity: '2' },
        { name: 'R_E Emitter Resistor',   specification: '$1\\,\\text{k}\\Omega$, ¼ W',               quantity: '1' },
        { name: 'DC Power Supply',        specification: '12 V regulated, 500 mA',                    quantity: '1' },
        { name: 'Digital Multimeter',     specification: 'DC voltage + DC mA',                        quantity: '2' },
        { name: 'LEDs',                   specification: 'Red and green, 5 mm',                       quantity: '1 each' },
        { name: 'Jumper wires',           specification: 'Red, black, orange, green assorted',        quantity: '1 set' },
      ],
    },

    // ── PROCEDURE ────────────────────────────────────────────────────────────
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Place the breadboard and connect the power supply.',
          circuitStepIndex: 1,
          body: 'Lay the breadboard flat. Connect PSU (+12 V) to the VCC rail at col 3 (red wire) '
              + 'and PSU (−) to GND rail at col 3 (black wire). Keep PSU switched off. '
              + 'You will build the fixed-bias circuit (Phase A) on the left (cols 3–12) '
              + 'and the VDB circuit (Phase B) on the right (cols 15–28).',
        },
        {
          label: 'Connect the DMM in series to measure Phase A collector current.',
          circuitStepIndex: 2,
          body: 'Set DMM to **DC mA** mode (200 mA range). '
              + 'Orange wire 1: VCC rail col 6 → col 6 row d. '
              + 'Orange wire 2: col 6 row c → R_C1 left lead. '
              + 'All Phase A collector current flows through the DMM.',
        },
        {
          label: 'Assemble Phase A — Fixed Bias circuit.',
          circuitStepIndex: 3,
          body: 'Insert $R_B = 470\\,\\text{k}\\Omega$ at col 3–6, row c. '
              + 'Wire: VCC rail → $R_B$ left lead (red). '
              + 'Insert $R_{C1} = 4.7\\,\\text{k}\\Omega$ at col 7–10, row c; wire VCC → $R_{C1}$ (red). '
              + 'Insert red LED at col 12–13; wire $R_{C1}$ → LED anode (green); LED cathode → GND (black). '
              + 'The base is connected to $R_B$ right lead. No emitter resistor — emitter ties directly to GND.',
        },
        {
          label: 'Measure the fixed-bias Q-point.',
          circuitStepIndex: 4,
          body: 'Power on (12 V). Record DMM reading ($I_C$). Use a second DMM to measure $V_{CE}$. '
              + 'Calculate $I_B = I_C / \\beta$ and compare with theoretical $I_B = (12 - 0.7)/470\\,\\text{k} \\approx 24\\,\\mu\\text{A}$. '
              + 'Note the LED brightness. Power off before proceeding to Phase B.',
        },
        {
          label: 'Assemble Phase B — Voltage-Divider Bias circuit.',
          circuitStepIndex: 5,
          body: 'Insert $R_1 = 100\\,\\text{k}\\Omega$ at col 15–18, row c; wire VCC → $R_1$ (red). '
              + 'Insert $R_2 = 10\\,\\text{k}\\Omega$ at col 15–18, row h; wire $R_2$ bottom → GND (black). '
              + 'Insert $R_{C2} = 4.7\\,\\text{k}\\Omega$ at col 20–23, row c; wire VCC → $R_{C2}$ (red). '
              + 'Insert $R_E = 1\\,\\text{k}\\Omega$ at col 20–23, row h; wire $R_E$ bottom → GND (black). '
              + 'Insert green LED at col 25–26; wire $R_{C2}$ → LED anode (green); LED cathode → GND.',
        },
        {
          label: 'Measure the VDB Q-point and compare.',
          circuitStepIndex: 6,
          body: 'Power on (12 V). Reconnect DMM to Phase B collector path. Record $I_C$ and $V_{CE}$. '
              + 'Compare LED brightness: Phase A (fixed bias) LED is much brighter due to higher $I_C$. '
              + 'To verify stability: replace the BC547 with a second unit of different $\\beta$. '
              + 'Observe that the VDB Q-point barely changes while the fixed-bias Q-point shifts dramatically.',
        },
      ],
    },

    // ── OBSERVATIONS ────────────────────────────────────────────────────────
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        '$V_{CC} = 12\\,\\text{V}$, $R_B = 470\\,\\text{k}\\Omega$, $R_{C} = 4.7\\,\\text{k}\\Omega$, '
        + '$R_1 = 100\\,\\text{k}\\Omega$, $R_2 = 10\\,\\text{k}\\Omega$, $R_E = 1\\,\\text{k}\\Omega$.',
        'Effect of $\\beta$ variation on Q-point stability. Two BC547 transistors with different $\\beta$ tested.',
      ],
      table: {
        headers: ['Configuration', '$\\beta$', '$I_C$ (mA)', '$V_{CE}$ (V)', 'Region'],
        rows: [
          ['Fixed Bias',  '100', '2.37', '0.85', 'Near saturation'],
          ['Fixed Bias',  '200', '4.77', 'Sat',  'Saturated'],
          ['Fixed Bias',  '300', '4.90', 'Sat',  'Saturated'],
          ['VDB',         '100', '0.37', '10.1', 'Active'],
          ['VDB',         '200', '0.39', '9.8',  'Active'],
          ['VDB',         '300', '0.40', '9.7',  'Active'],
        ],
      },
    },

    // ── CONCLUSION ──────────────────────────────────────────────────────────
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'Both biasing configurations were assembled and their Q-points measured. The fixed-bias circuit '
        + 'produced a collector current strongly dependent on $\\beta$: when $\\beta$ doubled from 100 to 200, '
        + '$I_C$ doubled and drove the transistor into saturation. This confirms that fixed bias is unsuitable '
        + 'for mass-production circuits where transistor parameters vary.',

        'The voltage-divider bias circuit maintained $I_C \\approx 0.39\\,\\text{mA}$ and $V_{CE} \\approx 9.8\\,\\text{V}$ '
        + 'regardless of whether $\\beta = 100$, 200, or 300. The emitter degeneration resistor $R_E$ provides '
        + 'negative feedback that stabilises the Q-point thermally — a cornerstone of practical BJT amplifier design.',

        'The experiment validates that VDB is the preferred biasing method for discrete BJT circuits. '
        + 'The design rule $R_{TH} \\leq 0.1 \\beta R_E$ was satisfied ($R_{TH} = 9.1\\,\\text{k}\\Omega$, '
        + '$0.1 \\times 200 \\times 1\\,\\text{k} = 20\\,\\text{k}\\Omega$), ensuring the Thévenin voltage '
        + 'source approximation holds and the Q-point remains $\\beta$-independent.',
      ],
    },
  ],
};

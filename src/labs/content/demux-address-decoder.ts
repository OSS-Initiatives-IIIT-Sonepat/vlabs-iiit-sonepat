import { type LabContent } from '@/labs/lab-content.types';

export const DemuxAddressDecoderContent: LabContent = {
  id: 'demux-address-decoder',
  title: 'DEMUX as Address Decoder',
  circuitId: 'demux-address-decoder',
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A Demultiplexer (DEMUX) with its enable input (I) permanently asserted functions as a binary decoder. When I = 1 (always-enabled), the DEMUX outputs Y0 = I·S\' = S\' and Y1 = I·S = S. The outputs are the minterms of the address (select) variable S, which is exactly the behaviour of a 1:2 decoder. By extension, a 1:2ⁿ DEMUX can implement an n:2ⁿ decoder by setting the data input permanently HIGH.',
        'Address decoding is a fundamental task in computer memory systems. A CPU drives an address bus; the high-order address bits must be decoded to assert a chip-select (CS) signal for one specific peripheral device while all other devices remain deselected. The DEMUX-as-decoder topology is attractive because it simultaneously provides the active-LOW chip-select signals (Y0\' and Y1\' for an active-low decoder) for two devices using a minimal gate count.',
        'In an active-low address decoder (using 74HC139 or 74HC138), the deselected outputs are HIGH and the selected output is LOW. Peripheral chips typically have active-low CS inputs — they are enabled when CS = 0. This matches the active-low decoder output natively. In our experiment, the active-high 1:2 DEMUX (Y0 = S\', Y1 = S with I=1) selects Y0 when S=0 and Y1 when S=1, acting as an address decoder that asserts only one output HIGH at a time.',
        "Practical considerations: address decoder propagation delay must be shorter than the memory's access time minus the CPU hold time. Fan-out must be checked — a single 74HC gate can drive 10 LSTTL loads or up to 50 similar CMOS inputs. For systems requiring more than two devices, a 1:4 or 1:8 DEMUX (or equivalently a 2:4 or 3:8 decoder like the 74HC138) is used, with the additional address lines feeding the select inputs.",
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: '74HC04 Hex Inverter IC', specification: 'DIP-14 (NOT gate for S\')', quantity: '1' },
        { name: '74HC08 Quad 2-input AND IC', specification: 'DIP-14 (two AND gates)', quantity: '1' },
        { name: 'LED', specification: 'Green, 5 mm (Device 0 — Y0 selected)', quantity: '1' },
        { name: 'LED', specification: 'Red, 5 mm (Device 1 — Y1 selected)', quantity: '1' },
        { name: 'Resistor (current limiting)', specification: '330 Ω, 0.25 W', quantity: '2' },
        { name: 'SPDT Switch', specification: 'Address select input S', quantity: '1' },
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
          label: 'Build the 1:2 DEMUX circuit with I=1',
          body: 'Construct the standard 1:2 DEMUX circuit: NOT gate (74HC04 pin 1→2) for S\'; AND gate 1 (74HC08, D0 path): pins 1,2→3 computing Y0 = I·S\'; AND gate 2 (D1 path): pins 4,5→6 computing Y1 = I·S. Instead of connecting a data switch to I, permanently tie the I input to +5 V (logic 1) using a wire directly from the +5 V rail. This simulates the always-enabled address decoder.',
          circuitStepIndex: 0,
        },
        {
          label: 'Connect address select switch and LED indicators',
          body: 'Connect the single address select switch to the S input. Provide S to the NOT gate input (pin 1 of 74HC04) and directly to AND gate 2 pin 5. Connect S\' (NOT output, pin 2) to AND gate 1 pin 2. Connect the green LED (Device 0) with a 330 Ω resistor to Y0 (AND gate 1 pin 3). Connect the red LED (Device 1) with a 330 Ω resistor to Y1 (AND gate 2 pin 6). Both LED cathodes go to GND.',
          circuitStepIndex: 1,
        },
        {
          label: 'Verify deselected peripheral is not enabled',
          body: 'Set S=0. The green LED (Y0, Device 0) should be ON and the red LED (Y1, Device 1) should be OFF. Measure the voltage at Y0 (should be ≈5 V) and Y1 (should be ≈0 V). This confirms that only Device 0 is selected and Device 1 is fully deselected — its CS input sees a LOW, keeping it inactive on the shared bus.',
          circuitStepIndex: 2,
        },
        {
          label: 'Switch address and verify other device selected',
          body: 'Set S=1. The red LED (Y1, Device 1) should now be ON and the green LED (Y0, Device 0) should be OFF. Measure Y0 (≈0 V) and Y1 (≈5 V). This confirms Device 1 is now selected while Device 0 is deselected. Record both readings. Toggle S several times and observe the clean switching behaviour — only one device is active at any instant.',
          circuitStepIndex: 3,
        },
        {
          label: 'Simulate bus conflict prevention',
          body: 'With I permanently tied HIGH, simulate a bus conflict scenario by momentarily connecting both AND gate inputs to HIGH manually (if feasible in the gate-level build). In a real system this cannot occur because only one address is valid at a time. Discuss how the enable input (I) of a practical 74HC139 DEMUX is used as an additional layer of control — asserting the enable signal only during valid address cycles prevents glitches from activating wrong devices during address transitions.',
          circuitStepIndex: 4,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        "DEMUX used as address decoder with I=1 (always enabled). S is the address bit. Only one output (device select line) is HIGH at a time.",
      ],
      table: {
        headers: ['Enable I', 'Address S', 'Y0 (Device 0) observed', 'Y1 (Device 1) observed', 'Y0 expected', 'Y1 expected'],
        rows: [
          [1, 0, 1, 0, 1, 0],
          [1, 1, 0, 1, 0, 1],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        "The DEMUX-as-address-decoder experiment confirms that a 1:2 DEMUX with its data input permanently enabled (I=1) operates as a 1:2 binary decoder, asserting exactly one output HIGH depending on the address (select) bit S.",
        'The one-hot selection property ensures that only one peripheral device is activated at any time, preventing bus contention. The circuit correctly routes the "selected" signal to Device 0 when S=0 and to Device 1 when S=1.',
        "This principle scales directly to larger systems: a 74HC138 (3:8 decoder/demux) with its enable inputs asserted decodes three address lines into eight mutually exclusive chip-select lines. This is used in virtually every microcontroller and microprocessor-based system for memory and peripheral address decoding.",
      ],
    },
  ],
};

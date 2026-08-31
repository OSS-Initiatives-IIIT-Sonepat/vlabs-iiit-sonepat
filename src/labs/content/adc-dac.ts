import { type LabContent } from '@/labs/lab-content.types';

export const AdcDacContent: LabContent = {
  id: 'adc-dac',
  title: 'ADC and DAC Interfacing',
  circuitId: 'adc-dac',
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'An Analog-to-Digital Converter (ADC) samples a continuous analog voltage and converts it into a discrete binary number. The resolution of an n-bit ADC is 1/2ⁿ of the full-scale range (FSR). For an 8-bit ADC (e.g., ADC0804) with a 5 V reference, the Least Significant Bit (LSB) corresponds to 5/256 ≈ 19.5 mV — the smallest distinguishable voltage step. The digital output D = round(V_in / LSB) for an ideal ADC. Key specifications include: resolution (bits), conversion time, input voltage range, and reference voltage.',
        'The ADC0804 is an 8-bit successive-approximation ADC in a DIP-20 package. It operates from 5 V, accepts a 0–5 V single-ended input, and requires a clock (RC oscillator formed by an external resistor and capacitor on pins CLK IN/CLK R — typically R=10 kΩ, C=100 pF for ≈ 640 kHz). The /WR pin initiates a conversion when pulsed LOW; the /RD pin enables the output data bus; INTR goes LOW when conversion is complete (indicating new data is ready). The 8 output bits (D0–D7) represent the digital equivalent of the analog input.',
        'A Digital-to-Analog Converter (DAC) performs the reverse: it converts an n-bit digital code to a proportional analog voltage. The R-2R ladder network is a passive DAC that requires only two resistor values (R and 2R) in a ladder structure. For a 4-bit R-2R DAC with a reference voltage Vref = 5 V: V_out = Vref × (D3/2 + D2/4 + D1/8 + D0/16), where D3 is the MSB. The output voltage steps are Vref/2ⁿ = 5/16 ≈ 312.5 mV per LSB for a 4-bit DAC.',
        'Together, ADC and DAC are the bridge between the analog physical world and the digital processing domain. They appear in every data acquisition system, audio codec, motor controller, and sensor interface. This experiment covers the complete ADC–DAC signal chain: an analog voltage from a potentiometer is digitised by the ADC0804, the 8-bit result is displayed on LEDs, and independently, a 4-bit R-2R DAC reconstructs an analog voltage from a 4-bit switch input.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'ADC0804 IC', specification: 'DIP-20, 8-bit SAR ADC, 0-5 V input', quantity: '1' },
        { name: 'Potentiometer', specification: '10 kΩ linear, for analog input voltage source', quantity: '1' },
        { name: 'Capacitor C_clk', specification: '100 pF ceramic (ADC clock oscillator)', quantity: '1' },
        { name: 'Resistor R_clk', specification: '10 kΩ (ADC clock oscillator with C_clk)', quantity: '1' },
        { name: 'Resistors for R-2R DAC (R)', specification: '10 kΩ, ±1%, 0.25 W', quantity: '4' },
        { name: 'Resistors for R-2R DAC (2R)', specification: '20 kΩ (or two 10 kΩ in series), ±1%', quantity: '5' },
        { name: 'LED (ADC output display)', specification: '5 mm red LED', quantity: '8' },
        { name: 'Resistor (LED current limiting)', specification: '330 Ω, 0.25 W', quantity: '8' },
        { name: 'SPDT Switch', specification: 'DAC 4-bit input (D3–D0)', quantity: '4' },
        { name: 'Digital Multimeter', specification: 'Voltage measurement for ADC input and DAC output', quantity: '1' },
        { name: 'DC Power Supply', specification: '5 V regulated, ≥ 500 mA', quantity: '1' },
        { name: 'Bread Board', specification: 'Full size, 830 tie-points', quantity: '1' },
        { name: 'Connecting Wires', specification: '22 AWG solid-core jumper wires', quantity: '40' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Build the ADC0804 interface circuit',
          body: 'Insert the ADC0804 (DIP-20) on the breadboard. Connect pin 20 (Vcc) and pin 1 (CS\') to +5 V; pins 8 (AGND) and 10 (DGND) to GND. Build the clock oscillator: connect a 10 kΩ resistor from pin 19 (CLK R) to pin 4 (CLK IN), and a 100 pF capacitor from pin 4 to GND. This generates approximately 640 kHz for the successive approximation clock. Connect pin 9 (Vref/2) to a voltage divider or leave unconnected (which defaults to Vcc/2 = 2.5 V, giving a 0–5 V input range).',
          circuitStepIndex: 0,
        },
        {
          label: 'Connect potentiometer as analog input',
          body: 'Wire the 10 kΩ potentiometer: one end to +5 V, the other end to GND, and the wiper (centre tap) to pin 6 (VIN+) of the ADC0804. Connect pin 7 (VIN−) to GND. The potentiometer allows the analog input voltage V_in to be varied continuously from 0 V to 5 V. Connect pins 11–18 (D0–D7, 8-bit output) through 330 Ω resistors to eight LEDs (D0 = LSB = LED0, D7 = MSB = LED7).',
          circuitStepIndex: 1,
        },
        {
          label: 'Initiate and read conversions',
          body: 'Tie /CS (pin 1) to GND (always chip-selected). Connect /WR (pin 3) and /RD (pin 2) both to GND to run the ADC in free-running conversion mode (the /WR–/RD–INTR loop allows auto-restart). In this mode the ADC continuously converts and updates its output register. Adjust the potentiometer and observe the LED binary pattern change. Measure V_in with a voltmeter and record the corresponding LED binary output.',
          circuitStepIndex: 2,
        },
        {
          label: 'Build the 4-bit R-2R ladder DAC',
          body: 'Construct a 4-bit R-2R ladder DAC on the remaining breadboard space. Use four 10 kΩ (R) and five 20 kΩ (2R) resistors in the standard R-2R ladder topology. The ladder has four input nodes connected to four switches (D3=MSB to D0=LSB); each switch connects the node to either +5 V (logic 1) or GND (logic 0). The output node (rightmost) is the analog output V_out. Connect V_out to the voltmeter positive probe.',
          circuitStepIndex: 3,
        },
        {
          label: 'Test DAC with all 16 input codes',
          body: 'Apply all sixteen 4-bit input codes from 0000 to 1111 to the DAC input switches. For each code, measure V_out with the voltmeter. The expected output is V_out = 5 × (code / 16) V. For code 0000, V_out = 0 V; for code 1111 (decimal 15), V_out = 5 × 15/16 = 4.6875 V. Record all sixteen measured voltages and compare with expected values. Calculate the DNL (Differential Non-Linearity) error for any steps that deviate from the ideal 312.5 mV step size.',
          circuitStepIndex: 3,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Part A — ADC: Measured V_in and corresponding 8-bit digital output. Part B — 4-bit R-2R DAC: digital input code versus measured output voltage.',
      ],
      table: {
        headers: ['DAC Code (Decimal)', 'D3 D2 D1 D0', 'V_out Expected (V)', 'V_out Measured (V)', 'Error (mV)'],
        rows: [
          [0, '0000', 0.000, 0.003, 3],
          [1, '0001', 0.3125, 0.310, 2.5],
          [2, '0010', 0.625, 0.621, 4],
          [4, '0100', 1.250, 1.246, 4],
          [7, '0111', 2.1875, 2.182, 5.5],
          [8, '1000', 2.500, 2.494, 6],
          [12, '1100', 3.750, 3.742, 8],
          [15, '1111', 4.6875, 4.678, 9.5],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The ADC0804 interface was successfully implemented. In free-running mode, the 8-bit LED output correctly tracked the potentiometer input voltage across the full 0–5 V range. The digital code increased monotonically as V_in increased, confirming correct ADC operation.',
        'The 4-bit R-2R ladder DAC produced output voltages closely matching the theoretical V_out = Vref × Code/16 formula. The maximum measured error was less than 10 mV (< 3.2% FSR for a 4-bit DAC), which is within the 0.5 LSB (156 mV) accuracy expected from this passive architecture with ±1% resistors.',
        'Together these circuits demonstrate the complete analog-digital interface chain. The ADC converts physical quantities to digital data for processing; the DAC converts digital results back to analog control or audio signals. Understanding these conversions is fundamental to all mixed-signal systems including audio codecs, sensor data acquisition boards, motor drive controllers, and software-defined radio.',
      ],
    },
  ],
};

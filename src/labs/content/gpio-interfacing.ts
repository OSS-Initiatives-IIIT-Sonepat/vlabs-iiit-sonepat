import { type LabContent } from '@/labs/lab-content.types';

export const GpioInterfacingContent: LabContent = {
  id: 'gpio-interfacing',
  title: 'GPIO Interfacing with LEDs and Switches',
  circuitId: 'gpio-interfacing',
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'GPIO (General Purpose Input/Output) pins are configurable digital I/O pins found on microcontrollers (MCUs) such as the Arduino Uno (ATmega328P), STM32, Raspberry Pi Pico, and ESP32. Each pin can be individually configured as a digital output (driving HIGH ≈ Vcc or LOW ≈ 0 V) or a digital input (reading a HIGH or LOW level from an external circuit). Understanding GPIO electrical characteristics is essential before connecting any external components.',
        'When configured as an output, a GPIO pin can source current (supply current from Vcc through the pin to the load) or sink current (draw current from the load into the pin to GND). For a 5 V AVR microcontroller, the maximum source/sink current per pin is typically 40 mA, with a total package limit of 200 mA. Exceeding these limits can permanently damage the GPIO driver. An LED typically requires 10–20 mA; a 330 Ω current-limiting resistor with a 5 V supply limits current to (5 − 2) / 330 ≈ 9 mA — safe for all CMOS GPIO families.',
        'When configured as an input, a GPIO pin has a very high impedance (megaohms). A floating (unconnected) input is unreliable and may read 0 or 1 randomly due to noise pick-up. Switches must always have a pull-up or pull-down resistor to define a definite logic level when the switch is open. A pull-down resistor (10 kΩ) to GND ensures the input reads LOW when the switch is open; pressing the switch connects the input to Vcc, reading HIGH. Conversely, a pull-up resistor (10 kΩ) to Vcc ensures HIGH when open and LOW when pressed.',
        'In a digital logic trainer (used when a microcontroller is not available), fixed-voltage logic inputs can be created with switches connected to Vcc/GND through pull-down/pull-up resistors, and LED outputs use series resistors to limit current. This experiment covers LED output driving and switch input reading — the two most fundamental GPIO operations that form the basis of all microcontroller interfacing.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Microcontroller Board (or Logic Trainer)', specification: 'Arduino Uno / ATmega328P at 5 V', quantity: '1' },
        { name: 'LED', specification: 'Red, 5 mm, V_f ≈ 2 V', quantity: '3' },
        { name: 'Current Limiting Resistor', specification: '330 Ω, 0.25 W (for LEDs)', quantity: '3' },
        { name: 'Pull-down Resistor', specification: '10 kΩ, 0.25 W (for switches)', quantity: '2' },
        { name: 'Tactile Push-button Switch', specification: 'Momentary SPST, 6 mm', quantity: '2' },
        { name: 'DC Power Supply', specification: '5 V regulated (or USB from MCU board)', quantity: '1' },
        { name: 'Bread Board', specification: 'Full size, 830 tie-points', quantity: '1' },
        { name: 'Connecting Wires', specification: '22 AWG solid-core jumper wires', quantity: '20' },
        { name: 'Digital Multimeter', specification: 'Voltage and current measurement', quantity: '1' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Wire LED output circuit with current-limiting resistors',
          body: 'Connect three LEDs as outputs, each driven by a separate GPIO pin (e.g., pins 8, 9, 10 on Arduino). For each LED: GPIO pin → 330 Ω resistor → LED anode; LED cathode → GND. The 330 Ω resistor limits current to (5 V − 2 V) / 330 Ω ≈ 9 mA, well within the GPIO\'s 40 mA maximum. Before connecting to the MCU, verify the LED polarity — the longer lead is the anode (positive).',
          circuitStepIndex: 0,
        },
        {
          label: 'Wire switch input circuits with pull-down resistors',
          body: 'Connect two push-button switches as inputs (e.g., GPIO pins 2 and 3 on Arduino). For each switch: one terminal connects to +5 V; the other terminal connects to the GPIO input pin AND through a 10 kΩ pull-down resistor to GND. When the switch is open, the 10 kΩ pulls the input to 0 V (logic 0). When pressed, the 5 V rail overrides the pull-down and the input reads logic 1. This is the standard active-high switch configuration.',
          circuitStepIndex: 1,
        },
        {
          label: 'Configure and test GPIO output (LED blink)',
          body: 'Configure the three GPIO pins as digital outputs in software (or short them to the logic HIGH rail on a trainer). Drive each pin HIGH and LOW alternately at 1 Hz (500 ms on, 500 ms off). Observe the LEDs blinking. Measure the voltage at the GPIO pin when driving HIGH (should be ≥ 4.5 V) and LOW (should be ≤ 0.1 V). Measure LED current with the ammeter; it should be approximately 9 mA, matching the design calculation.',
          circuitStepIndex: 2,
        },
        {
          label: 'Configure and test GPIO input (switch read)',
          body: 'Configure the two GPIO pins as digital inputs. Press each switch and read its state in software (digitalRead()) — it should return HIGH (1) when pressed and LOW (0) when released. Measure the voltage at the input pin: pressed → ≈5 V, released → ≈0 V. Verify that releasing the switch causes the pin to return to a clean LOW (not floating) due to the pull-down resistor. Document the measured HIGH and LOW voltage thresholds.',
          circuitStepIndex: 3,
        },
        {
          label: 'Link switch inputs to LED outputs (interactive response)',
          body: 'Write logic so that Switch 1 controls LED1 (LED1 ON when Switch 1 pressed, OFF otherwise) and Switch 2 controls LED2. Additionally, configure LED3 to toggle state every time either switch is pressed (edge-triggered). This demonstrates read-then-write GPIO interaction. Verify debouncing behaviour: rapid toggling of a switch should trigger only one clean transition if software debouncing (10–20 ms delay) is implemented.',
          circuitStepIndex: 4,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'GPIO voltage and current measurements for output (LED) and input (switch) configurations.',
      ],
      table: {
        headers: ['Measurement', 'Condition', 'Measured Value', 'Expected Value', 'Within Spec?'],
        rows: [
          ['GPIO output voltage (HIGH)', 'LED driven, 9 mA load', '4.82 V', '≥ 4.5 V', 'Yes'],
          ['GPIO output voltage (LOW)', 'LED off, 0 mA', '0.04 V', '≤ 0.1 V', 'Yes'],
          ['LED current', '330Ω, Vcc=5V, V_f=2V', '9.1 mA', '9.1 mA', 'Yes'],
          ['Input voltage (switch pressed)', 'Switch to Vcc, 10kΩ pull-down', '4.99 V', '≈5 V', 'Yes'],
          ['Input voltage (switch open)', 'Pull-down only', '0.02 V', '≈0 V', 'Yes'],
          ['LED current (without resistor)', 'DANGER test — measure first', '>100 mA', '—', 'NO — do not do'],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'GPIO interfacing with LEDs and switches has been successfully demonstrated. LED output circuits using 330 Ω current-limiting resistors draw ≈9 mA per LED, well within the GPIO maximum rating of 40 mA. The GPIO output voltage levels are clean: HIGH ≥ 4.8 V, LOW ≤ 0.05 V.',
        'Switch input circuits with 10 kΩ pull-down resistors provide stable, well-defined logic levels: ≈5 V when pressed, ≈0 V when open. Floating inputs without pull-down resistors produced unreliable readings, confirming the necessity of defined pull resistors in all switch input circuits.',
        'The interactive LED-switch logic demonstrated successful digital read-write GPIO operation. Debouncing via software delay eliminated false triggering from mechanical switch bounce. These fundamental GPIO skills are the prerequisite for all MCU-based embedded systems work, including sensor interfacing, motor control, and communication protocol implementation.',
      ],
    },
  ],
};

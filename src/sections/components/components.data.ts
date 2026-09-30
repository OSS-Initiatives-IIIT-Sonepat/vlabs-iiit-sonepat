import { type EceComponentKind } from "@/labs/previews/EceComponentViewer";

export type ComponentData = {
  slug: string;
  name: string;
  kind: EceComponentKind;
  tagline: string;
  description: string[];
  specs: { label: string; value: string }[];
  tips: string[];
};

export const COMPONENTS_DATA: Record<string, ComponentData> = {
  breadboard: {
    slug: "breadboard",
    name: "Solderless Breadboard",
    kind: "breadboard",
    tagline: "The foundation for prototyping electronic circuits.",
    description: [
      "A breadboard is a rectangular plastic board with a grid of tiny holes. It allows you to easily connect electronic components together to build and test circuits without soldering.",
      "The holes are connected underneath by metal clips. The outer rows (power rails) are connected horizontally, while the inner rows (terminal strips) are connected vertically, with a gap in the middle to straddle ICs.",
    ],
    specs: [
      { label: "Type", value: "Solderless" },
      { label: "Tie points", value: "830" },
      { label: "Power rails", value: "2 pairs (Top/Bottom)" },
      { label: "Pitch", value: "0.1 inch (2.54 mm)" },
    ],
    tips: [
      "Always connect your power supply to the top and bottom rails first.",
      "Use the centre gap to mount DIP ICs (chips).",
      "Keep your wiring neat to make debugging easier.",
    ],
  },
  resistors: {
    slug: "resistors",
    name: "Resistors",
    kind: "resistor",
    tagline: "Control the flow of electrical current.",
    description: [
      "Resistors are passive components that resist the flow of electrical current. They are used to limit current, divide voltages, and protect delicate components like LEDs from receiving too much power.",
      "The resistance value is measured in Ohms (Ω) and is typically indicated by a series of colored bands painted on the body of the resistor.",
    ],
    specs: [
      { label: "Type", value: "Through-hole (Axial)" },
      { label: "Power rating", value: "1/4 Watt" },
      { label: "Tolerance", value: "±5% (Gold band)" },
      { label: "Polarity", value: "None (Bi-directional)" },
    ],
    tips: [
      "Resistors have no polarity; they can be plugged in either way.",
      "Always use a current-limiting resistor in series with an LED.",
      "Learn the resistor color code or keep a reference chart handy.",
    ],
  },
  capacitors: {
    slug: "capacitors",
    name: "Capacitors",
    kind: "capacitor",
    tagline: "Store and release electrical energy.",
    description: [
      "Capacitors store electrical energy temporarily in an electric field. They are used for filtering noise in power supplies, smoothing out voltage spikes, and in timing circuits.",
      "Electrolytic capacitors (like the blue one shown) have high capacitance but are polarized, meaning they must be connected in the correct direction.",
    ],
    specs: [
      { label: "Type", value: "Electrolytic / Ceramic" },
      { label: "Capacitance", value: "Microfarads (µF) to Picofarads (pF)" },
      { label: "Polarity", value: "Yes (for Electrolytic)" },
      { label: "Voltage rating", value: "Variable (e.g. 25V)" },
    ],
    tips: [
      "Pay attention to polarity! The striped side of an electrolytic capacitor indicates the negative terminal.",
      "Ceramic capacitors (the small disc ones) are not polarized.",
      "Ensure the voltage rating of the capacitor exceeds your circuit voltage.",
    ],
  },
  leds: {
    slug: "leds",
    name: "Light Emitting Diodes",
    kind: "led",
    tagline: "Visual indicators for your circuits.",
    description: [
      "LEDs (Light Emitting Diodes) are semiconductors that emit light when current flows through them. They are essential for providing visual feedback in circuits.",
      "Because they are diodes, they only allow current to flow in one direction. They must be oriented correctly and always require a resistor to prevent them from burning out.",
    ],
    specs: [
      { label: "Type", value: "5mm Through-hole" },
      { label: "Forward Voltage", value: "~2.0V (varies by color)" },
      { label: "Forward Current", value: "20mA (Max)" },
      { label: "Polarity", value: "Yes (Long leg = Anode/+)" },
    ],
    tips: [
      "The longer leg is the anode (positive) and the shorter leg is the cathode (negative).",
      "The flat edge on the plastic collar also indicates the cathode side.",
      "Never connect an LED directly to a power source without a resistor.",
    ],
  },
  "ics-gates": {
    slug: "ics-gates",
    name: "Integrated Circuits & Gates",
    kind: "xor-gate",
    tagline: "The building blocks of digital logic.",
    description: [
      "Integrated Circuits (ICs) pack complex circuits into a single chip. In digital electronics, the most common chips are logic gates (AND, OR, NOT, etc.) which perform basic boolean logic operations.",
      "These chips typically come in a Dual In-line Package (DIP) and must be placed across the center gap of the breadboard so their pins do not short together.",
    ],
    specs: [
      { label: "Package", value: "DIP-14 or DIP-16" },
      { label: "Logic Family", value: "74LS or 74HC series" },
      { label: "Operating Voltage", value: "5V (Standard)" },
      { label: "Pin Pitch", value: "0.1 inch (Fits breadboard)" },
    ],
    tips: [
      "Always align the notch or dot on the chip to face the top/left of the board to identify Pin 1.",
      "Connect VCC (power) and GND (ground) before wiring any logic inputs.",
      "Never leave unused input pins floating (unconnected); tie them to ground or VCC.",
    ],
  },
  "long-breadboard": {
    slug: "long-breadboard",
    name: "Long Breadboard",
    kind: "long-breadboard",
    tagline: "Extended solderless breadboard for complex circuits.",
    description: [
      "A larger version of the standard breadboard, providing more space and tie-points for complex prototyping.",
      "Useful for circuits requiring multiple ICs or extensive wiring."
    ],
    specs: [
      { label: "Type", value: "Solderless" },
      { label: "Tie points", value: "1660" }
    ],
    tips: [
      "Ensure power rails are bridged if you need continuous power across the board."
    ]
  },
  wire: {
    slug: "wire",
    name: "Jumper Wire",
    kind: "wire",
    tagline: "Connects components together.",
    description: [
      "Used to establish electrical connections between components on the breadboard.",
      "Available in various lengths and colors to keep circuits organized."
    ],
    specs: [
      { label: "Type", value: "Solid core" },
      { label: "Gauge", value: "22 AWG" }
    ],
    tips: [
      "Use color coding (e.g., red for power, black for ground) to avoid confusion."
    ]
  },
  potentiometer: {
    slug: "potentiometer",
    name: "Potentiometer",
    kind: "potentiometer",
    tagline: "Variable resistor for adjustable control.",
    description: [
      "A three-terminal resistor with a sliding or rotating contact that forms an adjustable voltage divider.",
      "Commonly used to control volume, brightness, or set reference voltages."
    ],
    specs: [
      { label: "Type", value: "Rotary" },
      { label: "Resistance", value: "Variable (e.g., 10kΩ)" }
    ],
    tips: [
      "The outer pins act as a fixed resistor, while the middle pin is the wiper."
    ]
  },
  "push-button": {
    slug: "push-button",
    name: "Push Button",
    kind: "push-button",
    tagline: "Momentary tactile switch.",
    description: [
      "A simple switch mechanism that completes a circuit only while being pressed.",
      "Ideal for triggering inputs or resetting digital circuits."
    ],
    specs: [
      { label: "Type", value: "Momentary SPST" }
    ],
    tips: [
      "Use a pull-up or pull-down resistor to ensure a defined logic level when not pressed."
    ]
  },
  switch: {
    slug: "switch",
    name: "Toggle Switch",
    kind: "switch",
    tagline: "Maintains its state once switched.",
    description: [
      "A switch that stays in its set position (on or off) without continuous pressure.",
      "Used for turning power on/off or selecting between two states."
    ],
    specs: [
      { label: "Type", value: "SPDT or SPST" }
    ],
    tips: [
      "Verify the switch configuration (e.g., center-off) before wiring."
    ]
  },
  battery: {
    slug: "battery",
    name: "Battery",
    kind: "battery",
    tagline: "Portable DC power source.",
    description: [
      "Provides a fixed DC voltage for powering circuits.",
      "Often used in portable electronics or when a bench supply is unavailable."
    ],
    specs: [
      { label: "Type", value: "DC Source" },
      { label: "Voltage", value: "Varies (e.g., 9V, 1.5V)" }
    ],
    tips: [
      "Ensure proper polarity when connecting to your circuit."
    ]
  },
  "dc-jack": {
    slug: "dc-jack",
    name: "DC Jack",
    kind: "dc-jack",
    tagline: "Power connector for external adapters.",
    description: [
      "A barrel connector used to interface wall adapters with your breadboard or PCB."
    ],
    specs: [
      { label: "Type", value: "Barrel Jack" }
    ],
    tips: [
      "Check the polarity of your adapter (center positive is most common)."
    ]
  },
  "ic-meter": {
    slug: "ic-meter",
    name: "Multimeter",
    kind: "ic-meter",
    tagline: "Essential tool for measuring electrical values.",
    description: [
      "Measures voltage, current, and resistance to help debug and verify circuits."
    ],
    specs: [
      { label: "Type", value: "Digital Multimeter" }
    ],
    tips: [
      "Always set the correct measurement range to avoid damaging the meter."
    ]
  },
  "dc-power-supply": {
    slug: "dc-power-supply",
    name: "DC Power Supply",
    kind: "dc-power-supply",
    tagline: "Adjustable benchtop power source.",
    description: [
      "Provides stable, variable DC voltage and current for testing circuits."
    ],
    specs: [
      { label: "Type", value: "Benchtop" },
      { label: "Output", value: "Variable V/I" }
    ],
    tips: [
      "Set the current limit before connecting to protect your circuit from shorts."
    ]
  },
  "mcu-trainer": {
    slug: "mcu-trainer",
    name: "MCU Trainer Kit",
    kind: "mcu-trainer",
    tagline: "Microcontroller evaluation and learning platform.",
    description: [
      "A comprehensive board for learning microcontroller programming and interfacing."
    ],
    specs: [
      { label: "Type", value: "Development Board" }
    ],
    tips: [
      "Refer to the pinout diagram for connecting external peripherals."
    ]
  },
  diode: {
    slug: "diode",
    name: "Diode",
    kind: "diode",
    tagline: "Allows current to flow in one direction.",
    description: [
      "A semiconductor device that acts as a one-way valve for current."
    ],
    specs: [
      { label: "Type", value: "Silicon Rectifier" },
      { label: "Forward Drop", value: "~0.7V" }
    ],
    tips: [
      "The striped end indicates the cathode (negative side)."
    ]
  },
  "zener-diode": {
    slug: "zener-diode",
    name: "Zener Diode",
    kind: "zener-diode",
    tagline: "Provides a stable reference voltage.",
    description: [
      "Designed to allow current to flow backwards when a specific reverse voltage is reached."
    ],
    specs: [
      { label: "Type", value: "Voltage Regulator" }
    ],
    tips: [
      "Used in reverse-bias mode to clamp voltage."
    ]
  },
  ammeter: {
    slug: "ammeter",
    name: "Ammeter",
    kind: "ammeter",
    tagline: "Measures electrical current.",
    description: [
      "An instrument used to measure the current in a circuit."
    ],
    specs: [
      { label: "Type", value: "Current Meter" }
    ],
    tips: [
      "Must be connected in series with the circuit branch being measured."
    ]
  },
  voltmeter: {
    slug: "voltmeter",
    name: "Voltmeter",
    kind: "voltmeter",
    tagline: "Measures electrical potential difference.",
    description: [
      "An instrument used for measuring electrical potential difference between two points."
    ],
    specs: [
      { label: "Type", value: "Voltage Meter" }
    ],
    tips: [
      "Must be connected in parallel with the component being measured."
    ]
  },
  bjt: {
    slug: "bjt",
    name: "Bipolar Junction Transistor",
    kind: "bjt",
    tagline: "Current-controlled amplifier and switch.",
    description: [
      "A three-terminal semiconductor device used for amplifying or switching electronic signals."
    ],
    specs: [
      { label: "Type", value: "NPN / PNP" }
    ],
    tips: [
      "Identify the Base, Collector, and Emitter pins before wiring."
    ]
  },
  mosfet: {
    slug: "mosfet",
    name: "MOSFET",
    kind: "mosfet",
    tagline: "Voltage-controlled amplifier and switch.",
    description: [
      "A field-effect transistor widely used for switching and amplifying signals."
    ],
    specs: [
      { label: "Type", value: "N-Channel / P-Channel" }
    ],
    tips: [
      "Highly sensitive to static electricity; handle with care."
    ]
  },
  "op-amp": {
    slug: "op-amp",
    name: "Operational Amplifier",
    kind: "op-amp",
    tagline: "Versatile voltage amplifier.",
    description: [
      "A high-gain electronic voltage amplifier with a differential input and, usually, a single-ended output."
    ],
    specs: [
      { label: "Type", value: "IC (e.g., 741, LM358)" }
    ],
    tips: [
      "Requires power supply connections (often dual +/-) to function properly."
    ]
  },
  "seven-segment": {
    slug: "seven-segment",
    name: "7-Segment Display",
    kind: "seven-segment",
    tagline: "Numeric indicator.",
    description: [
      "An electronic display device for displaying decimal numerals."
    ],
    specs: [
      { label: "Type", value: "Common Anode/Cathode" }
    ],
    tips: [
      "Requires current-limiting resistors for each segment."
    ]
  },
  oscilloscope: {
    slug: "oscilloscope",
    name: "Oscilloscope",
    kind: "oscilloscope",
    tagline: "Visualizes electrical signals over time.",
    description: [
      "A laboratory instrument commonly used to display and analyze the waveform of electronic signals."
    ],
    specs: [
      { label: "Type", value: "Digital Storage Oscilloscope" }
    ],
    tips: [
      "Connect the ground clip to the circuit ground to get accurate readings."
    ]
  },
  "function-generator": {
    slug: "function-generator",
    name: "Function Generator",
    kind: "function-generator",
    tagline: "Produces various electrical waveforms.",
    description: [
      "A piece of electronic test equipment used to generate different types of electrical waveforms over a wide range of frequencies."
    ],
    specs: [
      { label: "Type", value: "Signal Generator" }
    ],
    tips: [
      "Set the output amplitude and frequency before connecting to sensitive circuits."
    ]
  },
  transformer: {
    slug: "transformer",
    name: "Transformer",
    kind: "transformer",
    tagline: "Transfers electrical energy between circuits.",
    description: [
      "A passive component that transfers electrical energy from one electrical circuit to another, or multiple circuits."
    ],
    specs: [
      { label: "Type", value: "Step-up / Step-down" }
    ],
    tips: [
      "Used primarily with AC signals for voltage conversion or isolation."
    ]
  },
  "dip-switch": {
    slug: "dip-switch",
    name: "DIP Switch",
    kind: "dip-switch",
    tagline: "Compact array of switches.",
    description: [
      "A manual electric switch that is packaged with others in a group in a standard dual in-line package (DIP)."
    ],
    specs: [
      { label: "Type", value: "SPST Array" }
    ],
    tips: [
      "Useful for setting hardware configuration options."
    ]
  },
  "logic-analyser": {
    slug: "logic-analyser",
    name: "Logic Analyser",
    kind: "logic-analyser",
    tagline: "Captures and displays multiple digital signals.",
    description: [
      "An electronic instrument that captures and displays multiple signals from a digital system or digital circuit."
    ],
    specs: [
      { label: "Type", value: "Digital Test Equipment" }
    ],
    tips: [
      "Great for debugging complex digital communication protocols like SPI or I2C."
    ]
  },
  "unknown-apparatus": {
    slug: "unknown-apparatus",
    name: "Unknown Apparatus",
    kind: "unknown-apparatus",
    tagline: "Placeholder for future devices.",
    description: [
      "A generic model used when a specific component model is unavailable."
    ],
    specs: [
      { label: "Type", value: "Placeholder" }
    ],
    tips: [
      "Used internally as a fallback visual."
    ]
  }
};

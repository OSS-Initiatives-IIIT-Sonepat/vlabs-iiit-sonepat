import { type TheorySection } from "@/labs/lab-content.types";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Regulated Power Supply: A regulated DC power supply converts mains AC into a steady DC output that does not change with load current or mains fluctuations. A bench supply has a voltage knob (0-30 V typical), a current-limit knob, a + (red) terminal, a - (black) terminal and a green GND terminal. Always set the voltage before connecting the circuit, and use the current limit to protect the circuit from a short.",
    "Bread Board: A solderless prototyping board. Each numbered column has five holes (a-e and f-j) joined together by a metal strip, and the two halves are separated by a centre gap that IC packages straddle. The long rails along the edges are for VCC (+) and GND (-). Holes in the same strip are connected; holes in different strips are not.",
    "Multimeter: Measures DC/AC voltage, current and resistance. To measure voltage, connect the meter in PARALLEL across the component. To measure current, break the circuit and connect the meter in SERIES. To measure resistance, switch off the circuit power, isolate the component and connect the probes across it. The red probe goes to the V/Ω/mA jack and the black probe to COM.",
    "Function Generator: Produces sine, square and triangular waveforms with adjustable frequency (here 0.1 Hz - 1 MHz) and amplitude. Its OUTPUT has a 50 Ω source impedance. Connect OUTPUT to the circuit input and its GND to the common ground of the circuit.",
    "Cathode Ray Oscilloscope (CRO): Displays a voltage against time. Key controls are VOLTS/DIV (vertical scale), TIME/DIV (horizontal scale), the trigger level, and the AC-GND-DC coupling switch. Peak-to-peak voltage is Vpp = (divisions) x (VOLTS/DIV). Time period is T = (divisions) x (TIME/DIV) and frequency is f = 1/T. The probe ground clip must be connected to circuit ground.",
    "Passive components do not provide power gain and cannot amplify a signal. Resistor (R) opposes current, V = IR; its value is read from colour bands (e.g. 330 Ω = orange, orange, brown; 1 kΩ = brown, black, red). Capacitor (C) stores charge, Q = CV; reactance Xc = 1/(2*pi*f*C). Inductor (L) stores energy in a magnetic field; reactance XL = 2*pi*f*L.",
    "Active components can control current flow or provide gain and need an external supply. Diode: conducts only when forward biased (anode positive); the cathode is marked by a band. LED: a diode that emits light and must always be used with a series resistor. Transistor (BJT): a three-terminal device (Base, Collector, Emitter) used as a switch or amplifier. ICs such as op-amps and logic gates are also active devices.",
    "RC low-pass filter used in this experiment: with R = 1 kΩ and C = 0.1 µF the cut-off frequency is fc = 1/(2*pi*R*C), about 1.59 kHz. At 1 kHz the output amplitude is about 85% of the input.",
  ],
};

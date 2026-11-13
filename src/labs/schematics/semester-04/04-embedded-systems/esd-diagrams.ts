import { type SchematicData } from "@/labs/CircuitSchematic";
import {
  flow,
  type FlowLink,
  type FlowNode,
  type FlowStep,
} from "@/labs/schematics/semester-03/diagram";

// 2D schematics for the 8051 and PIC18 experiments of the Embedded Systems
// subject. One flow diagram per experiment; each procedure step takes the frame
// that matches its circuit state.

function frames(
  nodes: FlowNode[],
  links: FlowLink[],
  steps: FlowStep[],
): SchematicData[] {
  return flow(nodes, links, steps.map((step) => ({ height: 420, ...step })));
}

// LED with a series resistor, driven from a microcontroller pin.
export function ledFromPin(pinLabel: string, ohms: string): SchematicData[] {
  const nodes: FlowNode[] = [
    { id: "pin", kind: "terminal", x: 200, y: 70, w: 260, label: pinLabel },
    { id: "r", kind: "block", x: 200, y: 160, w: 260, label: ohms },
    { id: "led", kind: "block", x: 200, y: 250, w: 260, label: "LED: anode to cathode" },
    { id: "gnd", kind: "terminal", x: 200, y: 340, w: 260, label: "GND" },
  ];
  const links: FlowLink[] = [
    { id: "a", from: "pin", to: "r" },
    { id: "b", from: "r", to: "led" },
    { id: "c", from: "led", to: "gnd", label: "current" },
  ];
  return frames(nodes, links, [
    { title: "Port pin", show: ["pin"], highlight: "pin" },
    { title: "Series resistor", show: ["pin", "r"], highlight: "r" },
    { title: "LED", show: ["pin", "r", "led"], highlight: "led" },
    { title: "Ground return", show: ["pin", "r", "led", "gnd"], highlight: "gnd" },
  ]);
}

// Push-button read on a pin, with an external pull-down or pull-up.
export function buttonOnPin(
  pinLabel: string,
  pull: "down" | "up",
): SchematicData[] {
  const pullLabel =
    pull === "down" ? "10 kohm pull-down to GND" : "Pull-up to VCC";
  const nodes: FlowNode[] = [
    { id: "pin", kind: "terminal", x: 170, y: 70, w: 250, label: pinLabel },
    { id: "pu", kind: "block", x: 440, y: 70, w: 250, label: pullLabel },
    { id: "btn", kind: "block", x: 170, y: 190, w: 250, label: "Push-button" },
    { id: "rail", kind: "terminal", x: 170, y: 300, w: 250, label: pull === "down" ? "VCC (+5 V)" : "GND" },
  ];
  const links: FlowLink[] = [
    { id: "a", from: "pin", to: "pu" },
    { id: "b", from: "pin", to: "btn" },
    { id: "c", from: "btn", to: "rail", label: pull === "down" ? "pressed = HIGH" : "pressed = LOW" },
  ];
  return frames(nodes, links, [
    { title: "Input pin", show: ["pin"], highlight: "pin" },
    { title: "Pull resistor", show: ["pin", "pu"], highlight: "pu" },
    { title: "Push-button", show: ["pin", "pu", "btn"], highlight: "btn" },
    { title: "Button to the rail", show: ["pin", "pu", "btn", "rail"], highlight: "rail" },
  ]);
}

// Voltage divider read on an analog pin (also the ADC0804 input).
export function dividerOnPin(pinLabel: string): SchematicData[] {
  const nodes: FlowNode[] = [
    { id: "v", kind: "terminal", x: 200, y: 60, w: 260, label: "+5 V supply" },
    { id: "r1", kind: "block", x: 200, y: 150, w: 260, label: "10 kohm (R1)" },
    { id: "adc", kind: "block", x: 200, y: 240, w: 260, label: pinLabel },
    { id: "r2", kind: "block", x: 200, y: 330, w: 260, label: "10 kohm (R2)" },
    { id: "gnd", kind: "terminal", x: 200, y: 420, w: 260, label: "GND" },
  ];
  const links: FlowLink[] = [
    { id: "a", from: "v", to: "r1" },
    { id: "b", from: "r1", to: "adc", label: "middle point" },
    { id: "c", from: "adc", to: "r2" },
    { id: "d", from: "r2", to: "gnd" },
  ];
  return frames(nodes, links, [
    { title: "Supply", show: ["v"], highlight: "v" },
    { title: "Top resistor", show: ["v", "r1"], highlight: "r1" },
    { title: "Tap to the input", show: ["v", "r1", "adc"], highlight: "adc" },
    { title: "Bottom resistor", show: ["v", "r1", "adc", "r2"], highlight: "r2" },
    { title: "Return to GND", show: ["v", "r1", "adc", "r2", "gnd"], highlight: "gnd" },
  ]);
}

// Four-bit R-2R ladder read out on a port (used by the DAC experiment).
export function r2rLadder(): SchematicData[] {
  const nodes: FlowNode[] = [
    { id: "port", kind: "terminal", x: 170, y: 60, w: 250, label: "8051 P1.0 to P1.3" },
    { id: "net", kind: "block", x: 170, y: 150, w: 250, label: "Bit weights 8 : 4 : 2 : 1" },
    { id: "ladder", kind: "block", x: 430, y: 150, w: 250, label: "R = 10 kohm, 2R = 20 kohm" },
    { id: "out", kind: "terminal", x: 430, y: 260, w: 250, label: "Vout (0 to 4.69 V)" },
    { id: "gnd", kind: "terminal", x: 170, y: 340, w: 250, label: "GND" },
  ];
  const links: FlowLink[] = [
    { id: "a", from: "port", to: "net" },
    { id: "b", from: "net", to: "ladder" },
    { id: "c", from: "ladder", to: "out", label: "analog out" },
    { id: "d", from: "out", to: "gnd" },
  ];
  return frames(nodes, links, [
    { title: "Digital port", show: ["port"], highlight: "port" },
    { title: "Binary weights", show: ["port", "net"], highlight: "net" },
    { title: "R-2R network", show: ["port", "net", "ladder"], highlight: "ladder" },
    { title: "Analog output", show: ["port", "net", "ladder", "out"], highlight: "out" },
    { title: "Common ground", show: ["port", "net", "ladder", "out", "gnd"], highlight: "gnd" },
  ]);
}

// ADC0804 converting a divider voltage, data bus read by the 8051.
export function adcChain(): SchematicData[] {
  const nodes: FlowNode[] = [
    { id: "vin", kind: "terminal", x: 170, y: 60, w: 250, label: "Divider voltage (VIN+)" },
    { id: "adc", kind: "block", x: 170, y: 150, w: 250, label: "ADC0804: converts VIN" },
    { id: "bus", kind: "block", x: 430, y: 150, w: 250, label: "DB0 to DB7 data bus" },
    { id: "mcu", kind: "block", x: 430, y: 240, w: 250, label: "8051 reads P1" },
    { id: "ctl", kind: "terminal", x: 170, y: 290, w: 250, label: "WR, RD, INTR to P3" },
  ];
  const links: FlowLink[] = [
    { id: "a", from: "vin", to: "adc" },
    { id: "b", from: "adc", to: "bus", label: "8 bits" },
    { id: "c", from: "bus", to: "mcu" },
    { id: "d", from: "ctl", to: "adc", label: "start / done" },
  ];
  return frames(nodes, links, [
    { title: "Analog input", show: ["vin"], highlight: "vin" },
    { title: "Converter", show: ["vin", "adc"], highlight: "adc" },
    { title: "Data bus", show: ["vin", "adc", "bus"], highlight: "bus" },
    { title: "Microcontroller reads", show: ["vin", "adc", "bus", "mcu"], highlight: "mcu" },
    { title: "Control lines", show: ["vin", "adc", "bus", "mcu", "ctl"], highlight: "ctl" },
  ]);
}

// Timer with a prescaler and overflow, the basis of timed events.
export function timerChain(): SchematicData[] {
  const nodes: FlowNode[] = [
    { id: "osc", kind: "terminal", x: 170, y: 60, w: 250, label: "Oscillator (8 MHz / 4)" },
    { id: "pre", kind: "block", x: 170, y: 150, w: 250, label: "Prescaler 1:64" },
    { id: "tmr", kind: "block", x: 170, y: 240, w: 250, label: "TMR0 (16-bit counter)" },
    { id: "ovf", kind: "decision", x: 430, y: 240, w: 180, h: 60, label: "Overflow?" },
    { id: "led", kind: "terminal", x: 430, y: 340, w: 250, label: "Toggle LED on RD0" },
  ];
  const links: FlowLink[] = [
    { id: "a", from: "osc", to: "pre" },
    { id: "b", from: "pre", to: "tmr" },
    { id: "c", from: "tmr", to: "ovf" },
    { id: "d", from: "ovf", to: "led", label: "yes: every 0.5 s" },
  ];
  return frames(nodes, links, [
    { title: "Clock", show: ["osc"], highlight: "osc" },
    { title: "Prescaler", show: ["osc", "pre"], highlight: "pre" },
    { title: "Counter", show: ["osc", "pre", "tmr"], highlight: "tmr" },
    { title: "Overflow event", show: ["osc", "pre", "tmr", "ovf"], highlight: "ovf" },
    { title: "Action", show: ["osc", "pre", "tmr", "ovf", "led"], highlight: "led" },
  ]);
}

// PWM: the CCP output switches fast; the LED sees the average.
export function pwmChain(): SchematicData[] {
  const nodes: FlowNode[] = [
    { id: "ccp", kind: "terminal", x: 170, y: 60, w: 250, label: "CCP1 output (RC2)" },
    { id: "duty", kind: "block", x: 170, y: 150, w: 250, label: "Duty = CCPR1L / 256" },
    { id: "r", kind: "block", x: 170, y: 240, w: 250, label: "330 ohm" },
    { id: "led", kind: "block", x: 170, y: 320, w: 250, label: "LED to GND" },
  ];
  const links: FlowLink[] = [
    { id: "a", from: "ccp", to: "duty" },
    { id: "b", from: "duty", to: "r" },
    { id: "c", from: "r", to: "led" },
  ];
  return frames(nodes, links, [
    { title: "PWM pin", show: ["ccp"], highlight: "ccp" },
    { title: "Duty cycle", show: ["ccp", "duty"], highlight: "duty" },
    { title: "Output resistor", show: ["ccp", "duty", "r"], highlight: "r" },
    { title: "LED", show: ["ccp", "duty", "r", "led"], highlight: "led" },
  ]);
}

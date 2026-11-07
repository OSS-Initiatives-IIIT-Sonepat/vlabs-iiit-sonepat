import { type TheorySection } from "@/labs/lab-content.types";
import { gpioTheoryDiagram } from "@/labs/schematics/semester-04/02-peripheral-interfacing/interface-diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "GPIO (General Purpose Input/Output) pins are configurable digital I/O pins found on microcontrollers (MCUs) such as the Arduino Uno (ATmega328P), STM32, Raspberry Pi Pico, and ESP32. Each pin can be individually configured as a digital output (driving HIGH ≈ Vcc or LOW ≈ 0 V) or a digital input (reading a HIGH or LOW level from an external circuit). Understanding GPIO electrical characteristics is essential before connecting any external components.",
    "When configured as an output, a GPIO pin can source current (supply current from Vcc through the pin to the load) or sink current (draw current from the load into the pin to GND). For a 5 V AVR microcontroller, the maximum source/sink current per pin is typically 40 mA, with a total package limit of 200 mA. Exceeding these limits can permanently damage the GPIO driver. An LED typically requires 10–20 mA; a 330 Ω current-limiting resistor with a 5 V supply limits current to (5 − 2) / 330 ≈ 9 mA — safe for all CMOS GPIO families.",
    "When configured as an input, a GPIO pin has a very high impedance (megaohms). A floating (unconnected) input is unreliable and may read 0 or 1 randomly due to noise pick-up. Switches must always have a pull-up or pull-down resistor to define a definite logic level when the switch is open. A pull-down resistor (10 kΩ) to GND ensures the input reads LOW when the switch is open; pressing the switch connects the input to Vcc, reading HIGH. Conversely, a pull-up resistor (10 kΩ) to Vcc ensures HIGH when open and LOW when pressed.",
    "In a digital logic trainer (used when a microcontroller is not available), fixed-voltage logic inputs can be created with switches connected to Vcc/GND through pull-down/pull-up resistors, and LED outputs use series resistors to limit current. This experiment covers LED output driving and switch input reading — the two most fundamental GPIO operations that form the basis of all microcontroller interfacing.",
    "The figure is the whole interface: one output through 330 Ω into an LED, and one input with a switch to +5 V and a 10 kΩ pull-down. The board builds the three LED channels. The switch stays in the figure, because this board has no push-buttons.",
  ],
  circuitDiagram: gpioTheoryDiagram,
};

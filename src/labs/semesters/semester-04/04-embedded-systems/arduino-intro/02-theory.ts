import { type TheorySection } from "@/labs/lab-content.types";
import { arduinoAnatomyDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "An Arduino is a small board built around a microcontroller: a chip that runs one program again and again. It reads inputs such as buttons and sensors, and drives outputs such as LEDs and motors. The Arduino Uno R3 uses an ATmega328P chip. It is the usual first board for embedded systems because both the hardware and the free Arduino IDE are simple to use.",
    "The Uno has 14 digital pins, D0 to D13, that work as inputs or outputs at 5 V logic. Pins D3, D5, D6, D9, D10 and D11 can also output a PWM signal with analogWrite, which gives a dimmer LED or a slower motor. Six analog pins, A0 to A5, read a voltage between 0 and 5 V. The reading is a 10-bit number from 0 to 1023, so each step is 5 / 1024, about 4.9 mV. Power comes from the USB cable at 5 V, or from VIN at 7 to 12 V. The board also has 5 V and 3V3 pins, and several GND pins that must all be joined to the circuit's ground.",
    "Every sketch has two required functions. setup() runs once when the board powers up, and is used to set each pin with pinMode(). loop() runs again and again for as long as the board is on, and holds the behaviour. The IDE compiles the sketch and uploads it over the USB cable.",
    "The few functions you need at the start are: pinMode(pin, OUTPUT), pinMode(pin, INPUT_PULLUP), digitalWrite(pin, HIGH or LOW), digitalRead(pin), analogRead(A0), analogWrite(pin, 0 to 255), delay(milliseconds), and Serial.begin(9600) with Serial.println(value) to print values on the PC.",
    "Two wiring rules matter in every experiment. An LED must always have a series resistor (220 to 330 ohm) so the current stays near 10 mA and the pin is not damaged. Every part must share one ground (GND) with the board, or the signals have no common reference. The figure shows the cycle of a sketch.",
  ],
  circuitDiagram: arduinoAnatomyDiagrams[2],
};

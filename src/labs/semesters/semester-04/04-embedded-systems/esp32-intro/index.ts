import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import {
  type ConclusionSection,
  type TheorySection,
  type ApparatusSection,
} from "@/labs/lab-content.types";
import { esp32AnatomyDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

const aim: TheorySection = {
  id: "aim",
  type: "text",
  title: "Aim",
  paragraphs: [
    "To learn what an ESP32 is, how its pins and voltage levels differ from the Arduino Uno, and which pins are safe to use.",
  ],
};

const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The ESP32 is a low-cost microcontroller from Espressif. It has two 32-bit processor cores running up to 240 MHz, built-in Wi-Fi and Bluetooth, and far more pins than an Arduino Uno. The ESP32-DevKitC board used here carries an ESP-WROOM-32 module and brings out 38 pins, 19 on each side. Each pin is printed with a short label: S2 is GPIO2, SP and SN are GPIO36 and GPIO39.",
    "The most important difference from the Arduino is the voltage. The ESP32 runs at 3.3 V logic. Its GPIO pins are not 5 V tolerant, so applying 5 V to an input can damage the chip. Power the board from the micro-USB port, which feeds an on-board regulator that outputs 3V3.",
    "Most GPIO pins can be inputs or outputs. Three groups need care. GPIO6 to GPIO11 (the pins marked CLK, SD0 to SD3 and CMD) are wired to the flash memory and must not be used. GPIO34 to GPIO39 are input-only and have no internal pull-up. GPIO0, GPIO2, GPIO12 and GPIO15 affect boot, so avoid loads on them that could hold the wrong level at power-up.",
    "The ESP32 has an internal pull-up on most GPIO pins, so pinMode(pin, INPUT_PULLUP) works as on the Arduino. It has a 12-bit ADC, which returns values from 0 to 4095, and its PWM is built into the LEDC peripheral. In the current Arduino core, ledcAttach(pin, frequency, resolution) sets up a PWM output, and ledcWrite(pin, duty) sets the duty cycle.",
    "Programming uses the same Arduino IDE, after installing the esp32 board package from Espressif. The sketch structure, setup() and loop(), is the same as the Arduino. The figure shows that structure for the ESP32.",
  ],
  circuitDiagram: esp32AnatomyDiagrams[2],
};

const sketch: TheorySection = {
  id: "first-sketch",
  type: "text",
  title: "Your first ESP32 sketch",
  paragraphs: [
    "The same structure as the Arduino, with the ESP32 pin numbers. Wire an LED and resistor to GPIO2 (marked S2) to see it blink.",
    "void setup() {",
    "  pinMode(2, OUTPUT);   // GPIO2",
    "}",
    "void loop() {",
    "  digitalWrite(2, HIGH);",
    "  delay(500);",
    "  digitalWrite(2, LOW);",
    "  delay(500);",
    "}",
  ],
};

const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "ESP32-DevKitC",
      specification: "ESP-WROOM-32, 38 pins, 3.3 V logic",
      quantity: "1",
    },
    {
      name: "Micro-USB cable",
      specification: "Data-capable cable",
      quantity: "1",
    },
    { name: "Arduino IDE 2.x with esp32 board package", quantity: "1" },
  ],
};

const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The ESP32 uses the same programming model as the Arduino, but at 3.3 V, with more pins, Wi-Fi and Bluetooth, and a few pins to avoid. The next three experiments use it for an output, an input and PWM.",
  ],
};

export const esp32IntroExperiment: ExperimentDefinition = {
  id: "esp32-intro",
  title: "Introduction to ESP32",
  description:
    "What the ESP32 DevKit is, why its logic is 3.3 V, which GPIO pins are safe to use, and how its sketch differs from the Arduino.",
  components: [],
  sections: [aim, theory, sketch, apparatus, conclusion],
  procedureSteps: [],
  labType: "text",
};

export const Esp32IntroCircuit = buildCircuit(esp32IntroExperiment);
export const Esp32IntroContent = buildLabContent(esp32IntroExperiment);

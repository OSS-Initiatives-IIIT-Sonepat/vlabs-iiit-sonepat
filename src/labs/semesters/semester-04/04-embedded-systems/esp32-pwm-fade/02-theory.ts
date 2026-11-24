import { type TheorySection } from "@/labs/lab-content.types";
import { esp32PwmDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A digital output is either fully on or fully off. PWM, pulse-width modulation, switches the pin on and off very fast. The average voltage is the duty cycle times 3.3 V. At 50 % duty the LED looks half as bright, because the eye averages the fast flicker.",
    "The ESP32 has a LEDC peripheral that generates PWM in hardware, so the processor does not need to time the pulses. In the current Arduino core, ledcAttach(pin, frequency, resolution) sets the pin, the frequency in hertz, and the resolution in bits. With 8 bits, ledcWrite(pin, duty) takes 0 (always off) to 255 (always on).",
    "The frequency should be well above the flicker threshold, which is why 5 kHz is used here. The duty values used in this experiment are 64, 128 and 255, which are 25 %, 50 % and 100 % of 255.",
  ],
  circuitDiagram: esp32PwmDiagrams[3],
};

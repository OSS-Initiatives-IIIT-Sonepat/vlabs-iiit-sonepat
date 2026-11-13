import { type TheorySection } from "@/labs/lab-content.types";
import { pwmChain } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Pulse-width modulation switches a digital pin on and off at a fixed frequency. The fraction of each period that the pin is high is the duty cycle. The average voltage is the duty cycle times the supply, so the LED looks dimmer at a lower duty cycle.",
    "On the PIC18 the CCP (capture/compare/PWM) module makes the waveform in hardware. Timer2 sets the period through PR2: the PWM period is (PR2 + 1) timer counts. The duty cycle uses the 8 high bits in CCPR1L, so duty = CCPR1L / (PR2 + 1). With PR2 = 255, CCPR1L = 64 gives 25 %, 128 gives 50 % and 255 gives almost 100 %.",
    "The CCP1 output is on RC2, and its TRIS bit must be an output. The PWM mode is selected in CCP1CON with the low nibble 1100.",
  ],
  circuitDiagram: pwmChain()[3],
};

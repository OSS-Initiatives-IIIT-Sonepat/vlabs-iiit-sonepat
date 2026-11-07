import { type TheorySection } from "@/labs/lab-content.types";
import { adcDacTheoryDiagram } from "@/labs/schematics/semester-04/02-peripheral-interfacing/interface-diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "An Analog-to-Digital Converter (ADC) samples a continuous analog voltage and converts it into a discrete binary number. The resolution of an n-bit ADC is 1/2ⁿ of the full-scale range (FSR). For an 8-bit ADC (e.g., ADC0804) with a 5 V reference, the Least Significant Bit (LSB) corresponds to 5/256 ≈ 19.5 mV — the smallest distinguishable voltage step. The digital output D = round(V_in / LSB) for an ideal ADC. Key specifications include: resolution (bits), conversion time, input voltage range, and reference voltage.",
    "The ADC0804 is an 8-bit successive-approximation ADC in a DIP-20 package. It operates from 5 V, accepts a 0–5 V single-ended input, and requires a clock (RC oscillator formed by an external resistor and capacitor on pins CLK IN/CLK R — typically R=10 kΩ, C=100 pF for ≈ 640 kHz). The /WR pin initiates a conversion when pulsed LOW; the /RD pin enables the output data bus; INTR goes LOW when conversion is complete (indicating new data is ready). The 8 output bits (D0–D7) represent the digital equivalent of the analog input.",
    "A Digital-to-Analog Converter (DAC) performs the reverse: it converts an n-bit digital code to a proportional analog voltage. The R-2R ladder network is a passive DAC that requires only two resistor values (R and 2R) in a ladder structure. For a 4-bit R-2R DAC with a reference voltage Vref = 5 V: V_out = Vref × (D3/2 + D2/4 + D1/8 + D0/16), where D3 is the MSB. The output voltage steps are Vref/2ⁿ = 5/16 ≈ 312.5 mV per LSB for a 4-bit DAC.",
    "Together, ADC and DAC are the bridge between the analog physical world and the digital processing domain. They appear in every data acquisition system, audio codec, motor controller, and sensor interface. This experiment covers the complete ADC–DAC signal chain: an analog voltage from a potentiometer is digitised by the ADC0804, the 8-bit result is displayed on LEDs, and independently, a 4-bit R-2R DAC reconstructs an analog voltage from a 4-bit switch input.",
    "The figure shows both halves. On the left, a potentiometer feeds an ADC0804 and the chip returns an 8-bit code. On the right, a 4-bit code feeds an R-2R ladder and the ladder returns a voltage, Vout = Vref × code / 16. The board builds that ladder with 1 kΩ and 2 kΩ resistors and lights an LED from its output.",
  ],
  circuitDiagram: adcDacTheoryDiagram,
};

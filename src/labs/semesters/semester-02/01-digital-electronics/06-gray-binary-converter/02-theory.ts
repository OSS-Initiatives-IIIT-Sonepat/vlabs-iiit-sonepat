import { type TheorySection } from "@/labs/lab-content.types";
import { s2GrayBinaryConverterTheoryDiagram } from "@/labs/schematics/semester-02/01-digital-electronics/06-gray-binary-converter";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Gray code, also known as Reflected Binary Code (RBC), is an unweighted, non-arithmetic binary numeral system in which two successive values differ by exactly one bit. This fundamental property — known as the unit-distance or minimum change property — makes Gray code indispensable in digital shaft encoders, high-speed analog-to-digital converters (ADCs), and telecommunication systems, where multi-bit switching glitches could otherwise produce catastrophic transitional read errors.",
    "Binary-to-Gray code conversion is implemented using two-input XOR gates according to the Boolean relationships: the most significant bit (MSB) passes through directly, G₃ = B₃, while each subsequent Gray bit is obtained by XORing adjacent binary bits: G₂ = B₃ ⊕ B₂, G₁ = B₂ ⊕ B₁, and G₀ = B₁ ⊕ B₀. For a 4-bit converter, exactly three 2-input XOR gates are required.",
    "Gray-to-Binary code conversion is the complementary reverse operation. The binary MSB is identical to the Gray MSB, B₃ = G₃. Each subsequent binary bit is obtained by cascading the previously calculated binary bit with the corresponding Gray input bit: B₂ = B₃ ⊕ G₂, B₁ = B₂ ⊕ G₁, and B₀ = B₁ ⊕ G₀. This can be synthesized using three cascaded XOR gates.",
    "The physical realization utilizes the standard 74HC86 Quad 2-Input XOR Gate CMOS IC operating from a regulated +5 V DC power supply. Output logic states are monitored via four color-coded LED indicators (G₃ = Red, G₂ = Yellow, G₁ = Green, G₀ = Blue) in series with 330 Ω current-limiting resistors to verify logic levels safely.",
  ],
  circuitDiagram: s2GrayBinaryConverterTheoryDiagram,
};

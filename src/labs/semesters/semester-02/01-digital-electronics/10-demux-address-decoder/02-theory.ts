import { type TheorySection } from "@/labs/lab-content.types";
import { s2DemuxAddressDecoderTheoryDiagram } from "@/labs/schematics/s2-demux-address-decoder-schematics";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A Demultiplexer (DEMUX) with its enable input (I) permanently asserted functions as a binary decoder. When I = 1 (always-enabled), the DEMUX outputs Y0 = I·S' = S' and Y1 = I·S = S. The outputs are the minterms of the address (select) variable S, which is exactly the behaviour of a 1:2 decoder. By extension, a 1:2ⁿ DEMUX can implement an n:2ⁿ decoder by setting the data input permanently HIGH.",
    "Address decoding is a fundamental task in computer memory systems. A CPU drives an address bus; the high-order address bits must be decoded to assert a chip-select (CS) signal for one specific peripheral device while all other devices remain deselected. The DEMUX-as-decoder topology is attractive because it simultaneously provides the active-LOW chip-select signals (Y0' and Y1' for an active-low decoder) for two devices using a minimal gate count.",
    "In an active-low address decoder (using 74HC139 or 74HC138), the deselected outputs are HIGH and the selected output is LOW. Peripheral chips typically have active-low CS inputs — they are enabled when CS = 0. This matches the active-low decoder output natively. In our experiment, the active-high 1:2 DEMUX (Y0 = S', Y1 = S with I=1) selects Y0 when S=0 and Y1 when S=1, acting as an address decoder that asserts only one output HIGH at a time.",
    "Practical considerations: address decoder propagation delay must be shorter than the memory's access time minus the CPU hold time. Fan-out must be checked — a single 74HC gate can drive 10 LSTTL loads or up to 50 similar CMOS inputs. For systems requiring more than two devices, a 1:4 or 1:8 DEMUX (or equivalently a 2:4 or 3:8 decoder like the 74HC138) is used, with the additional address lines feeding the select inputs.",
  ],
  circuitDiagram: s2DemuxAddressDecoderTheoryDiagram,
};

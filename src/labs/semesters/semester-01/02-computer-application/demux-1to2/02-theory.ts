import { type TheorySection } from "@/labs/lab-content.types";
import { demux1to2TheoryDiagram } from "@/labs/schematics/demux-1to2-schematics";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A Demultiplexer (DEMUX) is the functional inverse of a multiplexer. It takes a single input data line (I) and routes it to one of several output lines selected by the select (address) inputs. A 1:2 DEMUX has one data input (I), one select input (S), and two outputs (Y0 and Y1). When S = 0, the input I is routed to Y0; when S = 1, the input I is routed to Y1. The deselected output is always 0.",
    "The Boolean expressions for a 1:2 DEMUX are: Y0 = I · S' (input I is passed to Y0 only when S=0) and Y1 = I · S (input I is passed to Y1 only when S=1). These two product terms require only two AND gates and one NOT gate — no OR gate is needed since the outputs are fully independent. The total gate count is minimal: 1× NOT (74HC04) and 2× AND (74HC08, using two of the four gates in the package).",
    "DEMUX circuits are used in digital systems for data distribution (one transmitter to multiple receivers), address decoding (selecting one of N memory banks), time-division demultiplexing (reconstructing parallel data from a serial stream), and display driving (sequentially addressing rows or columns of a multiplexed display matrix).",
    "The 1:2 DEMUX is the smallest DEMUX and serves as the primitive cell from which larger N:2ⁿ DEMUXes are built. A 1:4 DEMUX can be constructed from three 1:2 DEMUXes (one at the first level, two at the second level) in a binary tree arrangement. Note that many commercial DEMUX ICs (e.g., 74HC138, 74HC139) include an enable input for additional flexibility.",
  ],
  circuitDiagram: demux1to2TheoryDiagram,
};

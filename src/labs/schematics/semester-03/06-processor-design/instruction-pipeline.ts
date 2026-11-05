import { block, frames } from "../diagram";

function stages(on: boolean[]) {
  const names = ["IF", "ID", "EX", "WB"];
  return names.map((name, i) =>
    block(name.toLowerCase(), 110 + i * 140, 120, 100, 48, name, on[i]),
  );
}

export const instructionPipelineStepSchematics = frames([
  {
    title: "Clock 1: I1 is fetched",
    elements: stages([true, false, false, false]),
    notes: ["Only IF is lit. I1 has just entered the pipe."],
  },
  {
    title: "Clock 2: I1 decoded, I2 fetched",
    elements: stages([true, true, false, false]),
    notes: ["Two instructions are in the pipe at once."],
  },
  {
    title: "Clock 3: the pipe holds I3, I2, I1",
    elements: stages([true, true, true, false]),
    notes: ["IF has I3, ID has I2, EX has I1."],
  },
  {
    title: "Clock 4: I1 writes back",
    elements: stages([false, true, true, true]),
    notes: ["I1 has reached WB. No new instruction was fetched."],
  },
  {
    title: "Clock 5: I2 writes back",
    elements: stages([false, false, true, true]),
    notes: ["I2 is in WB and I3 is in EX. IF and ID are empty."],
  },
  {
    title: "Clock 6: I3 writes back",
    elements: stages([false, false, false, true]),
    notes: ["The three-instruction sequence has left the pipe."],
  },
  {
    title: "A branch empties the pipe",
    elements: stages([false, false, false, false]),
    notes: ["Instructions fetched after the branch are discarded. The lamps go dark."],
  },
  {
    title: "An arithmetic pipeline adds two normalised floats",
    elements: [
      block("x", 160, 80, 220, 40, "X = 0.9504 × 10²"),
      block("y", 480, 80, 220, 40, "Y = 0.8200 × 10²"),
      block("sum", 320, 170, 280, 48, "1.7704 → 0.1770 × 10³", true),
    ],
    notes: ["Add the mantissas, then shift until the leading digit is not zero."],
  },
  {
    title: "Flynn's four classes",
    height: 300,
    elements: [
      block("sisd", 160, 80, 200, 40, "SISD"),
      block("simd", 460, 80, 200, 40, "SIMD"),
      block("misd", 160, 150, 200, 40, "MISD"),
      block("mimd", 460, 150, 200, 40, "MIMD"),
    ],
    notes: ["One or many instruction streams, over one or many data streams."],
  },
  {
    title: "Two CPUs, one memory",
    elements: [
      block("c0", 140, 120, 100, 44, "CPU 0", true),
      block("ram", 320, 120, 100, 44, "RAM"),
      block("c1", 500, 120, 100, 44, "CPU 1"),
    ],
    notes: ["Only one CPU's address wires are shown. The other waits for the bus."],
  },
  {
    title: "A crossbar",
    elements: [
      block("c0", 140, 70, 90, 36, "CPU 0"),
      block("c1", 140, 130, 90, 36, "CPU 1"),
      block("m0", 460, 70, 90, 36, "M0"),
      block("m1", 460, 130, 90, 36, "M1"),
    ],
    notes: ["Each CPU can be connected to each memory. This frame is the switch, not another board."],
  },
  {
    title: "IF, ID, EX, WB",
    elements: stages([false, false, false, false]),
    notes: ["Four stages. A lamp will light when that stage holds an instruction."],
  },
]);

export const instructionPipelineTheoryDiagram = instructionPipelineStepSchematics[2];

/**
 * Migrate all remaining legacy labs into the semester tree and regenerate catalog.ts.
 * Run: npx tsx scripts/migrate-all-legacy.ts
 */
import fs from "node:fs";
import path from "node:path";

import { migrateContentOnly, migrateOne } from "./migrate-to-semester";

import { ZenerVoltageRegulatorCircuit } from "../src/labs/circuits/zener-voltage-regulator";
import { CeAmplifierCircuit } from "../src/labs/circuits/ce-amplifier";
import { HalfAdderRevisitCircuit } from "../src/labs/circuits/half-adder-revisit";
import { FullAdderRippleCircuit } from "../src/labs/circuits/full-adder-ripple";
import { GpioInterfacingCircuit } from "../src/labs/circuits/gpio-interfacing";
import { SevenSegmentDisplayCircuit } from "../src/labs/circuits/seven-segment-display";
import { AdcDacCircuit } from "../src/labs/circuits/adc-dac";
import { CbAmplifierCircuit } from "../src/labs/circuits/cb-amplifier";
import { CbTransistorCharacteristicsCircuit } from "../src/labs/circuits/cb-transistor-characteristics";
import { BjtBiasCircuit } from "../src/labs/circuits/bjt-bias";
import { MosfetCharacteristicsCircuit } from "../src/labs/circuits/mosfet-characteristics";
import { OpampCircuitsCircuit } from "../src/labs/circuits/opamp-circuits";
import { BcdXs3Converter } from "../src/labs/circuits/bcd-xs3-converter";
import { GrayBinaryConverter } from "../src/labs/circuits/gray-binary-converter";
import { Mux4to1IC } from "../src/labs/circuits/mux-4to1-ic";
import { Demux1to4IC } from "../src/labs/circuits/demux-1to4-ic";
import { BinaryAdder4bit } from "../src/labs/circuits/binary-adder-4bit";
import { BinarySubtractor4bit } from "../src/labs/circuits/binary-subtractor-4bit";
import { SRLatchCircuit } from "../src/labs/circuits/sr-latch";
import { DFlipFlopCircuit } from "../src/labs/circuits/d-flip-flop";
import { JkAndTFlipFlopCircuit } from "../src/labs/circuits/jk-t-flip-flop";
import { Mod5CounterCircuit } from "../src/labs/circuits/mod5-counter";
import { ParityChecker } from "../src/labs/circuits/parity-checker";
import { DigitalComparator } from "../src/labs/circuits/digital-comparator";
import { ShiftRegister } from "../src/labs/circuits/shift-register";

import { ZenerVoltageRegulatorContent } from "../src/labs/content/zener-voltage-regulator";
import { CeAmplifierContent } from "../src/labs/content/ce-amplifier";
import { HalfAdderRevisitContent } from "../src/labs/content/half-adder-revisit";
import { FullAdderRippleContent } from "../src/labs/content/full-adder-ripple";
import { GpioInterfacingContent } from "../src/labs/content/gpio-interfacing";
import { SevenSegmentDisplayContent } from "../src/labs/content/seven-segment-display";
import { AdcDacContent } from "../src/labs/content/adc-dac";
import { CbAmplifierContent } from "../src/labs/content/cb-amplifier";
import { CbTransistorCharacteristicsContent } from "../src/labs/circuits/cb-transistor-characteristics";
import { BjtBiasContent } from "../src/labs/content/bjt-bias";
import { MosfetCharacteristicsContent } from "../src/labs/content/mosfet-characteristics";
import { OpampCircuitsContent } from "../src/labs/content/opamp-circuits";
import { BcdXs3ConverterContent } from "../src/labs/content/bcd-xs3-converter";
import { GrayBinaryConverterContent } from "../src/labs/content/gray-binary-converter";
import { Mux4to1ICContent } from "../src/labs/content/mux-4to1-ic";
import { Demux1to4ICContent } from "../src/labs/content/demux-1to4-ic";
import { BinaryAdder4bitContent } from "../src/labs/content/binary-adder-4bit";
import { BinarySubtractor4bitContent } from "../src/labs/content/binary-subtractor-4bit";
import { DigitalComparatorContent } from "../src/labs/content/digital-comparator";
import { ParityCheckerContent } from "../src/labs/content/parity-checker";
import { ShiftRegisterContent } from "../src/labs/content/shift-register";
import { GateLevelMinimizationContent } from "../src/labs/content/gate-level-minimization";
import { ClaAdderContent } from "../src/labs/content/cla-adder";
import { WallaceTreeContent } from "../src/labs/content/wallace-tree";
import { CombinationalMultipliersContent } from "../src/labs/content/combinational-multipliers";
import { BoothsMultiplierContent } from "../src/labs/content/booths-multiplier";
import { RegistersCountersTheoryContent } from "../src/labs/content/registers-counters-theory";
import { IntroGatesReviewContent } from "../src/labs/content/intro-gates-review";
import { CExpressionsContent } from "../src/labs/content/c-expressions";
import { CFileOperations1Content } from "../src/labs/content/c-file-operations-1";
import { CFileOperations2Content } from "../src/labs/content/c-file-operations-2";
import { SrLatchContent } from "../src/labs/content/sr-latch";
import { DFlipFlopContent } from "../src/labs/content/d-flip-flop";
import { JkTFlipFlopContent } from "../src/labs/content/jk-t-flip-flop";
import { Mod5CounterContent } from "../src/labs/content/mod5-counter";
import { Exp8085AddSub8bitContent } from "../src/labs/content/8085-add-sub-8bit";
import { Exp8085AddSubCarryContent } from "../src/labs/content/8085-add-sub-carry";
import { Exp8085BcdAdditionContent } from "../src/labs/content/8085-bcd-addition";
import { Exp8085Multiply8bitContent } from "../src/labs/content/8085-multiply-8bit";
import { Exp8085Divide8bitContent } from "../src/labs/content/8085-divide-8bit";
import { Exp8085ArraySumContent } from "../src/labs/content/8085-array-sum";
import { Exp8085ArraySquareContent } from "../src/labs/content/8085-array-square";
import { Exp8085MinMaxContent } from "../src/labs/content/8085-min-max";
import { Exp8085BubbleSortContent } from "../src/labs/content/8085-bubble-sort";
import { Exp8085BcdBinaryConvContent } from "../src/labs/content/8085-bcd-binary-conv";
import { Exp8085SqrtContent } from "../src/labs/content/8085-sqrt";
import { aluSimulation } from "../src/labs/content/alu-simulation";
import { memoryDesign } from "../src/labs/content/memory-design";
import { cacheDirectMapped } from "../src/labs/content/cache-direct-mapped";
import { cacheAssociative } from "../src/labs/content/cache-associative";
import { cpuDesign } from "../src/labs/content/cpu-design";

type SubjectDef = {
  semesterId: string;
  semesterLabel: string;
  subjectId: string;
  subjectLabel: string;
  subjectDescription: string;
  defaultCircuitId: string;
  experiments: readonly {
    id: string;
    importPath: string;
    expName: string;
    circuitName: string;
    contentName: string;
    tags: readonly string[];
    labType?: "breadboard" | "text" | "code" | "simulation";
  }[];
};

function camelExperiment(id: string): string {
  let name =
    id.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase()) +
    "Experiment";
  if (/^[0-9]/.test(name))
    name = `exp${name.charAt(0).toUpperCase()}${name.slice(1)}`;
  return name;
}

function pascalExport(id: string, suffix: "Circuit" | "Content"): string {
  let name =
    id
      .split("-")
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join("") + suffix;
  if (/^[0-9]/.test(name))
    name = `Exp${name.charAt(0).toUpperCase()}${name.slice(1)}`;
  return name;
}

const SUBJECTS: SubjectDef[] = [
  {
    semesterId: "semester-01",
    semesterLabel: "Semester 1",
    subjectId: "01-analog-electronics",
    subjectLabel: "Analog Electronics",
    subjectDescription:
      "Study passive and active components, diode characteristics, rectifiers, and DC network theorems. " +
      "Build and test circuits on a breadboard using multimeters and power supplies.",
    defaultCircuitId: "study-basic-components",
    experiments: [
      {
        id: "study-basic-components",
        importPath:
          "./semester-01/01-analog-electronics/study-basic-components",
        expName: "studyBasicComponentsExperiment",
        circuitName: "StudyBasicComponentsCircuit",
        contentName: "StudyBasicComponentsContent",
        tags: [
          "components",
          "instruments",
          "breadboard",
          "multimeter",
          "oscilloscope",
        ],
      },
      {
        id: "pn-junction-diode",
        importPath: "./semester-01/01-analog-electronics/pn-junction-diode",
        expName: "pnJunctionDiodeExperiment",
        circuitName: "PnJunctionDiodeCircuit",
        contentName: "PnJunctionDiodeContent",
        tags: [
          "diode",
          "pn junction",
          "forward bias",
          "reverse bias",
          "characteristics",
        ],
      },
      {
        id: "zener-diode",
        importPath: "./semester-01/01-analog-electronics/zener-diode",
        expName: "zenerDiodeExperiment",
        circuitName: "ZenerDiodeCircuit",
        contentName: "ZenerDiodeContent",
        tags: ["zener", "diode", "breakdown", "characteristics"],
      },
      {
        id: "half-wave-rectifier",
        importPath: "./semester-01/01-analog-electronics/half-wave-rectifier",
        expName: "halfWaveRectifierExperiment",
        circuitName: "HalfWaveRectifierCircuit",
        contentName: "HalfWaveRectifierContent",
        tags: ["rectifier", "diode", "half-wave", "ripple"],
      },
      {
        id: "full-wave-rectifier",
        importPath: "./semester-01/01-analog-electronics/full-wave-rectifier",
        expName: "fullWaveRectifierExperiment",
        circuitName: "FullWaveRectifierCircuit",
        contentName: "FullWaveRectifierContent",
        tags: ["rectifier", "bridge", "full-wave", "ripple"],
      },
      {
        id: "rectifiers-capacitor-filters",
        importPath:
          "./semester-01/01-analog-electronics/rectifiers-capacitor-filters",
        expName: "rectifiersCapacitorFiltersExperiment",
        circuitName: "RectifiersCapacitorFiltersCircuit",
        contentName: "RectifiersCapacitorFiltersContent",
        tags: ["rectifier", "filter", "capacitor", "ripple reduction"],
      },
      {
        id: "ohms-law",
        importPath: "./semester-01/01-analog-electronics/ohms-law",
        expName: "ohmsLawExperiment",
        circuitName: "OhmsLawCircuit",
        contentName: "OhmsLawContent",
        tags: ["ohm", "resistance", "voltage", "current", "v-i graph"],
      },
      {
        id: "kirchhoff-laws",
        importPath: "./semester-01/01-analog-electronics/kirchhoff-laws",
        expName: "kirchhoffLawsExperiment",
        circuitName: "KirchhoffLawsCircuit",
        contentName: "KirchhoffLawsContent",
        tags: ["kirchhoff", "kcl", "kvl", "dc circuit", "nodes", "loops"],
      },
      {
        id: "superposition-theorem",
        importPath: "./semester-01/01-analog-electronics/superposition-theorem",
        expName: "superpositionTheoremExperiment",
        circuitName: "SuperpositionTheoremCircuit",
        contentName: "SuperpositionTheoremContent",
        tags: [
          "superposition",
          "linear circuit",
          "multiple sources",
          "dc network",
        ],
      },
      {
        id: "thevenin-theorem",
        importPath: "./semester-01/01-analog-electronics/thevenin-theorem",
        expName: "theveninTheoremExperiment",
        circuitName: "TheveninTheoremCircuit",
        contentName: "TheveninTheoremContent",
        tags: ["thevenin", "equivalent circuit", "V_th", "R_th"],
      },
      {
        id: "norton-theorem",
        importPath: "./semester-01/01-analog-electronics/norton-theorem",
        expName: "nortonTheoremExperiment",
        circuitName: "NortonTheoremCircuit",
        contentName: "NortonTheoremContent",
        tags: [
          "norton",
          "equivalent circuit",
          "short circuit current",
          "source transformation",
        ],
      },
    ],
  },
  {
    semesterId: "semester-01",
    semesterLabel: "Semester 1",
    subjectId: "02-computer-application",
    subjectLabel: "Computer Application",
    subjectDescription:
      "Implement and verify combinational logic circuits on a breadboard using 74HC-series ICs. " +
      "Cover basic gates, adders, subtractors, multiplexers, and demultiplexers.",
    defaultCircuitId: "logic-gates",
    experiments: [
      {
        id: "logic-gates",
        importPath: "./semester-01/02-computer-application/logic-gates",
        expName: "logicGatesExperiment",
        circuitName: "LogicGatesCircuit",
        contentName: "LogicGatesContent",
        tags: ["logic gates", "and", "or", "not", "nand", "nor", "xor", "74hc"],
      },
      {
        id: "half-adder",
        importPath: "./semester-01/02-computer-application/half-adder",
        expName: "halfAdderExperiment",
        circuitName: "HalfAdderCircuit",
        contentName: "HalfAdderContent",
        tags: ["adder", "xor", "and", "sum", "carry", "combinational logic"],
      },
      {
        id: "full-adder",
        importPath: "./semester-01/02-computer-application/full-adder",
        expName: "fullAdderExperiment",
        circuitName: "FullAdderCircuit",
        contentName: "FullAdderContent",
        tags: ["adder", "carry-in", "sum", "carry-out", "combinational logic"],
      },
      {
        id: "half-subtractor",
        importPath: "./semester-01/02-computer-application/half-subtractor",
        expName: "halfSubtractorExperiment",
        circuitName: "HalfSubtractorCircuit",
        contentName: "HalfSubtractorContent",
        tags: ["subtractor", "difference", "borrow", "xor", "not", "and"],
      },
      {
        id: "full-subtractor",
        importPath: "./semester-01/02-computer-application/full-subtractor",
        expName: "fullSubtractorExperiment",
        circuitName: "FullSubtractorCircuit",
        contentName: "FullSubtractorContent",
        tags: [
          "subtractor",
          "borrow-in",
          "difference",
          "borrow-out",
          "multi-bit",
        ],
      },
      {
        id: "mux-2to1",
        importPath: "./semester-01/02-computer-application/mux-2to1",
        expName: "mux2to1Experiment",
        circuitName: "Mux2to1Circuit",
        contentName: "Mux2to1Content",
        tags: [
          "mux",
          "multiplexer",
          "selector",
          "data routing",
          "not",
          "and",
          "or",
        ],
      },
      {
        id: "demux-1to2",
        importPath: "./semester-01/02-computer-application/demux-1to2",
        expName: "demux1to2Experiment",
        circuitName: "Demux1to2Circuit",
        contentName: "Demux1to2Content",
        tags: ["demux", "demultiplexer", "address decoding", "not", "and"],
      },
    ],
  },
  {
    semesterId: "semester-01",
    semesterLabel: "Semester 1",
    subjectId: "03-analog-electronics-advanced",
    subjectLabel: "Analog Electronics (Advanced)",
    subjectDescription:
      "Amplifier stages, device characteristics, and regulator circuits. " +
      "Build and characterise BJT, MOSFET, and op-amp circuits on a breadboard.",
    defaultCircuitId: "zener-voltage-regulator",
    experiments: [], // filled after migration
  },
  {
    semesterId: "semester-2",
    semesterLabel: "Semester 2",
    subjectId: "01-digital-electronics",
    subjectLabel: "Digital Electronics",
    subjectDescription:
      "Implement encoders, decoders, and MUX/DEMUX-based logic on a breadboard. " +
      "Explore Boolean minimisation and address decoding used in memory systems.",
    defaultCircuitId: "encoder-4to2",
    experiments: [
      {
        id: "encoder-4to2",
        importPath: "./semester-02/01-digital-electronics/encoder-4to2",
        expName: "encoder4to2Experiment",
        circuitName: "Encoder4to2Circuit",
        contentName: "Encoder4to2Content",
        tags: ["encoder", "priority", "binary code", "or gate", "74hc32"],
      },
      {
        id: "decoder-2to4",
        importPath: "./semester-02/01-digital-electronics/decoder-2to4",
        expName: "decoder2to4Experiment",
        circuitName: "Decoder2to4Circuit",
        contentName: "Decoder2to4Content",
        tags: [
          "decoder",
          "binary",
          "address decode",
          "not",
          "and",
          "74hc04",
          "74hc08",
        ],
      },
      {
        id: "mux-based-logic",
        importPath: "./semester-02/01-digital-electronics/mux-based-logic",
        expName: "muxBasedLogicExperiment",
        circuitName: "MuxBasedLogicCircuit",
        contentName: "MuxBasedLogicContent",
        tags: ["mux", "lut", "fpga", "boolean function", "universal gate"],
      },
      {
        id: "demux-address-decoder",
        importPath:
          "./semester-02/01-digital-electronics/demux-address-decoder",
        expName: "demuxAddressDecoderExperiment",
        circuitName: "DemuxAddressDecoderCircuit",
        contentName: "DemuxAddressDecoderContent",
        tags: [
          "demux",
          "address decoder",
          "bus",
          "peripheral select",
          "active-low",
        ],
      },
    ],
  },
  {
    semesterId: "semester-2",
    semesterLabel: "Semester 2",
    subjectId: "02-advanced-adders",
    subjectLabel: "Advanced Adder Circuits",
    subjectDescription:
      "Revisit the half adder with focus on propagation delay and timing, then extend to a 4-bit ripple-carry adder.",
    defaultCircuitId: "half-adder-revisit",
    experiments: [],
  },
  {
    semesterId: "semester-2",
    semesterLabel: "Semester 2",
    subjectId: "03-combinational-logic",
    subjectLabel: "Combinational Logic",
    subjectDescription:
      "Extend combinational design to code converters, larger multiplexers/demultiplexers, and multi-bit adder/subtractor ICs.",
    defaultCircuitId: "bcd-xs3-converter",
    experiments: [],
  },
  {
    semesterId: "semester-2",
    semesterLabel: "Semester 2",
    subjectId: "04-sequential-logic",
    subjectLabel: "Sequential Logic",
    subjectDescription:
      "Build and characterise latches, flip-flops, and counters using 74HC-series ICs.",
    defaultCircuitId: "sr-latch",
    experiments: [],
  },
  {
    semesterId: "semester-2",
    semesterLabel: "Semester 2",
    subjectId: "05-digital-logic-design",
    subjectLabel: "Digital Logic Design",
    subjectDescription:
      "Apply systematic minimisation techniques, parity logic, magnitude comparison, and shift registers.",
    defaultCircuitId: "gate-level-minimization",
    experiments: [],
  },
  {
    semesterId: "semester-3",
    semesterLabel: "Semester 3",
    subjectId: "01-combinational-arithmetic",
    subjectLabel: "Combinational Arithmetic",
    subjectDescription:
      "Advance from basic gates to multi-bit adders, carry-lookahead logic, and high-speed multiplier architectures.",
    defaultCircuitId: "full-adder-ripple",
    experiments: [],
  },
  {
    semesterId: "semester-3",
    semesterLabel: "Semester 3",
    subjectId: "02-memory-cpu-systems",
    subjectLabel: "Memory & CPU Systems",
    subjectDescription:
      "Explore ALU design, memory organisation, cache hierarchies, and the fetch-decode-execute cycle.",
    defaultCircuitId: "alu-simulation",
    experiments: [],
  },
  {
    semesterId: "semester-3",
    semesterLabel: "Semester 3",
    subjectId: "03-programming-fundamentals",
    subjectLabel: "Programming Fundamentals",
    subjectDescription:
      "Write and execute C programs covering mathematical expressions and file I/O.",
    defaultCircuitId: "c-expressions",
    experiments: [],
  },
  {
    semesterId: "semester-4",
    semesterLabel: "Semester 4",
    subjectId: "01-8085-assembly-programming",
    subjectLabel: "8085 Assembly Programming",
    subjectDescription:
      "Write and simulate Intel 8085 assembly programs covering arithmetic, sorting, and data conversion.",
    defaultCircuitId: "8085-add-sub-8bit",
    experiments: [],
  },
  {
    semesterId: "semester-4",
    semesterLabel: "Semester 4",
    subjectId: "02-peripheral-interfacing",
    subjectLabel: "Peripheral Interfacing",
    subjectDescription:
      "Interface digital I/O, display, and analog conversion peripherals with a microcontroller.",
    defaultCircuitId: "gpio-interfacing",
    experiments: [],
  },
];

function registerMigrated(
  subjectId: string,
  id: string,
  subjectPath: string,
  tags: readonly string[],
  labType?: "breadboard" | "text" | "code" | "simulation",
) {
  const subject = SUBJECTS.find((s) => s.subjectId === subjectId);
  if (!subject) throw new Error(`Unknown subject ${subjectId}`);
  const importPath = subjectPath.endsWith(`/${id}`)
    ? `./${subjectPath}`
    : `./${subjectPath}/${id}`;
  const entry = {
    id,
    importPath,
    expName: camelExperiment(id),
    circuitName: pascalExport(id, "Circuit"),
    contentName: pascalExport(id, "Content"),
    tags,
    labType,
  };
  const idx = subject.experiments.findIndex((e) => e.id === id);
  if (idx >= 0) subject.experiments[idx] = entry;
  else subject.experiments.push(entry);
}

console.log("Migrating legacy circuit + content pairs...\n");

function runCircuitMigration(
  subjectId: string,
  subjectPath: string,
  circuit: Parameters<typeof migrateOne>[0]["circuit"],
  content: Parameters<typeof migrateOne>[0]["content"],
  tags: readonly string[],
) {
  const result = migrateOne({ circuit, content, tags, subjectPath });
  registerMigrated(subjectId, result.id, subjectPath, tags, result.labType);
}

runCircuitMigration(
  "03-analog-electronics-advanced",
  "semester-01/03-analog-electronics-advanced",
  ZenerVoltageRegulatorCircuit,
  ZenerVoltageRegulatorContent,
  ["zener", "voltage regulator", "line regulation", "load regulation"],
);
runCircuitMigration(
  "03-analog-electronics-advanced",
  "semester-01/03-analog-electronics-advanced",
  CeAmplifierCircuit,
  CeAmplifierContent,
  ["bjt", "amplifier", "common emitter", "frequency response", "gain"],
);
runCircuitMigration(
  "03-analog-electronics-advanced",
  "semester-01/03-analog-electronics-advanced",
  CbAmplifierCircuit,
  CbAmplifierContent,
  ["bjt", "amplifier", "common base", "alpha", "current gain"],
);

runCircuitMigration(
  "03-analog-electronics-advanced",
  "semester-01/03-analog-electronics-advanced",
  CbTransistorCharacteristicsCircuit,
  CbTransistorCharacteristicsContent,
  ["bjt", "transistor", "common base", "alpha", "current gain"],
);

runCircuitMigration(
  "03-analog-electronics-advanced",
  "semester-01/03-analog-electronics-advanced",
  BjtBiasCircuit,
  BjtBiasContent,
  ["bjt", "bias", "q-point", "voltage divider", "stability"],
);
runCircuitMigration(
  "03-analog-electronics-advanced",
  "semester-01/03-analog-electronics-advanced",
  MosfetCharacteristicsCircuit,
  MosfetCharacteristicsContent,
  [
    "mosfet",
    "drain characteristics",
    "transfer characteristics",
    "2N7000",
    "threshold voltage",
  ],
);
runCircuitMigration(
  "03-analog-electronics-advanced",
  "semester-01/03-analog-electronics-advanced",
  OpampCircuitsCircuit,
  OpampCircuitsContent,
  ["op-amp", "lm741", "inverting", "non-inverting", "voltage gain"],
);

runCircuitMigration(
  "02-advanced-adders",
  "semester-02/02-advanced-adders",
  HalfAdderRevisitCircuit,
  HalfAdderRevisitContent,
  ["adder", "propagation delay", "fan-out", "74hc", "timing", "oscilloscope"],
);
runCircuitMigration(
  "02-advanced-adders",
  "semester-02/02-advanced-adders",
  FullAdderRippleCircuit,
  FullAdderRippleContent,
  ["ripple carry", "4-bit adder", "carry propagation", "alu", "delay"],
);

runCircuitMigration(
  "03-combinational-logic",
  "semester-02/03-combinational-logic",
  BcdXs3Converter,
  BcdXs3ConverterContent,
  ["bcd", "excess-3", "code converter", "combinational", "logic gates"],
);
runCircuitMigration(
  "03-combinational-logic",
  "semester-02/03-combinational-logic",
  GrayBinaryConverter,
  GrayBinaryConverterContent,
  ["gray code", "binary", "code converter", "xor", "combinational"],
);
runCircuitMigration(
  "03-combinational-logic",
  "semester-02/03-combinational-logic",
  Mux4to1IC,
  Mux4to1ICContent,
  ["mux", "4:1 multiplexer", "74hc153", "data selection", "combinational"],
);
runCircuitMigration(
  "03-combinational-logic",
  "semester-02/03-combinational-logic",
  Demux1to4IC,
  Demux1to4ICContent,
  ["demux", "1:4 demultiplexer", "74hc139", "address lines", "combinational"],
);
runCircuitMigration(
  "03-combinational-logic",
  "semester-02/03-combinational-logic",
  BinaryAdder4bit,
  BinaryAdder4bitContent,
  ["adder", "4-bit", "74hc283", "carry-out", "combinational"],
);
runCircuitMigration(
  "03-combinational-logic",
  "semester-02/03-combinational-logic",
  BinarySubtractor4bit,
  BinarySubtractor4bitContent,
  ["2's complement", "subtractor", "4-bit", "xor", "74hc283"],
);

runCircuitMigration(
  "04-sequential-logic",
  "semester-02/04-sequential-logic",
  SRLatchCircuit,
  SrLatchContent,
  ["latch", "sr latch", "74hc279", "sequential", "set reset"],
);
runCircuitMigration(
  "04-sequential-logic",
  "semester-02/04-sequential-logic",
  DFlipFlopCircuit,
  DFlipFlopContent,
  ["flip-flop", "d flip-flop", "74hc74", "clock edge", "sequential"],
);
runCircuitMigration(
  "04-sequential-logic",
  "semester-02/04-sequential-logic",
  JkAndTFlipFlopCircuit,
  JkAndTFlipFlopContent,
  [
    "flip-flop",
    "jk flip-flop",
    "t flip-flop",
    "74hc76",
    "toggle",
    "sequential",
  ],
);
runCircuitMigration(
  "04-sequential-logic",
  "semester-02/04-sequential-logic",
  Mod5CounterCircuit,
  Mod5CounterContent,
  [
    "counter",
    "mod-5",
    "asynchronous",
    "74hc93",
    "ripple counter",
    "sequential",
  ],
);

runCircuitMigration(
  "05-digital-logic-design",
  "semester-02/05-digital-logic-design",
  ParityChecker,
  ParityCheckerContent,
  ["parity", "error detection", "xor", "parity checker", "parity generator"],
);
runCircuitMigration(
  "05-digital-logic-design",
  "semester-02/05-digital-logic-design",
  DigitalComparator,
  DigitalComparatorContent,
  ["comparator", "4-bit", "magnitude", "xnor", "combinational"],
);
runCircuitMigration(
  "05-digital-logic-design",
  "semester-02/05-digital-logic-design",
  ShiftRegister,
  ShiftRegisterContent,
  ["shift register", "sipo", "74hc273", "serial to parallel", "sequential"],
);

runCircuitMigration(
  "02-peripheral-interfacing",
  "semester-04/02-peripheral-interfacing",
  GpioInterfacingCircuit,
  GpioInterfacingContent,
  ["gpio", "microcontroller", "led", "switch", "pull-down", "logic levels"],
);
runCircuitMigration(
  "02-peripheral-interfacing",
  "semester-04/02-peripheral-interfacing",
  SevenSegmentDisplayCircuit,
  SevenSegmentDisplayContent,
  ["seven segment", "display", "decoder", "74hc138", "current limiting"],
);
runCircuitMigration(
  "02-peripheral-interfacing",
  "semester-04/02-peripheral-interfacing",
  AdcDacCircuit,
  AdcDacContent,
  ["adc", "dac", "analog", "digital conversion", "r-2r", "potentiometer"],
);

function runContentMigration(
  subjectId: string,
  subjectPath: string,
  content: Parameters<typeof migrateContentOnly>[0]["content"],
  tags: readonly string[],
) {
  const result = migrateContentOnly({ content, tags, subjectPath });
  registerMigrated(subjectId, result.id, subjectPath, tags, result.labType);
}

console.log("\nMigrating content-only labs...\n");

runContentMigration(
  "05-digital-logic-design",
  "semester-02/05-digital-logic-design",
  GateLevelMinimizationContent,
  ["k-map", "karnaugh", "minimization", "sop", "pos", "boolean algebra"],
);

runContentMigration(
  "01-combinational-arithmetic",
  "semester-03/01-combinational-arithmetic",
  IntroGatesReviewContent,
  ["gates", "review", "boolean algebra", "de morgan", "theory"],
);
// full-adder-ripple also listed under Semester 3 — same experiment folder as Semester 2
registerMigrated(
  "01-combinational-arithmetic",
  "full-adder-ripple",
  "semester-02/02-advanced-adders/full-adder-ripple",
  ["ripple carry", "4-bit adder", "carry propagation", "alu", "delay"],
  "breadboard",
);
runContentMigration(
  "01-combinational-arithmetic",
  "semester-03/01-combinational-arithmetic",
  ClaAdderContent,
  ["carry lookahead", "cla", "adder", "generate", "propagate", "theory"],
);
runContentMigration(
  "01-combinational-arithmetic",
  "semester-03/01-combinational-arithmetic",
  RegistersCountersTheoryContent,
  ["registers", "counters", "shift register", "binary counter", "theory"],
);
runContentMigration(
  "01-combinational-arithmetic",
  "semester-03/01-combinational-arithmetic",
  WallaceTreeContent,
  ["wallace tree", "multiplier", "partial products", "fast adder", "theory"],
);
runContentMigration(
  "01-combinational-arithmetic",
  "semester-03/01-combinational-arithmetic",
  CombinationalMultipliersContent,
  [
    "array multiplier",
    "partial products",
    "combinational",
    "multiplication",
    "theory",
  ],
);
runContentMigration(
  "01-combinational-arithmetic",
  "semester-03/01-combinational-arithmetic",
  BoothsMultiplierContent,
  [
    "booth's algorithm",
    "signed multiplication",
    "radix-2",
    "two's complement",
    "theory",
  ],
);

runContentMigration(
  "02-memory-cpu-systems",
  "semester-03/02-memory-cpu-systems",
  aluSimulation,
  ["alu", "arithmetic logic unit", "flags", "simulation", "cpu"],
);
runContentMigration(
  "02-memory-cpu-systems",
  "semester-03/02-memory-cpu-systems",
  memoryDesign,
  ["ram", "rom", "memory", "address decode", "read write"],
);
runContentMigration(
  "02-memory-cpu-systems",
  "semester-03/02-memory-cpu-systems",
  cacheDirectMapped,
  ["cache", "direct mapped", "hit rate", "miss penalty", "memory hierarchy"],
);
runContentMigration(
  "02-memory-cpu-systems",
  "semester-03/02-memory-cpu-systems",
  cacheAssociative,
  ["cache", "fully associative", "lru", "replacement policy", "memory"],
);
runContentMigration(
  "02-memory-cpu-systems",
  "semester-03/02-memory-cpu-systems",
  cpuDesign,
  [
    "cpu",
    "fetch decode execute",
    "instruction cycle",
    "register file",
    "simulation",
  ],
);

runContentMigration(
  "03-programming-fundamentals",
  "semester-03/03-programming-fundamentals",
  CExpressionsContent,
  [
    "c programming",
    "expressions",
    "operators",
    "precedence",
    "type conversion",
  ],
);
runContentMigration(
  "03-programming-fundamentals",
  "semester-03/03-programming-fundamentals",
  CFileOperations1Content,
  ["c programming", "file i/o", "fopen", "fprintf", "fscanf"],
);
runContentMigration(
  "03-programming-fundamentals",
  "semester-03/03-programming-fundamentals",
  CFileOperations2Content,
  [
    "c programming",
    "binary files",
    "fseek",
    "fread",
    "fwrite",
    "random access",
  ],
);

runContentMigration(
  "01-8085-assembly-programming",
  "semester-04/01-8085-assembly-programming",
  Exp8085AddSub8bitContent,
  ["8085", "assembly", "addition", "subtraction", "8-bit"],
);
runContentMigration(
  "01-8085-assembly-programming",
  "semester-04/01-8085-assembly-programming",
  Exp8085AddSubCarryContent,
  ["8085", "assembly", "adc", "sbb", "carry", "borrow"],
);
runContentMigration(
  "01-8085-assembly-programming",
  "semester-04/01-8085-assembly-programming",
  Exp8085BcdAdditionContent,
  ["8085", "bcd", "daa", "decimal adjust", "assembly"],
);
runContentMigration(
  "01-8085-assembly-programming",
  "semester-04/01-8085-assembly-programming",
  Exp8085Multiply8bitContent,
  ["8085", "assembly", "multiplication", "repeated addition", "loop"],
);
runContentMigration(
  "01-8085-assembly-programming",
  "semester-04/01-8085-assembly-programming",
  Exp8085Divide8bitContent,
  [
    "8085",
    "assembly",
    "division",
    "repeated subtraction",
    "quotient",
    "remainder",
  ],
);
runContentMigration(
  "01-8085-assembly-programming",
  "semester-04/01-8085-assembly-programming",
  Exp8085ArraySumContent,
  ["8085", "assembly", "array", "sum", "loop", "memory"],
);
runContentMigration(
  "01-8085-assembly-programming",
  "semester-04/01-8085-assembly-programming",
  Exp8085ArraySquareContent,
  ["8085", "assembly", "array", "square", "multiplication", "memory"],
);
runContentMigration(
  "01-8085-assembly-programming",
  "semester-04/01-8085-assembly-programming",
  Exp8085MinMaxContent,
  ["8085", "assembly", "array", "minimum", "maximum", "compare"],
);
runContentMigration(
  "01-8085-assembly-programming",
  "semester-04/01-8085-assembly-programming",
  Exp8085BubbleSortContent,
  ["8085", "assembly", "bubble sort", "sorting", "array", "compare"],
);
runContentMigration(
  "01-8085-assembly-programming",
  "semester-04/01-8085-assembly-programming",
  Exp8085BcdBinaryConvContent,
  ["8085", "assembly", "bcd", "binary", "conversion"],
);
runContentMigration(
  "01-8085-assembly-programming",
  "semester-04/01-8085-assembly-programming",
  Exp8085SqrtContent,
  ["8085", "assembly", "square root", "approximation", "8-bit"],
);

function generateCatalog() {
  const importLines = new Set<string>();
  for (const subject of SUBJECTS) {
    for (const exp of subject.experiments) {
      importLines.add(
        `import {\n  ${exp.circuitName},\n  ${exp.contentName},\n  ${exp.expName},\n} from '${exp.importPath}';`,
      );
    }
  }

  const subjectBlocks = SUBJECTS.map((subject) => {
    const experimentLines = subject.experiments
      .map(
        (exp) =>
          `      fromBuilt(${exp.expName}, ${exp.circuitName}, ${exp.contentName}, [\n        ${exp.tags.map((t) => `'${t.replace(/'/g, "\\'")}'`).join(", ")},\n      ]),`,
      )
      .join("\n");

    return `  {
    semesterId: '${subject.semesterId}',
    semesterLabel: '${subject.semesterLabel}',
    subjectId: '${subject.subjectId}',
    subjectLabel: '${subject.subjectLabel}',
    subjectDescription:
      ${JSON.stringify(subject.subjectDescription)},
    defaultCircuitId: '${subject.defaultCircuitId}',
    experiments: [
${experimentLines}
    ],
  },`;
  }).join("\n");

  const catalog = `import { type LabContent } from '@/labs/lab-content.types';

import { type ExperimentDefinition } from '@/labs/experiments/types';

import { type Circuit } from '@/labs/types';



${[...importLines].join("\n\n")}



export type SemesterExperimentEntry = {

  experiment: ExperimentDefinition;

  circuit: Circuit;

  content: LabContent;

  tags: readonly string[];

};



export type SemesterSubjectCatalog = {

  semesterId: string;

  semesterLabel: string;

  subjectId: string;

  subjectLabel: string;

  subjectDescription: string;

  defaultCircuitId: string;

  experiments: readonly SemesterExperimentEntry[];

};



function fromBuilt(

  experiment: ExperimentDefinition,

  circuit: Circuit,

  content: LabContent,

  tags: readonly string[],

): SemesterExperimentEntry {

  return { experiment, circuit, content, tags };

}



export const SEMESTER_SUBJECTS: readonly SemesterSubjectCatalog[] = [

${subjectBlocks}

];



export const SEMESTER_CIRCUITS: Circuit[] = SEMESTER_SUBJECTS.flatMap((subject) =>

  subject.experiments

    .filter((item) => (item.experiment.labType ?? 'breadboard') === 'breadboard')

    .map((item) => item.circuit),

);



export const SEMESTER_CONTENTS: Record<string, LabContent> = Object.fromEntries(

  SEMESTER_SUBJECTS.flatMap((subject) =>

    subject.experiments.map((item) => [item.experiment.id, item.content] as const),

  ),

);



export const SEMESTER_EXPERIMENT_IDS = new Set(

  SEMESTER_SUBJECTS.flatMap((subject) => subject.experiments.map((item) => item.experiment.id)),

);

`;

  const outPath = path.join(process.cwd(), "src/labs/semesters/catalog.ts");
  fs.writeFileSync(outPath, catalog, "utf8");
  console.log(`\n✓ Wrote ${outPath}`);
}

generateCatalog();
console.log("\nDone. Run npm test && npm run build to verify.");

import { type LabContent } from "@/labs/lab-content.types";

import { type ExperimentDefinition } from "@/labs/experiments/types";

import { type Circuit } from "@/labs/types";

import {
  Exp01StudyBasicComponentsCircuit,
  Exp01StudyBasicComponentsContent,
  exp01StudyBasicComponentsExperiment,
} from "./semester-01/01-analog-electronics/01-study-basic-components";

import {
  PnJunctionDiodeCircuit,
  PnJunctionDiodeContent,
  pnJunctionDiodeExperiment,
} from "./semester-01/01-analog-electronics/02-pn-junction-diode";

import {
  ZenerDiodeCircuit,
  ZenerDiodeContent,
  zenerDiodeExperiment,
} from "./semester-01/01-analog-electronics/03-zener-diode";

import {
  HalfWaveRectifierCircuit,
  HalfWaveRectifierContent,
  halfWaveRectifierExperiment,
} from "./semester-01/01-analog-electronics/05-half-wave-rectifier";

import {
  FullWaveRectifierCircuit,
  FullWaveRectifierContent,
  fullWaveRectifierExperiment,
} from "./semester-01/01-analog-electronics/06-full-wave-rectifier";

// import {
//   RectifiersCapacitorFiltersCircuit,
//   RectifiersCapacitorFiltersContent,
//   rectifiersCapacitorFiltersExperiment,
// } from "./semester-01/01-analog-electronics/rectifiers-capacitor-filters";

// import {
//   OhmsLawCircuit,
//   OhmsLawContent,
//   ohmsLawExperiment,
// } from "./semester-01/01-analog-electronics/ohms-law";

import {
  KirchhoffLawsCircuit,
  KirchhoffLawsContent,
  kirchhoffLawsExperiment,
} from "./semester-01/03-FEE/kirchhoff-laws";

import {
  SuperpositionTheoremCircuit,
  SuperpositionTheoremContent,
  superpositionTheoremExperiment,
} from "./semester-01/03-FEE/superposition-theorem";

import {
  TheveninTheoremCircuit,
  TheveninTheoremContent,
  theveninTheoremExperiment,
} from "./semester-01/03-FEE/thevenin-theorem";

import {
  NortonTheoremCircuit,
  NortonTheoremContent,
  nortonTheoremExperiment,
} from "./semester-01/03-FEE/norton-theorem";

// import {
//   LogicGatesCircuit,
//   LogicGatesContent,
//   logicGatesExperiment,
// } from "./semester-01/02-computer-application/logic-gates";

import {
  HalfSubtractorCircuit,
  HalfSubtractorContent,
  halfSubtractorExperiment,
} from "./semester-01/02-computer-application/half-subtractor";

import {
  Mux2to1Circuit,
  Mux2to1Content,
  mux2to1Experiment,
} from "./semester-01/02-computer-application/mux-2to1";

import {
  Demux1to2Circuit,
  Demux1to2Content,
  demux1to2Experiment,
} from "./semester-01/02-computer-application/demux-1to2";

import {
  ZenerVoltageRegulatorCircuit,
  ZenerVoltageRegulatorContent,
  zenerVoltageRegulatorExperiment,
} from "./semester-01/01-analog-electronics/04-zener-voltage-regulator";

import {
  Exp07CeAmplifierCircuit,
  Exp07CeAmplifierContent,
  exp07CeAmplifierExperiment,
} from "./semester-01/01-analog-electronics/07-ce-amplifier";

import {
  CbAmplifierCircuit,
  CbAmplifierContent,
  cbAmplifierExperiment,
} from "./semester-01/01-analog-electronics/09-cb-amplifier";

import {
  CbTransistorCharacteristicsCircuit,
  CbTransistorCharacteristicsContent,
  cbTransistorCharacteristicsExperiment,
} from "./semester-01/01-analog-electronics/08-cb-transistor-characteristics";

import {
  BjtBiasCircuit,
  BjtBiasContent,
  bjtBiasExperiment,
} from "./semester-01/01-analog-electronics/10-bjt-bias";

import {
  ToStudyBjtFixedBiasAndVoltageDividerBiasConfigurationCircuit,
  ToStudyBjtFixedBiasAndVoltageDividerBiasConfigurationContent,
  toStudyBjtFixedBiasAndVoltageDividerBiasConfigurationExperiment,
} from "./semester-01/01-analog-electronics/07-to-study-bjt-fixed-bias-and-voltage-divider-bias-configuration";

import {
  MosfetCharacteristicsCircuit,
  MosfetCharacteristicsContent,
  mosfetCharacteristicsExperiment,
} from "./semester-01/01-analog-electronics/11-mosfet-characteristics";

import {
  MosfetCommonSourceCircuit,
  MosfetCommonSourceContent,
  mosfetCommonSourceExperiment,
} from "./semester-01/01-analog-electronics/12-mosfet-common-source";

import {
  FullAdderCircuit,
  FullAdderContent,
  fullAdderExperiment,
} from "./semester-02/01-digital-electronics/04-01-full-adder";

import {
  InvertingNonInvertingOpampCircuit,
  InvertingNonInvertingOpampContent,
  invertingNonInvertingOpampExperiment,
} from "./semester-01/01-analog-electronics/10-inverting-non-inverting-opamp";

import {
  Exp11Encoder4to2Circuit,
  Exp11Encoder4to2Content,
  exp11Encoder4to2Experiment,
} from "./semester-02/01-digital-electronics/11-encoder-4to2";

import {
  FullSubtractorCircuit,
  FullSubtractorContent,
  fullSubtractorExperiment,
} from "./semester-02/01-digital-electronics/04-02-full-subtractor";

import {
  IntroLogicGatesCircuit,
  IntroLogicGatesContent,
  introLogicGatesExperiment,
} from "./semester-02/01-digital-electronics/01-intro-logic-gates";

import {
  Exp12Decoder2to4Circuit,
  Exp12Decoder2to4Content,
  exp12Decoder2to4Experiment,
} from "./semester-02/01-digital-electronics/12-decoder-2to4";

import {
  MuxBasedLogicCircuit,
  MuxBasedLogicContent,
  muxBasedLogicExperiment,
} from "./semester-02/01-digital-electronics/mux-based-logic";

import {
  DemuxAddressDecoderCircuit,
  DemuxAddressDecoderContent,
  demuxAddressDecoderExperiment,
} from "./semester-02/01-digital-electronics/10-demux-address-decoder";

import {
  HalfAdderSubtractorCircuit,
  HalfAdderSubtractorContent,
  halfAdderSubtractorExperiment,
} from "./semester-02/01-digital-electronics/03-half-adder-subtractor";

import {
  HalfAdderRevisitCircuit,
  HalfAdderRevisitContent,
  halfAdderRevisitExperiment,
} from "./semester-02/02-advanced-adders/half-adder-revisit";

import {
  FullAdderRippleCircuit,
  FullAdderRippleContent,
  fullAdderRippleExperiment,
} from "./semester-02/02-advanced-adders/full-adder-ripple";

import {
  BcdXs3ConverterCircuit,
  BcdXs3ConverterContent,
  bcdXs3ConverterExperiment,
} from "./semester-02/01-digital-electronics/05-bcd-xs3-converter";

import {
  GrayBinaryConverterCircuit,
  GrayBinaryConverterContent,
  grayBinaryConverterExperiment,
} from "./semester-02/01-digital-electronics/06-gray-binary-converter";

import {
  Mux4to1IcCircuit,
  Mux4to1IcContent,
  mux4to1IcExperiment,
} from "./semester-02/01-digital-electronics/08-mux-4to1-ic";

import {
  Demux1to4IcCircuit,
  Demux1to4IcContent,
  demux1to4IcExperiment,
} from "./semester-02/01-digital-electronics/09-demux-1to4-ic";

import {
  BinaryAdder4bitCircuit,
  BinaryAdder4bitContent,
  binaryAdder4bitExperiment,
} from "./semester-02/01-digital-electronics/13-binary-adder-4bit";

import {
  BinarySubtractor4bitCircuit,
  BinarySubtractor4bitContent,
  binarySubtractor4bitExperiment,
} from "./semester-02/01-digital-electronics/14-binary-subtractor-4bit";

import {
  SrLatchCircuit,
  SrLatchContent,
  srLatchExperiment,
} from "./semester-02/01-digital-electronics/sr-latch";

import {
  DFlipFlopCircuit,
  DFlipFlopContent,
  dFlipFlopExperiment,
} from "./semester-02/01-digital-electronics/15-d-flip-flop";

import {
  JkTFlipFlopCircuit,
  JkTFlipFlopContent,
  jkTFlipFlopExperiment,
} from "./semester-02/01-digital-electronics/16-jk-t-flip-flop";

import {
  Mod5AsyncUpDownCounterCircuit,
  Mod5AsyncUpDownCounterContent,
  mod5AsyncUpDownCounterExperiment,
} from "./semester-02/01-digital-electronics/17-mod5-counter";

import {
  ParityCheckerCircuit,
  ParityCheckerContent,
  parityCheckerExperiment,
} from "./semester-02/05-digital-logic-design/parity-checker";

import {
  DigitalComparatorCircuit,
  DigitalComparatorContent,
  digitalComparatorExperiment,
} from "./semester-02/05-digital-logic-design/digital-comparator";

import {
  ShiftRegisterCircuit,
  ShiftRegisterContent,
  shiftRegisterExperiment,
} from "./semester-02/05-digital-logic-design/shift-register";

import {
  GateLevelMinimizationCircuit,
  GateLevelMinimizationContent,
  gateLevelMinimizationExperiment,
} from "./semester-02/01-digital-electronics/02-gate-level-minimization";

import {
  IntroGatesReviewCircuit,
  IntroGatesReviewContent,
  introGatesReviewExperiment,
} from "./semester-03/01-combinational-arithmetic/intro-gates-review";

import {
  ClaAdderCircuit,
  ClaAdderContent,
  claAdderExperiment,
} from "./semester-03/01-combinational-arithmetic/cla-adder";

import {
  RegistersCountersTheoryCircuit,
  RegistersCountersTheoryContent,
  registersCountersTheoryExperiment,
} from "./semester-03/01-combinational-arithmetic/registers-counters-theory";

import {
  WallaceTreeCircuit,
  WallaceTreeContent,
  wallaceTreeExperiment,
} from "./semester-03/01-combinational-arithmetic/wallace-tree";

import {
  CombinationalMultipliersCircuit,
  CombinationalMultipliersContent,
  combinationalMultipliersExperiment,
} from "./semester-03/01-combinational-arithmetic/combinational-multipliers";

import {
  BoothsMultiplierCircuit,
  BoothsMultiplierContent,
  boothsMultiplierExperiment,
} from "./semester-03/01-combinational-arithmetic/booths-multiplier";

import {
  AluSimulationCircuit,
  AluSimulationContent,
  aluSimulationExperiment,
} from "./semester-03/02-memory-cpu-systems/alu-simulation";

import {
  MemoryDesignCircuit,
  MemoryDesignContent,
  memoryDesignExperiment,
} from "./semester-03/02-memory-cpu-systems/memory-design";

import {
  CacheDirectMappedCircuit,
  CacheDirectMappedContent,
  cacheDirectMappedExperiment,
} from "./semester-03/02-memory-cpu-systems/cache-direct-mapped";

import {
  CacheAssociativeCircuit,
  CacheAssociativeContent,
  cacheAssociativeExperiment,
} from "./semester-03/02-memory-cpu-systems/cache-associative";

import {
  CpuDesignCircuit,
  CpuDesignContent,
  cpuDesignExperiment,
} from "./semester-03/02-memory-cpu-systems/cpu-design";

import {
  CExpressionsCircuit,
  CExpressionsContent,
  cExpressionsExperiment,
} from "./semester-03/03-programming-fundamentals/c-expressions";

import {
  CFileOperations1Circuit,
  CFileOperations1Content,
  cFileOperations1Experiment,
} from "./semester-03/03-programming-fundamentals/c-file-operations-1";

import {
  CFileOperations2Circuit,
  CFileOperations2Content,
  cFileOperations2Experiment,
} from "./semester-03/03-programming-fundamentals/c-file-operations-2";

import {
  Exp8085AddSub8bitCircuit,
  Exp8085AddSub8bitContent,
  exp8085AddSub8bitExperiment,
} from "./semester-04/01-8085-assembly-programming/8085-add-sub-8bit";

import {
  Exp8085AddSubCarryCircuit,
  Exp8085AddSubCarryContent,
  exp8085AddSubCarryExperiment,
} from "./semester-04/01-8085-assembly-programming/8085-add-sub-carry";

import {
  Exp8085BcdAdditionCircuit,
  Exp8085BcdAdditionContent,
  exp8085BcdAdditionExperiment,
} from "./semester-04/01-8085-assembly-programming/8085-bcd-addition";

import {
  Exp8085Multiply8bitCircuit,
  Exp8085Multiply8bitContent,
  exp8085Multiply8bitExperiment,
} from "./semester-04/01-8085-assembly-programming/8085-multiply-8bit";

import {
  Exp8085Divide8bitCircuit,
  Exp8085Divide8bitContent,
  exp8085Divide8bitExperiment,
} from "./semester-04/01-8085-assembly-programming/8085-divide-8bit";

import {
  Exp8085ArraySumCircuit,
  Exp8085ArraySumContent,
  exp8085ArraySumExperiment,
} from "./semester-04/01-8085-assembly-programming/8085-array-sum";

import {
  Exp8085ArraySquareCircuit,
  Exp8085ArraySquareContent,
  exp8085ArraySquareExperiment,
} from "./semester-04/01-8085-assembly-programming/8085-array-square";

import {
  Exp8085MinMaxCircuit,
  Exp8085MinMaxContent,
  exp8085MinMaxExperiment,
} from "./semester-04/01-8085-assembly-programming/8085-min-max";

import {
  Exp8085BubbleSortCircuit,
  Exp8085BubbleSortContent,
  exp8085BubbleSortExperiment,
} from "./semester-04/01-8085-assembly-programming/8085-bubble-sort";

import {
  Exp8085BcdBinaryConvCircuit,
  Exp8085BcdBinaryConvContent,
  exp8085BcdBinaryConvExperiment,
} from "./semester-04/01-8085-assembly-programming/8085-bcd-binary-conv";

import {
  Exp8085SqrtCircuit,
  Exp8085SqrtContent,
  exp8085SqrtExperiment,
} from "./semester-04/01-8085-assembly-programming/8085-sqrt";

import {
  GpioInterfacingCircuit,
  GpioInterfacingContent,
  gpioInterfacingExperiment,
} from "./semester-04/02-peripheral-interfacing/gpio-interfacing";

import {
  SevenSegmentDisplayCircuit,
  SevenSegmentDisplayContent,
  sevenSegmentDisplayExperiment,
} from "./semester-04/02-peripheral-interfacing/seven-segment-display";

import {
  AdcDacCircuit,
  AdcDacContent,
  adcDacExperiment,
} from "./semester-04/02-peripheral-interfacing/adc-dac";

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
  {
    semesterId: "semester-01",
    semesterLabel: "Semester 1",
    subjectId: "01-analog-electronics",
    subjectLabel: "Analog Electronics",
    subjectDescription:
      "Study passive and active components, diode characteristics, rectifiers, and DC network theorems. Build and test circuits on a breadboard using multimeters and power supplies.",
    defaultCircuitId: "study-basic-components",
    experiments: [
      fromBuilt(
        exp01StudyBasicComponentsExperiment,
        Exp01StudyBasicComponentsCircuit,
        Exp01StudyBasicComponentsContent,
        [
          "CRO",
          "multimeter",
          "function generator",
          "power supply",
          "breadboard",
          "components",
        ],
      ),
      fromBuilt(
        pnJunctionDiodeExperiment,
        PnJunctionDiodeCircuit,
        PnJunctionDiodeContent,
        [
          "diode",
          "pn junction",
          "forward bias",
          "reverse bias",
          "characteristics",
        ],
      ),
      fromBuilt(zenerDiodeExperiment, ZenerDiodeCircuit, ZenerDiodeContent, [
        "zener",
        "diode",
        "breakdown",
        "characteristics",
      ]),
      fromBuilt(
        zenerVoltageRegulatorExperiment,
        ZenerVoltageRegulatorCircuit,
        ZenerVoltageRegulatorContent,
        ["zener", "voltage regulator", "line regulation", "load regulation"],
      ),
      fromBuilt(
        halfWaveRectifierExperiment,
        HalfWaveRectifierCircuit,
        HalfWaveRectifierContent,
        ["rectifier", "diode", "half-wave", "ripple"],
      ),
      fromBuilt(
        fullWaveRectifierExperiment,
        FullWaveRectifierCircuit,
        FullWaveRectifierContent,
        ["rectifier", "center-tapped", "full-wave", "ripple", "filter"],
      ),
      // fromBuilt(
      //   rectifiersCapacitorFiltersExperiment,
      //   RectifiersCapacitorFiltersCircuit,
      //   RectifiersCapacitorFiltersContent,
      //   ["rectifier", "filter", "capacitor", "ripple reduction"],
      // ),
      // fromBuilt(ohmsLawExperiment, OhmsLawCircuit, OhmsLawContent, [
      //   "ohm",
      //   "resistance",
      //   "voltage",
      //   "current",
      //   "v-i graph",
      // ]),
      fromBuilt(
        exp07CeAmplifierExperiment,
        Exp07CeAmplifierCircuit,
        Exp07CeAmplifierContent,
        ["bjt", "common-emitter", "transistor", "characteristics", "analog"],
      ),
      fromBuilt(cbAmplifierExperiment, CbAmplifierCircuit, CbAmplifierContent, [
        "bjt",
        "amplifier",
        "common base",
        "alpha",
        "current gain",
      ]),
      fromBuilt(
        cbTransistorCharacteristicsExperiment,
        CbTransistorCharacteristicsCircuit,
        CbTransistorCharacteristicsContent,
        ["bjt", "transistor", "common base", "alpha", "current gain"],
      ),
      fromBuilt(bjtBiasExperiment, BjtBiasCircuit, BjtBiasContent, [
        "bjt",
        "bias",
        "q-point",
        "voltage divider",
        "stability",
      ]),
      fromBuilt(
        toStudyBjtFixedBiasAndVoltageDividerBiasConfigurationExperiment,
        ToStudyBjtFixedBiasAndVoltageDividerBiasConfigurationCircuit,
        ToStudyBjtFixedBiasAndVoltageDividerBiasConfigurationContent,
        ["bjt", "fixed bias", "voltage divider bias", "q-point", "stability"],
      ),
      fromBuilt(
        invertingNonInvertingOpampExperiment,
        InvertingNonInvertingOpampCircuit,
        InvertingNonInvertingOpampContent,
        [
          "op-amp",
          "lm741",
          "inverting amplifier",
          "non-inverting amplifier",
          "voltage gain",
        ],
      ),
      fromBuilt(
        mosfetCharacteristicsExperiment,
        MosfetCharacteristicsCircuit,
        MosfetCharacteristicsContent,
        [
          "mosfet",
          "drain characteristics",
          "transfer characteristics",
          "2N7000",
          "threshold voltage",
        ],
      ),
      fromBuilt(
        mosfetCommonSourceExperiment,
        MosfetCommonSourceCircuit,
        MosfetCommonSourceContent,
        [
          "mosfet",
          "common source",
          "amplifier",
          "voltage gain",
          "phase shift",
          "2N7000",
        ],
      ),
      // fromBuilt(
      //   rectifiersCapacitorFiltersExperiment,
      //   RectifiersCapacitorFiltersCircuit,
      //   RectifiersCapacitorFiltersContent,
      //   ["rectifier", "filter", "capacitor", "ripple reduction"],
      // ),
      // fromBuilt(ohmsLawExperiment, OhmsLawCircuit, OhmsLawContent, [
      //   "ohm",
      //   "resistance",
      //   "voltage",
      //   "current",
      //   "v-i graph",
      // ]),
      // fromBuilt(
      //   kirchhoffLawsExperiment,
      //   KirchhoffLawsCircuit,
      //   KirchhoffLawsContent,
      //   ["kirchhoff", "kcl", "kvl", "dc circuit", "nodes", "loops"],
      // ),
      // fromBuilt(
      //   superpositionTheoremExperiment,
      //   SuperpositionTheoremCircuit,
      //   SuperpositionTheoremContent,
      //   ["superposition", "linear circuit", "multiple sources", "dc network"],
      // ),
      // fromBuilt(
      //   theveninTheoremExperiment,
      //   TheveninTheoremCircuit,
      //   TheveninTheoremContent,
      //   ["thevenin", "equivalent circuit", "V_th", "R_th"],
      // ),
      // fromBuilt(
      //   nortonTheoremExperiment,
      //   NortonTheoremCircuit,
      //   NortonTheoremContent,
      //   [
      //     "norton",
      //     "equivalent circuit",
      //     "short circuit current",
      //     "source transformation",
      //   ],
      // ),
    ],
  },
  {
    semesterId: "semester-01",
    semesterLabel: "Semester 1",
    subjectId: "02-computer-application",
    subjectLabel: "Computer Application",
    subjectDescription:
      "Implement and verify combinational logic circuits on a breadboard using 74HC-series ICs. Cover basic gates, adders, subtractors, multiplexers, and demultiplexers.",
    defaultCircuitId: "logic-gates",
    experiments: [
      fromBuilt(fullAdderExperiment, FullAdderCircuit, FullAdderContent, [
        "adder",
        "carry-in",
        "sum",
        "carry-out",
        "combinational logic",
      ]),
      fromBuilt(
        halfSubtractorExperiment,
        HalfSubtractorCircuit,
        HalfSubtractorContent,
        ["subtractor", "difference", "borrow", "xor", "not", "and"],
      ),
      fromBuilt(
        fullSubtractorExperiment,
        FullSubtractorCircuit,
        FullSubtractorContent,
        ["subtractor", "borrow-in", "difference", "borrow-out", "multi-bit"],
      ),
      fromBuilt(mux2to1Experiment, Mux2to1Circuit, Mux2to1Content, [
        "mux",
        "multiplexer",
        "selector",
        "data routing",
        "not",
        "and",
        "or",
      ]),
      fromBuilt(demux1to2Experiment, Demux1to2Circuit, Demux1to2Content, [
        "demux",
        "demultiplexer",
        "address decoding",
        "not",
        "and",
      ]),
    ],
  },
  {
    semesterId: "semester-01",
    semesterLabel: "Semester 1",
    subjectId: "03-FEE",
    subjectLabel: "Fundamentals of Electrical and Electronics Engineering",
    subjectDescription:
      "Amplifier stages, device characteristics, and regulator circuits. Build and characterise BJT, MOSFET, and op-amp circuits on a breadboard.",
    defaultCircuitId: "thevenin-theorem",
    experiments: [
      fromBuilt(
        kirchhoffLawsExperiment,
        KirchhoffLawsCircuit,
        KirchhoffLawsContent,
        ["kirchhoff", "kcl", "kvl", "dc circuit", "nodes", "loops"],
      ),
      fromBuilt(
        superpositionTheoremExperiment,
        SuperpositionTheoremCircuit,
        SuperpositionTheoremContent,
        ["superposition", "linear circuit", "multiple sources", "dc network"],
      ),
      fromBuilt(
        theveninTheoremExperiment,
        TheveninTheoremCircuit,
        TheveninTheoremContent,
        ["thevenin", "equivalent circuit", "V_th", "R_th"],
      ),
      fromBuilt(
        nortonTheoremExperiment,
        NortonTheoremCircuit,
        NortonTheoremContent,
        [
          "norton",
          "equivalent circuit",
          "short circuit current",
          "source transformation",
        ],
      ),
    ],
  },
  {
    semesterId: "semester-2",
    semesterLabel: "Semester 2",
    subjectId: "01-digital-electronics",
    subjectLabel: "Digital Electronics",
    subjectDescription:
      "Implement encoders, decoders, and MUX/DEMUX-based logic on a breadboard. Explore Boolean minimisation and address decoding used in memory systems.",
    defaultCircuitId: "11-encoder-4to2",
    experiments: [
      fromBuilt(
        introLogicGatesExperiment,
        IntroLogicGatesCircuit,
        IntroLogicGatesContent,
        [
          "logic gates",
          "and",
          "or",
          "not",
          "nand",
          "nor",
          "xor",
          "xnor",
          "74hc",
        ],
      ),
      fromBuilt(
        gateLevelMinimizationExperiment,
        GateLevelMinimizationCircuit,
        GateLevelMinimizationContent,
        ["k-map", "karnaugh", "minimization", "sop", "pos", "boolean algebra"],
      ),
      fromBuilt(
        halfAdderSubtractorExperiment,
        HalfAdderSubtractorCircuit,
        HalfAdderSubtractorContent,
        [
          "adder",
          "subtractor",
          "half adder",
          "half subtractor",
          "xor",
          "combinational logic",
        ],
      ),
      fromBuilt(fullAdderExperiment, FullAdderCircuit, FullAdderContent, [
        "full adder",
        "adder",
        "carry-in",
        "sum",
        "carry-out",
        "combinational logic",
      ]),
      fromBuilt(
        fullSubtractorExperiment,
        FullSubtractorCircuit,
        FullSubtractorContent,
        [
          "full subtractor",
          "subtractor",
          "borrow-in",
          "difference",
          "borrow-out",
          "combinational logic",
        ],
      ),
      fromBuilt(
        bcdXs3ConverterExperiment,
        BcdXs3ConverterCircuit,
        BcdXs3ConverterContent,
        ["bcd", "excess-3", "code converter", "combinational", "logic gates"],
      ),
      fromBuilt(
        grayBinaryConverterExperiment,
        GrayBinaryConverterCircuit,
        GrayBinaryConverterContent,
        ["gray code", "binary", "code converter", "xor", "combinational"],
      ),
      fromBuilt(mux4to1IcExperiment, Mux4to1IcCircuit, Mux4to1IcContent, [
        "mux",
        "4:1 multiplexer",
        "74hc153",
        "data selection",
        "combinational",
      ]),
      fromBuilt(demux1to4IcExperiment, Demux1to4IcCircuit, Demux1to4IcContent, [
        "demux",
        "1:4 demultiplexer",
        "74hc139",
        "address lines",
        "combinational",
      ]),
      fromBuilt(
        demuxAddressDecoderExperiment,
        DemuxAddressDecoderCircuit,
        DemuxAddressDecoderContent,
        ["demux", "address decoder", "bus", "peripheral select", "active-low"],
      ),
      fromBuilt(
        exp11Encoder4to2Experiment,
        Exp11Encoder4to2Circuit,
        Exp11Encoder4to2Content,
        ["encoder", "4to2", "or-gate", "combinational"],
      ),
      fromBuilt(
        exp12Decoder2to4Experiment,
        Exp12Decoder2to4Circuit,
        Exp12Decoder2to4Content,
        ["decoder", "2to4", "minterm", "combinational"],
      ),
      fromBuilt(
        binaryAdder4bitExperiment,
        BinaryAdder4bitCircuit,
        BinaryAdder4bitContent,
        ["adder", "4-bit", "74hc283", "carry-out", "combinational"],
      ),
      fromBuilt(
        binarySubtractor4bitExperiment,
        BinarySubtractor4bitCircuit,
        BinarySubtractor4bitContent,
        ["2's complement", "subtractor", "4-bit", "xor", "74hc283"],
      ),
      fromBuilt(dFlipFlopExperiment, DFlipFlopCircuit, DFlipFlopContent, [
        "flip-flop",
        "d flip-flop",
        "74hc74",
        "clock edge",
        "sequential",
      ]),
      fromBuilt(jkTFlipFlopExperiment, JkTFlipFlopCircuit, JkTFlipFlopContent, [
        "flip-flop",
        "jk flip-flop",
        "t flip-flop",
        "74hc76",
        "toggle",
        "sequential",
      ]),
      fromBuilt(
        mod5AsyncUpDownCounterExperiment,
        Mod5AsyncUpDownCounterCircuit,
        Mod5AsyncUpDownCounterContent,
        [
          "counter",
          "mod-5",
          "asynchronous",
          "74hc93",
          "ripple counter",
          "sequential",
        ],
      ),
      fromBuilt(
        muxBasedLogicExperiment,
        MuxBasedLogicCircuit,
        MuxBasedLogicContent,
        ["mux", "lut", "fpga", "boolean function", "universal gate"],
      ),
      fromBuilt(srLatchExperiment, SrLatchCircuit, SrLatchContent, [
        "latch",
        "sr latch",
        "74hc279",
        "sequential",
        "set reset",
      ]),
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
    experiments: [
      fromBuilt(
        halfAdderRevisitExperiment,
        HalfAdderRevisitCircuit,
        HalfAdderRevisitContent,
        [
          "adder",
          "propagation delay",
          "fan-out",
          "74hc",
          "timing",
          "oscilloscope",
        ],
      ),
      fromBuilt(
        fullAdderRippleExperiment,
        FullAdderRippleCircuit,
        FullAdderRippleContent,
        ["ripple carry", "4-bit adder", "carry propagation", "alu", "delay"],
      ),
    ],
  },
  {
    semesterId: "semester-2",
    semesterLabel: "Semester 2",
    subjectId: "05-digital-logic-design",
    subjectLabel: "Digital Logic Design",
    subjectDescription:
      "Apply systematic minimisation techniques, parity logic, magnitude comparison, and shift registers.",
    defaultCircuitId: "parity-checker",
    experiments: [
      fromBuilt(
        parityCheckerExperiment,
        ParityCheckerCircuit,
        ParityCheckerContent,
        [
          "parity",
          "error detection",
          "xor",
          "parity checker",
          "parity generator",
        ],
      ),
      fromBuilt(
        digitalComparatorExperiment,
        DigitalComparatorCircuit,
        DigitalComparatorContent,
        ["comparator", "4-bit", "magnitude", "xnor", "combinational"],
      ),
      fromBuilt(
        shiftRegisterExperiment,
        ShiftRegisterCircuit,
        ShiftRegisterContent,
        [
          "shift register",
          "sipo",
          "74hc273",
          "serial to parallel",
          "sequential",
        ],
      ),
    ],
  },
  {
    semesterId: "semester-3",
    semesterLabel: "Semester 3",
    subjectId: "01-combinational-arithmetic",
    subjectLabel: "Combinational Arithmetic",
    subjectDescription:
      "Advance from basic gates to multi-bit adders, carry-lookahead logic, and high-speed multiplier architectures.",
    defaultCircuitId: "full-adder-ripple",
    experiments: [
      fromBuilt(
        introGatesReviewExperiment,
        IntroGatesReviewCircuit,
        IntroGatesReviewContent,
        ["gates", "review", "boolean algebra", "de morgan", "theory"],
      ),
      fromBuilt(
        fullAdderRippleExperiment,
        FullAdderRippleCircuit,
        FullAdderRippleContent,
        ["ripple carry", "4-bit adder", "carry propagation", "alu", "delay"],
      ),
      fromBuilt(claAdderExperiment, ClaAdderCircuit, ClaAdderContent, [
        "carry lookahead",
        "cla",
        "adder",
        "generate",
        "propagate",
        "theory",
      ]),
      fromBuilt(
        registersCountersTheoryExperiment,
        RegistersCountersTheoryCircuit,
        RegistersCountersTheoryContent,
        ["registers", "counters", "shift register", "binary counter", "theory"],
      ),
      fromBuilt(wallaceTreeExperiment, WallaceTreeCircuit, WallaceTreeContent, [
        "wallace tree",
        "multiplier",
        "partial products",
        "fast adder",
        "theory",
      ]),
      fromBuilt(
        combinationalMultipliersExperiment,
        CombinationalMultipliersCircuit,
        CombinationalMultipliersContent,
        [
          "array multiplier",
          "partial products",
          "combinational",
          "multiplication",
          "theory",
        ],
      ),
      fromBuilt(
        boothsMultiplierExperiment,
        BoothsMultiplierCircuit,
        BoothsMultiplierContent,
        [
          "booth's algorithm",
          "signed multiplication",
          "radix-2",
          "two's complement",
          "theory",
        ],
      ),
    ],
  },
  {
    semesterId: "semester-3",
    semesterLabel: "Semester 3",
    subjectId: "02-memory-cpu-systems",
    subjectLabel: "Memory & CPU Systems",
    subjectDescription:
      "Explore ALU design, memory organisation, cache hierarchies, and the fetch-decode-execute cycle.",
    defaultCircuitId: "alu-simulation",
    experiments: [
      fromBuilt(
        aluSimulationExperiment,
        AluSimulationCircuit,
        AluSimulationContent,
        ["alu", "arithmetic logic unit", "flags", "simulation", "cpu"],
      ),
      fromBuilt(
        memoryDesignExperiment,
        MemoryDesignCircuit,
        MemoryDesignContent,
        ["ram", "rom", "memory", "address decode", "read write"],
      ),
      fromBuilt(
        cacheDirectMappedExperiment,
        CacheDirectMappedCircuit,
        CacheDirectMappedContent,
        [
          "cache",
          "direct mapped",
          "hit rate",
          "miss penalty",
          "memory hierarchy",
        ],
      ),
      fromBuilt(
        cacheAssociativeExperiment,
        CacheAssociativeCircuit,
        CacheAssociativeContent,
        ["cache", "fully associative", "lru", "replacement policy", "memory"],
      ),
      fromBuilt(cpuDesignExperiment, CpuDesignCircuit, CpuDesignContent, [
        "cpu",
        "fetch decode execute",
        "instruction cycle",
        "register file",
        "simulation",
      ]),
    ],
  },
  {
    semesterId: "semester-3",
    semesterLabel: "Semester 3",
    subjectId: "03-programming-fundamentals",
    subjectLabel: "Programming Fundamentals",
    subjectDescription:
      "Write and execute C programs covering mathematical expressions and file I/O.",
    defaultCircuitId: "c-expressions",
    experiments: [
      fromBuilt(
        cExpressionsExperiment,
        CExpressionsCircuit,
        CExpressionsContent,
        [
          "c programming",
          "expressions",
          "operators",
          "precedence",
          "type conversion",
        ],
      ),
      fromBuilt(
        cFileOperations1Experiment,
        CFileOperations1Circuit,
        CFileOperations1Content,
        ["c programming", "file i/o", "fopen", "fprintf", "fscanf"],
      ),
      fromBuilt(
        cFileOperations2Experiment,
        CFileOperations2Circuit,
        CFileOperations2Content,
        [
          "c programming",
          "binary files",
          "fseek",
          "fread",
          "fwrite",
          "random access",
        ],
      ),
    ],
  },
  {
    semesterId: "semester-4",
    semesterLabel: "Semester 4",
    subjectId: "01-8085-assembly-programming",
    subjectLabel: "8085 Assembly Programming",
    subjectDescription:
      "Write and simulate Intel 8085 assembly programs covering arithmetic, sorting, and data conversion.",
    defaultCircuitId: "8085-add-sub-8bit",
    experiments: [
      fromBuilt(
        exp8085AddSub8bitExperiment,
        Exp8085AddSub8bitCircuit,
        Exp8085AddSub8bitContent,
        ["8085", "assembly", "addition", "subtraction", "8-bit"],
      ),
      fromBuilt(
        exp8085AddSubCarryExperiment,
        Exp8085AddSubCarryCircuit,
        Exp8085AddSubCarryContent,
        ["8085", "assembly", "adc", "sbb", "carry", "borrow"],
      ),
      fromBuilt(
        exp8085BcdAdditionExperiment,
        Exp8085BcdAdditionCircuit,
        Exp8085BcdAdditionContent,
        ["8085", "bcd", "daa", "decimal adjust", "assembly"],
      ),
      fromBuilt(
        exp8085Multiply8bitExperiment,
        Exp8085Multiply8bitCircuit,
        Exp8085Multiply8bitContent,
        ["8085", "assembly", "multiplication", "repeated addition", "loop"],
      ),
      fromBuilt(
        exp8085Divide8bitExperiment,
        Exp8085Divide8bitCircuit,
        Exp8085Divide8bitContent,
        [
          "8085",
          "assembly",
          "division",
          "repeated subtraction",
          "quotient",
          "remainder",
        ],
      ),
      fromBuilt(
        exp8085ArraySumExperiment,
        Exp8085ArraySumCircuit,
        Exp8085ArraySumContent,
        ["8085", "assembly", "array", "sum", "loop", "memory"],
      ),
      fromBuilt(
        exp8085ArraySquareExperiment,
        Exp8085ArraySquareCircuit,
        Exp8085ArraySquareContent,
        ["8085", "assembly", "array", "square", "multiplication", "memory"],
      ),
      fromBuilt(
        exp8085MinMaxExperiment,
        Exp8085MinMaxCircuit,
        Exp8085MinMaxContent,
        ["8085", "assembly", "array", "minimum", "maximum", "compare"],
      ),
      fromBuilt(
        exp8085BubbleSortExperiment,
        Exp8085BubbleSortCircuit,
        Exp8085BubbleSortContent,
        ["8085", "assembly", "bubble sort", "sorting", "array", "compare"],
      ),
      fromBuilt(
        exp8085BcdBinaryConvExperiment,
        Exp8085BcdBinaryConvCircuit,
        Exp8085BcdBinaryConvContent,
        ["8085", "assembly", "bcd", "binary", "conversion"],
      ),
      fromBuilt(exp8085SqrtExperiment, Exp8085SqrtCircuit, Exp8085SqrtContent, [
        "8085",
        "assembly",
        "square root",
        "approximation",
        "8-bit",
      ]),
    ],
  },
  {
    semesterId: "semester-4",
    semesterLabel: "Semester 4",
    subjectId: "02-peripheral-interfacing",
    subjectLabel: "Peripheral Interfacing",
    subjectDescription:
      "Interface digital I/O, display, and analog conversion peripherals with a microcontroller.",
    defaultCircuitId: "gpio-interfacing",
    experiments: [
      fromBuilt(
        gpioInterfacingExperiment,
        GpioInterfacingCircuit,
        GpioInterfacingContent,
        [
          "gpio",
          "microcontroller",
          "led",
          "switch",
          "pull-down",
          "logic levels",
        ],
      ),
      fromBuilt(
        sevenSegmentDisplayExperiment,
        SevenSegmentDisplayCircuit,
        SevenSegmentDisplayContent,
        ["seven segment", "display", "decoder", "74hc138", "current limiting"],
      ),
      fromBuilt(adcDacExperiment, AdcDacCircuit, AdcDacContent, [
        "adc",
        "dac",
        "analog",
        "digital conversion",
        "r-2r",
        "potentiometer",
      ]),
    ],
  },
];

export const SEMESTER_CIRCUITS: Circuit[] = SEMESTER_SUBJECTS.flatMap(
  (subject) =>
    subject.experiments

      .filter(
        (item) => (item.experiment.labType ?? "breadboard") === "breadboard",
      )

      .map((item) => item.circuit),
);

export const SEMESTER_CONTENTS: Record<string, LabContent> = Object.fromEntries(
  SEMESTER_SUBJECTS.flatMap((subject) =>
    subject.experiments.map(
      (item) => [item.experiment.id, item.content] as const,
    ),
  ),
);

export const SEMESTER_EXPERIMENT_IDS = new Set(
  SEMESTER_SUBJECTS.flatMap((subject) =>
    subject.experiments.map((item) => item.experiment.id),
  ),
);

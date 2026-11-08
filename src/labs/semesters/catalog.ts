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

import {
  RectifiersCapacitorFiltersCircuit,
  RectifiersCapacitorFiltersContent,
  rectifiersCapacitorFiltersExperiment,
} from "./semester-01/01-analog-electronics/rectifiers-capacitor-filters";

import {
  OhmsLawCircuit,
  OhmsLawContent,
  ohmsLawExperiment,
} from "./semester-01/01-analog-electronics/ohms-law";

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

import {
  LogicGatesCircuit,
  LogicGatesContent,
  logicGatesExperiment,
} from "./semester-01/02-computer-application/logic-gates";

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
  CeAmplifierCircuit,
  CeAmplifierContent,
  ceAmplifierExperiment,
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
  InvertingNonInvertingOpampCircuit,
  InvertingNonInvertingOpampContent,
  invertingNonInvertingOpampExperiment,
} from "./semester-01/01-analog-electronics/10-inverting-non-inverting-opamp";

import {
  RcFiltersCircuit,
  RcFiltersContent,
  rcFiltersExperiment,
} from "./semester-01/01-analog-electronics/14-rc-filters";

import {
  RcTransientCircuit,
  RcTransientContent,
  rcTransientExperiment,
} from "./semester-01/01-analog-electronics/15-rc-transient";

import {
  SeriesRlcResonanceCircuit,
  SeriesRlcResonanceContent,
  seriesRlcResonanceExperiment,
} from "./semester-01/01-analog-electronics/16-series-rlc-resonance";

import {
  TransistorSwitchCircuit,
  TransistorSwitchContent,
  transistorSwitchExperiment,
} from "./semester-01/01-analog-electronics/17-transistor-switch";

import {
  Decoder3to8IcCircuit,
  Decoder3to8IcContent,
  decoder3to8IcExperiment,
} from "./semester-02/03-combinational-logic/01-decoder-3to8-ic";

import {
  PriorityEncoder8to3IcCircuit,
  PriorityEncoder8to3IcContent,
  priorityEncoder8to3IcExperiment,
} from "./semester-02/03-combinational-logic/02-priority-encoder-8to3-ic";

import {
  SyncCounter74hc161Circuit,
  SyncCounter74hc161Content,
  syncCounter74hc161Experiment,
} from "./semester-02/04-sequential-logic/01-sync-counter-74hc161";

import {
  RippleCounter74hc93Circuit,
  RippleCounter74hc93Content,
  rippleCounter74hc93Experiment,
} from "./semester-02/04-sequential-logic/02-ripple-counter-74hc93";

import {
  IntroLogicGatesCircuit,
  IntroLogicGatesContent,
  introLogicGatesExperiment,
} from "./semester-02/01-digital-electronics/01-intro-logic-gates";

import {
  Encoder4to2Circuit,
  Encoder4to2Content,
  encoder4to2Experiment,
} from "./semester-02/01-digital-electronics/11-encoder-4to2";

import {
  Decoder2to4Circuit,
  Decoder2to4Content,
  decoder2to4Experiment,
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
  FullAdderCircuit,
  FullAdderContent,
  fullAdderExperiment,
} from "./semester-02/01-digital-electronics/04-01-full-adder";

import {
  FullSubtractorCircuit,
  FullSubtractorContent,
  fullSubtractorExperiment,
} from "./semester-02/01-digital-electronics/04-02-full-subtractor";

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
  FullAdderRippleCircuit,
  FullAdderRippleContent,
  fullAdderRippleExperiment,
} from "./semester-02/02-advanced-adders/full-adder-ripple";

import {
  FlipFlopSynthesisCircuit,
  FlipFlopSynthesisContent,
  flipFlopSynthesisExperiment,
} from "./semester-03/04-computer-organisation-architecture/02-flip-flop-synthesis";

import {
  KarnaughMapCircuit,
  KarnaughMapContent,
  karnaughMapExperiment,
} from "./semester-03/04-computer-organisation-architecture/03-karnaugh-map";

import {
  QuineMccluskeyCircuit,
  QuineMccluskeyContent,
  quineMccluskeyExperiment,
} from "./semester-03/04-computer-organisation-architecture/04-quine-mccluskey";

import {
  SignedAdditionCircuit,
  SignedAdditionContent,
  signedAdditionExperiment,
} from "./semester-03/05-computer-arithmetic/signed-addition";
import {
  BoothTraceCircuit,
  BoothTraceContent,
  boothTraceExperiment,
} from "./semester-03/05-computer-arithmetic/booth-trace";
import {
  BcdAdderCircuit,
  BcdAdderContent,
  bcdAdderExperiment,
} from "./semester-03/05-computer-arithmetic/bcd-adder";
import {
  BusTransferCircuit,
  BusTransferContent,
  busTransferExperiment,
} from "./semester-03/05-computer-arithmetic/bus-transfer";
import {
  RegisterTransferCircuit,
  RegisterTransferContent,
  registerTransferExperiment,
} from "./semester-03/05-computer-arithmetic/register-transfer";
import {
  CommonBusCircuit,
  CommonBusContent,
  commonBusExperiment,
} from "./semester-03/05-computer-arithmetic/common-bus";
import {
  TriStateBusCircuit,
  TriStateBusContent,
  triStateBusExperiment,
} from "./semester-03/05-computer-arithmetic/tri-state-bus";
import {
  BinaryAdder4Circuit,
  BinaryAdder4Content,
  binaryAdder4Experiment,
} from "./semester-03/05-computer-arithmetic/binary-adder-4";
import {
  AdderSubtractorCircuit,
  AdderSubtractorContent,
  adderSubtractorExperiment,
} from "./semester-03/05-computer-arithmetic/adder-subtractor";
import {
  BinaryIncrementerCircuit,
  BinaryIncrementerContent,
  binaryIncrementerExperiment,
} from "./semester-03/05-computer-arithmetic/binary-incrementer";
import {
  ArithmeticCircuitCircuit,
  ArithmeticCircuitContent,
  arithmeticCircuitExperiment,
} from "./semester-03/05-computer-arithmetic/arithmetic-circuit";
import {
  CombinationalShifterCircuit,
  CombinationalShifterContent,
  combinationalShifterExperiment,
} from "./semester-03/05-computer-arithmetic/combinational-shifter";
import {
  ArithmeticLogicShiftCircuit,
  ArithmeticLogicShiftContent,
  arithmeticLogicShiftExperiment,
} from "./semester-03/05-computer-arithmetic/arithmetic-logic-shift";
import {
  RepresentationAndAlsuCircuit,
  RepresentationAndAlsuContent,
  representationAndAlsuExperiment,
} from "./semester-03/05-computer-arithmetic/representation-and-alsu";
import {
  BusAndMemoryCircuit,
  BusAndMemoryContent,
  busAndMemoryExperiment,
} from "./semester-03/05-computer-arithmetic/bus-and-memory";
import {
  MagnitudeAddSubCircuit,
  MagnitudeAddSubContent,
  magnitudeAddSubExperiment,
} from "./semester-03/05-computer-arithmetic/magnitude-add-sub";
import {
  BoothAlgorithmCircuit,
  BoothAlgorithmContent,
  boothAlgorithmExperiment,
} from "./semester-03/05-computer-arithmetic/booth-algorithm";
import {
  DecimalArithmeticCircuit,
  DecimalArithmeticContent,
  decimalArithmeticExperiment,
} from "./semester-03/05-computer-arithmetic/decimal-arithmetic";
import {
  InstructionCodesCircuit,
  InstructionCodesContent,
  instructionCodesExperiment,
} from "./semester-03/06-processor-design/instruction-codes";
import {
  ComputerRegistersCircuit,
  ComputerRegistersContent,
  computerRegistersExperiment,
} from "./semester-03/06-processor-design/computer-registers";
import {
  InstructionCycleCircuit,
  InstructionCycleContent,
  instructionCycleExperiment,
} from "./semester-03/06-processor-design/instruction-cycle";
import {
  MemoryReferenceCircuit,
  MemoryReferenceContent,
  memoryReferenceExperiment,
} from "./semester-03/06-processor-design/memory-reference";
import {
  IoInterruptCircuit,
  IoInterruptContent,
  ioInterruptExperiment,
} from "./semester-03/06-processor-design/io-interrupt";
import {
  CompleteComputerDescriptionCircuit,
  CompleteComputerDescriptionContent,
  completeComputerDescriptionExperiment,
} from "./semester-03/06-processor-design/complete-computer-description";
import {
  AccumulatorLogicCircuit,
  AccumulatorLogicContent,
  accumulatorLogicExperiment,
} from "./semester-03/06-processor-design/accumulator-logic";
import {
  BasicComputerCircuit,
  BasicComputerContent,
  basicComputerExperiment,
} from "./semester-03/06-processor-design/basic-computer";
import {
  MicroprogrammedControlCircuit,
  MicroprogrammedControlContent,
  microprogrammedControlExperiment,
} from "./semester-03/06-processor-design/microprogrammed-control";
import {
  RegisterOrganisationCircuit,
  RegisterOrganisationContent,
  registerOrganisationExperiment,
} from "./semester-03/06-processor-design/register-organisation";
import {
  InstructionPipelineCircuit,
  InstructionPipelineContent,
  instructionPipelineExperiment,
} from "./semester-03/06-processor-design/instruction-pipeline";
import {
  ComputerDescriptionCircuit,
  ComputerDescriptionContent,
  computerDescriptionExperiment,
} from "./semester-03/06-processor-design/computer-description";
import {
  InstructionSetCircuit,
  InstructionSetContent,
  instructionSetExperiment,
} from "./semester-03/06-processor-design/instruction-set";
import {
  TimingAndControlCircuit,
  TimingAndControlContent,
  timingAndControlExperiment,
} from "./semester-03/06-processor-design/timing-and-control";
import {
  CompleteComputerCircuit,
  CompleteComputerContent,
  completeComputerExperiment,
} from "./semester-03/06-processor-design/complete-computer";
import {
  AccumulatorUnitCircuit,
  AccumulatorUnitContent,
  accumulatorUnitExperiment,
} from "./semester-03/06-processor-design/accumulator-unit";
import {
  InterruptCycleCircuit,
  InterruptCycleContent,
  interruptCycleExperiment,
} from "./semester-03/06-processor-design/interrupt-cycle";
import {
  GeneralRegistersCircuit,
  GeneralRegistersContent,
  generalRegistersExperiment,
} from "./semester-03/06-processor-design/general-registers";
import {
  StackOrganizationCircuit,
  StackOrganizationContent,
  stackOrganizationExperiment,
} from "./semester-03/06-processor-design/stack-organization";
import {
  InstructionFormatCircuit,
  InstructionFormatContent,
  instructionFormatExperiment,
} from "./semester-03/06-processor-design/instruction-format";
import {
  AddressingModesCircuit,
  AddressingModesContent,
  addressingModesExperiment,
} from "./semester-03/06-processor-design/addressing-modes";
import {
  DataManipulationCircuit,
  DataManipulationContent,
  dataManipulationExperiment,
} from "./semester-03/06-processor-design/data-manipulation";
import {
  ProgramControlCircuit,
  ProgramControlContent,
  programControlExperiment,
} from "./semester-03/06-processor-design/program-control";
import {
  RiscOrganizationCircuit,
  RiscOrganizationContent,
  riscOrganizationExperiment,
} from "./semester-03/06-processor-design/risc-organization";
import {
  CiscOrganizationCircuit,
  CiscOrganizationContent,
  ciscOrganizationExperiment,
} from "./semester-03/06-processor-design/cisc-organization";
import {
  ControlMemoryCircuit,
  ControlMemoryContent,
  controlMemoryExperiment,
} from "./semester-03/06-processor-design/control-memory";
import {
  AddressSequencingCircuit,
  AddressSequencingContent,
  addressSequencingExperiment,
} from "./semester-03/06-processor-design/address-sequencing";
import {
  MicroinstructionFormatCircuit,
  MicroinstructionFormatContent,
  microinstructionFormatExperiment,
} from "./semester-03/06-processor-design/microinstruction-format";
import {
  FlynnTaxonomyCircuit,
  FlynnTaxonomyContent,
  flynnTaxonomyExperiment,
} from "./semester-03/06-processor-design/flynn-taxonomy";
import {
  ParallelProcessingCircuit,
  ParallelProcessingContent,
  parallelProcessingExperiment,
} from "./semester-03/06-processor-design/parallel-processing";
import {
  PipelineOverlapCircuit,
  PipelineOverlapContent,
  pipelineOverlapExperiment,
} from "./semester-03/06-processor-design/pipeline-overlap";
import {
  ArithmeticPipelineCircuit,
  ArithmeticPipelineContent,
  arithmeticPipelineExperiment,
} from "./semester-03/06-processor-design/arithmetic-pipeline";
import {
  InstructionPipeCircuit,
  InstructionPipeContent,
  instructionPipeExperiment,
} from "./semester-03/06-processor-design/instruction-pipe";
import {
  RiscPipelineCircuit,
  RiscPipelineContent,
  riscPipelineExperiment,
} from "./semester-03/06-processor-design/risc-pipeline";
import {
  VectorProcessingCircuit,
  VectorProcessingContent,
  vectorProcessingExperiment,
} from "./semester-03/06-processor-design/vector-processing";
import {
  ArrayProcessorsCircuit,
  ArrayProcessorsContent,
  arrayProcessorsExperiment,
} from "./semester-03/06-processor-design/array-processors";
import {
  MemoryAddressMapCircuit,
  MemoryAddressMapContent,
  memoryAddressMapExperiment,
} from "./semester-03/07-memory-and-io/memory-address-map";
import {
  CacheVirtualCircuit,
  CacheVirtualContent,
  cacheVirtualExperiment,
} from "./semester-03/07-memory-and-io/cache-virtual";
import {
  IoOrganisationCircuit,
  IoOrganisationContent,
  ioOrganisationExperiment,
} from "./semester-03/07-memory-and-io/io-organisation";
import {
  AsyncTransferCircuit,
  AsyncTransferContent,
  asyncTransferExperiment,
} from "./semester-03/07-memory-and-io/async-transfer";
import {
  TransferModesCircuit,
  TransferModesContent,
  transferModesExperiment,
} from "./semester-03/07-memory-and-io/transfer-modes";
import {
  PriorityInterruptCircuit,
  PriorityInterruptContent,
  priorityInterruptExperiment,
} from "./semester-03/07-memory-and-io/priority-interrupt";
import {
  DmaTransferCircuit,
  DmaTransferContent,
  dmaTransferExperiment,
} from "./semester-03/07-memory-and-io/dma-transfer";
import {
  IoProcessorCircuit,
  IoProcessorContent,
  ioProcessorExperiment,
} from "./semester-03/07-memory-and-io/io-processor";
import {
  AssemblerSecondPassCircuit,
  AssemblerSecondPassContent,
  assemblerSecondPassExperiment,
} from "./semester-03/08-assembly-systems/assembler-second-pass";
import {
  MachineAndAssemblyCircuit,
  MachineAndAssemblyContent,
  machineAndAssemblyExperiment,
} from "./semester-03/08-assembly-systems/machine-and-assembly";
import {
  ProgramLoopCircuit,
  ProgramLoopContent,
  programLoopExperiment,
} from "./semester-03/08-assembly-systems/program-loop";
import {
  SubroutineAndIoCircuit,
  SubroutineAndIoContent,
  subroutineAndIoExperiment,
} from "./semester-03/08-assembly-systems/subroutine-and-io";

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

import {
  PinLabelling8085Circuit,
  PinLabelling8085Content,
  pinLabelling8085Experiment,
} from "./semester-04/03-microprocessors-and-microcontrollers/8085-pin-labelling";

import {
  OsiModelJourneyCircuit,
  OsiModelJourneyContent,
  osiModelJourneyExperiment,
} from "./semester-05/01-computer-networks/osi-model-journey";

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
        ["rectifier", "bridge", "full-wave", "ripple"],
      ),
      fromBuilt(ceAmplifierExperiment, CeAmplifierCircuit, CeAmplifierContent, [
        "bjt",
        "amplifier",
        "common emitter",
        "frequency response",
        "gain",
      ]),
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
      fromBuilt(
        invertingNonInvertingOpampExperiment,
        InvertingNonInvertingOpampCircuit,
        InvertingNonInvertingOpampContent,
        ["op-amp", "lm741", "inverting", "non-inverting", "voltage gain"],
      ),
      fromBuilt(rcFiltersExperiment, RcFiltersCircuit, RcFiltersContent, [
        "rc filter",
        "low-pass",
        "high-pass",
        "cut-off frequency",
        "bode plot",
        "CRO",
      ]),
      fromBuilt(rcTransientExperiment, RcTransientCircuit, RcTransientContent, [
        "rc circuit",
        "time constant",
        "charging",
        "discharging",
        "square wave",
        "CRO",
      ]),
      fromBuilt(
        seriesRlcResonanceExperiment,
        SeriesRlcResonanceCircuit,
        SeriesRlcResonanceContent,
        ["rlc", "resonance", "inductor", "quality factor", "bandwidth", "CRO"],
      ),
      fromBuilt(
        transistorSwitchExperiment,
        TransistorSwitchCircuit,
        TransistorSwitchContent,
        ["bjt", "bc547", "switch", "saturation", "cut-off", "led driver"],
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
      fromBuilt(logicGatesExperiment, LogicGatesCircuit, LogicGatesContent, [
        "logic gates",
        "and",
        "or",
        "not",
        "nand",
        "nor",
        "xor",
        "74hc",
      ]),

      fromBuilt(
        halfSubtractorExperiment,
        HalfSubtractorCircuit,
        HalfSubtractorContent,
        ["subtractor", "difference", "borrow", "xor", "not", "and"],
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
    defaultCircuitId: "encoder-4to2",
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
        ["subtractor", "borrow-in", "difference", "borrow-out", "multi-bit"],
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
      fromBuilt(encoder4to2Experiment, Encoder4to2Circuit, Encoder4to2Content, [
        "encoder",
        "priority",
        "binary code",
        "or gate",
        "74hc32",
      ]),
      fromBuilt(decoder2to4Experiment, Decoder2to4Circuit, Decoder2to4Content, [
        "decoder",
        "binary",
        "address decode",
        "not",
        "and",
        "74hc04",
        "74hc08",
      ]),
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
      "Timing-focused adder labs. The 4-bit ripple-carry adder is listed under Semester 3, C.O.A.",
    defaultCircuitId: "half-adder-revisit",
    experiments: [
      // fromBuilt(
      //   halfAdderRevisitExperiment,
      //   HalfAdderRevisitCircuit,
      //   HalfAdderRevisitContent,
      //   [
      //     "adder",
      //     "propagation delay",
      //     "fan-out",
      //     "74hc",
      //     "timing",
      //     "oscilloscope",
      //   ],
      // ),
      // fromBuilt(
      //   fullAdderRippleExperiment,
      //   FullAdderRippleCircuit,
      //   FullAdderRippleContent,
      //   ["ripple carry", "4-bit adder", "carry propagation", "alu", "delay"],
      // ),
    ],
  },
  {
    semesterId: "semester-2",
    semesterLabel: "Semester 2",
    subjectId: "03-combinational-logic",
    subjectLabel: "Combinational Logic",
    subjectDescription:
      "Use MSI combinational ICs on a breadboard: decode a 3-bit address with the 74HC138 and encode eight inputs by priority with the 74HC148, including active-low outputs and enable cascading.",
    defaultCircuitId: "decoder-3to8-ic",
    experiments: [
      fromBuilt(
        decoder3to8IcExperiment,
        Decoder3to8IcCircuit,
        Decoder3to8IcContent,
        [
          "decoder",
          "3:8 decoder",
          "74hc138",
          "active-low",
          "enable",
          "combinational",
        ],
      ),
      fromBuilt(
        priorityEncoder8to3IcExperiment,
        PriorityEncoder8to3IcCircuit,
        PriorityEncoder8to3IcContent,
        [
          "encoder",
          "priority encoder",
          "8:3 encoder",
          "74hc148",
          "active-low",
          "combinational",
        ],
      ),
    ],
  },
  {
    semesterId: "semester-2",
    semesterLabel: "Semester 2",
    subjectId: "04-sequential-logic",
    subjectLabel: "Sequential Logic",
    subjectDescription:
      "Build counters from MSI ICs clocked by a function generator: a synchronous 74HC161 with synchronous load and an asynchronous 74HC93 ripple counter, each converted to a MOD-10 decade counter.",
    defaultCircuitId: "sync-counter-74hc161",
    experiments: [
      fromBuilt(
        syncCounter74hc161Experiment,
        SyncCounter74hc161Circuit,
        SyncCounter74hc161Content,
        [
          "counter",
          "synchronous",
          "74hc161",
          "mod-16",
          "mod-10",
          "decade",
          "sequential",
        ],
      ),
      fromBuilt(
        rippleCounter74hc93Experiment,
        RippleCounter74hc93Circuit,
        RippleCounter74hc93Content,
        [
          "counter",
          "ripple counter",
          "asynchronous",
          "74hc93",
          "mod-16",
          "decade",
          "sequential",
        ],
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
      "Review gates and Boolean algebra before the Computer Organisation labs. The adders, multipliers, and registers from this track now live under C.O.A.",
    defaultCircuitId: "cla-adder",
    experiments: [
      fromBuilt(
        introGatesReviewExperiment,
        IntroGatesReviewCircuit,
        IntroGatesReviewContent,
        ["gates", "review", "boolean algebra", "de morgan", "theory"],
      ),
    ],
  },
  {
    semesterId: "semester-3",
    semesterLabel: "Semester 3",
    subjectId: "04-computer-organisation-architecture",
    subjectLabel: "C.O.A.",
    subjectDescription:
      "Computer Organisation and Architecture, in the IIT Kharagpur virtual-lab order: ripple-carry and carry-lookahead adders, Wallace tree, flip-flop synthesis, registers, multipliers, the ALU, memory, both caches, a small CPU, then K-map and Quine–McCluskey.",
    defaultCircuitId: "full-adder-ripple",
    experiments: [
      fromBuilt(
        fullAdderRippleExperiment,
        FullAdderRippleCircuit,
        FullAdderRippleContent,
        [
          "ripple carry",
          "full adder",
          "carry chain",
          "propagation delay",
          "adder",
        ],
      ),
      fromBuilt(claAdderExperiment, ClaAdderCircuit, ClaAdderContent, [
        "carry lookahead",
        "cla",
        "adder",
        "generate",
        "propagate",
        "theory",
      ]),
      fromBuilt(wallaceTreeExperiment, WallaceTreeCircuit, WallaceTreeContent, [
        "wallace tree",
        "multiplier",
        "partial products",
        "fast adder",
        "theory",
      ]),
      fromBuilt(
        flipFlopSynthesisExperiment,
        FlipFlopSynthesisCircuit,
        FlipFlopSynthesisContent,
        [
          "flip-flop",
          "jk",
          "excitation table",
          "characteristic equation",
          "d flip-flop",
        ],
      ),
      fromBuilt(
        registersCountersTheoryExperiment,
        RegistersCountersTheoryCircuit,
        RegistersCountersTheoryContent,
        ["registers", "counters", "shift register", "binary counter", "theory"],
      ),
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
        cacheAssociativeExperiment,
        CacheAssociativeCircuit,
        CacheAssociativeContent,
        ["cache", "fully associative", "lru", "replacement policy", "memory"],
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
      fromBuilt(cpuDesignExperiment, CpuDesignCircuit, CpuDesignContent, [
        "cpu",
        "fetch decode execute",
        "instruction cycle",
        "register file",
        "simulation",
      ]),
      fromBuilt(karnaughMapExperiment, KarnaughMapCircuit, KarnaughMapContent, [
        "karnaugh",
        "k-map",
        "minimisation",
        "sum of products",
        "boolean",
      ]),
      fromBuilt(
        quineMccluskeyExperiment,
        QuineMccluskeyCircuit,
        QuineMccluskeyContent,
        [
          "quine-mccluskey",
          "prime implicant",
          "tabular minimisation",
          "boolean",
        ],
      ),
    ],
  },
  {
    semesterId: "semester-3",
    semesterLabel: "Semester 3",
    subjectId: "05-computer-arithmetic",
    subjectLabel: "Computer Arithmetic",
    subjectDescription:
      "Draw a register and the transfer R2 ← R1, build a common bus with multiplexers and again with tri-state buffers, add 1101 and 0111, add or subtract with one mode bit, increment 1101, and run all eight arithmetic microoperations on one circuit. Then shift 1101 left or right, and combine arithmetic, logic, and shift in one unit. Then add signed magnitudes, multiply with Booth, correct a BCD sum, and read or write memory.",
    defaultCircuitId: "bcd-adder",
    experiments: [
      fromBuilt(
        halfAdderSubtractorExperiment,
        HalfAdderSubtractorCircuit,
        HalfAdderSubtractorContent,
        ["half adder", "sum", "carry", "xor"],
      ),
      fromBuilt(fullAdderExperiment, FullAdderCircuit, FullAdderContent, [
        "full adder",
        "carry-in",
        "sum",
        "carry-out",
      ]),
      fromBuilt(
        fullAdderRippleExperiment,
        FullAdderRippleCircuit,
        FullAdderRippleContent,
        ["ripple adder", "4-bit", "74hc283"],
      ),
      fromBuilt(
        signedAdditionExperiment,
        SignedAdditionCircuit,
        SignedAdditionContent,
        ["signed", "addition", "subtraction", "overflow", "avf"],
      ),
      fromBuilt(boothTraceExperiment, BoothTraceCircuit, BoothTraceContent, [
        "booth",
        "signed multiplication",
        "arithmetic shift",
      ]),
      fromBuilt(bcdAdderExperiment, BcdAdderCircuit, BcdAdderContent, [
        "bcd",
        "adder",
        "correction",
        "74hc283",
      ]),
      fromBuilt(busTransferExperiment, BusTransferCircuit, BusTransferContent, [
        "bus",
        "shift",
        "multiplexer",
        "register",
      ]),
      fromBuilt(
        registerTransferExperiment,
        RegisterTransferCircuit,
        RegisterTransferContent,
        ["register transfer", "R2 ← R1", "control function", "PC"],
      ),
      fromBuilt(commonBusExperiment, CommonBusCircuit, CommonBusContent, [
        "common bus",
        "multiplexer",
        "S1 S0",
        "four registers",
      ]),
      fromBuilt(triStateBusExperiment, TriStateBusCircuit, TriStateBusContent, [
        "common bus",
        "tri-state",
        "decoder",
        "high impedance",
      ]),
      fromBuilt(
        binaryAdder4Experiment,
        BinaryAdder4Circuit,
        BinaryAdder4Content,
        ["4-bit adder", "full adder", "1101 + 0111", "carry"],
      ),
      fromBuilt(
        adderSubtractorExperiment,
        AdderSubtractorCircuit,
        AdderSubtractorContent,
        ["adder-subtractor", "mode M", "XOR", "2's complement"],
      ),
      fromBuilt(
        binaryIncrementerExperiment,
        BinaryIncrementerCircuit,
        BinaryIncrementerContent,
        ["increment", "half adder", "1101 + 1", "carry"],
      ),
      fromBuilt(
        arithmeticCircuitExperiment,
        ArithmeticCircuitCircuit,
        ArithmeticCircuitContent,
        ["arithmetic circuit", "multiplexer", "decrement", "microoperation"],
      ),
      fromBuilt(
        combinationalShifterExperiment,
        CombinationalShifterCircuit,
        CombinationalShifterContent,
        ["shifter", "logical shift", "circular shift", "arithmetic shift"],
      ),
      fromBuilt(
        arithmeticLogicShiftExperiment,
        ArithmeticLogicShiftCircuit,
        ArithmeticLogicShiftContent,
        ["ALU", "arithmetic logic shift", "multiplexer", "1101"],
      ),
      fromBuilt(
        representationAndAlsuExperiment,
        RepresentationAndAlsuCircuit,
        RepresentationAndAlsuContent,
        [
          "data types",
          "complements",
          "fixed point",
          "floating point",
          "register transfer",
          "three-state",
          "alsu",
          "micro-operation",
        ],
      ),
      fromBuilt(
        busAndMemoryExperiment,
        BusAndMemoryCircuit,
        BusAndMemoryContent,
        [
          "bus",
          "memory transfer",
          "three-state",
          "read",
          "write",
          "address register",
        ],
      ),
      fromBuilt(
        magnitudeAddSubExperiment,
        MagnitudeAddSubCircuit,
        MagnitudeAddSubContent,
        ["addition and subtraction"],
      ),
      fromBuilt(
        boothAlgorithmExperiment,
        BoothAlgorithmCircuit,
        BoothAlgorithmContent,
        ["booth's algorithm"],
      ),
      fromBuilt(
        decimalArithmeticExperiment,
        DecimalArithmeticCircuit,
        DecimalArithmeticContent,
        ["decimal arithmetic"],
      ),
    ],
  },
  {
    semesterId: "semester-3",
    semesterLabel: "Semester 3",
    subjectId: "06-processor-design",
    subjectLabel: "Processor Design",
    subjectDescription:
      "Read instruction codes and a stored program, then fetch, time, and interrupt a basic computer, and follow register, stack, addressing, RISC and CISC, microprogram, Flynn, and pipeline flowcharts.",
    defaultCircuitId: "basic-computer",
    experiments: [
      fromBuilt(
        instructionCodesExperiment,
        InstructionCodesCircuit,
        InstructionCodesContent,
        [
          "instruction code",
          "opcode",
          "stored program",
          "direct",
          "indirect",
          "ADD 1547",
        ],
      ),
      fromBuilt(
        computerRegistersExperiment,
        ComputerRegistersCircuit,
        ComputerRegistersContent,
        ["computer registers", "PC", "AR", "AC", "common bus", "DR"],
      ),
      fromBuilt(
        instructionCycleExperiment,
        InstructionCycleCircuit,
        InstructionCycleContent,
        ["instruction cycle", "fetch", "decode", "D7", "T0", "indirect"],
      ),
      fromBuilt(
        memoryReferenceExperiment,
        MemoryReferenceCircuit,
        MemoryReferenceContent,
        ["memory reference", "AND", "ADD", "LDA", "STA", "BUN", "BSA", "ISZ"],
      ),
      fromBuilt(ioInterruptExperiment, IoInterruptCircuit, IoInterruptContent, [
        "input output",
        "interrupt",
        "INPR",
        "OUTR",
        "FGI",
        "FGO",
        "IEN",
      ]),
      fromBuilt(
        completeComputerDescriptionExperiment,
        CompleteComputerDescriptionCircuit,
        CompleteComputerDescriptionContent,
        [
          "complete computer",
          "instruction cycle",
          "interrupt",
          "D7",
          "R",
          "SC",
        ],
      ),
      fromBuilt(
        accumulatorLogicExperiment,
        AccumulatorLogicCircuit,
        AccumulatorLogicContent,
        ["accumulator", "LD", "INR", "CLR", "AND", "ADD", "CMA"],
      ),
      fromBuilt(
        basicComputerExperiment,
        BasicComputerCircuit,
        BasicComputerContent,
        ["cpu", "fetch", "direct", "indirect", "addressing"],
      ),
      fromBuilt(
        microprogrammedControlExperiment,
        MicroprogrammedControlCircuit,
        MicroprogrammedControlContent,
        ["microprogram", "control memory", "car", "rom"],
      ),
      fromBuilt(
        registerOrganisationExperiment,
        RegisterOrganisationCircuit,
        RegisterOrganisationContent,
        ["register file", "mux", "stack", "addressing mode"],
      ),
      fromBuilt(
        instructionPipelineExperiment,
        InstructionPipelineCircuit,
        InstructionPipelineContent,
        ["pipeline", "flynn", "branch", "speedup"],
      ),
      fromBuilt(
        computerDescriptionExperiment,
        ComputerDescriptionCircuit,
        ComputerDescriptionContent,
        [
          "instruction",
          "opcode",
          "instruction cycle",
          "accumulator",
          "memory reference",
          "interrupt",
        ],
      ),
      fromBuilt(
        instructionSetExperiment,
        InstructionSetCircuit,
        InstructionSetContent,
        [
          "instruction code",
          "opcode",
          "memory reference",
          "register reference",
          "i/o",
        ],
      ),
      fromBuilt(
        timingAndControlExperiment,
        TimingAndControlCircuit,
        TimingAndControlContent,
        ["timing", "sequence counter", "control", "T0", "direct"],
      ),
      fromBuilt(
        completeComputerExperiment,
        CompleteComputerCircuit,
        CompleteComputerContent,
        ["computer", "bus", "register", "control unit", "memory"],
      ),
      fromBuilt(
        accumulatorUnitExperiment,
        AccumulatorUnitCircuit,
        AccumulatorUnitContent,
        ["accumulator", "add", "and", "complement", "shift"],
      ),
      fromBuilt(
        interruptCycleExperiment,
        InterruptCycleCircuit,
        InterruptCycleContent,
        ["interrupt", "ien", "fgi", "service routine", "i/o"],
      ),
      fromBuilt(
        generalRegistersExperiment,
        GeneralRegistersCircuit,
        GeneralRegistersContent,
        ["general register organization"],
      ),
      fromBuilt(
        stackOrganizationExperiment,
        StackOrganizationCircuit,
        StackOrganizationContent,
        ["stack organization"],
      ),
      fromBuilt(
        instructionFormatExperiment,
        InstructionFormatCircuit,
        InstructionFormatContent,
        ["instruction format"],
      ),
      fromBuilt(
        addressingModesExperiment,
        AddressingModesCircuit,
        AddressingModesContent,
        ["addressing modes"],
      ),
      fromBuilt(
        dataManipulationExperiment,
        DataManipulationCircuit,
        DataManipulationContent,
        ["data transfer and manipulation"],
      ),
      fromBuilt(
        programControlExperiment,
        ProgramControlCircuit,
        ProgramControlContent,
        ["program control"],
      ),
      fromBuilt(
        riscOrganizationExperiment,
        RiscOrganizationCircuit,
        RiscOrganizationContent,
        ["risc"],
      ),
      fromBuilt(
        ciscOrganizationExperiment,
        CiscOrganizationCircuit,
        CiscOrganizationContent,
        ["cisc"],
      ),
      fromBuilt(
        controlMemoryExperiment,
        ControlMemoryCircuit,
        ControlMemoryContent,
        ["control memory"],
      ),
      fromBuilt(
        addressSequencingExperiment,
        AddressSequencingCircuit,
        AddressSequencingContent,
        ["address sequencing"],
      ),
      fromBuilt(
        microinstructionFormatExperiment,
        MicroinstructionFormatCircuit,
        MicroinstructionFormatContent,
        ["microinstruction format"],
      ),
      fromBuilt(
        flynnTaxonomyExperiment,
        FlynnTaxonomyCircuit,
        FlynnTaxonomyContent,
        ["flynn's taxonomy"],
      ),
      fromBuilt(
        parallelProcessingExperiment,
        ParallelProcessingCircuit,
        ParallelProcessingContent,
        ["parallel processing"],
      ),
      fromBuilt(
        pipelineOverlapExperiment,
        PipelineOverlapCircuit,
        PipelineOverlapContent,
        ["pipelining"],
      ),
      fromBuilt(
        arithmeticPipelineExperiment,
        ArithmeticPipelineCircuit,
        ArithmeticPipelineContent,
        ["arithmetic pipeline"],
      ),
      fromBuilt(
        instructionPipeExperiment,
        InstructionPipeCircuit,
        InstructionPipeContent,
        ["instruction pipeline"],
      ),
      fromBuilt(
        riscPipelineExperiment,
        RiscPipelineCircuit,
        RiscPipelineContent,
        ["risc pipeline"],
      ),
      fromBuilt(
        vectorProcessingExperiment,
        VectorProcessingCircuit,
        VectorProcessingContent,
        ["vector processing"],
      ),
      fromBuilt(
        arrayProcessorsExperiment,
        ArrayProcessorsCircuit,
        ArrayProcessorsContent,
        ["array processors"],
      ),
    ],
  },
  {
    semesterId: "semester-3",
    semesterLabel: "Semester 3",
    subjectId: "07-memory-and-io",
    subjectLabel: "Memory and I/O",
    subjectDescription:
      "Map two ROMs, compare caches, strobe a port, then follow handshake, transfer mode, priority, DMA, and IOP flowcharts.",
    defaultCircuitId: "memory-address-map",
    experiments: [
      fromBuilt(
        memoryAddressMapExperiment,
        MemoryAddressMapCircuit,
        MemoryAddressMapContent,
        ["memory map", "rom", "decoder", "sram", "dram"],
      ),
      fromBuilt(
        cacheVirtualExperiment,
        CacheVirtualCircuit,
        CacheVirtualContent,
        ["cache", "direct mapped", "associative", "virtual memory", "page"],
      ),
      fromBuilt(
        ioOrganisationExperiment,
        IoOrganisationCircuit,
        IoOrganisationContent,
        ["i/o", "strobe", "interrupt", "dma", "handshake"],
      ),
      fromBuilt(
        asyncTransferExperiment,
        AsyncTransferCircuit,
        AsyncTransferContent,
        ["asynchronous data transfer"],
      ),
      fromBuilt(
        transferModesExperiment,
        TransferModesCircuit,
        TransferModesContent,
        ["modes of transfer"],
      ),
      fromBuilt(
        priorityInterruptExperiment,
        PriorityInterruptCircuit,
        PriorityInterruptContent,
        ["priority interrupt"],
      ),
      fromBuilt(dmaTransferExperiment, DmaTransferCircuit, DmaTransferContent, [
        "dma",
      ]),
      fromBuilt(ioProcessorExperiment, IoProcessorCircuit, IoProcessorContent, [
        "input-output processor",
      ]),
    ],
  },
  {
    semesterId: "semester-3",
    semesterLabel: "Semester 3",
    subjectId: "08-assembly-systems",
    subjectLabel: "Assembly Systems",
    subjectDescription:
      "Walk the second pass of an assembler, compare a machine word with its assembly line, trace a counted loop, and call a subroutine that waits for input.",
    defaultCircuitId: "assembler-second-pass",
    experiments: [
      fromBuilt(
        assemblerSecondPassExperiment,
        AssemblerSecondPassCircuit,
        AssemblerSecondPassContent,
        [
          "assembler",
          "second pass",
          "machine language",
          "assembly language",
          "subroutine",
          "loop",
          "i/o programming",
        ],
      ),
      fromBuilt(
        machineAndAssemblyExperiment,
        MachineAndAssemblyCircuit,
        MachineAndAssemblyContent,
        ["machine language", "assembly language", "arithmetic", "logic"],
      ),
      fromBuilt(programLoopExperiment, ProgramLoopCircuit, ProgramLoopContent, [
        "loop",
        "branch",
        "sza",
        "count",
      ]),
      fromBuilt(
        subroutineAndIoExperiment,
        SubroutineAndIoCircuit,
        SubroutineAndIoContent,
        ["subroutine", "bsa", "return", "i/o", "ski", "inp"],
      ),
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
  {
    semesterId: "semester-4",
    semesterLabel: "Semester 4",
    subjectId: "03-microprocessors-and-microcontrollers",
    subjectLabel: "Microprocessors and Microcontrollers",
    subjectDescription:
      "What a microprocessor is, why the 8085 was built, and what each of its 40 pins does in a machine cycle.",
    defaultCircuitId: "8085-pin-labelling",
    experiments: [
      fromBuilt(
        pinLabelling8085Experiment,
        PinLabelling8085Circuit,
        PinLabelling8085Content,
        [
          "8085",
          "microprocessor",
          "microcontroller",
          "pin diagram",
          "ALE",
          "multiplexed bus",
        ],
      ),
    ],
  },
  {
    semesterId: "semester-5",
    semesterLabel: "Semester 5",
    subjectId: "01-computer-networks",
    subjectLabel: "Computer Networks",
    subjectDescription:
      "How data crosses a network: the OSI layers, addressing, switching, and routing.",
    defaultCircuitId: "osi-model-journey",
    experiments: [
      fromBuilt(
        osiModelJourneyExperiment,
        OsiModelJourneyCircuit,
        OsiModelJourneyContent,
        [
          "OSI model",
          "encapsulation",
          "TCP/IP",
          "Ethernet",
          "switch",
          "router",
          "packet",
          "frame",
        ],
      ),
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

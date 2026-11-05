import type { SchematicData } from "@/labs/CircuitSchematic";

import * as s1_StudyBasicComponents from "./semester-01/01-analog-electronics/01-study-basic-components";
import * as s1_PnJunctionDiode from "./semester-01/01-analog-electronics/02-pn-junction-diode";
import * as s1_ZenerDiode from "./semester-01/01-analog-electronics/03-zener-diode";
import * as s1_ZenerVoltageRegulator from "./semester-01/01-analog-electronics/04-zener-voltage-regulator";
import * as s1_HalfWaveRectifier from "./semester-01/01-analog-electronics/05-half-wave-rectifier";
import * as s1_FullWaveRectifier from "./semester-01/01-analog-electronics/06-full-wave-rectifier";
import * as s1_CeAmplifier from "./semester-01/01-analog-electronics/07-ce-amplifier";
import * as s1_CbTransistorCharacteristics from "./semester-01/01-analog-electronics/08-cb-transistor-characteristics";
import * as s1_CbAmplifier from "./semester-01/01-analog-electronics/09-cb-amplifier";
import * as s1_BjtBias from "./semester-01/01-analog-electronics/10-bjt-bias";
import * as s1_InvertingNonInvertingOpamp from "./semester-01/01-analog-electronics/10-inverting-non-inverting-opamp";
import * as s1_MosfetCharacteristics from "./semester-01/01-analog-electronics/11-mosfet-characteristics";
import * as s1_MosfetCommonSource from "./semester-01/01-analog-electronics/12-mosfet-common-source";
import * as s1_OpampCircuits from "./semester-01/01-analog-electronics/13-opamp-circuits";
import * as s1_RcFilters from "./semester-01/01-analog-electronics/14-rc-filters";
import * as s1_RcTransient from "./semester-01/01-analog-electronics/15-rc-transient";
import * as s1_SeriesRlcResonance from "./semester-01/01-analog-electronics/16-series-rlc-resonance";
import * as s1_TransistorSwitch from "./semester-01/01-analog-electronics/17-transistor-switch";
import * as s1_OhmsLaw from "./semester-01/01-analog-electronics/ohms-law";
import * as s1_RectifiersCapacitorFilters from "./semester-01/01-analog-electronics/rectifiers-capacitor-filters";
import * as s1_Demux1to2 from "./semester-01/02-computer-application/demux-1to2";
import * as s1_FullAdder from "./semester-01/02-computer-application/full-adder";
import * as s1_FullSubtractor from "./semester-01/02-computer-application/full-subtractor";
import * as s1_HalfAdder from "./semester-01/02-computer-application/half-adder";
import * as s1_HalfSubtractor from "./semester-01/02-computer-application/half-subtractor";
import * as s1_LogicGates from "./semester-01/02-computer-application/logic-gates";
import * as s1_Mux2to1 from "./semester-01/02-computer-application/mux-2to1";
import * as s1_KirchhoffLaws from "./semester-01/03-FEE/kirchhoff-laws";
import * as s1_NortonTheorem from "./semester-01/03-FEE/norton-theorem";
import * as s1_SuperpositionTheorem from "./semester-01/03-FEE/superposition-theorem";
import * as s1_TheveninTheorem from "./semester-01/03-FEE/thevenin-theorem";
import * as s2_IntroLogicGates from "./semester-02/01-digital-electronics/01-intro-logic-gates";
import * as s2_GateLevelMinimization from "./semester-02/01-digital-electronics/02-gate-level-minimization";
import * as s2_HalfAdderSubtractor from "./semester-02/01-digital-electronics/03-half-adder-subtractor";
import * as s2_FullAdder from "./semester-02/01-digital-electronics/04-01-full-adder";
import * as s2_FullSubtractor from "./semester-02/01-digital-electronics/04-02-full-subtractor";
import * as s2_BcdXs3Converter from "./semester-02/01-digital-electronics/05-bcd-xs3-converter";
import * as s2_GrayBinaryConverter from "./semester-02/01-digital-electronics/06-gray-binary-converter";
import * as s2_Mux4to1Ic from "./semester-02/01-digital-electronics/08-mux-4to1-ic";
import * as s2_Demux1to4Ic from "./semester-02/01-digital-electronics/09-demux-1to4-ic";
import * as s2_DemuxAddressDecoder from "./semester-02/01-digital-electronics/10-demux-address-decoder";
import * as s2_Encoder4to2 from "./semester-02/01-digital-electronics/11-encoder-4to2";
import * as s2_Decoder2to4 from "./semester-02/01-digital-electronics/12-decoder-2to4";
import * as s2_BinaryAdder4bit from "./semester-02/01-digital-electronics/13-binary-adder-4bit";
import * as s2_BinarySubtractor4bit from "./semester-02/01-digital-electronics/14-binary-subtractor-4bit";
import * as s2_DFlipFlop from "./semester-02/01-digital-electronics/15-d-flip-flop";
import * as s2_JkTFlipFlop from "./semester-02/01-digital-electronics/16-jk-t-flip-flop";
import * as s2_Mod5Counter from "./semester-02/01-digital-electronics/17-mod5-counter";
import * as s2_Decoder3to8Ic from "./semester-02/03-combinational-logic/01-decoder-3to8-ic";
import * as s2_PriorityEncoder8to3Ic from "./semester-02/03-combinational-logic/02-priority-encoder-8to3-ic";
import * as s2_SyncCounter74hc161 from "./semester-02/04-sequential-logic/01-sync-counter-74hc161";
import * as s2_RippleCounter74hc93 from "./semester-02/04-sequential-logic/02-ripple-counter-74hc93";
import * as s2_MuxBasedLogic from "./semester-02/01-digital-electronics/mux-based-logic";
import * as s2_SrLatch from "./semester-02/01-digital-electronics/sr-latch";
import * as s2_FullAdderRipple from "./semester-02/02-advanced-adders/full-adder-ripple";
import * as s3_ClaAdder from "./semester-03/01-combinational-arithmetic/cla-adder";
import * as s3_WallaceTree from "./semester-03/01-combinational-arithmetic/wallace-tree";
import * as s3_ArrayMultiplier from "./semester-03/01-combinational-arithmetic/combinational-multipliers";
import * as s3_BoothMultiplier from "./semester-03/01-combinational-arithmetic/booths-multiplier";
import * as s3_RegistersCounters from "./semester-03/01-combinational-arithmetic/registers-counters-theory";
import * as s3_AluSlice from "./semester-03/02-memory-cpu-systems/alu-simulation";
import * as s3_MemoryDesign from "./semester-03/02-memory-cpu-systems/memory-design";
import * as s3_CacheAssociative from "./semester-03/02-memory-cpu-systems/cache-associative";
import * as s3_CacheDirect from "./semester-03/02-memory-cpu-systems/cache-direct-mapped";
import * as s3_CpuDesign from "./semester-03/02-memory-cpu-systems/cpu-design";
import * as s3_FlipFlopSynthesis from "./semester-03/04-computer-organisation-architecture/02-flip-flop-synthesis";
import * as s3_KarnaughMap from "./semester-03/04-computer-organisation-architecture/03-karnaugh-map";
import * as s3_QuineMccluskey from "./semester-03/04-computer-organisation-architecture/04-quine-mccluskey";
import * as s3_SignedAddition from "./semester-03/05-computer-arithmetic/signed-addition";
import * as s3_BoothTrace from "./semester-03/05-computer-arithmetic/booth-trace";
import * as s3_BcdAdder from "./semester-03/05-computer-arithmetic/bcd-adder";
import * as s3_BusTransfer from "./semester-03/05-computer-arithmetic/bus-transfer";
import * as s3_RegisterTransfer from "./semester-03/05-computer-arithmetic/register-transfer";
import * as s3_CommonBus from "./semester-03/05-computer-arithmetic/common-bus";
import * as s3_TriStateBus from "./semester-03/05-computer-arithmetic/tri-state-bus";
import * as s3_BinaryAdder4 from "./semester-03/05-computer-arithmetic/binary-adder-4";
import * as s3_AdderSubtractor from "./semester-03/05-computer-arithmetic/adder-subtractor";
import * as s3_BinaryIncrementer from "./semester-03/05-computer-arithmetic/binary-incrementer";
import * as s3_ArithmeticCircuit from "./semester-03/05-computer-arithmetic/arithmetic-circuit";
import * as s3_CombinationalShifter from "./semester-03/05-computer-arithmetic/combinational-shifter";
import * as s3_ArithmeticLogicShift from "./semester-03/05-computer-arithmetic/arithmetic-logic-shift";
import * as s3_Representation from "./semester-03/05-computer-arithmetic/representation-and-alsu";
import * as s3_BusAndMemory from "./semester-03/05-computer-arithmetic/bus-and-memory";
import * as s3_BasicComputer from "./semester-03/06-processor-design/basic-computer";
import * as s3_Microprogram from "./semester-03/06-processor-design/microprogrammed-control";
import * as s3_RegisterOrg from "./semester-03/06-processor-design/register-organisation";
import * as s3_Pipeline from "./semester-03/06-processor-design/instruction-pipeline";
import * as s3_ComputerDescription from "./semester-03/06-processor-design/computer-description";
import * as s3_InstructionSet from "./semester-03/06-processor-design/instruction-set";
import * as s3_TimingAndControl from "./semester-03/06-processor-design/timing-and-control";
import * as s3_CompleteComputer from "./semester-03/06-processor-design/complete-computer";
import * as s3_AccumulatorUnit from "./semester-03/06-processor-design/accumulator-unit";
import * as s3_InterruptCycle from "./semester-03/06-processor-design/interrupt-cycle";
import * as s3_MagnitudeAddSub from "./semester-03/05-computer-arithmetic/magnitude-add-sub";
import * as s3_BoothAlgorithm from "./semester-03/05-computer-arithmetic/booth-algorithm";
import * as s3_DecimalArithmetic from "./semester-03/05-computer-arithmetic/decimal-arithmetic";
import * as s3_GeneralRegisters from "./semester-03/06-processor-design/general-registers";
import * as s3_StackOrganization from "./semester-03/06-processor-design/stack-organization";
import * as s3_InstructionFormat from "./semester-03/06-processor-design/instruction-format";
import * as s3_InstructionCodes from "./semester-03/06-processor-design/instruction-codes";
import * as s3_ComputerRegisters from "./semester-03/06-processor-design/computer-registers";
import * as s3_InstructionCycle from "./semester-03/06-processor-design/instruction-cycle";
import * as s3_MemoryReference from "./semester-03/06-processor-design/memory-reference";
import * as s3_IoInterrupt from "./semester-03/06-processor-design/io-interrupt";
import * as s3_CompleteComputerDescription from "./semester-03/06-processor-design/complete-computer-description";
import * as s3_AccumulatorLogic from "./semester-03/06-processor-design/accumulator-logic";
import * as s3_AddressingModes from "./semester-03/06-processor-design/addressing-modes";
import * as s3_DataManipulation from "./semester-03/06-processor-design/data-manipulation";
import * as s3_ProgramControl from "./semester-03/06-processor-design/program-control";
import * as s3_RiscOrganization from "./semester-03/06-processor-design/risc-organization";
import * as s3_CiscOrganization from "./semester-03/06-processor-design/cisc-organization";
import * as s3_ControlMemory from "./semester-03/06-processor-design/control-memory";
import * as s3_AddressSequencing from "./semester-03/06-processor-design/address-sequencing";
import * as s3_MicroinstructionFormat from "./semester-03/06-processor-design/microinstruction-format";
import * as s3_FlynnTaxonomy from "./semester-03/06-processor-design/flynn-taxonomy";
import * as s3_ParallelProcessing from "./semester-03/06-processor-design/parallel-processing";
import * as s3_PipelineOverlap from "./semester-03/06-processor-design/pipeline-overlap";
import * as s3_ArithmeticPipeline from "./semester-03/06-processor-design/arithmetic-pipeline";
import * as s3_InstructionPipe from "./semester-03/06-processor-design/instruction-pipe";
import * as s3_RiscPipeline from "./semester-03/06-processor-design/risc-pipeline";
import * as s3_VectorProcessing from "./semester-03/06-processor-design/vector-processing";
import * as s3_ArrayProcessors from "./semester-03/06-processor-design/array-processors";
import * as s3_AsyncTransfer from "./semester-03/07-memory-and-io/async-transfer";
import * as s3_TransferModes from "./semester-03/07-memory-and-io/transfer-modes";
import * as s3_PriorityInterrupt from "./semester-03/07-memory-and-io/priority-interrupt";
import * as s3_DmaTransfer from "./semester-03/07-memory-and-io/dma-transfer";
import * as s3_IoProcessor from "./semester-03/07-memory-and-io/io-processor";
import * as s3_MemoryMap from "./semester-03/07-memory-and-io/memory-address-map";
import * as s3_CacheVirtual from "./semester-03/07-memory-and-io/cache-virtual";
import * as s3_IoOrganisation from "./semester-03/07-memory-and-io/io-organisation";
import * as s3_Assembler from "./semester-03/08-assembly-systems/assembler-second-pass";
import * as s3_MachineAndAssembly from "./semester-03/08-assembly-systems/machine-and-assembly";
import * as s3_ProgramLoop from "./semester-03/08-assembly-systems/program-loop";
import * as s3_SubroutineAndIo from "./semester-03/08-assembly-systems/subroutine-and-io";

/**
 * Every lab's 2D schematics, keyed by the lab's path under
 * `src/labs/semesters` (e.g. "semester-01/01-analog-electronics/03-zener-diode").
 * Each value is the module namespace: its per-step and theory exports.
 */
export const schematicModules = {
  "semester-01/01-analog-electronics/01-study-basic-components":
    s1_StudyBasicComponents,
  "semester-01/01-analog-electronics/02-pn-junction-diode": s1_PnJunctionDiode,
  "semester-01/01-analog-electronics/03-zener-diode": s1_ZenerDiode,
  "semester-01/01-analog-electronics/04-zener-voltage-regulator":
    s1_ZenerVoltageRegulator,
  "semester-01/01-analog-electronics/05-half-wave-rectifier":
    s1_HalfWaveRectifier,
  "semester-01/01-analog-electronics/06-full-wave-rectifier":
    s1_FullWaveRectifier,
  "semester-01/01-analog-electronics/07-ce-amplifier": s1_CeAmplifier,
  "semester-01/01-analog-electronics/08-cb-transistor-characteristics":
    s1_CbTransistorCharacteristics,
  "semester-01/01-analog-electronics/09-cb-amplifier": s1_CbAmplifier,
  "semester-01/01-analog-electronics/10-bjt-bias": s1_BjtBias,
  "semester-01/01-analog-electronics/10-inverting-non-inverting-opamp":
    s1_InvertingNonInvertingOpamp,
  "semester-01/01-analog-electronics/11-mosfet-characteristics":
    s1_MosfetCharacteristics,
  "semester-01/01-analog-electronics/12-mosfet-common-source":
    s1_MosfetCommonSource,
  "semester-01/01-analog-electronics/13-opamp-circuits": s1_OpampCircuits,
  "semester-01/01-analog-electronics/14-rc-filters": s1_RcFilters,
  "semester-01/01-analog-electronics/15-rc-transient": s1_RcTransient,
  "semester-01/01-analog-electronics/16-series-rlc-resonance":
    s1_SeriesRlcResonance,
  "semester-01/01-analog-electronics/17-transistor-switch": s1_TransistorSwitch,
  "semester-01/01-analog-electronics/ohms-law": s1_OhmsLaw,
  "semester-01/01-analog-electronics/rectifiers-capacitor-filters":
    s1_RectifiersCapacitorFilters,
  "semester-01/02-computer-application/demux-1to2": s1_Demux1to2,
  "semester-01/02-computer-application/full-adder": s1_FullAdder,
  "semester-01/02-computer-application/full-subtractor": s1_FullSubtractor,
  "semester-01/02-computer-application/half-adder": s1_HalfAdder,
  "semester-01/02-computer-application/half-subtractor": s1_HalfSubtractor,
  "semester-01/02-computer-application/logic-gates": s1_LogicGates,
  "semester-01/02-computer-application/mux-2to1": s1_Mux2to1,
  "semester-01/03-FEE/kirchhoff-laws": s1_KirchhoffLaws,
  "semester-01/03-FEE/norton-theorem": s1_NortonTheorem,
  "semester-01/03-FEE/superposition-theorem": s1_SuperpositionTheorem,
  "semester-01/03-FEE/thevenin-theorem": s1_TheveninTheorem,
  "semester-02/01-digital-electronics/01-intro-logic-gates": s2_IntroLogicGates,
  "semester-02/01-digital-electronics/02-gate-level-minimization":
    s2_GateLevelMinimization,
  "semester-02/01-digital-electronics/03-half-adder-subtractor":
    s2_HalfAdderSubtractor,
  "semester-02/01-digital-electronics/04-01-full-adder": s2_FullAdder,
  "semester-02/01-digital-electronics/04-02-full-subtractor": s2_FullSubtractor,
  "semester-02/01-digital-electronics/05-bcd-xs3-converter": s2_BcdXs3Converter,
  "semester-02/01-digital-electronics/06-gray-binary-converter":
    s2_GrayBinaryConverter,
  "semester-02/01-digital-electronics/08-mux-4to1-ic": s2_Mux4to1Ic,
  "semester-02/01-digital-electronics/09-demux-1to4-ic": s2_Demux1to4Ic,
  "semester-02/01-digital-electronics/10-demux-address-decoder":
    s2_DemuxAddressDecoder,
  "semester-02/01-digital-electronics/11-encoder-4to2": s2_Encoder4to2,
  "semester-02/01-digital-electronics/12-decoder-2to4": s2_Decoder2to4,
  "semester-02/01-digital-electronics/13-binary-adder-4bit": s2_BinaryAdder4bit,
  "semester-02/01-digital-electronics/14-binary-subtractor-4bit":
    s2_BinarySubtractor4bit,
  "semester-02/01-digital-electronics/15-d-flip-flop": s2_DFlipFlop,
  "semester-02/01-digital-electronics/16-jk-t-flip-flop": s2_JkTFlipFlop,
  "semester-02/01-digital-electronics/17-mod5-counter": s2_Mod5Counter,
  "semester-02/01-digital-electronics/mux-based-logic": s2_MuxBasedLogic,
  "semester-02/01-digital-electronics/sr-latch": s2_SrLatch,
  "semester-02/03-combinational-logic/01-decoder-3to8-ic": s2_Decoder3to8Ic,
  "semester-02/03-combinational-logic/02-priority-encoder-8to3-ic":
    s2_PriorityEncoder8to3Ic,
  "semester-02/04-sequential-logic/01-sync-counter-74hc161": s2_SyncCounter74hc161,
  "semester-02/04-sequential-logic/02-ripple-counter-74hc93": s2_RippleCounter74hc93,
  "semester-02/02-advanced-adders/full-adder-ripple": s2_FullAdderRipple,
  "semester-03/01-combinational-arithmetic/cla-adder": s3_ClaAdder,
  "semester-03/01-combinational-arithmetic/wallace-tree": s3_WallaceTree,
  "semester-03/01-combinational-arithmetic/combinational-multipliers":
    s3_ArrayMultiplier,
  "semester-03/01-combinational-arithmetic/booths-multiplier":
    s3_BoothMultiplier,
  "semester-03/01-combinational-arithmetic/registers-counters-theory":
    s3_RegistersCounters,
  "semester-03/02-memory-cpu-systems/alu-simulation": s3_AluSlice,
  "semester-03/02-memory-cpu-systems/memory-design": s3_MemoryDesign,
  "semester-03/02-memory-cpu-systems/cache-associative": s3_CacheAssociative,
  "semester-03/02-memory-cpu-systems/cache-direct-mapped": s3_CacheDirect,
  "semester-03/02-memory-cpu-systems/cpu-design": s3_CpuDesign,
  "semester-03/04-computer-organisation-architecture/02-flip-flop-synthesis":
    s3_FlipFlopSynthesis,
  "semester-03/04-computer-organisation-architecture/03-karnaugh-map":
    s3_KarnaughMap,
  "semester-03/04-computer-organisation-architecture/04-quine-mccluskey":
    s3_QuineMccluskey,
  "semester-03/05-computer-arithmetic/signed-addition": s3_SignedAddition,
  "semester-03/05-computer-arithmetic/booth-trace": s3_BoothTrace,
  "semester-03/05-computer-arithmetic/bcd-adder": s3_BcdAdder,
  "semester-03/05-computer-arithmetic/bus-transfer": s3_BusTransfer,
  "semester-03/05-computer-arithmetic/register-transfer": s3_RegisterTransfer,
  "semester-03/05-computer-arithmetic/common-bus": s3_CommonBus,
  "semester-03/05-computer-arithmetic/tri-state-bus": s3_TriStateBus,
  "semester-03/05-computer-arithmetic/binary-adder-4": s3_BinaryAdder4,
  "semester-03/05-computer-arithmetic/adder-subtractor": s3_AdderSubtractor,
  "semester-03/05-computer-arithmetic/binary-incrementer": s3_BinaryIncrementer,
  "semester-03/05-computer-arithmetic/arithmetic-circuit": s3_ArithmeticCircuit,
  "semester-03/05-computer-arithmetic/combinational-shifter": s3_CombinationalShifter,
  "semester-03/05-computer-arithmetic/arithmetic-logic-shift": s3_ArithmeticLogicShift,
  "semester-03/05-computer-arithmetic/representation-and-alsu": s3_Representation,
  "semester-03/05-computer-arithmetic/bus-and-memory": s3_BusAndMemory,
  "semester-03/06-processor-design/basic-computer": s3_BasicComputer,
  "semester-03/06-processor-design/microprogrammed-control": s3_Microprogram,
  "semester-03/06-processor-design/register-organisation": s3_RegisterOrg,
  "semester-03/06-processor-design/instruction-pipeline": s3_Pipeline,
  "semester-03/06-processor-design/computer-description": s3_ComputerDescription,
  "semester-03/06-processor-design/instruction-set": s3_InstructionSet,
  "semester-03/06-processor-design/timing-and-control": s3_TimingAndControl,
  "semester-03/06-processor-design/complete-computer": s3_CompleteComputer,
  "semester-03/06-processor-design/accumulator-unit": s3_AccumulatorUnit,
  "semester-03/06-processor-design/interrupt-cycle": s3_InterruptCycle,
  "semester-03/05-computer-arithmetic/magnitude-add-sub": s3_MagnitudeAddSub,
  "semester-03/05-computer-arithmetic/booth-algorithm": s3_BoothAlgorithm,
  "semester-03/05-computer-arithmetic/decimal-arithmetic": s3_DecimalArithmetic,
  "semester-03/06-processor-design/general-registers": s3_GeneralRegisters,
  "semester-03/06-processor-design/stack-organization": s3_StackOrganization,
  "semester-03/06-processor-design/instruction-format": s3_InstructionFormat,
  "semester-03/06-processor-design/instruction-codes": s3_InstructionCodes,
  "semester-03/06-processor-design/computer-registers": s3_ComputerRegisters,
  "semester-03/06-processor-design/instruction-cycle": s3_InstructionCycle,
  "semester-03/06-processor-design/memory-reference": s3_MemoryReference,
  "semester-03/06-processor-design/io-interrupt": s3_IoInterrupt,
  "semester-03/06-processor-design/complete-computer-description": s3_CompleteComputerDescription,
  "semester-03/06-processor-design/accumulator-logic": s3_AccumulatorLogic,
  "semester-03/06-processor-design/addressing-modes": s3_AddressingModes,
  "semester-03/06-processor-design/data-manipulation": s3_DataManipulation,
  "semester-03/06-processor-design/program-control": s3_ProgramControl,
  "semester-03/06-processor-design/risc-organization": s3_RiscOrganization,
  "semester-03/06-processor-design/cisc-organization": s3_CiscOrganization,
  "semester-03/06-processor-design/control-memory": s3_ControlMemory,
  "semester-03/06-processor-design/address-sequencing": s3_AddressSequencing,
  "semester-03/06-processor-design/microinstruction-format": s3_MicroinstructionFormat,
  "semester-03/06-processor-design/flynn-taxonomy": s3_FlynnTaxonomy,
  "semester-03/06-processor-design/parallel-processing": s3_ParallelProcessing,
  "semester-03/06-processor-design/pipeline-overlap": s3_PipelineOverlap,
  "semester-03/06-processor-design/arithmetic-pipeline": s3_ArithmeticPipeline,
  "semester-03/06-processor-design/instruction-pipe": s3_InstructionPipe,
  "semester-03/06-processor-design/risc-pipeline": s3_RiscPipeline,
  "semester-03/06-processor-design/vector-processing": s3_VectorProcessing,
  "semester-03/06-processor-design/array-processors": s3_ArrayProcessors,
  "semester-03/07-memory-and-io/async-transfer": s3_AsyncTransfer,
  "semester-03/07-memory-and-io/transfer-modes": s3_TransferModes,
  "semester-03/07-memory-and-io/priority-interrupt": s3_PriorityInterrupt,
  "semester-03/07-memory-and-io/dma-transfer": s3_DmaTransfer,
  "semester-03/07-memory-and-io/io-processor": s3_IoProcessor,
  "semester-03/07-memory-and-io/memory-address-map": s3_MemoryMap,
  "semester-03/07-memory-and-io/cache-virtual": s3_CacheVirtual,
  "semester-03/07-memory-and-io/io-organisation": s3_IoOrganisation,
  "semester-03/08-assembly-systems/assembler-second-pass": s3_Assembler,
  "semester-03/08-assembly-systems/machine-and-assembly": s3_MachineAndAssembly,
  "semester-03/08-assembly-systems/program-loop": s3_ProgramLoop,
  "semester-03/08-assembly-systems/subroutine-and-io": s3_SubroutineAndIo,
} as const;

export type SchematicLabPath = keyof typeof schematicModules;

export type SchematicEntry = {
  lab: SchematicLabPath;
  /** Export name, with `[i]` for entries only reachable through an array. */
  name: string;
  schematic: SchematicData;
};

function isSchematic(value: unknown): value is SchematicData {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as SchematicData).elements)
  );
}

/** All distinct schematics (step arrays and named exports deduplicated). */
export function allSchematics(): SchematicEntry[] {
  const out: SchematicEntry[] = [];
  for (const [lab, mod] of Object.entries(schematicModules) as [
    SchematicLabPath,
    Record<string, unknown>,
  ][]) {
    const seen = new Set<SchematicData>();
    for (const [name, value] of Object.entries(mod)) {
      if (isSchematic(value) && !seen.has(value)) {
        seen.add(value);
        out.push({ lab, name, schematic: value });
      }
    }
    for (const [name, value] of Object.entries(mod)) {
      if (!Array.isArray(value)) continue;
      value.forEach((item, i) => {
        if (isSchematic(item) && !seen.has(item)) {
          seen.add(item);
          out.push({ lab, name: `${name}[${i}]`, schematic: item });
        }
      });
    }
  }
  return out;
}

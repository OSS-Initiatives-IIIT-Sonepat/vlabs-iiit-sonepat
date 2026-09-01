// ── Lab content registry ────────────────────────────────────────────────────
// Single map from experiment id → LabContent.
// The dynamic /labs/[slug] route uses this to look up content.
// To add a new experiment: import it here and add one entry to the map.

import { type LabContent } from '@/labs/lab-content.types';

import { HalfAdderContent }               from './half-adder';
import { FullAdderContent }               from './full-adder';
import { HalfSubtractorContent }          from './half-subtractor';
import { FullSubtractorContent }          from './full-subtractor';
import { Mux2to1Content }                 from './mux-2to1';
import { Demux1to2Content }               from './demux-1to2';
import { Encoder4to2Content }             from './encoder-4to2';
import { Decoder2to4Content }             from './decoder-2to4';
import { ZenerDiodeContent }              from './zener-diode';
import { LogicGatesContent }              from './logic-gates';
import { StudyBasicComponentsContent }    from './study-basic-components';
import { OhmsLawContent }                 from './ohms-law';
import { KirchhoffLawsContent }           from './kirchhoff-laws';
import { PnJunctionDiodeContent }         from './pn-junction-diode';
import { ZenerVoltageRegulatorContent }   from './zener-voltage-regulator';
import { HalfWaveRectifierContent }       from './half-wave-rectifier';
import { FullWaveRectifierContent }       from './full-wave-rectifier';
import { RectifiersCapacitorFiltersContent } from './rectifiers-capacitor-filters';
import { SuperpositionTheoremContent }    from './superposition-theorem';
import { TheveninTheoremContent }         from './thevenin-theorem';
import { NortonTheoremContent }           from './norton-theorem';
import { CeAmplifierContent }             from './ce-amplifier';
import { MuxBasedLogicContent }           from './mux-based-logic';
import { DemuxAddressDecoderContent }     from './demux-address-decoder';
import { HalfAdderRevisitContent }        from './half-adder-revisit';
import { FullAdderRippleContent }         from './full-adder-ripple';
import { GpioInterfacingContent }         from './gpio-interfacing';
import { SevenSegmentDisplayContent }     from './seven-segment-display';
import { AdcDacContent }                  from './adc-dac';
import { CbAmplifierContent }             from './cb-amplifier';
import { BjtBiasContent }                 from './bjt-bias';
import { MosfetCharacteristicsContent }   from './mosfet-characteristics';
import { OpampCircuitsContent }           from './opamp-circuits';
import { BcdXs3ConverterContent }         from './bcd-xs3-converter';
import { GrayBinaryConverterContent }     from './gray-binary-converter';
import { Mux4to1ICContent }               from './mux-4to1-ic';
import { Demux1to4ICContent }             from './demux-1to4-ic';
import { BinaryAdder4bitContent }         from './binary-adder-4bit';
import { BinarySubtractor4bitContent }    from './binary-subtractor-4bit';
import { DigitalComparatorContent }       from './digital-comparator';
import { ParityCheckerContent }           from './parity-checker';
import { ShiftRegisterContent }           from './shift-register';
import { GateLevelMinimizationContent }   from './gate-level-minimization';
import { ClaAdderContent }                from './cla-adder';
import { WallaceTreeContent }             from './wallace-tree';
import { CombinationalMultipliersContent } from './combinational-multipliers';
import { BoothsMultiplierContent }        from './booths-multiplier';
import { RegistersCountersTheoryContent } from './registers-counters-theory';
import { IntroGatesReviewContent }        from './intro-gates-review';
import { CExpressionsContent }            from './c-expressions';
import { CFileOperations1Content }        from './c-file-operations-1';
import { CFileOperations2Content }        from './c-file-operations-2';
import { SrLatchContent }                 from './sr-latch';
import { DFlipFlopContent }               from './d-flip-flop';
import { JkTFlipFlopContent }             from './jk-t-flip-flop';
import { Mod5CounterContent }             from './mod5-counter';
import { Exp8085AddSub8bitContent }       from './8085-add-sub-8bit';
import { Exp8085AddSubCarryContent }      from './8085-add-sub-carry';
import { Exp8085BcdAdditionContent }      from './8085-bcd-addition';
import { Exp8085Multiply8bitContent }     from './8085-multiply-8bit';
import { Exp8085Divide8bitContent }       from './8085-divide-8bit';
import { Exp8085ArraySumContent }         from './8085-array-sum';
import { Exp8085ArraySquareContent }      from './8085-array-square';
import { Exp8085MinMaxContent }           from './8085-min-max';
import { Exp8085BubbleSortContent }       from './8085-bubble-sort';
import { Exp8085BcdBinaryConvContent }    from './8085-bcd-binary-conv';
import { Exp8085SqrtContent }             from './8085-sqrt';
import { aluSimulation }                  from './alu-simulation';
import { memoryDesign }                   from './memory-design';
import { cacheDirectMapped }              from './cache-direct-mapped';
import { cacheAssociative }               from './cache-associative';
import { cpuDesign }                      from './cpu-design';

/** All lab content keyed by experiment id (matches Circuit.id). */
export const ALL_CONTENTS: Record<string, LabContent> = {
  'half-adder':                    HalfAdderContent,
  'full-adder':                    FullAdderContent,
  'half-subtractor':               HalfSubtractorContent,
  'full-subtractor':               FullSubtractorContent,
  'mux-2to1':                      Mux2to1Content,
  'demux-1to2':                    Demux1to2Content,
  'encoder-4to2':                  Encoder4to2Content,
  'decoder-2to4':                  Decoder2to4Content,
  'zener-diode':                   ZenerDiodeContent,
  'logic-gates':                   LogicGatesContent,
  'study-basic-components':        StudyBasicComponentsContent,
  'ohms-law':                      OhmsLawContent,
  'kirchhoff-laws':                KirchhoffLawsContent,
  'pn-junction-diode':             PnJunctionDiodeContent,
  'zener-voltage-regulator':       ZenerVoltageRegulatorContent,
  'half-wave-rectifier':           HalfWaveRectifierContent,
  'full-wave-rectifier':           FullWaveRectifierContent,
  'rectifiers-capacitor-filters':  RectifiersCapacitorFiltersContent,
  'superposition-theorem':         SuperpositionTheoremContent,
  'thevenin-theorem':              TheveninTheoremContent,
  'norton-theorem':                NortonTheoremContent,
  'ce-amplifier':                  CeAmplifierContent,
  'mux-based-logic':               MuxBasedLogicContent,
  'demux-address-decoder':         DemuxAddressDecoderContent,
  'half-adder-revisit':            HalfAdderRevisitContent,
  'full-adder-ripple':             FullAdderRippleContent,
  'gpio-interfacing':              GpioInterfacingContent,
  'seven-segment-display':         SevenSegmentDisplayContent,
  'adc-dac':                       AdcDacContent,
  'cb-amplifier':                  CbAmplifierContent,
  'bjt-bias':                      BjtBiasContent,
  'mosfet-characteristics':        MosfetCharacteristicsContent,
  'opamp-circuits':                OpampCircuitsContent,
  'bcd-xs3-converter':             BcdXs3ConverterContent,
  'gray-binary-converter':         GrayBinaryConverterContent,
  'mux-4to1-ic':                   Mux4to1ICContent,
  'demux-1to4-ic':                 Demux1to4ICContent,
  'binary-adder-4bit':             BinaryAdder4bitContent,
  'binary-subtractor-4bit':        BinarySubtractor4bitContent,
  'digital-comparator':            DigitalComparatorContent,
  'parity-checker':                ParityCheckerContent,
  'shift-register':                ShiftRegisterContent,
  'gate-level-minimization':       GateLevelMinimizationContent,
  'cla-adder':                     ClaAdderContent,
  'wallace-tree':                  WallaceTreeContent,
  'combinational-multipliers':     CombinationalMultipliersContent,
  'booths-multiplier':             BoothsMultiplierContent,
  'registers-counters-theory':     RegistersCountersTheoryContent,
  'intro-gates-review':            IntroGatesReviewContent,
  'c-expressions':                 CExpressionsContent,
  'c-file-operations-1':           CFileOperations1Content,
  'c-file-operations-2':           CFileOperations2Content,
  'sr-latch':                      SrLatchContent,
  'd-flip-flop':                   DFlipFlopContent,
  'jk-t-flip-flop':                JkTFlipFlopContent,
  'mod5-counter':                  Mod5CounterContent,
  '8085-add-sub-8bit':             Exp8085AddSub8bitContent,
  '8085-add-sub-carry':            Exp8085AddSubCarryContent,
  '8085-bcd-addition':             Exp8085BcdAdditionContent,
  '8085-multiply-8bit':            Exp8085Multiply8bitContent,
  '8085-divide-8bit':              Exp8085Divide8bitContent,
  '8085-array-sum':                Exp8085ArraySumContent,
  '8085-array-square':             Exp8085ArraySquareContent,
  '8085-min-max':                  Exp8085MinMaxContent,
  '8085-bubble-sort':              Exp8085BubbleSortContent,
  '8085-bcd-binary-conv':          Exp8085BcdBinaryConvContent,
  '8085-sqrt':                     Exp8085SqrtContent,
  'alu-simulation':                aluSimulation,
  'memory-design':                 memoryDesign,
  'cache-direct-mapped':           cacheDirectMapped,
  'cache-associative':             cacheAssociative,
  'cpu-design':                    cpuDesign,
};

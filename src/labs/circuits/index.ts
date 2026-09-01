import { HalfAdder }      from './half-adder';
import { FullAdder }      from './full-adder';
import { HalfSubtractor } from './half-subtractor';
import { FullSubtractor } from './full-subtractor';
import { Mux2to1 }        from './mux';
import { Demux1to2 }      from './demux';
import { Encoder4to2 }    from './encoder';
import { Decoder2to4 }    from './decoder';
import { ZenerDiodeCircuit } from './zener-diode';
import { LogicGatesCircuit } from './logic-gates';
import { StudyBasicComponentsCircuit } from './study-basic-components';
import { OhmsLawCircuit } from './ohms-law';
import { KirchhoffLawsCircuit } from './kirchhoff-laws';
import { PnJunctionDiodeCircuit } from './pn-junction-diode';
import { ZenerVoltageRegulatorCircuit } from './zener-voltage-regulator';
import { HalfWaveRectifierCircuit } from './half-wave-rectifier';
import { FullWaveRectifierCircuit } from './full-wave-rectifier';
import { RectifiersCapacitorFiltersCircuit } from './rectifiers-capacitor-filters';
import { SuperpositionTheoremCircuit } from './superposition-theorem';
import { TheveninTheoremCircuit } from './thevenin-theorem';
import { NortonTheoremCircuit } from './norton-theorem';
import { CeAmplifierCircuit } from './ce-amplifier';
import { MuxBasedLogicCircuit } from './mux-based-logic';
import { DemuxAddressDecoderCircuit } from './demux-address-decoder';
import { HalfAdderRevisitCircuit } from './half-adder-revisit';
import { FullAdderRippleCircuit } from './full-adder-ripple';
import { GpioInterfacingCircuit } from './gpio-interfacing';
import { SevenSegmentDisplayCircuit } from './seven-segment-display';
import { AdcDacCircuit } from './adc-dac';
import { CbAmplifierCircuit } from './cb-amplifier';
import { BjtBiasCircuit } from './bjt-bias';
import { MosfetCharacteristicsCircuit } from './mosfet-characteristics';
import { OpampCircuitsCircuit } from './opamp-circuits';
import { BcdXs3Converter } from './bcd-xs3-converter';
import { GrayBinaryConverter } from './gray-binary-converter';
import { Mux4to1IC } from './mux-4to1-ic';
import { Demux1to4IC } from './demux-1to4-ic';
import { BinaryAdder4bit } from './binary-adder-4bit';
import { BinarySubtractor4bit } from './binary-subtractor-4bit';
import { SRLatchCircuit } from './sr-latch';
import { DFlipFlopCircuit } from './d-flip-flop';
import { JKTFlipFlopCircuit } from './jk-t-flip-flop';
import { Mod5CounterCircuit } from './mod5-counter';
import { ParityChecker } from './parity-checker';
import { DigitalComparator } from './digital-comparator';
import { ShiftRegister } from './shift-register';
import { type Circuit }   from '@/labs/types';

export const ALL_CIRCUITS: Circuit[] = [
  HalfAdder,
  FullAdder,
  HalfSubtractor,
  FullSubtractor,
  Mux2to1,
  Demux1to2,
  Encoder4to2,
  Decoder2to4,
  ZenerDiodeCircuit,
  LogicGatesCircuit,
  StudyBasicComponentsCircuit,
  OhmsLawCircuit,
  KirchhoffLawsCircuit,
  PnJunctionDiodeCircuit,
  ZenerVoltageRegulatorCircuit,
  HalfWaveRectifierCircuit,
  FullWaveRectifierCircuit,
  RectifiersCapacitorFiltersCircuit,
  SuperpositionTheoremCircuit,
  TheveninTheoremCircuit,
  NortonTheoremCircuit,
  CeAmplifierCircuit,
  MuxBasedLogicCircuit,
  DemuxAddressDecoderCircuit,
  HalfAdderRevisitCircuit,
  FullAdderRippleCircuit,
  GpioInterfacingCircuit,
  SevenSegmentDisplayCircuit,
  AdcDacCircuit,
  CbAmplifierCircuit,
  BjtBiasCircuit,
  MosfetCharacteristicsCircuit,
  OpampCircuitsCircuit,
  BcdXs3Converter,
  GrayBinaryConverter,
  Mux4to1IC,
  Demux1to4IC,
  BinaryAdder4bit,
  BinarySubtractor4bit,
  SRLatchCircuit,
  DFlipFlopCircuit,
  JKTFlipFlopCircuit,
  Mod5CounterCircuit,
  ParityChecker,
  DigitalComparator,
  ShiftRegister,
];

export {
  HalfAdder, FullAdder, HalfSubtractor, FullSubtractor,
  Mux2to1, Demux1to2, Encoder4to2, Decoder2to4, ZenerDiodeCircuit,
  LogicGatesCircuit, StudyBasicComponentsCircuit, OhmsLawCircuit, KirchhoffLawsCircuit,
  PnJunctionDiodeCircuit, ZenerVoltageRegulatorCircuit, HalfWaveRectifierCircuit,
  FullWaveRectifierCircuit, RectifiersCapacitorFiltersCircuit,
  SuperpositionTheoremCircuit, TheveninTheoremCircuit, NortonTheoremCircuit,
  CeAmplifierCircuit, MuxBasedLogicCircuit, DemuxAddressDecoderCircuit,
  HalfAdderRevisitCircuit, FullAdderRippleCircuit, GpioInterfacingCircuit,
  SevenSegmentDisplayCircuit, AdcDacCircuit,
  CbAmplifierCircuit, BjtBiasCircuit, MosfetCharacteristicsCircuit, OpampCircuitsCircuit,
  BcdXs3Converter, GrayBinaryConverter, Mux4to1IC, Demux1to4IC,
  BinaryAdder4bit, BinarySubtractor4bit, SRLatchCircuit, DFlipFlopCircuit,
  JKTFlipFlopCircuit, Mod5CounterCircuit, ParityChecker, DigitalComparator, ShiftRegister,
};

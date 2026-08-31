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
};

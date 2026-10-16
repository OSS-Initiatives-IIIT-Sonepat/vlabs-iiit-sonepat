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

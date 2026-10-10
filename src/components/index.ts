/**
 * src/components — shared physical component library (Three.js geometry).
 *
 * Each sub-folder owns one component type and its full build implementation.
 */

export {
  M,
  WIRE_HEX,
  solidBox,
  solidCyl,
  textLabel,
  centreAtOrigin,
  instrumentWire,
} from "./shared";

export { buildBreadboard, buildBreadboardStandalone } from "./breadboard";
export {
  buildLongBreadboard,
  buildLongBreadboardStandalone,
} from "./long-breadboard";
export { buildWire, buildWireStandalone } from "./wire";
export { buildResistor, buildResistorStandalone } from "./resistor";
export { buildCapacitor, buildCapacitorStandalone } from "./capacitor";
export { buildLed, buildLedStandalone } from "./led";
export {
  buildDip14,
  buildDip14Standalone,
  buildDip16,
  buildDip16Standalone,
  resolveIcPin,
} from "./ic";
export {
  buildDcPowerSupply,
  buildDcPowerSupplyStandalone,
  buildDcJackStandalone,
  buildBatteryStandalone,
} from "./psu";
export { buildIcMeter, buildIcMeterStandalone } from "./multimeter";
export { buildSwitchStandalone } from "./switch";
export { buildPushButtonStandalone } from "./button";
export { buildPotentiometerStandalone } from "./potentiometer";
export { buildMcuTrainerStandalone } from "./mcu-trainer";
export {
  buildDiode,
  buildDiodeStandalone,
  buildZenerDiode,
  buildZenerDiodeStandalone,
} from "./diode";
export {
  buildAmmeter,
  buildAmmeterStandalone,
  buildAmmeterSide,
} from "./ammeter";
export {
  buildVoltmeter,
  buildVoltmeterStandalone,
  buildVoltmeterSide,
} from "./voltmeter";
export { buildBjt, buildBjtStandalone } from "./bjt";
export { buildMosfet, buildMosfetStandalone } from "./mosfet";
export { buildOpAmpStandalone, buildOpAmp } from "./op-amp";
export { buildSevenSegmentStandalone, buildSevenSegment } from "./sevensegment";
export { buildOscilloscopeStandalone, buildOscilloscope } from "./oscilloscope";
export {
  buildFunctionGeneratorStandalone,
  buildFunctionGenerator,
  FG_OUT_ANCHOR,
} from "./function-generater";
export { buildTransformerStandalone, buildTransformer } from "./transformer";
export { buildDipSwitchStandalone, buildDipSwitch } from "./dip-switch";
export {
  buildLogicAnalyzerStandalone,
  buildLogicAnalyzer,
} from "./logic-analyser";

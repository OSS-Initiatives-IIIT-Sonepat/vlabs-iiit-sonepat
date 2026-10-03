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
export { buildDip14, buildDip14Standalone, resolveIcPin } from "./ic";
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
export { buildDiode, buildDiodeStandalone } from "./diode";
export { buildZenerDiode, buildZenerDiodeStandalone } from "./zener-diode";
export { buildAmmeter, buildAmmeterStandalone } from "./ammeter";
export { buildVoltmeter, buildVoltmeterStandalone } from "./voltmeter";
export { buildBjt, buildBjtStandalone } from "./bjt";
export { buildMosfet, buildMosfetStandalone } from "./mosfet";
export { buildOpAmp, buildOpAmpStandalone } from "./op-amp";
export {
  buildSevenSegment,
  buildSevenSegmentStandalone,
} from "./seven-segment";
export {
  buildOscilloscope,
  buildOscilloscopeStandalone,
} from "./oscilloscope";
export {
  buildFunctionGenerator,
  buildFunctionGeneratorStandalone,
} from "./function-generator";
export {
  buildTransformer,
  buildTransformerStandalone,
} from "./transformer";
export { buildDipSwitch, buildDipSwitchStandalone } from "./dip-switch";
export {
  buildLogicAnalyser,
  buildLogicAnalyserStandalone,
} from "./logic-analyser";
export { buildUnknownApparatusStandalone } from "./unknown-apparatus";

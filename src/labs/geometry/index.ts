// ── Geometry barrel export ────────────────────────────────────────────────
// Single import point for all lab geometry.
// Board-placed variants use coords.ts for exact hole positions.
// Standalone variants centre at origin for display cards.

export { M, WIRE_HEX } from './materials';
export { solidBox, solidCyl, textLabel, centreAtOrigin } from './primitives';

// Breadboard
export { buildBreadboard, buildBreadboardStandalone } from './breadboard';

// IC / DIP chips
export { buildDip14, buildDip14Standalone } from './ic';

// Basic components (LED, resistor, wire)
export {
  buildLed, buildLedStandalone,
  buildResistor, buildResistorStandalone,
  buildWire, buildWireStandalone,
} from './components';

// Extra components (passives, power, instruments)
export {
  buildCapacitor, buildCapacitorStandalone,
  buildPotentiometerStandalone,
  buildPushButtonStandalone,
  buildSwitchStandalone,
  buildBatteryStandalone,
  buildDcJackStandalone,
  buildIcMeterStandalone,
  buildDcPowerSupplyStandalone,
  buildMcuTrainerStandalone,
  buildDcPowerSupply,
  buildIcMeter,
} from './extra-components';

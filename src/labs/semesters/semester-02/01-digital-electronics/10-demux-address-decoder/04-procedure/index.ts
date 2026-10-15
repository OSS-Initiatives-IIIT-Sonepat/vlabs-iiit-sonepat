import { s2DemuxAddressDecoderStepSchematics } from "@/labs/schematics/s2-demux-address-decoder-schematics";
import { step as s01 } from "./01-build-the-1-2-demux-circuit-with-i-1";
import { step as s02 } from "./02-connect-address-select-switch-and-led-indicators";
import { step as s03 } from "./03-verify-deselected-peripheral-is-not-enabled";
import { step as s04 } from "./04-switch-address-and-verify-other-device-selected";
import { step as s05 } from "./05-simulate-bus-conflict-prevention";

import { type SceneProcedureStep } from "@/labs/experiments/types";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: s2DemuxAddressDecoderStepSchematics[0] },
  { ...s02, schematic: s2DemuxAddressDecoderStepSchematics[1] },
  { ...s03, schematic: s2DemuxAddressDecoderStepSchematics[2] },
  { ...s04, schematic: s2DemuxAddressDecoderStepSchematics[3] },
  { ...s05, schematic: s2DemuxAddressDecoderStepSchematics[4] },
];

import * as THREE from "three";
import { PITCH } from "@/labs/coords";
import { buildInstrumentCable } from "@/components/wire";

// ═══════════════════════════════════════════════════════════════════════════════
// INSTRUMENT WIRE — Connection cables from bench instruments to breadboard
// ═══════════════════════════════════════════════════════════════════════════════

export function instrumentWire(
  from: THREE.Vector3,
  to: THREE.Vector3,
  color: number,
  arcHeight: number = PITCH * 1.4,
): THREE.Group {
  return buildInstrumentCable(from, to, color, {
    fromConnector: "banana",
    toConnector: "probe",
    arcHeight,
  });
}

export function probeWire(
  from: THREE.Vector3,
  to: THREE.Vector3,
  color: number,
  arcHeight: number = PITCH * 1.4,
): THREE.Group {
  return buildInstrumentCable(from, to, color, {
    fromConnector: "banana",
    toConnector: "probe",
    arcHeight,
  });
}

export function alligatorWire(
  from: THREE.Vector3,
  to: THREE.Vector3,
  color: number,
  arcHeight: number = PITCH * 1.6,
): THREE.Group {
  return buildInstrumentCable(from, to, color, {
    fromConnector: "banana",
    toConnector: "alligator",
    arcHeight,
  });
}

export function patchCable(
  from: THREE.Vector3,
  to: THREE.Vector3,
  color: number,
  arcHeight: number = PITCH * 2.0,
): THREE.Group {
  return buildInstrumentCable(from, to, color, {
    fromConnector: "banana",
    toConnector: "banana",
    arcHeight,
  });
}

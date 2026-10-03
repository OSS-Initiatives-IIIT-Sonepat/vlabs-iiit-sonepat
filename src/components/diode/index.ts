import * as THREE from "three";
import { PITCH, BOARD_H, TOP_Y } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidCyl, textLabel } from "@/components/shared/primitives";

// ── DIODE (1N4007 / 1N4148) ────────────────────────────────────────────────
// Axial through-hole diode with cylindrical body, cathode band, and straight leads.
//
// Mounted form: sits across two breadboard holes with leads bent down.
// Standalone form: centered at origin for apparatus cards.

export function buildDiode(
  anodePos?: THREE.Vector3,
  cathodePos?: THREE.Vector3,
  label = "1N4007",
): THREE.Group {
  const root = new THREE.Group();

  const aPos = anodePos ?? new THREE.Vector3(-PITCH * 1.5, TOP_Y, 0);
  const cPos = cathodePos ?? new THREE.Vector3(PITCH * 1.5, TOP_Y, 0);

  const midX = (aPos.x + cPos.x) / 2;
  const midZ = (aPos.z + cPos.z) / 2;
  const spanX = cPos.x - aPos.x;
  const spanZ = cPos.z - aPos.z;
  const span = Math.sqrt(spanX * spanX + spanZ * spanZ) || PITCH * 3;
  const angle = Math.atan2(spanZ, spanX);

  const BODY_R = PITCH * 0.36;
  const BODY_L = span * 0.55;
  const bodyH = PITCH * 0.22;

  const bodyGrp = new THREE.Group();

  // Cylindrical body
  const bodyGeo = new THREE.CylinderGeometry(BODY_R, BODY_R, BODY_L, 16);
  bodyGrp.add(new THREE.Mesh(bodyGeo, M.white()));
  bodyGrp.add(
    new THREE.LineSegments(new THREE.EdgesGeometry(bodyGeo, 20), M.edge()),
  );
  bodyGrp.rotation.z = Math.PI / 2;

  // Cathode identification band (near cathode end, which is +Y in cylinder local space before rotation)
  const bandW = BODY_L * 0.18;
  const bandGeo = new THREE.CylinderGeometry(
    BODY_R + 0.005,
    BODY_R + 0.005,
    bandW,
    16,
  );
  const bandMesh = new THREE.Mesh(bandGeo, M.dark());
  bandMesh.position.y = BODY_L * 0.35;
  bodyGrp.add(bandMesh);

  // Value / model label
  const modelLabel = textLabel(label, BODY_R * 4.5, BODY_R * 1.4, {
    textColor: "#333333",
    fontSize: 40,
  });
  if (modelLabel) {
    modelLabel.rotation.z = -Math.PI / 2;
    modelLabel.position.set(0, 0, BODY_R + 0.015);
    bodyGrp.add(modelLabel);
  }

  const bodyHolder = new THREE.Group();
  bodyHolder.add(bodyGrp);
  bodyHolder.rotation.y = -angle;
  bodyHolder.position.set(midX, TOP_Y + bodyH, midZ);
  root.add(bodyHolder);

  // Leads
  const halfBody = BODY_L / 2;
  const bodyEndA = new THREE.Vector3(
    midX - Math.cos(angle) * halfBody,
    TOP_Y + bodyH,
    midZ - Math.sin(angle) * halfBody,
  );
  const bodyEndC = new THREE.Vector3(
    midX + Math.cos(angle) * halfBody,
    TOP_Y + bodyH,
    midZ + Math.sin(angle) * halfBody,
  );

  const leadR = PITCH * 0.07;
  const leadGeoV = new THREE.CylinderGeometry(
    leadR,
    leadR,
    bodyH + BOARD_H * 0.4,
    6,
  );
  const leadGeoH = (len: number) =>
    new THREE.CylinderGeometry(leadR, leadR, len, 6);

  for (const [holePos, bodyEnd] of [
    [aPos, bodyEndA],
    [cPos, bodyEndC],
  ] as const) {
    const vLead = new THREE.Mesh(leadGeoV, M.silver());
    vLead.position.set(
      holePos.x,
      TOP_Y - BOARD_H * 0.2 + (bodyH + BOARD_H * 0.4) / 2,
      holePos.z,
    );
    root.add(vLead);

    const dx = bodyEnd.x - holePos.x;
    const dz = bodyEnd.z - holePos.z;
    const hLen = Math.sqrt(dx * dx + dz * dz);
    if (hLen > 0.001) {
      const hLead = new THREE.Mesh(leadGeoH(hLen), M.silver());
      hLead.position.set(
        (holePos.x + bodyEnd.x) / 2,
        TOP_Y + bodyH,
        (holePos.z + bodyEnd.z) / 2,
      );
      const hDir = new THREE.Vector3(dx, 0, dz).normalize();
      hLead.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), hDir);
      root.add(hLead);
    }
  }

  return root;
}

export function buildDiodeStandalone(label = "1N4007"): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;
  const R = P * 0.42;
  const L = P * 3.4;

  // Main cylindrical body (aligned horizontally along X)
  const bodyGeo = new THREE.CylinderGeometry(R, R, L, 18);
  const bodyMesh = new THREE.Mesh(bodyGeo, M.white());
  const bodyEdge = new THREE.LineSegments(
    new THREE.EdgesGeometry(bodyGeo, 20),
    M.edge(),
  );
  root.add(bodyMesh);
  root.add(bodyEdge);
  root.rotation.z = Math.PI / 2;

  // Cathode identification band
  const bandW = L * 0.18;
  const bandGeo = new THREE.CylinderGeometry(R + 0.008, R + 0.008, bandW, 18);
  const band = new THREE.Mesh(bandGeo, M.dark());
  band.position.y = L * 0.32;
  bodyMesh.add(band);

  // Straight axial leads
  const leadLen = P * 2.4;
  const leadR = P * 0.07;
  for (const sign of [-1, 1]) {
    const lead = solidCyl(leadR, leadLen, M.silver(), 8);
    lead.position.y = sign * (L / 2 + leadLen / 2);
    bodyMesh.add(lead);
  }

  // Label
  const diodeLabel = textLabel(label, R * 4.8, R * 1.5, {
    textColor: "#222222",
    fontSize: 44,
  });
  if (diodeLabel) {
    diodeLabel.rotation.z = -Math.PI / 2;
    diodeLabel.position.set(0, -L * 0.1, R + 0.02);
    root.add(diodeLabel);
  }

  return root;
}

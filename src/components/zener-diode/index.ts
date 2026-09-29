import * as THREE from "three";
import { PITCH, BOARD_H, TOP_Y } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidCyl, textLabel } from "@/components/shared/primitives";

// ── ZENER DIODE (1N4733A) ───────────────────────────────────────────────────
// Axial Zener diode with cathode band, Zener marking, and straight leads.
//
// Mounted form: sits across breadboard holes with leads bent down.
// Standalone form: centered at origin for apparatus cards.

export function buildZenerDiode(
  anodePos?: THREE.Vector3,
  cathodePos?: THREE.Vector3,
  label = "1N4733A",
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

  const BODY_R = PITCH * 0.35;
  const BODY_L = span * 0.52;
  const bodyH = PITCH * 0.22;

  const bodyGrp = new THREE.Group();

  // Glass/light body
  const bodyGeo = new THREE.CylinderGeometry(BODY_R, BODY_R, BODY_L, 16);
  bodyGrp.add(new THREE.Mesh(bodyGeo, M.white()));
  bodyGrp.add(
    new THREE.LineSegments(new THREE.EdgesGeometry(bodyGeo, 20), M.edge()),
  );
  bodyGrp.rotation.z = Math.PI / 2;

  // Cathode main band (dark)
  const bandW = BODY_L * 0.16;
  const bandGeo = new THREE.CylinderGeometry(
    BODY_R + 0.006,
    BODY_R + 0.006,
    bandW,
    16,
  );
  const bandMesh = new THREE.Mesh(bandGeo, M.dark());
  bandMesh.position.y = BODY_L * 0.34;
  bodyGrp.add(bandMesh);

  // Distinctive Zener identifier ring (cyan/blue accent ring next to cathode band)
  const zenerRingGeo = new THREE.CylinderGeometry(
    BODY_R + 0.008,
    BODY_R + 0.008,
    BODY_L * 0.08,
    16,
  );
  const zenerRing = new THREE.Mesh(zenerRingGeo, M.blue());
  zenerRing.position.y = BODY_L * 0.22;
  bodyGrp.add(zenerRing);

  // Label: 1N4733A
  const text = textLabel(label, BODY_R * 4.6, BODY_R * 1.3, {
    textColor: "#111111",
    fontSize: 40,
  });
  if (text) {
    text.rotation.z = -Math.PI / 2;
    text.position.set(0, -BODY_L * 0.12, BODY_R + 0.015);
    bodyGrp.add(text);
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

export function buildZenerDiodeStandalone(label = "1N4733A"): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;
  const R = P * 0.42;
  const L = P * 3.4;

  // Main cylindrical body
  const bodyGeo = new THREE.CylinderGeometry(R, R, L, 18);
  const bodyMesh = new THREE.Mesh(bodyGeo, M.white());
  const bodyEdge = new THREE.LineSegments(
    new THREE.EdgesGeometry(bodyGeo, 20),
    M.edge(),
  );
  root.add(bodyMesh);
  root.add(bodyEdge);
  root.rotation.z = Math.PI / 2;

  // Cathode main band (dark)
  const bandW = L * 0.18;
  const bandGeo = new THREE.CylinderGeometry(R + 0.008, R + 0.008, bandW, 18);
  const band = new THREE.Mesh(bandGeo, M.dark());
  band.position.y = L * 0.32;
  bodyMesh.add(band);

  // Distinctive Zener identifier ring (cyan/blue accent ring)
  const zenerRingGeo = new THREE.CylinderGeometry(
    R + 0.01,
    R + 0.01,
    L * 0.08,
    18,
  );
  const zenerRing = new THREE.Mesh(zenerRingGeo, M.blue());
  zenerRing.position.y = L * 0.2;
  bodyMesh.add(zenerRing);

  // Straight axial leads
  const leadLen = P * 2.4;
  const leadR = P * 0.07;
  for (const sign of [-1, 1]) {
    const lead = solidCyl(leadR, leadLen, M.silver(), 8);
    lead.position.y = sign * (L / 2 + leadLen / 2);
    bodyMesh.add(lead);
  }

  // Label: 1N4733A
  const text = textLabel(label, R * 4.8, R * 1.5, {
    textColor: "#111111",
    fontSize: 42,
  });
  if (text) {
    text.rotation.z = -Math.PI / 2;
    text.position.set(0, -L * 0.12, R + 0.02);
    root.add(text);
  }

  // Voltage rating label: 5.1V
  const vzText = textLabel("Vz = 5.1V", R * 3.8, R * 1.2, {
    textColor: "#2563a8",
    fontSize: 34,
  });
  if (vzText) {
    vzText.rotation.z = -Math.PI / 2;
    vzText.position.set(0, -L * 0.12, -(R + 0.02));
    vzText.rotation.y = Math.PI;
    root.add(vzText);
  }

  return root;
}

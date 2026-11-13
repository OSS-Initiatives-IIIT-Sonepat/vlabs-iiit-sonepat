import * as THREE from "three";
import { M } from "@/components/shared/materials";
import { solidBox, solidCyl, textLabel } from "@/components/shared/primitives";
import {
  DEV_BOARDS,
  DEV_HEADER_H,
  DEV_PCB_H,
} from "@/components/dev-boards/pinouts";

// ── ARDUINO UNO R3 ────────────────────────────────────────────────────────
// Built centred on the origin, lying flat on the bench. Pin positions come
// from DEV_BOARDS["arduino-uno"], so wires land exactly on the headers.
export function buildArduinoUnoStandalone(): THREE.Group {
  const root = new THREE.Group();
  const { w, d, pins } = DEV_BOARDS["arduino-uno"];

  // PCB (Uno blue) with a bevelled look from a thin rim.
  root.add(solidBox(w, DEV_PCB_H, d, M.hex(0x1f5fa8)));

  // Headers: a black socket strip with silver pin tips at every named pin.
  const socketH = DEV_HEADER_H * 0.7;
  const tipGeo = new THREE.BoxGeometry(0.06, DEV_HEADER_H, 0.06);
  for (const p of pins) {
    const tip = new THREE.Mesh(tipGeo, M.metal());
    tip.position.set(p.x, DEV_PCB_H / 2 + DEV_HEADER_H / 2, p.z);
    root.add(tip);
  }
  // One dark socket per header strip (digital, power, analog).
  const strip = (x0: number, x1: number, z: number) => {
    const len = Math.abs(x1 - x0) + 0.2;
    const socket = solidBox(len, socketH, 0.26, M.dark());
    socket.position.set((x0 + x1) / 2, DEV_PCB_H / 2 + socketH / 2, z);
    root.add(socket);
  };
  strip(pins[0].x, pins[14].x, pins[0].z);
  strip(pins[15].x, pins[19].x, pins[15].z);
  strip(pins[20].x, pins[25].x, pins[20].z);

  // ATmega328P (28-pin DIP) near the middle of the board.
  const chip = solidBox(1.1, 0.22, 1.7, M.ic());
  chip.position.set(0.1, DEV_PCB_H / 2 + 0.11, 0.1);
  root.add(chip);

  // USB-B jack on the left edge.
  const usb = solidBox(0.9, 0.5, 0.7, M.metal());
  usb.position.set(-w / 2 + 0.25, DEV_PCB_H / 2 + 0.25, -0.9);
  root.add(usb);

  // Barrel power jack below the USB.
  const barrel = solidCyl(0.2, 0.42, M.dark(), 14);
  barrel.rotation.z = Math.PI / 2;
  barrel.position.set(-w / 2 + 0.34, DEV_PCB_H / 2 + 0.22, 0.9);
  root.add(barrel);

  // Reset button (red) near the top-right.
  const reset = solidCyl(0.16, 0.2, M.red(), 12);
  reset.position.set(w / 2 - 0.6, DEV_PCB_H / 2 + 0.1, -d / 2 + 0.9);
  root.add(reset);

  // Crystal (silver) beside the chip.
  const xtal = solidBox(0.4, 0.14, 0.2, M.metal());
  xtal.position.set(-0.9, DEV_PCB_H / 2 + 0.07, 0.1);
  root.add(xtal);

  // On-board LED L (pin 13) and power LED.
  const ledL = solidCyl(0.08, 0.1, M.yellow(), 10);
  ledL.position.set(-1.9, DEV_PCB_H / 2 + 0.05, -d / 2 + 0.7);
  root.add(ledL);
  const ledPwr = solidCyl(0.08, 0.1, M.green(), 10);
  ledPwr.position.set(-1.9, DEV_PCB_H / 2 + 0.05, 0.6);
  root.add(ledPwr);

  // Silkscreen title, flat on the PCB.
  const title = textLabel("ARDUINO UNO", w * 0.45, 0.5, {
    bgColor: "#1f5fa8",
    textColor: "#ffffff",
    fontSize: 40,
    bold: true,
  });
  if (title) {
    title.rotation.x = -Math.PI / 2;
    title.position.set(w * 0.2, DEV_PCB_H / 2 + 0.005, 0.1);
    root.add(title);
  }

  // Pin name labels flat on the PCB next to every header pin.
  for (const p of pins) {
    // Pins are 0.22 apart along x, so each label is kept narrower than that.
    const label = textLabel(p.name, 0.2, 0.14, {
      bgColor: "#1f5fa8",
      textColor: "#ffffff",
      fontSize: 34,
    });
    if (!label) continue;
    label.rotation.x = -Math.PI / 2;
    const towardEdge = p.z < 0 ? -0.36 : 0.36;
    label.position.set(p.x, DEV_PCB_H / 2 + 0.006, p.z + towardEdge);
    root.add(label);
  }

  return root;
}

import * as THREE from "three";
import { M } from "@/components/shared/materials";
import { solidBox, solidCyl, textLabel } from "@/components/shared/primitives";
import {
  DEV_BOARDS,
  DEV_HEADER_H,
  DEV_PCB_H,
} from "@/components/dev-boards/pinouts";

// ── ESP32 DEVKIT V1 (30-pin) ───────────────────────────────────────────────
// Built centred on the origin, lying flat on the bench, with the Wi-Fi
// antenna at the −z (top) end. Header pin positions come from
// DEV_BOARDS["esp32-devkit"].
export function buildEsp32DevkitStandalone(): THREE.Group {
  const root = new THREE.Group();
  const { w, d, pins } = DEV_BOARDS["esp32-devkit"];

  // PCB (dark green soldermask, as on the DevKit V1).
  root.add(solidBox(w, DEV_PCB_H, d, M.pcbgreen()));

  // Two 15-pin headers: dark sockets with silver pin tips.
  const tipGeo = new THREE.BoxGeometry(0.06, DEV_HEADER_H, 0.06);
  for (const p of pins) {
    const tip = new THREE.Mesh(tipGeo, M.metal());
    tip.position.set(p.x, DEV_PCB_H / 2 + DEV_HEADER_H / 2, p.z);
    root.add(tip);
  }
  const socketH = DEV_HEADER_H * 0.7;
  for (const x of [-0.99, 0.99]) {
    const socket = solidBox(0.22, socketH, d - 1.0, M.dark());
    socket.position.set(x, DEV_PCB_H / 2 + socketH / 2, 0.2);
    root.add(socket);
  }

  // Wi-Fi/Bluetooth module (silver shield) at the top end, with the
  // antenna trace running off the edge.
  const module = solidBox(w * 0.9, 0.34, 1.1, M.metal());
  module.position.set(0, DEV_PCB_H / 2 + 0.17, -d / 2 + 0.85);
  root.add(module);
  const antenna = solidBox(w * 0.7, 0.02, 0.5, M.gold());
  antenna.position.set(0, DEV_PCB_H / 2 + 0.01, -d / 2 - 0.05);
  root.add(antenna);

  // Micro-USB connector on the top edge.
  const usb = solidBox(0.7, 0.26, 0.42, M.metal());
  usb.position.set(0, DEV_PCB_H / 2 + 0.13, d / 2 - 0.25);
  root.add(usb);

  // CP2102 USB-serial chip next to the USB port.
  const serial = solidBox(0.36, 0.1, 0.36, M.ic());
  serial.position.set(-0.45, DEV_PCB_H / 2 + 0.05, d / 2 - 0.8);
  root.add(serial);

  // EN (reset) and BOOT push buttons, silver tactile switches.
  for (const [x, z] of [
    [-0.7, -d / 2 + 1.9],
    [0.7, -d / 2 + 1.9],
  ] as const) {
    const btn = solidBox(0.28, 0.12, 0.28, M.metal());
    btn.position.set(x, DEV_PCB_H / 2 + 0.06, z);
    root.add(btn);
  }

  // Onboard blue LED on GPIO2, near the middle of the board.
  const led = solidCyl(0.09, 0.12, M.blue(), 10);
  led.position.set(0.7, DEV_PCB_H / 2 + 0.06, -0.3);
  root.add(led);

  // Silkscreen title, flat on the PCB.
  const title = textLabel("ESP32 DEVKIT", w * 0.8, 0.45, {
    bgColor: "#1a4a1a",
    textColor: "#ffffff",
    fontSize: 38,
    bold: true,
  });
  if (title) {
    title.rotation.x = -Math.PI / 2;
    title.position.set(0, DEV_PCB_H / 2 + 0.005, 0.9);
    root.add(title);
  }

  // Pin labels flat on the PCB, outboard of each header.
  for (const p of pins) {
    const label = textLabel(p.name, 0.7, 0.16, {
      bgColor: "#1a4a1a",
      textColor: "#ffffff",
      fontSize: 30,
    });
    if (!label) continue;
    label.rotation.x = -Math.PI / 2;
    // Labels sit inboard of their header so they stay on the PCB.
    const inboard = p.x < 0 ? 0.55 : -0.55;
    label.position.set(p.x + inboard, DEV_PCB_H / 2 + 0.006, p.z);
    root.add(label);
  }

  return root;
}

import { type Circuit } from '@/labs/types';

// ── GPIO Interfacing Circuit ─────────────────────────────────────────────
// Visual/analog — no simulation, no truth table.
// 3 GPIO lines each driving an LED through a 330 Ω resistor.
//   GPIO1: r1 (col 5, row c) → led1 (green, col 10, row c)
//   GPIO2: r2 (col 5, row h) → led2 (yellow, col 10, row h)
//   GPIO3: r3 (col 15, row c) → led3 (red, col 20, row c)
// VCC → each resistor.  LED cathodes → GND.

export const GpioInterfacingCircuit: Circuit = {
  id: 'gpio-interfacing',
  title: 'GPIO Interfacing',
  description:
    'Demonstrates basic GPIO (General Purpose Input/Output) interfacing. ' +
    'Three GPIO lines each drive an LED through a 330 Ω current-limiting resistor. ' +
    'Green, yellow, and red LEDs indicate the state of each GPIO output.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Resistors ─────────────────────────────────────────────────────────
    { id: 'r1', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 5,  row: 'c' } },
    { id: 'r2', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 5,  row: 'h' } },
    { id: 'r3', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 15, row: 'c' } },

    // ── LEDs ──────────────────────────────────────────────────────────────
    { id: 'led1', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 10, row: 'c' } },
    { id: 'led2', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 10, row: 'h' } },
    { id: 'led3', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 20, row: 'c' } },

    // ── VCC → R1 (GPIO1) ─────────────────────────────────────────────────
    { id: 'w_vcc_r1', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 5 },
      to:   { component: 'r1', end: 'p1' } },

    // ── R1 → LED1 anode ──────────────────────────────────────────────────
    { id: 'w_r1_led1', type: 'wire', color: 'orange',
      from: { component: 'r1', end: 'p2' },
      to:   { led: 'led1', end: 'anode' } },

    // ── LED1 cathode → GND ───────────────────────────────────────────────
    { id: 'w_led1_gnd', type: 'wire', color: 'black',
      from: { led: 'led1', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 11 } },

    // ── VCC → R2 (GPIO2) ─────────────────────────────────────────────────
    { id: 'w_vcc_r2', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 3 },
      to:   { component: 'r2', end: 'p1' } },

    // ── R2 → LED2 anode ──────────────────────────────────────────────────
    { id: 'w_r2_led2', type: 'wire', color: 'orange',
      from: { component: 'r2', end: 'p2' },
      to:   { led: 'led2', end: 'anode' } },

    // ── LED2 cathode → GND ───────────────────────────────────────────────
    { id: 'w_led2_gnd', type: 'wire', color: 'black',
      from: { led: 'led2', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 12 } },

    // ── VCC → R3 (GPIO3) ─────────────────────────────────────────────────
    { id: 'w_vcc_r3', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 15 },
      to:   { component: 'r3', end: 'p1' } },

    // ── R3 → LED3 anode ──────────────────────────────────────────────────
    { id: 'w_r3_led3', type: 'wire', color: 'orange',
      from: { component: 'r3', end: 'p2' },
      to:   { led: 'led3', end: 'anode' } },

    // ── LED3 cathode → GND ───────────────────────────────────────────────
    { id: 'w_led3_gnd', type: 'wire', color: 'black',
      from: { led: 'led3', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 21 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the breadboard. We will wire three independent GPIO output lines, each driving an LED.',
      show: ['bb'],
    },
    {
      title: 'Place all three resistors',
      body: 'Insert R1 (330 Ω, col 5 row c), R2 (330 Ω, col 5 row h), and R3 (330 Ω, col 15 row c). ' +
        'Each limits current to ~10 mA at 3.3 V GPIO output.',
      show: ['bb', 'r1', 'r2', 'r3'],
      highlight: 'r1',
    },
    {
      title: 'Place all three LEDs',
      body: 'Insert LED1 (green, col 10 row c), LED2 (yellow, col 10 row h), LED3 (red, col 20 row c). ' +
        'Each LED indicates the HIGH/LOW state of its GPIO line.',
      show: ['bb', 'r1', 'r2', 'r3', 'led1', 'led2', 'led3'],
      highlight: 'led1',
    },
    {
      title: 'Wire VCC to all resistors',
      body: 'Red wires: VCC rail → R1 p1, R2 p1, R3 p1. ' +
        'In a real system, these would connect to GPIO output pins instead of VCC.',
      show: ['bb', 'r1', 'r2', 'r3', 'led1', 'led2', 'led3',
        'w_vcc_r1', 'w_vcc_r2', 'w_vcc_r3'],
    },
    {
      title: 'Wire resistors to LEDs',
      body: 'Orange wires: R1 p2 → LED1 anode, R2 p2 → LED2 anode, R3 p2 → LED3 anode.',
      show: ['bb', 'r1', 'r2', 'r3', 'led1', 'led2', 'led3',
        'w_vcc_r1', 'w_vcc_r2', 'w_vcc_r3',
        'w_r1_led1', 'w_r2_led2', 'w_r3_led3'],
    },
    {
      title: 'Wire LED cathodes to GND',
      body: 'Black wires: LED1, LED2, LED3 cathodes → GND rail. ' +
        'All three GPIO lines are now active — all LEDs should light up.',
      show: ['bb', 'r1', 'r2', 'r3', 'led1', 'led2', 'led3',
        'w_vcc_r1', 'w_vcc_r2', 'w_vcc_r3',
        'w_r1_led1', 'w_r2_led2', 'w_r3_led3',
        'w_led1_gnd', 'w_led2_gnd', 'w_led3_gnd'],
    },
  ],
};

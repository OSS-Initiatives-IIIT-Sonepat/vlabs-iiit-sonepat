import { describe, it, expect } from "vitest";
import * as THREE from "three";
import {
  buildDiode,
  buildDiodeStandalone,
  buildZenerDiode,
  buildZenerDiodeStandalone,
  buildAmmeter,
  buildAmmeterStandalone,
  buildVoltmeter,
  buildVoltmeterStandalone,
  buildBjt,
  buildBjtStandalone,
  buildMosfet,
  buildMosfetStandalone,
  buildOpAmp,
  buildOpAmpStandalone,
  buildSevenSegment,
  buildSevenSegmentStandalone,
  buildOscilloscope,
  buildOscilloscopeStandalone,
  buildFunctionGenerator,
  buildFunctionGeneratorStandalone,
  buildTransformer,
  buildTransformerStandalone,
  buildDipSwitch,
  buildDipSwitchStandalone,
  buildLogicAnalyser,
  buildLogicAnalyserStandalone,
  buildUnknownApparatusStandalone,
} from "@/components";
import { buildItemModel } from "@/labs/ApparatusScene";

describe("Apparatus 3D Geometry Builders", () => {
  it("builds Diode (mounted and standalone)", () => {
    const mounted = buildDiode();
    const standalone = buildDiodeStandalone("1N4007");
    expect(mounted).toBeInstanceOf(THREE.Group);
    expect(standalone).toBeInstanceOf(THREE.Group);
    expect(mounted.children.length).toBeGreaterThan(0);
    expect(standalone.children.length).toBeGreaterThan(0);
  });

  it("builds Zener Diode (mounted and standalone)", () => {
    const mounted = buildZenerDiode();
    const standalone = buildZenerDiodeStandalone("1N4733A");
    expect(mounted).toBeInstanceOf(THREE.Group);
    expect(standalone).toBeInstanceOf(THREE.Group);
    expect(mounted.children.length).toBeGreaterThan(0);
    expect(standalone.children.length).toBeGreaterThan(0);
  });

  it("builds Ammeter (mounted and standalone)", () => {
    const mounted = buildAmmeter("right", "0–100 mA");
    const standalone = buildAmmeterStandalone("0–100 mA");
    expect(mounted).toBeInstanceOf(THREE.Group);
    expect(standalone).toBeInstanceOf(THREE.Group);
    expect(standalone.children.length).toBeGreaterThan(5);
  });

  it("builds Voltmeter (mounted and standalone)", () => {
    const mounted = buildVoltmeter("right", "0–15 V");
    const standalone = buildVoltmeterStandalone("0–15 V");
    expect(mounted).toBeInstanceOf(THREE.Group);
    expect(standalone).toBeInstanceOf(THREE.Group);
    expect(standalone.children.length).toBeGreaterThan(5);
  });

  it("builds BJT BC547 (mounted and standalone)", () => {
    const mounted = buildBjt(new THREE.Vector3(0, 0, 0), "BC547");
    const standalone = buildBjtStandalone("BC547");
    expect(mounted).toBeInstanceOf(THREE.Group);
    expect(standalone).toBeInstanceOf(THREE.Group);
    expect(standalone.children.length).toBeGreaterThan(0);
  });

  it("builds MOSFET 2N7000 (mounted and standalone)", () => {
    const mounted = buildMosfet(new THREE.Vector3(0, 0, 0), "2N7000");
    const standalone = buildMosfetStandalone("2N7000");
    expect(mounted).toBeInstanceOf(THREE.Group);
    expect(standalone).toBeInstanceOf(THREE.Group);
    expect(standalone.children.length).toBeGreaterThan(0);
  });

  it("builds Op-Amp LM741 (mounted and standalone)", () => {
    const mounted = buildOpAmp(5, "LM741");
    const standalone = buildOpAmpStandalone("LM741");
    expect(mounted).toBeInstanceOf(THREE.Group);
    expect(standalone).toBeInstanceOf(THREE.Group);
    expect(standalone.children.length).toBeGreaterThan(0);
  });

  it("builds 7-Segment Display (mounted and standalone)", () => {
    const mounted = buildSevenSegment();
    const standalone = buildSevenSegmentStandalone();
    expect(mounted).toBeInstanceOf(THREE.Group);
    expect(standalone).toBeInstanceOf(THREE.Group);
    expect(standalone.children.length).toBeGreaterThan(7);
  });

  it("builds Oscilloscope (mounted and standalone)", () => {
    const mounted = buildOscilloscope("right");
    const standalone = buildOscilloscopeStandalone();
    expect(mounted).toBeInstanceOf(THREE.Group);
    expect(standalone).toBeInstanceOf(THREE.Group);
    expect(standalone.children.length).toBeGreaterThan(5);
  });

  it("builds Function Generator (mounted and standalone)", () => {
    const mounted = buildFunctionGenerator("left");
    const standalone = buildFunctionGeneratorStandalone();
    expect(mounted).toBeInstanceOf(THREE.Group);
    expect(standalone).toBeInstanceOf(THREE.Group);
    expect(standalone.children.length).toBeGreaterThan(5);
  });

  it("builds Step-Down Transformer (mounted and standalone)", () => {
    const mounted = buildTransformer("left");
    const standalone = buildTransformerStandalone();
    expect(mounted).toBeInstanceOf(THREE.Group);
    expect(standalone).toBeInstanceOf(THREE.Group);
    expect(standalone.children.length).toBeGreaterThan(5);
  });

  it("builds DIP Switch with 2, 4, 6, 8 poles (mounted and standalone)", () => {
    for (const poles of [2, 4, 6, 8]) {
      const mounted = buildDipSwitch(5, poles);
      const standalone = buildDipSwitchStandalone(poles);
      expect(mounted).toBeInstanceOf(THREE.Group);
      expect(standalone).toBeInstanceOf(THREE.Group);
      expect(standalone.children.length).toBeGreaterThan(poles);
    }
  });

  it("builds Logic Analyser (mounted and standalone)", () => {
    const mounted = buildLogicAnalyser("right");
    const standalone = buildLogicAnalyserStandalone();
    expect(mounted).toBeInstanceOf(THREE.Group);
    expect(standalone).toBeInstanceOf(THREE.Group);
    expect(standalone.children.length).toBeGreaterThan(5);
  });

  it("builds Unknown Apparatus Placeholder", () => {
    const placeholder = buildUnknownApparatusStandalone("Mysterious Black Box");
    expect(placeholder).toBeInstanceOf(THREE.Group);
    expect(placeholder.children.length).toBeGreaterThan(0);
  });
});

describe("ApparatusScene Dispatcher Matching (buildItemModel)", () => {
  it("correctly routes Zener Diode", () => {
    const m1 = buildItemModel({ name: "1N4733A Zener Diode" });
    const m2 = buildItemModel({ name: "Zener Diode 5.1V" });
    expect(m1).toBeInstanceOf(THREE.Group);
    expect(m2).toBeInstanceOf(THREE.Group);
  });

  it("correctly routes regular Diode (1N4007, 1N4148, PN junction)", () => {
    const d1 = buildItemModel({ name: "1N4007 Rectifier Diode" });
    const d2 = buildItemModel({ name: "1N4148 Silicon Diode" });
    const d3 = buildItemModel({ name: "PN Junction Diode" });
    expect(d1).toBeInstanceOf(THREE.Group);
    expect(d2).toBeInstanceOf(THREE.Group);
    expect(d3).toBeInstanceOf(THREE.Group);
  });

  it("correctly separates LED from Diodes", () => {
    const ledRed = buildItemModel({ name: "Red LED" });
    const ledGreen = buildItemModel({ name: "LED (green)" });
    expect(ledRed).toBeInstanceOf(THREE.Group);
    expect(ledGreen).toBeInstanceOf(THREE.Group);
  });

  it("correctly routes analog ammeter and voltmeter without matching DMM", () => {
    const ammeter = buildItemModel({ name: "Milliammeter / Ammeter" });
    const voltmeter = buildItemModel({ name: "Analog Voltmeter (0-15 V)" });
    const dmm = buildItemModel({ name: "Digital Multimeter (DMM)" });
    expect(ammeter).toBeInstanceOf(THREE.Group);
    expect(voltmeter).toBeInstanceOf(THREE.Group);
    expect(dmm).toBeInstanceOf(THREE.Group);
  });

  it("correctly routes transistors (BC547 BJT and 2N7000 MOSFET)", () => {
    const bjt = buildItemModel({ name: "BC547 NPN Transistor" });
    const mosfet = buildItemModel({ name: "2N7000 N-ch MOSFET" });
    expect(bjt).toBeInstanceOf(THREE.Group);
    expect(mosfet).toBeInstanceOf(THREE.Group);
  });

  it("correctly routes Op-Amp (LM741)", () => {
    const opamp = buildItemModel({ name: "LM741 Op-Amp" });
    expect(opamp).toBeInstanceOf(THREE.Group);
  });

  it("correctly routes 7-Segment Display", () => {
    const display = buildItemModel({ name: "Common Cathode 7-Segment Display" });
    expect(display).toBeInstanceOf(THREE.Group);
  });

  it("correctly routes Oscilloscope / CRO", () => {
    const cro = buildItemModel({ name: "CRO / Oscilloscope" });
    const osc = buildItemModel({ name: "Digital Oscilloscope" });
    expect(cro).toBeInstanceOf(THREE.Group);
    expect(osc).toBeInstanceOf(THREE.Group);
  });

  it("correctly routes Function Generator", () => {
    const fg = buildItemModel({ name: "Function Generator (1 Hz–1 MHz)" });
    expect(fg).toBeInstanceOf(THREE.Group);
  });

  it("correctly routes Step-Down Transformer", () => {
    const tf = buildItemModel({ name: "Step-down Transformer" });
    expect(tf).toBeInstanceOf(THREE.Group);
  });

  it("correctly routes DIP switches with variable pole counts", () => {
    const dip2 = buildItemModel({ name: "DIP Switch (2-pole)" });
    const dip4 = buildItemModel({ name: "DIP Switch (4-position)" });
    const dip8 = buildItemModel({ name: "DIP Switch (8-pole)" });
    expect(dip2).toBeInstanceOf(THREE.Group);
    expect(dip4).toBeInstanceOf(THREE.Group);
    expect(dip8).toBeInstanceOf(THREE.Group);
  });

  it("correctly routes Logic Analyser", () => {
    const la = buildItemModel({ name: "Logic Analyser / Simulator" });
    expect(la).toBeInstanceOf(THREE.Group);
  });

  it("renders visible unknown apparatus placeholder for unrecognised items", () => {
    const unknown = buildItemModel({ name: "Quantum Flux Resonator" });
    expect(unknown).toBeInstanceOf(THREE.Group);
  });
});

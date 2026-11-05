import { type SceneProcedureStep } from "@/labs/experiments/types";
import { ioOrganisationStepSchematics as fig } from "@/labs/schematics/semester-03/07-memory-and-io/io-organisation";
import { stages } from "../components";
const all = [...stages.power, ...stages.cpu, ...stages.port];
const data = { d0: 1, d1: 0, d2: 1, d3: 0 } as const;
export const procedureSteps: SceneProcedureStep[] = [
  { label: "Place the CPU, the RAM, and the port", body: "The CPU's address pins drive the RAM. The port sits beside them. DIN is 0101. Leave the strobe low, so the port has not latched and the flag is dark.", show: all, highlight: "port", activeInputs: { stb: 0, ...data }, schematic: fig[0] },
  { label: "Raise the strobe", body: "A rising strobe copies 0101 onto DOUT and lights the flag. The flag wire is the interrupt into the CPU. Leave the strobe high while you read the lamps: Q0 and Q2 on, Q1 and Q3 off, flag on.", show: all, highlight: "led_flag", activeInputs: { stb: 1, ...data }, schematic: fig[1] },
  { label: "Both handshakes", body: "Source-initiated transfer starts with the source strobe, which is the edge you just made. Destination-initiated transfer starts with a request from the receiver, and the source answers with the data.", show: all, activeInputs: { stb: 1, ...data }, schematic: fig[2] },
  { label: "A serial line", body: "The line rests at 1. A start bit is a 0. The data bits follow that 0, and the line returns to 1.", show: all, activeInputs: { stb: 1, ...data }, schematic: fig[3] },
  { label: "Daisy-chain priority", body: "The grant walks from device 0 toward device 2. The first device that wants service keeps the grant and does not pass it on.", show: all, activeInputs: { stb: 1, ...data }, schematic: fig[4] },
  { label: "DMA", body: "DMA writes the RAM without an instruction doing the copy. The data wire goes to memory. The CPU's read wire is not part of that transfer.", show: all, activeInputs: { stb: 1, ...data }, schematic: fig[5] },
  { label: "An I/O processor", body: "An IOP sits beside the CPU and runs the transfer program itself. The CPU keeps fetching its own instructions.", show: all, activeInputs: { stb: 1, ...data }, schematic: fig[6] },
];

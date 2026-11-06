import { block, frames } from "../diagram";

const cpu = (on = false) => block("cpu", 140, 110, 100, 44, "CPU", on);
const ram = (on = false) => block("ram", 320, 110, 100, 44, "RAM", on);
const port = (on = false) => block("port", 500, 110, 120, 44, "I/O port", on);

export const ioOrganisationStepSchematics = frames([
  {
    title: "A strobe from the source",
    elements: [cpu(), ram(), port(true)],
    notes: [
      "The source pulses STB. The port copies DIN onto DOUT and raises the flag.",
    ],
  },
  {
    title: "The flag is the interrupt",
    elements: [cpu(true), ram(), port(true)],
    notes: [
      "The flag wire is the interrupt into the CPU. The CPU then reads DOUT.",
    ],
  },
  {
    title: "Source-initiated and destination-initiated handshake",
    height: 280,
    elements: [
      block("src", 320, 80, 280, 40, "source strobe, then data"),
      block("dst", 320, 150, 280, 40, "destination request, then ack", true),
    ],
    notes: ["One side starts the transfer. The other side answers."],
  },
  {
    title: "A serial line idles at 1",
    elements: [block("ser", 320, 120, 300, 48, "1 1 1 0 …", true)],
    notes: ["Idle is 1. A start bit is 0. The data bits follow the start bit."],
  },
  {
    title: "Daisy-chain priority",
    elements: [
      block("d0", 140, 120, 100, 44, "device 0", true),
      block("d1", 320, 120, 100, 44, "device 1"),
      block("d2", 500, 120, 100, 44, "device 2"),
    ],
    notes: [
      "The grant passes down the chain. The first device that wants it keeps it.",
    ],
  },
  {
    title: "DMA writes memory without the CPU",
    elements: [cpu(), ram(true), port()],
    notes: [
      "The data wire goes to RAM. The CPU's read wire is not in this picture.",
    ],
  },
  {
    title: "An I/O processor beside the CPU",
    elements: [cpu(), ram(), block("iop", 500, 110, 120, 44, "IOP", true)],
    notes: [
      "The IOP runs the transfer program. The CPU keeps its own instruction stream.",
    ],
  },
]);

export const ioOrganisationTheoryDiagram = ioOrganisationStepSchematics[1];

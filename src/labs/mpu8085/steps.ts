import { pin8085 } from "./pins";

export type PinLandmark = {
  id: string;
  /** Pins this note points at. A bus is one note for the whole group. */
  pins: string[];
  title: string;
  /** Two short sentences. The card wraps them to about three lines. */
  text: string;
};

export type PinStep = {
  label: string;
  body: string;
  /** Pins this step is about. They are drawn blue. */
  focus: string[];
  /** Pins whose names appear for the first time on this step. */
  added: string[];
  landmarks: PinLandmark[];
};

/**
 * Teaching order is by job, not by pin number. Power before clock,
 * clock before anything timed, the address before the strobes that use it.
 */
export const PIN_STEPS: PinStep[] = [
  {
    label: "The package",
    focus: [],
    added: [],
    landmarks: [
      {
        id: "pin1",
        pins: ["X1"],
        title: "Pin 1",
        text: "The gold dot and the notch mark this end. Pins 1 to 20 run down this row. Pin 40 sits opposite, at the notch end of the far row.",
      },
    ],
    body: "The black body is a 40-pin dual in-line package. The gold dot, and the notch in that same end, mark pin 1. Hold the notch to the left. The near row is pins 1 to 20, counted from the notch down to the far end. The far row is numbered the other way: pin 21 is at the far end, and the numbers climb back toward the notch, ending at pin 40 opposite pin 1.\n\nOn each step the pins in that story turn blue and lift off the body, and a short note pops out beside them. Drag to turn the package. The drawing in the corner is the same pinout, filled in at the same pace.\n\nNothing on this chip is a breadboard wire. Every pin is a conversation between the processor and the rest of the board.",
  },
  {
    label: "Power",
    focus: ["VCC", "VSS"],
    added: ["VCC", "VSS"],
    landmarks: [
      {
        id: "vcc",
        pins: ["VCC"],
        title: "VCC · pin 40",
        text: "+5 V, the only supply this chip needs. A high on any other pin is a voltage close to this one.",
      },
      {
        id: "vss",
        pins: ["VSS"],
        title: "VSS · pin 20",
        text: "Ground, 0 V. Every other voltage on the chip is measured from here.",
      },
    ],
    body: "VCC, pin 40, is +5 V. VSS, pin 20, is ground, 0 V. They sit opposite each other at the two ends of the package: VCC beside the notch, VSS at the far end of the other row. Every other voltage on the chip is measured from VSS. A high is a voltage close to VCC. A low is a voltage close to VSS.\n\nThe 8085 was built to need only this one supply. Its predecessor, the 8080, needed +5 V, +12 V, and −5 V. A single rail is why a small instrument could have a processor at all. The current is modest, but the clock edges are fast, so a capacitor from VCC to VSS, close to the package, keeps the supply from dipping on each edge. Without VSS the other 38 pins have no reference, and without VCC none of them can change.",
  },
  {
    label: "The clock",
    focus: ["X1", "X2", "CLK"],
    added: ["X1", "X2", "CLK"],
    landmarks: [
      {
        id: "x1",
        pins: ["X1"],
        title: "X1 · pin 1",
        text: "One leg of the crystal, usually 6 MHz. An external clock can drive this pin instead.",
      },
      {
        id: "x2",
        pins: ["X2"],
        title: "X2 · pin 2",
        text: "The other leg of the crystal. Leave it open when X1 is driven from outside.",
      },
      {
        id: "clk",
        pins: ["CLK"],
        title: "CLK (OUT) · pin 37",
        text: "The crystal divided by two. A 6 MHz crystal makes a 3 MHz clock for the rest of the board.",
      },
    ],
    body: "X1 and X2, pins 1 and 2, are the two legs of the on-chip oscillator. A crystal across them, commonly 6 MHz, is the whole clock circuit. The 8085 divides that frequency by two, so a 6 MHz crystal produces a 3 MHz processor clock. An external clock of twice the wanted frequency can drive X1 instead, and then X2 is left open.\n\nCLK (OUT), pin 37, is that divided clock, buffered, leaving the chip. Memory, the address latch, and peripherals such as the 8255 use this pin so they see the same edges the processor uses. A machine cycle is a few of these clocks, called T-states. In T1 the address goes out. In T2 a read or a write is signalled. In T3 the data transfer ends. If the clock stops, every other pin freezes between two T-states. The clock does not carry data. It decides when the other pins are allowed to mean something.",
  },
  {
    label: "Reset",
    focus: ["RESET IN", "RESET OUT"],
    added: ["RESET IN", "RESET OUT"],
    landmarks: [
      {
        id: "reset-in",
        pins: ["RESET IN"],
        title: "RESET IN · pin 36",
        text: "Active low. Hold it low for three clocks. The program counter clears, and the first fetch comes from 0000H.",
      },
      {
        id: "reset-out",
        pins: ["RESET OUT"],
        title: "RESET OUT · pin 3",
        text: "Goes high for the same time, so the other chips reset with the processor. It is an output, not a second reset input.",
      },
    ],
    body: "RESET IN, pin 36, is active low, and it has a Schmitt trigger so a slowly rising capacitor still produces one clean edge. Hold it low for at least three clocks. While it is low the program counter is cleared, the interrupt-enable flip-flop is cleared, and the buses are released. When the pin rises, the first thing the processor does is fetch an opcode from address 0000H. That is why a reset program lives at the bottom of memory.\n\nRESET OUT, pin 3, goes high for the same interval. It is not a second reset input. It is the processor telling the 8255, the timer, and the serial chip to reset with it. If those chips came out of reset earlier or later, they would answer the first bus cycle in a random state. RESET IN is the cause. RESET OUT is the same news, repeated for the rest of the board.",
  },
  {
    label: "High address",
    focus: ["A8", "A9", "A10", "A11", "A12", "A13", "A14", "A15"],
    added: ["A8", "A9", "A10", "A11", "A12", "A13", "A14", "A15"],
    landmarks: [
      {
        id: "ahi",
        pins: ["A8", "A9", "A10", "A11", "A12", "A13", "A14", "A15"],
        title: "A8–A15 · pins 21–28",
        text: "The high half of the address, held for the whole cycle. With A0–A7 they name any byte in 64 KB. These eight are never reused for data.",
      },
    ],
    body: "A8 to A15 are pins 21 to 28. A8 is at the far end, beside VSS. The number climbs toward the notch, and A15, the most significant bit, is pin 28. These eight pins are an address for the whole machine cycle. They are never borrowed for data.\n\nEight more bits, A0 to A7, join them to make a 16-bit address. $2^{16} = 65536$, so the processor can name 64 KB. A15 selects the top or bottom half of that space. A memory chip uses these pins, together with IO/M, to decide whether the cycle is for it. They stay driven until the cycle ends, which is why a designer can decode them with ordinary gates and does not need a latch on this half of the address.",
  },
  {
    label: "The shared bus",
    focus: ["AD0", "AD1", "AD2", "AD3", "AD4", "AD5", "AD6", "AD7"],
    added: ["AD0", "AD1", "AD2", "AD3", "AD4", "AD5", "AD6", "AD7"],
    landmarks: [
      {
        id: "ad",
        pins: ["AD0", "AD1", "AD2", "AD3", "AD4", "AD5", "AD6", "AD7"],
        title: "AD0–AD7 · pins 12–19",
        text: "In T1 they carry the low address. After ALE falls they carry the data byte. They are the only pins that change direction.",
      },
    ],
    body: "AD0 to AD7 are pins 12 to 19, just above VSS. The letters say what is awkward about them. In T1 they carry A0 to A7, the low half of the address. In T2 and T3 they carry D0 to D7, the data byte. One set of wires, two jobs, at two different times.\n\nThe package is the reason. A separate 16-bit address bus and an 8-bit data bus would be 24 pins before power, clock, and control, and the cheap package had 40 pins. Sharing eight of them is what made the 8085 fit. The cost is that memory cannot watch these pins all cycle and call them an address, because halfway through the cycle they stop being an address. Something outside the chip has to remember A0 to A7. That something is a latch, and the next pin tells it when to remember.\n\nOn a write, the processor drives the data. On a read, it lets go and the memory drives the same pins. They are the only pins that change direction.",
  },
  {
    label: "ALE",
    focus: ["ALE"],
    added: ["ALE"],
    landmarks: [
      {
        id: "ale",
        pins: ["ALE"],
        title: "ALE · pin 30",
        text: "High during T1, while the low address is on AD0–AD7. A latch stores that address on the falling edge.",
      },
    ],
    body: "ALE, pin 30, is Address Latch Enable. It goes high during T1, while AD0 to AD7 still carry A0 to A7, and it falls at the end of T1. A transparent latch, usually a 74HC373, passes those eight bits through while ALE is high and holds them when ALE falls.\n\nAfter that edge the latch outputs are a steady A0 to A7 for the rest of the cycle, and the processor is free to reuse AD0 to AD7 as data. A8 to A15 never needed this, because they have their own pins and do not change job. If ALE is missing, or the latch is missing, the memory sees an address for one clock and then sees the data byte on the same wires and treats that byte as the rest of the address. Reads return the wrong location. ALE is the handshake that keeps the low address and the data from being on the wires at the same time.",
  },
  {
    label: "Read and write",
    focus: ["RD", "WR"],
    added: ["RD", "WR"],
    landmarks: [
      {
        id: "rd",
        pins: ["RD"],
        title: "RD · pin 32",
        text: "Active low. Memory or a port puts a byte on the bus while this pin is low. The processor samples it as the pin rises.",
      },
      {
        id: "wr",
        pins: ["WR"],
        title: "WR · pin 31",
        text: "Active low. The byte is already on the bus. The device stores it on the rising edge.",
      },
    ],
    body: "RD, pin 32, and WR, pin 31, are active low. A bar over the name in a datasheet means the same thing: the action happens when the pin is near 0 V. Both are high when the bus is idle.\n\nRD falls in T2 of a read. Memory, or an input port, must place a byte on AD0 to AD7. The processor samples that byte and then raises RD. The rising edge is the end of the read. WR falls when the byte the processor is writing is already valid on AD0 to AD7. The device stores the byte on the rising edge of WR, so the data must stay valid until that edge.\n\nOnly one of them is low in a given cycle. Both low would tell a device to drive the bus and to store it at the same time. They say when. They do not say whether the address is a memory location or a port. IO/M says that.",
  },
  {
    label: "Memory or I/O",
    focus: ["IO/M"],
    added: ["IO/M"],
    landmarks: [
      {
        id: "iom",
        pins: ["IO/M"],
        title: "IO/M · pin 34",
        text: "Low means the address is a memory location, one of 64 KB. High means the low eight bits are a port number, one of 256.",
      },
    ],
    body: "IO/M, pin 34, chooses the address space. Low means the 16-bit address is a memory location, one of 64 KB. High means the low eight address bits are a port number. There are 256 input ports and 256 output ports. IN and OUT raise this pin. Opcode fetch, LDA, STA, and every other memory cycle leave it low.\n\nA memory chip must be enabled only when IO/M is low, and a port only when it is high. If both respond, they drive AD0 to AD7 together and the byte is garbage. The pin exists because the 8085 has two maps and only one bus. The same A0 to A7 that are a memory address in one cycle are a port number in another. IO/M is how the board tells those cycles apart. During hold, halt, and reset the processor floats this pin, so neither memory nor a port is selected while someone else owns the bus.",
  },
  {
    label: "Status",
    focus: ["S0", "S1"],
    added: ["S0", "S1"],
    landmarks: [
      {
        id: "status",
        pins: ["S1", "S0"],
        title: "S1 and S0 · pins 33 and 29",
        text: "Together with IO/M they name the cycle. Opcode fetch is IO/M low, and both of these pins high.",
      },
    ],
    body: "S1, pin 33, and S0, pin 29, name the machine cycle. IO/M alone cannot tell a memory read from a memory write, or an opcode fetch from either. The three pins together can.\n\nOpcode fetch is IO/M low, S1 high, S0 high. Memory read is IO/M low, S1 high, S0 low. Memory write is IO/M low, S1 low, S0 high. I/O read is IO/M high, S1 high, S0 low. I/O write is IO/M high, S1 low, S0 high. Interrupt acknowledge is IO/M high, S1 high, S0 high. Halt drives S1 and S0 low and floats IO/M.\n\nOpcode fetch is a memory read with a special name, because the byte is an instruction and the processor has internal work to do with it. A board rarely needs S0 and S1 to talk to ordinary RAM. They matter when a peripheral has to notice an opcode fetch, or when you are looking at the bus with a probe and need to know which cycle you are seeing. RD and WR still say whether data moves in or out. S0 and S1 say why.",
  },
  {
    label: "Wait states",
    focus: ["READY"],
    added: ["READY"],
    landmarks: [
      {
        id: "ready",
        pins: ["READY"],
        title: "READY · pin 35",
        text: "Sampled in T2. Hold it low and the processor waits, with the address and the strobe left as they are.",
      },
    ],
    body: "READY, pin 35, is the slow device's way to ask for more time. The processor samples it in T2. If it is high, the cycle finishes on the usual clocks. If it is low, the processor inserts wait states, extra clocks called TW, and samples READY again on each of them. When READY rises, the cycle completes.\n\nA slow EPROM uses this. Its data is not valid a few hundred nanoseconds after the address, and the processor would otherwise latch whatever voltages happened to be on AD0 to AD7. The EPROM holds READY low until its output is valid. The address, ALE, RD, and IO/M all stay as they were. Only time is added. READY does not choose the device and it does not carry a bit of the byte. It stretches the cycle the other pins have already defined. Tie it high if every device on the board is fast enough, or the processor waits forever.",
  },
  {
    label: "Serial pins",
    focus: ["SOD", "SID"],
    added: ["SOD", "SID"],
    landmarks: [
      {
        id: "sod",
        pins: ["SOD"],
        title: "SOD · pin 4",
        text: "A single output bit. SIM copies bit 7 of A out here, and only when bit 6 is set.",
      },
      {
        id: "sid",
        pins: ["SID"],
        title: "SID · pin 5",
        text: "A single input bit. RIM copies it into bit 7 of A. There is no baud clock behind it.",
      },
    ],
    body: "SID, pin 5, is a single input bit. SOD, pin 4, is a single output bit. They are not a bus. They are one wire in and one wire out, for a keyboard, a cassette, or any device that can wait for software to time the bits.\n\nThe RIM instruction copies SID into bit 7 of the accumulator. The SIM instruction copies bit 7 of the accumulator out to SOD, but only if bit 6 is set. If bit 6 is clear, SIM leaves SOD alone. The same SIM instruction also programs the interrupt masks, so a program that only wanted to send a serial bit must keep the mask bits the same, or it will silence an interrupt by accident.\n\nThere is no shift register and no baud generator behind these pins. The program decides how long a bit lasts. That is enough for a slow link, and it cost only two pins. A full serial port, with its own clock and buffers, is a separate chip such as the 8251, wired to the ordinary bus.",
  },
  {
    label: "Interrupts",
    focus: ["TRAP", "RST 7.5", "RST 6.5", "RST 5.5", "INTR", "INTA"],
    added: ["TRAP", "RST 7.5", "RST 6.5", "RST 5.5", "INTR", "INTA"],
    landmarks: [
      {
        id: "trap",
        pins: ["TRAP"],
        title: "TRAP · pin 6",
        text: "Highest priority, and it cannot be masked. The service routine starts at 0024H.",
      },
      {
        id: "rst75",
        pins: ["RST 7.5"],
        title: "RST 7.5 · pin 7",
        text: "Rising-edge, and the edge is remembered. Maskable. The routine is at 003CH.",
      },
      {
        id: "rst65",
        pins: ["RST 6.5"],
        title: "RST 6.5 · pin 8",
        text: "Level sensitive, so the device must hold it high. The routine is at 0034H.",
      },
      {
        id: "rst55",
        pins: ["RST 5.5"],
        title: "RST 5.5 · pin 9",
        text: "Level sensitive, the lowest of the three restarts. The routine is at 002CH.",
      },
      {
        id: "intr",
        pins: ["INTR"],
        title: "INTR · pin 10",
        text: "A general request with no address of its own. It waits until the processor answers.",
      },
      {
        id: "inta",
        pins: ["INTA"],
        title: "INTA · pin 11",
        text: "Active low, and the answer to INTR only. The device then places an instruction on the data bus.",
      },
    ],
    body: "Six pins let the outside world stop the program. Priority, from the top, is TRAP, RST 7.5, RST 6.5, RST 5.5, then INTR. On the package that is also the order down the left row, pins 6 to 10, with INTA, pin 11, after them as the reply.\n\nTRAP cannot be masked. It is edge and level sensitive: it must see a rising edge, and it must still be high when it is sampled, so a narrow glitch does not fire it. Its service routine begins at 0024H. Use it for something that must be handled even after DI, such as power failing.\n\nRST 7.5 is rising-edge triggered and the edge is latched, so a short pulse is remembered. SIM can clear that latch, and can mask the pin. The routine is at 003CH. RST 6.5 and RST 5.5 are level sensitive. They are not latched, so the device must hold the pin high until the processor accepts it. Their routines are at 0034H and 002CH. All three are masked individually by SIM, and all three are ignored while the interrupt-enable flip-flop is clear. EI sets that flip-flop. DI and RESET IN clear it.\n\nINTR is the general request. It is level sensitive, and it has no built-in address. INTA, active low, is the processor's answer, and only to INTR. During INTA the device places an instruction on the data bus, usually RST n or CALL. TRAP and the three RST pins already know their addresses, so they do not use INTA. RIM reports which of RST 7.5, 6.5, and 5.5 are pending, which are masked, and what SID currently is.",
  },
  {
    label: "DMA",
    focus: ["HOLD", "HLDA"],
    added: ["HOLD", "HLDA"],
    landmarks: [
      {
        id: "hold",
        pins: ["HOLD"],
        title: "HOLD · pin 39",
        text: "A DMA controller raises it to ask for the buses. The processor finishes the current cycle, then lets those wires go.",
      },
      {
        id: "hlda",
        pins: ["HLDA"],
        title: "HLDA · pin 38",
        text: "The answer. High means the address bus, RD, WR, and IO/M are floating, and the controller may drive them.",
      },
    ],
    body: "HOLD, pin 39, asks for the buses. A DMA controller, such as the 8257, raises it when it wants to move a block of bytes between a disk and memory without the processor executing a load for every byte. The processor finishes the machine cycle it is already in. It then floats AD0 to AD7, A8 to A15, RD, WR, and IO/M, so those wires can be driven by someone else.\n\nHLDA, pin 38, goes high to say the buses are free. The controller does its transfers and then drops HOLD. The processor drops HLDA and drives the buses again. HLDA is not a second request. It is the answer to HOLD, in the same way INTA is the answer to INTR and RESET OUT is the echo of RESET IN. During the hold, the processor does not fetch, and a memory chip must obey the controller's RD and WR rather than the processor's, which is why the processor had to let go of those pins instead of merely pausing.",
  },
  {
    label: "One memory read",
    focus: [
      "CLK",
      "A8",
      "A9",
      "A10",
      "A11",
      "A12",
      "A13",
      "A14",
      "A15",
      "AD0",
      "AD1",
      "AD2",
      "AD3",
      "AD4",
      "AD5",
      "AD6",
      "AD7",
      "ALE",
      "IO/M",
      "S1",
      "S0",
      "RD",
      "READY",
    ],
    added: [],
    landmarks: [
      {
        id: "fetch-clk",
        pins: ["CLK"],
        title: "CLK",
        text: "This edge is T1. Every other pin in the fetch is timed from it.",
      },
      {
        id: "fetch-hi",
        pins: ["A8", "A9", "A10", "A11", "A12", "A13", "A14", "A15"],
        title: "A8–A15",
        text: "The high half of address 0000H. It stays driven for the whole cycle.",
      },
      {
        id: "fetch-ad",
        pins: ["AD0", "AD1", "AD2", "AD3", "AD4", "AD5", "AD6", "AD7"],
        title: "AD0–AD7",
        text: "The low address during T1, then the opcode byte once RD falls.",
      },
      {
        id: "fetch-ale",
        pins: ["ALE"],
        title: "ALE",
        text: "Falls at the end of T1. The latch keeps A0–A7 after that.",
      },
      {
        id: "fetch-status",
        pins: ["IO/M", "S1", "S0"],
        title: "IO/M, S1, S0",
        text: "IO/M stays low, so this is memory. S1 and S0 are both high, so the byte is an opcode.",
      },
      {
        id: "fetch-rd",
        pins: ["RD"],
        title: "RD",
        text: "Falls in T2. Memory drives the bus, and the processor reads the byte as RD rises.",
      },
      {
        id: "fetch-ready",
        pins: ["READY"],
        title: "READY",
        text: "High, so the cycle is not stretched. A slow memory would hold this pin low and the processor would wait.",
      },
    ],
    body: "After reset the program counter is 0000H, so the first cycle reads the opcode there. Follow the blue pins in time, not by pin number.\n\nCLK marks T1. A8 to A15 and, for this one T-state, AD0 to AD7, present 0000H. ALE falls and the latch keeps A0 to A7. IO/M stays low, because this is memory. S1 and S0 are both high, because the byte is an opcode. RD falls. If the memory is slow it holds READY low, and the processor waits with the address and RD still as they are. When READY is high the memory's byte is on AD0 to AD7, the processor samples it, RD rises, and the program counter becomes 0001H.\n\nVCC and VSS made the voltages mean something. X1 and X2 made CLK. RESET IN chose address zero. The address pins and ALE named the location. IO/M, S1, and S0 said what kind of cycle it was. RD moved the byte. READY was allowed to stretch it. The interrupt pins and HOLD stayed quiet, which is why the fetch was allowed to finish. Every later instruction is the same pins, in the same order, with a different address and sometimes WR instead of RD.",
  },
];

export function revealedThrough(stepIndex: number): string[] {
  const ids: string[] = [];
  for (let i = 0; i <= stepIndex; i++) ids.push(...PIN_STEPS[i].added);
  return ids;
}

export const PIN_TABLE_HEADERS = ["Pin", "No.", "Dir.", "What it does"];

/** Rows in the order the procedure reveals the pins. */
export const PIN_TABLE_ROWS: string[][] = PIN_STEPS.flatMap((step) =>
  step.added.map((id) => {
    const pin = pin8085(id);
    return [pin.name, String(pin.n), pin.dir, pin.role];
  }),
);

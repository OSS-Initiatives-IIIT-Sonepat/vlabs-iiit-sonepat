import { CPU8085, assemble, entryAddress } from "@/labs/emulator";
import type { CPU8085State } from "@/labs/emulator";

export type KitKey =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "RES"
  | "INC"
  | "DEC"
  | "EXE"
  | "BRK"
  | "STP"
  | "INS"
  | "DEL"
  | "REG"
  | "INP"
  | "SHIFT"
  | "MOV"
  | "OUT"
  | "DNL"
  | "FIL"
  | "HLP"
  | "CODE";

export type KitPhase = "power" | "enter" | "run" | "read";

export type KitFrame = {
  key: KitKey | null;
  digits: string;
  leds: number;
  caption: string;
  detail: string;
  phase: KitPhase;
};

export type KitSession = {
  frames: KitFrame[];
  /** Snapshot from EXEC. Null when the source did not assemble. */
  cpu: CPU8085State | null;
  error: string | null;
};

type Mode = "off" | "ready" | "exam-addr" | "exam-data" | "go-addr" | "halted";

export type Monitor = {
  mem: Uint8Array;
  mode: Mode;
  addr: number;
  typed: string;
  digits: string;
  leds: number;
  caption: string;
  detail: string;
  cpu: CPU8085State | null;
  haltAddress: number | null;
};

const HEX = new Set("0123456789ABCDEF".split(""));

function hex2(n: number): string {
  return (n & 0xff).toString(16).toUpperCase().padStart(2, "0");
}

function hex4(n: number): string {
  return (n & 0xffff).toString(16).toUpperCase().padStart(4, "0");
}

function ledsOf(digits: string): number {
  const data = digits.slice(4, 6);
  return /^[0-9A-F]{2}$/.test(data) ? parseInt(data, 16) : 0;
}

function viewDigits(addr: string, data: string): string {
  return `${(addr + "    ").slice(0, 4)}${(data + "  ").slice(0, 2)}`;
}

function clone(m: Monitor): Monitor {
  return {
    ...m,
    mem: new Uint8Array(m.mem),
    cpu: m.cpu
      ? { ...m.cpu, flags: { ...m.cpu.flags }, memory: m.cpu.memory }
      : null,
  };
}

export function powerOn(): Monitor {
  const digits = "      ";
  return {
    mem: new Uint8Array(65536),
    mode: "off",
    addr: 0,
    typed: "",
    digits,
    leds: 0,
    caption: "The kit is powered. Press RES. The monitor signs on as UPC-8085.",
    detail:
      "Six digits: four for the address, two for the byte at that address.",
    cpu: null,
    haltAddress: null,
  };
}

function finish(
  m: Monitor,
  digits: string,
  caption: string,
  detail = "",
): Monitor {
  m.digits = digits;
  m.leds = ledsOf(digits);
  m.caption = caption;
  m.detail = detail;
  return m;
}

/** One key, as the monitor on the kit would take it. Returns a new state. */
export function pressKey(prev: Monitor, key: KitKey): Monitor {
  const m = clone(prev);

  if (key === "RES") {
    m.mode = "exam-addr";
    m.typed = "";
    m.cpu = null;
    m.haltAddress = null;
    return finish(
      m,
      "8085  ",
      "RES. The display signs on UPC-8085. Type the four digits of an address. RAM is kept.",
      "The sign-on is the monitor, not a memory address.",
    );
  }

  if (m.mode === "off") {
    return finish(
      m,
      m.digits,
      "Press RES first. The monitor is not running yet.",
      m.detail,
    );
  }

  if (key === "INC" || key === "DEC") {
    if (m.mode !== "exam-data") {
      return finish(
        m,
        m.digits,
        "Type a full address before INC or DEC.",
        m.detail,
      );
    }
    m.addr = (m.addr + (key === "INC" ? 1 : -1)) & 0xffff;
    m.typed = "";
    const byte = m.mem[m.addr];
    return finish(
      m,
      viewDigits(hex4(m.addr), hex2(byte)),
      `${key}. ${hex4(m.addr)}H holds ${hex2(byte)}H.`,
      "Type two digits to replace this byte.",
    );
  }

  if (key === "EXE") {
    if (m.mode !== "exam-data") {
      return finish(
        m,
        m.digits,
        "Type the four digits of the start address, then EXE.",
        m.detail,
      );
    }
    const start = m.addr;
    const cpu = new CPU8085();
    for (let i = 0; i < m.mem.length; i++) {
      if (m.mem[i]) cpu.writeMem(i, m.mem[i]);
    }
    cpu.setState({ PC: start });
    const steps = cpu.run(200000);
    const state = cpu.getState();
    const memory = new Uint8Array(state.memory);
    m.mem = memory;
    m.cpu = {
      ...state,
      flags: { ...state.flags },
      memory: new Uint8Array(memory),
    };
    const last = steps[steps.length - 1];
    m.haltAddress = state.halted && last ? last.address : state.PC;
    m.mode = "halted";
    m.typed = "";
    const where = hex4(m.haltAddress);
    const acc = hex2(state.A);
    return finish(
      m,
      viewDigits(where, acc),
      state.halted
        ? `Halted at ${where}H. The data digits are the accumulator, ${acc}H.`
        : `Stopped at ${where}H before HLT. Accumulator is ${acc}H.`,
      "RES, then the result address, reads back what the program stored.",
    );
  }

  const aside: Partial<Record<KitKey, string>> = {
    BRK: "BRK marks a breakpoint. This program runs straight through to HLT.",
    STP: "STP would execute one instruction. EXE runs until HLT.",
    INS: "INS opens a gap for one more byte.",
    DEL: "DEL removes the byte at this address.",
    REG: "REG shows a register instead of a memory byte.",
    INP: "INP reads an input port.",
    SHIFT: "SHIFT is the second function of the key beside it.",
    MOV: "MOV copies a block of RAM.",
    OUT: "OUT writes an output port.",
    DNL: "DNL loads a program from the host.",
    FIL: "FIL fills a range of RAM with one byte.",
    HLP: "HLP lists the monitor commands.",
    CODE: "CODE is the monitor's opcode helper.",
  };
  if (aside[key]) {
    return finish(m, m.digits, aside[key] ?? "", m.detail);
  }

  if (!HEX.has(key)) return m;

  if (m.mode === "exam-addr" || m.mode === "go-addr") {
    if (m.mode === "go-addr" && m.typed.length >= 4) {
      return finish(m, m.digits, "Press EXE.", m.detail);
    }
    m.typed += key;
    const field = (m.typed + "----").slice(0, 4);
    if (m.typed.length < 4) {
      return finish(
        m,
        viewDigits(field, "  "),
        `${key}. Address so far ${m.typed}.`,
        "",
      );
    }
    m.addr = parseInt(m.typed, 16);
    if (m.mode === "go-addr") {
      return finish(
        m,
        viewDigits(hex4(m.addr), "  "),
        `Start address ${hex4(m.addr)}H. Press EXE.`,
        "",
      );
    }
    m.typed = "";
    m.mode = "exam-data";
    const byte = m.mem[m.addr];
    return finish(
      m,
      viewDigits(hex4(m.addr), hex2(byte)),
      `${hex4(m.addr)}H holds ${hex2(byte)}H. Type two digits to replace it, or INC.`,
      "",
    );
  }

  if (m.mode === "exam-data") {
    m.typed += key;
    if (m.typed.length === 1) {
      return finish(
        m,
        viewDigits(hex4(m.addr), `${key} `),
        `${key}, the high digit. One more digit completes the byte.`,
        "",
      );
    }
    m.mem[m.addr] = parseInt(m.typed, 16);
    const stored = hex2(m.mem[m.addr]);
    m.typed = "";
    return finish(
      m,
      viewDigits(hex4(m.addr), stored),
      `${stored}H is stored at ${hex4(m.addr)}H.`,
      "INC moves to the next address.",
    );
  }

  return finish(
    m,
    m.digits,
    "Press RES, then type an address. EXE runs from the address on the display.",
    m.detail,
  );
}

export function replay(keys: readonly KitKey[]): Monitor {
  let m = powerOn();
  for (const key of keys) m = pressKey(m, key);
  return m;
}

function parseBytes(text: string): number[] {
  if (!text.trim()) return [];
  return text
    .trim()
    .split(/\s+/)
    .map((part) => parseInt(part, 16))
    .filter((n) => !Number.isNaN(n));
}

function cleanSource(source: string): string {
  return source.split(";")[0].trim().replace(/\s+/g, " ");
}

function spansOf(
  image: Map<number, number>,
): { address: number; bytes: number[] }[] {
  const addresses = [...image.keys()].sort((a, b) => a - b);
  const spans: { address: number; bytes: number[] }[] = [];
  for (const address of addresses) {
    const last = spans[spans.length - 1];
    const byte = image.get(address) ?? 0;
    if (last && address === last.address + last.bytes.length)
      last.bytes.push(byte);
    else spans.push({ address, bytes: [byte] });
  }
  return spans;
}

function writtenBetween(mem: Uint8Array, image: Map<number, number>): number[] {
  const changed: number[] = [];
  for (let address = 0x8000; address <= 0x80ff; address++) {
    const before = image.get(address) ?? 0;
    if ((mem[address] ?? 0) !== before) changed.push(address);
  }
  return changed;
}

/** A 16-bit store leaves a 00 high byte, which matches empty RAM and would be skipped. */
function highBytesOf(changed: number[]): number[] {
  if (changed.length < 2 || changed[1] !== changed[0] + 2) return changed;
  const out: number[] = [];
  for (let i = 0; i < changed.length; i++) {
    out.push(changed[i]);
    const next = changed[i + 1];
    if (next === changed[i] + 2 || next === undefined) out.push(changed[i] + 1);
  }
  return out;
}

function groupsOf(addresses: number[]): number[][] {
  const groups: number[][] = [];
  for (const address of addresses) {
    const last = groups[groups.length - 1];
    if (last && address === last[last.length - 1] + 1) last.push(address);
    else groups.push([address]);
  }
  return groups;
}

/**
 * The key sequence a student would use to type this program in,
 * run it, and read the bytes it changed between 8000H and 80FFH.
 */
export function buildKitSession(
  source: string,
  memoryInit: Record<string, number> | undefined,
  expected: string,
): KitSession {
  const result = assemble(source);
  if (result.errors.length > 0) {
    const power = powerOn();
    return {
      frames: [
        {
          key: null,
          digits: power.digits,
          leds: 0,
          caption:
            "The program did not assemble, so the kit has nothing to enter.",
          detail: result.errors
            .map((e) => `Line ${e.line}: ${e.message}`)
            .join(" "),
          phase: "power",
        },
      ],
      cpu: null,
      error: result.errors
        .map((e) => `Line ${e.line}: ${e.message}`)
        .join("\n"),
    };
  }

  const image = new Map<number, number>();
  const notes = new Map<number, string>();
  for (const line of result.listing) {
    const bytes = parseBytes(line.bytes);
    const note = cleanSource(line.source);
    bytes.forEach((byte, i) => {
      image.set(line.address + i, byte);
      if (note) notes.set(line.address + i, note);
    });
  }
  if (memoryInit) {
    for (const [raw, value] of Object.entries(memoryInit)) {
      const address = parseInt(raw, 16);
      if (!Number.isNaN(address)) image.set(address & 0xffff, value & 0xff);
    }
  }

  const frames: KitFrame[] = [];
  let m = powerOn();
  const push = (
    key: KitKey | null,
    phase: KitPhase,
    caption?: string,
    detail?: string,
  ) => {
    if (key) m = pressKey(m, key);
    frames.push({
      key,
      digits: m.digits,
      leds: m.leds,
      caption: caption ?? m.caption,
      detail: detail ?? m.detail,
      phase,
    });
  };

  push(
    null,
    "power",
    "The kit is powered. Press RES and the display signs on.",
    "Hex keys enter an address, then the byte. INC steps on. EXE runs.",
  );
  push(
    "RES",
    "power",
    "RES. The display signs on UPC-8085. Type the address of the first byte.",
    "RAM is empty until you enter it.",
  );

  spansOf(image).forEach((span, spanIndex) => {
    const at = hex4(span.address);
    if (spanIndex > 0) {
      push(
        "RES",
        "enter",
        `RES. RAM stays. Type ${at}H.`,
        notes.get(span.address) ?? "",
      );
    }
    for (let d = 0; d < 4; d++) {
      const digit = at[d] as KitKey;
      const soFar = at.slice(0, d + 1);
      push(
        digit,
        "enter",
        d < 3
          ? `${digit}. Address so far ${soFar}.`
          : `${at}H. The data digits show the byte already stored there.`,
        d === 3 ? (notes.get(span.address) ?? "") : "",
      );
    }
    for (let i = 0; i < span.bytes.length; i++) {
      const address = span.address + i;
      const byte = span.bytes[i];
      const hx = hex2(byte);
      const note = notes.get(address) ?? "";
      push(
        hx[0] as KitKey,
        "enter",
        `${hx[0]}, the high digit of ${hx}H.`,
        note,
      );
      push(
        hx[1] as KitKey,
        "enter",
        `${hx}H is stored at ${hex4(address)}H.`,
        note,
      );
      if (i < span.bytes.length - 1) {
        const next = address + 1;
        push(
          "INC",
          "enter",
          `INC. ${hex4(next)}H is next.`,
          notes.get(next) ?? "",
        );
      }
    }
  });

  const entry = result.symbols.get("START") ?? entryAddress(result);
  const start = hex4(entry);
  push(
    "RES",
    "run",
    `RES. Type ${start}H, where START is, then EXE.`,
    "The 8085 fetches from that address until HLT.",
  );
  for (let d = 0; d < 4; d++) {
    const digit = start[d] as KitKey;
    push(
      digit,
      "run",
      d < 3
        ? `${digit}. Start address so far ${start.slice(0, d + 1)}.`
        : `Start address ${start}H. EXE runs from here until HLT.`,
      "",
    );
  }
  push("EXE", "run");
  const execFrame = frames[frames.length - 1];
  execFrame.caption = `EXE. The 8085 runs from ${start}H until HLT.`;
  execFrame.detail = m.haltAddress
    ? `Halted at ${hex4(m.haltAddress)}H. Accumulator is ${hex2(m.cpu?.A ?? 0)}H.`
    : "";

  const changed = highBytesOf(writtenBetween(m.mem, image));

  if (changed.length === 0) {
    execFrame.detail += expected ? ` ${expected}` : "";
  } else {
    for (const group of groupsOf(changed)) {
      const first = group[0];
      push("RES", "read", "RES. Type the address to read back.", expected);
      const text = hex4(first);
      for (let d = 0; d < 4; d++) {
        const digit = text[d] as KitKey;
        const lastDigit = d === 3;
        const value = hex2(m.mem[first] ?? 0);
        push(
          digit,
          "read",
          lastDigit
            ? `${text}H holds ${value}H.`
            : `${digit}. Address so far ${text.slice(0, d + 1)}.`,
          lastDigit ? expected : "",
        );
      }
      for (let i = 1; i < group.length; i++) {
        const address = group[i];
        push(
          "INC",
          "read",
          `${hex4(address)}H holds ${hex2(m.mem[address] ?? 0)}H.`,
          expected,
        );
      }
    }
  }

  return { frames, cpu: m.cpu, error: null };
}

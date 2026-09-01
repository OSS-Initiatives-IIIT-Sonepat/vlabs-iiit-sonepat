// 8085 CPU Emulator — complete implementation

import { OPCODES } from './instructions';

export interface CPU8085Flags {
  S:  boolean; // Sign
  Z:  boolean; // Zero
  AC: boolean; // Auxiliary Carry
  P:  boolean; // Parity
  CY: boolean; // Carry
}

export interface CPU8085State {
  A: number; B: number; C: number;
  D: number; E: number; H: number; L: number;
  PC: number; SP: number;
  flags: CPU8085Flags;
  memory: Uint8Array;
  halted: boolean;
  cycles: number;
}

export interface StepResult {
  instruction: string; // disassembly e.g. "MOV A,B"
  address: number;     // PC before execution
  changed: string[];   // which registers/flags changed
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function parity(v: number): boolean {
  // true if even number of 1-bits
  let bits = 0;
  let n = v & 0xFF;
  while (n) { bits += n & 1; n >>= 1; }
  return (bits & 1) === 0;
}

function flagsFromByte(f: number): CPU8085Flags {
  return {
    S:  !!(f & 0x80),
    Z:  !!(f & 0x40),
    AC: !!(f & 0x10),
    P:  !!(f & 0x04),
    CY: !!(f & 0x01),
  };
}

function flagsToByte(flags: CPU8085Flags): number {
  return (
    (flags.S  ? 0x80 : 0) |
    (flags.Z  ? 0x40 : 0) |
    (flags.AC ? 0x10 : 0) |
    (flags.P  ? 0x04 : 0) |
    0x02 |                   // bit 1 always 1
    (flags.CY ? 0x01 : 0)
  );
}

// ── CPU class ────────────────────────────────────────────────────────────────

export class CPU8085 {
  private mem: Uint8Array;
  private A = 0; private B = 0; private C = 0;
  private D = 0; private E = 0; private H = 0; private L = 0;
  private PC = 0; private SP = 0xFFFF;
  private flags: CPU8085Flags = { S: false, Z: false, AC: false, P: false, CY: false };
  private halted = false;
  private cycles = 0;

  constructor(memorySize = 65536) {
    this.mem = new Uint8Array(memorySize);
  }

  // ── Public accessors ──────────────────────────────────────────────────────

  getState(): CPU8085State {
    return {
      A: this.A, B: this.B, C: this.C,
      D: this.D, E: this.E, H: this.H, L: this.L,
      PC: this.PC, SP: this.SP,
      flags: { ...this.flags },
      memory: this.mem,
      halted: this.halted,
      cycles: this.cycles,
    };
  }

  setState(s: Partial<CPU8085State>): void {
    if (s.A !== undefined) this.A = s.A & 0xFF;
    if (s.B !== undefined) this.B = s.B & 0xFF;
    if (s.C !== undefined) this.C = s.C & 0xFF;
    if (s.D !== undefined) this.D = s.D & 0xFF;
    if (s.E !== undefined) this.E = s.E & 0xFF;
    if (s.H !== undefined) this.H = s.H & 0xFF;
    if (s.L !== undefined) this.L = s.L & 0xFF;
    if (s.PC !== undefined) this.PC = s.PC & 0xFFFF;
    if (s.SP !== undefined) this.SP = s.SP & 0xFFFF;
    if (s.flags) this.flags = { ...this.flags, ...s.flags };
    if (s.halted !== undefined) this.halted = s.halted;
    if (s.cycles !== undefined) this.cycles = s.cycles;
  }

  reset(): void {
    this.A = this.B = this.C = this.D = this.E = this.H = this.L = 0;
    this.PC = 0; this.SP = 0xFFFF;
    this.flags = { S: false, Z: false, AC: false, P: false, CY: false };
    this.halted = false; this.cycles = 0;
    this.mem.fill(0);
  }

  loadProgram(bytes: number[], origin = 0): void {
    for (let i = 0; i < bytes.length; i++) {
      if (origin + i < this.mem.length) {
        this.mem[origin + i] = bytes[i] & 0xFF;
      }
    }
    this.PC = origin;
  }

  readMem(addr: number): number  { return this.mem[addr & 0xFFFF]; }
  writeMem(addr: number, val: number): void { this.mem[addr & 0xFFFF] = val & 0xFF; }

  getBC(): number { return (this.B << 8) | this.C; }
  getDE(): number { return (this.D << 8) | this.E; }
  getHL(): number { return (this.H << 8) | this.L; }
  setBC(v: number): void { this.B = (v >> 8) & 0xFF; this.C = v & 0xFF; }
  setDE(v: number): void { this.D = (v >> 8) & 0xFF; this.E = v & 0xFF; }
  setHL(v: number): void { this.H = (v >> 8) & 0xFF; this.L = v & 0xFF; }

  getPSW(): number {
    return (this.A << 8) | flagsToByte(this.flags);
  }

  // ── Register helpers ──────────────────────────────────────────────────────

  private getReg(r: number): number {
    switch (r) {
      case 0: return this.B;
      case 1: return this.C;
      case 2: return this.D;
      case 3: return this.E;
      case 4: return this.H;
      case 5: return this.L;
      case 6: return this.mem[this.getHL()]; // M
      case 7: return this.A;
      default: return 0;
    }
  }

  private setReg(r: number, v: number): void {
    v &= 0xFF;
    switch (r) {
      case 0: this.B = v; break;
      case 1: this.C = v; break;
      case 2: this.D = v; break;
      case 3: this.E = v; break;
      case 4: this.H = v; break;
      case 5: this.L = v; break;
      case 6: this.mem[this.getHL()] = v; break; // M
      case 7: this.A = v; break;
    }
  }

  private static REG_NAMES = ['B','C','D','E','H','L','M','A'];

  private regName(r: number): string {
    return CPU8085.REG_NAMES[r] ?? '?';
  }

  // ── Flag updates ──────────────────────────────────────────────────────────

  private updateSZP(result: number): void {
    const v = result & 0xFF;
    this.flags.Z  = v === 0;
    this.flags.S  = !!(v & 0x80);
    this.flags.P  = parity(v);
  }

  private updateArithmetic(a: number, b: number, result: number, sub = false): void {
    const v = result & 0xFF;
    this.updateSZP(v);
    this.flags.CY = sub ? (result < 0 || result > 0xFF) : (result > 0xFF);
    // Auxiliary carry: carry from bit 3 to bit 4
    if (sub) {
      this.flags.AC = ((a & 0x0F) - (b & 0x0F)) < 0;
    } else {
      this.flags.AC = ((a & 0x0F) + (b & 0x0F)) > 0x0F;
    }
  }

  // ── Stack helpers ─────────────────────────────────────────────────────────

  private push16(v: number): void {
    this.SP = (this.SP - 1) & 0xFFFF;
    this.mem[this.SP] = (v >> 8) & 0xFF;
    this.SP = (this.SP - 1) & 0xFFFF;
    this.mem[this.SP] = v & 0xFF;
  }

  private pop16(): number {
    const lo = this.mem[this.SP];
    this.SP = (this.SP + 1) & 0xFFFF;
    const hi = this.mem[this.SP];
    this.SP = (this.SP + 1) & 0xFFFF;
    return (hi << 8) | lo;
  }

  // ── Fetch helpers ─────────────────────────────────────────────────────────

  private fetch8(): number {
    const v = this.mem[this.PC];
    this.PC = (this.PC + 1) & 0xFFFF;
    return v;
  }

  private fetch16(): number {
    const lo = this.fetch8();
    const hi = this.fetch8();
    return (hi << 8) | lo;
  }

  // ── Step ──────────────────────────────────────────────────────────────────

  step(): StepResult | null {
    if (this.halted) return null;

    const addr = this.PC;
    const opcode = this.fetch8();
    const instr = OPCODES.get(opcode);

    // Snapshot for change detection
    const before = {
      A: this.A, B: this.B, C: this.C, D: this.D,
      E: this.E, H: this.H, L: this.L,
      PC: this.PC, SP: this.SP,
      ...this.flags,
    };

    let mnemonic = instr?.mnemonic ?? `DB ${opcode.toString(16).toUpperCase().padStart(2,'0')}H`;

    // ── Execute ──────────────────────────────────────────────────────────────
    this.executeOpcode(opcode, mnemonic);
    this.cycles += instr?.cycles ?? 4;

    // Detect changes
    const changed: string[] = [];
    if (this.A !== before.A) changed.push('A');
    if (this.B !== before.B) changed.push('B');
    if (this.C !== before.C) changed.push('C');
    if (this.D !== before.D) changed.push('D');
    if (this.E !== before.E) changed.push('E');
    if (this.H !== before.H) changed.push('H');
    if (this.L !== before.L) changed.push('L');
    if (this.PC !== before.PC) changed.push('PC');
    if (this.SP !== before.SP) changed.push('SP');
    if (this.flags.S  !== before.S)  changed.push('S');
    if (this.flags.Z  !== before.Z)  changed.push('Z');
    if (this.flags.AC !== before.AC) changed.push('AC');
    if (this.flags.P  !== before.P)  changed.push('P');
    if (this.flags.CY !== before.CY) changed.push('CY');

    return { instruction: mnemonic, address: addr, changed };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private executeOpcode(opcode: number, mnemonic: string): void {
    // ── NOP ──────────────────────────────────────────────────────────────────
    if (opcode === 0x00) return;

    // ── HLT ──────────────────────────────────────────────────────────────────
    if (opcode === 0x76) { this.halted = true; return; }

    // ── MOV r1,r2  (0x40–0x7F) ───────────────────────────────────────────────
    if (opcode >= 0x40 && opcode <= 0x7F) {
      const dst = (opcode >> 3) & 0x07;
      const src = opcode & 0x07;
      this.setReg(dst, this.getReg(src));
      return;
    }

    // ── MVI r, d8 ─────────────────────────────────────────────────────────────
    if (opcode === 0x06 || opcode === 0x0E || opcode === 0x16 || opcode === 0x1E ||
        opcode === 0x26 || opcode === 0x2E || opcode === 0x36 || opcode === 0x3E) {
      const regMap: Record<number, number> = {
        0x06: 0, 0x0E: 1, 0x16: 2, 0x1E: 3,
        0x26: 4, 0x2E: 5, 0x36: 6, 0x3E: 7,
      };
      const d8 = this.fetch8();
      this.setReg(regMap[opcode], d8);
      return;
    }

    // ── LXI rp, d16 ───────────────────────────────────────────────────────────
    if (opcode === 0x01) { const v = this.fetch16(); this.setBC(v); return; }
    if (opcode === 0x11) { const v = this.fetch16(); this.setDE(v); return; }
    if (opcode === 0x21) { const v = this.fetch16(); this.setHL(v); return; }
    if (opcode === 0x31) { this.SP = this.fetch16(); return; }

    // ── LDA / STA / LHLD / SHLD ───────────────────────────────────────────────
    if (opcode === 0x3A) { const a = this.fetch16(); this.A = this.mem[a]; return; }
    if (opcode === 0x32) { const a = this.fetch16(); this.mem[a] = this.A; return; }
    if (opcode === 0x2A) {
      const a = this.fetch16();
      this.L = this.mem[a]; this.H = this.mem[(a+1) & 0xFFFF];
      return;
    }
    if (opcode === 0x22) {
      const a = this.fetch16();
      this.mem[a] = this.L; this.mem[(a+1) & 0xFFFF] = this.H;
      return;
    }

    // ── LDAX / STAX ───────────────────────────────────────────────────────────
    if (opcode === 0x0A) { this.A = this.mem[this.getBC()]; return; }
    if (opcode === 0x1A) { this.A = this.mem[this.getDE()]; return; }
    if (opcode === 0x02) { this.mem[this.getBC()] = this.A; return; }
    if (opcode === 0x12) { this.mem[this.getDE()] = this.A; return; }

    // ── XCHG ──────────────────────────────────────────────────────────────────
    if (opcode === 0xEB) {
      const tH = this.H, tL = this.L;
      this.H = this.D; this.L = this.E;
      this.D = tH; this.E = tL;
      return;
    }

    // ── ADD r / ADD M  (0x80–0x87) ────────────────────────────────────────────
    if (opcode >= 0x80 && opcode <= 0x87) {
      const r = opcode & 0x07;
      const val = this.getReg(r);
      const result = this.A + val;
      this.updateArithmetic(this.A, val, result, false);
      this.A = result & 0xFF;
      return;
    }

    // ── ADC r / ADC M  (0x88–0x8F) ────────────────────────────────────────────
    if (opcode >= 0x88 && opcode <= 0x8F) {
      const r = opcode & 0x07;
      const val = this.getReg(r);
      const cy = this.flags.CY ? 1 : 0;
      const result = this.A + val + cy;
      this.updateArithmetic(this.A, val + cy, result, false);
      this.A = result & 0xFF;
      return;
    }

    // ── ADI / ACI ─────────────────────────────────────────────────────────────
    if (opcode === 0xC6) {
      const d8 = this.fetch8();
      const result = this.A + d8;
      this.updateArithmetic(this.A, d8, result, false);
      this.A = result & 0xFF;
      return;
    }
    if (opcode === 0xCE) {
      const d8 = this.fetch8();
      const cy = this.flags.CY ? 1 : 0;
      const result = this.A + d8 + cy;
      this.updateArithmetic(this.A, d8 + cy, result, false);
      this.A = result & 0xFF;
      return;
    }

    // ── SUB r / SUB M  (0x90–0x97) ────────────────────────────────────────────
    if (opcode >= 0x90 && opcode <= 0x97) {
      const r = opcode & 0x07;
      const val = this.getReg(r);
      const result = this.A - val;
      this.flags.CY = result < 0;
      this.flags.AC = ((this.A & 0x0F) - (val & 0x0F)) < 0;
      this.updateSZP(result & 0xFF);
      this.A = result & 0xFF;
      return;
    }

    // ── SBB r / SBB M  (0x98–0x9F) ────────────────────────────────────────────
    if (opcode >= 0x98 && opcode <= 0x9F) {
      const r = opcode & 0x07;
      const val = this.getReg(r);
      const cy = this.flags.CY ? 1 : 0;
      const result = this.A - val - cy;
      this.flags.CY = result < 0;
      this.flags.AC = ((this.A & 0x0F) - (val & 0x0F) - cy) < 0;
      this.updateSZP(result & 0xFF);
      this.A = result & 0xFF;
      return;
    }

    // ── SUI / SBI ─────────────────────────────────────────────────────────────
    if (opcode === 0xD6) {
      const d8 = this.fetch8();
      const result = this.A - d8;
      this.flags.CY = result < 0;
      this.flags.AC = ((this.A & 0x0F) - (d8 & 0x0F)) < 0;
      this.updateSZP(result & 0xFF);
      this.A = result & 0xFF;
      return;
    }
    if (opcode === 0xDE) {
      const d8 = this.fetch8();
      const cy = this.flags.CY ? 1 : 0;
      const result = this.A - d8 - cy;
      this.flags.CY = result < 0;
      this.flags.AC = ((this.A & 0x0F) - (d8 & 0x0F) - cy) < 0;
      this.updateSZP(result & 0xFF);
      this.A = result & 0xFF;
      return;
    }

    // ── INR r  (0x04, 0x0C, 0x14, 0x1C, 0x24, 0x2C, 0x34, 0x3C) ─────────────
    if ([0x04,0x0C,0x14,0x1C,0x24,0x2C,0x34,0x3C].includes(opcode)) {
      const rMap: Record<number,number> = {0x04:0,0x0C:1,0x14:2,0x1C:3,0x24:4,0x2C:5,0x34:6,0x3C:7};
      const r = rMap[opcode];
      const old = this.getReg(r);
      const result = (old + 1) & 0xFF;
      this.flags.AC = (old & 0x0F) === 0x0F;
      this.updateSZP(result);
      // INR does NOT change CY
      this.setReg(r, result);
      return;
    }

    // ── DCR r  (0x05, 0x0D, 0x15, 0x1D, 0x25, 0x2D, 0x35, 0x3D) ─────────────
    if ([0x05,0x0D,0x15,0x1D,0x25,0x2D,0x35,0x3D].includes(opcode)) {
      const rMap: Record<number,number> = {0x05:0,0x0D:1,0x15:2,0x1D:3,0x25:4,0x2D:5,0x35:6,0x3D:7};
      const r = rMap[opcode];
      const old = this.getReg(r);
      const result = (old - 1) & 0xFF;
      this.flags.AC = (old & 0x0F) === 0x00;
      this.updateSZP(result);
      this.setReg(r, result);
      return;
    }

    // ── INX / DCX rp ──────────────────────────────────────────────────────────
    if (opcode === 0x03) { this.setBC((this.getBC() + 1) & 0xFFFF); return; }
    if (opcode === 0x13) { this.setDE((this.getDE() + 1) & 0xFFFF); return; }
    if (opcode === 0x23) { this.setHL((this.getHL() + 1) & 0xFFFF); return; }
    if (opcode === 0x33) { this.SP = (this.SP + 1) & 0xFFFF; return; }
    if (opcode === 0x0B) { this.setBC((this.getBC() - 1) & 0xFFFF); return; }
    if (opcode === 0x1B) { this.setDE((this.getDE() - 1) & 0xFFFF); return; }
    if (opcode === 0x2B) { this.setHL((this.getHL() - 1) & 0xFFFF); return; }
    if (opcode === 0x3B) { this.SP = (this.SP - 1) & 0xFFFF; return; }

    // ── DAD rp ────────────────────────────────────────────────────────────────
    if (opcode === 0x09) { const r = this.getHL() + this.getBC(); this.flags.CY = r > 0xFFFF; this.setHL(r & 0xFFFF); return; }
    if (opcode === 0x19) { const r = this.getHL() + this.getDE(); this.flags.CY = r > 0xFFFF; this.setHL(r & 0xFFFF); return; }
    if (opcode === 0x29) { const r = this.getHL() * 2;           this.flags.CY = r > 0xFFFF; this.setHL(r & 0xFFFF); return; }
    if (opcode === 0x39) { const r = this.getHL() + this.SP;     this.flags.CY = r > 0xFFFF; this.setHL(r & 0xFFFF); return; }

    // ── DAA ───────────────────────────────────────────────────────────────────
    if (opcode === 0x27) {
      let a = this.A;
      let correction = 0;
      if ((a & 0x0F) > 9 || this.flags.AC) correction |= 0x06;
      if (a > 0x99 || this.flags.CY) { correction |= 0x60; this.flags.CY = true; }
      const result = a + correction;
      this.flags.AC = ((a & 0x0F) + (correction & 0x0F)) > 0x0F;
      this.A = result & 0xFF;
      this.updateSZP(this.A);
      return;
    }

    // ── ANA r / ANA M  (0xA0–0xA7) ───────────────────────────────────────────
    if (opcode >= 0xA0 && opcode <= 0xA7) {
      const r = opcode & 0x07;
      this.A = (this.A & this.getReg(r)) & 0xFF;
      this.flags.CY = false;
      this.flags.AC = true; // ANA always sets AC
      this.updateSZP(this.A);
      return;
    }

    // ── ORA r / ORA M  (0xB0–0xB7) ───────────────────────────────────────────
    if (opcode >= 0xB0 && opcode <= 0xB7) {
      const r = opcode & 0x07;
      this.A = (this.A | this.getReg(r)) & 0xFF;
      this.flags.CY = false; this.flags.AC = false;
      this.updateSZP(this.A);
      return;
    }

    // ── XRA r / XRA M  (0xA8–0xAF) ───────────────────────────────────────────
    if (opcode >= 0xA8 && opcode <= 0xAF) {
      const r = opcode & 0x07;
      this.A = (this.A ^ this.getReg(r)) & 0xFF;
      this.flags.CY = false; this.flags.AC = false;
      this.updateSZP(this.A);
      return;
    }

    // ── CMP r / CMP M  (0xB8–0xBF) ───────────────────────────────────────────
    if (opcode >= 0xB8 && opcode <= 0xBF) {
      const r = opcode & 0x07;
      const val = this.getReg(r);
      const result = this.A - val;
      this.flags.CY = result < 0;
      this.flags.AC = ((this.A & 0x0F) - (val & 0x0F)) < 0;
      this.updateSZP(result & 0xFF);
      return;
    }

    // ── ANI / ORI / XRI / CPI ────────────────────────────────────────────────
    if (opcode === 0xE6) { const d8 = this.fetch8(); this.A &= d8; this.flags.CY = false; this.flags.AC = true; this.updateSZP(this.A); return; }
    if (opcode === 0xF6) { const d8 = this.fetch8(); this.A |= d8; this.flags.CY = false; this.flags.AC = false; this.updateSZP(this.A); return; }
    if (opcode === 0xEE) { const d8 = this.fetch8(); this.A ^= d8; this.flags.CY = false; this.flags.AC = false; this.updateSZP(this.A); return; }
    if (opcode === 0xFE) {
      const d8 = this.fetch8();
      const result = this.A - d8;
      this.flags.CY = result < 0;
      this.flags.AC = ((this.A & 0x0F) - (d8 & 0x0F)) < 0;
      this.updateSZP(result & 0xFF);
      return;
    }

    // ── Rotate ───────────────────────────────────────────────────────────────
    if (opcode === 0x07) { // RLC
      const bit7 = (this.A >> 7) & 1;
      this.A = ((this.A << 1) | bit7) & 0xFF;
      this.flags.CY = !!bit7;
      return;
    }
    if (opcode === 0x0F) { // RRC
      const bit0 = this.A & 1;
      this.A = ((this.A >> 1) | (bit0 << 7)) & 0xFF;
      this.flags.CY = !!bit0;
      return;
    }
    if (opcode === 0x17) { // RAL
      const bit7 = (this.A >> 7) & 1;
      this.A = ((this.A << 1) | (this.flags.CY ? 1 : 0)) & 0xFF;
      this.flags.CY = !!bit7;
      return;
    }
    if (opcode === 0x1F) { // RAR
      const bit0 = this.A & 1;
      this.A = ((this.A >> 1) | ((this.flags.CY ? 1 : 0) << 7)) & 0xFF;
      this.flags.CY = !!bit0;
      return;
    }

    // ── CMA / CMC / STC ───────────────────────────────────────────────────────
    if (opcode === 0x2F) { this.A = (~this.A) & 0xFF; return; }
    if (opcode === 0x3F) { this.flags.CY = !this.flags.CY; return; }
    if (opcode === 0x37) { this.flags.CY = true; return; }

    // ── JMP and conditionals ──────────────────────────────────────────────────
    if (opcode === 0xC3) { this.PC = this.fetch16(); return; }
    if (opcode === 0xDA) { const a = this.fetch16(); if (this.flags.CY)  this.PC = a; return; }
    if (opcode === 0xD2) { const a = this.fetch16(); if (!this.flags.CY) this.PC = a; return; }
    if (opcode === 0xCA) { const a = this.fetch16(); if (this.flags.Z)   this.PC = a; return; }
    if (opcode === 0xC2) { const a = this.fetch16(); if (!this.flags.Z)  this.PC = a; return; }
    if (opcode === 0xF2) { const a = this.fetch16(); if (!this.flags.S)  this.PC = a; return; }
    if (opcode === 0xFA) { const a = this.fetch16(); if (this.flags.S)   this.PC = a; return; }
    if (opcode === 0xEA) { const a = this.fetch16(); if (this.flags.P)   this.PC = a; return; }
    if (opcode === 0xE2) { const a = this.fetch16(); if (!this.flags.P)  this.PC = a; return; }
    if (opcode === 0xE9) { this.PC = this.getHL(); return; }

    // ── CALL and conditionals ─────────────────────────────────────────────────
    if (opcode === 0xCD) { const a = this.fetch16(); this.push16(this.PC); this.PC = a; return; }
    if (opcode === 0xDC) { const a = this.fetch16(); if (this.flags.CY)  { this.push16(this.PC); this.PC = a; } return; }
    if (opcode === 0xD4) { const a = this.fetch16(); if (!this.flags.CY) { this.push16(this.PC); this.PC = a; } return; }
    if (opcode === 0xCC) { const a = this.fetch16(); if (this.flags.Z)   { this.push16(this.PC); this.PC = a; } return; }
    if (opcode === 0xC4) { const a = this.fetch16(); if (!this.flags.Z)  { this.push16(this.PC); this.PC = a; } return; }
    if (opcode === 0xF4) { const a = this.fetch16(); if (!this.flags.S)  { this.push16(this.PC); this.PC = a; } return; }
    if (opcode === 0xFC) { const a = this.fetch16(); if (this.flags.S)   { this.push16(this.PC); this.PC = a; } return; }
    if (opcode === 0xEC) { const a = this.fetch16(); if (this.flags.P)   { this.push16(this.PC); this.PC = a; } return; }
    if (opcode === 0xE4) { const a = this.fetch16(); if (!this.flags.P)  { this.push16(this.PC); this.PC = a; } return; }

    // ── RET and conditionals ──────────────────────────────────────────────────
    if (opcode === 0xC9) { this.PC = this.pop16(); return; }
    if (opcode === 0xD8) { if (this.flags.CY)  this.PC = this.pop16(); return; }
    if (opcode === 0xD0) { if (!this.flags.CY) this.PC = this.pop16(); return; }
    if (opcode === 0xC8) { if (this.flags.Z)   this.PC = this.pop16(); return; }
    if (opcode === 0xC0) { if (!this.flags.Z)  this.PC = this.pop16(); return; }
    if (opcode === 0xF0) { if (!this.flags.S)  this.PC = this.pop16(); return; }
    if (opcode === 0xF8) { if (this.flags.S)   this.PC = this.pop16(); return; }
    if (opcode === 0xE8) { if (this.flags.P)   this.PC = this.pop16(); return; }
    if (opcode === 0xE0) { if (!this.flags.P)  this.PC = this.pop16(); return; }

    // ── RST 0-7 ───────────────────────────────────────────────────────────────
    if ((opcode & 0xC7) === 0xC7) {
      const vec = (opcode & 0x38);
      this.push16(this.PC);
      this.PC = vec;
      return;
    }

    // ── PUSH / POP ────────────────────────────────────────────────────────────
    if (opcode === 0xC5) { this.push16(this.getBC()); return; }
    if (opcode === 0xD5) { this.push16(this.getDE()); return; }
    if (opcode === 0xE5) { this.push16(this.getHL()); return; }
    if (opcode === 0xF5) { this.push16(this.getPSW()); return; }
    if (opcode === 0xC1) { this.setBC(this.pop16()); return; }
    if (opcode === 0xD1) { this.setDE(this.pop16()); return; }
    if (opcode === 0xE1) { this.setHL(this.pop16()); return; }
    if (opcode === 0xF1) {
      const psw = this.pop16();
      this.A = (psw >> 8) & 0xFF;
      this.flags = flagsFromByte(psw & 0xFF);
      return;
    }

    // ── XTHL / SPHL ───────────────────────────────────────────────────────────
    if (opcode === 0xE3) {
      const sp = this.SP;
      const lo = this.mem[sp]; const hi = this.mem[(sp+1) & 0xFFFF];
      this.mem[sp] = this.L; this.mem[(sp+1) & 0xFFFF] = this.H;
      this.L = lo; this.H = hi;
      return;
    }
    if (opcode === 0xF9) { this.SP = this.getHL(); return; }

    // ── I/O ───────────────────────────────────────────────────────────────────
    if (opcode === 0xDB) { this.fetch8(); /* IN port — no-op in emulator */ return; }
    if (opcode === 0xD3) { this.fetch8(); /* OUT port — no-op in emulator */ return; }

    // ── EI / DI ───────────────────────────────────────────────────────────────
    if (opcode === 0xFB) return; // EI — no-op
    if (opcode === 0xF3) return; // DI — no-op

    // Unknown opcode — treat as NOP
  }

  run(maxSteps = 100000): StepResult[] {
    const results: StepResult[] = [];
    for (let i = 0; i < maxSteps; i++) {
      if (this.halted) break;
      const r = this.step();
      if (r) results.push(r);
    }
    return results;
  }
}

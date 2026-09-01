// Two-pass 8085 assembler

import { INSTRUCTIONS } from './instructions';

export interface AssemblerError {
  line: number;
  message: string;
}

export interface AssemblerResult {
  bytes: number[];
  origin: number;
  symbols: Map<string, number>;   // label → address
  listing: Array<{
    line: number;
    address: number;
    bytes: string;   // hex bytes e.g. "3A 00 80"
    source: string;
  }>;
  errors: AssemblerError[];
}

// ── Literal parsing ──────────────────────────────────────────────────────────

function parseLiteral(token: string): number | null {
  const t = token.toUpperCase();
  // Hex: ends with H, e.g. 0A0H, 25H, 0FFH
  if (t.endsWith('H')) {
    const hex = t.slice(0, -1);
    const v = parseInt(hex, 16);
    return isNaN(v) ? null : v;
  }
  // Binary: ends with B, e.g. 11001010B
  if (t.endsWith('B') && /^[01]+B$/.test(t)) {
    return parseInt(t.slice(0, -1), 2);
  }
  // Decimal
  if (/^\d+$/.test(token)) {
    return parseInt(token, 10);
  }
  return null;
}

// ── Register encoding ────────────────────────────────────────────────────────

const REG_CODE: Record<string, number> = {
  B: 0, C: 1, D: 2, E: 3, H: 4, L: 5, M: 6, A: 7,
};

const REG_PAIR_CODE: Record<string, number> = {
  B: 0, BC: 0, D: 1, DE: 1, H: 2, HL: 2, SP: 3,
};

// ── Tokeniser ────────────────────────────────────────────────────────────────

function tokenise(line: string): string[] {
  // Strip comment
  const noComment = line.split(';')[0];
  // Split on whitespace and commas, keep non-empty
  return noComment
    .replace(/,/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

// ── Opcode lookup helpers ─────────────────────────────────────────────────────

/**
 * Look up opcode number for a mnemonic + optional operand string.
 * Returns null if not found.
 */
function lookupOpcode(mnemonic: string, operand?: string): number | null {
  const variants = INSTRUCTIONS.get(mnemonic.toUpperCase());
  if (!variants) return null;

  if (variants.length === 1 && !operand) return variants[0].opcode;

  // Match by mnemonic string
  const full = operand
    ? `${mnemonic.toUpperCase()} ${operand.toUpperCase()}`
    : mnemonic.toUpperCase();

  for (const v of variants) {
    if (v.mnemonic.toUpperCase() === full) return v.opcode;
  }
  // fallback: single variant with just the mnemonic
  if (variants.length === 1) return variants[0].opcode;
  return null;
}

// ── Assembler ────────────────────────────────────────────────────────────────

export function assemble(source: string): AssemblerResult {
  const lines = source.split('\n');
  const errors: AssemblerError[] = [];
  const symbols: Map<string, number> = new Map();

  // Internal representation per source line
  type ParsedLine = {
    lineNo: number;
    label?: string;
    mnemonic?: string;
    operands: string[];
    source: string;
    address: number;
    size: number;   // bytes this instruction occupies
  };

  const parsed: ParsedLine[] = [];

  // ── Pass 1: determine sizes and collect labels ────────────────────────────
  let pc = 0;
  let origin = 0;
  let originSet = false;
  const equMap: Map<string, number> = new Map();

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const lineNo = lineIdx + 1;
    const srcLine = lines[lineIdx];
    const tokens = tokenise(srcLine);
    if (tokens.length === 0) {
      parsed.push({ lineNo, operands: [], source: srcLine, address: pc, size: 0 });
      continue;
    }

    let label: string | undefined;
    let tokStart = 0;

    // Check for label (token ending with ':' or next token is a directive/mnemonic)
    const firstUpper = tokens[0].toUpperCase();
    if (tokens[0].endsWith(':')) {
      label = tokens[0].slice(0, -1).toUpperCase();
      tokStart = 1;
    } else if (
      tokens.length > 1 &&
      (tokens[1].toUpperCase() === 'EQU' ||
       tokens[1].toUpperCase() === 'DB'  ||
       tokens[1].toUpperCase() === 'DW'  ||
       (tokens.length >= 2 && !INSTRUCTIONS.has(firstUpper) && !['ORG','DB','DW','EQU'].includes(firstUpper)))
    ) {
      // Could be a label without colon if followed by EQU/DB/DW
      if (tokens[1].toUpperCase() === 'EQU' || tokens[1].toUpperCase() === 'DB' || tokens[1].toUpperCase() === 'DW') {
        label = tokens[0].toUpperCase();
        tokStart = 1;
      }
    }

    const remaining = tokens.slice(tokStart);
    if (remaining.length === 0) {
      if (label) symbols.set(label, pc);
      parsed.push({ lineNo, label, operands: [], source: srcLine, address: pc, size: 0 });
      continue;
    }

    const directive = remaining[0].toUpperCase();

    // EQU
    if (directive === 'EQU') {
      if (label && remaining[1]) {
        const val = parseLiteral(remaining[1]);
        if (val !== null) {
          equMap.set(label, val);
          symbols.set(label, val);
        } else {
          errors.push({ line: lineNo, message: `Cannot parse EQU value: ${remaining[1]}` });
        }
      }
      parsed.push({ lineNo, label, mnemonic: 'EQU', operands: remaining.slice(1), source: srcLine, address: pc, size: 0 });
      continue;
    }

    // ORG
    if (directive === 'ORG') {
      const addrTok = remaining[1];
      if (addrTok) {
        const addr = parseLiteral(addrTok);
        if (addr !== null) {
          pc = addr;
          if (!originSet) { origin = addr; originSet = true; }
        } else {
          errors.push({ line: lineNo, message: `Cannot parse ORG address: ${addrTok}` });
        }
      }
      parsed.push({ lineNo, label, mnemonic: 'ORG', operands: remaining.slice(1), source: srcLine, address: pc, size: 0 });
      continue;
    }

    // DB
    if (directive === 'DB') {
      if (label) symbols.set(label, pc);
      const dataTokens = remaining.slice(1);
      const size = dataTokens.length;
      parsed.push({ lineNo, label, mnemonic: 'DB', operands: dataTokens, source: srcLine, address: pc, size });
      pc += size;
      continue;
    }

    // DW
    if (directive === 'DW') {
      if (label) symbols.set(label, pc);
      const dataTokens = remaining.slice(1);
      const size = dataTokens.length * 2;
      parsed.push({ lineNo, label, mnemonic: 'DW', operands: dataTokens, source: srcLine, address: pc, size });
      pc += size;
      continue;
    }

    // Regular instruction
    if (label) symbols.set(label, pc);
    const mnemonic = directive;
    const operands = remaining.slice(1);

    // Determine instruction size
    let size = 1;
    const mnUp = mnemonic.toUpperCase();

    // Instructions with 16-bit operand (3 bytes)
    const threeByteInstrs = new Set([
      'LXI','LDA','STA','LHLD','SHLD',
      'JMP','JC','JNC','JZ','JNZ','JP','JM','JPE','JPO',
      'CALL','CC','CNC','CZ','CNZ','CP','CM','CPE','CPO',
    ]);
    // Instructions with 8-bit immediate (2 bytes)
    const twoByteInstrs = new Set([
      'MVI','ADI','ACI','SUI','SBI','ANI','ORI','XRI','CPI','IN','OUT',
    ]);

    if (threeByteInstrs.has(mnUp)) size = 3;
    else if (twoByteInstrs.has(mnUp)) size = 2;
    else size = 1;

    parsed.push({ lineNo, label, mnemonic, operands, source: srcLine, address: pc, size });
    pc += size;
  }

  // ── Pass 2: emit bytes ───────────────────────────────────────────────────

  const bytes: number[] = [];
  const listing: AssemblerResult['listing'] = [];
  let baseOrigin = origin;

  // Helper to resolve symbol or literal
  function resolve(tok: string): number | null {
    const up = tok.toUpperCase();
    if (equMap.has(up)) return equMap.get(up)!;
    if (symbols.has(up)) return symbols.get(up)!;
    return parseLiteral(tok);
  }

  for (const pl of parsed) {
    if (!pl.mnemonic || pl.mnemonic === 'EQU') {
      listing.push({ line: pl.lineNo, address: pl.address, bytes: '', source: pl.source });
      continue;
    }

    if (pl.mnemonic === 'ORG') {
      if (pl.operands[0]) {
        const addr = parseLiteral(pl.operands[0]);
        if (addr !== null && !originSet) { baseOrigin = addr; }
      }
      listing.push({ line: pl.lineNo, address: pl.address, bytes: '', source: pl.source });
      continue;
    }

    const addr = pl.address;
    const byteOffset = addr - baseOrigin;
    if (byteOffset < 0) {
      errors.push({ line: pl.lineNo, message: `Address ${addr.toString(16).toUpperCase()}H is before origin ${baseOrigin.toString(16).toUpperCase()}H` });
      listing.push({ line: pl.lineNo, address: addr, bytes: '', source: pl.source });
      continue;
    }

    // Ensure bytes array is big enough
    while (bytes.length < byteOffset + pl.size) bytes.push(0);

    // DB
    if (pl.mnemonic === 'DB') {
      const hexParts: string[] = [];
      for (let i = 0; i < pl.operands.length; i++) {
        const v = resolve(pl.operands[i]);
        if (v === null) {
          errors.push({ line: pl.lineNo, message: `Cannot resolve DB value: ${pl.operands[i]}` });
          bytes[byteOffset + i] = 0;
        } else {
          bytes[byteOffset + i] = v & 0xFF;
          hexParts.push((v & 0xFF).toString(16).toUpperCase().padStart(2, '0'));
        }
      }
      listing.push({ line: pl.lineNo, address: addr, bytes: hexParts.join(' '), source: pl.source });
      continue;
    }

    // DW
    if (pl.mnemonic === 'DW') {
      const hexParts: string[] = [];
      for (let i = 0; i < pl.operands.length; i++) {
        const v = resolve(pl.operands[i]);
        if (v === null) {
          errors.push({ line: pl.lineNo, message: `Cannot resolve DW value: ${pl.operands[i]}` });
          bytes[byteOffset + i * 2] = 0;
          bytes[byteOffset + i * 2 + 1] = 0;
        } else {
          bytes[byteOffset + i * 2]     = v & 0xFF;
          bytes[byteOffset + i * 2 + 1] = (v >> 8) & 0xFF;
          hexParts.push((v & 0xFF).toString(16).toUpperCase().padStart(2, '0'));
          hexParts.push(((v >> 8) & 0xFF).toString(16).toUpperCase().padStart(2, '0'));
        }
      }
      listing.push({ line: pl.lineNo, address: addr, bytes: hexParts.join(' '), source: pl.source });
      continue;
    }

    // Regular instruction
    const mnUp = pl.mnemonic.toUpperCase();
    const ops = pl.operands;

    let opcode: number | null = null;
    let extraBytes: number[] = [];

    // ── Opcode resolution ─────────────────────────────────────────────────
    // For register-parameterised instructions:
    if (['MOV','ADD','ADC','SUB','SBB','ANA','ORA','XRA','CMP'].includes(mnUp)) {
      const operandStr = ops.join(',');
      opcode = lookupOpcode(mnUp, operandStr);
      if (opcode === null) {
        errors.push({ line: pl.lineNo, message: `Unknown operand for ${mnUp}: ${operandStr}` });
      }
    }
    // MVI r, d8
    else if (mnUp === 'MVI') {
      const reg = ops[0]?.toUpperCase();
      opcode = lookupOpcode('MVI', reg);
      const imm = ops[1] ? resolve(ops[1]) : null;
      if (imm === null) errors.push({ line: pl.lineNo, message: `Cannot resolve MVI immediate: ${ops[1]}` });
      extraBytes = [imm ?? 0];
    }
    // LXI rp, d16
    else if (mnUp === 'LXI') {
      const rp = ops[0]?.toUpperCase();
      opcode = lookupOpcode('LXI', rp);
      const imm = ops[1] ? resolve(ops[1]) : null;
      if (imm === null) errors.push({ line: pl.lineNo, message: `Cannot resolve LXI immediate: ${ops[1]}` });
      extraBytes = [(imm ?? 0) & 0xFF, ((imm ?? 0) >> 8) & 0xFF];
    }
    // LDA, STA, LHLD, SHLD — 16-bit address
    else if (['LDA','STA','LHLD','SHLD'].includes(mnUp)) {
      opcode = lookupOpcode(mnUp);
      const addr16 = ops[0] ? resolve(ops[0]) : null;
      if (addr16 === null) errors.push({ line: pl.lineNo, message: `Cannot resolve address: ${ops[0]}` });
      extraBytes = [(addr16 ?? 0) & 0xFF, ((addr16 ?? 0) >> 8) & 0xFF];
    }
    // LDAX / STAX rp
    else if (['LDAX','STAX'].includes(mnUp)) {
      const rp = ops[0]?.toUpperCase();
      opcode = lookupOpcode(mnUp, rp);
    }
    // INR, DCR, INX, DCX, DAD, PUSH, POP — register/pair operand
    else if (['INR','DCR','INX','DCX','DAD','PUSH','POP'].includes(mnUp)) {
      const rp = ops[0]?.toUpperCase();
      opcode = lookupOpcode(mnUp, rp);
    }
    // Jump/Call — 16-bit address
    else if (['JMP','JC','JNC','JZ','JNZ','JP','JM','JPE','JPO',
              'CALL','CC','CNC','CZ','CNZ','CP','CM','CPE','CPO'].includes(mnUp)) {
      opcode = lookupOpcode(mnUp);
      const addr16 = ops[0] ? resolve(ops[0]) : null;
      if (addr16 === null) errors.push({ line: pl.lineNo, message: `Cannot resolve jump address: ${ops[0]}` });
      extraBytes = [(addr16 ?? 0) & 0xFF, ((addr16 ?? 0) >> 8) & 0xFF];
    }
    // 8-bit immediate instructions
    else if (['ADI','ACI','SUI','SBI','ANI','ORI','XRI','CPI','IN','OUT'].includes(mnUp)) {
      opcode = lookupOpcode(mnUp);
      const imm = ops[0] ? resolve(ops[0]) : null;
      if (imm === null) errors.push({ line: pl.lineNo, message: `Cannot resolve immediate: ${ops[0]}` });
      extraBytes = [imm ?? 0];
    }
    // RST n
    else if (mnUp === 'RST') {
      const n = ops[0] ? parseInt(ops[0], 10) : null;
      if (n !== null && n >= 0 && n <= 7) {
        opcode = lookupOpcode('RST', String(n));
      } else {
        errors.push({ line: pl.lineNo, message: `Invalid RST operand: ${ops[0]}` });
      }
    }
    // All others (no-operand instructions)
    else {
      opcode = lookupOpcode(mnUp);
      if (opcode === null) {
        errors.push({ line: pl.lineNo, message: `Unknown mnemonic: ${mnUp}` });
      }
    }

    if (opcode !== null) {
      bytes[byteOffset] = opcode;
      for (let i = 0; i < extraBytes.length; i++) {
        bytes[byteOffset + 1 + i] = extraBytes[i];
      }
    }

    const emittedBytes = [opcode ?? 0, ...extraBytes];
    const hexStr = emittedBytes
      .map(b => b.toString(16).toUpperCase().padStart(2, '0'))
      .join(' ');

    listing.push({ line: pl.lineNo, address: addr, bytes: hexStr, source: pl.source });
  }

  return { bytes, origin: baseOrigin, symbols, listing, errors };
}

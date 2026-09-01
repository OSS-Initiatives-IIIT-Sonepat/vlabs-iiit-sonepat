// 8085 Instruction Set — complete opcode table

export type Instruction = {
  mnemonic: string;
  opcode: number;
  bytes: number;   // total bytes including operands
  cycles: number;
  description: string;
};

// All 8085 instructions keyed by opcode
const ALL_INSTRUCTIONS: Instruction[] = [
  // ── NOP / HLT ─────────────────────────────────────────────────────────────
  { mnemonic: 'NOP',    opcode: 0x00, bytes: 1, cycles: 4,  description: 'No Operation' },
  { mnemonic: 'HLT',    opcode: 0x76, bytes: 1, cycles: 7,  description: 'Halt' },

  // ── MOV r1, r2  (0x40–0x7F except 0x76) ─────────────────────────────────
  // Encoding: 0100 DDDSSS  D=dst S=src  B=000 C=001 D=010 E=011 H=100 L=101 M=110 A=111
  { mnemonic: 'MOV B,B',  opcode: 0x40, bytes: 1, cycles: 4,  description: 'Move B to B' },
  { mnemonic: 'MOV B,C',  opcode: 0x41, bytes: 1, cycles: 4,  description: 'Move C to B' },
  { mnemonic: 'MOV B,D',  opcode: 0x42, bytes: 1, cycles: 4,  description: 'Move D to B' },
  { mnemonic: 'MOV B,E',  opcode: 0x43, bytes: 1, cycles: 4,  description: 'Move E to B' },
  { mnemonic: 'MOV B,H',  opcode: 0x44, bytes: 1, cycles: 4,  description: 'Move H to B' },
  { mnemonic: 'MOV B,L',  opcode: 0x45, bytes: 1, cycles: 4,  description: 'Move L to B' },
  { mnemonic: 'MOV B,M',  opcode: 0x46, bytes: 1, cycles: 7,  description: 'Move memory (HL) to B' },
  { mnemonic: 'MOV B,A',  opcode: 0x47, bytes: 1, cycles: 4,  description: 'Move A to B' },
  { mnemonic: 'MOV C,B',  opcode: 0x48, bytes: 1, cycles: 4,  description: 'Move B to C' },
  { mnemonic: 'MOV C,C',  opcode: 0x49, bytes: 1, cycles: 4,  description: 'Move C to C' },
  { mnemonic: 'MOV C,D',  opcode: 0x4A, bytes: 1, cycles: 4,  description: 'Move D to C' },
  { mnemonic: 'MOV C,E',  opcode: 0x4B, bytes: 1, cycles: 4,  description: 'Move E to C' },
  { mnemonic: 'MOV C,H',  opcode: 0x4C, bytes: 1, cycles: 4,  description: 'Move H to C' },
  { mnemonic: 'MOV C,L',  opcode: 0x4D, bytes: 1, cycles: 4,  description: 'Move L to C' },
  { mnemonic: 'MOV C,M',  opcode: 0x4E, bytes: 1, cycles: 7,  description: 'Move memory (HL) to C' },
  { mnemonic: 'MOV C,A',  opcode: 0x4F, bytes: 1, cycles: 4,  description: 'Move A to C' },
  { mnemonic: 'MOV D,B',  opcode: 0x50, bytes: 1, cycles: 4,  description: 'Move B to D' },
  { mnemonic: 'MOV D,C',  opcode: 0x51, bytes: 1, cycles: 4,  description: 'Move C to D' },
  { mnemonic: 'MOV D,D',  opcode: 0x52, bytes: 1, cycles: 4,  description: 'Move D to D' },
  { mnemonic: 'MOV D,E',  opcode: 0x53, bytes: 1, cycles: 4,  description: 'Move E to D' },
  { mnemonic: 'MOV D,H',  opcode: 0x54, bytes: 1, cycles: 4,  description: 'Move H to D' },
  { mnemonic: 'MOV D,L',  opcode: 0x55, bytes: 1, cycles: 4,  description: 'Move L to D' },
  { mnemonic: 'MOV D,M',  opcode: 0x56, bytes: 1, cycles: 7,  description: 'Move memory (HL) to D' },
  { mnemonic: 'MOV D,A',  opcode: 0x57, bytes: 1, cycles: 4,  description: 'Move A to D' },
  { mnemonic: 'MOV E,B',  opcode: 0x58, bytes: 1, cycles: 4,  description: 'Move B to E' },
  { mnemonic: 'MOV E,C',  opcode: 0x59, bytes: 1, cycles: 4,  description: 'Move C to E' },
  { mnemonic: 'MOV E,D',  opcode: 0x5A, bytes: 1, cycles: 4,  description: 'Move D to E' },
  { mnemonic: 'MOV E,E',  opcode: 0x5B, bytes: 1, cycles: 4,  description: 'Move E to E' },
  { mnemonic: 'MOV E,H',  opcode: 0x5C, bytes: 1, cycles: 4,  description: 'Move H to E' },
  { mnemonic: 'MOV E,L',  opcode: 0x5D, bytes: 1, cycles: 4,  description: 'Move L to E' },
  { mnemonic: 'MOV E,M',  opcode: 0x5E, bytes: 1, cycles: 7,  description: 'Move memory (HL) to E' },
  { mnemonic: 'MOV E,A',  opcode: 0x5F, bytes: 1, cycles: 4,  description: 'Move A to E' },
  { mnemonic: 'MOV H,B',  opcode: 0x60, bytes: 1, cycles: 4,  description: 'Move B to H' },
  { mnemonic: 'MOV H,C',  opcode: 0x61, bytes: 1, cycles: 4,  description: 'Move C to H' },
  { mnemonic: 'MOV H,D',  opcode: 0x62, bytes: 1, cycles: 4,  description: 'Move D to H' },
  { mnemonic: 'MOV H,E',  opcode: 0x63, bytes: 1, cycles: 4,  description: 'Move E to H' },
  { mnemonic: 'MOV H,H',  opcode: 0x64, bytes: 1, cycles: 4,  description: 'Move H to H' },
  { mnemonic: 'MOV H,L',  opcode: 0x65, bytes: 1, cycles: 4,  description: 'Move L to H' },
  { mnemonic: 'MOV H,M',  opcode: 0x66, bytes: 1, cycles: 7,  description: 'Move memory (HL) to H' },
  { mnemonic: 'MOV H,A',  opcode: 0x67, bytes: 1, cycles: 4,  description: 'Move A to H' },
  { mnemonic: 'MOV L,B',  opcode: 0x68, bytes: 1, cycles: 4,  description: 'Move B to L' },
  { mnemonic: 'MOV L,C',  opcode: 0x69, bytes: 1, cycles: 4,  description: 'Move C to L' },
  { mnemonic: 'MOV L,D',  opcode: 0x6A, bytes: 1, cycles: 4,  description: 'Move D to L' },
  { mnemonic: 'MOV L,E',  opcode: 0x6B, bytes: 1, cycles: 4,  description: 'Move E to L' },
  { mnemonic: 'MOV L,H',  opcode: 0x6C, bytes: 1, cycles: 4,  description: 'Move H to L' },
  { mnemonic: 'MOV L,L',  opcode: 0x6D, bytes: 1, cycles: 4,  description: 'Move L to L' },
  { mnemonic: 'MOV L,M',  opcode: 0x6E, bytes: 1, cycles: 7,  description: 'Move memory (HL) to L' },
  { mnemonic: 'MOV L,A',  opcode: 0x6F, bytes: 1, cycles: 4,  description: 'Move A to L' },
  { mnemonic: 'MOV M,B',  opcode: 0x70, bytes: 1, cycles: 7,  description: 'Move B to memory (HL)' },
  { mnemonic: 'MOV M,C',  opcode: 0x71, bytes: 1, cycles: 7,  description: 'Move C to memory (HL)' },
  { mnemonic: 'MOV M,D',  opcode: 0x72, bytes: 1, cycles: 7,  description: 'Move D to memory (HL)' },
  { mnemonic: 'MOV M,E',  opcode: 0x73, bytes: 1, cycles: 7,  description: 'Move E to memory (HL)' },
  { mnemonic: 'MOV M,H',  opcode: 0x74, bytes: 1, cycles: 7,  description: 'Move H to memory (HL)' },
  { mnemonic: 'MOV M,L',  opcode: 0x75, bytes: 1, cycles: 7,  description: 'Move L to memory (HL)' },
  // 0x76 = HLT
  { mnemonic: 'MOV M,A',  opcode: 0x77, bytes: 1, cycles: 7,  description: 'Move A to memory (HL)' },
  { mnemonic: 'MOV A,B',  opcode: 0x78, bytes: 1, cycles: 4,  description: 'Move B to A' },
  { mnemonic: 'MOV A,C',  opcode: 0x79, bytes: 1, cycles: 4,  description: 'Move C to A' },
  { mnemonic: 'MOV A,D',  opcode: 0x7A, bytes: 1, cycles: 4,  description: 'Move D to A' },
  { mnemonic: 'MOV A,E',  opcode: 0x7B, bytes: 1, cycles: 4,  description: 'Move E to A' },
  { mnemonic: 'MOV A,H',  opcode: 0x7C, bytes: 1, cycles: 4,  description: 'Move H to A' },
  { mnemonic: 'MOV A,L',  opcode: 0x7D, bytes: 1, cycles: 4,  description: 'Move L to A' },
  { mnemonic: 'MOV A,M',  opcode: 0x7E, bytes: 1, cycles: 7,  description: 'Move memory (HL) to A' },
  { mnemonic: 'MOV A,A',  opcode: 0x7F, bytes: 1, cycles: 4,  description: 'Move A to A' },

  // ── MVI r, d8 ────────────────────────────────────────────────────────────
  { mnemonic: 'MVI B',  opcode: 0x06, bytes: 2, cycles: 7,  description: 'Move immediate to B' },
  { mnemonic: 'MVI C',  opcode: 0x0E, bytes: 2, cycles: 7,  description: 'Move immediate to C' },
  { mnemonic: 'MVI D',  opcode: 0x16, bytes: 2, cycles: 7,  description: 'Move immediate to D' },
  { mnemonic: 'MVI E',  opcode: 0x1E, bytes: 2, cycles: 7,  description: 'Move immediate to E' },
  { mnemonic: 'MVI H',  opcode: 0x26, bytes: 2, cycles: 7,  description: 'Move immediate to H' },
  { mnemonic: 'MVI L',  opcode: 0x2E, bytes: 2, cycles: 7,  description: 'Move immediate to L' },
  { mnemonic: 'MVI M',  opcode: 0x36, bytes: 2, cycles: 10, description: 'Move immediate to memory (HL)' },
  { mnemonic: 'MVI A',  opcode: 0x3E, bytes: 2, cycles: 7,  description: 'Move immediate to A' },

  // ── LXI rp, d16 ──────────────────────────────────────────────────────────
  { mnemonic: 'LXI B',  opcode: 0x01, bytes: 3, cycles: 10, description: 'Load immediate BC' },
  { mnemonic: 'LXI D',  opcode: 0x11, bytes: 3, cycles: 10, description: 'Load immediate DE' },
  { mnemonic: 'LXI H',  opcode: 0x21, bytes: 3, cycles: 10, description: 'Load immediate HL' },
  { mnemonic: 'LXI SP', opcode: 0x31, bytes: 3, cycles: 10, description: 'Load immediate SP' },

  // ── LDA / STA / LHLD / SHLD ──────────────────────────────────────────────
  { mnemonic: 'LDA',   opcode: 0x3A, bytes: 3, cycles: 13, description: 'Load A from memory address' },
  { mnemonic: 'STA',   opcode: 0x32, bytes: 3, cycles: 13, description: 'Store A to memory address' },
  { mnemonic: 'LHLD',  opcode: 0x2A, bytes: 3, cycles: 16, description: 'Load HL from memory address' },
  { mnemonic: 'SHLD',  opcode: 0x22, bytes: 3, cycles: 16, description: 'Store HL to memory address' },

  // ── LDAX / STAX ──────────────────────────────────────────────────────────
  { mnemonic: 'LDAX B', opcode: 0x0A, bytes: 1, cycles: 7,  description: 'Load A from (BC)' },
  { mnemonic: 'LDAX D', opcode: 0x1A, bytes: 1, cycles: 7,  description: 'Load A from (DE)' },
  { mnemonic: 'STAX B', opcode: 0x02, bytes: 1, cycles: 7,  description: 'Store A to (BC)' },
  { mnemonic: 'STAX D', opcode: 0x12, bytes: 1, cycles: 7,  description: 'Store A to (DE)' },

  // ── XCHG ─────────────────────────────────────────────────────────────────
  { mnemonic: 'XCHG',  opcode: 0xEB, bytes: 1, cycles: 4,  description: 'Exchange HL and DE' },

  // ── ADD r / ADD M ─────────────────────────────────────────────────────────
  { mnemonic: 'ADD B',  opcode: 0x80, bytes: 1, cycles: 4,  description: 'Add B to A' },
  { mnemonic: 'ADD C',  opcode: 0x81, bytes: 1, cycles: 4,  description: 'Add C to A' },
  { mnemonic: 'ADD D',  opcode: 0x82, bytes: 1, cycles: 4,  description: 'Add D to A' },
  { mnemonic: 'ADD E',  opcode: 0x83, bytes: 1, cycles: 4,  description: 'Add E to A' },
  { mnemonic: 'ADD H',  opcode: 0x84, bytes: 1, cycles: 4,  description: 'Add H to A' },
  { mnemonic: 'ADD L',  opcode: 0x85, bytes: 1, cycles: 4,  description: 'Add L to A' },
  { mnemonic: 'ADD M',  opcode: 0x86, bytes: 1, cycles: 7,  description: 'Add memory (HL) to A' },
  { mnemonic: 'ADD A',  opcode: 0x87, bytes: 1, cycles: 4,  description: 'Add A to A' },

  // ── ADC r / ADC M ─────────────────────────────────────────────────────────
  { mnemonic: 'ADC B',  opcode: 0x88, bytes: 1, cycles: 4,  description: 'Add B+CY to A' },
  { mnemonic: 'ADC C',  opcode: 0x89, bytes: 1, cycles: 4,  description: 'Add C+CY to A' },
  { mnemonic: 'ADC D',  opcode: 0x8A, bytes: 1, cycles: 4,  description: 'Add D+CY to A' },
  { mnemonic: 'ADC E',  opcode: 0x8B, bytes: 1, cycles: 4,  description: 'Add E+CY to A' },
  { mnemonic: 'ADC H',  opcode: 0x8C, bytes: 1, cycles: 4,  description: 'Add H+CY to A' },
  { mnemonic: 'ADC L',  opcode: 0x8D, bytes: 1, cycles: 4,  description: 'Add L+CY to A' },
  { mnemonic: 'ADC M',  opcode: 0x8E, bytes: 1, cycles: 7,  description: 'Add memory (HL)+CY to A' },
  { mnemonic: 'ADC A',  opcode: 0x8F, bytes: 1, cycles: 4,  description: 'Add A+CY to A' },

  // ── ADI / ACI ─────────────────────────────────────────────────────────────
  { mnemonic: 'ADI',   opcode: 0xC6, bytes: 2, cycles: 7,  description: 'Add immediate to A' },
  { mnemonic: 'ACI',   opcode: 0xCE, bytes: 2, cycles: 7,  description: 'Add immediate+CY to A' },

  // ── SUB r / SUB M ─────────────────────────────────────────────────────────
  { mnemonic: 'SUB B',  opcode: 0x90, bytes: 1, cycles: 4,  description: 'Subtract B from A' },
  { mnemonic: 'SUB C',  opcode: 0x91, bytes: 1, cycles: 4,  description: 'Subtract C from A' },
  { mnemonic: 'SUB D',  opcode: 0x92, bytes: 1, cycles: 4,  description: 'Subtract D from A' },
  { mnemonic: 'SUB E',  opcode: 0x93, bytes: 1, cycles: 4,  description: 'Subtract E from A' },
  { mnemonic: 'SUB H',  opcode: 0x94, bytes: 1, cycles: 4,  description: 'Subtract H from A' },
  { mnemonic: 'SUB L',  opcode: 0x95, bytes: 1, cycles: 4,  description: 'Subtract L from A' },
  { mnemonic: 'SUB M',  opcode: 0x96, bytes: 1, cycles: 7,  description: 'Subtract memory (HL) from A' },
  { mnemonic: 'SUB A',  opcode: 0x97, bytes: 1, cycles: 4,  description: 'Subtract A from A (A=0)' },

  // ── SBB r / SBB M ─────────────────────────────────────────────────────────
  { mnemonic: 'SBB B',  opcode: 0x98, bytes: 1, cycles: 4,  description: 'Subtract B+CY from A' },
  { mnemonic: 'SBB C',  opcode: 0x99, bytes: 1, cycles: 4,  description: 'Subtract C+CY from A' },
  { mnemonic: 'SBB D',  opcode: 0x9A, bytes: 1, cycles: 4,  description: 'Subtract D+CY from A' },
  { mnemonic: 'SBB E',  opcode: 0x9B, bytes: 1, cycles: 4,  description: 'Subtract E+CY from A' },
  { mnemonic: 'SBB H',  opcode: 0x9C, bytes: 1, cycles: 4,  description: 'Subtract H+CY from A' },
  { mnemonic: 'SBB L',  opcode: 0x9D, bytes: 1, cycles: 4,  description: 'Subtract L+CY from A' },
  { mnemonic: 'SBB M',  opcode: 0x9E, bytes: 1, cycles: 7,  description: 'Subtract memory (HL)+CY from A' },
  { mnemonic: 'SBB A',  opcode: 0x9F, bytes: 1, cycles: 4,  description: 'Subtract A+CY from A' },

  // ── SUI / SBI ─────────────────────────────────────────────────────────────
  { mnemonic: 'SUI',   opcode: 0xD6, bytes: 2, cycles: 7,  description: 'Subtract immediate from A' },
  { mnemonic: 'SBI',   opcode: 0xDE, bytes: 2, cycles: 7,  description: 'Subtract immediate+CY from A' },

  // ── INR r / DCR r ─────────────────────────────────────────────────────────
  { mnemonic: 'INR B',  opcode: 0x04, bytes: 1, cycles: 4,  description: 'Increment B' },
  { mnemonic: 'INR C',  opcode: 0x0C, bytes: 1, cycles: 4,  description: 'Increment C' },
  { mnemonic: 'INR D',  opcode: 0x14, bytes: 1, cycles: 4,  description: 'Increment D' },
  { mnemonic: 'INR E',  opcode: 0x1C, bytes: 1, cycles: 4,  description: 'Increment E' },
  { mnemonic: 'INR H',  opcode: 0x24, bytes: 1, cycles: 4,  description: 'Increment H' },
  { mnemonic: 'INR L',  opcode: 0x2C, bytes: 1, cycles: 4,  description: 'Increment L' },
  { mnemonic: 'INR M',  opcode: 0x34, bytes: 1, cycles: 10, description: 'Increment memory (HL)' },
  { mnemonic: 'INR A',  opcode: 0x3C, bytes: 1, cycles: 4,  description: 'Increment A' },
  { mnemonic: 'DCR B',  opcode: 0x05, bytes: 1, cycles: 4,  description: 'Decrement B' },
  { mnemonic: 'DCR C',  opcode: 0x0D, bytes: 1, cycles: 4,  description: 'Decrement C' },
  { mnemonic: 'DCR D',  opcode: 0x15, bytes: 1, cycles: 4,  description: 'Decrement D' },
  { mnemonic: 'DCR E',  opcode: 0x1D, bytes: 1, cycles: 4,  description: 'Decrement E' },
  { mnemonic: 'DCR H',  opcode: 0x25, bytes: 1, cycles: 4,  description: 'Decrement H' },
  { mnemonic: 'DCR L',  opcode: 0x2D, bytes: 1, cycles: 4,  description: 'Decrement L' },
  { mnemonic: 'DCR M',  opcode: 0x35, bytes: 1, cycles: 10, description: 'Decrement memory (HL)' },
  { mnemonic: 'DCR A',  opcode: 0x3D, bytes: 1, cycles: 4,  description: 'Decrement A' },

  // ── INX / DCX rp ──────────────────────────────────────────────────────────
  { mnemonic: 'INX B',  opcode: 0x03, bytes: 1, cycles: 6,  description: 'Increment BC' },
  { mnemonic: 'INX D',  opcode: 0x13, bytes: 1, cycles: 6,  description: 'Increment DE' },
  { mnemonic: 'INX H',  opcode: 0x23, bytes: 1, cycles: 6,  description: 'Increment HL' },
  { mnemonic: 'INX SP', opcode: 0x33, bytes: 1, cycles: 6,  description: 'Increment SP' },
  { mnemonic: 'DCX B',  opcode: 0x0B, bytes: 1, cycles: 6,  description: 'Decrement BC' },
  { mnemonic: 'DCX D',  opcode: 0x1B, bytes: 1, cycles: 6,  description: 'Decrement DE' },
  { mnemonic: 'DCX H',  opcode: 0x2B, bytes: 1, cycles: 6,  description: 'Decrement HL' },
  { mnemonic: 'DCX SP', opcode: 0x3B, bytes: 1, cycles: 6,  description: 'Decrement SP' },

  // ── DAD rp ────────────────────────────────────────────────────────────────
  { mnemonic: 'DAD B',  opcode: 0x09, bytes: 1, cycles: 10, description: 'Add BC to HL' },
  { mnemonic: 'DAD D',  opcode: 0x19, bytes: 1, cycles: 10, description: 'Add DE to HL' },
  { mnemonic: 'DAD H',  opcode: 0x29, bytes: 1, cycles: 10, description: 'Add HL to HL' },
  { mnemonic: 'DAD SP', opcode: 0x39, bytes: 1, cycles: 10, description: 'Add SP to HL' },

  // ── DAA ───────────────────────────────────────────────────────────────────
  { mnemonic: 'DAA',   opcode: 0x27, bytes: 1, cycles: 4,  description: 'Decimal Adjust Accumulator' },

  // ── Logic: ANA r / ANA M ──────────────────────────────────────────────────
  { mnemonic: 'ANA B',  opcode: 0xA0, bytes: 1, cycles: 4,  description: 'AND B with A' },
  { mnemonic: 'ANA C',  opcode: 0xA1, bytes: 1, cycles: 4,  description: 'AND C with A' },
  { mnemonic: 'ANA D',  opcode: 0xA2, bytes: 1, cycles: 4,  description: 'AND D with A' },
  { mnemonic: 'ANA E',  opcode: 0xA3, bytes: 1, cycles: 4,  description: 'AND E with A' },
  { mnemonic: 'ANA H',  opcode: 0xA4, bytes: 1, cycles: 4,  description: 'AND H with A' },
  { mnemonic: 'ANA L',  opcode: 0xA5, bytes: 1, cycles: 4,  description: 'AND L with A' },
  { mnemonic: 'ANA M',  opcode: 0xA6, bytes: 1, cycles: 7,  description: 'AND memory (HL) with A' },
  { mnemonic: 'ANA A',  opcode: 0xA7, bytes: 1, cycles: 4,  description: 'AND A with A' },

  // ── ORA r / ORA M ─────────────────────────────────────────────────────────
  { mnemonic: 'ORA B',  opcode: 0xB0, bytes: 1, cycles: 4,  description: 'OR B with A' },
  { mnemonic: 'ORA C',  opcode: 0xB1, bytes: 1, cycles: 4,  description: 'OR C with A' },
  { mnemonic: 'ORA D',  opcode: 0xB2, bytes: 1, cycles: 4,  description: 'OR D with A' },
  { mnemonic: 'ORA E',  opcode: 0xB3, bytes: 1, cycles: 4,  description: 'OR E with A' },
  { mnemonic: 'ORA H',  opcode: 0xB4, bytes: 1, cycles: 4,  description: 'OR H with A' },
  { mnemonic: 'ORA L',  opcode: 0xB5, bytes: 1, cycles: 4,  description: 'OR L with A' },
  { mnemonic: 'ORA M',  opcode: 0xB6, bytes: 1, cycles: 7,  description: 'OR memory (HL) with A' },
  { mnemonic: 'ORA A',  opcode: 0xB7, bytes: 1, cycles: 4,  description: 'OR A with A' },

  // ── XRA r / XRA M ─────────────────────────────────────────────────────────
  { mnemonic: 'XRA B',  opcode: 0xA8, bytes: 1, cycles: 4,  description: 'XOR B with A' },
  { mnemonic: 'XRA C',  opcode: 0xA9, bytes: 1, cycles: 4,  description: 'XOR C with A' },
  { mnemonic: 'XRA D',  opcode: 0xAA, bytes: 1, cycles: 4,  description: 'XOR D with A' },
  { mnemonic: 'XRA E',  opcode: 0xAB, bytes: 1, cycles: 4,  description: 'XOR E with A' },
  { mnemonic: 'XRA H',  opcode: 0xAC, bytes: 1, cycles: 4,  description: 'XOR H with A' },
  { mnemonic: 'XRA L',  opcode: 0xAD, bytes: 1, cycles: 4,  description: 'XOR L with A' },
  { mnemonic: 'XRA M',  opcode: 0xAE, bytes: 1, cycles: 7,  description: 'XOR memory (HL) with A' },
  { mnemonic: 'XRA A',  opcode: 0xAF, bytes: 1, cycles: 4,  description: 'XOR A with A (A=0)' },

  // ── CMP r / CMP M ─────────────────────────────────────────────────────────
  { mnemonic: 'CMP B',  opcode: 0xB8, bytes: 1, cycles: 4,  description: 'Compare B with A' },
  { mnemonic: 'CMP C',  opcode: 0xB9, bytes: 1, cycles: 4,  description: 'Compare C with A' },
  { mnemonic: 'CMP D',  opcode: 0xBA, bytes: 1, cycles: 4,  description: 'Compare D with A' },
  { mnemonic: 'CMP E',  opcode: 0xBB, bytes: 1, cycles: 4,  description: 'Compare E with A' },
  { mnemonic: 'CMP H',  opcode: 0xBC, bytes: 1, cycles: 4,  description: 'Compare H with A' },
  { mnemonic: 'CMP L',  opcode: 0xBD, bytes: 1, cycles: 4,  description: 'Compare L with A' },
  { mnemonic: 'CMP M',  opcode: 0xBE, bytes: 1, cycles: 7,  description: 'Compare memory (HL) with A' },
  { mnemonic: 'CMP A',  opcode: 0xBF, bytes: 1, cycles: 4,  description: 'Compare A with A' },

  // ── Immediate logic ───────────────────────────────────────────────────────
  { mnemonic: 'ANI',   opcode: 0xE6, bytes: 2, cycles: 7,  description: 'AND immediate with A' },
  { mnemonic: 'ORI',   opcode: 0xF6, bytes: 2, cycles: 7,  description: 'OR immediate with A' },
  { mnemonic: 'XRI',   opcode: 0xEE, bytes: 2, cycles: 7,  description: 'XOR immediate with A' },
  { mnemonic: 'CPI',   opcode: 0xFE, bytes: 2, cycles: 7,  description: 'Compare immediate with A' },

  // ── Rotate ────────────────────────────────────────────────────────────────
  { mnemonic: 'RLC',   opcode: 0x07, bytes: 1, cycles: 4,  description: 'Rotate A left through carry' },
  { mnemonic: 'RRC',   opcode: 0x0F, bytes: 1, cycles: 4,  description: 'Rotate A right through carry' },
  { mnemonic: 'RAL',   opcode: 0x17, bytes: 1, cycles: 4,  description: 'Rotate A left through CY' },
  { mnemonic: 'RAR',   opcode: 0x1F, bytes: 1, cycles: 4,  description: 'Rotate A right through CY' },

  // ── CMA / CMC / STC ───────────────────────────────────────────────────────
  { mnemonic: 'CMA',   opcode: 0x2F, bytes: 1, cycles: 4,  description: 'Complement A' },
  { mnemonic: 'CMC',   opcode: 0x3F, bytes: 1, cycles: 4,  description: 'Complement Carry' },
  { mnemonic: 'STC',   opcode: 0x37, bytes: 1, cycles: 4,  description: 'Set Carry' },

  // ── Jump ──────────────────────────────────────────────────────────────────
  { mnemonic: 'JMP',   opcode: 0xC3, bytes: 3, cycles: 10, description: 'Unconditional jump' },
  { mnemonic: 'JC',    opcode: 0xDA, bytes: 3, cycles: 10, description: 'Jump if Carry' },
  { mnemonic: 'JNC',   opcode: 0xD2, bytes: 3, cycles: 10, description: 'Jump if No Carry' },
  { mnemonic: 'JZ',    opcode: 0xCA, bytes: 3, cycles: 10, description: 'Jump if Zero' },
  { mnemonic: 'JNZ',   opcode: 0xC2, bytes: 3, cycles: 10, description: 'Jump if Not Zero' },
  { mnemonic: 'JP',    opcode: 0xF2, bytes: 3, cycles: 10, description: 'Jump if Positive (S=0)' },
  { mnemonic: 'JM',    opcode: 0xFA, bytes: 3, cycles: 10, description: 'Jump if Minus (S=1)' },
  { mnemonic: 'JPE',   opcode: 0xEA, bytes: 3, cycles: 10, description: 'Jump if Parity Even' },
  { mnemonic: 'JPO',   opcode: 0xE2, bytes: 3, cycles: 10, description: 'Jump if Parity Odd' },
  { mnemonic: 'PCHL',  opcode: 0xE9, bytes: 1, cycles: 6,  description: 'Jump to address in HL' },

  // ── Call ──────────────────────────────────────────────────────────────────
  { mnemonic: 'CALL',  opcode: 0xCD, bytes: 3, cycles: 17, description: 'Unconditional call' },
  { mnemonic: 'CC',    opcode: 0xDC, bytes: 3, cycles: 17, description: 'Call if Carry' },
  { mnemonic: 'CNC',   opcode: 0xD4, bytes: 3, cycles: 17, description: 'Call if No Carry' },
  { mnemonic: 'CZ',    opcode: 0xCC, bytes: 3, cycles: 17, description: 'Call if Zero' },
  { mnemonic: 'CNZ',   opcode: 0xC4, bytes: 3, cycles: 17, description: 'Call if Not Zero' },
  { mnemonic: 'CP',    opcode: 0xF4, bytes: 3, cycles: 17, description: 'Call if Positive' },
  { mnemonic: 'CM',    opcode: 0xFC, bytes: 3, cycles: 17, description: 'Call if Minus' },
  { mnemonic: 'CPE',   opcode: 0xEC, bytes: 3, cycles: 17, description: 'Call if Parity Even' },
  { mnemonic: 'CPO',   opcode: 0xE4, bytes: 3, cycles: 17, description: 'Call if Parity Odd' },

  // ── Return ────────────────────────────────────────────────────────────────
  { mnemonic: 'RET',   opcode: 0xC9, bytes: 1, cycles: 10, description: 'Unconditional return' },
  { mnemonic: 'RC',    opcode: 0xD8, bytes: 1, cycles: 10, description: 'Return if Carry' },
  { mnemonic: 'RNC',   opcode: 0xD0, bytes: 1, cycles: 10, description: 'Return if No Carry' },
  { mnemonic: 'RZ',    opcode: 0xC8, bytes: 1, cycles: 10, description: 'Return if Zero' },
  { mnemonic: 'RNZ',   opcode: 0xC0, bytes: 1, cycles: 10, description: 'Return if Not Zero' },
  { mnemonic: 'RP',    opcode: 0xF0, bytes: 1, cycles: 10, description: 'Return if Positive' },
  { mnemonic: 'RM',    opcode: 0xF8, bytes: 1, cycles: 10, description: 'Return if Minus' },
  { mnemonic: 'RPE',   opcode: 0xE8, bytes: 1, cycles: 10, description: 'Return if Parity Even' },
  { mnemonic: 'RPO',   opcode: 0xE0, bytes: 1, cycles: 10, description: 'Return if Parity Odd' },

  // ── RST 0-7 ───────────────────────────────────────────────────────────────
  { mnemonic: 'RST 0', opcode: 0xC7, bytes: 1, cycles: 11, description: 'Restart at 0000H' },
  { mnemonic: 'RST 1', opcode: 0xCF, bytes: 1, cycles: 11, description: 'Restart at 0008H' },
  { mnemonic: 'RST 2', opcode: 0xD7, bytes: 1, cycles: 11, description: 'Restart at 0010H' },
  { mnemonic: 'RST 3', opcode: 0xDF, bytes: 1, cycles: 11, description: 'Restart at 0018H' },
  { mnemonic: 'RST 4', opcode: 0xE7, bytes: 1, cycles: 11, description: 'Restart at 0020H' },
  { mnemonic: 'RST 5', opcode: 0xEF, bytes: 1, cycles: 11, description: 'Restart at 0028H' },
  { mnemonic: 'RST 6', opcode: 0xF7, bytes: 1, cycles: 11, description: 'Restart at 0030H' },
  { mnemonic: 'RST 7', opcode: 0xFF, bytes: 1, cycles: 11, description: 'Restart at 0038H' },

  // ── Stack ─────────────────────────────────────────────────────────────────
  { mnemonic: 'PUSH B',   opcode: 0xC5, bytes: 1, cycles: 12, description: 'Push BC onto stack' },
  { mnemonic: 'PUSH D',   opcode: 0xD5, bytes: 1, cycles: 12, description: 'Push DE onto stack' },
  { mnemonic: 'PUSH H',   opcode: 0xE5, bytes: 1, cycles: 12, description: 'Push HL onto stack' },
  { mnemonic: 'PUSH PSW', opcode: 0xF5, bytes: 1, cycles: 12, description: 'Push A and flags onto stack' },
  { mnemonic: 'POP B',    opcode: 0xC1, bytes: 1, cycles: 10, description: 'Pop BC from stack' },
  { mnemonic: 'POP D',    opcode: 0xD1, bytes: 1, cycles: 10, description: 'Pop DE from stack' },
  { mnemonic: 'POP H',    opcode: 0xE1, bytes: 1, cycles: 10, description: 'Pop HL from stack' },
  { mnemonic: 'POP PSW',  opcode: 0xF1, bytes: 1, cycles: 10, description: 'Pop A and flags from stack' },
  { mnemonic: 'XTHL',     opcode: 0xE3, bytes: 1, cycles: 16, description: 'Exchange HL with top of stack' },
  { mnemonic: 'SPHL',     opcode: 0xF9, bytes: 1, cycles: 6,  description: 'Move HL to SP' },

  // ── I/O ───────────────────────────────────────────────────────────────────
  { mnemonic: 'IN',  opcode: 0xDB, bytes: 2, cycles: 10, description: 'Input from port' },
  { mnemonic: 'OUT', opcode: 0xD3, bytes: 2, cycles: 10, description: 'Output to port' },

  // ── Control ───────────────────────────────────────────────────────────────
  { mnemonic: 'EI',  opcode: 0xFB, bytes: 1, cycles: 4,  description: 'Enable Interrupts' },
  { mnemonic: 'DI',  opcode: 0xF3, bytes: 1, cycles: 4,  description: 'Disable Interrupts' },
];

// Build OPCODES map: opcode → instruction
export const OPCODES: Map<number, Instruction> = new Map(
  ALL_INSTRUCTIONS.map((i) => [i.opcode, i]),
);

// Build INSTRUCTIONS map: base mnemonic → variants
export const INSTRUCTIONS: Map<string, Instruction[]> = new Map();
for (const instr of ALL_INSTRUCTIONS) {
  const base = instr.mnemonic.split(' ')[0];
  const existing = INSTRUCTIONS.get(base) ?? [];
  existing.push(instr);
  INSTRUCTIONS.set(base, existing);
}

# VLabs — Implementation Plan

## Status: Phase 1 ✅ | Phase 2 ✅ | Phase 3 ⏳ | Phase 4 ⏳

---

## Phase 1 — 3D Breadboard Labs ✅ DONE

All missing breadboard experiments built. 46 circuits, 56 content files, 74 static pages.

### Completed
- Sem 1: CB Amplifier, BJT Bias, MOSFET Characteristics, Op-Amp Circuits (+4)
- Sem 2: BCD→XS3, Gray↔Binary, 4:1 MUX (74HC153), 1:4 DEMUX (74HC139), 4-bit Adder (74HC283), 4-bit Subtractor (+6)
- Sem 2 Sequential: SR Latch, D Flip-Flop, JK+T Flip-Flop, MOD-5 Counter (+4)
- Bonus: Parity Checker, Digital Comparator, 8-bit SIPO Shift Register (+3)
- explore.data.ts: 4 full semesters, 58 live experiments + ~26 "coming soon"

---

## Phase 2 — Text-Only Labs ✅ DONE

### Completed
- `labType` field added to `LabContent` type
- `LabPage.tsx`: text-mode rendering (no empty breadboard for content-only labs)
- 10 text-only content files: K-map, CLA adder, Wallace tree, Booth's, Array multiplier, Registers/counters theory, Gates review, C expressions, C file ops ×2

---

## Phase 3 — 8085 Emulator + Code Labs ⏳ NOT STARTED

**Goal:** 11 Semester 4 assembly programs with in-browser 8085 assembler + step debugger.

### Files to create

```
src/labs/
  emulator/
    8085.ts           CPU core (~600 lines) — registers A,B,C,D,E,H,L,PC,SP,flags,memory
    assembler.ts      Two-pass assembler (~300 lines) — mnemonics → opcodes
    instructions.ts   Opcode table (~200 lines) — full 8085 ISA (~75 instructions)
    index.ts          Barrel export
  CodeLabPage.tsx     Editor + register panel + memory view (~400 lines)
```

### LabContent extension needed
```ts
// In lab-content.types.ts, add:
type CodeLabSection = {
  id: string; type: 'code-lab'; title: string;
  language: '8085';
  starterCode: string;        // pre-loaded assembly
  description: string;
  memoryInit?: Record<string, number>;  // hex addr → byte
  expectedOutputs?: string;
};
```

### 11 content files to create (no circuit files)
| Slug | Program |
|------|---------|
| `8085-add-sub-8bit` | MOV/ADD/SUB/STA/LDA/HLT |
| `8085-add-sub-carry` | ADC/SBB, 16-bit result |
| `8085-bcd-addition` | ADD + DAA |
| `8085-multiply-8bit` | Repeated addition loop |
| `8085-divide-8bit` | Repeated subtraction |
| `8085-array-sum` | LXI/MOV/ADD loop |
| `8085-array-square` | Nested multiply |
| `8085-min-max` | CMP/JC/JNC |
| `8085-bubble-sort` | Nested loops + XCHG |
| `8085-bcd-binary-conv` | RRC/ANI/shift |
| `8085-sqrt` | Successive odd subtraction |

### UI Layout
```
┌──────────────┬──────────────────────┬────────────────┐
│   Sidebar    │   Code Editor        │  Registers     │
│   sections   │   (textarea +        │  A:  25   F:42 │
│              │    line numbers)     │  B:  00   C:00 │
│              │  [Run][Step][Reset]  │  PC: 8100      │
│              │  Output: > Halted    │  SP: FFFF      │
└──────────────┴──────────────────────┴────────────────┘
```

### Instructions to implement
MOV, MVI, LXI, LDA, STA, LHLD, SHLD, LDAX, STAX, XCHG,
ADD, ADC, SUB, SBB, INR, DCR, INX, DCX, DAD,
ANA, ORA, XRA, CMP, ADI, ACI, SUI, SBI, ANI, ORI, XRI, CPI,
RLC, RRC, RAL, RAR, CMA, CMC, STC, DAA,
JMP, JC, JNC, JZ, JNZ, JP, JM, JPE, JPO,
CALL, CC, CNC, CZ, CNZ, CP, CM, CPE, CPO,
RET, RC, RNC, RZ, RNZ, RP, RM, RPE, RPO,
PUSH, POP, XTHL, SPHL, PCHL, IN, OUT, EI, DI, HLT, NOP

### LabPage.tsx change
3 lines: detect `labType === 'code'`, lazy-import `<CodeLabPage>`

### Effort estimate: 4–5 days

---

## Phase 4 — Simulation UIs ⏳ NOT STARTED

**Goal:** Sem 3 experiments requiring interactive block-diagram simulators.

### Files to create

```
src/labs/
  simulations/
    SimALU.tsx                  4-bit ALU with flag display (~300 lines)
    SimMemory.tsx               64-byte RAM/ROM grid (~400 lines)
    SimCacheDirectMapped.tsx    8-line direct-mapped cache (~400 lines)
    SimCacheAssociative.tsx     4-line LRU associative cache (~350 lines)
    SimCPU.tsx                  Fetch-decode-execute visualiser (~500 lines)
    SimFSM.tsx                  FSM state diagram tool (bonus, ~600 lines)
  SimLabPage.tsx                Shell: sidebar + simulation panel (~200 lines)
```

### LabContent extension needed
```ts
// In lab-content.types.ts, add:
type SimulationSection = {
  id: string; type: 'simulation'; title: string;
  simType: 'alu' | 'memory' | 'cache-direct' | 'cache-assoc' | 'cpu' | 'fsm';
};
```

### 5 content files to create
| Slug | simType | Sem 3 "Coming soon" entry already exists |
|------|---------|----------------------------------------|
| `alu-simulation` | `alu` | ✅ in explore.data.ts |
| `memory-design` | `memory` | ✅ |
| `cache-direct-mapped` | `cache-direct` | ✅ |
| `cache-associative` | `cache-assoc` | ✅ |
| `cpu-design` | `cpu` | ✅ |

### Component details

**SimALU**: A/B hex inputs (4-bit), operation dropdown (ADD/SUB/AND/OR/XOR/NOT),
binary bit-cell display, Z/S/CY/V flag indicators.

**SimMemory**: 16×16 hex grid, address+data inputs, READ/WRITE/RESET buttons,
blue=last-read, orange=last-write highlights. ROM region 0x00–0x1F read-only.

**SimCacheDirectMapped**: 8-line cache table (Valid|Tag|Data[0-3]),
address breakdown (tag|index|offset), hit=green/miss=red animation, hit-rate counter.

**SimCacheAssociative**: Same but with LRU column, 4 lines, replacement animation.

**SimCPU**: PC/IR/ALU/RegFile/Memory blocks. Simple 4-instruction ISA
(LOAD, ADD, STORE, JUMP). Step button highlights active data path.

### LabPage.tsx change
Detect `labType === 'simulation'`, delegate to `<SimLabPage>`

### Effort estimate: 4–5 days

---

## Summary

| Phase | Status | Experiments | New infrastructure |
|-------|--------|------------|-------------------|
| 1 — 3D Breadboard | ✅ Done | +30 | None (data files only) |
| 2 — Text-only | ✅ Done | +10 | `labType` field, LabPage text-mode |
| 3 — 8085 Code | ⏳ Todo | +11 | Emulator engine, CodeLabPage |
| 4 — Simulations | ⏳ Todo | +5 | 5 simulation components, SimLabPage |

**Current totals:** 46 circuits, 56 content files, 74 static pages, 4 semesters on /explore.
**After Phase 3+4:** ~72 experiments, 4 fully-populated semesters.

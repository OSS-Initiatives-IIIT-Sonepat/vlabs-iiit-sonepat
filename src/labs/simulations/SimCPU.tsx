'use client';

import { useState, useCallback, useRef } from 'react';

// ── ISA ───────────────────────────────────────────────────────────────────
// LOAD Rx, #imm      — Rx = imm
// LOAD Rx, [addr]    — Rx = mem[addr]
// ADD  Rd, Rs1, Rs2  — Rd = Rs1 + Rs2
// STORE Rs, [addr]   — mem[addr] = Rs
// JUMP addr          — PC = addr (line index)
// HALT

type Reg = 'R0' | 'R1' | 'R2' | 'R3';

interface CPUState {
  pc: number;
  ir: string;
  regs: Record<Reg, number>;
  memory: number[];
  stage: 'IDLE' | 'FETCH' | 'DECODE' | 'EXECUTE' | 'HALTED' | 'ERROR';
  stageDetail: string;
  activeBlock: 'pc' | 'ir' | 'alu' | 'regs' | 'memory' | null;
  halted: boolean;
  error: string;
}

const REGS: Reg[] = ['R0', 'R1', 'R2', 'R3'];

const DEFAULT_PROGRAM = `LOAD R0, #10
LOAD R1, #20
ADD R2, R0, R1
STORE R2, [30]
HALT`;

function makeInitialState(): CPUState {
  return {
    pc: 0,
    ir: '',
    regs: { R0: 0, R1: 0, R2: 0, R3: 0 },
    memory: new Array(256).fill(0),
    stage: 'IDLE',
    stageDetail: 'Press Step or Run to start',
    activeBlock: null,
    halted: false,
    error: '',
  };
}

function parseInstr(raw: string): { op: string; args: string[] } | null {
  const trimmed = raw.trim().replace(/\s+/g, ' ');
  if (!trimmed || trimmed.startsWith(';')) return null;
  const parts = trimmed.split(/[\s,]+/);
  return { op: parts[0].toUpperCase(), args: parts.slice(1) };
}

function isReg(s: string): s is Reg {
  return ['R0', 'R1', 'R2', 'R3'].includes(s.toUpperCase());
}

function parseImm(s: string): number | null {
  if (s.startsWith('#')) {
    const n = parseInt(s.slice(1), 10);
    return isNaN(n) ? null : n & 0xff;
  }
  const n = parseInt(s, 10);
  return isNaN(n) ? null : n & 0xff;
}

function parseMemRef(s: string): number | null {
  const m = s.match(/^\[(\d+)\]$/);
  if (!m) return null;
  return parseInt(m[1], 10) & 0xff;
}

function stepCPU(state: CPUState, lines: string[]): CPUState {
  if (state.halted) return { ...state, stageDetail: 'CPU is halted. Press Reset.', stage: 'HALTED' };

  const pc = state.pc;
  if (pc >= lines.length) {
    return { ...state, halted: true, stage: 'HALTED', stageDetail: 'No more instructions', activeBlock: null };
  }

  // FETCH
  const rawLine = lines[pc];
  const ir = rawLine.trim();

  const afterFetch: CPUState = {
    ...state,
    pc,
    ir,
    stage: 'FETCH',
    stageDetail: `FETCH: PC=${pc} → "${ir}"`,
    activeBlock: 'pc',
    error: '',
  };

  // DECODE
  const parsed = parseInstr(ir);
  if (!parsed) {
    // skip blank/comment
    return { ...afterFetch, pc: pc + 1, stage: 'DECODE', stageDetail: `DECODE: skipped blank line`, activeBlock: 'ir' };
  }

  const { op, args } = parsed;

  // EXECUTE
  const newRegs = { ...state.regs };
  const newMem = [...state.memory];

  switch (op) {
    case 'LOAD': {
      const dest = args[0]?.toUpperCase() as Reg;
      if (!isReg(dest)) return { ...afterFetch, error: `Invalid register: ${args[0]}`, stage: 'ERROR', activeBlock: 'ir' };
      const src = args[1];
      const memRef = parseMemRef(src);
      if (memRef !== null) {
        newRegs[dest] = state.memory[memRef];
        return { ...afterFetch, pc: pc + 1, regs: newRegs, stage: 'EXECUTE',
          stageDetail: `EXECUTE: LOAD ${dest} ← mem[${memRef}] = ${newRegs[dest]}`, activeBlock: 'memory' };
      }
      const imm = parseImm(src);
      if (imm !== null) {
        newRegs[dest] = imm;
        return { ...afterFetch, pc: pc + 1, regs: newRegs, stage: 'EXECUTE',
          stageDetail: `EXECUTE: LOAD ${dest} = ${imm}`, activeBlock: 'regs' };
      }
      return { ...afterFetch, error: `Bad LOAD operand: ${src}`, stage: 'ERROR', activeBlock: 'ir' };
    }

    case 'ADD': {
      const rd = args[0]?.toUpperCase() as Reg;
      const rs1 = args[1]?.toUpperCase() as Reg;
      const rs2 = args[2]?.toUpperCase() as Reg;
      if (!isReg(rd) || !isReg(rs1) || !isReg(rs2)) {
        return { ...afterFetch, error: `ADD requires 3 registers`, stage: 'ERROR', activeBlock: 'ir' };
      }
      newRegs[rd] = (state.regs[rs1] + state.regs[rs2]) & 0xff;
      return { ...afterFetch, pc: pc + 1, regs: newRegs, stage: 'EXECUTE',
        stageDetail: `EXECUTE: ADD ${rd} = ${state.regs[rs1]} + ${state.regs[rs2]} = ${newRegs[rd]}`, activeBlock: 'alu' };
    }

    case 'STORE': {
      const src = args[0]?.toUpperCase() as Reg;
      const addrStr = args[1];
      if (!isReg(src)) return { ...afterFetch, error: `Invalid register: ${args[0]}`, stage: 'ERROR', activeBlock: 'ir' };
      const addr = parseMemRef(addrStr);
      if (addr === null) return { ...afterFetch, error: `Bad STORE address: ${addrStr}`, stage: 'ERROR', activeBlock: 'ir' };
      newMem[addr] = state.regs[src];
      return { ...afterFetch, pc: pc + 1, memory: newMem, stage: 'EXECUTE',
        stageDetail: `EXECUTE: STORE mem[${addr}] = ${state.regs[src]} (from ${src})`, activeBlock: 'memory' };
    }

    case 'JUMP': {
      const target = parseInt(args[0], 10);
      if (isNaN(target)) return { ...afterFetch, error: `Bad JUMP target: ${args[0]}`, stage: 'ERROR', activeBlock: 'ir' };
      return { ...afterFetch, pc: target, stage: 'EXECUTE',
        stageDetail: `EXECUTE: JUMP → line ${target}`, activeBlock: 'pc' };
    }

    case 'HALT':
      return { ...afterFetch, pc: pc + 1, halted: true, stage: 'HALTED',
        stageDetail: 'EXECUTE: HALT — CPU stopped', activeBlock: null };

    default:
      return { ...afterFetch, error: `Unknown opcode: ${op}`, stage: 'ERROR', activeBlock: 'ir' };
  }
}

// ── Styles ────────────────────────────────────────────────────────────────
const S = {
  root: {
    background: '#1a1a2e',
    borderRadius: 12,
    color: '#e9ecef',
    fontFamily: 'ui-monospace, "Cascadia Code", monospace',
    fontSize: 13,
    maxWidth: 800,
    padding: 24,
    width: '100%',
  } as React.CSSProperties,
  title: { color: '#4dabf7', fontSize: 17, fontWeight: 700, marginBottom: 12 } as React.CSSProperties,
  desc: { color: '#868e96', fontSize: 12, lineHeight: 1.6, marginBottom: 14 } as React.CSSProperties,
  twoCol: {
    display: 'grid',
    gap: 16,
    gridTemplateColumns: '1fr 1fr',
    marginTop: 16,
  } as React.CSSProperties,
  progWrap: { marginBottom: 16 } as React.CSSProperties,
  progLabel: { color: '#868e96', fontSize: 11, marginBottom: 4 } as React.CSSProperties,
  textarea: {
    background: '#12121f',
    border: '1px solid #343a40',
    borderRadius: 6,
    color: '#e9ecef',
    fontFamily: 'inherit',
    fontSize: 13,
    lineHeight: 1.7,
    outline: 'none',
    padding: '10px 12px',
    resize: 'vertical' as const,
    width: '100%',
  } as React.CSSProperties,
  progLines: {
    background: '#12121f',
    border: '1px solid #343a40',
    borderRadius: 6,
    fontSize: 13,
    lineHeight: 1.7,
    overflow: 'hidden',
    padding: '10px 12px',
  } as React.CSSProperties,
  progLine: (active: boolean, halted: boolean): React.CSSProperties => ({
    background: active ? (halted ? '#3a2000' : '#1e3060') : 'transparent',
    borderLeft: active ? `3px solid ${halted ? '#ffa94d' : '#4dabf7'}` : '3px solid transparent',
    color: active ? '#e9ecef' : '#868e96',
    paddingLeft: 8,
  }),
  controlRow: {
    alignItems: 'center',
    display: 'flex',
    gap: 10,
    margin: '14px 0',
    flexWrap: 'wrap' as const,
  } as React.CSSProperties,
  btn: (c: string): React.CSSProperties => ({
    background: c,
    border: 'none',
    borderRadius: 6,
    color: c === '#495057' ? '#ccc' : '#1a1a2e',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 700,
    padding: '7px 16px',
  }),
  blocksGrid: {
    display: 'grid',
    gap: 12,
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'auto auto',
    marginBottom: 14,
  } as React.CSSProperties,
  block: (active: boolean, color: string): React.CSSProperties => ({
    background: '#12121f',
    border: `2px solid ${active ? color : '#2c2c3e'}`,
    borderRadius: 8,
    boxShadow: active ? `0 0 12px ${color}55` : 'none',
    padding: '10px 14px',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  }),
  blockTitle: { color: '#495057', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase' as const, marginBottom: 6 },
  blockVal: { color: '#e9ecef', fontSize: 14, fontWeight: 700 },
  stageBar: {
    background: '#12121f',
    borderRadius: 8,
    color: '#868e96',
    fontSize: 12,
    padding: '8px 14px',
    marginTop: 4,
  } as React.CSSProperties,
  stageBadge: (stage: string): React.CSSProperties => {
    const colors: Record<string, string> = {
      FETCH: '#4dabf7', DECODE: '#ffa94d', EXECUTE: '#51cf66',
      HALTED: '#868e96', ERROR: '#ff6b6b', IDLE: '#495057',
    };
    const c = colors[stage] ?? '#495057';
    return {
      background: c + '22',
      border: `1px solid ${c}`,
      borderRadius: 4,
      color: c,
      display: 'inline-block',
      fontSize: 11,
      marginRight: 10,
      padding: '2px 8px',
    };
  },
  regRow: {
    alignItems: 'center',
    borderBottom: '1px solid #2c2c3e',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 0',
  } as React.CSSProperties,
  regName: { color: '#868e96', fontSize: 12 } as React.CSSProperties,
  regVal: { color: '#4dabf7', fontWeight: 700 } as React.CSSProperties,
};

type Props = { description?: string };

export function SimCPU({ description }: Props) {
  const [program, setProgram] = useState(DEFAULT_PROGRAM);
  const [editing, setEditing] = useState(false);
  const [cpuState, setCpuState] = useState<CPUState>(makeInitialState);
  const [editBuf, setEditBuf] = useState(DEFAULT_PROGRAM);
  const runTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lines = program.split('\n').filter((l) => l.trim() !== '' || true); // keep empty for line index

  const handleStep = useCallback(() => {
    const programLines = program.split('\n');
    setCpuState((prev) => stepCPU(prev, programLines));
  }, [program]);

  const handleRun = useCallback(() => {
    const programLines = program.split('\n');
    let state = cpuState;
    // Guard: max 1000 steps
    for (let i = 0; i < 1000; i++) {
      state = stepCPU(state, programLines);
      if (state.halted || state.stage === 'ERROR') break;
    }
    setCpuState(state);
  }, [program, cpuState]);

  const handleReset = useCallback(() => {
    if (runTimer.current) clearTimeout(runTimer.current);
    setCpuState(makeInitialState());
  }, []);

  const handleEditToggle = useCallback(() => {
    if (!editing) {
      setEditBuf(program);
      setEditing(true);
    } else {
      setProgram(editBuf);
      setEditing(false);
      setCpuState(makeInitialState());
    }
  }, [editing, program, editBuf]);

  const { pc, ir, regs, memory, stage, stageDetail, activeBlock, halted } = cpuState;

  // Non-empty lines for display
  const displayLines = program.split('\n');

  return (
    <div style={S.root}>
      <div style={S.title}>CPU Simulator — Fetch · Decode · Execute</div>
      {description && <div style={S.desc}>{description}</div>}

      <div style={S.controlRow}>
        <button style={S.btn('#4dabf7')} onClick={handleStep} disabled={halted}>▶ Step</button>
        <button style={S.btn('#51cf66')} onClick={handleRun} disabled={halted}>▶▶ Run</button>
        <button style={S.btn('#495057')} onClick={handleReset}>↺ Reset</button>
        <button
          style={{ ...S.btn(editing ? '#ffa94d' : '#343a40'), color: editing ? '#1a1a2e' : '#ccc' }}
          onClick={handleEditToggle}
        >
          {editing ? '✓ Save Program' : '✎ Edit Program'}
        </button>
      </div>

      <div style={S.twoCol}>
        {/* Program */}
        <div style={S.progWrap}>
          <div style={S.progLabel}>Program</div>
          {editing ? (
            <textarea
              style={{ ...S.textarea, height: 180 }}
              value={editBuf}
              onChange={(e) => setEditBuf(e.target.value)}
              spellCheck={false}
            />
          ) : (
            <div style={S.progLines}>
              {displayLines.map((line, i) => (
                <div key={i} style={S.progLine(i === pc, halted)}>
                  <span style={{ color: '#495057', fontSize: 10, marginRight: 8 }}>{i.toString().padStart(2, '0')}</span>
                  {line || ' '}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Registers */}
        <div>
          <div style={S.progLabel}>Registers</div>
          <div style={S.block(activeBlock === 'regs', '#51cf66')}>
            <div style={S.blockTitle}>Register File</div>
            {REGS.map((r) => (
              <div key={r} style={S.regRow}>
                <span style={S.regName}>{r}</span>
                <span style={S.regVal}>{regs[r].toString().padStart(3, ' ')} (0x{regs[r].toString(16).toUpperCase().padStart(2, '0')})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CPU Blocks */}
      <div style={S.blocksGrid}>
        {/* PC */}
        <div style={S.block(activeBlock === 'pc', '#4dabf7')}>
          <div style={S.blockTitle}>Program Counter</div>
          <div style={S.blockVal}>PC = {pc}</div>
        </div>

        {/* IR */}
        <div style={S.block(activeBlock === 'ir', '#ffa94d')}>
          <div style={S.blockTitle}>Instruction Register</div>
          <div style={{ ...S.blockVal, fontSize: 12 }}>{ir || '—'}</div>
        </div>

        {/* ALU */}
        <div style={S.block(activeBlock === 'alu', '#51cf66')}>
          <div style={S.blockTitle}>ALU</div>
          <div style={{ ...S.blockVal, color: activeBlock === 'alu' ? '#51cf66' : '#495057' }}>
            {activeBlock === 'alu' ? stageDetail.split('=').pop()?.trim() ?? 'active' : '—'}
          </div>
        </div>

        {/* Memory preview */}
        <div style={{ ...S.block(activeBlock === 'memory', '#f06595'), gridColumn: '1 / -1' }}>
          <div style={S.blockTitle}>Memory (non-zero cells)</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 12 }}>
            {memory.map((v, i) => v !== 0 ? (
              <span key={i} style={{ color: '#f06595' }}>
                [{i}]={v}
              </span>
            ) : null).filter(Boolean).slice(0, 24)}
            {memory.filter((v) => v !== 0).length === 0 && <span style={{ color: '#495057' }}>empty</span>}
          </div>
        </div>
      </div>

      {/* Stage bar */}
      <div style={S.stageBar}>
        <span style={S.stageBadge(stage)}>{stage}</span>
        <span style={{ color: cpuState.error ? '#ff6b6b' : '#868e96' }}>
          {cpuState.error || stageDetail}
        </span>
      </div>
    </div>
  );
}

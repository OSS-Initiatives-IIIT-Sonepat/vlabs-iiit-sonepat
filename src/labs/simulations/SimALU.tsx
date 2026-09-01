'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────
type Operation = 'ADD' | 'SUB' | 'AND' | 'OR' | 'XOR' | 'NOT A' | 'NAND' | 'NOR';

interface Flags {
  Z: number; // zero
  S: number; // sign (MSB)
  CY: number; // carry out
  OV: number; // overflow
  P: number; // parity (even=1)
}

interface Result {
  value: number; // 0–15 (4-bit)
  flags: Flags;
  carry: number;
}

// ── ALU Logic ─────────────────────────────────────────────────────────────
function compute(a: number, b: number, op: Operation): Result {
  let raw = 0;
  let carry = 0;

  switch (op) {
    case 'ADD': {
      const sum = a + b;
      carry = sum > 15 ? 1 : 0;
      raw = sum & 0xf;
      break;
    }
    case 'SUB': {
      const diff = a - b;
      carry = diff < 0 ? 1 : 0;
      raw = ((diff % 16) + 16) % 16;
      break;
    }
    case 'AND':  raw = (a & b) & 0xf; break;
    case 'OR':   raw = (a | b) & 0xf; break;
    case 'XOR':  raw = (a ^ b) & 0xf; break;
    case 'NOT A': raw = (~a) & 0xf; break;
    case 'NAND': raw = (~(a & b)) & 0xf; break;
    case 'NOR':  raw = (~(a | b)) & 0xf; break;
  }

  // Signed overflow for ADD/SUB (4-bit two's complement)
  let ov = 0;
  if (op === 'ADD') {
    const sa = a >= 8 ? a - 16 : a;
    const sb = b >= 8 ? b - 16 : b;
    const sr = raw >= 8 ? raw - 16 : raw;
    ov = (sa + sb !== sr) ? 1 : 0;
  } else if (op === 'SUB') {
    const sa = a >= 8 ? a - 16 : a;
    const sb = b >= 8 ? b - 16 : b;
    const sr = raw >= 8 ? raw - 16 : raw;
    ov = (sa - sb !== sr) ? 1 : 0;
  }

  // Parity: even number of 1s → P=1
  let ones = 0;
  for (let i = 0; i < 4; i++) if ((raw >> i) & 1) ones++;
  const parity = ones % 2 === 0 ? 1 : 0;

  return {
    value: raw,
    carry,
    flags: {
      Z: raw === 0 ? 1 : 0,
      S: (raw >> 3) & 1,
      CY: carry,
      OV: ov,
      P: parity,
    },
  };
}

function toBits(n: number): [number, number, number, number] {
  return [(n >> 3) & 1, (n >> 2) & 1, (n >> 1) & 1, n & 1];
}

function fromBits(bits: [number, number, number, number]): number {
  return (bits[0] << 3) | (bits[1] << 2) | (bits[2] << 1) | bits[3];
}

function toHex(n: number) { return '0x' + n.toString(16).toUpperCase(); }

// ── Styles ────────────────────────────────────────────────────────────────
const S = {
  root: {
    background: '#1a1a2e',
    borderRadius: 12,
    color: '#e9ecef',
    fontFamily: 'ui-monospace, "Cascadia Code", monospace',
    fontSize: 14,
    maxWidth: 640,
    padding: 28,
    width: '100%',
  } as React.CSSProperties,
  title: {
    color: '#4dabf7',
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 20,
    letterSpacing: 0.5,
  } as React.CSSProperties,
  row: {
    alignItems: 'center',
    display: 'flex',
    gap: 12,
    marginBottom: 14,
  } as React.CSSProperties,
  label: {
    color: '#868e96',
    fontSize: 13,
    minWidth: 80,
  } as React.CSSProperties,
  bitRow: {
    display: 'flex',
    gap: 6,
  } as React.CSSProperties,
  bitCell: (val: number, flash: boolean): React.CSSProperties => ({
    alignItems: 'center',
    background: flash ? '#51cf66' : val === 1 ? '#2b4d38' : '#23232e',
    border: `1px solid ${val === 1 ? '#51cf66' : '#495057'}`,
    borderRadius: 4,
    color: val === 1 ? '#51cf66' : '#495057',
    cursor: 'pointer',
    display: 'flex',
    fontSize: 16,
    fontWeight: 700,
    height: 36,
    justifyContent: 'center',
    transition: 'background 0.3s, color 0.3s',
    width: 36,
  }),
  bitCellReadOnly: (val: number, flash: boolean): React.CSSProperties => ({
    alignItems: 'center',
    background: flash ? '#51cf66' : val === 1 ? '#2b4d38' : '#23232e',
    border: `1px solid ${val === 1 ? '#51cf66' : '#343a40'}`,
    borderRadius: 4,
    color: val === 1 ? '#51cf66' : '#495057',
    display: 'flex',
    fontSize: 16,
    fontWeight: 700,
    height: 36,
    justifyContent: 'center',
    opacity: 0.9,
    width: 36,
  }),
  hexDecLabel: {
    color: '#868e96',
    fontSize: 12,
    marginLeft: 8,
  } as React.CSSProperties,
  hexVal: {
    color: '#4dabf7',
    fontSize: 13,
    marginLeft: 4,
  } as React.CSSProperties,
  divider: {
    borderColor: '#2c2c3e',
    borderStyle: 'solid',
    borderWidth: '0 0 1px 0',
    margin: '16px 0',
  } as React.CSSProperties,
  select: {
    background: '#23232e',
    border: '1px solid #495057',
    borderRadius: 6,
    color: '#e9ecef',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: 13,
    padding: '6px 12px',
  } as React.CSSProperties,
  btn: {
    background: '#4dabf7',
    border: 'none',
    borderRadius: 6,
    color: '#1a1a2e',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 700,
    padding: '7px 18px',
  } as React.CSSProperties,
  flagPill: (active: boolean, color: string): React.CSSProperties => ({
    background: active ? color + '33' : '#23232e',
    border: `1px solid ${active ? color : '#495057'}`,
    borderRadius: 20,
    color: active ? color : '#495057',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 700,
    marginRight: 8,
    padding: '3px 10px',
  }),
  eqLine: {
    background: '#12121f',
    borderRadius: 8,
    color: '#868e96',
    fontSize: 13,
    marginTop: 16,
    padding: '10px 14px',
  } as React.CSSProperties,
  desc: {
    color: '#868e96',
    fontSize: 12,
    lineHeight: 1.6,
    marginBottom: 20,
  } as React.CSSProperties,
};

// ── Component ─────────────────────────────────────────────────────────────
type Props = { description?: string };

export function SimALU({ description }: Props) {
  const [a, setA] = useState<[number, number, number, number]>([0, 0, 1, 1]);
  const [b, setB] = useState<[number, number, number, number]>([0, 1, 0, 1]);
  const [op, setOp] = useState<Operation>('ADD');
  const [flash, setFlash] = useState(false);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const aVal = fromBits(a);
  const bVal = fromBits(b);
  const result = compute(aVal, bVal, op);
  const resultBits = toBits(result.value);

  const triggerFlash = useCallback(() => {
    setFlash(true);
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlash(false), 500);
  }, []);

  // Auto-calculate on any change
  useEffect(() => { triggerFlash(); }, [aVal, bVal, op, triggerFlash]);

  function toggleA(i: number) {
    const next = [...a] as [number, number, number, number];
    next[i] = next[i] === 1 ? 0 : 1;
    setA(next);
  }

  function toggleB(i: number) {
    const next = [...b] as [number, number, number, number];
    next[i] = next[i] === 1 ? 0 : 1;
    setB(next);
  }

  const ops: Operation[] = ['ADD', 'SUB', 'AND', 'OR', 'XOR', 'NOT A', 'NAND', 'NOR'];

  const eqStr = (() => {
    const ab = a.join('') + (op === 'NOT A' ? '' : ' ' + b.join(''));
    const rb = resultBits.join('');
    const opSym: Record<Operation, string> = {
      ADD: '+', SUB: '−', AND: '&', OR: '|', XOR: '⊕',
      'NOT A': '¬', NAND: 'NAND', NOR: 'NOR',
    };
    if (op === 'NOT A') return `¬ ${a.join('')} = ${rb}`;
    return `${a.join('')} ${opSym[op]} ${b.join('')} = ${rb}${result.carry ? ' (carry)' : ''}`;
  })();

  return (
    <div style={S.root}>
      <div style={S.title}>4-bit ALU Simulator</div>
      {description && <div style={S.desc}>{description}</div>}

      {/* Input A */}
      <div style={S.row}>
        <span style={S.label}>Input A:</span>
        <div style={S.bitRow}>
          {a.map((bit, i) => (
            <div key={i} style={S.bitCell(bit, false)} onClick={() => toggleA(i)} title="Click to toggle">
              {bit}
            </div>
          ))}
        </div>
        <span style={S.hexDecLabel}>= <span style={S.hexVal}>{toHex(aVal)}</span> = {aVal}</span>
      </div>

      {/* Input B */}
      <div style={S.row}>
        <span style={S.label}>Input B:</span>
        <div style={S.bitRow}>
          {b.map((bit, i) => (
            <div key={i} style={S.bitCell(bit, false)} onClick={() => toggleB(i)} title="Click to toggle">
              {bit}
            </div>
          ))}
        </div>
        <span style={S.hexDecLabel}>= <span style={S.hexVal}>{toHex(bVal)}</span> = {bVal}</span>
      </div>

      <div style={S.divider} />

      {/* Operation */}
      <div style={S.row}>
        <span style={S.label}>Operation:</span>
        <select
          style={S.select}
          value={op}
          onChange={(e) => setOp(e.target.value as Operation)}
        >
          {ops.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      <div style={S.divider} />

      {/* Result */}
      <div style={S.row}>
        <span style={S.label}>Result:</span>
        <div style={S.bitRow}>
          {resultBits.map((bit, i) => (
            <div key={i} style={S.bitCellReadOnly(bit, flash)}>
              {bit}
            </div>
          ))}
        </div>
        <span style={S.hexDecLabel}>= <span style={S.hexVal}>{toHex(result.value)}</span> = {result.value}</span>
        {result.carry > 0 && <span style={{ color: '#ff6b6b', fontSize: 12, marginLeft: 8 }}>CY={result.carry}</span>}
      </div>

      {/* Flags */}
      <div style={{ ...S.row, marginTop: 8 }}>
        <span style={S.label}>Flags:</span>
        <div>
          <span style={S.flagPill(result.flags.Z === 1, '#4dabf7')}>Z={result.flags.Z}</span>
          <span style={S.flagPill(result.flags.S === 1, '#f06595')}>S={result.flags.S}</span>
          <span style={S.flagPill(result.flags.CY === 1, '#ff6b6b')}>CY={result.flags.CY}</span>
          <span style={S.flagPill(result.flags.OV === 1, '#ffa94d')}>OV={result.flags.OV}</span>
          <span style={S.flagPill(result.flags.P === 1, '#51cf66')}>P={result.flags.P}</span>
        </div>
      </div>

      {/* Equation */}
      <div style={S.eqLine}>
        Binary: {eqStr}
      </div>
    </div>
  );
}

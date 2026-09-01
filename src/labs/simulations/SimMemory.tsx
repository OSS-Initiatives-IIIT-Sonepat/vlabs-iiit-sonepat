'use client';

import { useState, useCallback } from 'react';

// ── Initial ROM data (0x00–0x1F = 32 bytes) ──────────────────────────────
const ROM_END = 0x1f;
const MEM_SIZE = 256;

function makeInitialMemory(): Uint8Array {
  const mem = new Uint8Array(MEM_SIZE);
  // Pre-load ROM region with sample data
  const romData = [
    0xff, 0x00, 0x3c, 0xa5, 0xde, 0xad, 0xbe, 0xef,
    0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0,
    0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80,
    0xaa, 0x55, 0xcc, 0x33, 0x0f, 0xf0, 0xff, 0x00,
  ];
  romData.forEach((v, i) => { mem[i] = v; });
  return mem;
}

// ── Helpers ───────────────────────────────────────────────────────────────
function parseHex(s: string): number | null {
  const n = parseInt(s, 16);
  if (isNaN(n)) return null;
  return n;
}
function toHex2(n: number) { return n.toString(16).toUpperCase().padStart(2, '0'); }
function toHex4(n: number) { return '0x' + n.toString(16).toUpperCase().padStart(2, '0'); }

// ── Styles ────────────────────────────────────────────────────────────────
const S = {
  root: {
    background: '#1a1a2e',
    borderRadius: 12,
    color: '#e9ecef',
    fontFamily: 'ui-monospace, "Cascadia Code", monospace',
    fontSize: 13,
    maxWidth: 780,
    padding: 24,
    width: '100%',
  } as React.CSSProperties,
  title: {
    color: '#4dabf7',
    fontSize: 17,
    fontWeight: 700,
    marginBottom: 4,
  } as React.CSSProperties,
  regionBadge: (rom: boolean): React.CSSProperties => ({
    background: rom ? '#2c2040' : '#1e2c1e',
    border: `1px solid ${rom ? '#845ef7' : '#51cf66'}`,
    borderRadius: 12,
    color: rom ? '#b197fc' : '#51cf66',
    display: 'inline-block',
    fontSize: 11,
    marginLeft: 10,
    padding: '2px 8px',
  }),
  controlRow: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 10,
    margin: '16px 0',
  } as React.CSSProperties,
  label: { color: '#868e96', fontSize: 12 } as React.CSSProperties,
  input: {
    background: '#23232e',
    border: '1px solid #495057',
    borderRadius: 6,
    color: '#e9ecef',
    fontFamily: 'inherit',
    fontSize: 13,
    padding: '5px 10px',
    width: 90,
  } as React.CSSProperties,
  btn: (color: string): React.CSSProperties => ({
    background: color,
    border: 'none',
    borderRadius: 6,
    color: color === '#ff6b6b' ? '#fff' : '#1a1a2e',
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: 700,
    padding: '6px 14px',
  }),
  gridWrap: {
    overflowX: 'auto' as const,
    marginBottom: 14,
  } as React.CSSProperties,
  gridTable: {
    borderCollapse: 'collapse' as const,
    fontSize: 12,
    width: '100%',
  } as React.CSSProperties,
  colHeader: {
    color: '#495057',
    fontSize: 11,
    padding: '2px 6px',
    textAlign: 'center' as const,
  } as React.CSSProperties,
  rowLabel: {
    color: '#495057',
    fontSize: 11,
    paddingRight: 8,
    textAlign: 'right' as const,
    whiteSpace: 'nowrap' as const,
  } as React.CSSProperties,
  cell: (isRom: boolean, isLastRead: boolean, isLastWrite: boolean, isSelected: boolean): React.CSSProperties => ({
    background: isLastWrite ? '#7c4d00' : isLastRead ? '#003666' : isSelected ? '#2c3a1e' : isRom ? '#1e1828' : '#23232e',
    border: `1px solid ${isLastWrite ? '#ffa94d' : isLastRead ? '#4dabf7' : '#2c2c3e'}`,
    borderRadius: 2,
    color: isRom ? '#b197fc' : '#e9ecef',
    cursor: 'pointer',
    fontSize: 11,
    padding: '3px 5px',
    textAlign: 'center' as const,
    transition: 'background 0.2s',
    minWidth: 28,
  }),
  statusBar: {
    background: '#12121f',
    borderRadius: 8,
    color: '#868e96',
    fontSize: 12,
    marginTop: 10,
    padding: '8px 14px',
    display: 'flex',
    gap: 24,
    flexWrap: 'wrap' as const,
  } as React.CSSProperties,
  errorMsg: {
    color: '#ff6b6b',
    fontSize: 12,
    marginTop: 4,
    minHeight: 18,
  } as React.CSSProperties,
  desc: {
    color: '#868e96',
    fontSize: 12,
    lineHeight: 1.6,
    marginBottom: 14,
  } as React.CSSProperties,
};

// ── Component ─────────────────────────────────────────────────────────────
type Props = { description?: string };

export function SimMemory({ description }: Props) {
  const [memory, setMemory] = useState<Uint8Array>(() => makeInitialMemory());
  const [addrInput, setAddrInput] = useState('20');
  const [dataInput, setDataInput] = useState('00');
  const [lastRead, setLastRead] = useState<{ addr: number; val: number } | null>(null);
  const [lastWrite, setLastWrite] = useState<{ addr: number; val: number } | null>(null);
  const [error, setError] = useState('');

  const handleRead = useCallback(() => {
    const addr = parseHex(addrInput);
    if (addr === null || addr < 0 || addr > 255) { setError('Invalid address (00–FF)'); return; }
    setError('');
    setLastRead({ addr, val: memory[addr] });
  }, [addrInput, memory]);

  const handleWrite = useCallback(() => {
    const addr = parseHex(addrInput);
    const data = parseHex(dataInput);
    if (addr === null || addr < 0 || addr > 255) { setError('Invalid address (00–FF)'); return; }
    if (data === null || data < 0 || data > 255) { setError('Invalid data (00–FF)'); return; }
    if (addr <= ROM_END) { setError('ROM is read-only! Addresses 0x00–0x1F cannot be written.'); return; }
    setError('');
    const next = new Uint8Array(memory);
    next[addr] = data;
    setMemory(next);
    setLastWrite({ addr, val: data });
  }, [addrInput, dataInput, memory]);

  const handleReset = useCallback(() => {
    setMemory(makeInitialMemory());
    setLastRead(null);
    setLastWrite(null);
    setError('');
    setAddrInput('20');
    setDataInput('00');
  }, []);

  const handleCellClick = useCallback((addr: number) => {
    setAddrInput(addr.toString(16).toUpperCase().padStart(2, '0'));
  }, []);

  // Build 16×16 grid
  const rows = Array.from({ length: 16 }, (_, row) =>
    Array.from({ length: 16 }, (_, col) => row * 16 + col)
  );
  const colHeaders = Array.from({ length: 16 }, (_, i) => i.toString(16).toUpperCase().padStart(2, '0'));

  return (
    <div style={S.root}>
      <div style={S.title}>
        Memory Simulator
        <span style={S.regionBadge(true)}>ROM: 0x00–0x1F</span>
        <span style={S.regionBadge(false)}>RAM: 0x20–0xFF</span>
      </div>
      {description && <div style={S.desc}>{description}</div>}

      <div style={S.controlRow}>
        <span style={S.label}>Address: 0x</span>
        <input
          style={S.input}
          value={addrInput}
          onChange={(e) => setAddrInput(e.target.value.toUpperCase().replace(/[^0-9A-Fa-f]/g, '').slice(0, 2))}
          placeholder="00"
          maxLength={2}
        />
        <span style={S.label}>Data: 0x</span>
        <input
          style={S.input}
          value={dataInput}
          onChange={(e) => setDataInput(e.target.value.toUpperCase().replace(/[^0-9A-Fa-f]/g, '').slice(0, 2))}
          placeholder="00"
          maxLength={2}
        />
        <button style={S.btn('#4dabf7')} onClick={handleRead}>READ</button>
        <button style={S.btn('#51cf66')} onClick={handleWrite}>WRITE</button>
        <button style={S.btn('#495057')} onClick={handleReset}>RESET</button>
      </div>

      <div style={S.errorMsg}>{error}</div>

      <div style={S.gridWrap}>
        <table style={S.gridTable}>
          <thead>
            <tr>
              <th style={S.colHeader}></th>
              {colHeaders.map((h) => <th key={h} style={S.colHeader}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                <td style={S.rowLabel}>{(ri * 16).toString(16).toUpperCase().padStart(2, '0')}</td>
                {row.map((addr) => {
                  const isRom = addr <= ROM_END;
                  const isLastRead = lastRead?.addr === addr;
                  const isLastWrite = lastWrite?.addr === addr;
                  const selAddr = parseHex(addrInput);
                  const isSelected = selAddr === addr;
                  return (
                    <td
                      key={addr}
                      style={S.cell(isRom, isLastRead, isLastWrite, isSelected)}
                      onClick={() => handleCellClick(addr)}
                      title={`0x${addr.toString(16).toUpperCase().padStart(2, '0')}: ${isRom ? 'ROM' : 'RAM'}`}
                    >
                      {toHex2(memory[addr])}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={S.statusBar}>
        <span>
          Last READ:{' '}
          {lastRead
            ? <span style={{ color: '#4dabf7' }}>{toHex2(lastRead.val)} from {toHex4(lastRead.addr)}</span>
            : <span style={{ color: '#495057' }}>—</span>}
        </span>
        <span>
          Last WRITE:{' '}
          {lastWrite
            ? <span style={{ color: '#ffa94d' }}>{toHex2(lastWrite.val)} to {toHex4(lastWrite.addr)}</span>
            : <span style={{ color: '#495057' }}>—</span>}
        </span>
      </div>
    </div>
  );
}

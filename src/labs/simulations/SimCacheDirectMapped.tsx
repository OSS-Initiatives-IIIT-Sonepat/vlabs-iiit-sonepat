'use client';

import { useState, useCallback, useRef } from 'react';

// ── Cache config ──────────────────────────────────────────────────────────
const NUM_LINES = 8;
const BLOCK_SIZE = 4;        // bytes per block
const OFFSET_BITS = 2;       // log2(4) = 2
const INDEX_BITS = 3;        // log2(8) = 3
const TAG_BITS = 4;          // 9-bit address total; 9-2-3=4
const ADDR_BITS = 9;

// Simulated memory: mem[addr] = addr XOR 0x42
function memRead(addr: number): number[] {
  const blockBase = addr & ~(BLOCK_SIZE - 1);
  return Array.from({ length: BLOCK_SIZE }, (_, i) => ((blockBase + i) ^ 0x42) & 0xff);
}

function parseAddr(s: string): number | null {
  const n = parseInt(s, 16);
  if (isNaN(n) || n < 0 || n >= (1 << ADDR_BITS)) return null;
  return n;
}

function toHex2(n: number) { return n.toString(16).toUpperCase().padStart(2, '0'); }

interface CacheLine {
  valid: boolean;
  tag: number;
  data: number[];
}

function emptyLine(): CacheLine {
  return { valid: false, tag: 0, data: Array(BLOCK_SIZE).fill(0) };
}

function emptyCache(): CacheLine[] {
  return Array.from({ length: NUM_LINES }, emptyLine);
}

// ── Styles ────────────────────────────────────────────────────────────────
const S = {
  root: {
    background: '#1a1a2e',
    borderRadius: 12,
    color: '#e9ecef',
    fontFamily: 'ui-monospace, "Cascadia Code", monospace',
    fontSize: 13,
    maxWidth: 700,
    padding: 24,
    width: '100%',
  } as React.CSSProperties,
  title: {
    color: '#4dabf7',
    fontSize: 17,
    fontWeight: 700,
    marginBottom: 4,
  } as React.CSSProperties,
  desc: { color: '#868e96', fontSize: 12, lineHeight: 1.6, marginBottom: 14 } as React.CSSProperties,
  addrBreakdown: {
    background: '#12121f',
    borderRadius: 8,
    display: 'flex',
    gap: 2,
    marginBottom: 16,
    padding: '10px 14px',
  } as React.CSSProperties,
  field: (color: string): React.CSSProperties => ({
    background: color + '22',
    border: `1px solid ${color}`,
    borderRadius: 4,
    color,
    display: 'flex',
    flexDirection: 'column',
    fontSize: 11,
    padding: '4px 10px',
    textAlign: 'center',
  }),
  controlRow: {
    alignItems: 'center',
    display: 'flex',
    gap: 10,
    margin: '12px 0',
    flexWrap: 'wrap' as const,
  } as React.CSSProperties,
  input: {
    background: '#23232e',
    border: '1px solid #495057',
    borderRadius: 6,
    color: '#e9ecef',
    fontFamily: 'inherit',
    fontSize: 13,
    padding: '5px 10px',
    width: 80,
  } as React.CSSProperties,
  btn: (c: string): React.CSSProperties => ({
    background: c,
    border: 'none',
    borderRadius: 6,
    color: c === '#495057' ? '#ccc' : '#1a1a2e',
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: 700,
    padding: '6px 14px',
  }),
  table: { borderCollapse: 'collapse' as const, fontSize: 12, width: '100%' } as React.CSSProperties,
  th: {
    borderBottom: '1px solid #2c2c3e',
    color: '#868e96',
    fontSize: 11,
    padding: '6px 10px',
    textAlign: 'left' as const,
  } as React.CSSProperties,
  tr: (isActive: boolean, flash: 'hit' | 'miss' | null): React.CSSProperties => ({
    background: flash === 'hit' ? '#1e3a1e' : flash === 'miss' ? '#3a1e1e' : isActive ? '#1e2a3a' : 'transparent',
    border: isActive ? '1px solid #4dabf7' : '1px solid transparent',
    transition: 'background 0.4s',
  }),
  td: {
    borderBottom: '1px solid #1e1e2e',
    padding: '6px 10px',
    verticalAlign: 'middle' as const,
  } as React.CSSProperties,
  statusChip: (type: 'hit' | 'miss'): React.CSSProperties => ({
    background: type === 'hit' ? '#1e3a1e' : '#3a1e1e',
    border: `1px solid ${type === 'hit' ? '#51cf66' : '#ff6b6b'}`,
    borderRadius: 4,
    color: type === 'hit' ? '#51cf66' : '#ff6b6b',
    display: 'inline-block',
    fontSize: 11,
    padding: '1px 8px',
  }),
  statsBar: {
    background: '#12121f',
    borderRadius: 8,
    color: '#868e96',
    display: 'flex',
    flexWrap: 'wrap' as const,
    fontSize: 12,
    gap: 20,
    marginTop: 14,
    padding: '8px 14px',
  } as React.CSSProperties,
  statVal: (c: string): React.CSSProperties => ({ color: c, fontWeight: 700 }),
};

// ── Component ─────────────────────────────────────────────────────────────
type FlashMap = Record<number, 'hit' | 'miss' | null>;

type Props = { description?: string };

export function SimCacheDirectMapped({ description }: Props) {
  const [cache, setCache] = useState<CacheLine[]>(emptyCache);
  const [addrInput, setAddrInput] = useState('00');
  const [activeLineIdx, setActiveLineIdx] = useState<number | null>(null);
  const [flashMap, setFlashMap] = useState<FlashMap>({});
  const [accesses, setAccesses] = useState(0);
  const [hits, setHits] = useState(0);
  const [lastResult, setLastResult] = useState<{ addr: number; type: 'hit' | 'miss' } | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleAccess = useCallback(() => {
    const addr = parseAddr(addrInput);
    if (addr === null) return;

    const offset = addr & ((1 << OFFSET_BITS) - 1);
    const index  = (addr >> OFFSET_BITS) & ((1 << INDEX_BITS) - 1);
    const tag    = addr >> (OFFSET_BITS + INDEX_BITS);

    const line = cache[index];
    const isHit = line.valid && line.tag === tag;

    const newCache = [...cache];
    if (!isHit) {
      newCache[index] = { valid: true, tag, data: memRead(addr) };
    }

    setCache(newCache);
    setActiveLineIdx(index);
    setAccesses((a) => a + 1);
    if (isHit) setHits((h) => h + 1);
    setLastResult({ addr, type: isHit ? 'hit' : 'miss' });

    // Flash
    if (flashTimer.current) clearTimeout(flashTimer.current);
    setFlashMap({ [index]: isHit ? 'hit' : 'miss' });
    flashTimer.current = setTimeout(() => setFlashMap({}), 700);
  }, [addrInput, cache]);

  const handleReset = useCallback(() => {
    setCache(emptyCache());
    setActiveLineIdx(null);
    setFlashMap({});
    setAccesses(0);
    setHits(0);
    setLastResult(null);
  }, []);

  // Parse current address for breakdown display
  const currentAddr = parseAddr(addrInput) ?? 0;
  const curOffset = currentAddr & 0x3;
  const curIndex  = (currentAddr >> 2) & 0x7;
  const curTag    = currentAddr >> 5;

  const hitRate = accesses > 0 ? ((hits / accesses) * 100).toFixed(1) : '—';

  return (
    <div style={S.root}>
      <div style={S.title}>Direct-Mapped Cache — 8 lines, 4-byte blocks</div>
      {description && <div style={S.desc}>{description}</div>}

      {/* Address breakdown */}
      <div style={S.addrBreakdown}>
        <div style={S.field('#f06595')}>
          <span style={{ fontWeight: 700 }}>{curTag.toString(2).padStart(TAG_BITS, '0')}</span>
          <span style={{ fontSize: 10, marginTop: 2 }}>TAG ({TAG_BITS}b)</span>
        </div>
        <div style={{ alignSelf: 'center', color: '#495057', padding: '0 4px' }}>|</div>
        <div style={S.field('#ffa94d')}>
          <span style={{ fontWeight: 700 }}>{curIndex.toString(2).padStart(INDEX_BITS, '0')}</span>
          <span style={{ fontSize: 10, marginTop: 2 }}>INDEX ({INDEX_BITS}b)</span>
        </div>
        <div style={{ alignSelf: 'center', color: '#495057', padding: '0 4px' }}>|</div>
        <div style={S.field('#4dabf7')}>
          <span style={{ fontWeight: 700 }}>{curOffset.toString(2).padStart(OFFSET_BITS, '0')}</span>
          <span style={{ fontSize: 10, marginTop: 2 }}>OFFSET ({OFFSET_BITS}b)</span>
        </div>
        <div style={{ alignSelf: 'center', color: '#868e96', fontSize: 11, marginLeft: 12 }}>
          = 0x{addrInput.padStart(3, '0').slice(-3).toUpperCase()}
        </div>
      </div>

      {/* Controls */}
      <div style={S.controlRow}>
        <span style={{ color: '#868e96', fontSize: 12 }}>Address: 0x</span>
        <input
          style={S.input}
          value={addrInput}
          onChange={(e) => setAddrInput(e.target.value.toUpperCase().replace(/[^0-9A-Fa-f]/g, '').slice(0, 3))}
          maxLength={3}
        />
        <button style={S.btn('#4dabf7')} onClick={handleAccess}>ACCESS</button>
        <button style={S.btn('#495057')} onClick={handleReset}>RESET</button>
        {lastResult && (
          <span style={S.statusChip(lastResult.type)}>
            {lastResult.type.toUpperCase()} @ 0x{lastResult.addr.toString(16).toUpperCase().padStart(2, '0')}
          </span>
        )}
      </div>

      {/* Cache table */}
      <table style={S.table}>
        <thead>
          <tr>
            {['Line', 'Valid', 'Tag', 'D[0]', 'D[1]', 'D[2]', 'D[3]', 'Status'].map((h) => (
              <th key={h} style={S.th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cache.map((line, i) => {
            const fl = flashMap[i] ?? null;
            return (
              <tr key={i} style={S.tr(activeLineIdx === i, fl)}>
                <td style={S.td}>{i}</td>
                <td style={{ ...S.td, color: line.valid ? '#51cf66' : '#495057' }}>
                  {line.valid ? '1' : '0'}
                </td>
                <td style={{ ...S.td, color: '#ffa94d' }}>
                  {line.valid ? line.tag.toString(16).toUpperCase() : '—'}
                </td>
                {line.data.map((b, di) => (
                  <td key={di} style={{ ...S.td, color: line.valid ? '#e9ecef' : '#495057' }}>
                    {line.valid ? toHex2(b) : '--'}
                  </td>
                ))}
                <td style={S.td}>
                  {activeLineIdx === i && fl && (
                    <span style={S.statusChip(fl)}>
                      {fl === 'hit' ? '← HIT' : '← MISS'}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Stats */}
      <div style={S.statsBar}>
        <span>Accesses: <span style={S.statVal('#e9ecef')}>{accesses}</span></span>
        <span>Hits: <span style={S.statVal('#51cf66')}>{hits}</span></span>
        <span>Misses: <span style={S.statVal('#ff6b6b')}>{accesses - hits}</span></span>
        <span>Hit Rate: <span style={S.statVal('#4dabf7')}>{hitRate}{typeof hitRate === 'number' ? '%' : ''}{accesses > 0 ? '%' : ''}</span></span>
      </div>
    </div>
  );
}

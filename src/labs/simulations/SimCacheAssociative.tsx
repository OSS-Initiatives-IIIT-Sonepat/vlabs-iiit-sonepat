'use client';

import { useState, useCallback, useRef } from 'react';

// ── Cache config ──────────────────────────────────────────────────────────
const NUM_LINES = 4;
const BLOCK_SIZE = 4;
const OFFSET_BITS = 2;
const TAG_BITS = 6;  // 8-bit address, no index field

function memRead(addr: number): number[] {
  const blockBase = addr & ~(BLOCK_SIZE - 1);
  return Array.from({ length: BLOCK_SIZE }, (_, i) => ((blockBase + i) ^ 0x42) & 0xff);
}

function parseAddr(s: string): number | null {
  const n = parseInt(s, 16);
  if (isNaN(n) || n < 0 || n > 255) return null;
  return n;
}

function toHex2(n: number) { return n.toString(16).toUpperCase().padStart(2, '0'); }

interface CacheLine {
  valid: boolean;
  tag: number;
  data: number[];
  lruOrder: number; // 0 = MRU, NUM_LINES-1 = LRU
}

function emptyLine(i: number): CacheLine {
  return { valid: false, tag: 0, data: Array(BLOCK_SIZE).fill(0), lruOrder: i };
}

function emptyCache(): CacheLine[] {
  return Array.from({ length: NUM_LINES }, (_, i) => emptyLine(i));
}

// ── LRU helpers ───────────────────────────────────────────────────────────
function updateLRU(lines: CacheLine[], usedIdx: number): CacheLine[] {
  const usedOrder = lines[usedIdx].lruOrder;
  return lines.map((line, i) => {
    if (i === usedIdx) return { ...line, lruOrder: 0 };
    if (line.lruOrder < usedOrder) return { ...line, lruOrder: line.lruOrder + 1 };
    return line;
  });
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
  tr: (isActive: boolean, flash: 'hit' | 'miss' | null, isEvicted: boolean): React.CSSProperties => ({
    background: isEvicted ? '#2a2000' : flash === 'hit' ? '#1e3a1e' : flash === 'miss' ? '#3a1e1e' : isActive ? '#1e2a3a' : 'transparent',
    border: isEvicted ? '1px solid #ffd43b' : isActive ? '1px solid #4dabf7' : '1px solid transparent',
    transition: 'background 0.4s, border 0.4s',
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
  lruBadge: (order: number): React.CSSProperties => ({
    background: order === NUM_LINES - 1 ? '#3a1e00' : '#1a2030',
    border: `1px solid ${order === NUM_LINES - 1 ? '#ffa94d' : '#343a40'}`,
    borderRadius: 10,
    color: order === NUM_LINES - 1 ? '#ffa94d' : '#868e96',
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

export function SimCacheAssociative({ description }: Props) {
  const [cache, setCache] = useState<CacheLine[]>(emptyCache);
  const [addrInput, setAddrInput] = useState('00');
  const [activeLineIdx, setActiveLineIdx] = useState<number | null>(null);
  const [evictedLineIdx, setEvictedLineIdx] = useState<number | null>(null);
  const [flashMap, setFlashMap] = useState<FlashMap>({});
  const [accesses, setAccesses] = useState(0);
  const [hits, setHits] = useState(0);
  const [lastResult, setLastResult] = useState<{ addr: number; type: 'hit' | 'miss' } | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const evictTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleAccess = useCallback(() => {
    const addr = parseAddr(addrInput);
    if (addr === null) return;

    const tag = addr >> OFFSET_BITS;

    // Check for hit
    const hitIdx = cache.findIndex((l) => l.valid && l.tag === tag);
    const isHit = hitIdx !== -1;

    let newCache = [...cache];
    let loadedIdx: number;
    let evicted: number | null = null;

    if (isHit) {
      loadedIdx = hitIdx;
      newCache = updateLRU(newCache, hitIdx);
    } else {
      // Find empty line or LRU line
      const emptyIdx = cache.findIndex((l) => !l.valid);
      if (emptyIdx !== -1) {
        loadedIdx = emptyIdx;
      } else {
        // Evict LRU (highest lruOrder)
        loadedIdx = cache.reduce((maxI, l, i) => l.lruOrder > cache[maxI].lruOrder ? i : maxI, 0);
        evicted = loadedIdx;
      }
      newCache[loadedIdx] = { valid: true, tag, data: memRead(addr), lruOrder: NUM_LINES };
      newCache = updateLRU(newCache, loadedIdx);
    }

    setCache(newCache);
    setActiveLineIdx(loadedIdx);
    setAccesses((a) => a + 1);
    if (isHit) setHits((h) => h + 1);
    setLastResult({ addr, type: isHit ? 'hit' : 'miss' });

    if (evicted !== null) {
      setEvictedLineIdx(evicted);
      if (evictTimer.current) clearTimeout(evictTimer.current);
      evictTimer.current = setTimeout(() => setEvictedLineIdx(null), 800);
    } else {
      setEvictedLineIdx(null);
    }

    if (flashTimer.current) clearTimeout(flashTimer.current);
    setFlashMap({ [loadedIdx]: isHit ? 'hit' : 'miss' });
    flashTimer.current = setTimeout(() => setFlashMap({}), 700);
  }, [addrInput, cache]);

  const handleReset = useCallback(() => {
    setCache(emptyCache());
    setActiveLineIdx(null);
    setEvictedLineIdx(null);
    setFlashMap({});
    setAccesses(0);
    setHits(0);
    setLastResult(null);
  }, []);

  const currentAddr = parseAddr(addrInput) ?? 0;
  const curOffset = currentAddr & 0x3;
  const curTag    = currentAddr >> 2;

  const hitRate = accesses > 0 ? ((hits / accesses) * 100).toFixed(1) : '—';

  return (
    <div style={S.root}>
      <div style={S.title}>Fully-Associative Cache — 4 lines, LRU replacement</div>
      {description && <div style={S.desc}>{description}</div>}

      {/* Address breakdown */}
      <div style={S.addrBreakdown}>
        <div style={S.field('#f06595')}>
          <span style={{ fontWeight: 700 }}>{curTag.toString(2).padStart(TAG_BITS, '0')}</span>
          <span style={{ fontSize: 10, marginTop: 2 }}>TAG ({TAG_BITS}b)</span>
        </div>
        <div style={{ alignSelf: 'center', color: '#495057', padding: '0 4px' }}>|</div>
        <div style={S.field('#4dabf7')}>
          <span style={{ fontWeight: 700 }}>{curOffset.toString(2).padStart(OFFSET_BITS, '0')}</span>
          <span style={{ fontSize: 10, marginTop: 2 }}>OFFSET ({OFFSET_BITS}b)</span>
        </div>
        <div style={{ alignSelf: 'center', color: '#868e96', fontSize: 11, marginLeft: 12 }}>
          (no index — any line)
        </div>
      </div>

      {/* Controls */}
      <div style={S.controlRow}>
        <span style={{ color: '#868e96', fontSize: 12 }}>Address: 0x</span>
        <input
          style={S.input}
          value={addrInput}
          onChange={(e) => setAddrInput(e.target.value.toUpperCase().replace(/[^0-9A-Fa-f]/g, '').slice(0, 2))}
          maxLength={2}
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
            {['Line', 'Valid', 'Tag', 'D[0]', 'D[1]', 'D[2]', 'D[3]', 'LRU', 'Status'].map((h) => (
              <th key={h} style={S.th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cache.map((line, i) => {
            const fl = flashMap[i] ?? null;
            const isEvicted = evictedLineIdx === i;
            return (
              <tr key={i} style={S.tr(activeLineIdx === i, fl, isEvicted)}>
                <td style={S.td}>{i}</td>
                <td style={{ ...S.td, color: line.valid ? '#51cf66' : '#495057' }}>
                  {line.valid ? '1' : '0'}
                </td>
                <td style={{ ...S.td, color: '#f06595' }}>
                  {line.valid ? line.tag.toString(16).toUpperCase() : '—'}
                </td>
                {line.data.map((b, di) => (
                  <td key={di} style={{ ...S.td, color: line.valid ? '#e9ecef' : '#495057' }}>
                    {line.valid ? toHex2(b) : '--'}
                  </td>
                ))}
                <td style={S.td}>
                  {line.valid ? (
                    <span style={S.lruBadge(line.lruOrder)}>
                      {line.lruOrder === 0 ? 'MRU' : line.lruOrder === NUM_LINES - 1 ? 'LRU' : line.lruOrder}
                    </span>
                  ) : '—'}
                </td>
                <td style={S.td}>
                  {isEvicted && <span style={{ color: '#ffd43b', fontSize: 11 }}>⟵ EVICTED</span>}
                  {!isEvicted && activeLineIdx === i && fl && (
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
        <span>Hit Rate: <span style={S.statVal('#4dabf7')}>{hitRate}{accesses > 0 ? '%' : ''}</span></span>
      </div>
    </div>
  );
}

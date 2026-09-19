'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────
type MachineType = 'mealy' | 'moore';
type Bit = 0 | 1;

type Transition = { to: string; output: Bit };
type FSMDef = {
  states: string[];
  initial: string;
  /** Moore only: output associated with each state. */
  stateOutput?: Record<string, Bit>;
  delta: Record<string, Record<'0' | '1', Transition>>;
  positions: Record<string, { x: number; y: number }>;
};

type HistoryEntry = { step: number; input: Bit; from: string; to: string; output: Bit };

// ── FSM definitions: overlapping "101" sequence detector ────────────────────
const MEALY_101: FSMDef = {
  states: ['S0', 'S1', 'S2'],
  initial: 'S0',
  delta: {
    S0: { '0': { to: 'S0', output: 0 }, '1': { to: 'S1', output: 0 } },
    S1: { '0': { to: 'S2', output: 0 }, '1': { to: 'S1', output: 0 } },
    S2: { '0': { to: 'S0', output: 0 }, '1': { to: 'S1', output: 1 } },
  },
  positions: {
    S0: { x: 100, y: 150 },
    S1: { x: 300, y: 60 },
    S2: { x: 300, y: 240 },
  },
};

const MOORE_101: FSMDef = {
  states: ['S0', 'S1', 'S2', 'S3'],
  initial: 'S0',
  stateOutput: { S0: 0, S1: 0, S2: 0, S3: 1 },
  delta: {
    S0: { '0': { to: 'S0', output: 0 }, '1': { to: 'S1', output: 0 } },
    S1: { '0': { to: 'S2', output: 0 }, '1': { to: 'S1', output: 0 } },
    S2: { '0': { to: 'S0', output: 0 }, '1': { to: 'S3', output: 0 } },
    S3: { '0': { to: 'S2', output: 1 }, '1': { to: 'S1', output: 1 } },
  },
  positions: {
    S0: { x: 80, y: 150 },
    S1: { x: 240, y: 60 },
    S2: { x: 240, y: 240 },
    S3: { x: 400, y: 150 },
  },
};

const FSMS: Record<MachineType, FSMDef> = { mealy: MEALY_101, moore: MOORE_101 };

// ── Geometry helpers ──────────────────────────────────────────────────────
const NODE_R = 28;

function edgeCurve(
  from: { x: number; y: number },
  to: { x: number; y: number },
  bend: number,
): { path: string; mid: { x: number; y: number } } {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const cx = mx + nx * bend;
  const cy = my + ny * bend;
  return { path: `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`, mid: { x: cx, y: cy } };
}

function selfLoopPath(pos: { x: number; y: number }): { path: string; label: { x: number; y: number } } {
  const x = pos.x;
  const y = pos.y - NODE_R;
  return {
    path: `M ${x - 14} ${y} C ${x - 26} ${y - 38}, ${x + 26} ${y - 38}, ${x + 14} ${y}`,
    label: { x, y: y - 34 },
  };
}

// ── Styles ────────────────────────────────────────────────────────────────
const S = {
  root: {
    background: '#1a1a2e',
    borderRadius: 12,
    color: '#e9ecef',
    fontFamily: 'ui-monospace, "Cascadia Code", monospace',
    fontSize: 14,
    maxWidth: 720,
    padding: 28,
    width: '100%',
  } as React.CSSProperties,
  title: { color: '#4dabf7', fontSize: 18, fontWeight: 700, marginBottom: 8, letterSpacing: 0.5 } as React.CSSProperties,
  desc: { color: '#868e96', fontSize: 12, lineHeight: 1.6, marginBottom: 18 } as React.CSSProperties,
  row: { alignItems: 'center', display: 'flex', gap: 12, marginBottom: 14, flexWrap: 'wrap' } as React.CSSProperties,
  label: { color: '#868e96', fontSize: 13, minWidth: 90 } as React.CSSProperties,
  select: {
    background: '#23232e', border: '1px solid #495057', borderRadius: 6, color: '#e9ecef',
    cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, padding: '6px 12px',
  } as React.CSSProperties,
  btn: {
    background: '#4dabf7', border: 'none', borderRadius: 6, color: '#1a1a2e',
    cursor: 'pointer', fontSize: 13, fontWeight: 700, padding: '7px 18px',
  } as React.CSSProperties,
  btnGhost: {
    background: '#23232e', border: '1px solid #495057', borderRadius: 6, color: '#e9ecef',
    cursor: 'pointer', fontSize: 13, fontWeight: 700, padding: '7px 18px',
  } as React.CSSProperties,
  input: {
    background: '#23232e', border: '1px solid #495057', borderRadius: 6, color: '#e9ecef',
    fontFamily: 'inherit', fontSize: 13, padding: '6px 10px', width: 200,
  } as React.CSSProperties,
  svgWrap: { background: '#12121f', borderRadius: 8, marginBottom: 14, overflow: 'hidden' } as React.CSSProperties,
  divider: { borderColor: '#2c2c3e', borderStyle: 'solid', borderWidth: '0 0 1px 0', margin: '16px 0' } as React.CSSProperties,
  flagPill: (active: boolean, color: string): React.CSSProperties => ({
    background: active ? color + '33' : '#23232e',
    border: `1px solid ${active ? color : '#495057'}`,
    borderRadius: 20, color: active ? color : '#495057', display: 'inline-block',
    fontSize: 12, fontWeight: 700, marginRight: 8, padding: '3px 10px',
  }),
  logWrap: {
    background: '#12121f', borderRadius: 8, fontSize: 12, maxHeight: 140,
    overflowY: 'auto', padding: '10px 14px',
  } as React.CSSProperties,
  logRow: { color: '#868e96', padding: '2px 0' } as React.CSSProperties,
  logHighlight: { color: '#51cf66', fontWeight: 700 } as React.CSSProperties,
};

// ── Component ─────────────────────────────────────────────────────────────
type Props = { description?: string };

export function SimFSM({ description }: Props) {
  const [machine, setMachine] = useState<MachineType>('mealy');
  const fsm = FSMS[machine];

  const [current, setCurrent] = useState(fsm.initial);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [sequence, setSequence] = useState('101101011');
  const [running, setRunning] = useState(false);
  const [lastOutput, setLastOutput] = useState<Bit | null>(null);
  const [flashEdge, setFlashEdge] = useState<string | null>(null);
  const runTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const reset = useCallback(() => {
    setCurrent(fsm.initial);
    setHistory([]);
    setLastOutput(null);
    setFlashEdge(null);
    setRunning(false);
    if (runTimer.current) { clearInterval(runTimer.current); runTimer.current = null; }
  }, [fsm.initial]);

  // Reset whenever the machine type changes
  useEffect(() => { reset(); }, [machine, reset]);

  const feedBit = useCallback((bit: Bit, fromState?: string) => {
    const from = fromState ?? current;
    const t = fsm.delta[from][String(bit) as '0' | '1'];
    const output = machine === 'moore' ? (fsm.stateOutput?.[t.to] ?? 0) : t.output;
    setCurrent(t.to);
    setLastOutput(output);
    setFlashEdge(`${from}-${bit}`);
    setHistory((h) => [...h, { step: h.length + 1, input: bit, from, to: t.to, output }]);
    return t.to;
  }, [current, fsm, machine]);

  const runSequence = useCallback(() => {
    const bits = sequence.trim().split('').filter((c) => c === '0' || c === '1').map(Number) as Bit[];
    if (bits.length === 0) return;
    reset();
    setRunning(true);
    let i = 0;
    let state = fsm.initial;
    runTimer.current = setInterval(() => {
      if (i >= bits.length) {
        if (runTimer.current) clearInterval(runTimer.current);
        setRunning(false);
        return;
      }
      state = feedBit(bits[i], state);
      i++;
    }, 550);
  }, [sequence, fsm.initial, feedBit, reset]);

  useEffect(() => () => { if (runTimer.current) clearInterval(runTimer.current); }, []);

  const detections = history.filter((h) => h.output === 1).length;

  return (
    <div style={S.root}>
      <div style={S.title}>Finite State Machine — &quot;101&quot; Sequence Detector</div>
      {description && <div style={S.desc}>{description}</div>}

      {/* Machine select */}
      <div style={S.row}>
        <span style={S.label}>Machine type:</span>
        <select
          style={S.select}
          value={machine}
          onChange={(e) => setMachine(e.target.value as MachineType)}
          disabled={running}
        >
          <option value="mealy">Mealy (output on transition, 3 states)</option>
          <option value="moore">Moore (output on state, 4 states)</option>
        </select>
      </div>

      {/* State diagram */}
      <div style={S.svgWrap}>
        <svg viewBox="0 0 480 300" width="100%" height="260">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#495057" />
            </marker>
            <marker id="arrowActive" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#51cf66" />
            </marker>
          </defs>

          {/* start arrow into initial state */}
          {(() => {
            const p = fsm.positions[fsm.initial];
            return (
              <g>
                <line x1={p.x - 70} y1={p.y} x2={p.x - NODE_R - 4} y2={p.y} stroke="#495057" strokeWidth={1.5} markerEnd="url(#arrow)" />
                <text x={p.x - 68} y={p.y - 8} fill="#868e96" fontSize={10}>start</text>
              </g>
            );
          })()}

          {/* transitions */}
          {fsm.states.flatMap((s) => (['0', '1'] as const).map((bit) => {
            const t = fsm.delta[s][bit];
            const key = `${s}-${bit}`;
            const active = flashEdge === key;
            const label = machine === 'moore' ? bit : `${bit}/${t.output}`;
            const stroke = active ? '#51cf66' : '#495057';
            const marker = active ? 'url(#arrowActive)' : 'url(#arrow)';

            if (t.to === s) {
              const { path, label: lp } = selfLoopPath(fsm.positions[s]);
              return (
                <g key={key}>
                  <path d={path} fill="none" stroke={stroke} strokeWidth={active ? 2.5 : 1.5} markerEnd={marker} />
                  <text x={lp.x} y={lp.y} fill={active ? '#51cf66' : '#868e96'} fontSize={11} textAnchor="middle">{label}</text>
                </g>
              );
            }

            // curve two opposite-direction edges between the same pair apart so they don't overlap
            const reverseExists = fsm.delta[t.to] && Object.entries(fsm.delta[t.to]).some(([, rt]) => rt.to === s);
            const bend = reverseExists ? (s < t.to ? 26 : -26) : 0;
            const { path, mid } = edgeCurve(fsm.positions[s], fsm.positions[t.to], bend);
            return (
              <g key={key}>
                <path d={path} fill="none" stroke={stroke} strokeWidth={active ? 2.5 : 1.5} markerEnd={marker} />
                <text x={mid.x} y={mid.y - 6} fill={active ? '#51cf66' : '#868e96'} fontSize={11} textAnchor="middle">{label}</text>
              </g>
            );
          }))}

          {/* state nodes */}
          {fsm.states.map((s) => {
            const p = fsm.positions[s];
            const isCurrent = s === current;
            const out = machine === 'moore' ? fsm.stateOutput?.[s] : undefined;
            return (
              <g key={s}>
                <circle
                  cx={p.x} cy={p.y} r={NODE_R}
                  fill={isCurrent ? '#2b4d38' : '#23232e'}
                  stroke={isCurrent ? '#51cf66' : '#495057'}
                  strokeWidth={isCurrent ? 3 : 1.5}
                />
                {out === 1 && <circle cx={p.x} cy={p.y} r={NODE_R - 6} fill="none" stroke="#51cf66" strokeWidth={1.5} />}
                <text x={p.x} y={p.y + 4} fill={isCurrent ? '#51cf66' : '#e9ecef'} fontSize={13} fontWeight={700} textAnchor="middle">{s}</text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Manual bit feed */}
      <div style={S.row}>
        <span style={S.label}>Feed bit:</span>
        <button style={S.btn} onClick={() => feedBit(0)} disabled={running}>0</button>
        <button style={S.btn} onClick={() => feedBit(1)} disabled={running}>1</button>
        <button style={S.btnGhost} onClick={reset} disabled={running}>Reset</button>
      </div>

      {/* Sequence run */}
      <div style={S.row}>
        <span style={S.label}>Bit sequence:</span>
        <input
          style={S.input}
          value={sequence}
          onChange={(e) => setSequence(e.target.value.replace(/[^01]/g, ''))}
          disabled={running}
          placeholder="e.g. 101101011"
        />
        <button style={S.btn} onClick={runSequence} disabled={running || sequence.length === 0}>
          {running ? 'Running…' : 'Run'}
        </button>
      </div>

      <div style={S.divider} />

      {/* Status */}
      <div style={S.row}>
        <span style={S.label}>Current state:</span>
        <span style={S.flagPill(true, '#4dabf7')}>{current}</span>
        <span style={S.label}>Output:</span>
        <span style={S.flagPill(lastOutput === 1, '#51cf66')}>Y={lastOutput ?? '—'}</span>
        <span style={S.label}>Detections:</span>
        <span style={S.flagPill(detections > 0, '#ffa94d')}>{detections}</span>
      </div>

      {/* History log */}
      <div style={S.logWrap}>
        {history.length === 0 && <div style={S.logRow}>No input fed yet.</div>}
        {history.map((h) => (
          <div key={h.step} style={S.logRow}>
            step {h.step}: {h.from} --{h.input}/{h.output}--&gt; {h.to}
            {h.output === 1 && <span style={S.logHighlight}> ← &quot;101&quot; detected</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

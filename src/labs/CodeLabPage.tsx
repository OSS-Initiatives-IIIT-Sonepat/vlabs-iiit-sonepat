'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { type LabContent } from '@/labs/lab-content.types';
import { CPU8085, assemble } from '@/labs/emulator';
import type { CPU8085State, AssemblerResult } from '@/labs/emulator';

// ── Types ─────────────────────────────────────────────────────────────────────

type Props = { content: LabContent };

// ── Helpers ───────────────────────────────────────────────────────────────────

function hex2(n: number): string {
  return n.toString(16).toUpperCase().padStart(2, '0');
}
function hex4(n: number): string {
  return n.toString(16).toUpperCase().padStart(4, '0');
}

function getStarterCode(content: LabContent): string {
  for (const sec of content.sections) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((sec as any).type === 'code-lab') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (sec as any).starterCode ?? '';
    }
  }
  return '; Write your 8085 assembly here\n        ORG 8000H\nSTART:\n        HLT\n';
}

// ── Styles (inline) ───────────────────────────────────────────────────────────

const styles = {
  root: {
    display: 'flex',
    height: '100vh',
    background: '#0d1117',
    color: '#e6edf3',
    fontFamily: '"Segoe UI", system-ui, sans-serif',
    overflow: 'hidden',
  } as React.CSSProperties,

  sidebar: {
    width: '200px',
    minWidth: '200px',
    background: '#161b22',
    borderRight: '1px solid #30363d',
    overflowY: 'auto' as const,
    padding: '16px 0',
  } as React.CSSProperties,

  sidebarTitle: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#7d8590',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    padding: '0 16px 8px',
  } as React.CSSProperties,

  sidebarItem: (active: boolean): React.CSSProperties => ({
    padding: '6px 16px',
    fontSize: '13px',
    cursor: 'pointer',
    borderLeft: active ? '2px solid #58a6ff' : '2px solid transparent',
    background: active ? '#21262d' : 'transparent',
    color: active ? '#e6edf3' : '#7d8590',
    userSelect: 'none',
  }),

  center: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
  } as React.CSSProperties,

  editorHeader: {
    padding: '8px 12px',
    background: '#161b22',
    borderBottom: '1px solid #30363d',
    fontSize: '12px',
    color: '#7d8590',
  } as React.CSSProperties,

  editorArea: {
    flex: 1,
    position: 'relative' as const,
    display: 'flex',
    overflow: 'hidden',
    background: '#1e1e1e',
  } as React.CSSProperties,

  lineNumbers: {
    width: '48px',
    minWidth: '48px',
    background: '#1e1e1e',
    borderRight: '1px solid #30363d',
    padding: '12px 0',
    overflowY: 'hidden' as const,
    color: '#4a5568',
    fontSize: '13px',
    lineHeight: '20px',
    fontFamily: '"Cascadia Code", "Fira Code", Consolas, monospace',
    textAlign: 'right' as const,
    userSelect: 'none' as const,
    paddingRight: '8px',
  } as React.CSSProperties,

  textarea: {
    flex: 1,
    background: 'transparent',
    color: '#d4d4d4',
    fontSize: '13px',
    lineHeight: '20px',
    fontFamily: '"Cascadia Code", "Fira Code", Consolas, monospace',
    padding: '12px',
    border: 'none',
    outline: 'none',
    resize: 'none' as const,
    overflowY: 'auto' as const,
    tabSize: 8,
    spellCheck: false,
    whiteSpace: 'pre' as const,
  } as React.CSSProperties,

  toolbar: {
    padding: '8px 12px',
    background: '#161b22',
    borderTop: '1px solid #30363d',
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  } as React.CSSProperties,

  btn: (color: string): React.CSSProperties => ({
    padding: '5px 14px',
    fontSize: '12px',
    fontWeight: 600,
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    background: color,
    color: '#fff',
    letterSpacing: '0.02em',
  }),

  output: {
    height: '160px',
    background: '#0d1117',
    borderTop: '1px solid #30363d',
    overflowY: 'auto' as const,
    padding: '8px 12px',
    fontFamily: '"Cascadia Code", "Fira Code", Consolas, monospace',
    fontSize: '12px',
    color: '#a8b5c4',
    lineHeight: '18px',
  } as React.CSSProperties,

  errorBanner: {
    background: '#3d1519',
    borderTop: '1px solid #f85149',
    padding: '8px 12px',
    color: '#f85149',
    fontSize: '12px',
    fontFamily: '"Cascadia Code", "Fira Code", Consolas, monospace',
  } as React.CSSProperties,

  rightPanel: {
    width: '220px',
    minWidth: '220px',
    background: '#161b22',
    borderLeft: '1px solid #30363d',
    overflowY: 'auto' as const,
    padding: '12px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  } as React.CSSProperties,

  panelTitle: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#7d8590',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    marginBottom: '6px',
  } as React.CSSProperties,

  regRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4px',
  } as React.CSSProperties,

  regLabel: {
    fontSize: '11px',
    color: '#7d8590',
    fontFamily: 'monospace',
    minWidth: '24px',
  } as React.CSSProperties,

  regValue: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#4ec9b0',
    fontFamily: '"Cascadia Code", "Fira Code", Consolas, monospace',
    background: '#21262d',
    padding: '2px 6px',
    borderRadius: '4px',
    minWidth: '38px',
    textAlign: 'center' as const,
  } as React.CSSProperties,

  flagPill: (active: boolean): React.CSSProperties => ({
    display: 'inline-block',
    padding: '1px 6px',
    borderRadius: '10px',
    fontSize: '11px',
    fontWeight: 700,
    fontFamily: 'monospace',
    background: active ? '#1a4731' : '#21262d',
    color: active ? '#3fb950' : '#484f58',
    border: active ? '1px solid #238636' : '1px solid #30363d',
  }),

  memRow: {
    fontSize: '11px',
    fontFamily: '"Cascadia Code", "Fira Code", Consolas, monospace',
    color: '#a8b5c4',
    lineHeight: '18px',
  } as React.CSSProperties,
};

// ── Component ─────────────────────────────────────────────────────────────────

export function CodeLabPage({ content }: Props) {
  const [code, setCode] = useState(() => getStarterCode(content));
  const [activeSection, setActiveSection] = useState('theory');
  const [cpuState, setCpuState] = useState<CPU8085State | null>(null);
  const [outputLines, setOutputLines] = useState<string[]>(['Ready. Press Run or Step.']);
  const [errorLines, setErrorLines] = useState<string[]>([]);
  const [assembled, setAssembled] = useState<AssemblerResult | null>(null);

  const cpuRef = useRef<CPU8085>(new CPU8085());
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumRef = useRef<HTMLDivElement>(null);

  // Sync scroll between textarea and line numbers
  const handleScroll = useCallback(() => {
    if (textareaRef.current && lineNumRef.current) {
      lineNumRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, []);

  // Count lines for gutter
  const lineCount = code.split('\n').length;

  // ── Run handler ─────────────────────────────────────────────────────────────

  const handleRun = useCallback(() => {
    const result = assemble(code);
    setAssembled(result);
    if (result.errors.length > 0) {
      setErrorLines(result.errors.map(e => `Line ${e.line}: ${e.message}`));
      setOutputLines([`Assembly failed — ${result.errors.length} error(s).`]);
      return;
    }
    setErrorLines([]);

    const cpu = new CPU8085();
    cpuRef.current = cpu;
    cpu.loadProgram(result.bytes, result.origin);

    // Load memory init from content
    for (const sec of content.sections) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const s = sec as any;
      if (s.type === 'code-lab' && s.memoryInit) {
        for (const [addrStr, val] of Object.entries(s.memoryInit)) {
          const addr = parseInt(addrStr, 16);
          cpu.writeMem(addr, val as number);
        }
      }
    }

    const steps = cpu.run(200000);
    const state = cpu.getState();
    setCpuState(state);

    const log: string[] = [
      `Assembled OK — ${result.bytes.length} byte(s) at ${hex4(result.origin)}H`,
      `Executed ${steps.length} step(s)`,
    ];

    if (steps.length > 0) {
      const last = steps[steps.length - 1];
      log.push(`Last: ${last.instruction} @ ${hex4(last.address)}H`);
    }

    log.push(`A=${hex2(state.A)}H  B=${hex2(state.B)}H  C=${hex2(state.C)}H  D=${hex2(state.D)}H`);
    log.push(`E=${hex2(state.E)}H  H=${hex2(state.H)}H  L=${hex2(state.L)}H  SP=${hex4(state.SP)}H`);
    log.push(`Flags: S=${state.flags.S?1:0} Z=${state.flags.Z?1:0} AC=${state.flags.AC?1:0} P=${state.flags.P?1:0} CY=${state.flags.CY?1:0}`);

    setOutputLines(log);
  }, [code, content.sections]);

  // ── Step handler ─────────────────────────────────────────────────────────────

  const handleStep = useCallback(() => {
    let cpu = cpuRef.current;

    // Assemble if first step or no assembled result
    if (!assembled) {
      const result = assemble(code);
      setAssembled(result);
      if (result.errors.length > 0) {
        setErrorLines(result.errors.map(e => `Line ${e.line}: ${e.message}`));
        return;
      }
      setErrorLines([]);
      cpu = new CPU8085();
      cpuRef.current = cpu;
      cpu.loadProgram(result.bytes, result.origin);

      for (const sec of content.sections) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const s = sec as any;
        if (s.type === 'code-lab' && s.memoryInit) {
          for (const [addrStr, val] of Object.entries(s.memoryInit)) {
            const addr = parseInt(addrStr, 16);
            cpu.writeMem(addr, val as number);
          }
        }
      }
    }

    if (cpu.getState().halted) {
      setOutputLines(prev => [...prev, 'CPU is halted. Press Reset to start over.']);
      return;
    }

    const result = cpu.step();
    const state = cpu.getState();
    setCpuState(state);

    if (result) {
      setOutputLines(prev => [
        ...prev.slice(-50),
        `${hex4(result.address)}H: ${result.instruction}  [${result.changed.join(',')}]`,
      ]);
    }
  }, [assembled, code, content.sections]);

  // ── Reset handler ────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    setCode(getStarterCode(content));
    setAssembled(null);
    setCpuState(null);
    setOutputLines(['Reset. Press Run or Step.']);
    setErrorLines([]);
    cpuRef.current = new CPU8085();
  }, [content]);

  // ── Sidebar sections ──────────────────────────────────────────────────────────

  const sidebarSections = content.sections.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (s) => (s as any).type !== 'code-lab',
  );

  const activeTheory = content.sections.find(s => s.id === activeSection);

  // Memory view around PC
  const memView: string[] = [];
  if (cpuState) {
    const pc = cpuState.PC;
    const base = Math.max(0, pc - 4) & 0xFFF8; // align to 8
    for (let row = 0; row < 3; row++) {
      const rowAddr = base + row * 8;
      const hexBytes = Array.from({ length: 8 }, (_, i) => {
        const a = rowAddr + i;
        return hex2(cpuState.memory[a] ?? 0);
      }).join(' ');
      memView.push(`${hex4(rowAddr)}: ${hexBytes}`);
    }
  }

  return (
    <div style={styles.root}>
      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarTitle}>{content.title}</div>
        {sidebarSections.map(sec => (
          <div
            key={sec.id}
            style={styles.sidebarItem(activeSection === sec.id)}
            onClick={() => setActiveSection(sec.id)}
          >
            {sec.title}
          </div>
        ))}
        <div
          key="__program"
          style={styles.sidebarItem(activeSection === '__program')}
          onClick={() => setActiveSection('__program')}
        >
          Program
        </div>
      </div>

      {/* ── Center pane ──────────────────────────────────────────────────────── */}
      <div style={styles.center}>
        {activeSection !== '__program' && activeTheory ? (
          <SectionView section={activeTheory as any} />
        ) : (
          <>
            {/* Editor header */}
            <div style={styles.editorHeader}>
              8085 Assembly Editor
            </div>

            {/* Editor */}
            <div style={styles.editorArea}>
              {/* Line numbers */}
              <div ref={lineNumRef} style={styles.lineNumbers}>
                {Array.from({ length: lineCount }, (_, i) => (
                  <div key={i} style={{ paddingRight: '8px', height: '20px' }}>
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                style={styles.textarea}
                value={code}
                onChange={e => { setCode(e.target.value); setAssembled(null); }}
                onScroll={handleScroll}
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
              />
            </div>

            {/* Toolbar */}
            <div style={styles.toolbar}>
              <button style={styles.btn('#238636')} onClick={handleRun}>▶ Run</button>
              <button style={styles.btn('#1f6feb')} onClick={handleStep}>⏭ Step</button>
              <button style={styles.btn('#6e7681')} onClick={handleReset}>↺ Reset</button>
              {cpuState?.halted && (
                <span style={{ fontSize: '12px', color: '#f85149', marginLeft: '8px' }}>
                  HALTED
                </span>
              )}
              {cpuState && !cpuState.halted && (
                <span style={{ fontSize: '12px', color: '#3fb950', marginLeft: '8px' }}>
                  PC: {hex4(cpuState.PC)}H
                </span>
              )}
            </div>

            {/* Error banner */}
            {errorLines.length > 0 && (
              <div style={styles.errorBanner}>
                {errorLines.map((e, i) => <div key={i}>{e}</div>)}
              </div>
            )}

            {/* Output */}
            <div style={styles.output}>
              {outputLines.map((line, i) => (
                <div key={i} style={{ color: line.startsWith('Line') ? '#f85149' : '#a8b5c4' }}>
                  {'> '}{line}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Right panel ───────────────────────────────────────────────────────── */}
      <div style={styles.rightPanel}>
        {/* Registers */}
        <div>
          <div style={styles.panelTitle}>Registers</div>
          {(['A','B','C','D','E','H','L'] as const).map(r => (
            <div key={r} style={styles.regRow}>
              <span style={styles.regLabel}>{r}:</span>
              <span style={styles.regValue}>
                {cpuState ? hex2(cpuState[r]) : '--'}
              </span>
              <span style={{ ...styles.regLabel, marginLeft: '8px' }} />
            </div>
          ))}
          <div style={{ marginTop: '6px' }}>
            <div style={styles.regRow}>
              <span style={styles.regLabel}>PC:</span>
              <span style={{ ...styles.regValue, minWidth: '52px' }}>
                {cpuState ? hex4(cpuState.PC) : '----'}
              </span>
            </div>
            <div style={styles.regRow}>
              <span style={styles.regLabel}>SP:</span>
              <span style={{ ...styles.regValue, minWidth: '52px' }}>
                {cpuState ? hex4(cpuState.SP) : '----'}
              </span>
            </div>
          </div>
        </div>

        {/* Flags */}
        <div>
          <div style={styles.panelTitle}>Flags</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {(['S','Z','AC','P','CY'] as const).map(f => (
              <span key={f} style={styles.flagPill(cpuState ? cpuState.flags[f] : false)}>
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Memory view */}
        <div>
          <div style={styles.panelTitle}>Memory (hex)</div>
          {cpuState ? (
            memView.map((row, i) => (
              <div key={i} style={styles.memRow}>{row}</div>
            ))
          ) : (
            <div style={{ ...styles.memRow, color: '#484f58' }}>Run to see memory</div>
          )}
        </div>

        {/* Cycles */}
        {cpuState && (
          <div>
            <div style={styles.panelTitle}>Cycles</div>
            <div style={{ ...styles.regValue, display: 'inline-block' }}>
              {cpuState.cycles}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Section view ───────────────────────────────────────────────────────────────

function SectionView({ section }: { section: any }) {
  const s = section;
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px', maxWidth: '800px' }}>
      <h2 style={{ color: '#e6edf3', fontSize: '18px', marginBottom: '16px' }}>{s.title}</h2>

      {s.paragraphs?.map((p: string, i: number) => (
        <p key={i} style={{ color: '#a8b5c4', lineHeight: '1.7', marginBottom: '12px', fontSize: '14px' }}>
          {p}
        </p>
      ))}

      {s.table && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px', fontSize: '13px' }}>
          <thead>
            <tr>
              {s.table.headers.map((h: string, i: number) => (
                <th key={i} style={{ padding: '8px 12px', background: '#21262d', color: '#e6edf3', textAlign: 'left', border: '1px solid #30363d' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {s.table.rows.map((row: any[], ri: number) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: '6px 12px', color: '#a8b5c4', border: '1px solid #30363d' }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {s.items && (
        <ul style={{ paddingLeft: '20px', color: '#a8b5c4', fontSize: '14px', lineHeight: '1.8' }}>
          {s.items.map((item: any, i: number) => (
            <li key={i}>{item.name}{item.specification ? ` — ${item.specification}` : ''}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

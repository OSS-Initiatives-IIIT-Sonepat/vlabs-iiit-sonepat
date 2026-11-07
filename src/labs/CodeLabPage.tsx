"use client";

import { useCallback, useRef, useState } from "react";

import { type CodeLabSection } from "@/labs/lab-content.types";
import { CPU8085, assemble, entryAddress } from "@/labs/emulator";
import type { CPU8085State, AssemblerResult } from "@/labs/emulator";

type Props = { section: CodeLabSection };

function hex2(n: number): string {
  return n.toString(16).toUpperCase().padStart(2, "0");
}
function hex4(n: number): string {
  return n.toString(16).toUpperCase().padStart(4, "0");
}

function loadMemory(cpu: CPU8085, memoryInit: CodeLabSection["memoryInit"]) {
  if (!memoryInit) return;
  for (const [addrStr, val] of Object.entries(memoryInit)) {
    cpu.writeMem(parseInt(addrStr, 16), val);
  }
}

const PANEL =
  "bg-white rounded-[20px] border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]";

/**
 * The 8085 editor sits in the same lab page as every other experiment.
 * Registers and the listing use the white panels, not a separate dark shell.
 */
export function CodeWorkbench({ section }: Props) {
  const [code, setCode] = useState(section.starterCode);
  const [cpuState, setCpuState] = useState<CPU8085State | null>(null);
  const [outputLines, setOutputLines] = useState<string[]>([
    "Ready. Press Run or Step.",
  ]);
  const [errorLines, setErrorLines] = useState<string[]>([]);
  const [assembled, setAssembled] = useState<AssemblerResult | null>(null);

  const cpuRef = useRef<CPU8085>(new CPU8085());
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (textareaRef.current && lineNumRef.current) {
      lineNumRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, []);

  const lineCount = code.split("\n").length;

  const handleRun = useCallback(() => {
    const result = assemble(code);
    setAssembled(result);
    if (result.errors.length > 0) {
      setErrorLines(result.errors.map((e) => `Line ${e.line}: ${e.message}`));
      setOutputLines([`Assembly failed — ${result.errors.length} error(s).`]);
      return;
    }
    setErrorLines([]);

    const cpu = new CPU8085();
    cpuRef.current = cpu;
    cpu.loadProgram(result.bytes, result.origin);
    loadMemory(cpu, section.memoryInit);
    const entry = entryAddress(result);
    cpu.setState({ PC: entry });

    const steps = cpu.run(200000);
    const state = cpu.getState();
    setCpuState(state);

    const log = [
      `Assembled OK — ${result.bytes.length} byte(s), entry ${hex4(entry)}H`,
      `Executed ${steps.length} step(s)`,
    ];
    if (steps.length > 0) {
      const last = steps[steps.length - 1];
      log.push(`Last: ${last.instruction} @ ${hex4(last.address)}H`);
    }
    log.push(
      `A=${hex2(state.A)}H  B=${hex2(state.B)}H  C=${hex2(state.C)}H  D=${hex2(state.D)}H`,
    );
    log.push(
      `E=${hex2(state.E)}H  H=${hex2(state.H)}H  L=${hex2(state.L)}H  SP=${hex4(state.SP)}H`,
    );
    log.push(
      `Flags: S=${state.flags.S ? 1 : 0} Z=${state.flags.Z ? 1 : 0} AC=${state.flags.AC ? 1 : 0} P=${state.flags.P ? 1 : 0} CY=${state.flags.CY ? 1 : 0}`,
    );
    setOutputLines(log);
  }, [code, section.memoryInit]);

  const handleStep = useCallback(() => {
    let cpu = cpuRef.current;

    if (!assembled) {
      const result = assemble(code);
      setAssembled(result);
      if (result.errors.length > 0) {
        setErrorLines(result.errors.map((e) => `Line ${e.line}: ${e.message}`));
        return;
      }
      setErrorLines([]);
      cpu = new CPU8085();
      cpuRef.current = cpu;
      cpu.loadProgram(result.bytes, result.origin);
      loadMemory(cpu, section.memoryInit);
      cpu.setState({ PC: entryAddress(result) });
    }

    if (cpu.getState().halted) {
      setOutputLines((prev) => [
        ...prev,
        "CPU is halted. Press Reset to start over.",
      ]);
      return;
    }

    const result = cpu.step();
    const state = cpu.getState();
    setCpuState(state);
    if (result) {
      setOutputLines((prev) => [
        ...prev.slice(-50),
        `${hex4(result.address)}H: ${result.instruction}  [${result.changed.join(", ")}]`,
      ]);
    }
  }, [assembled, code, section.memoryInit]);

  const handleReset = useCallback(() => {
    setCode(section.starterCode);
    setAssembled(null);
    setCpuState(null);
    setOutputLines(["Reset. Press Run or Step."]);
    setErrorLines([]);
    cpuRef.current = new CPU8085();
  }, [section.starterCode]);

  const memView: string[] = [];
  const dataView: string[] = [];
  if (cpuState) {
    const base = Math.max(0, cpuState.PC - 4) & 0xfff8;
    for (let row = 0; row < 3; row++) {
      const rowAddr = base + row * 8;
      const hexBytes = Array.from({ length: 8 }, (_, i) =>
        hex2(cpuState.memory[rowAddr + i] ?? 0),
      ).join(" ");
      memView.push(`${hex4(rowAddr)}: ${hexBytes}`);
    }
    for (let row = 0; row < 5; row++) {
      const rowAddr = 0x8000 + row * 8;
      const hexBytes = Array.from({ length: 8 }, (_, i) =>
        hex2(cpuState.memory[rowAddr + i] ?? 0),
      ).join(" ");
      dataView.push(`${hex4(rowAddr)}: ${hexBytes}`);
    }
  }

  return (
    <div className="flex h-full min-h-0 gap-3">
      <div className={`${PANEL} flex min-w-0 flex-1 flex-col overflow-hidden`}>
        <div className="shrink-0 px-5 pt-4 pb-3">
          <p className="m-0 font-sans text-[13.5px] leading-[1.7] text-[var(--ink)]">
            {section.description}
          </p>
          {section.expectedOutputs && (
            <p className="m-0 mt-1 font-sans text-[12.5px] leading-[1.6] text-[var(--ink-muted)]">
              {section.expectedOutputs}
            </p>
          )}
        </div>

        <div className="flex min-h-0 flex-1 border-t border-black/[0.06] bg-[#fafafa]">
          <div
            ref={lineNumRef}
            className="w-12 shrink-0 overflow-hidden border-r border-black/[0.06] py-3 pr-2 text-right font-mono text-[13px] leading-5 text-[var(--ink-subtle)] select-none"
          >
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i} className="h-5">
                {i + 1}
              </div>
            ))}
          </div>
          <textarea
            ref={textareaRef}
            className="min-w-0 flex-1 resize-none border-none bg-transparent py-3 pr-3 pl-3 font-mono text-[13px] leading-5 text-[var(--ink)] outline-none"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setAssembled(null);
            }}
            onScroll={handleScroll}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
          />
        </div>

        <div className="flex shrink-0 items-center gap-2 border-t border-black/[0.06] px-3 py-2">
          <button
            type="button"
            onClick={handleRun}
            className="h-8 cursor-pointer rounded-full border-none bg-[var(--color-blue)] px-4 font-sans text-[13px] font-medium text-white"
          >
            Run
          </button>
          <button
            type="button"
            onClick={handleStep}
            className="h-8 cursor-pointer rounded-full border border-black/[0.1] bg-white px-4 font-sans text-[13px] font-medium text-[var(--ink)]"
          >
            Step
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="h-8 cursor-pointer rounded-full border border-black/[0.1] bg-white px-4 font-sans text-[13px] font-medium text-[var(--ink)]"
          >
            Reset
          </button>
          {cpuState?.halted && (
            <span className="ml-1 font-sans text-[12px] font-medium text-[#b42318]">
              Halted
            </span>
          )}
          {cpuState && !cpuState.halted && (
            <span className="ml-1 font-mono text-[12px] text-[var(--ink-muted)]">
              PC {hex4(cpuState.PC)}H
            </span>
          )}
        </div>

        {errorLines.length > 0 && (
          <div className="shrink-0 border-t border-[#f3c3bd] bg-[#fff5f5] px-4 py-2 font-mono text-[12px] leading-5 text-[#b42318]">
            {errorLines.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        )}

        <div className="h-[132px] shrink-0 overflow-y-auto border-t border-black/[0.06] bg-[#f7f7f8] px-4 py-2 font-mono text-[12px] leading-5 text-[var(--ink-muted)]">
          {outputLines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      </div>

      <aside
        className={`${PANEL} flex w-[232px] shrink-0 flex-col gap-4 overflow-y-auto p-4`}
      >
        <RegisterBlock state={cpuState} />
        <div>
          <p className="m-0 mb-2 font-sans text-[11px] font-medium tracking-[0.04em] text-[var(--ink-muted)] uppercase">
            Flags
          </p>
          <div className="flex flex-wrap gap-1.5">
            {(["S", "Z", "AC", "P", "CY"] as const).map((flag) => {
              const on = cpuState ? cpuState.flags[flag] : false;
              return (
                <span
                  key={flag}
                  className={`rounded-full px-2 py-0.5 font-mono text-[11px] font-medium ${
                    on
                      ? "bg-[var(--color-blue-10)] text-[var(--color-blue)]"
                      : "bg-black/[0.04] text-[var(--ink-subtle)]"
                  }`}
                >
                  {flag}
                </span>
              );
            })}
          </div>
        </div>
        <MemoryBlock
          title="Around PC"
          rows={memView}
          empty="Run to see memory"
        />
        <MemoryBlock
          title="Data at 8000H"
          rows={dataView}
          empty="Results land here"
        />
        {cpuState && (
          <div>
            <p className="m-0 mb-2 font-sans text-[11px] font-medium tracking-[0.04em] text-[var(--ink-muted)] uppercase">
              Cycles
            </p>
            <span className="inline-block rounded-md bg-[#f7f7f8] px-2 py-0.5 font-mono text-[13px] font-medium text-[var(--ink)]">
              {cpuState.cycles}
            </span>
          </div>
        )}
      </aside>
    </div>
  );
}

function RegisterBlock({ state }: { state: CPU8085State | null }) {
  return (
    <div>
      <p className="m-0 mb-2 font-sans text-[11px] font-medium tracking-[0.04em] text-[var(--ink-muted)] uppercase">
        Registers
      </p>
      {(["A", "B", "C", "D", "E", "H", "L"] as const).map((name) => (
        <div key={name} className="mb-1 flex items-center justify-between">
          <span className="font-sans text-[12px] text-[var(--ink-muted)]">
            {name}
          </span>
          <span className="min-w-10 rounded-md bg-[#f7f7f8] px-1.5 py-0.5 text-center font-mono text-[13px] font-medium text-[var(--ink)]">
            {state ? hex2(state[name]) : "--"}
          </span>
        </div>
      ))}
      <div className="mt-2">
        {(["PC", "SP"] as const).map((name) => (
          <div key={name} className="mb-1 flex items-center justify-between">
            <span className="font-sans text-[12px] text-[var(--ink-muted)]">
              {name}
            </span>
            <span className="min-w-14 rounded-md bg-[#f7f7f8] px-1.5 py-0.5 text-center font-mono text-[13px] font-medium text-[var(--ink)]">
              {state ? hex4(state[name]) : "----"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MemoryBlock({
  title,
  rows,
  empty,
}: {
  title: string;
  rows: string[];
  empty: string;
}) {
  return (
    <div>
      <p className="m-0 mb-2 font-sans text-[11px] font-medium tracking-[0.04em] text-[var(--ink-muted)] uppercase">
        {title}
      </p>
      {rows.length > 0 ? (
        rows.map((row) => (
          <div
            key={row}
            className="font-mono text-[11px] leading-5 text-[var(--ink)]"
          >
            {row}
          </div>
        ))
      ) : (
        <div className="font-sans text-[12px] text-[var(--ink-subtle)]">
          {empty}
        </div>
      )}
    </div>
  );
}

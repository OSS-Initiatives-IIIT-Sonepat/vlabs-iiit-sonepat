"use client";

import { useState, type ReactNode } from "react";

// ── Inline SVG icons (tiny, VS Code-style wireframe) ─────────────────────

function FolderClosed({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function FolderOpen({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v1" />
      <path d="M5 12h16l-2 8H3l2-8z" />
    </svg>
  );
}

function FileIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function ChevronIcon({
  open,
  className,
}: {
  open: boolean;
  className?: string;
}) {
  return (
    <svg
      className={[
        "transition-transform duration-150",
        open ? "rotate-90" : "rotate-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

// ── Tree node types ──────────────────────────────────────────────────────

type FileNode = {
  name: string;
  annotation?: string;
  color?: string; // text color override
};

type FolderNode = {
  name: string;
  annotation?: string;
  defaultOpen?: boolean;
  children: TreeNode[];
};

type TreeNode =
  (FileNode & { type: "file" }) | (FolderNode & { type: "folder" });

// ── Folder component ─────────────────────────────────────────────────────

function Folder({ node, depth }: { node: FolderNode; depth: number }) {
  const [open, setOpen] = useState(node.defaultOpen ?? false);

  return (
    <div>
      <button
        className={[
          "flex items-center gap-[6px] w-full text-left py-[3px] border-none bg-transparent cursor-pointer",
          "text-[#e8e8e8] hover:bg-[rgba(255,255,255,0.06)] rounded-[3px]",
          "transition-[background-color] duration-100",
        ].join(" ")}
        style={{ paddingLeft: `${depth * 16}px` }}
        onClick={() => setOpen(!open)}
        type="button"
      >
        <ChevronIcon open={open} className="text-[#6b6a68] shrink-0" />
        {open ? (
          <FolderOpen className="text-[#feffb7] shrink-0" />
        ) : (
          <FolderClosed className="text-[#feffb7] shrink-0" />
        )}
        <span className="text-[#e8e8e8]">{node.name}</span>
        {node.annotation && (
          <span className="text-[#6b6a68] ml-2 text-[11px]">
            {node.annotation}
          </span>
        )}
      </button>
      {open && (
        <div>
          {node.children.map((child, i) =>
            child.type === "folder" ? (
              <Folder key={child.name + i} node={child} depth={depth + 1} />
            ) : (
              <File key={child.name + i} node={child} depth={depth + 1} />
            ),
          )}
        </div>
      )}
    </div>
  );
}

// ── File component ───────────────────────────────────────────────────────

function File({ node, depth }: { node: FileNode; depth: number }) {
  return (
    <div
      className="flex items-center gap-[6px] py-[3px]"
      style={{ paddingLeft: `${depth * 16 + 16}px` }}
    >
      <FileIcon
        className={node.color ? `text-[${node.color}]` : "text-[#89fc9a]"}
      />
      <span className={node.color ? `text-[${node.color}]` : "text-[#89fc9a]"}>
        {node.name}
      </span>
      {node.annotation && (
        <span className="text-[#6b6a68] ml-2 text-[11px]">
          {node.annotation}
        </span>
      )}
    </div>
  );
}

// ── Tree data ────────────────────────────────────────────────────────────

const TREE: TreeNode[] = [
  {
    type: "folder",
    name: "semester-01/",
    defaultOpen: true,
    children: [
      {
        type: "folder",
        name: "01-analog-electronics/",
        defaultOpen: true,
        children: [
          {
            type: "folder",
            name: "half-wave-rectifier/",
            defaultOpen: true,
            children: [
              {
                type: "file",
                name: "01-aim.ts",
                annotation: "what the experiment teaches",
              },
              {
                type: "file",
                name: "02-theory.ts",
                annotation: "background concepts",
              },
              {
                type: "file",
                name: "03-apparatus.ts",
                annotation: "components list",
              },
              {
                type: "folder",
                name: "04-procedure/",
                annotation: "step-by-step wiring",
                defaultOpen: true,
                children: [
                  { type: "file", name: "01-breadboard.ts" },
                  { type: "file", name: "02-place-ac-source.ts" },
                  { type: "file", name: "03-place-diode.ts" },
                  { type: "file", name: "04-wire-source-diode.ts" },
                  { type: "file", name: "..." },
                  { type: "file", name: "index.ts" },
                ],
              },
              {
                type: "file",
                name: "05-observations.ts",
                annotation: "expected results",
              },
              { type: "file", name: "06-conclusion.ts", annotation: "summary" },
              {
                type: "file",
                name: "components.ts",
                annotation: "circuit layout on the board",
                color: "#ed87fc",
              },
              {
                type: "file",
                name: "index.ts",
                annotation: "ExperimentDefinition",
                color: "#ed87fc",
              },
            ],
          },
          { type: "folder", name: "full-wave-rectifier/", children: [] },
          { type: "folder", name: "ohms-law/", children: [] },
          { type: "folder", name: "pn-junction-diode/", children: [] },
          { type: "folder", name: "...", children: [] },
        ],
      },
      { type: "folder", name: "02-computer-application/", children: [] },
      { type: "folder", name: "03-analog-electronics-advanced/", children: [] },
    ],
  },
  { type: "folder", name: "semester-02/", children: [] },
  { type: "folder", name: "semester-03/", children: [] },
  { type: "folder", name: "semester-04/", children: [] },
];

// ── Exported component ───────────────────────────────────────────────────

export function FolderTree() {
  return (
    <div
      className={[
        "bg-[#1c1c1c] rounded-[calc(var(--radius-base)*2)]",
        "p-[calc(var(--spacing-base)*4)] overflow-x-auto w-full",
        "font-[family-name:var(--font-mono),monospace] text-[13px] leading-[1.5]",
        "border border-[rgba(255,255,255,0.06)]",
      ].join(" ")}
    >
      <div className="text-[#6b6a68] mb-[calc(var(--spacing-base)*2)] text-[11px] tracking-[0.08em] uppercase flex items-center gap-[6px]">
        <FolderOpen className="text-[#feffb7]" />
        src/labs/semesters/
      </div>
      {TREE.map((node, i) =>
        node.type === "folder" ? (
          <Folder key={node.name + i} node={node} depth={0} />
        ) : (
          <File key={node.name + i} node={node} depth={0} />
        ),
      )}
    </div>
  );
}

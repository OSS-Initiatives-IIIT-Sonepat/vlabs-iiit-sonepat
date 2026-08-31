'use client';

import katex from 'katex';

// ── Reusable KaTeX math renderer ──────────────────────────────────────────
//
// Usage in content strings:
//   Inline:  "The voltage $V_Z = 5.1\,\text{V}$ is constant"
//   Display: "$$I_Z = \frac{V_s - V_Z}{R_S}$$"
//   Bold:    "**important**"
//   Italic:  "*note*"
//   Newline: literal \n in the string
//
// Import: import { MathText } from '@/ui'

type Props = { text: string };

export function MathText({ text }: Props) {
  const nodes: React.ReactNode[] = [];

  // Single regex to split on $$..$$ and $..$
  const parts = text.split(/((?:\$\$[\s\S]*?\$\$|\$(?:[^$\n])+?\$))/g);

  parts.forEach((seg, i) => {
    if (!seg) return;

    if (seg.startsWith('$$') && seg.endsWith('$$') && seg.length > 4) {
      // Display math
      const expr = seg.slice(2, -2).trim();
      try {
        const html = katex.renderToString(expr, { displayMode: true, throwOnError: false });
        nodes.push(
          <span
            key={i}
            style={{ display: 'block', margin: '10px 0', overflowX: 'auto' }}
            dangerouslySetInnerHTML={{ __html: html }}
          />,
        );
      } catch {
        nodes.push(<span key={i}>{seg}</span>);
      }
      return;
    }

    if (seg.startsWith('$') && seg.endsWith('$') && seg.length > 2) {
      // Inline math
      const expr = seg.slice(1, -1);
      try {
        const html = katex.renderToString(expr, { displayMode: false, throwOnError: false });
        nodes.push(<span key={i} dangerouslySetInnerHTML={{ __html: html }} />);
      } catch {
        nodes.push(<span key={i}>{seg}</span>);
      }
      return;
    }

    // Plain text: handle **bold**, *italic*, and \n
    seg.split('\n').forEach((line, li, lines) => {
      if (li > 0) nodes.push(<br key={`${i}-br-${li}`} />);

      line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).forEach((chunk, ci) => {
        if (chunk.startsWith('**') && chunk.endsWith('**')) {
          nodes.push(<strong key={`${i}-${li}-${ci}`}>{chunk.slice(2, -2)}</strong>);
        } else if (chunk.startsWith('*') && chunk.endsWith('*') && chunk.length > 2) {
          nodes.push(<em key={`${i}-${li}-${ci}`}>{chunk.slice(1, -1)}</em>);
        } else {
          nodes.push(chunk);
        }
      });
    });
  });

  return <>{nodes}</>;
}

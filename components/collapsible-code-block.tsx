"use client";

import { useMemo, useState } from "react";
import { Check, ChevronDown, ChevronUp, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type CollapsibleCodeBlockProps = {
  className?: string;
  children: string;
};

const VISIBLE_LINES = 12;
const LINE_HEIGHT = 24;

const inferLanguageFromCode = (code: string) => {
  const sample = code.toLowerCase();
  const pythonSignals = [
    "import torch",
    "import torch.nn",
    "torch.",
    "nn.",
    "def ",
    "class ",
    "self.",
    "if __name__ == \"__main__\"",
    "if __name__ == '__main__'",
  ];

  if (pythonSignals.some((token) => sample.includes(token))) {
    return "python";
  }

  return "text";
};

export function CollapsibleCodeBlock({ className, children }: CollapsibleCodeBlockProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const language = useMemo(() => {
    const match = /language-(\w+)/.exec(className || "");
    const parsedLanguage = match?.[1]?.toLowerCase();

    // Some backend responses mark code as text/plaintext; infer Python when possible.
    if (!parsedLanguage || parsedLanguage === "text" || parsedLanguage === "plaintext" || parsedLanguage === "txt") {
      return inferLanguageFromCode(children);
    }

    return parsedLanguage;
  }, [className, children]);

  const totalLines = useMemo(() => children.split("\n").length, [children]);
  const isCollapsible = totalLines > VISIBLE_LINES;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="not-prose my-8 overflow-hidden rounded-2xl border border-zinc-800 shadow-[0_16px_30px_-22px_rgba(2,6,23,0.9)]">
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/90" />
          <span className="ml-2 font-mono text-xs uppercase tracking-wider text-zinc-400">{language}</span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-800/85 px-2.5 py-1.5 text-xs font-medium text-zinc-200 transition hover:bg-zinc-700"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy code"}
        </button>
      </div>

      <div className="relative bg-zinc-950">
        <div
          className="transition-[max-height] duration-300 ease-out"
          style={{
            maxHeight: isCollapsible && !expanded ? `${VISIBLE_LINES * LINE_HEIGHT}px` : "none",
            overflow: isCollapsible && !expanded ? "hidden" : "visible",
          }}
        >
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={language}
            PreTag="div"
            customStyle={{
              margin: 0,
              padding: "1.1rem 1.25rem 1.25rem",
              background: "#09090b",
              fontSize: "0.82rem",
              lineHeight: "1.5rem",
            }}
          >
            {children}
          </SyntaxHighlighter>
        </div>

        {isCollapsible && !expanded ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent" />
        ) : null}
      </div>

      {isCollapsible ? (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="flex w-full items-center justify-center gap-2 border-t border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300 transition hover:bg-zinc-800"
        >
          {expanded ? (
            <>
              Collapse Code
              <ChevronUp className="h-3.5 w-3.5" />
            </>
          ) : (
            <>
              Expand Code
              <ChevronDown className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      ) : null}
    </div>
  );
}

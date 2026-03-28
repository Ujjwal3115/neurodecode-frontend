"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity, FileText, UploadCloud } from "lucide-react";

type PreviewMode = "report" | "code" | "upload";

const modes: Array<{ key: PreviewMode; label: string }> = [
  { key: "report", label: "Report" },
  { key: "code", label: "Code" },
  { key: "upload", label: "Upload" },
];

const stageLabels = ["Vision Parse", "Architecture Map", "PyTorch Draft"];

export function InteractivePreview() {
  const [mode, setMode] = useState<PreviewMode>("report");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTick((prev) => prev + 1);
    }, 1200);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const switchTimer = window.setInterval(() => {
      setMode((prev) => {
        const currentIndex = modes.findIndex((item) => item.key === prev);
        const nextIndex = (currentIndex + 1) % modes.length;
        return modes[nextIndex].key;
      });
    }, 4500);

    return () => window.clearInterval(switchTimer);
  }, []);

  const stageProgress = useMemo(() => {
    return stageLabels.map((_, index) => {
      const base = 32 + index * 18;
      const pulse = (tick * 9 + index * 11) % 34;
      return Math.min(100, base + pulse);
    });
  }, [tick]);

  return (
    <div className="grid gap-4">
      <article className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/70">
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
          <p className="text-xs text-zinc-500">Interactive Preview</p>
          <div className="flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-900/80 p-1">
            {modes.map((item) => {
              const active = mode === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setMode(item.key)}
                  className={`rounded-md px-2.5 py-1 text-xs transition ${
                    active ? "bg-zinc-100 text-zinc-900" : "text-zinc-300 hover:text-zinc-100"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="h-44">
            {mode === "report" ? (
              <div className="flex h-full flex-col space-y-3">
                <div className="flex items-center gap-2 text-zinc-200">
                  <FileText className="h-4 w-4" />
                  <p className="text-sm">Architecture Summary</p>
                </div>
                <div className="space-y-2">
                  <div className="h-2 rounded bg-zinc-800">
                    <div className="h-2 rounded bg-blue-500/80 transition-all duration-700" style={{ width: `${66 + (tick % 22)}%` }} />
                  </div>
                  <div className="h-2 rounded bg-zinc-800">
                    <div className="h-2 rounded bg-zinc-300/80 transition-all duration-700" style={{ width: `${52 + (tick % 18)}%` }} />
                  </div>
                  <div className="h-2 rounded bg-zinc-800">
                    <div className="h-2 rounded bg-zinc-400/80 transition-all duration-700" style={{ width: `${44 + (tick % 28)}%` }} />
                  </div>
                </div>
              </div>
            ) : null}

            {mode === "code" ? (
              <div className="flex h-full flex-col space-y-3 overflow-hidden font-mono text-xs text-zinc-300">
                <p className="text-zinc-100">model = nn.Sequential(</p>
                <p className="pl-4 text-blue-300">nn.Conv2d(3, 32, kernel_size=3, padding=1),</p>
                <p className="pl-4 text-blue-300">nn.ReLU(),</p>
                <p className="pl-4 text-blue-300">nn.MaxPool2d(2),</p>
                <p className="text-zinc-100">)</p>
                <p className="text-zinc-500">status: generating weights spec{".".repeat((tick % 3) + 1)}</p>
              </div>
            ) : null}

            {mode === "upload" ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 py-3 text-center">
                <div className="rounded-full bg-blue-500/15 p-3 text-blue-300">
                  <UploadCloud className="h-6 w-6" />
                </div>
                <p className="text-sm text-zinc-200">Drop diagram image to start analysis</p>
                <div className="h-2 w-full max-w-48 rounded bg-zinc-800">
                  <div className="h-2 rounded bg-blue-500/80 transition-all duration-700" style={{ width: `${34 + (tick * 7) % 62}%` }} />
                </div>
              </div>
            ) : null}
            </div>
          </div>
        </div>
      </article>

      <article className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
        <div className="mb-3 flex items-center gap-2 text-zinc-300">
          <Activity className="h-4 w-4 text-blue-300" />
          <p className="text-xs text-zinc-500">Live Pipeline</p>
        </div>

        <ul className="space-y-3">
          {stageLabels.map((label, index) => {
            const progress = stageProgress[index];
            const isActive = tick % stageLabels.length === index;

            return (
              <li key={label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-300">{label}</span>
                  <span className={isActive ? "text-blue-300" : "text-zinc-500"}>{isActive ? "running" : "queued"}</span>
                </div>
                <div className="h-1.5 rounded bg-zinc-800">
                  <div
                    className="h-1.5 rounded bg-blue-500/85 transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </article>
    </div>
  );
}

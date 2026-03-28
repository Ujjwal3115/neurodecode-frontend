"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Bot, ChevronDown, ChevronUp, Loader2, UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { Outfit } from "next/font/google";
import { CollapsibleCodeBlock } from "@/components/collapsible-code-block";

const REPORT_COLLAPSED_HEIGHT = 540;

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const normalizeMarkdownReport = (rawReport: string) => {
  if (!rawReport) return "";

  let normalized = rawReport.replace(/\r/g, "").trim();

  // Unwrap fenced markdown reports even if repeated/nested.
  for (let i = 0; i < 3; i += 1) {
    const unwrapped = normalized.replace(/```(?:markdown|md)\s*\n([\s\S]*?)\n```/gi, "$1").trim();
    if (unwrapped === normalized) break;
    normalized = unwrapped;
  }

  // Remove accidental undefined artifacts returned by backend glue code.
  normalized = normalized
    .replace(/```(?:text)?\s*undefined\s*```/gi, "")
    .replace(/^\s*undefined\s*$/gim, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return normalized;
};

const sampleMarkdown = `
### Architecture Report: Convolutional Neural Network (CNN)
This is a standard Convolutional Neural Network designed for image classification (e.g., identifying a Horse, Zebra, or Dog).

**Extracted Layers:**
1. **Input Layer**: Takes the raw image data.
2. **Convolution + ReLU (x3)**: Three blocks of convolutional feature extraction followed by Rectified Linear Unit activation.
3. **Pooling (x3)**: Three spatial reduction layers corresponding to the convolutions.
4. **Flatten Layer**: Converts the 2D feature maps into a 1D vector.
5. **Fully-Connected Layer**: A dense layer mapping features to higher-level representations.
6. **Output Layer (SoftMax)**: A final layer with 3 nodes mapping to a Probabilistic Distribution.

\`\`\`python
import torch
import torch.nn as nn
import torch.nn.functional as F

class SimpleCNN(nn.Module):
    def __init__(self):
        super(SimpleCNN, self).__init__()
        # 3 Convolutional Blocks
        self.conv1 = nn.Conv2d(in_channels=3, out_channels=16, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(in_channels=16, out_channels=32, kernel_size=3, padding=1)
        self.conv3 = nn.Conv2d(in_channels=32, out_channels=64, kernel_size=3, padding=1)

        self.pool = nn.MaxPool2d(kernel_size=2, stride=2)

        # Flatten & Dense Layers
        self.flatten = nn.Flatten()
        self.fc1 = nn.Linear(64 * 4 * 4, 128) # Assuming 32x32 input
        self.fc2 = nn.Linear(128, 3) # 3 Output classes (Horse, Zebra, Dog)
        self.softmax = nn.Softmax(dim=1)

    def forward(self, x):
        # Feature Extraction
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = self.pool(F.relu(self.conv3(x)))

        # Classification
        x = self.flatten(x)
        x = F.relu(self.fc1(x))
        x = self.softmax(self.fc2(x))
        return x
\`\`\`
`;

export default function ToolPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [report, setReport] = useState<string | null>(null);
  const [reportExpanded, setReportExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  useEffect(() => {
    if (!loading) return;
    const interval = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [loading]);

  const statusText = useMemo(() => {
    const statuses = [
      "AI Workforce is analyzing...",
      "Vision Specialist is reading your diagram...",
      "Systems Analyst is mapping architecture...",
      "Developer Advocate is drafting PyTorch code...",
    ];
    return statuses[Math.floor(elapsedSeconds / 5) % statuses.length];
  }, [elapsedSeconds]);

  const formatElapsed = (seconds: number) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const clearSelection = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const onPickFile = (chosenFile: File | null) => {
    if (!chosenFile) return;
    setFile(chosenFile);
    setReport(null);
    setReportExpanded(false);
    setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPickFile(e.target.files?.[0] ?? null);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const dropped = e.dataTransfer.files?.[0] ?? null;
    onPickFile(dropped);
  };

  const handleAnalyze = async () => {
    if (!file) return;

    const supportedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!supportedFileTypes.includes(file.type)) {
      setError("Please upload a PNG or JPG image.");
      return;
    }

    setLoading(true);
    setElapsedSeconds(0);
    setError(null);
    setReport(null);
    setReportExpanded(false);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // It uses the live URL in production, or localhost during development
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

      const response = await fetch(`${API_URL}/api/analyze-diagram`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        // Check if the status is 429 OR if the message contains 429
        if (response.status === 429 || (errorData.detail && String(errorData.detail).includes("429"))) {
          throw new Error("Whoa, this tool is getting a lot of traffic right now! The AI Workforce hit its rate limit. Please try again in 60 seconds, or click 'Try a Sample' below.");
        } else {
          throw new Error(errorData.detail || "Failed to analyze the diagram. Ensure the backend is running.");
        }
      }

      const data = await response.json();
      const rawReport = typeof data?.markdown_report === "string"
        ? data.markdown_report
        : "No report was returned by the backend.";
      setReport(normalizeMarkdownReport(rawReport));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unexpected request failure.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSampleClick = () => {
    setFile(null);
    setError(null);
    setReport(null);
    setReportExpanded(false);
    setElapsedSeconds(0);
    setLoading(true);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    setTimeout(() => {
      setReport(sampleMarkdown.trim());
      setLoading(false);
    }, 2500);
  };

  return (
    <section className="space-y-10 py-8">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="space-y-5 text-center">
          <p className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 shadow-sm backdrop-blur">
            NeuroDecode Tool
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-[0.08em] text-zinc-100 sm:text-5xl">
            Translate Architecture to Code
          </h1>
          <p className="mx-auto max-w-2xl text-balance text-base text-zinc-400 sm:text-lg">
            Upload a neural network diagram and let our autonomous AI crew transform it into a structured Markdown analysis and deployable PyTorch implementation.
          </p>
        </div>

        <div className="space-y-5 rounded-3xl border border-zinc-800 bg-zinc-950/75 p-6 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.55)] backdrop-blur sm:p-8">
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleFileChange}
          />

          {!file ? (
            <label
              className={`group flex min-h-64 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 text-center transition-all ${
                dragActive
                  ? "border-zinc-300 bg-zinc-900"
                  : "border-zinc-700 hover:border-zinc-400 hover:bg-zinc-900/80"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragActive(false);
              }}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
            >
              <UploadCloud className="mb-4 h-12 w-12 text-zinc-400 transition-transform group-hover:scale-110" />
              <p className="text-base font-medium text-zinc-100">Drop your diagram here or click to upload</p>
              <p className="mt-1 text-sm text-zinc-400">PNG or JPG. Best results with clean architecture diagrams.</p>
            </label>
          ) : (
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
              <div className="flex min-w-0 items-center gap-3">
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Uploaded preview"
                    width={56}
                    height={56}
                    unoptimized
                    className="h-14 w-14 rounded-xl border border-zinc-700 object-cover"
                  />
                ) : null}
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-zinc-100">{file.name}</p>
                  <p className="text-xs text-zinc-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button
                onClick={clearSelection}
                className="inline-flex items-center gap-1 rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-200 transition hover:bg-zinc-800"
              >
                <X className="h-3.5 w-3.5" />
                Remove
              </button>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={!file || loading}
            className="w-full rounded-2xl bg-zinc-100 px-5 py-4 text-zinc-900 shadow-lg shadow-zinc-950/35 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-300"
          >
            <div className="flex min-h-10 items-center justify-center">
              {loading ? (
                <div className="space-y-1 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm font-semibold">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{statusText}</span>
                  </div>
                  <div className="font-mono text-xs tracking-[0.22em] opacity-80">{formatElapsed(elapsedSeconds)}</div>
                </div>
              ) : (
                <span className="text-sm font-semibold uppercase tracking-[0.18em]">Generate</span>
              )}
            </div>
          </button>

          <div className="my-4 flex w-full items-center">
            <div className="flex-grow border-t border-slate-700" />
            <span className="px-3 text-sm text-slate-500">OR</span>
            <div className="flex-grow border-t border-slate-700" />
          </div>

          <button
            type="button"
            onClick={handleSampleClick}
            disabled={loading}
            className="w-full rounded-xl border border-slate-700 bg-transparent px-4 py-3 font-medium text-slate-300 transition-colors hover:bg-slate-800 disabled:opacity-50"
          >
            Try a Sample CNN Diagram
          </button>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-900 bg-red-950/40 px-5 py-4 text-sm text-red-300 shadow-sm">
            {error}
          </div>
        )}

        {report && (
          <article className={`${outfit.className} w-full rounded-3xl border border-zinc-800 bg-zinc-950/75 p-6 normal-case tracking-normal shadow-[0_18px_40px_-30px_rgba(15,23,42,0.55)] backdrop-blur sm:p-8 md:p-10`}>
            <div className="mb-8 flex items-center gap-3 border-b border-zinc-800 pb-6">
              <div className="rounded-xl bg-zinc-900 p-3">
                <Bot className="h-6 w-6 text-zinc-200" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-zinc-50">Architecture Report</h2>
                <p className="text-sm text-zinc-400">Generated by the NeuroDecode autonomous AI crew</p>
              </div>
            </div>

            <div className="relative">
              <div
                className="prose prose-invert max-w-none overflow-hidden transition-[max-height] duration-300 ease-out prose-headings:font-semibold prose-h2:text-2xl prose-pre:my-0"
                style={{ maxHeight: reportExpanded ? "none" : `${REPORT_COLLAPSED_HEIGHT}px` }}
              >
                <ReactMarkdown
                  components={{
                    code({ className, children, ...props }) {
                      const codeContent = String(children).replace(/\n$/, "");
                      const language = /language-(\w+)/.exec(className || "")?.[1]?.toLowerCase();
                      const isInline = !language && !codeContent.includes("\n");

                      if (codeContent.trim().toLowerCase() === "undefined") {
                        return null;
                      }

                      if (isInline) {
                        return (
                          <code
                            {...props}
                            className="rounded-md bg-zinc-800 px-1.5 py-0.5 font-mono text-sm text-zinc-200 before:content-none after:content-none"
                          >
                            {children}
                          </code>
                        );
                      }

                      return (
                        <CollapsibleCodeBlock className={className ?? "language-text"}>
                          {codeContent}
                        </CollapsibleCodeBlock>
                      );
                    },
                  }}
                >
                  {report}
                </ReactMarkdown>
              </div>

              {!reportExpanded ? (
                <div className="pointer-events-none absolute inset-x-0 bottom-11 h-24 bg-gradient-to-t from-zinc-950 via-zinc-950/85 to-transparent" />
              ) : null}

              <button
                type="button"
                onClick={() => setReportExpanded((prev) => !prev)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300 transition hover:bg-zinc-800"
              >
                {reportExpanded ? (
                  <>
                    Collapse Report
                    <ChevronUp className="h-3.5 w-3.5" />
                  </>
                ) : (
                  <>
                    Expand Report
                    <ChevronDown className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}

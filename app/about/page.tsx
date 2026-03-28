import type { Metadata } from "next";
import { BrainCircuit, Code2, Eye, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "About | NeuroDecode",
  description: "The story behind NeuroDecode and how its autonomous AI workforce turns visual architectures into executable PyTorch code.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl py-10 sm:py-14">
      <header className="space-y-4 border-b border-zinc-800 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">The Story Behind NeuroDecode</p>
        <h1 className="text-balance text-4xl font-semibold tracking-[0.08em] text-zinc-100 sm:text-5xl">
          Bridging the gap between visual intuition and executable code.
        </h1>
      </header>

      <article className="prose prose-invert mt-8 max-w-none text-zinc-300 prose-headings:font-semibold prose-h2:text-2xl">
        <h2>The Problem</h2>
        <p>
          Deep learning moves at breakneck speed. Every day, researchers publish brilliant new architectures,
          but there is a persistent bottleneck: translating a dense, abstract block diagram from a research
          paper or a whiteboard sketch into clean, bug-free PyTorch boilerplate. It is a tedious, manual
          process that interrupts the flow of building. NeuroDecode was built to automate that handoff.
        </p>

        <h2>The Solution: An Autonomous AI Workforce</h2>
        <p>
          NeuroDecode is not a simple API wrapper. It is an agentic workflow. Instead of asking one massive
          model to do everything, the platform orchestrates a crew of specialized AI agents, each with one
          strict responsibility:
        </p>

        <div className="not-prose mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-sm">
            <Eye className="mb-3 h-5 w-5 text-cyan-300" />
            <h3 className="text-sm font-semibold text-zinc-50">The Vision Specialist</h3>
            <p className="mt-2 text-sm text-zinc-300">
              Powered by Gemini 2.5 Flash&apos;s native multimodal SDK, this agent parses the uploaded diagram
              into a strict, literal list of layers, nodes, and mathematical flows without hallucinating
              unmentioned architectures.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-sm">
            <BrainCircuit className="mb-3 h-5 w-5 text-cyan-300" />
            <h3 className="text-sm font-semibold text-zinc-50">The Systems Analyst</h3>
            <p className="mt-2 text-sm text-zinc-300">
              A senior-level deep learning agent that takes parsed visual data and maps it directly to
              PyTorch logic, generating raw, structural boilerplate code.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-sm">
            <Code2 className="mb-3 h-5 w-5 text-cyan-300" />
            <h3 className="text-sm font-semibold text-zinc-50">The Developer Advocate</h3>
            <p className="mt-2 text-sm text-zinc-300">
              The technical writer of the crew. It takes raw generated code and formats it into the clean,
              IDE-grade Markdown report shown in the interface.
            </p>
          </div>
        </div>

        <h2 className="mt-10">The Tech Stack</h2>
        <div className="not-prose mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <Wrench className="mb-3 h-5 w-5 text-cyan-300" />
            <h3 className="text-sm font-semibold text-zinc-50">Frontend</h3>
            <p className="mt-2 text-sm text-zinc-300">Next.js (App Router), Tailwind CSS v4, Lucide React, React Syntax Highlighter.</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <Wrench className="mb-3 h-5 w-5 text-cyan-300" />
            <h3 className="text-sm font-semibold text-zinc-50">Backend & AI Engine</h3>
            <p className="mt-2 text-sm text-zinc-300">Python, FastAPI, CrewAI orchestration, Google Gemini 2.5 Flash.</p>
          </div>
        </div>

        <h2 className="mt-10">About the Developer</h2>
        <p>
          Hi, I&apos;m Ujjwal. I&apos;m a developer specializing in AI and Machine Learning, with a heavy focus on
          Deep Learning and Computer Vision. I love building tools that solve actual developer bottlenecks.
          Drawing from my experience as a Design Lead for the Google Developer Group community, NeuroDecode
          was built with equal focus on premium UI/UX and robust backend orchestration.
        </p>
        <p>
          This project was built as a rapid sprint to explore what happens when modern web frameworks meet
          autonomous AI crews.
        </p>

        <p>
          <a href="https://github.com/Ujjwal3115" target="_blank" rel="noreferrer">GitHub</a>
          {" | "}
          <a href="https://www.linkedin.com/in/ujjwalverma3115/" target="_blank" rel="noreferrer">LinkedIn</a>
        </p>
      </article>
    </section>
  );
}

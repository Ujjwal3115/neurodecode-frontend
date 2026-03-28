import Link from "next/link";
import { ArrowRight, CheckCircle2, Code2, Eye, Workflow } from "lucide-react";
import { InteractivePreview } from "@/components/interactive-preview";

const highlights = [
  {
    title: "Diagram-to-Model Intelligence",
    text: "Interprets architecture visuals into layer-aware specs your team can review and trust.",
    icon: Eye,
  },
  {
    title: "Production-Ready Code Output",
    text: "Generates practical PyTorch implementations with structure that is easy to extend.",
    icon: Code2,
  },
  {
    title: "Agentic Workflow",
    text: "Specialized AI roles collaborate in sequence to reduce ambiguity and manual handoffs.",
    icon: Workflow,
  },
];

export default function Home() {
  return (
    <section className="pb-16 pt-6 sm:pt-10">
      <div className="mx-auto max-w-6xl space-y-16">
        
        {/* HERO SECTION */}
        <header className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-950/65 p-7 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.9)] backdrop-blur sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-28 -top-24 h-72 w-72 rounded-full bg-zinc-200/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 left-10 h-56 w-56 rounded-full bg-sky-400/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="space-y-6">
              <p className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                NeuroDecode Platform
              </p>
              <h1 className="text-balance text-4xl font-semibold tracking-[0.05em] text-zinc-100 sm:text-5xl lg:text-6xl">
                Move from model sketch to runnable PyTorch faster
              </h1>
              <p className="max-w-2xl text-pretty text-base text-zinc-300 sm:text-lg">
                NeuroDecode turns architecture diagrams into implementation-ready analysis and code.
                Teams use it to accelerate prototyping, reduce interpretation drift, and ship better model baselines.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/tool"
                  className="group inline-flex items-center gap-2 rounded-xl bg-zinc-100 px-5 py-3 text-sm font-semibold text-zinc-900 transition duration-300 hover:-translate-y-0.5 hover:bg-zinc-200 hover:shadow-[0_10px_20px_-14px_rgba(255,255,255,0.85)]"
                >
                  Open Tool
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center rounded-xl border border-zinc-700 bg-zinc-900/70 px-5 py-3 text-sm font-medium text-zinc-200 transition duration-300 hover:-translate-y-0.5 hover:border-zinc-500 hover:bg-zinc-900 hover:text-zinc-50"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/90 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">How It Works</p>
              <ul className="mt-4 space-y-3 text-sm text-zinc-300">
                <li className="flex gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-zinc-100" />
                  Upload neural architecture images from whiteboards, docs, or design files.
                </li>
                <li className="flex gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-zinc-100" />
                  Receive a structured markdown report with architecture and tensor-flow interpretation.
                </li>
                <li className="flex gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-zinc-100" />
                  Review generated PyTorch code, copy blocks, and iterate quickly with your team.
                </li>
              </ul>
            </div>
          </div>
        </header>

        {/* HIGHLIGHTS SECTION */}
        <section className="grid gap-4 sm:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
                <Icon className="h-5 w-5 text-zinc-100" />
                <h2 className="mt-4 text-lg font-semibold text-zinc-100">{item.title}</h2>
                <p className="mt-2 text-sm text-zinc-400">{item.text}</p>
              </article>
            );
          })}
        </section>

        {/* PREVIEW SECTION */}
        <section className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Product Preview</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[0.08em] text-zinc-100">See NeuroDecode in action</h2>
            </div>
            <Link href="/tool" className="text-sm font-medium text-zinc-300 underline decoration-zinc-600 underline-offset-4 transition hover:text-zinc-100">
              Launch the tool
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/70">
              <div className="border-b border-zinc-800 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Demo Video
              </div>
              <div className="aspect-video relative bg-zinc-900">
                {/* Custom Auto-looping HTML5 Video 
                  Ensure you place "demo-loop.mp4" inside your Next.js "public" folder.
                */}
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="h-full w-full object-cover opacity-85"
                >
                  <source src="/demo-loop.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {/* Subtle gradient overlay to make it blend into the dark theme perfectly */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent pointer-events-none" />
              </div>
            </article>

            <InteractivePreview />
          </div>
        </section>

      </div>
    </section>
  );
}
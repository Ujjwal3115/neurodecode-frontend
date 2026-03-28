import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NeuroDecode",
  description: "Translate architecture diagrams into deployable PyTorch code.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

const developerLinks = [
  {
    label: "Email",
    href: "mailto:ujjwalverma3115@gmail.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/Ujjwal3115",
  },
  {
    label: "X",
    href: "https://x.com/ujjwal3115",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ujjwalverma3115/",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-background text-foreground">
        <div className="relative min-h-screen">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(59,130,246,0.1),transparent_40%),radial-gradient(circle_at_78%_0%,rgba(244,244,245,0.08),transparent_36%),linear-gradient(to_bottom,rgba(10,10,10,1),rgba(5,5,5,0.98))]" />
          <Navbar />
          <main className="mx-auto w-full max-w-6xl px-4 pb-14 pt-8 sm:px-6 lg:px-8">{children}</main>

          <footer className="mx-auto mb-4 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 px-5 py-4 backdrop-blur-xl sm:px-6">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <p className="text-sm text-zinc-400">Developed by Ujjwal Verma</p>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  {developerLinks.map((link) => {
                    const isEmail = link.href.startsWith("mailto:");

                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        target={isEmail ? undefined : "_blank"}
                        rel={isEmail ? undefined : "noreferrer"}
                        className="rounded-lg border border-zinc-700 bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-200 transition hover:border-zinc-500 hover:text-zinc-50"
                      >
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

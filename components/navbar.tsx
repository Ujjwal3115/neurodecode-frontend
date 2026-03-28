"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logoImage from "../public/logo.svg";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tool", label: "Tool" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 py-3">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between rounded-2xl border border-zinc-800/80 bg-zinc-950/70 px-3 backdrop-blur-xl sm:px-5 lg:px-6">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-100">
            <Image
              src={logoImage}
              alt="NeuroDecode logo"
              width={24}
              height={24}
              className="h-10 w-10 rounded-sm object-contain"
              priority
            />
          </span>
          <span className="text-sm font-semibold tracking-wider text-zinc-100 sm:text-base">NeuroDecode</span>
        </Link>

        <div className="flex items-center gap-2">
          {navLinks.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-3 py-2 text-sm font-medium transition duration-300 ${
                  active
                    ? "bg-zinc-100 text-zinc-950 shadow-[0_10px_20px_-16px_rgba(255,255,255,0.9)]"
                    : "text-zinc-300 hover:-translate-y-0.5 hover:bg-zinc-900 hover:text-zinc-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/tool"
            className="group hidden rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-medium text-zinc-100 transition duration-300 hover:-translate-y-0.5 hover:border-zinc-500 hover:bg-zinc-900/90 hover:shadow-[0_10px_20px_-16px_rgba(255,255,255,0.65)] sm:inline-flex"
          >
            Open Tool
          </Link>
        </div>
      </nav>
    </header>
  );
}

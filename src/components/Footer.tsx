import { ArrowUpRight } from 'lucide-react';

const footerLinks = [
  { label: 'About VeriCode', href: '#product' },
  { label: 'VeriCode Products', href: '#workspace' },
  { label: 'Privacy', href: '#resources' },
  { label: 'Terms', href: '#resources' },
];

export function Footer() {
  return (
    <footer
      id="resources"
      className="relative isolate min-h-[560px] overflow-hidden bg-white text-[#101116] sm:min-h-[640px] lg:min-h-[700px]"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_22%_24%,rgba(59,130,246,0.08),transparent_34%),radial-gradient(ellipse_at_78%_18%,rgba(139,92,246,0.07),transparent_30%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"
      />
      <div className="container-page flex min-h-[560px] flex-col justify-between pb-9 pt-12 sm:min-h-[640px] sm:pb-11 lg:min-h-[700px]">
        <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
          <span>VeriCode AI</span>
          <a href="#home" className="pill-focus inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950">
            Back to top
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="flex justify-center py-16 sm:py-20">
          <h2 className="select-none whitespace-nowrap text-center text-[clamp(3.05rem,12.15vw,15rem)] font-black leading-[0.82] tracking-normal text-[#101116]">
            VeriCode AI
          </h2>
        </div>

        <div className="flex flex-col gap-5 text-[15px] font-semibold text-neutral-600 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-2xl font-semibold tracking-tight text-neutral-700">VeriCode</div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-7 gap-y-3">
            {footerLinks.map((link) => (
              <a key={link.label} href={link.href} className="transition hover:text-neutral-950">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="text-sm text-neutral-500">(c) 2026 VeriCode AI</div>
        </div>
      </div>
    </footer>
  );
}

export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-[1.05rem] border border-black/10 bg-white shadow-[0_16px_45px_rgba(0,0,0,0.13)] ${className}`}
    >
      <img
        src="/vericode-logo-mark.png"
        alt=""
        aria-hidden="true"
        className="h-[88%] w-[88%] object-contain"
        draggable={false}
      />
    </span>
  );
}

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <a href="#home" className="group inline-flex items-center gap-2.5" aria-label="Vericode AI home">
      <LogoMark className="h-9 w-9 transition-transform duration-300 group-hover:-translate-y-0.5" />
      <span className={`text-sm font-semibold tracking-tight ${inverted ? 'text-white' : 'text-neutral-950'}`}>VeriCode AI</span>
    </a>
  );
}

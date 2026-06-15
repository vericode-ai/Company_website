'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, CircleDot, FileCheck2, MonitorPlay, Play, ShieldCheck } from 'lucide-react';

const files = ['app', 'components', 'agents', 'tests', 'vericode.json'];
const statuses = [
  { label: 'Planning', detail: 'Mapping requirements', icon: CircleDot },
  { label: 'Building', detail: 'Generating workspace patch', icon: Play },
  { label: 'Testing', detail: 'Running browser checks', icon: CheckCircle2 },
  { label: 'Verified', detail: 'All gates passed', icon: ShieldCheck },
];

const codeLines = [
  'export async function launch(task) {',
  '  const plan = await agent.plan(task);',
  '  await workspace.apply(plan.patch);',
  '  const report = await test.browser();',
  '  return verify(report);',
  '}',
];

export function IDEPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34, rotateX: 6 }}
      animate={{ opacity: 1, y: [0, -10, 0], rotateX: 0 }}
      transition={{ opacity: { duration: 0.8, delay: 0.25 }, y: { duration: 7, repeat: Infinity, ease: 'easeInOut' } }}
      className="chrome-edge surface-dark relative mx-auto w-full rounded-[2rem] border border-white/[0.14] bg-[linear-gradient(135deg,rgba(0,0,0,0.98),rgba(18,18,18,0.98)_46%,rgba(0,0,0,0.99))] p-3 shadow-[0_46px_150px_rgba(0,0,0,0.58),0_0_115px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.12)] [transform-style:preserve-3d] lg:p-4"
    >
      <div className="absolute -inset-5 -z-10 rounded-[2.35rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.08),rgba(0,0,0,0.08))] blur-3xl" />
      <div className="chrome-edge pointer-events-none absolute -left-5 top-16 hidden w-44 rounded-3xl border border-neutral-200/80 bg-white/[0.94] p-4 text-neutral-950 shadow-[0_24px_70px_rgba(0,0,0,0.16)] backdrop-blur-xl lg:block">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-neutral-800">
          <FileCheck2 className="h-4 w-4 text-black" />
          Plan artifact
        </div>
        <div className="space-y-2">
          <span className="block h-2 rounded-full bg-neutral-300" />
          <span className="block h-2 w-4/5 rounded-full bg-neutral-100" />
          <span className="block h-2 w-3/5 rounded-full bg-neutral-100" />
        </div>
      </div>
      <div className="chrome-edge pointer-events-none absolute -right-6 bottom-12 hidden w-48 rounded-3xl border border-neutral-200/80 bg-white/[0.94] p-4 text-neutral-950 shadow-[0_24px_70px_rgba(0,0,0,0.16)] backdrop-blur-xl lg:block">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-neutral-800">
          <MonitorPlay className="h-4 w-4 text-black" />
          Browser proof
        </div>
        <div className="rounded-2xl bg-neutral-50 p-3">
          <span className="block h-2 rounded-full bg-white" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <span className="h-9 rounded-lg bg-white" />
            <span className="h-9 rounded-lg bg-neutral-300" />
            <span className="h-9 rounded-lg bg-white" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-b border-white/10 px-2 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-white" />
          <span className="h-3 w-3 rounded-full bg-neutral-400" />
          <span className="h-3 w-3 rounded-full bg-neutral-700" />
        </div>
        <div className="text-[11px] font-medium text-neutral-300">vericode/workspace/main</div>
        <div className="hidden h-7 min-w-56 items-center rounded-full border border-white/[0.14] bg-white/[0.09] px-3 text-[11px] font-medium text-neutral-100 sm:flex">
          AI command center ready
        </div>
      </div>
      <div className="grid min-h-[520px] grid-cols-1 gap-3 pt-3 md:grid-cols-[0.75fr_1.65fr] lg:grid-cols-[0.74fr_1.7fr_1fr]">
        <aside className="rounded-2xl border border-white/[0.12] bg-white/[0.07] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-200">Explorer</p>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={file} className="flex items-center gap-2 rounded-xl px-2 py-2 text-[12px] font-semibold text-neutral-100">
                <span className={`h-2 w-2 rounded-full ${index === 2 ? 'bg-white' : 'bg-neutral-600'}`} />
                {file}
              </div>
            ))}
          </div>
        </aside>
        <section className="grid gap-3">
          <div className="rounded-2xl border border-white/[0.12] bg-[#111111] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-white/[0.14] px-3 py-1 text-[11px] font-medium text-white">agent-runtime.ts</span>
              <span className="text-[11px] font-medium text-neutral-200">TypeScript</span>
            </div>
            <div className="space-y-3 font-mono text-[12px] leading-none text-neutral-100">
              {codeLines.map((line, index) => (
                <p key={line} className="grid grid-cols-[1.5rem_1fr] gap-3">
                  <span className="text-right text-neutral-300">{index + 1}</span>
                  <span>
                    <span className="text-white">{line.slice(0, 8)}</span>
                    {line.slice(8)}
                  </span>
                </p>
              ))}
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-white/[0.12] bg-black/[0.34] p-4">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-200">Terminal</p>
              <div className="space-y-2 font-mono text-[11px] text-white">
                <p>$ vericode run deploy-check</p>
                <p className="text-neutral-200">plan accepted in 2.4s</p>
                <p>tests passed (128)</p>
                <p>browser flow verified</p>
              </div>
            </div>
            <div className="rounded-2xl border border-white/[0.12] bg-white/[0.08] p-4">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-200">Browser Preview</p>
              <div className="rounded-xl bg-white p-3 text-neutral-950">
                <div className="mb-3 h-2 w-20 rounded-full bg-neutral-200" />
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-14 rounded-lg bg-neutral-200" />
                  <div className="h-14 rounded-lg bg-neutral-100" />
                  <div className="h-14 rounded-lg bg-neutral-300" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <aside className="rounded-2xl border border-white/[0.12] bg-white/[0.08] p-3 md:col-span-2 lg:col-span-1">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-200">AI Agent</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {statuses.map((status) => (
              <div key={status.label} className="rounded-2xl border border-white/[0.22] bg-white/[0.08] p-3">
                <div className="flex items-center gap-2 text-[13px] font-semibold text-white">
                  <status.icon className="h-4 w-4 text-white" />
                  {status.label}
                </div>
                <p className="mt-1 text-[11px] text-neutral-200">{status.detail}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Bot, Code2, FileCheck2, MonitorPlay, TerminalSquare } from 'lucide-react';
import { InteractiveCard } from './InteractiveCard';
import { Reveal } from './Reveal';

const steps = [
  {
    title: 'Plan',
    body: 'Vericode converts the request into a scoped task plan with files, risks, and validation gates.',
    icon: FileCheck2,
  },
  {
    title: 'Code',
    body: 'Agents patch the workspace with codebase context, conventions, and dependency awareness.',
    icon: Code2,
  },
  {
    title: 'Run',
    body: 'Terminal commands, app servers, and browser sessions are orchestrated inside the workflow.',
    icon: TerminalSquare,
  },
  {
    title: 'Verify',
    body: 'Screenshots, test output, and review artifacts make the result inspectable before merge.',
    icon: MonitorPlay,
  },
];

export function AgentWorkflow() {
  return (
    <section id="product" className="section-pad surface-light relative">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-64 bg-[linear-gradient(180deg,rgba(255,255,255,0),#ffffff)]" />
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal>
            <p className="section-kicker">Product</p>
            <h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-normal text-neutral-950 sm:text-6xl">
              The VeriCode control plane for agent work
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
              VeriCode connects planning, code edits, terminal runs, browser checks, and review evidence in one
              controlled workspace.
            </p>
            <a href="#proof" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-black transition hover:text-neutral-600">
              See verification artifacts
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
          <Reveal>
            <div className="luxury-shell relative rounded-[2rem] p-4 backdrop-blur-xl">
              <div className="absolute -inset-4 -z-10 rounded-[2.4rem] bg-black/10 blur-3xl" />
              <div className="grid gap-3 md:grid-cols-[0.9fr_1.1fr]">
                <div className="chrome-edge surface-dark rounded-[1.4rem] bg-[linear-gradient(145deg,#000000,#181818)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_18px_55px_rgba(0,0,0,0.2)]">
                  <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
                    <Bot className="h-4 w-4 text-white" />
                    Agent queue
                  </div>
                  {['Checkout regression', 'Billing settings UI', 'Release smoke test'].map((task, index) => (
                    <motion.div
                      key={task}
                      initial={{ opacity: 0.7 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.08 }}
                      className="mb-3 rounded-2xl border border-white/10 bg-white/[0.055] p-3"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span>{task}</span>
                        <span className="text-white">{index === 0 ? 'Running' : 'Queued'}</span>
                      </div>
                      <div className="mt-3 h-1.5 rounded-full bg-white/10">
                        <span className={`block h-full rounded-full bg-white ${index === 0 ? 'w-3/4' : 'w-1/3'}`} />
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="grid gap-3">
                  {steps.map((step, index) => (
                    <InteractiveCard
                      key={step.title}
                      intensity={5}
                      className="rounded-[1.25rem] border border-neutral-200 bg-white p-4 shadow-[0_12px_34px_rgba(0,0,0,0.065)] backdrop-blur-xl transition duration-300 hover:border-neutral-950/25 hover:shadow-[0_22px_60px_rgba(0,0,0,0.11)]"
                    >
                      <div className="flex gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#ffffff,#e5e5e5)] text-black">
                          <step.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">0{index + 1}</div>
                          <h3 className="mt-1 text-lg font-semibold text-neutral-950">{step.title}</h3>
                          <p className="mt-1 text-sm leading-6 text-neutral-600">{step.body}</p>
                        </div>
                      </div>
                    </InteractiveCard>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

'use client';

import { ArrowUpRight, Bug, ChartSpline, CloudCog, Code2, UsersRound } from 'lucide-react';
import { InteractiveCard } from './InteractiveCard';
import { Reveal } from './Reveal';

const cases = [
  {
    title: 'Full-stack development',
    body: 'Ship features faster across frontend, backend, APIs, and migrations.',
    icon: Code2,
    accent: 'from-blue-600 to-cyan-500',
  },
  {
    title: 'DevOps and platform',
    body: 'Automate deployments, IaC edits, release checks, and incident runbooks.',
    icon: CloudCog,
    accent: 'from-neutral-950 to-neutral-600',
  },
  {
    title: 'Testing and quality',
    body: 'Generate tests, fix failures, replay browser flows, and prevent regressions.',
    icon: Bug,
    accent: 'from-emerald-600 to-lime-500',
  },
  {
    title: 'Data and analytics',
    body: 'Build pipelines, dashboards, notebooks, and internal data apps with guardrails.',
    icon: ChartSpline,
    accent: 'from-violet-600 to-blue-500',
  },
  {
    title: 'Enterprise teams',
    body: 'Coordinate secure, reviewable agent work across shared repositories.',
    icon: UsersRound,
    accent: 'from-rose-600 to-orange-500',
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="section-pad surface-light pt-8">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="section-kicker">Use Cases</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal text-neutral-950 sm:text-5xl">Built for every team</h2>
          <p className="mt-5 text-lg leading-8 text-neutral-600">
            From solo developers to scaling engineering organizations, Vericode AI adapts to your delivery model.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {cases.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <InteractiveCard className="h-full rounded-[1.25rem] border border-neutral-200 bg-white p-5 shadow-[0_14px_42px_rgba(0,0,0,0.055)] backdrop-blur-xl transition duration-300 hover:border-neutral-950/25 hover:shadow-[0_26px_75px_rgba(0,0,0,0.12)]">
                <div className={`mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-[0_16px_38px_rgba(0,0,0,0.14)] transition duration-300 group-hover:scale-105`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-neutral-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{item.body}</p>
                <div className="mt-7 flex items-center justify-between border-t border-neutral-100 pt-4 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                  <span>Deploy-ready</span>
                  <ArrowUpRight className="h-4 w-4 text-neutral-950 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </InteractiveCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

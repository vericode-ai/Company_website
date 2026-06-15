'use client';

import { Camera, CheckCircle2, ClipboardList, MessageSquareText, ShieldCheck } from 'lucide-react';
import { InteractiveCard } from './InteractiveCard';
import { Reveal } from './Reveal';

const artifacts = [
  { title: 'Implementation plan', body: 'Scope, touched files, assumptions, and rollback notes.', icon: ClipboardList },
  { title: 'Browser screenshot', body: 'Visual proof captured from the rendered application.', icon: Camera },
  { title: 'Test report', body: 'Unit, integration, and browser flow results in one review surface.', icon: CheckCircle2 },
  { title: 'Review thread', body: 'Leave feedback on the artifact and let the agent revise the work.', icon: MessageSquareText },
];

export function VerificationArtifacts() {
  return (
    <section id="proof" className="section-pad bg-[linear-gradient(180deg,rgba(245,245,245,0.72),rgba(255,255,255,1))] text-neutral-950">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="section-kicker">Trust and Verification</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-normal text-neutral-950 sm:text-6xl">
            Verify with artifacts, not guesswork
          </h2>
          <p className="mt-5 text-lg leading-8 text-neutral-600">
            Every autonomous run leaves reviewable evidence so teams can understand what changed and why it passed.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="luxury-shell rounded-[2rem] p-5">
              <div className="chrome-edge surface-dark rounded-[1.5rem] bg-[linear-gradient(145deg,#000000,#181818)] p-5">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-white" />
                    <div>
                      <h3 className="text-base font-semibold">Checkout settings verified</h3>
                      <p className="text-xs text-neutral-400">4 artifacts generated · 0 blockers</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-white/[0.14] px-3 py-1 text-xs font-semibold text-white">
                    Passed
                  </span>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {artifacts.map((artifact) => (
                    <InteractiveCard key={artifact.title} intensity={5} className="rounded-2xl border border-white/10 bg-white/[0.065] p-4">
                      <artifact.icon className="h-5 w-5 text-white" />
                      <h4 className="mt-4 text-sm font-semibold">{artifact.title}</h4>
                      <p className="mt-2 text-xs leading-5 text-neutral-400">{artifact.body}</p>
                    </InteractiveCard>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid h-full gap-5">
              <article className="rounded-[1.6rem] border border-neutral-200/80 bg-white/[0.92] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl">
                <p className="text-sm font-semibold text-black">Review-ready output</p>
                <h3 className="mt-3 text-2xl font-semibold text-neutral-950">A human-readable record of the run</h3>
                <p className="mt-4 text-sm leading-6 text-neutral-600">
                  Plans, diffs, command output, screenshots, and browser notes become a compact handoff instead of a
                  raw stream of tool logs.
                </p>
              </article>
              <article className="rounded-[1.6rem] border border-neutral-200/80 bg-white/[0.92] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl">
                <p className="text-sm font-semibold text-black">Agent governance</p>
                <h3 className="mt-3 text-2xl font-semibold text-neutral-950">Guarded execution for team workflows</h3>
                <p className="mt-4 text-sm leading-6 text-neutral-600">
                  Approvals, command boundaries, and test gates keep autonomous work observable before it reaches
                  production branches.
                </p>
              </article>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}


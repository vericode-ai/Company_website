'use client';

import { ArrowRight } from 'lucide-react';
import { InteractiveCard } from './InteractiveCard';
import { Reveal } from './Reveal';

const posts = [
  {
    category: 'Feature',
    title: 'Introducing Vericode AI',
    date: 'May 8, 2026',
    body: 'A new era of agentic development. Here is what is possible.',
    image: '/blog/introducing-vericode-ai.png',
    imageAlt: 'Abstract VeriCode AI launch scene with glowing coding panels and neural mesh.',
  },
  {
    category: 'Engineering',
    title: 'Inside the Vericode Agent',
    date: 'Apr 24, 2026',
    body: 'How agents plan, act, and verify complex workspace tasks.',
    image: '/blog/inside-vericode-agent.png',
    imageAlt: 'AI agent architecture with connected code panels and verification streams.',
  },
  {
    category: 'Guide',
    title: 'Best Practices for AI Pairing',
    date: 'Apr 10, 2026',
    body: 'Tips to get the most out of agentic development.',
    image: '/blog/ai-pairing-practices.png',
    imageAlt: 'Two AI pairing workstreams converging across a dark coding canvas.',
  },
  {
    category: 'News',
    title: 'What is New in v0.3',
    date: 'Mar 28, 2026',
    body: 'Smarter context, faster runs, and cleaner review loops.',
    image: '/blog/vericode-v03-update.png',
    imageAlt: 'Futuristic software update modules with glowing release paths.',
  },
];

export function BlogPreview() {
  return (
    <section id="blog" className="section-pad surface-light pt-12">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="section-kicker">From the Blog</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal text-neutral-950 sm:text-5xl">Insights, updates, and guides</h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {posts.map((post, index) => (
            <Reveal key={post.title} delay={index * 0.05}>
              <InteractiveCard className="chrome-edge h-full rounded-[1.35rem] border border-neutral-200 bg-white/[0.92] shadow-[0_18px_55px_rgba(0,0,0,0.08)] backdrop-blur-xl">
                <div className="h-40 overflow-hidden border-b border-neutral-200 bg-neutral-950 p-3">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="h-full w-full rounded-2xl object-cover shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
                <div className="p-5">
                  <div className="mb-4 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.12em] text-black">
                    <span>{post.category}</span>
                    <span className="text-neutral-400">{post.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold leading-6 text-neutral-950">{post.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">{post.body}</p>
                  <a href="#resources" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-black">
                    Read more
                    <ArrowRight className="h-4 w-4 transition duration-200 group-hover:translate-x-1" />
                  </a>
                </div>
              </InteractiveCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

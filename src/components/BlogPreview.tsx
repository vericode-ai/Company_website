'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { blogPosts } from '@/data/blogPosts';
import { InteractiveCard } from './InteractiveCard';
import { Reveal } from './Reveal';

export function BlogPreview() {
  return (
    <section id="blog" className="section-pad surface-light pt-12">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="section-kicker">From the Blog</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal text-neutral-950 sm:text-5xl">Insights, updates, and guides</h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {blogPosts.map((post, index) => (
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
                  <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-black">
                    Read more
                    <ArrowRight className="h-4 w-4 transition duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </InteractiveCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

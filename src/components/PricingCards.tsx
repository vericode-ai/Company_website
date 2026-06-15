'use client';

import { Building2, Check, Rocket, Shield, Sparkles } from 'lucide-react';
import { InteractiveCard } from './InteractiveCard';
import { Reveal } from './Reveal';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    unit: '/ month',
    description: 'Get started at no cost',
    features: ['30 agent credits / month', 'Access to core features', 'Community support'],
    cta: 'Get started',
    icon: Sparkles,
  },
  {
    name: 'Pro',
    price: '$20',
    unit: '/ month',
    description: 'For professional developers',
    features: ['500 agent credits / month', 'Advanced AI models', 'Priority support', 'Private projects'],
    cta: 'Start Pro trial',
    featured: true,
    icon: Rocket,
  },
  {
    name: 'Team',
    price: '$49',
    unit: '/ user / month',
    description: 'For growing teams',
    features: ['Unlimited agent credits', 'Team collaboration', 'Admin controls', 'SSO and audit logs'],
    cta: 'Contact sales',
    icon: Building2,
  },
];

export function PricingCards() {
  return (
    <section id="pricing" className="section-pad surface-light pt-10">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="section-kicker">Pricing</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal text-neutral-950 sm:text-5xl">Simple pricing for everyone</h2>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <Reveal key={tier.name} delay={index * 0.06}>
              <InteractiveCard
                intensity={tier.featured ? 7 : 9}
                className={`relative h-full rounded-[1.4rem] bg-white p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 ${
                  tier.featured
                    ? 'chrome-edge border border-black shadow-[0_36px_105px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.9)]'
                    : 'chrome-edge border border-neutral-200 shadow-[0_16px_52px_rgba(0,0,0,0.07)] hover:border-neutral-950/25 hover:shadow-[0_28px_80px_rgba(0,0,0,0.12)]'
                }`}
              >
                {tier.featured ? (
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black px-4 py-1.5 text-xs font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
                    Most popular
                  </span>
                ) : null}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-950">{tier.name}</h3>
                    <p className="mt-2 text-sm text-neutral-500">{tier.description}</p>
                  </div>
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                    tier.featured ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-950'
                  }`}>
                    <tier.icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-7 flex items-end gap-2">
                  <span className="text-5xl font-semibold tracking-normal text-neutral-950">{tier.price}</span>
                  <span className="pb-2 text-sm text-neutral-500">{tier.unit}</span>
                </div>
                <ul className="mt-8 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm leading-6 text-neutral-600">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-black" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#downloads"
                  className={`pill-focus mt-9 inline-flex w-full justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200 ${
                    tier.featured
                      ? 'bg-black text-white shadow-[0_16px_35px_rgba(0,0,0,0.2)] hover:bg-neutral-800'
                      : 'border border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400 hover:text-black'
                  }`}
                >
                  {tier.cta}
                </a>
              </InteractiveCard>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 flex items-center justify-center gap-2 text-sm text-neutral-500">
          <Shield className="h-4 w-4 text-black" />
          14-day free trial. Cancel anytime.
        </Reveal>
      </div>
    </section>
  );
}

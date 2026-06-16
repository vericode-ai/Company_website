'use client';

import { Apple, Check, Download, Laptop, Terminal } from 'lucide-react';
import { useDownloadComingSoon } from './DownloadComingSoon';
import { InteractiveCard } from './InteractiveCard';
import { Reveal } from './Reveal';

const downloads = [
  { os: 'macOS', detail: 'Apple silicon and Intel', icon: Apple, primary: false },
  { os: 'Windows', detail: 'Windows 11 and 10', icon: Laptop, primary: true },
  { os: 'Linux', detail: 'Debian, Fedora, AppImage', icon: Terminal, primary: false },
];

export function DownloadCards() {
  const openDownloadComingSoon = useDownloadComingSoon();

  return (
    <section id="downloads" className="section-pad surface-light">
      <div className="container-page">
        <div className="grid items-end gap-8 rounded-[2rem] border border-neutral-200/80 bg-white/70 p-5 shadow-[0_28px_95px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-8 lg:grid-cols-[0.86fr_1.14fr]">
          <Reveal>
            <p className="section-kicker">Download</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-normal text-neutral-950 sm:text-6xl">
              Start on the platform your team already uses
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-600">
              Install the Vericode AI desktop workspace, connect a repository, and delegate the first verified run.
            </p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {downloads.map((item, index) => (
              <Reveal key={item.os} delay={index * 0.06}>
                <InteractiveCard
                  intensity={item.primary ? 8 : 10}
                  className={`h-full rounded-[1.55rem] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.08)] transition duration-200 hover:-translate-y-1 ${
                    item.primary
                      ? 'chrome-edge border border-black bg-[linear-gradient(145deg,#000000,#262626)] text-white shadow-[0_30px_95px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.28)]'
                      : 'chrome-edge border border-neutral-200 bg-white/[0.92] text-neutral-950 backdrop-blur-xl'
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      item.primary ? 'bg-white/[0.16] text-white' : 'bg-[linear-gradient(145deg,#ffffff,#e5e5e5)] text-black'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold">{item.os}</h3>
                  <p className={`mt-2 text-sm ${item.primary ? 'text-neutral-100' : 'text-neutral-500'}`}>{item.detail}</p>
                  <ul className={`mt-6 space-y-2 text-sm ${item.primary ? 'text-neutral-50' : 'text-neutral-600'}`}>
                    <li className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" />
                      Agent workspace
                    </li>
                    <li className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" />
                      Browser verification
                    </li>
                  </ul>
                  <button
                    type="button"
                    onClick={openDownloadComingSoon}
                    className={`pill-focus mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold ${
                      item.primary ? 'bg-white text-black' : 'border border-neutral-200 bg-white text-neutral-800'
                    }`}
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </InteractiveCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

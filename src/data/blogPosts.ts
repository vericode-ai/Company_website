export type BlogPostSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  date: string;
  isoDate: string;
  author: string;
  readTime: string;
  body: string;
  image: string;
  imageAlt: string;
  highlights: string[];
  sections: BlogPostSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'introducing-vericode-ai',
    category: 'Feature',
    title: 'Introducing Vericode AI',
    date: 'May 8, 2026',
    isoDate: '2026-05-08',
    author: 'VeriCode Product Team',
    readTime: '5 min read',
    body: 'Meet the agent workspace that plans changes, edits code, runs checks, and records proof in one engineering handoff.',
    image: '/blog/introducing-vericode-ai.png',
    imageAlt: 'Abstract VeriCode AI launch scene with glowing coding panels and neural mesh.',
    highlights: ['Agent task planning', 'Repository-aware edits', 'Verification artifacts'],
    sections: [
      {
        heading: 'Why we built it',
        paragraphs: [
          'Vericode AI is designed for teams that want autonomous coding help without losing review discipline. Every task starts with context from the repository, moves through scoped edits, and ends with a record of the checks that ran.',
          'The first release focuses on a desktop-style workspace for practical engineering work: code changes, debugging, browser verification, and clean handoffs for reviewers.',
        ],
      },
      {
        heading: 'What ships first',
        paragraphs: [
          'The initial workflow includes codebase inspection, implementation planning, file edits, command execution, and validation summaries. The goal is to make every agent run auditable instead of mysterious.',
          'Download links are being prepared for public availability. Until installers are ready, the product site now shows a coming-soon card instead of sending users to a placeholder destination.',
        ],
      },
      {
        heading: 'What teams should expect',
        paragraphs: [
          'Vericode AI is not a replacement for engineering ownership. It is a faster way to get from a clearly stated task to a reviewable patch with evidence attached.',
          'The product roadmap is centered on stronger repository understanding, richer browser verification, and tighter integrations with pull request workflows.',
        ],
      },
    ],
  },
  {
    slug: 'inside-the-vericode-agent',
    category: 'Engineering',
    title: 'Inside the Vericode Agent',
    date: 'Apr 24, 2026',
    isoDate: '2026-04-24',
    author: 'VeriCode Engineering',
    readTime: '6 min read',
    body: 'A practical look at how the agent gathers context, chooses an implementation path, and verifies the result before handoff.',
    image: '/blog/inside-vericode-agent.png',
    imageAlt: 'AI agent architecture with connected code panels and verification streams.',
    highlights: ['Context gathering', 'Scoped implementation', 'Command-based verification'],
    sections: [
      {
        heading: 'Context before edits',
        paragraphs: [
          'The agent begins by reading the local project structure, package scripts, and relevant source files. That keeps the implementation aligned with the framework, naming conventions, and design patterns already present in the repository.',
          'For frontend work, the agent identifies the rendered flow before touching code. For backend and tooling work, it looks for tests, scripts, and ownership boundaries first.',
        ],
      },
      {
        heading: 'Small changes, clear blast radius',
        paragraphs: [
          'Vericode AI favors focused edits over broad rewrites. A task like changing download behavior should not restructure unrelated navigation, pricing, or footer code unless those surfaces are part of the requested flow.',
          'The same principle applies to data work. Blog metadata and article content live in one data module so preview cards and detail pages stay consistent without duplicating copy.',
        ],
      },
      {
        heading: 'Verification as part of the feature',
        paragraphs: [
          'The handoff is only useful when it says what was tested. The agent runs available lint, build, unit, or browser checks and calls out any environment blockers directly.',
          'When browser validation is available, the expected proof is simple: the page loads, the intended control is clicked, and the resulting state is observed without framework overlays or relevant console errors.',
        ],
      },
    ],
  },
  {
    slug: 'best-practices-for-ai-pairing',
    category: 'Guide',
    title: 'Best Practices for AI Pairing',
    date: 'Apr 10, 2026',
    isoDate: '2026-04-10',
    author: 'VeriCode Field Engineering',
    readTime: '4 min read',
    body: 'How to frame tasks, review patches, and keep agent-assisted development grounded in production engineering habits.',
    image: '/blog/ai-pairing-practices.png',
    imageAlt: 'Two AI pairing workstreams converging across a dark coding canvas.',
    highlights: ['Better task prompts', 'Reviewable diffs', 'Validation habits'],
    sections: [
      {
        heading: 'Start with the user-visible outcome',
        paragraphs: [
          'Good agent tasks describe the behavior users should see. For example, "clicking Download opens a coming-soon card" is clearer than "fix download" because it names the trigger and the expected state.',
          'When the task involves design, include constraints such as target viewport, component boundaries, and whether the change should affect navigation links, buttons, or both.',
        ],
      },
      {
        heading: 'Ask for evidence, not just code',
        paragraphs: [
          'The best pairing loop ends with commands run, routes checked, and remaining risk noted. Passing builds are useful, but rendered UI changes should also be exercised in the browser when the environment supports it.',
          'Reviewers should expect a concise explanation of what changed and where, with file references that make the patch easy to inspect.',
        ],
      },
      {
        heading: 'Keep ownership with the team',
        paragraphs: [
          'Agent output still needs product judgment, code review, and release discipline. Treat the agent as a fast implementation partner, not an authority that bypasses normal engineering checks.',
          'A strong workflow keeps unrelated work out of the diff and records any environment issue that prevented full validation.',
        ],
      },
    ],
  },
  {
    slug: 'what-is-new-in-v0-3',
    category: 'News',
    title: 'What is New in v0.3',
    date: 'Mar 28, 2026',
    isoDate: '2026-03-28',
    author: 'VeriCode Release Team',
    readTime: '5 min read',
    body: 'Version 0.3 improves context handling, local command feedback, and the review summaries teams use after each agent run.',
    image: '/blog/vericode-v03-update.png',
    imageAlt: 'Futuristic software update modules with glowing release paths.',
    highlights: ['Smarter context windows', 'Cleaner command logs', 'Sharper review handoffs'],
    sections: [
      {
        heading: 'Smarter context handling',
        paragraphs: [
          'Version 0.3 improves how the workspace decides which files matter for a task. The agent spends less time on unrelated folders and more time reading the components, routes, scripts, and styles that shape the requested behavior.',
          'This is especially important for frontend apps where a visible flow may span a page, a client component, shared data, and global styles.',
        ],
      },
      {
        heading: 'Cleaner verification output',
        paragraphs: [
          'Command output is summarized around the signal reviewers need: whether lint, build, tests, or browser checks passed, and what blocked any missing step.',
          'The release also tightens status reporting for long-running work so users can see what context is being gathered, what files are being edited, and what remains to verify.',
        ],
      },
      {
        heading: 'Review-ready handoffs',
        paragraphs: [
          'The v0.3 handoff format emphasizes changed files, user-facing behavior, checks run, and residual risk. That makes small site updates and larger engineering changes easier to review without rereading the whole session.',
          'Upcoming releases will continue to focus on stronger GitHub workflows and richer browser evidence for rendered UI changes.',
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

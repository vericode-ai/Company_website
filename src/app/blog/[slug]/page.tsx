import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CalendarDays, Clock3, UserRound } from 'lucide-react';
import { blogPosts, getBlogPost } from '@/data/blogPosts';
import { Logo } from '@/components/Logo';

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: 'Blog post not found | Vericode AI',
    };
  }

  return {
    title: `${post.title} | Vericode AI Blog`,
    description: post.body,
    openGraph: {
      title: post.title,
      description: post.body,
      images: [{ url: post.image, alt: post.imageAlt }],
      type: 'article',
      publishedTime: post.isoDate,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <header className="border-b border-neutral-200/70 bg-white/90 px-4 backdrop-blur-xl">
        <nav className="container-page flex h-16 items-center justify-between">
          <Logo />
          <Link
            href="/#blog"
            className="pill-focus inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
          >
            <ArrowLeft className="h-4 w-4" />
            Blog
          </Link>
        </nav>
      </header>

      <article>
        <section className="container-page pb-12 pt-12 sm:pt-16 lg:pb-16">
          <div className="mx-auto max-w-4xl">
            <p className="section-kicker">{post.category}</p>
            <h1 className="mt-5 text-4xl font-semibold tracking-normal text-neutral-950 sm:text-6xl lg:text-7xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-600 sm:text-xl">{post.body}</p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-neutral-600">
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2">
                <UserRound className="h-4 w-4 text-neutral-950" />
                {post.author}
              </span>
              <time
                dateTime={post.isoDate}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2"
              >
                <CalendarDays className="h-4 w-4 text-neutral-950" />
                {post.date}
              </time>
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2">
                <Clock3 className="h-4 w-4 text-neutral-950" />
                {post.readTime}
              </span>
            </div>
          </div>
        </section>

        <section className="container-page">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[1.65rem] border border-neutral-200 bg-neutral-950 p-3 shadow-[0_28px_95px_rgba(0,0,0,0.14)]">
            <img src={post.image} alt={post.imageAlt} className="aspect-[16/8] w-full rounded-[1.2rem] object-cover" />
          </div>
        </section>

        <section className="container-page pb-20 pt-12 sm:pb-24 sm:pt-16">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[1.35rem] border border-neutral-200 bg-neutral-50 p-6">
                <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-neutral-950">Key points</h2>
                <ul className="mt-5 space-y-3">
                  {post.highlights.map((highlight) => (
                    <li key={highlight} className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-neutral-700 shadow-sm">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="space-y-12">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-semibold tracking-normal text-neutral-950 sm:text-3xl">{section.heading}</h2>
                  <div className="mt-5 space-y-5">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-8 text-neutral-600 sm:text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}

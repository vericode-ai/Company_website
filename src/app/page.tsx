import { AgentWorkflow } from '@/components/AgentWorkflow';
import { BlogPreview } from '@/components/BlogPreview';
import { DownloadComingSoonProvider } from '@/components/DownloadComingSoon';
import { DownloadCards } from '@/components/DownloadCards';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { InteractiveMeshIntroSection } from '@/components/InteractiveMeshIntroSection';
import { Navbar } from '@/components/Navbar';
import { UseCases } from '@/components/UseCases';
import { VerificationArtifacts } from '@/components/VerificationArtifacts';

export default function Home() {
  return (
    <DownloadComingSoonProvider>
      <main className="min-h-screen overflow-x-hidden text-slate-950">
        <Navbar />
        <Hero />
        <AgentWorkflow />
        <VerificationArtifacts />
        <DownloadCards />
        <UseCases />
        <InteractiveMeshIntroSection />
        <BlogPreview />
        <Footer />
      </main>
    </DownloadComingSoonProvider>
  );
}

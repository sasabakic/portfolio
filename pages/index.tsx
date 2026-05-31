import { useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { TerminalSquare } from "lucide-react";
import { profile } from "@/data/portfolio";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import CommandPalette from "@/components/CommandPalette";
import InteractiveTerminal from "@/components/InteractiveTerminal";

// Canvas-only effect — no SSR value, load on the client to keep the HTML lean.
const MatrixRain = dynamic(() => import("@/components/MatrixRain"), {
  ssr: false,
});

const SITE_URL = "https://your-domain.com"; // TODO: set your deployed URL
const title = `${profile.name} — ${profile.roles[0]}`;
const description = `${profile.name} is a ${profile.roles[0]} working across React & TypeScript on the frontend and Symfony & PHP on the backend. ${profile.tagline}`;

export default function Home() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.roles[0],
    description,
    email: `mailto:${profile.email}`,
    url: SITE_URL,
    address: { "@type": "PostalAddress", addressLocality: profile.location },
    knowsAbout: ["React", "TypeScript", "Next.js", "Symfony", "PHP", "Node.js"],
    sameAs: [profile.social.github, profile.social.linkedin, profile.social.twitter].filter(
      Boolean,
    ),
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={SITE_URL} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={`${SITE_URL}/og.svg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${SITE_URL}/og.svg`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <MatrixRain opacity={0.45} />

      <Nav onOpenPalette={() => setPaletteOpen(true)} />

      <main className="relative">
        <Hero onOpenTerminal={() => setTerminalOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Floating terminal launcher */}
      <button
        onClick={() => setTerminalOpen(true)}
        aria-label="Open interactive terminal"
        className="fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-matrix bg-bg/80 text-matrix backdrop-blur transition hover:bg-matrix/15 hover:text-glow"
      >
        <TerminalSquare className="h-5 w-5" />
      </button>

      <CommandPalette
        open={paletteOpen}
        setOpen={setPaletteOpen}
        onOpenTerminal={() => setTerminalOpen(true)}
      />
      <InteractiveTerminal open={terminalOpen} setOpen={setTerminalOpen} />
    </>
  );
}

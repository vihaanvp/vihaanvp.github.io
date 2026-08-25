import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Download, ExternalLink, Github, BookOpen } from "lucide-react";
import Navigation from "@/components/Navigation";
import SectionTitle from "@/components/SectionTitle";
import Footer from "@/components/Footer";
import { papermcPlugins, type PaperMcPlugin } from "@/data/papermcPlugins";

const PluginLogo = ({ plugin, className = "h-16 w-16" }: { plugin: PaperMcPlugin; className?: string }) => (
  <img
    src={plugin.logo}
    alt={`${plugin.name} logo`}
    className={`${className} rounded-lg object-contain bg-background/50 border border-primary/20 p-1.5`}
    onError={(e) => {
      (e.target as HTMLImageElement).style.display = "none";
    }}
  />
);

const MetaChip = ({ children }: { children: React.ReactNode }) => (
  <span className="px-2 py-0.5 rounded text-xs bg-primary/20 text-primary whitespace-nowrap">{children}</span>
);

export { PluginLogo };

const PluginCard = ({ plugin }: { plugin: PaperMcPlugin }) => (
  <div className="group relative bg-card border border-primary/30 rounded-lg p-6 hover:border-primary hover:bg-primary/10 transition-all duration-300 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
    <div className="relative">
      <div className="flex items-start gap-4 mb-4">
        <PluginLogo plugin={plugin} />
        <div className="min-w-0">
          <h3 className="text-xl md:text-2xl font-semibold mb-1 group-hover:text-primary transition-colors flex flex-wrap items-center gap-2">
            {plugin.name}
            {plugin.status === "discontinued" && (
              <span className="px-2 py-0.5 rounded text-xs bg-yellow-500/20 text-yellow-400">No longer updated</span>
            )}
          </h3>
          <p className="text-sm text-foreground/70 leading-relaxed">{plugin.tagline}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        <MetaChip>{plugin.mcVersions}</MetaChip>
        {typeof plugin.downloads === "number" && (
          <MetaChip>
            <Download className="inline w-3 h-3 mr-1 -mt-0.5" />
            {plugin.downloads.toLocaleString()} downloads
          </MetaChip>
        )}
      </div>

      <ul className="space-y-1 mb-5">
        {plugin.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2 text-sm text-foreground/80">
            <span className="text-primary mt-0.5">▹</span>
            {h}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3 text-sm relative z-20">
        <Link
          to={`/papermc-plugins/${plugin.slug}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300 font-medium"
        >
          View Plugin
        </Link>
        {plugin.modrinthUrl && (
          <a href={plugin.modrinthUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-primary/40 rounded-lg hover:bg-primary/20 transition-colors duration-300">
            <Download className="w-4 h-4" /> Download
          </a>
        )}
        <a href={plugin.githubUrl} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-foreground/60 hover:text-primary transition-colors duration-300">
          <Github className="w-4 h-4" /> Source <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Stretched link: whole card navigates to the plugin page */}
      <Link
        to={`/papermc-plugins/${plugin.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`View ${plugin.name}`}
      />
    </div>
  </div>
);

const PaperMcPlugins = () => {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    document.title = "PaperMC Plugins | VihaanVP's Hideout";
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-fade-in-up");
        });
      },
      { threshold: 0.1 }
    );
    sectionsRef.current.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section ref={(el) => (sectionsRef.current[0] = el)} className="pt-24 sm:pt-32 pb-8 px-4 sm:px-6 opacity-0">
        <div className="container mx-auto max-w-4xl">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-float pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "2s" }} />
            <SectionTitle className="relative z-10 mb-6">papermc plugins:</SectionTitle>
            <p className="text-lg md:text-xl leading-relaxed text-foreground/90 relative z-10">
              Plugins I've built for Minecraft servers — free to download on Modrinth.
              <br /><br />
              Drop the file into your server's <span className="text-primary font-mono">plugins</span> folder, restart,
              and you're done. Click any plugin below to see what it does, how to craft its items, and how to install it.
            </p>
          </div>
        </div>
      </section>

      {/* Plugin cards */}
      <section ref={(el) => (sectionsRef.current[1] = el)} className="pt-8 pb-12 px-4 sm:px-6 opacity-0">
        <div className="container mx-auto max-w-4xl space-y-8">
          {papermcPlugins.map((p) => (
            <PluginCard key={p.slug} plugin={p} />
          ))}
        </div>
      </section>

      {/* Wiki note */}
      <section ref={(el) => (sectionsRef.current[2] = el)} className="pb-12 px-4 sm:px-6 opacity-0">
        <div className="container mx-auto max-w-4xl">
          <a
            href="https://github.com/vihaanvp/Gemstone-Plugin/wiki"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Looking for deep documentation? The Gemstone Plugin has a full wiki on GitHub.
            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </section>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <Footer />
      </div>
    </div>
  );
};

export default PaperMcPlugins;

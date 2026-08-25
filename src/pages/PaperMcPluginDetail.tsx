import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Download, ExternalLink, Github, BookOpen, Info, TriangleAlert } from "lucide-react";
import Navigation from "@/components/Navigation";
import SectionTitle from "@/components/SectionTitle";
import Footer from "@/components/Footer";
import { papermcPlugins, type PaperMcPlugin, type PluginSection } from "@/data/papermcPlugins";
import { PluginLogo } from "./PaperMcPlugins";

const MetaChip = ({ children }: { children: React.ReactNode }) => (
  <span className="px-2.5 py-1 rounded text-xs bg-primary/20 text-primary whitespace-nowrap">{children}</span>
);

const SectionRenderer = ({ section }: { section: PluginSection }) => {
  switch (section.kind) {
    case "text":
      return (
        <div className="mb-8">
          {section.title && (
            <h2 className="text-sm uppercase tracking-wider text-primary mb-3 font-semibold">{section.title}</h2>
          )}
          <div className="space-y-3">
            {section.body.map((p, i) => (
              <p key={i} className="text-foreground/85 leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      );
    case "list":
      return (
        <div className="mb-8">
          <h2 className="text-sm uppercase tracking-wider text-primary mb-3 font-semibold">{section.title}</h2>
          <ul className="space-y-2">
            {section.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="text-primary mt-1">▹</span>
                <span className="text-foreground/80 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "table":
      return (
        <div className="mb-8">
          <h2 className="text-sm uppercase tracking-wider text-primary mb-3 font-semibold">{section.title}</h2>
          <div className="overflow-x-auto rounded-lg border border-primary/20">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary/10">
                  {section.headers.map((h) => (
                    <th key={h} className="text-left px-4 py-2.5 text-primary font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-background/40" : ""}>
                    {row.map((cell, j) => (
                      <td key={j} className={`px-4 py-2.5 align-top ${j === 0 ? "text-foreground font-medium" : "text-foreground/75"}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case "images":
      return (
        <div className="mb-8">
          <h2 className="text-sm uppercase tracking-wider text-primary mb-3 font-semibold">{section.title}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {section.images.map((img) => (
              <figure key={img.src} className="group/img">
                <a href={img.src} target="_blank" rel="noopener noreferrer">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full rounded-lg border border-primary/20 bg-background/60 p-2 hover:border-primary/60 hover:scale-[1.03] transition-all duration-300"
                  />
                </a>
                <figcaption className="mt-1.5 text-xs text-muted-foreground text-center">{img.alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      );
    case "note": {
      const warn = section.tone === "warn";
      const Icon = warn ? TriangleAlert : Info;
      return (
        <div
          className={`mb-8 flex items-start gap-3 rounded-lg border p-4 ${
            warn ? "border-yellow-500/30 bg-yellow-500/10" : "border-primary/30 bg-primary/10"
          }`}
        >
          <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${warn ? "text-yellow-400" : "text-primary"}`} />
          <p className="text-sm text-foreground/80 leading-relaxed">{section.body}</p>
        </div>
      );
    }
  }
};

const installSteps = (plugin: PaperMcPlugin) => [
  <>Click the <span className="text-primary font-medium">Download</span> button above to get the plugin from Modrinth.</>,
  <>Drop the downloaded <span className="text-primary font-mono">.jar</span> file into your server's <span className="text-primary font-mono">plugins</span> folder.</>,
  <>Restart your server — that's it! No configuration needed.</>,
];

const PaperMcPluginDetail = () => {
  const { slug } = useParams();
  const plugin = papermcPlugins.find((p) => p.slug === slug);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    document.title = plugin ? `${plugin.name} | VihaanVP's Hideout` : "Plugin not found | VihaanVP's Hideout";
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
  }, [plugin]);

  if (!plugin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4 pt-24 pb-12 text-center">
          <SectionTitle>plugin not found:</SectionTitle>
          <p className="text-foreground/70">That plugin doesn't exist (or hasn't been added yet).</p>
          <Link to="/papermc-plugins"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to all plugins
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section ref={(el) => (sectionsRef.current[0] = el)} className="pt-24 sm:pt-32 pb-8 px-4 sm:px-6 opacity-0">
        <div className="container mx-auto max-w-4xl">
          <Link to="/papermc-plugins"
            className="inline-flex items-center gap-1.5 text-sm text-foreground/60 hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> all plugins
          </Link>
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-float pointer-events-none" />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-6 mb-6">
              <PluginLogo plugin={plugin} className="h-24 w-24 shrink-0" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 flex flex-wrap items-center gap-3">
                  <span className="glow-text">{plugin.name}</span>
                  {plugin.status === "discontinued" && (
                    <span className="px-2 py-0.5 rounded text-xs bg-yellow-500/20 text-yellow-400">No longer updated</span>
                  )}
                </h1>
                <p className="text-lg text-foreground/80 leading-relaxed">{plugin.tagline}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <MetaChip>{plugin.mcVersions}</MetaChip>
                  <MetaChip>PaperMC server plugin</MetaChip>
                  {typeof plugin.downloads === "number" && (
                    <MetaChip>{plugin.downloads.toLocaleString()} downloads</MetaChip>
                  )}
                  <MetaChip>{plugin.license}</MetaChip>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 relative z-10">
              {plugin.modrinthUrl && (
                <a href={plugin.modrinthUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300 font-medium text-sm">
                  <Download className="w-4 h-4" /> Download on Modrinth
                </a>
              )}
              <a href={plugin.githubUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-primary/40 rounded-lg hover:bg-primary/20 transition-colors duration-300 text-sm">
                <Github className="w-4 h-4" /> Source Code <ExternalLink className="w-3 h-3" />
              </a>
              {plugin.wikiUrl && (
                <a href={plugin.wikiUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-primary/40 rounded-lg hover:bg-primary/20 transition-colors duration-300 text-sm">
                  <BookOpen className="w-4 h-4" /> Full Wiki <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section ref={(el) => (sectionsRef.current[1] = el)} className="pt-8 pb-12 px-4 sm:px-6 opacity-0">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-card border border-primary/30 rounded-lg p-6 md:p-8 mb-10">
            <h2 className="text-sm uppercase tracking-wider text-primary mb-4 font-semibold">// how to install</h2>
            <ol className="space-y-3">
              {installSteps(plugin).map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-semibold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-foreground/85 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {plugin.sections.map((s, i) => (
            <SectionRenderer key={i} section={s} />
          ))}

          {plugin.wikiUrl && (
            <a
              href={plugin.wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Looking for deep documentation? {plugin.name} has a full wiki on GitHub.
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </a>
          )}
        </div>
      </section>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <Footer />
      </div>
    </div>
  );
};

export default PaperMcPluginDetail;

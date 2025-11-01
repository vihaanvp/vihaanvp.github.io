import { useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import SectionTitle from "@/components/SectionTitle";
import Footer from "@/components/Footer";

const Projects = () => {
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: "My Portfolio Website",
      links: [
        { label: "Live", href: "https://vihaanvp.me" },
        { label: "Source", href: "https://github.com/vihaanvp/vihaanvp.github.io" },
      ],
      description: "A personal website to showcase my projects, certificates, and more.",
    },
    {
      title: "EchoAI",
      links: [
        { label: "Live", href: "https://discord.com/oauth2/authorize?client_id=1392126766272876647&permissions=277025639488&integration_type=0&scope=applications.commands+bot" },
        { label: "Source", href: "https://github.com/vihaanvp/EchoAI" },
      ],
      description: "A Discord bot that uses AI to generate responses based on user input and can also generate images.",
    },
    {
      title: "DJ Boi",
      links: [
        { label: "Live", href: "https://discord.com/oauth2/authorize?client_id=1392166254021836882&permissions=3147776&scope=bot%20applications.commands" },
        { label: "Source", href: "https://github.com/vihaanvp/DJ-Boi" },
      ],
      description: "A Discord bot that plays music from YouTube using yt-dlp and FFmpeg.",
    },
    {
      title: "Minecraft Content",
      links: [
        { label: "Modrinth", href: "https://modrinth.com/user/VihaanVP" },
      ],
      description: "Various things I made for Minecraft, including plugins and mods.",
    },
    {
      title: "MediBot",
      links: [
        { label: "Not Yet Released", href: "javascript:void(0)" },
      ],
      description: "To help the elderly and chronic patients avoid missed doses.",
    },
    {
      title: "Home Farmer",
      links: [
        { label: "Webpage", href: "https://therooftopfarmers.org/home-farmer" },
        { label: "Source", href: "https://github.com/The-Rooftop-Farmers/home-farmer" },
      ],
      description: "A semi-automatic robot that helps grow fresh food at home.",
    },
    {
      title: "The Rooftop Farmers Website",
      links: [
        { label: "Live", href: "https://therooftopfarmers.org" },
        { label: "Source", href: "https://github.com/The-Rooftop-Farmers/The-Rooftop-Farmers.github.io" },
      ],
      description: "More information about \"a Team of 2 Students who want to make the world a better place.\"",
    },
    {
      title: "Line Follower",
      links: [
        { label: "GitHub", href: "https://github.com/vihaanvp/line-follower" },
      ],
      description: "A robot that uses IR sensors to follow a line on the ground.",
    },
    {
      title: "UploadNotifier",
      links: [
        { label: "Live", href: "https://discord.com/oauth2/authorize?client_id=1391635902194782289&permissions=2147699712&integration_type=0&scope=bot+applications.commands" },
        { label: "Source", href: "https://github.com/vihaanvp/UploadNotifier" },
      ],
      description: "A Discord bot that notifies users about new uploads on YouTube channels and Twitch streams.",
    },
    {
      title: "Other Experiments",
      links: [
        { label: "GitHub", href: "https://github.com/vihaanvp?tab=repositories" },
      ],
      description: "A collection of of my other works and results of following tutorials.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <SectionTitle>my works & projects:</SectionTitle>
          
          <ul className="space-y-6">
            {projects.map((project, index) => (
              <li
                key={index}
                ref={(el) => (itemsRef.current[index] = el)}
                className="group p-6 bg-card border border-primary/20 rounded-lg hover:border-primary hover:shadow-[0_0_30px_hsl(var(--glow-primary)/0.2)] transition-all duration-500 opacity-0"
              >
                <div className="mb-2">
                  <strong className="text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </strong>
                  <span className="text-muted-foreground mx-2">—</span>
                  {project.links.map((link, i) => (
                    <span key={i}>
                      {i > 0 && <span className="text-muted-foreground mx-2">|</span>}
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline glow-text"
                      >
                        {link.label}
                      </a>
                    </span>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="container mx-auto max-w-4xl px-6">
        <Footer />
      </div>
    </div>
  );
};

export default Projects;

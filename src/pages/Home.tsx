import { useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import SectionTitle from "@/components/SectionTitle";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";

const Home = () => {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

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

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className="pt-24 sm:pt-32 pb-8 px-4 sm:px-6 opacity-0"
      >
        <div className="container mx-auto max-w-4xl">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
            
            <SectionTitle className="relative z-10 mb-6">who I am</SectionTitle>
            
            <p className="text-lg md:text-xl leading-relaxed text-foreground/90 relative z-10">
              Hi! I'm Vihaan, a 10th-grade student who loves gaming, building cool robotics stuff, and coding smart solutions.
              <br /><br />
              I also like to integrate my coding knowledge to help me in gaming, such as building plugins for Minecraft using Java,
              using Python to make scripts, and more!
            </p>
          </div>
        </div>
      </section>

      {/* Facts Section */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className="pt-8 pb-12 px-4 sm:px-6 opacity-0"
      >
        <div className="container mx-auto max-w-4xl">
          <SectionTitle>some facts about me:</SectionTitle>
          <ul className="space-y-4">
            {[
              "I am a living human.",
              "I love everything about the tech world.",
              <>
                <a
                  href="https://minecraft.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline glow-text"
                >
                  Minecraft
                </a>{" "}
                is my favorite game.
              </>,
            ].map((fact, index) => (
              <li
                key={index}
                className="flex items-start gap-3 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-primary mt-1 group-hover:scale-125 transition-transform duration-300">▹</span>
                <span className="text-foreground/80">{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Socials Section */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        className="pt-8 pb-12 px-4 sm:px-6 opacity-0"
      >
        <div className="container mx-auto max-w-4xl">
          <SectionTitle>places to find me:</SectionTitle>
          <SocialLinks />
        </div>
      </section>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <Footer />
      </div>
    </div>
  );
};

export default Home;

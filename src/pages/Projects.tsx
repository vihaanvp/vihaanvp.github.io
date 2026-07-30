import { useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import SectionTitle from "@/components/SectionTitle";
import Footer from "@/components/Footer";

const Projects = () => {
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

            <SectionTitle className="relative z-10 mb-6">my projects</SectionTitle>

            <p className="text-lg md:text-xl leading-relaxed text-foreground/90 relative z-10">
              Here's where I turn ideas into things that actually move (and grow).
              <br />
              <br />
              From robotics to web stuff, these are the projects I've poured my time into.
              I'm always building more — check back soon!
            </p>
          </div>
        </div>
      </section>

      {/* Home Farmer — Dedicated Section */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className="pt-8 pb-12 px-4 sm:px-6 opacity-0"
      >
        <div className="container mx-auto max-w-4xl">
          <SectionTitle>home farmer:</SectionTitle>

          {/* Main featured card */}
          <div className="group relative bg-card border border-primary/30 rounded-lg p-6 md:p-8 hover:border-primary hover:bg-primary/10 transition-all duration-300 overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <div className="relative">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-2 group-hover:text-primary">
                    Home Farmer
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">Embedded C</span>
                    <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">Arduino</span>
                    <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">Robotics</span>
                    <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">3D Printing</span>
                  </div>
                </div>
                <a
                  href="https://the-rooftop-farmers.github.io/home-farmer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300 font-medium text-sm whitespace-nowrap"
                >
                  View Project Page
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
              </div>

              <p className="text-foreground/90 mb-6 leading-relaxed">
                A semi-automatic plant-care robot designed to monitor and maintain
                optimal growing conditions for small-scale indoor farming. Built for
                the{" "}
                <span className="text-primary font-medium">World Robot Olympiad</span>
                , Home Farmer uses a bunch of sensors and coding logic to automate
                irrigation and environmental monitoring — bringing fresh, healthy
                vegetables right into the home.
              </p>

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-sm uppercase tracking-wider text-primary mb-3 font-semibold">
                  // features
                </h4>
                <ul className="space-y-2">
                  {[
                    "Soil moisture detection with automatic water pumping",
                    "Temperature and humidity monitoring (DHT11)",
                    "LCD/LED status indicators with menu navigation",
                    "Manual function calling via rotary encoder",
                    "Custom 3D-printed chassis with CNC-driven XY motion",
                    "Completely customizable hardware & code",
                  ].map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <span className="text-primary mt-1">▹</span>
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="mb-6">
                <h4 className="text-sm uppercase tracking-wider text-primary mb-3 font-semibold">
                  // tech stack
                </h4>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  <span className="text-foreground">Language:</span> Embedded C
                  <br />
                  <span className="text-foreground">IDE:</span> Arduino IDE
                  <br />
                  <span className="text-foreground">Hardware:</span> Arduino UNO,
                  CNC Shield V3, NEMA 17 stepper motors, DRV8825 drivers, DHT11,
                  Soil Moisture Sensor, DS1307 RTC, Water Pump, Servo Motor
                </p>
              </div>

              {/* Credits */}
              <div className="pt-6 border-t border-primary/20">
                <h4 className="text-sm uppercase tracking-wider text-primary mb-3 font-semibold">
                  // credits
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Mentor</p>
                    <p className="text-foreground/90">Malhar Ashtaputre</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">
                      Students (The Rooftop Farmers)
                    </p>
                    <p className="text-foreground/90">
                      Vihaan Parlikar
                      <br />
                      Yogeshwar Deshmukh
                    </p>
                  </div>
                </div>
              </div>

              {/* GitHub link */}
              <div className="pt-6 mt-6 border-t border-primary/20">
                <a
                  href="https://github.com/The-Rooftop-Farmers/home-farmer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors duration-300 text-sm group/link"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="group-hover/link:underline">
                    github.com/The-Rooftop-Farmers/home-farmer
                  </span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <Footer />
      </div>
    </div>
  );
};

export default Projects;

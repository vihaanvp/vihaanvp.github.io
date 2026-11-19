import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SectionTitle from "@/components/SectionTitle";
import Footer from "@/components/Footer";

const GitHubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const ExternalLinkIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const Tag = ({ label, variant = "default" }: { label: string; variant?: "default" | "wip" | "featured" }) => (
  <span className={`px-2 py-1 rounded text-xs ${
    variant === "wip" ? "bg-yellow-500/20 text-yellow-400" :
    variant === "featured" ? "bg-primary/20 text-primary font-medium" :
    "bg-primary/20 text-primary"
  }`}>
    {label}
  </span>
);

const FeaturedCard = ({ name, desc, tags, ghUrl, extUrl, extLabel, featured }: {
  name: string; desc: string; tags: string[]; ghUrl: string; extUrl?: string; extLabel?: string; featured?: boolean;
}) => (
  <div className="group relative bg-card border border-primary/30 rounded-lg p-6 md:p-8 hover:border-primary hover:bg-primary/10 transition-all duration-300 overflow-hidden mb-8">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
    <div className="relative">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-2xl md:text-3xl font-semibold mb-2 group-hover:text-primary flex items-center gap-3">
            {name}
            {featured && <Tag label="Featured" variant="featured" />}
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map(t => <Tag key={t} label={t} />)}
          </div>
        </div>
        {extUrl && (
          <a href={extUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300 font-medium text-sm whitespace-nowrap">
            {extLabel || "View Project"} <ExternalLinkIcon />
          </a>
        )}
      </div>
      <p className="text-foreground/90 mb-6 leading-relaxed">{desc}</p>
      <div className="pt-6 border-t border-primary/20">
        <a href={ghUrl} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors duration-300 text-sm group/link">
          <GitHubIcon />
          <span className="group-hover/link:underline">{ghUrl}</span>
          <ExternalLinkIcon />
        </a>
      </div>
    </div>
  </div>
);

const SubCard = ({ name, desc, tags, ghUrl, extUrl, extLabel }: {
  name: string; desc: string; tags: string[]; ghUrl: string; extUrl?: string; extLabel?: string;
}) => (
  <div className="bg-background/50 border border-primary/20 rounded-lg p-4 hover:border-primary/50 transition-all duration-300 group/sub">
    <h4 className="font-semibold text-foreground mb-1 group-hover/sub:text-primary transition-colors">{name}</h4>
    <p className="text-sm text-foreground/70 mb-3 leading-relaxed">{desc}</p>
    <div className="flex flex-wrap gap-1.5 mb-3">
      {tags.map(t => <Tag key={t} label={t} />)}
    </div>
    <div className="flex flex-wrap gap-2">
      <a href={ghUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-foreground/60 hover:text-primary transition-colors">
        <GitHubIcon className="w-3.5 h-3.5" />
        Repository
        <ExternalLinkIcon className="w-2.5 h-2.5" />
      </a>
      {extUrl && (
        <a href={extUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-foreground/60 hover:text-primary transition-colors">
          {extLabel || "Project Page"}
          <ExternalLinkIcon className="w-2.5 h-2.5" />
        </a>
      )}
    </div>
  </div>
);

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

      {/* Hero */}
      <section ref={(el) => (sectionsRef.current[0] = el)} className="pt-24 sm:pt-32 pb-8 px-4 sm:px-6 opacity-0">
        <div className="container mx-auto max-w-4xl">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-float pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "2s" }} />
            <SectionTitle className="relative z-10 mb-6">my projects</SectionTitle>
            <p className="text-lg md:text-xl leading-relaxed text-foreground/90 relative z-10">
              Here's where I turn ideas into things that actually move (and grow).
              <br /><br />
              From robotics to web stuff, these are the projects I've poured my time into.
              I'm always building more — check back soon!
            </p>
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ─── */}
      <section ref={(el) => (sectionsRef.current[1] = el)} className="pt-8 pb-12 px-4 sm:px-6 opacity-0">
        <div className="container mx-auto max-w-4xl">
          <SectionTitle>featured projects:</SectionTitle>
          <p className="text-foreground/70 mb-8 text-center max-w-2xl mx-auto">
            These are the projects I'm most proud of — the ones that best represent my skills in robotics, embedded systems, and full-stack development.
          </p>
          <div className="space-y-8">
            <FeaturedCard
              name="Home Farmer"
              desc="A semi-automatic plant-care robot designed to monitor and maintain optimal growing conditions for small-scale indoor farming. Built for the World Robot Olympiad, it uses sensors and custom logic to automate irrigation and environmental monitoring — bringing fresh, healthy vegetables right into the home."
              tags={["Embedded C", "Arduino", "Robotics", "3D Printing", "CNC"]}
              ghUrl="https://github.com/The-Rooftop-Farmers/home-farmer"
              extUrl="https://the-rooftop-farmers.github.io/home-farmer/"
              extLabel="View Project Page"
              featured={true}
            />
            <FeaturedCard
              name="MediBot"
              desc="An ESP8266-based automated medication dispenser for elderly and chronic illness patients. Features web-based scheduling (one-time, daily, weekly, hourly), NTP time sync, stepper motor dispensing, buzzer+LED alarm with ACK button, and persistent LittleFS storage. Built with WiFiManager for zero-config WiFi setup."
              tags={["C++", "ESP8266", "Robotics", "IoT", "Healthcare", "Web Interface"]}
              ghUrl="https://github.com/vihaanvp/MediBot"
              featured={true}
            />
          </div>
        </div>
      </section>

      {/* ─── HOME FARMER ─── */}
      <section ref={(el) => (sectionsRef.current[2] = el)} className="pt-8 pb-12 px-4 sm:px-6 opacity-0">
        <div className="container mx-auto max-w-4xl">
          <SectionTitle>home farmer:</SectionTitle>
          <div className="group relative bg-card border border-primary/30 rounded-lg p-6 md:p-8 hover:border-primary hover:bg-primary/10 transition-all duration-300 overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <div className="relative">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-2 group-hover:text-primary">Home Farmer</h3>
                  <div className="flex flex-wrap gap-2">
                    <Tag label="Embedded C" />
                    <Tag label="Arduino" />
                    <Tag label="Robotics" />
                    <Tag label="3D Printing" />
                  </div>
                </div>
                <a href="https://the-rooftop-farmers.github.io/home-farmer/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300 font-medium text-sm whitespace-nowrap">
                  View Project Page <ExternalLinkIcon />
                </a>
              </div>
              <p className="text-foreground/90 mb-6 leading-relaxed">
                A semi-automatic plant-care robot designed to monitor and maintain optimal growing conditions for small-scale indoor farming. Built for the{" "}
                <span className="text-primary font-medium">World Robot Olympiad</span>, Home Farmer uses a bunch of sensors and coding logic to automate irrigation and environmental monitoring — bringing fresh, healthy vegetables right into the home.
              </p>
              <div className="mb-6">
                <h4 className="text-sm uppercase tracking-wider text-primary mb-3 font-semibold">// features</h4>
                <ul className="space-y-2">
                  {[
                    "Soil moisture detection with automatic water pumping",
                    "Temperature and humidity monitoring (DHT11)",
                    "LCD/LED status indicators with menu navigation",
                    "Manual function calling via rotary encoder",
                    "Custom 3D-printed chassis with CNC-driven XY motion",
                    "Completely customizable hardware & code",
                  ].map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-primary mt-1">▹</span>
                      <span className="text-foreground/80">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-6">
                <h4 className="text-sm uppercase tracking-wider text-primary mb-3 font-semibold">// tech stack</h4>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  <span className="text-foreground">Language:</span> Embedded C<br />
                  <span className="text-foreground">IDE:</span> Arduino IDE<br />
                  <span className="text-foreground">Hardware:</span> Arduino UNO, CNC Shield V3, NEMA 17 stepper motors, DRV8825 drivers, DHT11, Soil Moisture Sensor, DS1307 RTC, Water Pump, Servo Motor
                </p>
              </div>
              <div className="pt-6 border-t border-primary/20">
                <h4 className="text-sm uppercase tracking-wider text-primary mb-3 font-semibold">// credits</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Mentor</p>
                    <p className="text-foreground/90">Malhar Ashtaputre</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Students (The Rooftop Farmers)</p>
                    <p className="text-foreground/90">Vihaan Parlikar<br />Yogeshwar Deshmukh</p>
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-primary/20">
                <a href="https://github.com/The-Rooftop-Farmers/home-farmer" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors duration-300 text-sm group/link">
                  <GitHubIcon />
                  <span className="group-hover/link:underline">github.com/The-Rooftop-Farmers/home-farmer</span>
                  <ExternalLinkIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MEDIBOT ─── */}
      <section ref={(el) => (sectionsRef.current[3] = el)} className="pt-8 pb-12 px-4 sm:px-6 opacity-0">
        <div className="container mx-auto max-w-4xl">
          <SectionTitle>medibot:</SectionTitle>
          <div className="group relative bg-card border border-primary/30 rounded-lg p-6 md:p-8 hover:border-primary hover:bg-primary/10 transition-all duration-300 overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <div className="relative">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-2 group-hover:text-primary">MediBot</h3>
                  <div className="flex flex-wrap gap-2">
                    <Tag label="C++" />
                    <Tag label="ESP8266" />
                    <Tag label="Robotics" />
                    <Tag label="IoT" />
                    <Tag label="Healthcare" />
                  </div>
                </div>
                <a href="https://github.com/vihaanvp/MediBot" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300 font-medium text-sm whitespace-nowrap">
                  View Repository <ExternalLinkIcon />
                </a>
              </div>
              <p className="text-foreground/90 mb-6 leading-relaxed">
                An automated medication dispenser for elderly and chronic illness patients. Built on ESP8266/NodeMCU with a stepper motor (ULN2003) for precise pill dispensing. Features a full web-based scheduling interface (one-time, daily, weekly, hourly, every minute), NTP time sync with IST timezone, buzzer + external LED alarm with ACK button, persistent LittleFS storage, and WiFiManager for zero-config WiFi setup.
              </p>
              <div className="mb-6">
                <h4 className="text-sm uppercase tracking-wider text-primary mb-3 font-semibold">// features</h4>
                <ul className="space-y-2">
                  {[
                    "Stepper motor dispensing with configurable steps per section",
                    "Web UI for schedule management — no app needed",
                    "Multiple schedule types: one-time, daily, weekly, hourly, every minute",
                    "NTP time sync (UTC+5:30 IST) with dual NTP servers",
                    "Alarm system: buzzer + external LED blink until ACK button pressed",
                    "Emergency stop via web UI",
                    "Persistent schedule storage in LittleFS (survives reboot)",
                    "WiFiManager captive portal for easy WiFi configuration",
                    "Responsive dark-mode web interface with real-time status",
                    "3D-printable enclosure designs included",
                  ].map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-primary mt-1">▹</span>
                      <span className="text-foreground/80">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-6">
                <h4 className="text-sm uppercase tracking-wider text-primary mb-3 font-semibold">// tech stack</h4>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  <span className="text-foreground">Language:</span> C++ (Arduino/ESP8266)<br />
                  <span className="text-foreground">MCU:</span> ESP8266 (NodeMCU)<br />
                  <span className="text-foreground">Motor:</span> 28BYJ-48 stepper + ULN2003 driver<br />
                  <span className="text-foreground">Storage:</span> LittleFS (flash filesystem)<br />
                  <span className="text-foreground">Network:</span> WiFiManager, NTP (pool.ntp.org, time.google.com)<br />
                  <span className="text-foreground">Libraries:</span> AccelStepper, ESP8266WiFi, ESP8266WebServer, WiFiManager
                </p>
              </div>
              <div className="mb-6">
                <h4 className="text-sm uppercase tracking-wider text-primary mb-3 font-semibold">// hardware</h4>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  <span className="text-foreground">MCU:</span> NodeMCU ESP8266<br />
                  <span className="text-foreground">Stepper:</span> 28BYJ-48 5V + ULN2003 driver board<br />
                  <span className="text-foreground">Buzzer:</span> Active buzzer on D7<br />
                  <span className="text-foreground">External LED:</span> 5mm LED + 220-330Ω resistor on D8<br />
                  <span className="text-foreground">ACK Button:</span> Tactile switch on D4 (GPIO0) with INPUT_PULLUP<br />
                  <span className="text-foreground">Power:</span> 5V USB or external 5V supply
                </p>
              </div>
              <div className="pt-6 border-t border-primary/20 mt-6">
                <a href="https://github.com/vihaanvp/MediBot" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors duration-300 text-sm group/link">
                  <GitHubIcon />
                  <span className="group-hover/link:underline">github.com/vihaanvp/MediBot</span>
                  <ExternalLinkIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      


      {/* ─── LINE FOLLOWER ─── */}
      <section ref={(el) => (sectionsRef.current[5] = el)} className="pt-8 pb-12 px-4 sm:px-6 opacity-0">
        <div className="container mx-auto max-w-4xl">
          <SectionTitle>line-follower:</SectionTitle>
          <div className="group relative bg-card border border-primary/30 rounded-lg p-6 md:p-8 hover:border-primary hover:bg-primary/10 transition-all duration-300 overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <div className="relative">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-2 group-hover:text-primary">Line Follower Robot</h3>
                  <div className="flex flex-wrap gap-2">
                    <Tag label="Embedded C" />
                    <Tag label="Arduino" />
                    <Tag label="Robotics" />
                    <Tag label="Competition" />
                  </div>
                </div>
                <a href="https://vihaanvp.github.io/line-follower/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300 font-medium text-sm whitespace-nowrap">
                  View Project Page <ExternalLinkIcon />
                </a>
              </div>
              <p className="text-foreground/90 mb-6 leading-relaxed">
                A comprehensive collection of line-follower robot algorithms developed for TechRadiance 8th and 9th edition competitions. Features multiple sensor configurations, PWM speed control, obstacle avoidance, maze solving, and intersection handling.
              </p>
              <div className="mb-6">
                <h4 className="text-sm uppercase tracking-wider text-primary mb-3 font-semibold">// features</h4>
                <ul className="space-y-2">
                  {[
                    "Multiple IR sensor configurations: 2-IR, 3-IR, 4-IR",
                    "PWM speed control variants for adjustable motor speeds",
                    "Obstacle avoidance with ultrasonic (HC-SR04) and IR proximity sensors",
                    "Non-blocking avoidance with sweep scan and line re-acquisition",
                    "Maze solving with path optimization (LUR sequence simplification)",
                    "Intersection handling with 4-state state machine",
                    "LDR + LED headlight for dark tunnel navigation",
                    "Competition-proven at TechRadiance 8 & 9",
                  ].map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-primary mt-1">▹</span>
                      <span className="text-foreground/80">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-6">
                <h4 className="text-sm uppercase tracking-wider text-primary mb-3 font-semibold">// tech stack</h4>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  <span className="text-foreground">Language:</span> Embedded C<br />
                  <span className="text-foreground">IDE:</span> Arduino IDE<br />
                  <span className="text-foreground">Hardware:</span> Arduino Uno, IR sensors (2-4), HC-SR04 ultrasonic, L293D motor driver / Adafruit Motor Shield, LDR + LED
                </p>
              </div>
              <div className="pt-6 border-t border-primary/20 mt-6">
                <a href="https://github.com/vihaanvp/line-follower" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors duration-300 text-sm group/link">
                  <GitHubIcon />
                  <span className="group-hover/link:underline">github.com/vihaanvp/line-follower</span>
                  <ExternalLinkIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── RoboQuest ─── */}
      <section ref={(el) => (sectionsRef.current[6] = el)} className="pt-8 pb-12 px-4 sm:px-6 opacity-0">
        <div className="container mx-auto max-w-4xl">
          <SectionTitle>roboquest:</SectionTitle>
          <div className="group relative bg-card border border-primary/30 rounded-lg p-6 md:p-8 hover:border-primary hover:bg-primary/10 transition-all duration-300 overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <div className="relative">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-2 group-hover:text-primary">RoboQuest</h3>
                  <div className="flex flex-wrap gap-2">
                    <Tag label="C++" />
                    <Tag label="Arduino" />
                    <Tag label="Robotics" />
                    <Tag label="Competition" />
                  </div>
                </div>
              </div>
              <p className="text-foreground/90 mb-6 leading-relaxed">
                Arduino sketches developed for multiple rounds of the <span className="text-primary font-medium">Dr. Homibhabha Foundation's RoboQuest</span> competition. Covers everything from basic line following to multi-stage state machines with obstacle avoidance, U-turns, and parking maneuvers.
              </p>
              <div className="mb-6">
                <h4 className="text-sm uppercase tracking-wider text-primary mb-3 font-semibold">// features</h4>
                <ul className="space-y-2">
                  {[
                    "Multi-stage state machines with up to 10 states for objective-based rounds",
                    "Line following with 2-4 IR sensors and PWM speed control",
                    "Non-blocking obstacle avoidance with sweep scan and line re-acquisition",
                    "Parallel-pass obstacle navigation alongside obstacles",
                    "Special maneuvers: U-turn on double line detect, ultrasonic parking",
                    "Multi-objective course navigation with timed stops and bottle zones",
                    "LDR + LED headlight for dark tunnel sections",
                    "Competition-ready code with extensive Serial debug output",
                  ].map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-primary mt-1">▹</span>
                      <span className="text-foreground/80">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-6">
                <h4 className="text-sm uppercase tracking-wider text-primary mb-3 font-semibold">// tech stack</h4>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  <span className="text-foreground">Language:</span> Embedded C++<br />
                  <span className="text-foreground">IDE:</span> Arduino IDE<br />
                  <span className="text-foreground">Hardware:</span> Arduino Uno / Nano, IR sensors (2-4), HC-SR04 ultrasonic, L293D motor driver, LDR + LED
                </p>
              </div>
              <div className="pt-6 border-t border-primary/20 mt-6">
                <a href="https://github.com/vihaanvp/RoboQuest" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors duration-300 text-sm group/link">
                  <GitHubIcon />
                  <span className="group-hover/link:underline">github.com/vihaanvp/RoboQuest</span>
                  <ExternalLinkIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ARDUINO / FIRMATA ECOSYSTEM ─── */}
      <section ref={(el) => (sectionsRef.current[4] = el)} className="pt-8 pb-12 px-4 sm:px-6 opacity-0">
        <div className="container mx-auto max-w-4xl">
          <SectionTitle>arduino / firmata ecosystem:</SectionTitle>
          <div className="group relative bg-card border border-primary/30 rounded-lg p-6 md:p-8 hover:border-primary hover:bg-primary/10 transition-all duration-300 overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <div className="relative">
              <p className="text-foreground/80 mb-6 leading-relaxed text-sm">
                Supporting libraries and wrappers that evolved into MegaWrapper. These repos simplify Firmata-based control of motors and servos from Python.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SubCard
                  name="MegaWrapper"
                  desc="A Python library that makes controlling DC motors and servos on an Arduino over Firmata as simple as writing Arduino code. Published on PyPI with optional VL53L0X time-of-flight sensor support."
                  tags={["Python", "Arduino", "Firmata", "Robotics"]}
                  ghUrl="https://github.com/vihaanvp/MegaWrapper"
                  extUrl="https://pypi.org/project/megawrapper/"
                  extLabel="View on PyPI"
                />
                <SubCard
                  name="PyFirmata-Simplifier"
                  desc="Combines servo-like-arduino and motor-like-arduino with support for additional components."
                  tags={["Python", "Firmata"]}
                  ghUrl="https://github.com/vihaanvp/PyFirmata-Simplifier"
                />
                <SubCard
                  name="motor-like-arduino"
                  desc="A Python wrapper for PyFirmata2 that makes DC motor control feel like Arduino code."
                  tags={["Python", "Firmata"]}
                  ghUrl="https://github.com/vihaanvp/motor-like-arduino"
                />
                <SubCard
                  name="servo-like-arduino"
                  desc="A Python wrapper for PyFirmata2 that makes servo control feel like Arduino."
                  tags={["Python", "Firmata"]}
                  ghUrl="https://github.com/vihaanvp/servo-like-arduino"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* ─── DISCORD BOTS ─── */}
      <section ref={(el) => (sectionsRef.current[7] = el)} className="pt-8 pb-12 px-4 sm:px-6 opacity-0">
        <div className="container mx-auto max-w-4xl">
          <SectionTitle>discord bots:</SectionTitle>
          <div className="group relative bg-card border border-primary/30 rounded-lg p-6 md:p-8 hover:border-primary hover:bg-primary/10 transition-all duration-300 overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <div className="relative">
              <p className="text-foreground/80 mb-6 leading-relaxed text-sm">
                Discord bots for verification, notifications, AI chat, and music playback.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SubCard
                  name="EchoAI"
                  desc="AI chatbot for Discord with image generation capabilities."
                  tags={["Python", "AI", "Discord"]}
                  ghUrl="https://github.com/vihaanvp/EchoAI"
                />
                <SubCard
                  name="DJ-Boi"
                  desc="Music bot using yt-dlp and FFmpeg to stream YouTube audio in voice channels."
                  tags={["Python", "Discord", "Music"]}
                  ghUrl="https://github.com/vihaanvp/DJ-Boi"
                />
                <SubCard
                  name="Verifier"
                  desc="Multi-server Discord user verification bot."
                  tags={["Python", "Discord"]}
                  ghUrl="https://github.com/vihaanvp/Verifier"
                />
                <SubCard
                  name="UploadNotifier"
                  desc="Handles YouTube and Twitch upload notifications via API keys."
                  tags={["Python", "Discord"]}
                  ghUrl="https://github.com/vihaanvp/UploadNotifier"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── GAMES ─── */}
      <section ref={(el) => (sectionsRef.current[8] = el)} className="pt-8 pb-12 px-4 sm:px-6 opacity-0">
        <div className="container mx-auto max-w-4xl">
          <SectionTitle>games:</SectionTitle>
          <div className="group relative bg-card border border-primary/30 rounded-lg p-6 md:p-8 hover:border-primary hover:bg-primary/10 transition-all duration-300 overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <div className="relative">
              <p className="text-foreground/80 mb-6 leading-relaxed text-sm">
                Games built for fun, learning, and school projects — from Unity to Pygame.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SubCard
                  name="Blockifier"
                  desc="Unity game made following Brackeys' tutorial series. School project."
                  tags={["C#", "Unity"]}
                  ghUrl="https://github.com/vihaanvp/Blockifier"
                />
                <SubCard
                  name="python-snake"
                  desc="Nokia classic-style snake game built with Pygame."
                  tags={["Python", "Pygame"]}
                  ghUrl="https://github.com/vihaanvp/python-snake"
                  extUrl="https://vihaanvp.github.io/python-snake/"
                  extLabel="Play"
                />
                <SubCard
                  name="Space-Invader"
                  desc="Simple Pygame space shooter — tutorial project via Codingal."
                  tags={["Python", "Pygame"]}
                  ghUrl="https://github.com/vihaanvp/Space-Invader"
                />
                <SubCard
                  name="Tic-Tac-Toe"
                  desc="Working Tic Tac Toe built from a tutorial, with a functional exit button."
                  tags={["Python", "Pygame"]}
                  ghUrl="https://github.com/vihaanvp/Tic-Tac-Toe"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTRIBUTIONS (FORKS) ─── */}
      <section ref={(el) => (sectionsRef.current[9] = el)} className="pt-8 pb-12 px-4 sm:px-6 opacity-0">
        <div className="container mx-auto max-w-4xl">
          <SectionTitle>contributions to open-source:</SectionTitle>
          <div className="group relative bg-card border border-primary/30 rounded-lg p-6 md:p-8 hover:border-primary hover:bg-primary/10 transition-all duration-300 overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <div className="relative">
              <p className="text-foreground/80 mb-6 leading-relaxed text-sm">
                Forks of existing projects where I've contributed features, fixes, and improvements.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SubCard
                  name="Foliate4w"
                  desc="Windows port of the Foliate e-book reader (Tauri + WebView2). Added English-first localization, Simplified Chinese support, white-background toggle, and release workflow fixes."
                  tags={["JavaScript", "Tauri", "Rust", "Windows"]}
                  ghUrl="https://github.com/vihaanvp/Foliate4w"
                />
                <SubCard
                  name="Hill-Climb-Racing-Hacks"
                  desc="Open-source hack menu for Hill Climb Racing, built with Python. Optimized and documented."
                  tags={["Python", "Game"]}
                  ghUrl="https://github.com/vihaanvp/Hill-Climb-Racing-Hacks"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STANDALONE ─── */}
      <section ref={(el) => (sectionsRef.current[10] = el)} className="pt-8 pb-12 px-4 sm:px-6 opacity-0">
        <div className="container mx-auto max-w-4xl">
          <SectionTitle>other projects:</SectionTitle>
          <div className="group relative bg-card border border-primary/30 rounded-lg p-6 md:p-8 hover:border-primary hover:bg-primary/10 transition-all duration-300 overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <div className="relative">
              <p className="text-foreground/80 mb-6 leading-relaxed text-sm">
                Miscellaneous projects that don't fit neatly into the groups above.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SubCard
                  name="Typing-Speed-Tester"
                  desc="PC application for measuring typing speed with customizable sentences."
                  tags={["Python"]}
                  ghUrl="https://github.com/vihaanvp/Typing-Speed-Tester"
                />
                <SubCard
                  name="TubeTags"
                  desc="Generates optimized tags for YouTube videos to improve discoverability."
                  tags={["Python"]}
                  ghUrl="https://github.com/vihaanvp/TubeTags"
                />
                <SubCard
                  name="TaskFlow"
                  desc="Minimalistic to-do list web application."
                  tags={["Web"]}
                  ghUrl="https://github.com/vihaanvp/TaskFlow"
                />
                <SubCard
                  name="interactiveQuizApp"
                  desc="Interactive quiz webpage that plays a video before starting the quiz."
                  tags={["HTML", "JavaScript"]}
                  ghUrl="https://github.com/vihaanvp/interactiveQuizApp"
                  extUrl="https://vihaanvp.github.io/interactiveQuizApp/"
                  extLabel="View"
                />
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

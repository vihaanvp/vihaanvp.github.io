import { useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import SectionTitle from "@/components/SectionTitle";
import Footer from "@/components/Footer";

const Certificates = () => {
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

  const techCerts = [
    {
      title: "Completion of Inspirit AI Scholars Program",
      org: "Inspirit AI",
      file: "/certificates/Tech Related/Inspirit AI Scholars.pdf",
    },
    {
      title: "Android Developer Certificate",
      org: "Codingal",
      file: "/certificates/Tech Related/Basic Android Application Developer Certificate.pdf",
    },
    {
      title: "Frontend Developer Certificate",
      org: "Codingal",
      file: "/certificates/Tech Related/Frontend Developer Certificate Codingal.pdf",
    },
    {
      title: "Java Developer Certificate",
      org: "Codingal",
      file: "/certificates/Tech Related/Java Developer Certificate.pdf",
    },
    {
      title: "Minecraft - Hour of Code",
      org: "Code.org",
      file: "/certificates/Tech Related/Minecraft code.org Certificate.pdf",
    },
    {
      title: "Python Programmer",
      org: "Codingal",
      file: "/certificates/Tech Related/Python Programmer Certificate.pdf",
    },
    {
      title: "Scratch Developer",
      org: "Codingal",
      file: "/certificates/Tech Related/Scratch Developer Certificate Codingal.pdf",
    },
  ];

  const munCerts = [
    {
      title: "TAMUN 2024 Participation Certificate",
      org: "Youthika",
      file: "/certificates/MUN/TAMUN 2024 Certificate - Sunil Tatkare (Lok Sabha).pdf",
    },
  ];

  const CertificateList = ({ certs }: { certs: typeof techCerts }) => (
    <ul className="space-y-4">
      {certs.map((cert, index) => (
        <li
          key={index}
          className="group p-5 bg-card border border-primary/20 rounded-lg hover:border-primary hover:shadow-[0_0_30px_hsl(var(--glow-primary)/0.2)] transition-all duration-500"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <strong className="text-lg text-foreground group-hover:text-primary transition-colors duration-300">
            {cert.title}
          </strong>
          <br />
          <span className="text-muted-foreground text-sm">
            {cert.org}.{" "}
            <a
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline glow-text"
            >
              View Certificate
            </a>
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <section
            ref={(el) => (sectionsRef.current[0] = el)}
            className="mb-16 opacity-0"
          >
            <SectionTitle>tech related certificates:</SectionTitle>
            <CertificateList certs={techCerts} />
          </section>

          <section
            ref={(el) => (sectionsRef.current[1] = el)}
            className="opacity-0"
          >
            <SectionTitle>MUN certificates:</SectionTitle>
            <CertificateList certs={munCerts} />
          </section>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-6">
        <Footer />
      </div>
    </div>
  );
};

export default Certificates;

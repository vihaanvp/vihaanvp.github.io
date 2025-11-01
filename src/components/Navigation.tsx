import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navigation = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "home" },
    { path: "/projects", label: "projects" },
    { path: "/certificates", label: "certificates" },
    { path: "/feedback", label: "feedback" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-primary/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl md:text-3xl font-bold hover:scale-105 transition-transform duration-300"
          >
            <span className="text-pink-400">ᓚᘏᗢ</span>{" "}
            <span className="text-primary glow-text">vihaanvp.me</span>
          </Link>

          <div className="flex items-center gap-2 text-sm md:text-base">
            <span className="text-muted-foreground">/</span>
            {navLinks.map((link) => (
              <div key={link.path} className="flex items-center gap-2">
                <Link
                  to={link.path}
                  className={`relative px-3 py-1 transition-all duration-300 hover:text-primary ${
                    location.pathname === link.path
                      ? "text-primary glow-text"
                      : "text-foreground"
                  }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary glow-border"></span>
                  )}
                </Link>
                <span className="text-muted-foreground">/</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

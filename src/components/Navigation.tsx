import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navigation = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const NavLink = ({ link }: { link: typeof navLinks[0] }) => (
    <Link
      to={link.path}
      onClick={() => setMobileMenuOpen(false)}
      className={`relative px-3 py-2 transition-all duration-300 hover:text-primary block ${
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
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-primary/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-xl sm:text-2xl md:text-3xl font-bold hover:scale-105 transition-transform duration-300"
          >
            <span className="text-pink-400">ᓚᘏᗢ</span>{" "}
            <span className="text-primary glow-text">vihaanvp.me</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 text-sm md:text-base">
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

          {/* Mobile Navigation */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <button
                className="p-2 rounded-md hover:bg-secondary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6 text-foreground" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-background border-l border-primary/20">
              <div className="flex flex-col gap-2 mt-8">
                <div className="text-sm text-muted-foreground mb-4 px-3">
                  Navigation
                </div>
                {navLinks.map((link, index) => (
                  <div key={link.path}>
                    <NavLink link={link} />
                    {index < navLinks.length - 1 && (
                      <div className="border-t border-border/50 my-2"></div>
                    )}
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

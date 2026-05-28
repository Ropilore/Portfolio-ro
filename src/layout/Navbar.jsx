import { Button } from "@/components/Button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#testimonials", label: "Testimonials" },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    const sections = [
      "about",
      "projects",
      "experience",
      "testimonials",
      "contact",
    ];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
        isScrolled
          ? "glass-strong py-2 shadow-2xl"
          : "bg-transparent py-4",
      )}
    >
      {/* Premium Fading Bottom Border */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/25 to-transparent pointer-events-none"
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar with Glow */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary/80 via-primary to-primary/80 z-[110] shadow-[0_0_8px_rgba(32,178,166,0.6)]"
            style={{ width: `${scrollProgress}%` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      <nav className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="group relative flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <img
              src="/rob-logo-removebg-preview.png"
              alt="ROB Logo"
              className="w-10 h-10 md:w-12 md:h-12 object-contain relative z-10 filter drop-shadow-[0_0_8px_rgba(32,178,166,0.3)]"
            />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                href={link.href}
                key={link.href}
                className={cn(
                  "relative py-2 text-sm font-semibold transition-colors duration-300",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span>{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] z-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  >
                    {/* Main Line with Gradient */}
                    <div className="absolute inset-x-2 inset-y-0 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
                    
                    {/* Subtle Center Glow */}
                    <div className="absolute inset-x-4 inset-y-0 bg-primary/60 blur-[2px] rounded-full" />
                  </motion.div>
                )}
              </a>
            );
          })}
        </div>

        {/* Right Section: Mobile Menu Button + CTA */}
        <div className="flex items-center gap-6">
          <div className="hidden md:block">
            <a href="#contact">
              <Button
                size="sm"
                className="rounded-xl px-4 py-1.5 font-bold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:shadow-[0_0_15px_rgba(32,178,166,0.5)] active:scale-95"
              >
                 Contact Me
              </Button>
            </a>
          </div>

          <button
            className="md:hidden p-2 text-foreground cursor-pointer glass rounded-xl hover:bg-surface transition-colors"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMobileMenuOpen ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-b border-primary/20 overflow-hidden backdrop-blur-3xl"
          >
            <div className="container mx-auto px-6 py-10 flex flex-col gap-5">
              {navLinks.map((link, index) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  href={link.href}
                  key={index}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-xl font-bold p-4 rounded-xl transition-all",
                    activeSection === link.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                  )}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-6 border-t border-white/10 mt-2">
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full py-8 text-lg rounded-xl font-bold">
                    Let's Build Something Great
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

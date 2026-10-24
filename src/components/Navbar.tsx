import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Leave a review", id: "add-review" },
  { label: "Contact", id: "contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-card"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Button variant="ghost"
          onClick={() => go("home")}
          className="flex items-center gap-2 group p-0 hover:bg-transparent"
          aria-label="Sura Automations home"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="text-left leading-tight">
            <p className="font-bold text-foreground text-sm sm:text-base">Sura Automations</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Founded by Suraj Bishwokarma</p>
          </div>
        </Button>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.id}>
              <Button variant="ghost"
                onClick={() => go(l.id)}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
              >
                {l.label}
              </Button>
            </li>
          ))}
        </ul>

        <Button variant="ghost" size="icon"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="md:hidden w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </nav>

      {open && (
        <div id="mobile-navigation" className="md:hidden bg-background/95 backdrop-blur-md border-t border-border max-h-[calc(100svh-4rem)] overflow-y-auto">
          <ul className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.id}>
                <Button variant="ghost"
                  onClick={() => go(l.id)}
                  className="w-full justify-start px-4 py-3 text-foreground hover:bg-primary/10 hover:text-primary transition font-medium"
                >
                  {l.label}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

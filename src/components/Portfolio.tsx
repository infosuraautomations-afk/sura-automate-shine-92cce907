import { useState } from "react";
import { ExternalLink, LayoutGrid, ShoppingBag, GraduationCap, HeartPulse, Film } from "lucide-react";
import { Button } from "./ui/button";
import schoolPortalImg from "@/assets/portfolio-school-portal.webp";
import calorieCounterImg from "@/assets/portfolio-calorie-counter.webp";
import buzzEditImg from "@/assets/portfolio-buzzedit.webp";
import kanchanMomoImg from "@/assets/portfolio-kanchan-momo.webp";
import hygieneCafeImg from "@/assets/portfolio-hygiene-cafe.webp";
import nextokartImg from "@/assets/portfolio-nextokart.webp";

const projects = [
  {
    image: nextokartImg,
    title: "Nextokart",
    category: "E-commerce",
    group: "Commerce & food",
    description:
      "An online shop for authentic Nepali products, with cash on delivery so customers can order without worrying about card payments.",
    url: "https://nextokart.vercel.app/",
    featured: true,
  },
  {
    image: kanchanMomoImg,
    title: "Kanchan Momo",
    category: "Hotel & Restaurant",
    group: "Commerce & food",
    description:
      "A B2B ordering platform for one of Nepal's beloved momo brands — letting hotels and restaurants place wholesale orders with a clean, branded login experience.",
    url: "https://kanchanmomos.netlify.app/",
    featured: true,
  },
  {
    image: hygieneCafeImg,
    title: "Hygiene Kitchen Cafe",
    category: "Cafe & Food Delivery",
    group: "Commerce & food",
    description:
      "A vibrant online ordering site for a busy cafe in Gargare, Rupandehi — quick phone-based login and a menu built to make customers hungry on first scroll.",
    url: "https://hygienecafe.netlify.app/",
    featured: true,
  },
  {
    image: schoolPortalImg,
    title: "School Result Portal",
    category: "Education",
    group: "Education",
    description:
      "A modern result publishing platform — students log in with their parent's number to securely access their results on any device.",
    url: "https://sura-schoolportal.netlify.app/",
  },
  {
    image: calorieCounterImg,
    title: "Cal Sura — Calorie Tracker",
    category: "Health & Fitness",
    group: "Health & fitness",
    description:
      "An intelligent nutrition tracker that helps users log meals, monitor calories, and stay on top of their fitness goals.",
    url: "https://cal-sura.netlify.app",
  },
  {
    image: buzzEditImg,
    title: "Buzz Edit Agency",
    category: "Creative Agency",
    group: "Creative",
    description:
      "A bold, dark-themed website for a professional video editing agency — designed to showcase work and convert visitors into clients.",
    url: "https://buzzedit.netlify.app",
  },
];

const filters = [
  { label: "All work", icon: LayoutGrid },
  { label: "Commerce & food", icon: ShoppingBag },
  { label: "Education", icon: GraduationCap },
  { label: "Health & fitness", icon: HeartPulse },
  { label: "Creative", icon: Film },
];

export const Portfolio = () => {
  const [filter, setFilter] = useState("All work");
  const visibleProjects = projects.filter((project) => filter === "All work" || project.group === filter);
  return (
    <section id="portfolio" className="portfolio-band py-10 sm:py-14 relative overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-7 sm:space-y-10">
          <div className="space-y-3 animate-fade-in">
            <p className="text-primary text-xs font-semibold uppercase">Real projects. Different businesses.</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Websites We've Built
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
              From education and health to creative agencies and commerce — different businesses, thoughtfully built websites.
            </p>
          </div>

          <div role="group" aria-label="Filter projects by industry" className="flex flex-wrap gap-2 border-b border-border pb-5">
            {filters.map((item) => <Button key={item.label} variant={filter === item.label ? "default" : "outline"} aria-pressed={filter === item.label} onClick={() => setFilter(item.label)} className="text-xs sm:text-sm px-3">
              <item.icon aria-hidden="true" />{item.label}
            </Button>)}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {visibleProjects.map((project) => (
              <article
                key={project.url}
                className="project-card group relative rounded-lg neu border border-border/60 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
              >
                <div aria-hidden="true" className="project-browser-bar flex items-center gap-1.5 px-3 h-8 bg-card border-b border-border">
                  <span /><span /><span />
                  <span className="ml-auto text-[10px] text-muted-foreground font-mono">{new URL(project.url).hostname}</span>
                </div>
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={project.image}
                    alt={`${project.title} website preview`}
                    loading="lazy"
                    decoding="async"
                    width="960"
                    height="600"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="p-5 flex flex-col gap-4 flex-1">
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-primary uppercase">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full mt-auto group/btn border-primary/30 hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  >
                    <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} website (opens in a new tab)`}>
                      Visit Site
                      <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </Button>
                </div>
              </article>
            ))}
          </div>

          <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
            {visibleProjects.length} projects · {filter}
          </p>
        </div>
      </div>
    </section>
  );
};

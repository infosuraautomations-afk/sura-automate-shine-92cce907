import { ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import schoolPortalImg from "@/assets/portfolio-school-portal.png";
import calorieCounterImg from "@/assets/portfolio-calorie-counter.png";
import buzzEditImg from "@/assets/portfolio-buzzedit.png";
import kanchanMomoImg from "@/assets/portfolio-kanchan-momo.png";
import hygieneCafeImg from "@/assets/portfolio-hygiene-cafe.png";

const projects = [
  {
    image: kanchanMomoImg,
    title: "Kanchan Momo",
    category: "Hotel & Restaurant",
    description:
      "A B2B ordering platform for one of Nepal's beloved momo brands — letting hotels and restaurants place wholesale orders with a clean, branded login experience.",
    url: "https://kanchanmomos.netlify.app/",
    featured: true,
  },
  {
    image: hygieneCafeImg,
    title: "Hygiene Kitchen Cafe",
    category: "Cafe & Food Delivery",
    description:
      "A vibrant online ordering site for a busy cafe in Gargare, Rupandehi — quick phone-based login and a menu built to make customers hungry on first scroll.",
    url: "https://hygienecafe.netlify.app/",
    featured: true,
  },
  {
    image: schoolPortalImg,
    title: "School Result Portal",
    category: "Education",
    description:
      "A modern result publishing platform — students log in with their parent's number to securely access their results on any device.",
    url: "https://sura-schoolportal.netlify.app/",
  },
  {
    image: calorieCounterImg,
    title: "Cal Sura — Calorie Tracker",
    category: "Health & Fitness",
    description:
      "An intelligent nutrition tracker that helps users log meals, monitor calories, and stay on top of their fitness goals.",
    url: "https://cal-sura.netlify.app",
  },
  {
    image: buzzEditImg,
    title: "Buzz Edit Agency",
    category: "Creative Agency",
    description:
      "A bold, dark-themed website for a professional video editing agency — designed to showcase work and convert visitors into clients.",
    url: "https://buzzedit.netlify.app",
  },
];

export const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-background to-accent/10 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-glow/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center space-y-4 animate-fade-in">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              Our Recent Work
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Websites We've Built
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Real projects, real clients — across education, health, and creative industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative rounded-2xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 shadow-card hover:shadow-glow transition-all duration-500 hover:-translate-y-2 overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={project.image}
                    alt={`${project.title} website preview`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-card/10 to-transparent" />
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
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
                    className="w-full group/btn border-primary/30 hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  >
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      Visit Site
                      <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground italic">
            ...and many more websites built for businesses across different niches.
          </p>
        </div>
      </div>
    </section>
  );
};

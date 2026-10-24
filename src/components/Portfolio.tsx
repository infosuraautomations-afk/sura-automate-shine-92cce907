import { ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import schoolPortalImg from "@/assets/portfolio-school-portal.png";
import calorieCounterImg from "@/assets/portfolio-calorie-counter.png";
import buzzEditImg from "@/assets/portfolio-buzzedit.png";
import kanchanMomoImg from "@/assets/portfolio-kanchan-momo.png";
import hygieneCafeImg from "@/assets/portfolio-hygiene-cafe.png";
import nextokartImg from "@/assets/portfolio-nextokart.png";

const projects = [
  {
    image: nextokartImg,
    title: "Nextokart",
    category: "E-commerce",
    description:
      "An online shop for authentic Nepali products, with cash on delivery so customers can order without worrying about card payments.",
    url: "https://nextokart.vercel.app/",
    featured: true,
  },
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card group relative rounded-lg neu border border-border/60 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden animate-fade-in-up"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={project.image}
                    alt={`${project.title} website preview`}
                    loading="lazy"
                    decoding="async"
                    width="1280"
                    height="800"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="p-5 space-y-4">
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

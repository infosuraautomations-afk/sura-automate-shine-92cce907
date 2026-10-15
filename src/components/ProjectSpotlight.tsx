import { useState } from "react";
import { ArrowUpRight, Globe, GraduationCap, HeartPulse, Film, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import school from "@/assets/portfolio-school-portal.png";
import health from "@/assets/portfolio-calorie-counter.png";
import creative from "@/assets/portfolio-buzzedit.png";
import commerce from "@/assets/portfolio-kanchan-momo.png";

const work = [
  { industry: "Education", icon: GraduationCap, title: "Sura School Portal", detail: "A simpler way to publish and access school results.", image: school, url: "https://sura-schoolportal.netlify.app/" },
  { industry: "Health & fitness", icon: HeartPulse, title: "Cal Sura", detail: "Everyday nutrition tracking, made personal.", image: health, url: "https://cal-sura.netlify.app/" },
  { industry: "Creative agencies", icon: Film, title: "Buzz Edit", detail: "A digital home for work that deserves the spotlight.", image: creative, url: "https://buzzedit.netlify.app/" },
  { industry: "Commerce", icon: ShoppingBag, title: "Kanchan Momo", detail: "A branded ordering experience for business customers.", image: commerce, url: "https://kanchanmomos.netlify.app/" },
];

export const ProjectSpotlight = () => {
  const [selected, setSelected] = useState(0);
  const project = work[selected];
  return (
    <section aria-label="Project spotlight" className="relative border-y border-border bg-card/40 py-10 sm:py-14">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-primary text-xs font-semibold uppercase mb-2">Different industries. One creative partner.</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Your world, built for the web.</h2>
          </div>
          <Globe className="hidden sm:block w-8 h-8 text-muted-foreground" />
        </div>
        <div role="tablist" aria-label="Explore our industries" className="flex flex-wrap gap-2 mb-6">
          {work.map((item, index) => (
            <Button key={item.industry} role="tab" id={`industry-${index}`} aria-selected={selected === index} aria-controls="project-panel" variant={selected === index ? "default" : "outline"} onClick={() => setSelected(index)} className="text-xs sm:text-sm">
              <item.icon className="w-4 h-4" />{item.industry}
            </Button>
          ))}
        </div>
        <div id="project-panel" role="tabpanel" aria-labelledby={`industry-${selected}`} className="grid md:grid-cols-[1.65fr_1fr] gap-6 md:gap-10 items-center">
          <div className="aspect-[16/9] overflow-hidden rounded-lg border border-border bg-muted">
            <img src={project.image} alt={`${project.title} actual website screenshot`} width="1280" height="720" decoding="async" loading="lazy" className="w-full h-full object-cover object-top" />
          </div>
          <div className="space-y-4">
            <p className="text-sm text-primary">Built by Sura Automations</p>
            <h3 className="text-2xl sm:text-3xl font-semibold">{project.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{project.detail}</p>
            <Button asChild variant="outline"><a href={project.url} target="_blank" rel="noopener noreferrer">Explore live project <ArrowUpRight /></a></Button>
            <p className="text-sm text-muted-foreground border-t border-border pt-4">Startups, local businesses, established brands — your next chapter belongs here too.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
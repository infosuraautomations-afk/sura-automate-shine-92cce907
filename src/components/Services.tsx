import { Bot, Zap, Globe, BarChart3, Link2, Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const services = [
  {
    icon: Globe,
    title: "Website & App Development",
    description: "Modern, responsive websites and applications built for any niche or industry.",
    highlight: "Our Specialty",
    details: "Your website should feel like your business, not a template. We build custom websites and web apps for shops, schools, healthcare, creative agencies and more. We plan the pages around your customers, adapt them for phones and larger screens, and include search-friendly structure. The features and scope are agreed with you before work starts."
  },
  {
    icon: Bot,
    title: "AI Chatbots",
    description: "Help visitors find answers, ask questions and get in touch with your team.",
    highlight: "Helpful conversations",
    details: "A chatbot can answer common questions using information you provide, collect enquiries and help visitors take the next step. We choose the setup around your business and include a way to hand conversations to your team. AI can make mistakes, so important answers and sensitive requests need appropriate checks."
  },
  {
    icon: Zap,
    title: "Automation Systems",
    description: "Streamline repetitive tasks and workflows to save time and reduce errors.",
    highlight: "Save Time",
    details: "If your team copies the same information between tools every day, there may be a better way. We build workflows for tasks such as enquiry notifications, data entry and report preparation. We check the tools you use, define what should happen when something fails, and test the workflow with your real process."
  },
  {
    icon: BarChart3,
    title: "Smart Dashboards",
    description: "Data visualization and analytics dashboards for better business insights.",
    highlight: "Data-Driven",
    details: "Bring the numbers you actually use into one clear view. We can build dashboards for sales, enquiries or day-to-day operations, using the data sources available to your business. Updates, exports and alerts depend on the tools connected and the scope we agree together."
  },
  {
    icon: Link2,
    title: "API Integrations",
    description: "Seamlessly connect your tools and platforms for unified workflows.",
    highlight: "Seamless",
    details: "Make your tools work together instead of entering the same details twice. We connect services that offer suitable APIs, such as CRMs, payment providers and ordering systems. We review access permissions, data handling and service limitations before designing the connection."
  },
  {
    icon: Briefcase,
    title: "Business Process Automation",
    description: "End-to-end automation solutions tailored to your business needs.",
    highlight: "Custom Solutions",
    details: "We start with how your business works today: what takes time, where things get missed, and what your team needs to keep control of. Then we design a manageable workflow for tasks such as onboarding, invoicing or order handling. The aim is less repetitive work, with clear checkpoints for the people using it."
  },
];

export const Services = () => {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  const handleGetStarted = (service: typeof services[0]) => {
    setSelectedService(service);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background via-accent/5 to-background relative overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Custom websites first. Helpful chatbots and connected workflows when you need them.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-5 sm:p-6 rounded-lg bg-card border border-border hover:border-primary/50 shadow-card transition-all duration-300 hover:-translate-y-1 animate-fade-in relative overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Icon with glow effect */}
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-5 group-hover:rotate-3 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  
                  {/* Highlight badge */}
                  <span className="inline-block mb-3 text-xs font-semibold text-primary">
                    {service.highlight}
                  </span>
                  
                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => handleGetStarted(service)}
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 hover:scale-105"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Details Dialog */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-4 mb-4 min-w-0">
              {selectedService && (
                <div className="w-12 h-12 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                  <selectedService.icon className="w-8 h-8 text-primary" />
                </div>
              )}
              <div>
                <DialogTitle className="text-2xl">{selectedService?.title}</DialogTitle>
                <span className="inline-block px-3 py-1 mt-2 text-xs font-semibold text-primary bg-primary/10 rounded-full">
                  {selectedService?.highlight}
                </span>
              </div>
            </div>
            <DialogDescription className="text-base leading-relaxed text-foreground">
              {selectedService?.details}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4 mt-6">
            <Button 
              onClick={() => {
                setSelectedService(null);
                scrollToContact();
              }}
              className="flex-1"
            >
              Contact Us
            </Button>
            <Button 
              variant="outline"
              onClick={() => setSelectedService(null)}
              className="flex-1"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

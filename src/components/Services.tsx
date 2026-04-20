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
    details: "Websites are our core craft. We design and build stunning, high-performance websites and web apps for every type of business — e-commerce, restaurants, real estate, agencies, SaaS, portfolios, education, healthcare, and more. Each site is fully responsive, SEO-optimized, lightning fast, and tailored to your brand. From sleek landing pages to complex multi-page platforms with custom features, we deliver pixel-perfect results that turn visitors into loyal customers."
  },
  {
    icon: Bot,
    title: "AI Chatbots",
    description: "Intelligent conversational AI that engages customers 24/7 and automates support.",
    highlight: "24/7 Support",
    details: "Transform your customer service with AI-powered chatbots that understand context and provide instant, accurate responses. Our chatbots integrate seamlessly with your website and existing systems, handle multiple languages, and learn from every interaction to improve over time. Perfect for e-commerce, support teams, and lead generation. Reduce response times by 90% while maintaining a personal touch that keeps customers engaged and satisfied."
  },
  {
    icon: Zap,
    title: "Automation Systems",
    description: "Streamline repetitive tasks and workflows to save time and reduce errors.",
    highlight: "Save Time",
    details: "Eliminate manual work and boost productivity with intelligent automation systems. We automate data entry, report generation, email workflows, inventory management, and more. Our solutions integrate with popular tools like Excel, Google Sheets, CRM systems, and databases. Free your team to focus on strategic work while automation handles the repetitive tasks with 99.9% accuracy and lightning speed."
  },
  {
    icon: BarChart3,
    title: "Smart Dashboards",
    description: "Data visualization and analytics dashboards for better business insights.",
    highlight: "Data-Driven",
    details: "Make data-driven decisions with real-time dashboards that turn complex data into actionable insights. Our custom dashboards pull data from multiple sources, display KPIs that matter to your business, and update automatically. Track sales, monitor operations, analyze customer behavior, and measure marketing ROI—all in one beautiful, intuitive interface. Export reports, set up alerts, and access insights from anywhere."
  },
  {
    icon: Link2,
    title: "API Integrations",
    description: "Seamlessly connect your tools and platforms for unified workflows.",
    highlight: "Seamless",
    details: "Break down data silos by connecting all your business tools and platforms. We integrate CRMs, payment gateways, marketing platforms, shipping providers, accounting software, and more. Enable automatic data sync, eliminate double-entry, and create seamless workflows across your entire tech stack. Our integrations are secure, reliable, and built to scale with your business needs."
  },
  {
    icon: Briefcase,
    title: "Business Process Automation",
    description: "End-to-end automation solutions tailored to your business needs.",
    highlight: "Custom Solutions",
    details: "Optimize your entire business operations with custom-built automation workflows. We analyze your processes, identify bottlenecks, and design automation solutions that increase efficiency by up to 80%. From customer onboarding to invoicing, from inventory management to employee workflows—we create comprehensive automation systems tailored to your unique business requirements. Get detailed analytics and continuous optimization to maximize ROI."
  },
];

export const Services = () => {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGetStarted = (service: typeof services[0]) => {
    setSelectedService(service);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background via-accent/5 to-background relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-20 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tl from-primary-glow/10 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 border border-primary/10 rounded-lg rotate-12 animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive automation solutions tailored to your business needs
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 shadow-card hover:shadow-glow transition-all duration-500 hover:-translate-y-3 animate-fade-in relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Icon with glow effect */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-md group-hover:shadow-lg group-hover:shadow-primary/20">
                    <service.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  
                  {/* Highlight badge */}
                  <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-primary bg-primary/10 rounded-full">
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
            <div className="flex items-center gap-4 mb-4">
              {selectedService && (
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center">
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

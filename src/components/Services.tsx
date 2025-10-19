import { Bot, Settings, Globe, BarChart3, Link2, Briefcase } from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "AI Chatbots",
    emoji: "🤖",
    description: "Intelligent conversational AI that understands and responds to customer queries naturally, available 24/7.",
  },
  {
    icon: Settings,
    title: "Automation Systems",
    emoji: "⚙️",
    description: "End-to-end workflow automation that eliminates manual tasks and increases productivity exponentially.",
  },
  {
    icon: Globe,
    title: "Website & App Development",
    emoji: "🌐",
    description: "Beautiful, responsive websites and applications built with modern technologies and best practices.",
  },
  {
    icon: BarChart3,
    title: "Smart Dashboards",
    emoji: "📊",
    description: "Real-time data visualization and analytics dashboards that provide actionable business insights.",
  },
  {
    icon: Link2,
    title: "API Integrations",
    emoji: "🔗",
    description: "Seamlessly connect your existing tools and platforms into one unified, efficient ecosystem.",
  },
  {
    icon: Briefcase,
    title: "Business Process Automation",
    emoji: "💼",
    description: "Transform complex business processes into automated workflows that save time and reduce errors.",
  },
];

export const Services = () => {
  return (
    <section className="py-20 bg-accent/20">
      <div className="container mx-auto px-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 shadow-card hover:shadow-elegant hover:-translate-y-2 transition-all duration-300 animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-primary-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 space-y-4">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <span className="text-3xl">{service.emoji}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>

                  {/* Hover indicator */}
                  <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">Learn more</span>
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

import { Star } from "lucide-react";

const reviews = [
  { name: "Amanda Lee", role: "E-Commerce CEO", text: "Sura Automations transformed our workflow — everything runs seamlessly now." },
  { name: "Rahul Singh", role: "Digital Marketing Lead", text: "Their chatbot integration doubled our customer engagement in just two weeks." },
  { name: "Samantha Woods", role: "HR Manager", text: "Extremely professional and fast delivery. The automation saved us hours of manual work." },
  { name: "David Karki", role: "Founder, NepTech Solutions", text: "We now handle client inquiries automatically — the AI bot works perfectly." },
  { name: "Priya Sharma", role: "Startup Owner", text: "Clean design, smooth dashboard, and flawless execution. Worth every rupee." },
  { name: "Michael Rogers", role: "Sales Director", text: "Our sales process is now fully automated thanks to Sura Automations' team." },
  { name: "Anjali Gurung", role: "Blogger & Entrepreneur", text: "They turned my basic site into an intelligent system. Fantastic experience!" },
  { name: "Tom Henderson", role: "IT Consultant", text: "Excellent communication and creativity. They understood our needs instantly." },
  { name: "Neha Thapa", role: "Online Store Owner", text: "I love how easy it is to manage my store now — automation magic!" },
  { name: "Marcus Feldman", role: "Customer Support Manager", text: "The AI chatbot reduced our support tickets by 60%. Incredible result." },
  { name: "Sujan Bhandari", role: "Product Designer", text: "Smooth animations, perfect UI, and responsive design. 10/10 service." },
  { name: "Isabella Torres", role: "Business Analyst", text: "They delivered exactly what we imagined — modern, minimal, and efficient." },
  { name: "Daniel Kim", role: "Operations Head", text: "Our internal reporting now runs automatically every morning. Brilliant work!" },
  { name: "Laxmi Basnet", role: "Founder, Kavya Brands", text: "Professional, creative, and super reliable — will definitely return for more." },
  { name: "Jessica Moore", role: "Hotel Manager", text: "We saved 15+ hours weekly by automating our booking system." },
  { name: "Ravi Shrestha", role: "Real Estate Consultant", text: "Everything from design to deployment was handled smoothly. Great support!" },
  { name: "Chloe Nguyen", role: "Tech Startup CEO", text: "Finally, an automation agency that truly understands business logic." },
  { name: "Elena Perez", role: "Creative Director", text: "The animations and interface are stunning. It feels like a premium product." },
  { name: "Nabin Lama", role: "Marketing Strategist", text: "Our leads now go straight to CRM — no manual input needed. Time-saver!" },
  { name: "Kiran KC", role: "Restaurant Owner", text: "Quick turnaround and high-quality results. Loved working with the Sura team." },
  { name: "Sarah Williams", role: "Event Planner", text: "They built us an AI chatbot that feels human. Clients love it." },
  { name: "Niraj Adhikari", role: "Logistics Manager", text: "The automation dashboard is simple and powerful — exactly what we needed." },
  { name: "Luna Park", role: "Tech Entrepreneur", text: "Impressed with their professionalism and deep AI knowledge." },
  { name: "Rajesh Maharjan", role: "Auto Dealer", text: "Our website now talks to customers automatically — next-level experience." },
  { name: "Emily Stone", role: "Digital Agency Owner", text: "Reliable, innovative, and super responsive team. Highly recommend Sura Automations." },
  { name: "Alex Hughes", role: "Software Engineer", text: "They made complex automation look effortless. Beautiful UI too." },
  { name: "Manisha Subedi", role: "Freelance Designer", text: "Great communication, clean code, and perfect animations." },
  { name: "Jonathan Lee", role: "Business Consultant", text: "Working with Sura Automations was a delight — they truly bring AI to life." },
];

export const Reviews = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-accent/10 to-background overflow-hidden relative">
      {/* 3D Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" style={{ transform: 'translateZ(50px)' }} />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s', transform: 'translateZ(30px)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '0.8s', transform: 'translateZ(20px)' }} />
        
        {/* 3D Geometric shapes */}
        <div className="absolute top-40 right-20 w-32 h-32 border-2 border-primary/30 rounded-lg animate-float rotate-45" style={{ animationDelay: '0.3s', transform: 'rotateX(45deg) rotateY(45deg)' }} />
        <div className="absolute bottom-40 left-20 w-24 h-24 border-2 border-accent/30 rounded-full animate-float" style={{ animationDelay: '1s', transform: 'rotateX(30deg)' }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-6 mb-4 opacity-0 animate-fade-in">
            <div className="inline-block">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider px-4 py-1 rounded-full bg-primary/10 border border-primary/20 animate-pulse">
                Testimonials
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-scale-in">
              Our Reviews
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Real experiences from people who transformed their business with our automation solutions
            </p>
            <div className="flex justify-center gap-2 mt-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-primary text-primary animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[800px] overflow-y-auto pr-4 custom-scrollbar">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl bg-card/70 backdrop-blur-sm border border-border hover:border-primary/50 shadow-card hover:shadow-neon transition-all duration-500 opacity-0 animate-slide-fade"
                style={{ 
                  animationDelay: `${(index % 12) * 0.1}s`,
                  animationFillMode: 'forwards'
                }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-foreground leading-relaxed mb-4 text-sm">
                  "{review.text}"
                </p>

                {/* Author */}
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideFade {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-fade {
          animation: slideFade 0.6s ease-out;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: hsl(var(--muted));
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--primary));
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--primary-glow));
        }
      `}</style>
    </section>
  );
};

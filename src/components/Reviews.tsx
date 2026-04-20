import { Star } from "lucide-react";

const reviews = [
  { name: "Aakash Shrestha", role: "Founder, Himalayan Trek Co.", text: "Honestly, I was a bit nervous handing over our website to a new team — but Suraj and his crew nailed it. Bookings have gone up noticeably since launch." },
  { name: "Priya Sharma", role: "Owner, Sharma Boutique", text: "I just wanted a simple online store and they delivered way more than that. The site looks clean, loads fast on mobile, and my customers actually find checkout easy now." },
  { name: "Rajan Karki", role: "Principal, Greenfield School", text: "We needed a result portal before exam season and they pulled it off in time. Parents and students keep telling us how easy it is to use. Really happy with the work." },
  { name: "Samantha Brooks", role: "Marketing Lead", text: "Their chatbot answers about 70% of our basic queries now. My team can finally focus on real client work instead of repeating the same answers all day." },
  { name: "Niraj Adhikari", role: "Restaurant Owner, Kathmandu", text: "Got a proper menu site with online reservations. Looks professional and matches our brand. Suraj was patient with all my last-minute change requests too." },
  { name: "Emily Carter", role: "Freelance Photographer", text: "My portfolio site finally feels like ME. The animations are subtle, the gallery loads beautifully, and I get inquiries through it almost every week now." },
  { name: "Bishal Thapa", role: "Co-founder, FitLife Nepal", text: "We use them for both our website and a custom WhatsApp automation for class bookings. Smooth communication, fair pricing, and they actually pick up the phone when something comes up." },
  { name: "Anjali Gurung", role: "Blogger", text: "I'm not very technical and they made the whole process feel easy. Walked me through everything, didn't talk down to me, and the site looks gorgeous." },
  { name: "David Mitchell", role: "Owner, Mitchell Realty", text: "The property listing site they built for us has been a quiet game-changer. Leads come in through the contact form daily. Worth every penny." },
  { name: "Sujata Rai", role: "Salon Owner", text: "Booking system works exactly how I wanted. Clients can pick their stylist and slot themselves. Saves me hours on the phone every week." },
  { name: "Kiran KC", role: "Cafe Owner", text: "Quick turnaround, no nonsense. They listened, gave honest suggestions, and didn't oversell anything. Site has been live for months now with zero issues." },
  { name: "Ravi Maharjan", role: "Auto Dealer", text: "Our old site was embarrassing. The new one feels modern and customers actually scroll through our inventory now. Conversion has noticeably improved." },
  { name: "Laxmi Basnet", role: "Founder, Kavya Brands", text: "Professional from start to finish. They sent updates regularly so I always knew where things stood. Will absolutely use them for our next project." },
  { name: "Tom Henderson", role: "IT Consultant", text: "As someone in tech, I appreciated how clean their code was when I peeked under the hood. Solid work, no shortcuts." },
  { name: "Manisha Subedi", role: "Freelance Designer", text: "I had a very specific vision and they respected it instead of pushing their own template. The end result feels truly custom." },
  { name: "Jonathan Lee", role: "Small Business Owner", text: "Suraj is genuinely easy to work with. Replies fast, explains things in plain English, and follows through on what he promises. Rare these days." },
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
          {/* Header - Moved to top */}
          <div className="text-center space-y-6 opacity-0 animate-fade-in">
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

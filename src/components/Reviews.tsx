import { Star } from "lucide-react";

const reviews = [
  { name: "Aakash Shrestha", role: "Founder, Himalayan Trek Co.", rating: 5, text: "Honestly, I was a bit nervous handing the website over to a new team — last guys ghosted us mid-project. But Suraj kept me in the loop the whole way. Bookings are up around 30% since we launched, and the trek itinerary pages finally look like something we're proud to share." },
  { name: "Priya Sharma", role: "Owner, Sharma Boutique", rating: 5, text: "Loads fast on mobile, checkout is smooth. My customers stopped complaining and started buying. That's all I needed." },
  { name: "Rajan Karki", role: "Principal, Greenfield School", rating: 4, text: "Result portal was delivered before exams, which is the main thing. Took a couple of revisions to get the parent login flow right but they fixed it without fuss. Would've given 5 if the initial design matched our brief a bit closer." },
  { name: "Samantha Brooks", role: "Marketing Lead", rating: 5, text: "The chatbot handles around 70% of our repetitive questions now. My team finally has breathing room to focus on actual client work instead of answering 'what are your hours' fifty times a day." },
  { name: "Niraj Adhikari", role: "Restaurant Owner, Kathmandu", rating: 4, text: "Menu site with reservations works great. Suraj was patient with my endless 'can we change this one more thing' messages." },
  { name: "Emily Carter", role: "Freelance Photographer", rating: 5, text: "My portfolio finally feels like me and not a generic template. The gallery transitions are subtle in a good way, not flashy. I've been getting inquiries through the contact form almost weekly since launch — something my old Squarespace site never did in two years." },
  { name: "Bishal Thapa", role: "Co-founder, FitLife Nepal", rating: 5, text: "Website + WhatsApp automation for class bookings. Both work. Pricing was fair and they actually pick up when I call." },
  { name: "Anjali Gurung", role: "Blogger", rating: 4, text: "Not technical at all, and they didn't make me feel dumb for asking basic questions. Site looks lovely. Only small gripe: took a bit longer than the original timeline, but the quality made up for it." },
  { name: "David Mitchell", role: "Owner, Mitchell Realty", rating: 5, text: "The property listing site has been a quiet workhorse for us. Leads come in through the contact form pretty much every day now. Search filters work exactly the way real buyers think — by area, price, bedrooms — not some weird dropdown maze. Worth every rupee." },
  { name: "Sujata Rai", role: "Salon Owner", rating: 5, text: "Booking system saves me hours on the phone each week. Clients pick their stylist and slot themselves. Magic." },
  { name: "Kiran KC", role: "Cafe Owner", rating: 3, text: "Site looks good and works fine. Communication was solid in the beginning but slowed down a bit toward the end of the project. After-launch support has been okay — nothing's broken, but I had to follow up twice for a small change. Decent work overall, just room to improve on follow-through." },
  { name: "Ravi Maharjan", role: "Auto Dealer", rating: 5, text: "Old site was honestly embarrassing — looked like 2010. The new one feels modern, the inventory pages actually load, and customers scroll through listings instead of bouncing. Inquiries have noticeably gone up." },
  { name: "Laxmi Basnet", role: "Founder, Kavya Brands", rating: 5, text: "Professional from start to finish. Regular updates, clean handover, no surprise charges. Already planning project number two with them." },
  { name: "Tom Henderson", role: "IT Consultant", rating: 4, text: "Peeked under the hood out of habit. Code's clean, structured properly, no weird hacks. That's rare for agency work at this price point." },
  { name: "Manisha Subedi", role: "Freelance Designer", rating: 5, text: "I came in with a very specific aesthetic in mind and braced myself for the usual 'but our template does it this way' pushback. Never came. They built exactly what I asked for, suggested smart improvements where it made sense, and the end result feels genuinely custom — not a recycled theme with my logo slapped on." },
  { name: "Jonathan Lee", role: "Small Business Owner", rating: 5, text: "Suraj replies fast, explains things in plain English, and actually does what he says he'll do. Rare combo." },
  { name: "Deepa Tamang", role: "Yoga Studio Owner", rating: 2, text: "Site itself looks nice, no complaints there. But getting on the same page about what I wanted took way longer than expected — felt like a lot of back and forth that could've been avoided with better questions upfront. Eventually got there, but the process was more stressful than I'd hoped." },
  { name: "Mark Davies", role: "Startup Founder", rating: 4, text: "Solid landing page, delivered on time, and the integration with our CRM works without me having to think about it. Would use again." },
];

export const Reviews = () => {
  return (
    <section id="reviews" className="py-20 bg-gradient-to-b from-accent/10 to-background overflow-hidden relative">
      {/* 3D Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '0.8s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              Testimonials
            </div>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Our Reviews
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Honest words from clients we've built websites and automations for.
            </p>
            <div className="flex justify-center items-center gap-2 pt-2 flex-wrap">
              {(() => {
                const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
                const rounded = Math.round(avg);
                return (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${i < rounded ? "fill-primary text-primary" : "text-muted-foreground"}`}
                      />
                    ))}
                    <span className="ml-2 text-foreground font-semibold">{avg.toFixed(1)}</span>
                    <span className="text-muted-foreground text-sm">· based on {reviews.length} client reviews</span>
                  </>
                );
              })()}
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

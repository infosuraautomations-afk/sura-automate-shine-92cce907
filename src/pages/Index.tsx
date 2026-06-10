import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Founder } from "@/components/Founder";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { ContactForm } from "@/components/ContactForm";
import { Contact } from "@/components/Contact";
import { Reviews } from "@/components/Reviews";
import { ReviewForm } from "@/components/ReviewForm";
import { Chatbot } from "@/components/Chatbot";
import { Footer } from "@/components/Footer";
import { FloatingShapes } from "@/components/FloatingShapes";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <FloatingShapes />
      <Navbar />
      <div id="home" className="pt-16 relative z-10">
        <Hero />
        <Founder />
        <About />
        <div id="services">
          <Services />
        </div>
        <Portfolio />
        <div id="contact">
          <ContactForm />
          <Contact />
        </div>
        <Reviews />
        <ReviewForm />
        <Footer />
      </div>
      <Chatbot />
    </div>
  );
};

export default Index;

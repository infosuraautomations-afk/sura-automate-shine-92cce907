import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { ContactForm } from "@/components/ContactForm";
import { Contact } from "@/components/Contact";
import { Reviews } from "@/components/Reviews";
import { ReviewForm } from "@/components/ReviewForm";
import { Chatbot } from "@/components/Chatbot";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <div id="services">
        <Services />
      </div>
      <Portfolio />
      <ContactForm />
      <Contact />
      <Reviews />
      <ReviewForm />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Founder } from "@/components/Founder";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { ContactForm } from "@/components/ContactForm";
import { Contact } from "@/components/Contact";
import { ReviewForm } from "@/components/ReviewForm";
import { ChatLauncher } from "@/components/ChatLauncher";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Footer } from "@/components/Footer";
import { ScrollStudio } from "@/components/ScrollStudio";

const Index = () => {
  useScrollReveal();
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <ScrollStudio />
      <div id="home" className="pt-16 relative z-10">
        <Hero />
        <Portfolio />
        <Founder />
        <About />
        <div id="services">
          <Services />
        </div>
        <ContactForm />
        <Contact />
        <ReviewForm />
        <Footer />
      </div>
      <ChatLauncher />
    </div>
  );
};

export default Index;

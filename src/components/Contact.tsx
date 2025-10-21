import { Mail, MessageCircle, Instagram, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export const Contact = () => {
  const { toast } = useToast();

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-2xl bg-card/80 backdrop-blur-sm border border-border shadow-glow hover:shadow-glow transition-all duration-500 animate-scale-in">
            {/* Header */}
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Get in Touch
              </h2>
              <p className="text-lg text-muted-foreground">
                Let's discuss your project today — we reply fast!
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Email */}
              <div className="group p-6 rounded-xl bg-background/50 backdrop-blur-sm border-2 border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Mail className="w-7 h-7 text-primary" />
                  </div>
                  <div className="w-full">
                    <h3 className="text-lg font-bold text-foreground mb-2">Email Us</h3>
                    <p className="text-sm text-muted-foreground break-all mb-3">
                      infosuraautomations@gmail.com
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopy("infosuraautomations@gmail.com", "Email")}
                      className="w-full gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </Button>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="group p-6 rounded-xl bg-background/50 backdrop-blur-sm border-2 border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <MessageCircle className="w-7 h-7 text-primary" />
                  </div>
                  <div className="w-full">
                    <h3 className="text-lg font-bold text-foreground mb-2">WhatsApp</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      +977 9807470285
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopy("+977 9807470285", "WhatsApp number")}
                      className="w-full gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </Button>
                  </div>
                </div>
              </div>

              {/* Instagram */}
              <div className="group p-6 rounded-xl bg-background/50 backdrop-blur-sm border-2 border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Instagram className="w-7 h-7 text-primary" />
                  </div>
                  <div className="w-full">
                    <h3 className="text-lg font-bold text-foreground mb-2">Instagram</h3>
                    <p className="text-sm text-muted-foreground break-all mb-3">
                      @surajbishwokarmaa
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopy("@surajbishwokarmaa", "Instagram handle")}
                      className="w-full gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </Button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

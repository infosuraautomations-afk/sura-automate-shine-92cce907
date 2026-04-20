import { useState } from "react";
import { Star, Send, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const ReviewForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.message.trim()) {
      toast({ title: "Missing fields", description: "Please add your name and review.", variant: "destructive" });
      return;
    }
    if (rating === 0) {
      toast({ title: "Add a rating", description: "Please select a star rating before submitting.", variant: "destructive" });
      return;
    }
    if (form.message.length > 1000) {
      toast({ title: "Too long", description: "Please keep your review under 1000 characters.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("send-review-email", {
        body: {
          name: form.name.trim(),
          role: form.role.trim() || undefined,
          email: form.email.trim() || undefined,
          rating,
          message: form.message.trim(),
        },
      });

      if (error) throw error;

      toast({
        title: "Thank you! 🎉",
        description: "Your review has been sent. We truly appreciate it!",
      });
      setForm({ name: "", role: "", email: "", message: "" });
      setRating(0);
    } catch (err: any) {
      console.error("Review submission error:", err);
      toast({
        title: "Something went wrong",
        description: "Couldn't send your review. Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="add-review" className="py-20 bg-gradient-to-b from-background to-accent/10 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center space-y-4 mb-10 animate-fade-in">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              Share Your Experience
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Add Your Review
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Worked with us? We'd love to hear your honest feedback — it helps us grow and helps others discover us.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8 shadow-card space-y-6 animate-fade-in-up"
          >
            {/* Stars */}
            <div className="space-y-2">
              <Label className="text-foreground">Your Rating *</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="transition-transform hover:scale-110"
                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        (hover || rating) >= star
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  maxLength={100}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-foreground">Role / Company</Label>
                <Input
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  placeholder="e.g. Founder, ABC Co."
                  maxLength={100}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email (optional)</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                maxLength={255}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-foreground">Your Review *</Label>
              <Textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your experience working with Sura Automations..."
                rows={5}
                maxLength={1000}
                required
              />
              <p className="text-xs text-muted-foreground text-right">{form.message.length}/1000</p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Review
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

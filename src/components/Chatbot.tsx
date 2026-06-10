import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Sparkles, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const INITIAL: Msg = {
  role: "assistant",
  content:
    "👋 Hi, I'm Sura Assistant — Suraj's AI helper. Ask me about websites, AI chatbots, pricing, timelines or our work for cafés & hotels. I'll answer instantly!",
};

const QUICK = [
  "I run a cafe — can you build my site?",
  "How much does a hotel website cost?",
  "How fast can you deliver?",
  "Show me your work for restaurants",
];

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INITIAL]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat-assistant", {
        body: { messages: next.map(({ role, content }) => ({ role, content })) },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Something went wrong");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Hmm, I couldn't reach my brain just now 🤖 — please email infosuraautomations@gmail.com or WhatsApp +977 9807470285 and Suraj will get right back to you.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const reset = () => setMessages([INITIAL]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-glow hover:scale-110 transition-all duration-500 animate-float flex items-center justify-center"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-background" />
          </>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-x-3 bottom-24 sm:inset-x-auto sm:bottom-24 sm:right-6 z-50 sm:w-[400px] max-w-[calc(100vw-1.5rem)] h-[min(560px,calc(100vh-7rem))] rounded-2xl bg-card/95 backdrop-blur-xl border border-border shadow-glow animate-scale-in overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-primary via-primary-glow to-primary text-primary-foreground flex items-center gap-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur flex items-center justify-center relative">
              <Sparkles className="w-5 h-5" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-primary" />
            </div>
            <div className="flex-1 relative">
              <h3 className="font-semibold leading-tight">Sura Assistant</h3>
              <p className="text-xs opacity-90 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                Online · Instant AI replies
              </p>
            </div>
            <button
              onClick={reset}
              aria-label="Reset chat"
              className="p-2 rounded-lg hover:bg-primary-foreground/20 transition relative"
              title="Start over"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 p-4 space-y-3 overflow-y-auto bg-gradient-to-b from-background/50 to-background">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
                {m.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-gradient-to-br from-primary to-primary-glow text-primary-foreground rounded-br-md"
                      : "bg-muted/80 text-foreground rounded-bl-md border border-border/50"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start animate-fade-in">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mr-2 flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-primary-foreground animate-pulse" />
                </div>
                <div className="bg-muted/80 border border-border/50 text-foreground px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            {messages.length === 1 && !loading && (
              <div className="space-y-2 pt-3 animate-fade-in">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
                  Try asking
                </p>
                {QUICK.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="w-full p-3 rounded-xl border border-border bg-card hover:border-primary hover:bg-primary/5 hover:shadow-sm transition-all duration-300 text-left text-sm hover:translate-x-0.5"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-border bg-card/80 backdrop-blur flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-full bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 transition"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground disabled:opacity-40 hover:scale-105 transition-transform flex items-center justify-center flex-shrink-0 shadow-glow"
              aria-label="Send"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const INITIAL: Msg = {
  role: "assistant",
  content: "Hi 👋 I'm the Sura Assistant. Ask me anything about our websites, chatbots, pricing, or process — I'll answer right away!",
};

const QUICK = [
  "How much does a website cost?",
  "Can you build an AI chatbot?",
  "How long does a project take?",
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
          content: "Sorry, I had trouble responding. Please email infosuraautomations@gmail.com or WhatsApp +977 9807470285.",
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

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-glow hover:scale-110 transition-all duration-500 animate-float"
      >
        {isOpen ? <X className="w-6 h-6 mx-auto" /> : <MessageCircle className="w-6 h-6 mx-auto animate-pulse" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[520px] rounded-2xl bg-card/95 backdrop-blur-md border border-border shadow-glow animate-scale-in overflow-hidden flex flex-col">
          <div className="p-4 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center animate-pulse">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Sura Assistant</h3>
              <p className="text-xs opacity-90">Online • AI-powered</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 p-4 space-y-4 overflow-y-auto">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
                <div
                  className={`max-w-[85%] p-3 rounded-lg shadow-sm text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-gradient-to-br from-primary to-primary-glow text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-muted text-foreground p-3 rounded-lg flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Typing...</span>
                </div>
              </div>
            )}

            {messages.length === 1 && !loading && (
              <div className="space-y-2 pt-2 animate-fade-in">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="w-full p-2.5 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 text-left text-sm hover:scale-[1.01]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-3 border-t border-border bg-muted/30 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
              className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-3 rounded-lg bg-gradient-to-br from-primary to-primary-glow text-primary-foreground disabled:opacity-50 hover:scale-105 transition-transform"
              aria-label="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

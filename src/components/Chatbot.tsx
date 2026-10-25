import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, RotateCcw, Mail, Check, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logo from "@/assets/sura-logo-wide-fixed.png.asset.json";

type Msg = { role: "user" | "assistant"; content: string };

const INITIAL: Msg = {
  role: "assistant",
  content:
    "Hi, I'm the Sura assistant. Ask me anything about getting a website or chatbot for your business — or tap \"Send to Suraj\" and he'll reply to you himself.",
};

const QUICK = [
  "Can you build a website for my business?",
  "What affects the price?",
  "How long does it take?",
  "What have you built before?",
];

const MAX_LEN = 1000;

export const Chatbot = ({ initiallyOpen = false }: { initiallyOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const [messages, setMessages] = useState<Msg[]>([INITIAL]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"chat" | "handoff" | "sent">("chat");
  const [lead, setLead] = useState({ name: "", contact: "", note: "", website: "" });
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim().slice(0, MAX_LEN);
    if (!trimmed || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("chat-assistant", {
        body: { messages: next.slice(1) },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't answer just now. Tap \"Send to Suraj\" below and he'll get back to you personally.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sendToSuraj = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    if (!lead.name.trim() || lead.contact.trim().length < 5) {
      toast.error("Please add your name and an email or WhatsApp number.");
      return;
    }
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("chat-handoff", {
        body: { ...lead, transcript: messages.slice(1).slice(-30) },
      });
      if (error || !data?.success) throw error || new Error(data?.error);
      setMode("sent");
      setLead({ name: "", contact: "", note: "", website: "" });
    } catch (err) {
      console.error(err);
      toast.error("Couldn't send right now. Please email infosuraautomations@gmail.com.");
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setMessages([INITIAL]);
    setMode("chat");
  };

  const field =
    "w-full px-4 py-2.5 rounded-xl neu-inset border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40";

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-elegant hover:scale-105 transition-transform duration-200 flex items-center justify-center"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="fixed inset-x-3 bottom-24 sm:inset-x-auto sm:right-6 z-50 sm:w-[390px] h-[min(580px,calc(100dvh-7rem))] rounded-3xl glass animate-scale-in overflow-hidden flex flex-col">
          <div className="px-4 py-3 flex items-center gap-3 border-b border-border/50">
            {mode !== "chat" ? (
              <button onClick={() => setMode("chat")} aria-label="Back to chat" className="p-2 rounded-full neu">
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <img src={logo.url} alt="Sura Automations" className="w-16 h-9 object-contain rounded-sm" />
            )}
            <div className="flex-1">
              <h3 className="font-semibold leading-tight text-foreground">
                {mode === "chat" ? "Chat with Sura" : "Message Suraj"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {mode === "chat" ? "Let’s talk about your project" : "Goes straight to his inbox"}
              </p>
            </div>
            <button onClick={reset} aria-label="Start over" title="Start over" className="p-2 rounded-full hover:bg-muted transition">
              <RotateCcw className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {mode === "chat" && (
            <>
              <div ref={scrollRef} className="flex-1 p-4 space-y-3 overflow-y-auto">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
                    <div
                      className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words ${
                        m.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "neu text-foreground rounded-bl-md"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="neu px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5">
                      {[0, 150, 300].map((d) => (
                        <span key={d} className="w-2 h-2 rounded-full bg-primary/70 animate-bounce" style={{ animationDelay: `${d}ms` }} />
                      ))}
                    </div>
                  </div>
                )}
                {messages.length === 1 && !loading && (
                  <div className="grid gap-2 pt-2">
                    {QUICK.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="w-full px-4 py-2.5 rounded-xl neu text-left text-sm text-foreground hover:text-primary transition"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="px-3 pt-2">
                <button
                  onClick={() => setMode("handoff")}
                  className="w-full flex items-center justify-center gap-2 text-sm font-medium text-primary py-2 rounded-xl hover:bg-primary/5 transition"
                >
                  <Mail className="w-4 h-4" /> Send to Suraj
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="p-3 flex gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value.slice(0, MAX_LEN))}
                  placeholder="Type your question..."
                  disabled={loading}
                  maxLength={MAX_LEN}
                  className={`${field} rounded-full`}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="w-11 h-11 rounded-full bg-primary text-primary-foreground disabled:opacity-40 flex items-center justify-center flex-shrink-0 shadow-card"
                  aria-label="Send"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </form>
            </>
          )}

          {mode === "handoff" && (
            <form onSubmit={sendToSuraj} className="flex-1 overflow-y-auto p-4 space-y-3">
              <p className="text-sm text-muted-foreground">
                Leave your details and Suraj will reply by email or WhatsApp. Your chat so far is included.
              </p>
              <input className={field} placeholder="Your name" maxLength={100} value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} required />
              <input className={field} placeholder="Email or WhatsApp number" maxLength={150} value={lead.contact} onChange={(e) => setLead({ ...lead, contact: e.target.value })} required />
              <textarea className={`${field} min-h-[110px] resize-none`} placeholder="Anything else? (optional)" maxLength={1500} value={lead.note} onChange={(e) => setLead({ ...lead, note: e.target.value })} />
              {/* Honeypot for bots — hidden from people */}
              <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={lead.website} onChange={(e) => setLead({ ...lead, website: e.target.value })} />
              <button type="submit" disabled={sending} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium shadow-card disabled:opacity-60 flex items-center justify-center gap-2">
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} Send message
              </button>
            </form>
          )}

          {mode === "sent" && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 gap-3 animate-fade-in">
              <div className="w-14 h-14 rounded-full neu flex items-center justify-center">
                <Check className="w-7 h-7 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground">Sent. Thanks!</h4>
              <p className="text-sm text-muted-foreground">Suraj usually replies within a few hours.</p>
              <button onClick={() => setMode("chat")} className="mt-2 px-5 py-2 rounded-full neu text-sm text-primary">Back to chat</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

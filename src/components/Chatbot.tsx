import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi 👋 I'm the Sura Assistant. How can I help you?" }
  ]);

  const handleOptionClick = (option: string) => {
    setMessages([...messages, { type: "user", text: option }]);
    
    setTimeout(() => {
      let response = "";
      if (option === "Get a Quote") {
        response = "Great! Please scroll down to our contact form or email us at infosuraautomations@gmail.com with your project details.";
      } else if (option === "Order Service") {
        response = "Perfect! You can fill out our order form below or WhatsApp us at +977 9807470285 to get started immediately.";
      } else if (option === "Talk to Support") {
        response = "I'll connect you with our team. Please reach out via email (infosuraautomations@gmail.com) or WhatsApp (+977 9807470285) for immediate assistance.";
      }
      setMessages(prev => [...prev, { type: "bot", text: response }]);
    }, 500);
  };

  return (
    <>
      {/* Chatbot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-glow hover:shadow-glow hover:scale-110 transition-all duration-500 animate-float"
      >
        {isOpen ? (
          <X className="w-6 h-6 mx-auto" />
        ) : (
          <MessageCircle className="w-6 h-6 mx-auto animate-pulse" />
        )}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[500px] rounded-2xl bg-card/95 backdrop-blur-md border border-border shadow-glow animate-scale-in overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center animate-pulse">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Sura Assistant</h3>
                <p className="text-xs opacity-90">Online • Ready to help</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg shadow-sm ${
                    message.type === "user"
                      ? "bg-gradient-to-br from-primary to-primary-glow text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}

            {/* Quick Options */}
            {messages.length === 1 && (
              <div className="space-y-2 pt-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <button
                  onClick={() => handleOptionClick("Get a Quote")}
                  className="w-full p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 text-left text-sm font-medium hover:scale-[1.02] hover:shadow-md"
                >
                  📋 Get a Quote
                </button>
                <button
                  onClick={() => handleOptionClick("Order Service")}
                  className="w-full p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 text-left text-sm font-medium hover:scale-[1.02] hover:shadow-md"
                >
                  🛒 Order Service
                </button>
                <button
                  onClick={() => handleOptionClick("Talk to Support")}
                  className="w-full p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 text-left text-sm font-medium hover:scale-[1.02] hover:shadow-md"
                >
                  💬 Talk to Support
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border bg-muted/30">
            <p className="text-xs text-muted-foreground text-center">
              For immediate assistance, email or WhatsApp us
            </p>
          </div>
        </div>
      )}
    </>
  );
};

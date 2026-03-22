import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { useLocation } from "react-router-dom";
import { ChatbotService } from "@/services/ChatbotService";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "bot" | "user";
  content: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "bot",
      content:
        "Hi! 👋 I'm your **Foodie Tour** assistant.\n\nAsk me anything about our tours — I'll help you find the perfect culinary adventure!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  // Hide on admin/employee/auth routes
  const hiddenPaths = ["/admin", "/employee", "/login", "/register", "/reset-password", "/dashboard"];
  if (hiddenPaths.some((p) => location.pathname.startsWith(p))) {
    return null;
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");

    const newUserMsg: Message = { id: Date.now().toString(), role: "user", content: userMsg };
    setMessages((prev) => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      let currentConvId = conversationId;
      if (!currentConvId) {
        currentConvId = await ChatbotService.createNewConversation();
        setConversationId(currentConvId);
      }

      const response = await ChatbotService.chat({
        conversationId: currentConvId,
        prompt: userMsg,
      });

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: response.content,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: "Sorry, I encountered an error. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end print:hidden">
      {isOpen ? (
        <div className="bg-card w-[22rem] sm:w-[28rem] rounded-2xl shadow-2xl border border-border flex flex-col h-[580px] max-h-[85vh] overflow-hidden mb-4 animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="bg-[#f1c40f] px-4 py-3.5 flex items-center justify-between text-slate-900 z-10 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-900/15 flex items-center justify-center">
                <Bot className="w-4.5 h-4.5 text-slate-900" />
              </div>
              <div>
                <p className="font-bold text-sm leading-tight">Foodie Assistant</p>
                <p className="text-[10px] font-medium text-slate-800/70 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Powered by AI
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-900/70 hover:text-slate-900 hover:bg-black/10 p-1.5 rounded-full transition-colors flex items-center justify-center"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-2.5 max-w-[90%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      msg.role === "user"
                        ? "bg-[#f1c40f] text-slate-900 shadow-sm"
                        : "bg-card border border-border text-foreground shadow-sm"
                    }`}
                  >
                    {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-[#f1c40f] text-slate-900 rounded-tr-sm font-medium"
                        : "bg-card border border-border text-foreground rounded-tl-sm"
                    }`}
                  >
                    {msg.role === "bot" ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none
                        prose-p:my-1 prose-p:leading-relaxed
                        prose-headings:font-bold prose-headings:my-1.5
                        prose-h1:text-base prose-h2:text-sm prose-h3:text-sm
                        prose-ul:my-1.5 prose-ul:pl-4
                        prose-ol:my-1.5 prose-ol:pl-4
                        prose-li:my-0.5 prose-li:marker:text-[#d4ac0d]
                        prose-strong:font-bold prose-strong:text-foreground
                        prose-code:bg-secondary prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
                        prose-hr:my-2 prose-blockquote:border-l-[#f1c40f]">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-2.5 flex-row">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-card border border-border shadow-sm">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-card border border-border rounded-tl-sm flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 bg-[#f1c40f] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-[#f1c40f] rounded-full animate-bounce" style={{ animationDelay: "160ms" }} />
                    <span className="w-2 h-2 bg-[#f1c40f] rounded-full animate-bounce" style={{ animationDelay: "320ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} className="h-1" />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border bg-card flex-shrink-0">
            <div className="flex items-center gap-2 bg-muted/40 rounded-xl border border-border focus-within:border-[#f1c40f] focus-within:ring-1 focus-within:ring-[#f1c40f]/50 transition-all px-3 py-1.5">
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask about our tours..."
                className="flex-1 bg-transparent focus:outline-none text-sm py-1.5 text-foreground placeholder:text-muted-foreground"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <button
                disabled={isLoading || !input.trim()}
                onClick={handleSend}
                className="w-8 h-8 bg-[#f1c40f] text-slate-900 rounded-lg flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#d4ac0d] active:scale-95 transition-all shadow-sm flex-shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5 ml-0.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-[#f1c40f] text-slate-900 rounded-full shadow-lg shadow-black/10 dark:shadow-[#f1c40f]/20 flex items-center justify-center hover:scale-110 hover:bg-[#d4ac0d] transition-all duration-200 group"
          aria-label="Open Chat"
        >
          <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
        </button>
      )}
    </div>
  );
}

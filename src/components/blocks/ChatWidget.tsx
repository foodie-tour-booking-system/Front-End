import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { ChatbotService } from "@/services/ChatbotService";

interface Message {
  id: string;
  role: "bot" | "user";
  content: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "init", role: "bot", content: "Hi! I am the Foodie Tour assistant. How can I help you plan your culinary adventure today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Hide on admin/employee/auth routes
  const hiddenPaths = ["/admin", "/employee", "/login", "/register", "/reset-password", "/dashboard"];
  if (hiddenPaths.some(p => location.pathname.startsWith(p))) {
    return null;
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    
    // Add user message to UI
    const newUserMsg: Message = { id: Date.now().toString(), role: "user", content: userMsg };
    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      let currentConvId = conversationId;
      if (!currentConvId) {
        currentConvId = await ChatbotService.createNewConversation();
        setConversationId(currentConvId);
      }

      const response = await ChatbotService.chat({
        conversationId: currentConvId,
        prompt: userMsg
      });

      const botMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: "bot", 
        content: response.content 
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: "bot", 
        content: "Sorry, I encountered an error while processing your request. Please try again later." 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end print:hidden">
      {isOpen ? (
        <div className="bg-card w-80 sm:w-96 rounded-2xl shadow-2xl border border-border flex flex-col h-[500px] max-h-[80vh] overflow-hidden mb-4 animate-in slide-in-from-bottom-5 fade-in duration-300 relative">
          {/* Header */}
          <div className="bg-[#f1c40f] px-4 py-3 flex items-center justify-between text-slate-900 shadow-sm z-10">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-slate-900" />
              <span className="font-bold text-sm">Foodie Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-900/80 hover:text-slate-900 hover:bg-black/10 p-1.5 rounded-full transition-colors flex items-center justify-center h-8 w-8"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`flex gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "user" ? "bg-[#f1c40f] text-slate-900 shadow-sm" : "bg-card border border-border text-foreground shadow-sm"
                  }`}>
                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 ml-[1px]" />}
                  </div>
                  <div 
                    className={`px-3.5 py-2.5 rounded-2xl text-[13px] sm:text-sm whitespace-pre-wrap leading-relaxed shadow-sm ${
                      msg.role === "user" 
                        ? "bg-[#f1c40f] text-slate-900 rounded-tr-none font-medium" 
                        : "bg-card border border-border text-foreground rounded-tl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[85%] flex-row">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-card border border-border text-foreground shadow-sm">
                    <Bot className="w-4 h-4 ml-[1px]" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-card border border-border text-foreground rounded-tl-none flex items-center gap-2 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-1" />
          </div>
          
          {/* Input Layer */}
          <div className="p-3 border-t border-border bg-card z-10">
            <div className="flex relative items-center gap-2">
              <input
                type="text"
                placeholder="Ask about our tours..."
                className="w-full pl-4 pr-12 py-2.5 rounded-xl border border-border bg-muted/50 focus:outline-none focus:ring-1 focus:ring-[#f1c40f] focus:border-[#f1c40f] focus:bg-background text-sm transition-all"
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
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#f1c40f] text-slate-900 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#d4ac0d] transition-colors shadow-sm"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-slate-900" /> : <Send className="w-4 h-4 ml-0.5 text-slate-900" />}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-[#f1c40f] text-slate-900 rounded-full shadow-lg shadow-black/10 dark:shadow-[#f1c40f]/20 flex items-center justify-center hover:scale-110 hover:bg-[#d4ac0d] transition-transform duration-200 group"
          aria-label="Open Chat"
        >
          <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
        </button>
      )}
    </div>
  );
}

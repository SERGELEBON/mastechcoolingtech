"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  ChevronUp,
  Send,
  RotateCcw,
  ChevronRight,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { servicesData, type ServiceId } from "@/lib/services-data";

// Mastech WhatsApp business number — international format without "+"
// +233 24 460 8104 → 233244608104
const WHATSAPP_NUMBER = "233244608104";

type ChatRole = "bot" | "user";
type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  type?: "text" | "summary";
  answers?: Answers;
};

type Step =
  | "greeting"
  | "service-confirm"
  | "service-pick"
  | "vehicle"
  | "issue"
  | "time"
  | "name"
  | "summary";

type Answers = {
  service?: ServiceId;
  vehicle?: string;
  issue?: string;
  time?: string;
  name?: string;
};

const serviceOptions: { id: ServiceId; label: string; emoji: string }[] = [
  { id: "diagnostic", label: "Diagnostics", emoji: "🔍" },
  { id: "repair", label: "Repair", emoji: "🔧" },
  { id: "recharge", label: "Recharge", emoji: "💧" },
  { id: "cleaning", label: "Cleaning", emoji: "✨" },
];

const timeOptions = [
  { value: "ASAP — Today", emoji: "⚡" },
  { value: "This Week", emoji: "📅" },
  { value: "Next Week", emoji: "🗓️" },
  { value: "Just getting info", emoji: "💡" },
];

function useCurrentService(): ServiceId | null {
  const pathname = usePathname();
  if (!pathname) return null;
  const match = pathname.match(/^\/services\/([a-z]+)/i);
  if (!match) return null;
  const slug = match[1] as ServiceId;
  if (slug in servicesData) return slug;
  return null;
}

function buildWhatsAppMessage(
  answers: Answers,
  currentService: ServiceId | null
): string {
  const service = answers.service ?? currentService;
  const serviceTitle = service
    ? servicesData[service].title
    : "General enquiry";
  const pageUrl = service
    ? `https://mastechcooling.com/services/${service}`
    : "https://mastechcooling.com";

  let msg = `Hello Mastech Cooling Technology! 👋\n\nHere are my details:\n\n`;
  if (answers.name) msg += `• Name: ${answers.name}\n`;
  msg += `• Service: ${serviceTitle}\n`;
  if (answers.vehicle) msg += `• Vehicle: ${answers.vehicle}\n`;
  if (answers.issue) msg += `• Issue: ${answers.issue}\n`;
  if (answers.time) msg += `• Preferred time: ${answers.time}\n`;
  msg += `• Page: ${pageUrl}\n\n`;
  msg += `Could you please confirm availability and pricing? Thank you!`;
  return msg;
}

function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

let msgIdCounter = 0;
function makeMsgId() {
  msgIdCounter += 1;
  return `msg-${msgIdCounter}-${Date.now()}`;
}

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [step, setStep] = useState<Step>("greeting");
  const [answers, setAnswers] = useState<Answers>({});
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const currentService = useCurrentService();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (
      !isTyping &&
      (step === "vehicle" || step === "issue" || step === "name")
    ) {
      inputRef.current?.focus();
    }
  }, [step, isTyping]);

  const pushBotMessage = (text: string, delay = 700, type: "text" | "summary" = "text", answers?: Answers) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: makeMsgId(), role: "bot", text, type, answers },
      ]);
    }, delay);
  };

  const pushUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: makeMsgId(), role: "user", text },
    ]);
  };

  const startChat = () => {
    pushBotMessage(
      `Hi there! 👋 I'm the Mastech assistant. I'll ask a few quick questions to better understand your needs, then connect you straight to our team on WhatsApp.`,
      400
    );
    setTimeout(() => {
      pushBotMessage(`Ready when you are! 👇`, 1300);
    }, 1100);
  };

  const handleToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      if (messages.length === 0) {
        startChat();
      }
    } else {
      setIsOpen(false);
    }
  };

  const handleStart = () => {
    pushUserMessage("Let's start ✅");
    if (currentService) {
      setStep("service-confirm");
      pushBotMessage(
        `I see you're viewing our *${servicesData[currentService].title}* service. Is that what you'd like to enquire about?`
      );
    } else {
      setStep("service-pick");
      pushBotMessage(
        `Which service are you interested in? Pick one below 👇`
      );
    }
  };

  const handleSkip = () => {
    pushUserMessage("Skip — send me to WhatsApp now");
    const msg = buildWhatsAppMessage(answers, currentService);
    window.open(buildWhatsAppLink(msg), "_blank", "noopener,noreferrer");
    setTimeout(() => setIsOpen(false), 600);
  };

  const handleServiceConfirm = (confirmed: boolean) => {
    if (confirmed) {
      pushUserMessage(`Yes, ${servicesData[currentService!].title}`);
      setAnswers((a) => ({ ...a, service: currentService! }));
      setStep("vehicle");
      pushBotMessage(
        `Great choice! What's the make and model of your vehicle? (e.g., "Toyota Corolla 2018")`
      );
    } else {
      pushUserMessage("No, pick another");
      setStep("service-pick");
      pushBotMessage(`No problem! Which service would you like? 👇`);
    }
  };

  const handleServicePick = (id: ServiceId) => {
    const service = servicesData[id];
    const emoji =
      serviceOptions.find((o) => o.id === id)?.emoji ?? "🔧";
    pushUserMessage(`${emoji} ${service.title}`);
    setAnswers((a) => ({ ...a, service: id }));
    setStep("vehicle");
    pushBotMessage(
      `Great choice! What's the make and model of your vehicle? (e.g., "Toyota Corolla 2018")`
    );
  };

  const handleVehicleSubmit = () => {
    const value = inputValue.trim();
    if (!value) return;
    pushUserMessage(value);
    setAnswers((a) => ({ ...a, vehicle: value }));
    setInputValue("");
    setStep("issue");
    pushBotMessage(
      `Got it. Can you briefly describe the issue you're experiencing? (e.g., "AC not blowing cold air")`
    );
  };

  const handleIssueSubmit = () => {
    const value = inputValue.trim();
    if (!value) return;
    pushUserMessage(value);
    setAnswers((a) => ({ ...a, issue: value }));
    setInputValue("");
    setStep("time");
    pushBotMessage(`Thanks! When would you like to come in? 👇`);
  };

  const handleTimePick = (time: string) => {
    pushUserMessage(time);
    setAnswers((a) => ({ ...a, time }));
    setStep("name");
    pushBotMessage(`Perfect! Finally, what's your name?`);
  };

  const handleNameSubmit = () => {
    const value = inputValue.trim();
    if (!value) return;
    pushUserMessage(value);
    setAnswers((a) => ({ ...a, name: value }));
    setInputValue("");
    setStep("summary");
    const summaryText = `Thanks ${value}! 🎉 Here's a summary of your request. Review it and tap below to send straight to our team on WhatsApp.`;
    pushBotMessage(summaryText, 800, "summary", {
      service: answers.service ?? currentService ?? undefined,
      vehicle: answers.vehicle,
      issue: answers.issue,
      time: answers.time,
      name: value,
    });
  };

  const handleSendToWhatsApp = () => {
    const msg = buildWhatsAppMessage(answers, currentService);
    window.open(buildWhatsAppLink(msg), "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const handleRestart = () => {
    setMessages([]);
    setAnswers({});
    setStep("greeting");
    setInputValue("");
    setTimeout(() => startChat(), 100);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "vehicle") handleVehicleSubmit();
    else if (step === "issue") handleIssueSubmit();
    else if (step === "name") handleNameSubmit();
  };

  // Render quick-reply buttons based on step
  const renderInputArea = () => {
    if (isTyping) {
      return (
        <div className="p-3 bg-white border-t border-border">
          <div className="text-xs text-muted-foreground italic text-center">
            Mastech assistant is typing...
          </div>
        </div>
      );
    }

    if (step === "greeting") {
      return (
        <div className="p-3 bg-white border-t border-border space-y-2">
          <button
            onClick={handleStart}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-sm transition-colors"
          >
            Start <ChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={handleSkip}
            className="w-full p-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            Skip — go straight to WhatsApp
          </button>
        </div>
      );
    }

    if (step === "service-confirm") {
      return (
        <div className="p-3 bg-white border-t border-border flex gap-2">
          <button
            onClick={() => handleServiceConfirm(true)}
            className="flex-1 p-2.5 rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] text-white font-medium text-sm transition-colors"
          >
            ✅ Yes
          </button>
          <button
            onClick={() => handleServiceConfirm(false)}
            className="flex-1 p-2.5 rounded-lg bg-muted hover:bg-muted/70 text-foreground font-medium text-sm transition-colors"
          >
            No, pick another
          </button>
        </div>
      );
    }

    if (step === "service-pick") {
      return (
        <div className="p-3 bg-white border-t border-border grid grid-cols-2 gap-2">
          {serviceOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleServicePick(opt.id)}
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg border border-border hover:border-[#25D366] hover:bg-[#25D366]/5 text-sm font-medium text-foreground transition-all"
            >
              <span className="text-base">{opt.emoji}</span>
              {opt.label}
            </button>
          ))}
        </div>
      );
    }

    if (step === "time") {
      return (
        <div className="p-3 bg-white border-t border-border grid grid-cols-2 gap-2">
          {timeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleTimePick(opt.value)}
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg border border-border hover:border-[#25D366] hover:bg-[#25D366]/5 text-xs font-medium text-foreground transition-all"
            >
              <span className="text-base">{opt.emoji}</span>
              {opt.value}
            </button>
          ))}
        </div>
      );
    }

    if (step === "vehicle" || step === "issue" || step === "name") {
      const placeholder =
        step === "vehicle"
          ? "e.g., Toyota Corolla 2018"
          : step === "issue"
          ? "e.g., AC not blowing cold air"
          : "Your name";
      return (
        <form
          onSubmit={handleTextSubmit}
          className="p-3 bg-white border-t border-border flex gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-3 py-2.5 rounded-lg border border-input bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]/40"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="p-2.5 rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      );
    }

    if (step === "summary") {
      return (
        <div className="p-3 bg-white border-t border-border space-y-2">
          <button
            onClick={handleSendToWhatsApp}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-sm transition-colors shadow-md"
          >
            <MessageCircle className="h-5 w-5" />
            Send to WhatsApp
          </button>
          <button
            onClick={handleRestart}
            className="w-full flex items-center justify-center gap-2 p-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Start over
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {/* Chat panel — positioned above the floating button */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-3 left-3 sm:left-auto sm:right-5 sm:w-[380px] z-50 bg-white rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col"
            style={{ maxHeight: "min(75vh, 580px)" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-[#25D366] to-[#128C7E] p-4 text-white flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-300 border-2 border-[#128C7E]" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm">Mastech Assistant</h3>
                <p className="text-white/80 text-xs">
                  Typically replies in a few minutes
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
              {messages.map((msg) => {
                if (msg.type === "summary" && msg.answers) {
                  const a = msg.answers;
                  const serviceTitle = a.service
                    ? servicesData[a.service].title
                    : "General enquiry";
                  return (
                    <div
                      key={msg.id}
                      className="flex justify-start"
                    >
                      <div className="max-w-[88%] space-y-2">
                        <div className="bg-white border border-border rounded-2xl rounded-bl-sm px-4 py-2 text-sm">
                          {msg.text}
                        </div>
                        <div className="bg-white border-2 border-[#25D366]/40 rounded-xl p-3 space-y-1.5 text-sm">
                          <div className="font-bold text-foreground text-xs uppercase tracking-wide pb-1 border-b border-border mb-2">
                            Your request summary
                          </div>
                          {a.name && (
                            <div className="flex gap-2">
                              <span className="text-muted-foreground w-24 text-xs">Name:</span>
                              <span className="font-medium text-foreground">{a.name}</span>
                            </div>
                          )}
                          <div className="flex gap-2">
                            <span className="text-muted-foreground w-24 text-xs">Service:</span>
                            <span className="font-medium text-foreground">{serviceTitle}</span>
                          </div>
                          {a.vehicle && (
                            <div className="flex gap-2">
                              <span className="text-muted-foreground w-24 text-xs">Vehicle:</span>
                              <span className="font-medium text-foreground">{a.vehicle}</span>
                            </div>
                          )}
                          {a.issue && (
                            <div className="flex gap-2">
                              <span className="text-muted-foreground w-24 text-xs">Issue:</span>
                              <span className="font-medium text-foreground">{a.issue}</span>
                            </div>
                          )}
                          {a.time && (
                            <div className="flex gap-2">
                              <span className="text-muted-foreground w-24 text-xs">When:</span>
                              <span className="font-medium text-foreground">{a.time}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm whitespace-pre-wrap ${
                        msg.role === "user"
                          ? "bg-[#25D366] text-white rounded-br-sm"
                          : "bg-white border border-border text-foreground rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-border rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <span
                        className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms", animationDuration: "0.8s" }}
                      />
                      <span
                        className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms", animationDuration: "0.8s" }}
                      />
                      <span
                        className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms", animationDuration: "0.8s" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            {renderInputArea()}

            {/* Skip link (always available once chat has started) */}
            {step !== "greeting" && step !== "summary" && !isTyping && (
              <button
                onClick={handleSkip}
                className="w-full py-2 text-[10px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border-t border-border"
              >
                Skip remaining questions → send to WhatsApp now
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating buttons */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        {/* Scroll-to-top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Scroll to top"
              className="w-11 h-11 rounded-full bg-brand-purple text-white shadow-lg hover:bg-brand-purple-light transition-colors flex items-center justify-center"
            >
              <ChevronUp className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Main WhatsApp chat button */}
        <motion.button
          onClick={handleToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? "Close WhatsApp chat" : "Open WhatsApp chat"}
          className={`relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-colors ${
            isOpen
              ? "bg-brand-red hover:bg-brand-red-light text-white"
              : "bg-[#25D366] hover:bg-[#1ebe5d] text-white"
          }`}
        >
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
          )}
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="relative"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7 fill-current"
                  aria-hidden
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-red border-2 border-white flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </span>
          )}
        </motion.button>
      </div>
    </>
  );
}

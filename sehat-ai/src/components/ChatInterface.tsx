"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Menu, Mic, Paperclip } from "lucide-react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import QuickSuggestions from "./QuickSuggestions";
import { Message, ChatSession } from "@/lib/types";
import {
  generateId,
  generateChatTitle,
  WELCOME_MESSAGE,
} from "@/lib/utils";

interface ChatInterfaceProps {
  session: ChatSession | null;
  onUpdateSession: (session: ChatSession) => void;
  onNewSession: (session: ChatSession) => void;
  onOpenSidebar: () => void;
}

export default function ChatInterface({
  session,
  onUpdateSession,
  onNewSession,
  onOpenSidebar,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const currentSessionId = useRef<string | null>(null);

  useEffect(() => {
    if (session && session.id !== currentSessionId.current) {
      currentSessionId.current = session.id;
      setMessages(
        session.messages.length > 0
          ? session.messages
          : [WELCOME_MESSAGE]
      );
    } else if (!session) {
      currentSessionId.current = null;
      setMessages([WELCOME_MESSAGE]);
    }
  }, [session]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    setError(null);
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    // Auto-resize textarea
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Jawab milne mein masla aa gaya");
      }

      const assistantMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);

      // Save to session
      if (session) {
        onUpdateSession({
          ...session,
          messages: finalMessages,
          updatedAt: new Date(),
        });
      } else {
        const newSession: ChatSession = {
          id: generateId(),
          title: generateChatTitle(content),
          messages: finalMessages,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        currentSessionId.current = newSession.id;
        onNewSession(newSession);
      }
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Kuch masla aa gaya. Dobara try karein.";
      setError(errorMsg);
      // Remove user message if failed
      setMessages(messages);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }, [messages, isLoading, session, onUpdateSession, onNewSession]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-resize
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  return (
    <div className="flex flex-col h-full bg-sehat-light">
      {/* Header */}
      <header className="glass border-b border-teal-100 px-4 py-3.5 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="md:hidden p-2 rounded-xl hover:bg-teal-50 text-gray-500 transition-colors"
          >
            <Menu size={20} />
          </button>
          <div>
            <h2 className="font-display font-semibold text-sehat-dark text-base leading-tight">
              Sehat AI
            </h2>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <p className="text-xs text-gray-400">Online — Jawab dene ke liye tayyar</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100">
            <span className="text-xs text-teal-600 font-medium">🇵🇰 Pakistan</span>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isLoading && <TypingIndicator />}

        {error && (
          <div className="flex justify-center">
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-2.5 rounded-xl max-w-sm text-center">
              ⚠️ {error}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      {messages.length <= 1 && !isLoading && (
        <QuickSuggestions onSelect={sendMessage} />
      )}

      {/* Input Area */}
      <div className="glass border-t border-teal-100 p-4">
        <div className="flex items-end gap-3 bg-white rounded-2xl border border-teal-200 shadow-sm px-4 py-3 focus-within:border-teal-400 focus-within:shadow-md transition-all">
          <button className="text-gray-300 hover:text-teal-500 transition-colors mb-0.5 flex-shrink-0">
            <Paperclip size={18} />
          </button>

          <textarea
            ref={inputRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Apni sehat ke baare mein poochein..."
            className="chat-input flex-1 resize-none border-0 bg-transparent text-gray-800 placeholder-gray-400 text-sm leading-relaxed focus:outline-none min-h-[24px] max-h-[120px]"
            rows={1}
            disabled={isLoading}
          />

          <button className="text-gray-300 hover:text-teal-500 transition-colors mb-0.5 flex-shrink-0">
            <Mic size={18} />
          </button>

          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className={`send-btn flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              input.trim() && !isLoading
                ? "bg-gradient-to-br from-sehat-green to-sehat-teal text-white shadow-md hover:shadow-lg"
                : "bg-gray-100 text-gray-300 cursor-not-allowed"
            }`}
          >
            <Send size={16} />
          </button>
        </div>

        <p className="text-center text-xs text-gray-300 mt-2.5">
          Sehat AI sirf information deta hai — emergency mein{" "}
          <span className="text-teal-500 font-medium">1122</span> call karein
        </p>
      </div>
    </div>
  );
}

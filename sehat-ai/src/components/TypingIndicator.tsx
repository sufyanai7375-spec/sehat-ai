"use client";

import { Heart } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex gap-3 message-enter">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sehat-green to-sehat-teal flex items-center justify-center shadow-sm">
          <Heart size={14} className="text-white" fill="white" />
        </div>
      </div>
      <div className="ai-bubble px-4 py-3.5">
        <div className="flex items-center gap-1.5">
          <div className="typing-dot" />
          <div className="typing-dot" />
          <div className="typing-dot" />
        </div>
      </div>
    </div>
  );
}

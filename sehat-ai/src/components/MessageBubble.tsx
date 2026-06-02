"use client";

import { Message } from "@/lib/types";
import { formatTime, formatMarkdown } from "@/lib/utils";
import { Heart, User } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-3 message-enter ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 mt-1">
        {isUser ? (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center shadow-sm">
            <User size={16} className="text-white" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sehat-green to-sehat-teal flex items-center justify-center shadow-sm">
            <Heart size={14} className="text-white" fill="white" />
          </div>
        )}
      </div>

      {/* Bubble */}
      <div className={`max-w-[78%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}>
        <div
          className={`px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? "user-bubble text-white"
              : "ai-bubble text-gray-800 ai-response"
          }`}
          dangerouslySetInnerHTML={
            isUser
              ? undefined
              : {
                  __html: formatMarkdown(message.content),
                }
          }
        >
          {isUser ? message.content : undefined}
        </div>
        <span className="text-xs text-gray-400 px-1">
          {formatTime(new Date(message.timestamp))}
        </span>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Plus, MessageSquare, Trash2, Heart, X, Menu } from "lucide-react";
import { ChatSession } from "@/lib/types";
import { formatTime } from "@/lib/utils";

interface SidebarProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onNewChat: () => void;
  onSelectSession: (id: string) => void;
  onDeleteSession: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  sessions,
  activeSessionId,
  onNewChat,
  onSelectSession,
  onDeleteSession,
  isOpen,
  onClose,
}: SidebarProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative inset-y-0 left-0 z-50 md:z-auto
          w-72 flex flex-col
          bg-white border-r border-teal-100
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="p-5 border-b border-teal-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sehat-green to-sehat-teal flex items-center justify-center shadow-lg">
              <Heart size={20} className="text-white" fill="white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-sehat-dark text-lg leading-tight">
                Sehat AI
              </h1>
              <p className="text-xs text-teal-500 font-body">
                Aapka Sehat Ka Sathi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg hover:bg-teal-50 text-gray-400"
          >
            <X size={18} />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={onNewChat}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-sehat-green to-sehat-teal text-white font-medium text-sm transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus size={18} />
            Nai Baat Shuru Karein
          </button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto px-3 pb-4">
          {sessions.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <MessageSquare size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-xs">Koi purani baat nahi</p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-xs text-gray-400 px-3 py-2 font-medium uppercase tracking-wider">
                Purani Batein
              </p>
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={`
                    relative flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer
                    transition-all duration-200 group
                    ${
                      activeSessionId === session.id
                        ? "bg-teal-50 border border-teal-200"
                        : "hover:bg-gray-50"
                    }
                  `}
                  onClick={() => onSelectSession(session.id)}
                  onMouseEnter={() => setHoveredId(session.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <MessageSquare
                    size={16}
                    className={`flex-shrink-0 ${
                      activeSessionId === session.id
                        ? "text-teal-600"
                        : "text-gray-400"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm truncate ${
                        activeSessionId === session.id
                          ? "text-sehat-dark font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {session.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {formatTime(new Date(session.updatedAt))}
                    </p>
                  </div>
                  {hoveredId === session.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSession(session.id);
                      }}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-teal-100">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-teal-50">
            <div className="w-2 h-2 rounded-full bg-green-400 pulse-green" />
            <p className="text-xs text-teal-700 font-medium">
              Gemini AI — Online
            </p>
          </div>
          <p className="text-xs text-gray-400 text-center mt-3">
            Sehat AI — Pakistan 🇵🇰
          </p>
        </div>
      </aside>
    </>
  );
}

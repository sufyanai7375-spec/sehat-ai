"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import ChatInterface from "@/components/ChatInterface";
import { ChatSession } from "@/lib/types";
import { saveSessions, loadSessions, generateId } from "@/lib/utils";

export default function Home() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load sessions from localStorage on mount
  useEffect(() => {
    const saved = loadSessions() as ChatSession[];
    if (saved.length > 0) {
      setSessions(saved);
    }
  }, []);

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    if (sessions.length > 0) {
      saveSessions(sessions);
    }
  }, [sessions]);

  const activeSession =
    sessions.find((s) => s.id === activeSessionId) || null;

  const handleNewChat = () => {
    setActiveSessionId(null);
    setSidebarOpen(false);
  };

  const handleSelectSession = (id: string) => {
    setActiveSessionId(id);
    setSidebarOpen(false);
  };

  const handleDeleteSession = (id: string) => {
    const updated = sessions.filter((s) => s.id !== id);
    setSessions(updated);
    saveSessions(updated);
    if (activeSessionId === id) {
      setActiveSessionId(null);
    }
  };

  const handleUpdateSession = (updatedSession: ChatSession) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === updatedSession.id ? updatedSession : s))
    );
  };

  const handleNewSession = (newSession: ChatSession) => {
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-sehat-light">
      {/* Sidebar */}
      <Sidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onNewChat={handleNewChat}
        onSelectSession={handleSelectSession}
        onDeleteSession={handleDeleteSession}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Chat */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <ChatInterface
          session={activeSession}
          onUpdateSession={handleUpdateSession}
          onNewSession={handleNewSession}
          onOpenSidebar={() => setSidebarOpen(true)}
        />
      </main>
    </div>
  );
}

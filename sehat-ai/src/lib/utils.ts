import { Message } from "./types";

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-PK", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function generateChatTitle(firstMessage: string): string {
  const words = firstMessage.split(" ").slice(0, 5).join(" ");
  return words.length < firstMessage.length ? words + "..." : words;
}

export function saveSessions(sessions: unknown[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("sehat-ai-sessions", JSON.stringify(sessions));
  }
}

export function loadSessions(): unknown[] {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("sehat-ai-sessions");
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        return [];
      }
    }
  }
  return [];
}

export function formatMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/^\* (.*$)/gim, "<li>$1</li>")
    .replace(/^- (.*$)/gim, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/gims, "<ul>$1</ul>")
    .replace(/\n/g, "<br>");
}

export const QUICK_SUGGESTIONS = [
  "Sar dard ka ilaj kya hai?",
  "Bukhar mein kya karna chahiye?",
  "Blood pressure normal kitna hota hai?",
  "Weight lose karne ke tips batao",
  "Neend na aane ka kya karan hai?",
  "Diabetes ke symptoms kya hain?",
  "Back pain se kaise rahat milti hai?",
  "Anxiety ke liye kya karein?",
];

export const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: `Assalam o Alaikum! 🌿

**Sehat AI mein Khush Amdeed!**

Main aapka personal health assistant hun — 24/7 available, bilkul free!

Aap mujhse pooch sakte hain:
- 🤒 Kisi bhi bimari ya symptom ke baare mein
- 💊 Dawa ya treatment ki general info
- 🥗 Healthy lifestyle aur khanay peenay ke baare mein
- 🧠 Mental health aur stress management
- 👶 Bachon ki sehat ke masail
- 🤰 Pregnancy related sawalat

**Aaj main aapki kaise madad kar sakta hun?**

💚 Yaad rakhen: Main information share karta hun — doctor ki jagah nahi le sakta.`,
  timestamp: new Date(),
};

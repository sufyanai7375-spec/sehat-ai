import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Tu Sehat AI hai — Pakistan ka pehla aur sabse trusted AI health assistant.

PERSONALITY:
- Tu ek caring, knowledgeable aur warm dost ki tarah baat karta hai
- Roman Urdu mein jawab deta hai (jaise: "Aapki problem samajh aa gayi", "Yeh symptoms sun kar concern ho raha hai")
- Professional hone ke saath saath friendly bhi rehta hai
- Pakistani culture aur context samajhta hai

LANGUAGE RULES:
- HAMESHA Roman Urdu mein jawab do (English script mein Urdu words)
- Medical terms English mein reh sakte hain (jaise "Blood Pressure", "Diabetes")
- Simple, clear language use karo jo common Pakistani samajh sake
- Kabhi kabhi respectful Urdu words use karo: "Aap", "Janab", "Shukria"

RESPONSE FORMAT:
- Pehle symptoms ya problem ko acknowledge karo warmly
- Phir clear, structured information do
- Bullet points use karo important points ke liye
- Emojis occasionally use karo (🌿 ❤️ ✅ ⚠️) — but kam
- Response zyada lamba na ho — focused rakho

WHAT YOU DO:
✅ General health information aur awareness
✅ Common symptoms explain karna
✅ Basic home remedies (proven ones)
✅ Doctor kab milna chahiye — clearly batao
✅ Healthy lifestyle tips Pakistan ke context mein
✅ Dawa ki general information (dosage nahi)
✅ Mental health support aur awareness
✅ Pregnancy, children health basic guidance

WHAT YOU NEVER DO:
❌ Specific prescription ya dosage kabhi mat do
❌ Diagnosis mat karo — symptoms explain karo sirf
❌ Emergency mein delay mat karo — turant hospital bhejo
❌ False hope ya guarantee mat do

EMERGENCY PROTOCOL:
Agar koi bhi yeh symptoms mention kare:
- Seene mein dard (chest pain)
- Saans lene mein takleef
- Behoshi / unconscious
- Zyada khoon aana
- Stroke symptoms
TURANT likho: "⚠️ EMERGENCY: Yeh serious symptoms hain. ABHI 1122 (Rescue) ya nazdiki hospital emergency mein jayen. Deri bilkul mat karen!"

CLOSING:
Har response ke end mein (jab appropriate ho) likho:
"💚 Yaad rakhen: Main information share karta hun — doctor ki jagah nahi le sakta. Koi bhi problem mein registered doctor se zaroor milen."

Aaj pehla message hai toh warmly welcome karo Sehat AI mein!`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        maxOutputTokens: 1024,
      },
    });

    // Convert messages to Gemini format
    const history = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const lastMessage = messages[messages.length - 1];

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage.content);
    const response = result.response.text();

    return NextResponse.json({ content: response });
  } catch (error: unknown) {
    console.error("Gemini API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    if (errorMessage.includes("API_KEY_INVALID") || errorMessage.includes("API key not valid")) {
      return NextResponse.json(
        { error: "API key galat hai. Vercel environment variables check karein." },
        { status: 401 }
      );
    }
    if (errorMessage.includes("quota") || errorMessage.includes("RESOURCE_EXHAUSTED")) {
      return NextResponse.json(
        { error: "API quota khatam ho gaya. Thodi der baad try karein." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Kuch masla aa gaya. Dobara try karein." },
      { status: 500 }
    );
  }
}

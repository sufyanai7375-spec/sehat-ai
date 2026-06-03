import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sehat AI — Aapka Sehat Ka Sathi",
  description:
    "Pakistan ka pehla AI-powered health assistant. Roman Urdu mein apni sehat ke baare mein poochein — 24/7 available, bilkul free.",
  keywords: ["sehat", "health", "AI", "Pakistan", "urdu", "doctor", "sehat ai"],
  authors: [{ name: "Sehat AI" }],
  openGraph: {
    title: "Sehat AI — Aapka Sehat Ka Sathi",
    description: "Pakistan ka pehla AI-powered health assistant",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ur" dir="ltr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0a7c5c" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}

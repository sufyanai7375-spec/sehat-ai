"use client";

import { QUICK_SUGGESTIONS } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface QuickSuggestionsProps {
  onSelect: (suggestion: string) => void;
}

export default function QuickSuggestions({ onSelect }: QuickSuggestionsProps) {
  return (
    <div className="px-4 py-3 border-t border-teal-50">
      <div className="flex items-center gap-2 mb-2.5">
        <Sparkles size={13} className="text-teal-500" />
        <span className="text-xs text-gray-400 font-medium">
          Jaldi Poochein
        </span>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {QUICK_SUGGESTIONS.map((suggestion, i) => (
          <button
            key={i}
            onClick={() => onSelect(suggestion)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium
              bg-teal-50 text-teal-700 border border-teal-100
              hover:bg-teal-100 hover:border-teal-200 
              transition-all duration-200 active:scale-95
              whitespace-nowrap"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}

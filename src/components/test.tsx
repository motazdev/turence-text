"use client";
import { Presence } from "@/components/presence";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";

export default function App() {
  const [isOpen, setIsOpen] = React.useState(false);

  // Auto-trigger animation on mount
  useEffect(() => {
    // Small delay to ensure component is mounted
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black text-white px-4 py-2 rounded-md mb-4"
      >
        Toggle Content
      </button>

      <Presence present={isOpen} forceMount>
        <div
          className={cn(
            "transform transition-all duration-300 ease-in-out",
            isOpen 
              ? "translate-x-0 opacity-100" 
              : "-translate-x-full opacity-0"
          )}
        >
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Animated Content</h2>
            <p>This content will slide in from the left and fade in/out smoothly.</p>
          </div>
        </div>
      </Presence>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";

interface QuickAddProps {
  onAddTask: (task: { heading: string; time?: number }) => void;
  className?: string;
  triggerRef?: React.RefObject<HTMLDivElement>;
}

export default function QuickAdd({ onAddTask, className = '', triggerRef }: QuickAddProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [timeLimit, setTimeLimit] = useState("");

  useHotkeys("ctrl+alt+k", () => {
    setIsOpen(true);
    setInputValue("");
    setTimeLimit("");
  });

  useHotkeys("esc", () => {
    handleClose();
  });

  useEffect(() => {
    if (isOpen) {
      const input = document.querySelector("input[placeholder='Type a task...']");
      input?.focus();
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setInputValue("");
    setTimeLimit("");
  };

  const handleSubmit = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      const task = {
        heading: inputValue.trim(),
        time: timeLimit ? parseInt(timeLimit) : undefined
      };
      onAddTask(task);
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div ref={triggerRef} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className={`glassmorphic p-4 rounded-lg w-[1000px] max-w-5xl mt-[-150px] ${className}`}>
        <div className="flex items-center gap-4">
          <button
            onClick={handleClose}
            className="text-secondary hover:text-accent transition text-lg"
            aria-label="Close quick add"
          >
            ×
          </button>
          <div className="flex-1">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleSubmit}
              placeholder="Type a task..."
              className="w-full bg-transparent border-none outline-none text-lg placeholder:text-secondary"
            />
          </div>
          <div className="h-px w-6 bg-secondary/20" />
          <div className="w-32">
            <input
              type="number"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
              placeholder="Time (min)"
              className="w-full bg-transparent border-none outline-none text-lg placeholder:text-secondary text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  onAddTask?: (task: { heading: string; steps: string; time: number }) => void;
}

export default function AddTaskModal({ open, onClose, onAddTask }: AddTaskModalProps) {
  const [heading, setHeading] = useState("");
  const [steps, setSteps] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!heading.trim()) {
      setError("Task title is required");
      return;
    }
    if (!time.trim() || isNaN(Number(time)) || Number(time) <= 0) {
      setError("Estimated time (minutes) is required");
      return;
    }
    setError("");
    onAddTask?.({ heading: heading.trim(), steps: steps.trim(), time: Number(time) });
    setHeading("");
    setSteps("");
    setTime("");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
      <div className="glassmorphic text-text p-8 w-full max-w-md relative border border-primary">
        <button
          className="absolute top-3 right-3 text-xl text-primary hover:text-secondary transition"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Add Task</h2>
        <div className="mb-4">
          <label className="block text-primary mb-1 font-medium">Task Title <span className="text-secondary">*</span></label>
          <input
            className="w-full rounded-lg px-4 py-2 bg-background/70 border border-primary text-text focus:outline-none focus:ring-2 focus:ring-secondary"
            value={heading}
            onChange={e => setHeading(e.target.value)}
            placeholder="e.g. Write report"
            maxLength={60}
            autoFocus
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-primary mb-1 font-medium">Steps (optional)</label>
          <textarea
            className="w-full rounded-lg px-4 py-2 bg-background/70 border border-primary text-text focus:outline-none focus:ring-2 focus:ring-secondary min-h-[64px]"
            value={steps}
            onChange={e => setSteps(e.target.value)}
            placeholder="e.g. Outline, draft, review"
            maxLength={200}
          />
        </div>
        <div className="mb-6">
          <label className="block text-primary mb-1 font-medium">Estimated Time <span className="text-secondary">*</span></label>
          <input
            className="w-full rounded-lg px-4 py-2 bg-background/70 border border-primary text-text focus:outline-none focus:ring-2 focus:ring-secondary"
            type="number"
            min={1}
            value={time}
            onChange={e => setTime(e.target.value)}
            placeholder="Minutes (e.g. 30)"
            required
          />
        </div>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <button
          className="w-full py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-text font-semibold shadow transition text-lg"
          onClick={handleAdd}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

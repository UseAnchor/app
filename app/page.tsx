"use client";
import TodoList from '../components/TodoList';
import ThemeToggle from '../components/ThemeToggle';
import { useState } from 'react';
import AddTaskModal from '../components/AddTaskModal';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [todos, setTodos] = useState<any[]>([]);

  const addTodo = (task: { heading: string; steps: string; time: number }) => {
    setTodos(prev => [
      ...prev,
      { id: Date.now(), ...task, completed: false },
    ]);
    setModalOpen(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-xl rounded-2xl shadow-xl bg-primary/20 backdrop-blur-md p-8 mt-12 relative">
        <h1 className="text-3xl font-bold mb-6 text-center select-none text-primary">Add Your Tasks</h1>
        <button
          className="mb-6 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-text font-semibold shadow transition"
          onClick={() => setModalOpen(true)}
        >
          + Add Task
        </button>
        <TodoList todos={todos} setTodos={setTodos} />
        <AddTaskModal open={modalOpen} onClose={() => setModalOpen(false)} onAddTask={addTodo} />
      </div>
    </main>
  );
}

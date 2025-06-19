"use client";
import TodoList from '../components/TodoList';
import ThemeToggle from '../components/ThemeToggle';
import { useState, useRef } from 'react';
import QuickAdd from '../components/QuickAdd';

export default function Home() {
  const [todos, setTodos] = useState<any[]>([]);
  const quickAddRef = useRef<HTMLDivElement>(null);

  const addTodo = async (task: { heading: string; time?: number }) => {
    // Compose the todo text for the API (since API expects 'text')
    const text = `${task.heading}${task.time ? ` (${task.time} min)` : ''}`;
    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    // Fetch updated todos
    const res = await fetch('/api/todos');
    const data = await res.json();
    // Map API todos to UI format
    const mappedTodos = data.todos.map((todo: any) => ({
      id: todo.id,
      heading: todo.text,
      steps: '',
      time: '',
      completed: false,
    }));
    setTodos(mappedTodos);
    console.log('Todos from API:', mappedTodos);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-xl rounded-2xl shadow-xl bg-primary/20 backdrop-blur-md p-8 mt-12 relative">
        <h1 className="text-3xl font-bold mb-6 text-center select-none text-primary">Tasks</h1>
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => {
              if (quickAddRef.current) {
                quickAddRef.current.click();
              }
            }}
            className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-text font-semibold shadow transition"
            aria-label="Add task"
          >
            + Add Task
          </button>
          <span className="text-secondary text-sm">or press Ctrl+Alt+K</span>
        </div>
        <TodoList todos={todos} setTodos={setTodos} />
        <QuickAdd onAddTask={addTodo} className="quick-add" triggerRef={quickAddRef} />
      </div>
    </main>
  );
}

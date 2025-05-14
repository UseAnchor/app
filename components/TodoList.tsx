"use client";
import { useState } from 'react';
import AddTaskModal from './AddTaskModal';

interface Todo {
  id: number;
  heading: string;
  steps: string;
  time: string;
  completed: boolean;
}

interface Todo {
  id: number;
  heading: string;
  steps: string;
  time: number;
  completed: boolean;
}

export default function TodoList({ todos, setTodos }: { todos: Todo[]; setTodos: (fn: (prev: Todo[]) => Todo[]) => void }) {
  const toggleTodo = (id: number) => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <ul className="space-y-3">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`flex flex-col gap-1 p-4 rounded-xl bg-primary/10 border border-primary shadow group transition-all ${todo.completed ? 'opacity-60 line-through' : ''}`}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-lg font-semibold cursor-pointer select-text text-primary"
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.heading}
              </span>
              <span className="ml-4 text-lg font-bold text-white bg-background px-4 py-2 rounded-xl shadow border-2 border-accent">
                {todo.time} min
              </span>
              <button
                className="opacity-0 group-hover:opacity-100 ml-4 text-secondary hover:text-accent transition text-lg"
                onClick={() => removeTodo(todo.id)}
                aria-label="Delete todo"
              >
                ×
              </button>
            </div>
            {todo.steps && (
              <div className="text-sm text-secondary dark:text-secondary mt-1 whitespace-pre-line">
                {todo.steps}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

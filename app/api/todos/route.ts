import { NextRequest, NextResponse } from 'next/server';

// In-memory todos array
let todos: { id: number; text: string; time: number }[] = [];
let currentIndex = 0;

export async function GET() {
  return NextResponse.json({ todos, currentIndex });
}

export async function POST(req: NextRequest) {
  const { text, time } = await req.json();
  if (!text) return NextResponse.json({ error: 'Missing text' }, { status: 400 });
  if (typeof time !== 'number' || time <= 0) return NextResponse.json({ error: 'Missing or invalid time' }, { status: 400 });
  const id = Date.now();
  todos.push({ id, text, time });
  return NextResponse.json({ todos, currentIndex });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  todos = todos.filter((todo) => todo.id !== id);
  if (currentIndex >= todos.length) currentIndex = todos.length - 1;
  if (currentIndex < 0) currentIndex = 0;
  return NextResponse.json({ todos, currentIndex });
}

// For /api/todos/next
export const dynamic = 'force-dynamic'; // Ensure in-memory state updates in dev

export async function PUT(req: NextRequest) {
  // Mark current as done and move to next
  if (todos.length === 0) return NextResponse.json({ todos, currentIndex });
  todos.splice(currentIndex, 1);
  if (currentIndex >= todos.length) currentIndex = todos.length - 1;
  if (currentIndex < 0) currentIndex = 0;
  return NextResponse.json({ todos, currentIndex });
} 
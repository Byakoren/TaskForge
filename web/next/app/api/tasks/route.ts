import { NextResponse } from "next/server";
import { listTasks, createTask } from "./data";

export async function GET() {
  const tasks = listTasks();
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const body = await request.json();

  const rawTitle = body?.title ?? "";
  const title = String(rawTitle).trim();

  if (!title) {
    return NextResponse.json(
      { error: "Le titre est obligatoire." },
      { status: 400 },
    );
  }

  const newTask = createTask(title);
  return NextResponse.json(newTask, { status: 201 });
}

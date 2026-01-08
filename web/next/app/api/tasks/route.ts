import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  const rawTitle = body?.title ?? "";
  const title = String(rawTitle).trim();

  if (!title) {
    return NextResponse.json(
      { error: "Le titre est obligatoire." },
      { status: 400 },
    );
  }

  const newTask = await prisma.task.create({
    data: { title },
  });

  return NextResponse.json(newTask, { status: 201 });
}

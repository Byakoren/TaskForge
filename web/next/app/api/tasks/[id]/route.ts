import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type ParamsPromise = Promise<{ id: string }>;

const ALLOWED_STATUS = ["TODO", "DOING", "DONE"] as const;
type AllowedStatus = (typeof ALLOWED_STATUS)[number];


export async function GET(
  _request: Request,
  { params }: { params: ParamsPromise },
) {
  const { id } = await params;

  const task = await prisma.task.findUnique({ where: { id } });

  if (!task) {
    return NextResponse.json({ error: "Tâche introuvable." }, { status: 404 });
  }

  return NextResponse.json(task);
}

export async function PUT(
  request: Request,
  { params }: { params: ParamsPromise },
) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));

  const data: { title?: string; status?: AllowedStatus } = {};

  if (body.title !== undefined) {
    const title = String(body.title).trim();
    if (!title) {
      return NextResponse.json(
        { error: "Le titre est obligatoire." },
        { status: 400 },
      );
    }
    data.title = title;
  }

  if (body.status !== undefined) {
    const status = String(body.status).toUpperCase();
    if (!ALLOWED_STATUS.includes(status as AllowedStatus)) {
      return NextResponse.json(
        { error: "Status invalide (TODO | DOING | DONE)." },
        { status: 400 },
      );
    }
    data.status = status as AllowedStatus;
  }

  try {
    const updated = await prisma.task.update({
      where: { id },
      data,
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Tâche introuvable." }, { status: 404 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: ParamsPromise },
) {
  const { id } = await params;

  try {
    const removed = await prisma.task.delete({ where: { id } });
    return NextResponse.json(removed);
  } catch {
    return NextResponse.json({ error: "Tâche introuvable." }, { status: 404 });
  }
}
import { NextResponse } from "next/server";
import { updateTask, deleteTask, Task } from "../data";

type ParamsPromise = Promise<{ id: string }>;

export async function PUT(
	request: Request,
	{ params }: { params: ParamsPromise }
) {
	const { id } = await params;

	const body = await request.json();

	const changes: Partial<Pick<Task, "title" | "status">> = {};

	if (body.title !== undefined) {
		changes.title = String(body.title).trim();
	}

	if (body.status !== undefined) {
		changes.status = body.status;
	}

	const updated = updateTask(id, changes);

	if (!updated) {
		return NextResponse.json(
			{ error: "Tâche introuvable." },
			{ status: 404 }
		);
	}

	return NextResponse.json(updated);
}

export async function DELETE(
	_request: Request,
	{ params }: { params: ParamsPromise }
) {
	const { id } = await params;

	const removed = deleteTask(id);

	if (!removed) {
		return NextResponse.json(
			{ error: "Tâche introuvable." },
			{ status: 404 }
		);
	}

	return NextResponse.json(removed);
}

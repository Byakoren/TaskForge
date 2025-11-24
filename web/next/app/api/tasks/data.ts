export type TaskStatus = "todo" | "doing" | "done";

export type Task = {
	id: string;
	title: string;
	status: TaskStatus;
};

let tasks: Task[] = [
	{ id: "1", title: "Découvrir Next.js", status: "todo" },
	{ id: "2", title: "Brancher API Routes", status: "doing" }
];

function computeNextId(): number {
	const numericIds = tasks
		.map(task => Number(task.id))
		.filter(n => !Number.isNaN(n));

	if (numericIds.length === 0) return 1;
	return Math.max(...numericIds) + 1;
}

let nextId = computeNextId();

export function listTasks(): Task[] {
	return tasks;
}

export function createTask(title: string): Task {
	const task: Task = {
		id: String(nextId++),
		title,
		status: "todo"
	};
	tasks.push(task);
	return task;
}

export function findTask(id: string): Task | undefined {
	return tasks.find(task => task.id === id);
}

export function updateTask(
    id: string,
	changes: Partial<Pick<Task, "title" | "status">>
): Task | null {
	const idx = tasks.findIndex(task => task.id === id);
	if (idx === -1) return null;

	tasks[idx] = { ...tasks[idx], ...changes };
	return tasks[idx];
}

export function deleteTask(id: string): Task | null {
	const idx = tasks.findIndex(task => task.id === id);
	if (idx === -1) return null;

	const [removed] = tasks.splice(idx, 1);
	return removed;
}

import { ITask } from '../models/tasks';

export interface ITaskService {
	createTask(title: string): Promise<ITask>;
	getAllTasks(): Promise<ITask[]>;
	updateTask(
		id: string,
		updates: Partial<{ title: string; completed: boolean }>,
	): Promise<ITask | null>;
	deleteTask(taskId: string): Promise<ITask | null>;
}

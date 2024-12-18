import { ITask } from '../models/tasks';

export interface ITaskRepository {
	createTask(data: { title: string; completed?: boolean }): Promise<ITask>;
	findAllTasks(): Promise<ITask[]>;
	updateTask(id: string, updates: Partial<{ title: string; completed: boolean }>): Promise<ITask | null>;
	deleteTask(id: string): Promise<ITask | null>;
}

import { inject, injectable } from 'inversify';
import { ITask } from '../models/tasks';
import { ITaskRepository } from '../repositories/task.repository.interface';
import { TYPES } from '../types';
import { ITaskService } from './task.service.interface';

@injectable()
export class TaskService implements ITaskService {
	constructor(@inject(TYPES.TaskRepository) private taskRepository: ITaskRepository) {}

	async createTask(title: string): Promise<ITask> {
		if (!title) throw new Error('Task title cannot be empty');
		return this.taskRepository.createTask({ title });
	}

	async getAllTasks(): Promise<ITask[]> {
		return this.taskRepository.findAllTasks();
	}

	async updateTask(
		id: string,
		updates: Partial<{ title: string; completed: boolean }>,
	): Promise<ITask | null> {
		return this.taskRepository.updateTask(id, updates);
	}

	async deleteTask(id: string): Promise<ITask | null> {
		return this.taskRepository.deleteTask(id);
	}
}

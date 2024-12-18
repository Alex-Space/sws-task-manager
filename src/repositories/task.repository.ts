import { injectable } from 'inversify';
import { Task, ITask } from '../models/tasks';
import { ITaskRepository } from './task.repository.interface';

@injectable()
export class TaskRepository implements ITaskRepository {
	async createTask(data: { title: string; completed?: boolean }): Promise<ITask> {
		return Task.create(data);
	}
	
    async findAllTasks(): Promise<ITask[]> {
        return Task.find();
	}
	
    async updateTask(id: string, updates: Partial<{ title: string; completed: boolean }>): Promise<ITask | null> {
        return Task.findByIdAndUpdate(id, updates, { new: true });
	}
	
	async deleteTask(id: string): Promise<ITask | null> {
        return Task.findByIdAndDelete(id);
    }
}

import { Task } from '../models/tasks';

export const taskRepository = {
	async createTask(data: { title: string; completed?: boolean }) {
		return Task.create(data);
	},

	async findAllTasks() {
		return Task.find();
	},

	async updateTask(id: string, updates: Partial<{ title: string; completed: boolean }>) {
		return Task.findByIdAndUpdate(id, updates, { new: true });
	},

	async deleteTask(id: string) {
		return Task.findByIdAndDelete(id);
	},
};

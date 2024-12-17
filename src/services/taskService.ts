import { taskRepository } from '../repositories/taskRepository';

export const taskService = {
	async createTask(title: string) {
		if (!title) throw new Error('Task title cannot be empty');
		return taskRepository.createTask({ title });
	},

	async getAllTasks() {
		return taskRepository.findAllTasks();
	},
};

import { Request, Response } from 'express';
import { taskService } from '../services/taskService';

export const taskController = {
	async createTask(req: Request, res: Response) {
		try {
			const task = await taskService.createTask(req.body.title);
			res.status(201).json(task);
		} catch (err) {
			res.status(400).json({ error: (err as Error).message });
		}
	},

	async getAllTasks(req: Request, res: Response) {
		const tasks = await taskService.getAllTasks();
		res.json(tasks);
	},
};

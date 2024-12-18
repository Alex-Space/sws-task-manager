import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.service.interface';
import { ITaskService } from '../services/task.service.interface';
import { TYPES } from '../types';
import { ITaskController } from './task.controller.interface';
import { BaseController } from '../common/base.controller';

@injectable()
export class TaskController extends BaseController implements ITaskController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.TaskService) private taskService: ITaskService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/tasks',
				method: 'post',
				func: this.createTask
			},
			{
				path: '/tasks',
				method: 'get',
				func: this.getAllTasks
			},
			{
				path: '/tasks/:id',
				method: 'put',
				func: this.updateTask,
			},
			{
				path: '/tasks/:id',
				method: 'delete',
				func: this.deleteTask,
			},
		]);
	}

	async createTask(req: Request, res: Response): Promise<void> {
		try {
			const task = await this.taskService.createTask(req.body.title);
			res.status(201).json(task);
		} catch (err) {
			res.status(400).json({ error: (err as Error).message });
		}
	}

	async getAllTasks(req: Request, res: Response): Promise<void> {
		try {
			const tasks = await this.taskService.getAllTasks();
			res.json(tasks);
		}
		catch (err) {
			res.status(400).json({ error: (err as Error).message });
		}
	}

	async updateTask(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const task = await this.taskService.updateTask(id, { title: req.body.title, completed: req.body.completed });
	}

	async deleteTask(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const task = await this.taskService.deleteTask(id);
	}
}

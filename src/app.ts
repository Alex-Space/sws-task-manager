import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { TaskController } from './controllers/task.controller';
import { MongooseService } from './database/mongoose.service';
import { ILogger } from './logger/logger.service.interface';
import { TYPES } from './types';

@injectable()
export class App {
	app: Express;
	port: number;
	server: Server;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.MongooseService) private mongooseService: MongooseService,
		@inject(TYPES.TaskController) private taskController: TaskController,
	) {
		this.app = express();
		this.port = 3000;
	}

	useMiddleware() {
		this.app.use(express.json());
	}

	useRoutes(): void {
		this.app.use('/', this.taskController.router);
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.app.listen(this.port, () => {
			this.logger.log(`[App] ✅ Server is running on port ${this.port}`);
		});

		try {
			await this.mongooseService.connect('mongodb://127.0.0.1:27017/crud-mongo');
		} catch (err) {
			this.logger.error(`[App] ❌ Cannot connect to database`);
			this.logger.error(err);
			process.exit(1);
		}
	}

	public close(): void {
		this.server.close();
	}
}

import express, { Express } from 'express';
import { Server } from 'http';
import mongoose from 'mongoose';
import { taskController } from './controllers/taskController';

async function main() {
	
	console.log('Connected to MongoDB');
}
main().catch(err => console.log(err));

export class App {
	app: Express;
	port: number;
	server: Server;

	constructor() {
		this.app = express();
		this.port = 3000;
	}

	useMiddleware() {
		this.app.use(express.json());
	}

	useRoutes(): void {
		this.app.post('/tasks', taskController.createTask);
		this.app.get('/tasks', taskController.getAllTasks);
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.app.listen(this.port, () => {
			console.log(`Example app listening on port ${this.port}`);
		});
		await mongoose.connect('mongodb://127.0.0.1:27017/crud-mongo');
	}

	public close(): void {
		this.server.close();
	}
}

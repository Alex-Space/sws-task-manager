import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { TaskController } from './controllers/task.controller';
import { ITaskController } from './controllers/task.controller.interface';
import { MongooseService } from './database/mongoose.service';
import { LoggerService } from './logger/logger.service';
import { ILogger } from './logger/logger.service.interface';
import { TaskRepository } from './repositories/task.repository';
import { ITaskRepository } from './repositories/task.repository.interface';
import { TaskService } from './services/task.service';
import { ITaskService } from './services/task.service.interface';
import { TYPES } from './types';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<ITaskController>(TYPES.TaskController).to(TaskController).inSingletonScope();
	bind<ITaskService>(TYPES.TaskService).to(TaskService).inSingletonScope();
	bind<ITaskRepository>(TYPES.TaskRepository).to(TaskRepository).inSingletonScope();
	bind<MongooseService>(TYPES.MongooseService).to(MongooseService).inSingletonScope();
	bind<App>(TYPES.Application).to(App);
});

interface IBootstrapReturn {
	app: App;
}

async function bootstrap(): Promise<IBootstrapReturn> {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	await app.init();
	return { app };
}

export const boot = bootstrap();

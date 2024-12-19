"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boot = exports.appBindings = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const app_1 = require("./app");
const task_controller_1 = require("./controllers/task.controller");
const mongoose_service_1 = require("./database/mongoose.service");
const logger_service_1 = require("./logger/logger.service");
const task_repository_1 = require("./repositories/task.repository");
const task_service_1 = require("./services/task.service");
const types_1 = require("./types");
exports.appBindings = new inversify_1.ContainerModule((bind) => {
    bind(types_1.TYPES.ILogger).to(logger_service_1.LoggerService).inSingletonScope();
    bind(types_1.TYPES.TaskController).to(task_controller_1.TaskController).inSingletonScope();
    bind(types_1.TYPES.TaskService).to(task_service_1.TaskService).inSingletonScope();
    bind(types_1.TYPES.TaskRepository).to(task_repository_1.TaskRepository).inSingletonScope();
    bind(types_1.TYPES.MongooseService).to(mongoose_service_1.MongooseService).inSingletonScope();
    bind(types_1.TYPES.Application).to(app_1.App);
});
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const appContainer = new inversify_1.Container();
        appContainer.load(exports.appBindings);
        const app = appContainer.get(types_1.TYPES.Application);
        yield app.init();
        return { app };
    });
}
exports.boot = bootstrap();
//# sourceMappingURL=main.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const inversify_1 = require("inversify");
const mongoose_1 = __importDefault(require("mongoose"));
const base_controller_1 = require("../common/base.controller");
const types_1 = require("../types");
let TaskController = class TaskController extends base_controller_1.BaseController {
    constructor(loggerService, taskService) {
        super(loggerService);
        this.loggerService = loggerService;
        this.taskService = taskService;
        this.bindRoutes([
            {
                path: '/tasks',
                method: 'post',
                func: this.createTask,
            },
            {
                path: '/tasks',
                method: 'get',
                func: this.getAllTasks,
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
    createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.taskService.createTask(req.body.title);
                res.status(201).json(task);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    }
    getAllTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield this.taskService.getAllTasks();
                res.json(tasks);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    }
    updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateData = req.body;
                const task = yield this.taskService.updateTask(id, updateData);
                if (!task) {
                    res.status(404).json({ error: 'Task not found' });
                    return;
                }
                res.status(200).json(task);
            }
            catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
    }
    deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    res.status(400).json({ error: 'Invalid task ID format' });
                    return;
                }
                const task = yield this.taskService.deleteTask(id);
                if (!task) {
                    res.status(404).json({ error: 'Task not found' });
                    return;
                }
                res.status(200).json({ message: 'Task deleted successfully' });
            }
            catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
    }
};
exports.TaskController = TaskController;
exports.TaskController = TaskController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ILogger)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.TaskService)),
    __metadata("design:paramtypes", [Object, Object])
], TaskController);
//# sourceMappingURL=task.controller.js.map
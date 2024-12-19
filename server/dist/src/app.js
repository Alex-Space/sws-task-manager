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
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const inversify_1 = require("inversify");
const task_controller_1 = require("./controllers/task.controller");
const mongoose_service_1 = require("./database/mongoose.service");
const types_1 = require("./types");
let App = class App {
    constructor(logger, mongooseService, taskController) {
        this.logger = logger;
        this.mongooseService = mongooseService;
        this.taskController = taskController;
        this.app = (0, express_1.default)();
        this.port = 3000;
    }
    useMiddleware() {
        this.app.use(express_1.default.json());
    }
    useRoutes() {
        this.app.use('/', this.taskController.router);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.useMiddleware();
            this.useRoutes();
            this.app.listen(this.port, () => {
                this.logger.log(`[App] ✅ Server is running on port ${this.port}`);
            });
            try {
                yield this.mongooseService.connect('mongodb://127.0.0.1:27017/crud-mongo');
            }
            catch (err) {
                this.logger.error(`[App] ❌ Cannot connect to database`);
                this.logger.error(err);
                process.exit(1);
            }
        });
    }
    close() {
        this.server.close();
    }
};
exports.App = App;
exports.App = App = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ILogger)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.MongooseService)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.TaskController)),
    __metadata("design:paramtypes", [Object, mongoose_service_1.MongooseService,
        task_controller_1.TaskController])
], App);
//# sourceMappingURL=app.js.map
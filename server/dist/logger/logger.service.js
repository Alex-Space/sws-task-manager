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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const tslog_1 = require("tslog");
const inversify_1 = require("inversify");
let LoggerService = class LoggerService {
    constructor() {
        this.logger = new tslog_1.Logger({
            prettyLogTemplate: '{{dd}}.{{mm}}.{{yyyy}} {{hh}}:{{MM}}:{{ss}}:{{ms}}\t{{logLevelName}}\t',
            prettyErrorTemplate: '\n{{errorName}} {{errorMessage}}\nerror stack:\n{{errorStack}}',
            prettyErrorStackTemplate: '  • {{fileName}}\t{{method}}\n\t{{filePathWithLine}}',
            prettyErrorParentNamesSeparator: ':',
            prettyErrorLoggerNameDelimiter: '\t',
            stylePrettyLogs: true,
            prettyLogTimeZone: 'local',
            prettyLogStyles: {
                logLevelName: {
                    '*': ['bold', 'black', 'bgWhiteBright', 'dim'],
                    SILLY: ['bold', 'white'],
                    TRACE: ['bold', 'whiteBright'],
                    DEBUG: ['bold', 'green'],
                    INFO: ['bold', 'blue'],
                    WARN: ['bold', 'yellow'],
                    ERROR: ['bold', 'red'],
                    FATAL: ['bold', 'redBright'],
                },
                dateIsoStr: 'white',
                filePathWithLine: 'white',
                name: ['white', 'bold'],
                nameWithDelimiterPrefix: ['white', 'bold'],
                nameWithDelimiterSuffix: ['white', 'bold'],
                errorName: ['bold', 'bgRedBright', 'whiteBright'],
                fileName: ['yellow'],
            },
        });
    }
    log(...args) {
        this.logger.info(...args);
    }
    error(...args) {
        this.logger.error(...args);
    }
    warn(...args) {
        this.logger.warn(...args);
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], LoggerService);
//# sourceMappingURL=logger.service.js.map
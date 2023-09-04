"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app_crud_router_1 = __importDefault(require("./router/app.crud.router"));
const validator_1 = __importDefault(require("./validator/validator"));
class AppAudit {
    constructor() {
        this.appAuditRouter = (0, express_1.Router)();
        this.crudRouter = new app_crud_router_1.default();
        this.crudValidator = new validator_1.default();
        this.callRouter();
    }
    callRouter() {
        this.appAuditRouter.use('/', this.crudRouter.router);
    }
}
exports.default = AppAudit;
//# sourceMappingURL=app.audit.router.js.map
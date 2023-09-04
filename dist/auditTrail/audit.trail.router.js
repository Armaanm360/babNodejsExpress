"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const audit_trail_crud_1 = __importDefault(require("./router/audit.trail.crud"));
class AuditTrail {
    constructor() {
        this.AuditTrailRouter = (0, express_1.Router)();
        this.AuditTrailNewRouter = new audit_trail_crud_1.default();
        this.callRouter();
    }
    callRouter() {
        this.AuditTrailRouter.use('/', this.AuditTrailNewRouter.router);
    }
}
exports.default = AuditTrail;
//# sourceMappingURL=audit.trail.router.js.map
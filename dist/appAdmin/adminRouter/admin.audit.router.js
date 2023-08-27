"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const admin_audit_controller_1 = __importDefault(require("../adminController/admin.audit.controller"));
class AdminAuditRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.auditController = new admin_audit_controller_1.default();
        this.callRouter();
    }
    // call router
    callRouter() {
        // get audit router
        this.router.route('/').get(this.auditController.getAudit);
    }
}
exports.default = AdminAuditRouter;
//# sourceMappingURL=admin.audit.router.js.map
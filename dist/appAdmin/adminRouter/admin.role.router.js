"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const admin_role_controller_1 = __importDefault(require("../adminController/admin.role.controller"));
class AdminRoleRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.adminRoleController = new admin_role_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        this.router.route('/').get(this.adminRoleController.getRole);
    }
}
exports.default = AdminRoleRouter;
//# sourceMappingURL=admin.role.router.js.map
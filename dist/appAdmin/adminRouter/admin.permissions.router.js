"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_permissions_controller_1 = __importDefault(require("../adminController/admin.permissions.controller"));
const admin_permission_validator_1 = __importDefault(require("../utils/validator/admin.permission.validator"));
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
class AdminPermissionRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.validator = new admin_permission_validator_1.default();
        this.controller = new admin_permissions_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        // permissions route
        this.router
            .route('/')
            .post(this.validator.createPermission(), this.controller.createPermission);
        // permission gorup route
        this.router
            .route('/group')
            .post(this.validator.createPermissionGroup(), this.controller.createPermissionGroup);
    }
}
exports.default = AdminPermissionRouter;
//# sourceMappingURL=admin.permissions.router.js.map
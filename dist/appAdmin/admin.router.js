"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_permissions_router_1 = __importDefault(require("./adminRouter/admin.permissions.router"));
const admin_role_router_1 = __importDefault(require("./adminRouter/admin.role.router"));
const admin_admin_router_1 = __importDefault(require("./adminRouter/admin.admin.router"));
const admin_member_router_1 = __importDefault(require("./adminRouter/admin.member.router"));
const admin_audit_router_1 = __importDefault(require("./adminRouter/admin.audit.router"));
const express_1 = require("express");
const admin_training_router_1 = __importDefault(require("./adminRouter/admin.training.router"));
const admin_account_router_1 = __importDefault(require("./adminRouter/admin.account.router"));
const admin_setting_router_1 = __importDefault(require("./adminRouter/admin.setting.router"));
class AdminRouter {
    constructor() {
        this.AdminRouter = (0, express_1.Router)();
        this.AdminPermissionRoute = new admin_permissions_router_1.default();
        this.AdminRoleRoute = new admin_role_router_1.default();
        this.AdminAdminRoute = new admin_admin_router_1.default();
        this.AdminMemberRoute = new admin_member_router_1.default();
        this.AdminAuditRoute = new admin_audit_router_1.default();
        this.AdminTrainingRoute = new admin_training_router_1.default();
        this.AdminAccountRouter = new admin_account_router_1.default();
        this.AdminSettingRouter = new admin_setting_router_1.default();
        this.callRouter();
    }
    callRouter() {
        // admin member routes
        this.AdminRouter.use('/member', this.AdminMemberRoute.router);
        // admin permission routes
        this.AdminRouter.use('/permissions', this.AdminPermissionRoute.router);
        // admin role routes
        this.AdminRouter.use('/role', this.AdminRoleRoute.router);
        // admin audit trail routes
        this.AdminRouter.use('/audit', this.AdminAuditRoute.router);
        // admin account routes
        this.AdminRouter.use('/account', this.AdminAccountRouter.router);
        // admin training routes
        this.AdminRouter.use('/training', this.AdminTrainingRoute.trainingRouter);
        // admin setting routes
        this.AdminRouter.use('/setting', this.AdminSettingRouter.router);
        // admin routes
        this.AdminRouter.use('/', this.AdminAdminRoute.router);
    }
}
exports.default = AdminRouter;
//# sourceMappingURL=admin.router.js.map
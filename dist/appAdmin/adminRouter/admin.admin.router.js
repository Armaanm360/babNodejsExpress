"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const admin_admin_controller_1 = __importDefault(require("../adminController/admin.admin.controller"));
const admin_admin_validator_1 = __importDefault(require("../utils/validator/admin.admin.validator"));
class AdminAdminRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.adminAdminController = new admin_admin_controller_1.default();
        this.adminAdminValidator = new admin_admin_validator_1.default();
        this.callRouter();
    }
    callRouter() {
        // get profile router
        this.router.route('/profile').get(this.adminAdminController.getProfile);
        // admin create and get router
        this.router
            .route('/')
            .get(this.adminAdminController.getAdmin)
            .post(this.uploader.cloudUploadRaw(this.fileFolders.ADMIN_AVATARS), this.adminAdminValidator.createAdminValidator(), this.adminAdminController.createAdmin);
        // get single and update admin
        this.router
            .route('/:id')
            .get(this.commonValidator.commonSingleParamsIdInputValidator(), this.adminAdminController.getSingleAdmin)
            .patch(this.uploader.cloudUploadRaw(this.fileFolders.ADMIN_AVATARS), this.commonValidator.commonSingleParamsIdInputValidator(), this.adminAdminValidator.updateAdminValidator(), this.adminAdminController.updateAdmin);
    }
}
exports.default = AdminAdminRouter;
//# sourceMappingURL=admin.admin.router.js.map
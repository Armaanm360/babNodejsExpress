"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const admin_member_controller_1 = __importDefault(require("../adminController/admin.member.controller"));
class AdminMemberRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.memberController = new admin_member_controller_1.default();
        this.callRouter();
    }
    // call router
    callRouter() {
        // get and create member route
        this.router
            .route('/')
            .get(this.memberController.getMember)
            .post(this.uploader.cloudUploadRaw('member_files'), this.memberController.createMember);
        // get single and update route
        this.router
            .route('/:id')
            .get(this.commonValidator.commonSingleParamsIdInputValidator(), this.memberController.getSingleMember)
            .patch(this.commonValidator.commonSingleParamsIdInputValidator(), this.memberController.updateMember);
    }
}
exports.default = AdminMemberRouter;
//# sourceMappingURL=admin.member.router.js.map
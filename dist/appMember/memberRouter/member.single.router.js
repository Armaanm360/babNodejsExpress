"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const member_single_controller_1 = __importDefault(require("../memberController/member.single.controller"));
class MemberSingleRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.memberSingleController = new member_single_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        // get due member router
        this.router
            .route("/:id")
            .get(this.commonValidator.commonSingleParamsIdInputValidator(), this.memberSingleController.getMemberSingle);
    }
}
exports.default = MemberSingleRouter;
//# sourceMappingURL=member.single.router.js.map
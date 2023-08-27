"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const member_renewalDate_controller_1 = __importDefault(require("../memberController/member.renewalDate.controller"));
class RenewalDateMemberRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.renewalMemberController = new member_renewalDate_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        // get renewal date router
        this.router
            .route("/:id")
            .get(this.commonValidator.commonSingleParamsIdInputValidator(), this.renewalMemberController.getDueMember);
    }
}
exports.default = RenewalDateMemberRouter;
//# sourceMappingURL=member.renewalDate.router.js.map
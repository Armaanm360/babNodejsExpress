"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const member_due_controller_1 = __importDefault(require("../memberController/member.due.controller"));
class DueMemberRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.dueMemberController = new member_due_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        // get due member router
        this.router
            .route("/:id")
            .get(this.commonValidator.commonSingleParamsIdInputValidator(), this.dueMemberController.getDueMember);
    }
}
exports.default = DueMemberRouter;
//# sourceMappingURL=member.due.router.js.map
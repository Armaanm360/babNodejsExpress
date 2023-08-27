"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const member_bankInfo_controller_1 = __importDefault(require("../memberController/member.bankInfo.controller"));
class MemberBankInfoRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.memberBankInfoController = new member_bankInfo_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        // get profile router
        this.router.route("/").get(this.memberBankInfoController.getAllBankInfo);
    }
}
exports.default = MemberBankInfoRouter;
//# sourceMappingURL=member.bankInfo.router.js.map
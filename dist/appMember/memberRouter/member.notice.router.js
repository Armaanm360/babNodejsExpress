"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const member_notice_controller_1 = __importDefault(require("../memberController/member.notice.controller"));
class MemberNoticeRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.memberNoticeController = new member_notice_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        // get profile router
        this.router.route("/").get(this.memberNoticeController.getAllNotice);
    }
}
exports.default = MemberNoticeRouter;
//# sourceMappingURL=member.notice.router.js.map
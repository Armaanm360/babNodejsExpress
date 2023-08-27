"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const member_executive_controller_1 = __importDefault(require("../memberController/member.executive.controller"));
class CommitteeMemberRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.committeeMemberController = new member_executive_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        // get all invoice router
        this.router
            .route("/")
            .get(this.committeeMemberController.getAllCommitteeMember);
    }
}
exports.default = CommitteeMemberRouter;
//# sourceMappingURL=member.executive.router.js.map
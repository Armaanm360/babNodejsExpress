"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const member_profile_controller_1 = __importDefault(require("../memberController/member.profile.controller"));
class MemberProfileRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.memberProfileController = new member_profile_controller_1.default();
        this.callRouter();
    }
    // private callRouter() {
    //   // get profile router
    //   this.router.route('/profile').get(this.memberProfileController.getProfile);
    // }
    callRouter() {
        //get profile router
        this.router.route('/profile').get(this.memberProfileController.getProfile);
    }
}
exports.default = MemberProfileRouter;
//# sourceMappingURL=member.profile.router.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const reg_user_controller_1 = __importDefault(require("./../preUserController/reg.user.controller"));
const pre_user_validator_1 = __importDefault(require("./../validator/pre.user.validator"));
class RegisterRoutes extends abstract_router_1.default {
    constructor() {
        super();
        this.preUserController = new reg_user_controller_1.default();
        this.preUserValidator = new pre_user_validator_1.default();
        this.callRouter();
    }
    callRouter() {
        this.router
            .route('/register')
            .post(this.preUserValidator.userValidator(), this.preUserController.createUserReg);
        this.router.route('/login').post(this.preUserController.createUserLogin);
    }
}
exports.default = RegisterRoutes;
//# sourceMappingURL=reg.user.route.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reg_user_route_1 = __importDefault(require("./preUserRoutes/reg.user.route"));
class PreUserRouter {
    constructor() {
        this.PreUserRouter = (0, express_1.Router)();
        this.RouterRegister = new reg_user_route_1.default();
        this.callRouter();
    }
    callRouter() {
        this.PreUserRouter.use('/', this.RouterRegister.router);
    }
}
exports.default = PreUserRouter;
//# sourceMappingURL=pre.user.router.js.map
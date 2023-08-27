"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_user_servent_controller_1 = __importDefault(require("./serventController/admin.user.servent.controller"));
//we need to create a controller for that
class ServentRouter {
    constructor() {
        this.ServentRouter = (0, express_1.Router)();
        this.serventController = new admin_user_servent_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        this.ServentRouter.route('/meow').get(this.serventController.myPremiumService);
    }
}
exports.default = ServentRouter;
//# sourceMappingURL=servent.router.js.map
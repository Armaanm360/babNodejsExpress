"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const admin_setting_controller_1 = __importDefault(require("../adminController/admin.setting.controller"));
class AdminSettingRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.settingController = new admin_setting_controller_1.default();
        this.callRouter();
    }
    // call router
    callRouter() { }
}
exports.default = AdminSettingRouter;
//# sourceMappingURL=admin.setting.router.js.map
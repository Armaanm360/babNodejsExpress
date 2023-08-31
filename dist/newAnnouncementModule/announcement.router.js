"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const announcementCrud_router_1 = __importDefault(require("./announcementRoute/announcementCrud.router"));
const express_1 = require("express");
class announcementrouter {
    constructor() {
        this.announcementrouter = (0, express_1.Router)();
        this.announcementCrudRouter = new announcementCrud_router_1.default();
        this.callRouter();
    }
    callRouter() {
        this.announcementrouter.use('/', this.announcementCrudRouter.router);
    }
}
exports.default = announcementrouter;
//# sourceMappingURL=announcement.router.js.map
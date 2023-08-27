"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trainee_controller_1 = __importDefault(require("../traineeController/trainee.controller"));
class TraineeRouter {
    constructor() {
        this.TraineeRouter = (0, express_1.Router)();
        this.traineeController = new trainee_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        this.TraineeRouter.route('/profile').get(this.traineeController.getProfile);
    }
}
exports.default = TraineeRouter;
//# sourceMappingURL=trainee.router.js.map
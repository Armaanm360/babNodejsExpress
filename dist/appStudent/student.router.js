"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_create_router_1 = __importDefault(require("./studentRoute/student.create.router"));
class StudentRouter {
    constructor() {
        this.StudentRouter = (0, express_1.Router)();
        this.studentCreateRouter = new student_create_router_1.default; //controller
        this.callRouter();
    }
    callRouter() {
        this.StudentRouter.use("/", this.studentCreateRouter.router);
    }
}
exports.default = StudentRouter;
//# sourceMappingURL=student.router.js.map
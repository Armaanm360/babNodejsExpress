"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const student_create_controller_1 = __importDefault(require("./../studentController/student.create.controller"));
class studentCreateRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.studentCreateController = new student_create_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        this.router
            .route('/id-type/:id/:type')
            .get(this.studentCreateController.getStudentIdAndType);
        this.router.route('/student-view').get(this.studentCreateController.getStudent);
        this.router.route('/id-wise/:id').get(this.studentCreateController.getStudentIdWise);
    }
}
exports.default = studentCreateRouter;
//# sourceMappingURL=student.create.router.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_controller_1 = __importDefault(require("../../abstract/abstract.controller"));
const student_create_service_1 = __importDefault(require("./../studentService/student.create.service"));
class StudentCreateController extends abstract_controller_1.default {
    constructor() {
        super(...arguments);
        this.createStudentService = new student_create_service_1.default();
        this.getStudent = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const profile = yield this.createStudentService.getStudent();
            res.status(201).json(profile);
        }));
    }
}
exports.default = StudentCreateController;
//# sourceMappingURL=student.create.controller.js.map
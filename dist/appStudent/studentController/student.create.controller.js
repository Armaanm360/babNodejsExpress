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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_controller_1 = __importDefault(require("../../abstract/abstract.controller"));
const student_create_service_1 = __importDefault(require("./../studentService/student.create.service"));
const student_find_service_1 = __importDefault(require("../studentService/student.find.service"));
const student_idAndType_service_1 = __importDefault(require("../studentService/student.idAndType.service"));
class StudentCreateController extends abstract_controller_1.default {
    constructor() {
        super(...arguments);
        this.createStudentService = new student_create_service_1.default();
        this.findStudent = new student_find_service_1.default();
        this.findIdAndType = new student_idAndType_service_1.default();
        this.getStudent = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const profile = yield this.createStudentService.getStudent();
            res.status(201).json(profile);
        }));
        this.getStudentIdWise = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const _a = yield this.findStudent.findAnyStudent(parseInt(id)), { code } = _a, student = __rest(_a, ["code"]);
            res.status(code).json(student);
        }));
        this.getStudentIdAndType = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { type } = req.params;
            const _b = yield this.findIdAndType.findAnyType(parseInt(id), type), { code } = _b, student = __rest(_b, ["code"]);
            res.status(code).json(student);
        }));
    }
}
exports.default = StudentCreateController;
//# sourceMappingURL=student.create.controller.js.map
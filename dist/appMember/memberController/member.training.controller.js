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
const member_training_service_1 = __importDefault(require("../memberService/member.training.service"));
class MemberTrainingController extends abstract_controller_1.default {
    constructor() {
        super();
        this.memberTrainingService = new member_training_service_1.default();
        // get all training controller
        this.getAllTrainingRequest = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const _a = yield this.memberTrainingService.getAllTraining(), { code } = _a, data = __rest(_a, ["code"]);
            res.status(code).json(data);
        }));
        // get single training controller
        this.getSingleTrainingRequest = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const _b = yield this.memberTrainingService.getSingleTrainingTrainee(parseInt(id)), { code } = _b, data = __rest(_b, ["code"]);
            res.status(code).json(data);
        }));
        // create training trainee request controller
        this.acceptedTraineeRequest = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { training_id, member_id } = req.query;
            const _c = yield this.memberTrainingService.traineeRequest(req, training_id, member_id), { code } = _c, data = __rest(_c, ["code"]);
            res.status(code).json(data);
        }));
        // get recent training controller
        this.getRecentTraining = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id: member_id } = req.params;
            const _d = yield this.memberTrainingService.getRecentTraining(parseInt(member_id)), { code } = _d, data = __rest(_d, ["code"]);
            res.status(code).json(data);
        }));
    }
}
exports.default = MemberTrainingController;
//# sourceMappingURL=member.training.controller.js.map
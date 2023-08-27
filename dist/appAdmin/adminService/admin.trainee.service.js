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
const abstract_service_1 = __importDefault(require("../../abstract/abstract.service"));
class AdminTraineeService extends abstract_service_1.default {
    constructor() {
        super();
    }
    // get single trainee by trainee id
    getSingleTraineeByTraineeId(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield this.db('user_trainee AS ut ')
                .select('ut.id', 'ut.name', 'tt.designation', 'tt.email', 'um.name AS member_name', 'tt.name_en', 'tt.name_bn', 'tt.official_address', 'tt.residential_contact_number', 'tt.official_contact_number', 'tt.residential_address', 'tt.date_of_birth', 'tt.last_education_qualification', 'tt.board', 'tt.exam', 'tt.division', 'tt.year', 'tt.group_subject', 'tt.total_work_exp', 'tt.proffessional_qualification', 'tt.workshop_attended', 'tt.signature')
                .join('training_trainee  AS tt', 'ut.id', 'tt.user_trainee_id')
                .join('user_member AS um', 'ut.user_member_id', 'um.id')
                .andWhere('ut.id', id);
            if (!data.length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_NOT_FOUND,
                    message: this.ResMsg.HTTP_NOT_FOUND,
                };
            }
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                data: data[0],
            };
        });
    }
    // get all trainee by training member id
    getAllTraineeByMemberIdAndTraineeId(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { trainingMemberId, trainingId } = req.params;
            const data = yield this.db('training_trainee  AS tt')
                .select('ut.id', 'ut.name', 'tt.designation', 'tt.email')
                .join('user_trainee AS ut', 'tt.user_trainee_id', 'ut.id')
                .andWhere('tt.training_member_id', trainingMemberId)
                .andWhere('tt.training_id', trainingId);
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                data,
            };
        });
    }
}
exports.default = AdminTraineeService;
//# sourceMappingURL=admin.trainee.service.js.map
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
const abstract_service_1 = __importDefault(require("../../abstract/abstract.service"));
const lib_1 = __importDefault(require("../../utils/lib/lib"));
const sendEmailForTraining_1 = require("../../templates/sendEmailForTraining");
const common_procedure_1 = require("../../utils/procedure/common-procedure");
class AdminTrainingService extends abstract_service_1.default {
    constructor() {
        super();
    }
    createTraining(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.admin;
                const _a = req.body, { training_members } = _a, rest = __rest(_a, ["training_members"]);
                const training_member_json = JSON.parse(training_members);
                if (!training_member_json.length) {
                    return {
                        success: false,
                        code: this.StatusCode.HTTP_BAD_REQUEST,
                        message: this.ResMsg.HTTP_BAD_REQUEST,
                    };
                }
                const files = req.files || [];
                if (files.length) {
                    files.forEach((item) => {
                        rest[item.fieldname] = item.filename;
                    });
                }
                // inserted training
                const trainingRes = yield trx('training').insert(Object.assign(Object.assign({}, rest), { created_by: id }));
                const trainingMemberInput = [];
                const trainingMember = [];
                training_member_json.map((item) => {
                    trainingMemberInput.push({
                        training_id: trainingRes[0],
                        member_id: item,
                    });
                    trainingMember.push(item);
                });
                // inserted training member
                const trainingMemberRes = yield trx('training_member').insert(trainingMemberInput);
                // get member list for send email
                const memberList = yield trx('user_member')
                    .select('email', 'name')
                    .whereIn('id', trainingMember);
                // sending email for each member
                memberList.map((item) => __awaiter(this, void 0, void 0, function* () {
                    yield lib_1.default.sendEmail(item.email, 'New training arranged by BAB', (0, sendEmailForTraining_1.sendEmailForTraining)(item.name));
                }));
                if (trainingMemberRes.length) {
                    return {
                        success: true,
                        code: this.StatusCode.HTTP_SUCCESSFUL,
                        message: this.ResMsg.HTTP_SUCCESSFUL,
                        data: {
                            id: trainingRes[0],
                        },
                    };
                }
                return {
                    success: false,
                    code: this.StatusCode.HTTP_BAD_REQUEST,
                    message: this.ResMsg.HTTP_BAD_REQUEST,
                };
            }));
        });
    }
    // get all training
    getAllTraining(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, from_date, to_date, limit, skip } = req.query;
            const endDate = new Date(to_date);
            endDate.setDate(endDate.getDate() + 1);
            const dtbs = this.db('training');
            if (limit && skip) {
                dtbs.limit(parseInt(limit));
                dtbs.offset(parseInt(skip));
            }
            const data = yield dtbs
                .select('id', 'title', 'created_at', 'status')
                .where(function () {
                if (status) {
                    this.andWhere({ status });
                }
                if (from_date && to_date) {
                    this.andWhereBetween('created_at', [from_date, endDate]);
                }
            });
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                data,
            };
        });
    }
    // get single training
    getSingleTraining(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield (0, common_procedure_1.callSingleParamStoredProcedure)('getSingleTraining', parseInt(id));
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
    // update single training
    updateSingleTraining(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const files = req.files || [];
            if (files === null || files === void 0 ? void 0 : files.length) {
                files.forEach((item) => {
                    req.body[item.fieldname] = item.filename;
                });
            }
            const res = yield this.db('training').update(req.body).where({ id });
            if (!res) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_BAD_REQUEST,
                    message: this.ResMsg.HTTP_BAD_REQUEST,
                };
            }
            const response = {
                success: true,
                code: this.StatusCode.HTTP_SUCCESSFUL,
                message: this.ResMsg.HTTP_SUCCESSFUL,
            };
            if (files === null || files === void 0 ? void 0 : files.length) {
                files.forEach((item) => {
                    response[item.fieldname] = item.filename;
                });
            }
            return response;
        });
    }
}
exports.default = AdminTrainingService;
//# sourceMappingURL=admin.training.service.js.map
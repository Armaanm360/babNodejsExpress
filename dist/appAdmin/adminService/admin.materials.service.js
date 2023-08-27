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
const common_procedure_1 = require("../../utils/procedure/common-procedure");
const lib_1 = __importDefault(require("../../utils/lib/lib"));
const sendEmailForTrainingMaterials_1 = require("../../templates/sendEmailForTrainingMaterials");
class AdminMaterialsService extends abstract_service_1.default {
    constructor() {
        super();
    }
    // create Materials
    createMaterials(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const { id } = req.admin;
                const checkTraining = yield trx('training')
                    .select('title')
                    .where({ id: req.body.training_id });
                if (!checkTraining.length) {
                    return {
                        success: false,
                        code: this.StatusCode.HTTP_NOT_FOUND,
                        message: this.ResMsg.HTTP_NOT_FOUND,
                    };
                }
                const files = req.files || [];
                if (files === null || files === void 0 ? void 0 : files.length) {
                    req.body[files[0].fieldname] = files[0].filename;
                }
                const res = yield trx('training_materials').insert(Object.assign(Object.assign({}, req.body), { created_by: id }));
                if (!res.length) {
                    return {
                        success: false,
                        code: this.StatusCode.HTTP_INTERNAL_SERVER_ERROR,
                        message: this.ResMsg.HTTP_INTERNAL_SERVER_ERROR,
                    };
                }
                // get all training trainee under this training
                const getAllApprovedTrainee = yield trx('training_trainee AS tt')
                    .select('ut.email', 'ut.name')
                    .join('user_trainee AS ut', 'tt.user_trainee_id', 'ut.id')
                    .andWhere('ut.status', '1')
                    .andWhere('tt.training_id', req.body.training_id);
                if (getAllApprovedTrainee.length) {
                    getAllApprovedTrainee.forEach((item) => __awaiter(this, void 0, void 0, function* () {
                        yield lib_1.default.sendEmail(item.email, 'Materials added in training', (0, sendEmailForTrainingMaterials_1.sendEmailForTrainingMaterials)(item.name));
                    }));
                }
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    message: this.ResMsg.HTTP_SUCCESSFUL,
                    data: { id: res[0], file: (_a = files[0]) === null || _a === void 0 ? void 0 : _a.filename },
                };
            }));
        });
    }
    // get single Materials
    getSingleMaterials(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield (0, common_procedure_1.callSingleParamStoredProcedure)('getSingleClassByClassId', parseInt(id));
            console.log(data);
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
                data,
            };
        });
    }
}
exports.default = AdminMaterialsService;
//# sourceMappingURL=admin.materials.service.js.map
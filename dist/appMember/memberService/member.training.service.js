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
const lib_1 = __importDefault(require("../../utils/lib/lib"));
const newTrainee_1 = require("../../templates/newTrainee");
class MemberTrainingService extends abstract_service_1.default {
    constructor() {
        super();
    }
    // get all training request
    getAllTraining() {
        return __awaiter(this, void 0, void 0, function* () {
            const upcomingTraining = yield this.db("training as tr")
                .select("tr.id", "tr.title", "tr.start_date", "tr.status")
                .where({ status: "upcoming" })
                .orderBy("created_at", "desc");
            if (!upcomingTraining.length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_NOT_FOUND,
                    message: this.ResMsg.HTTP_NOT_FOUND,
                };
            }
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                data: upcomingTraining,
            };
        });
    }
    // get single training request
    getSingleTrainingTrainee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const singleTrainingTrainee = yield this.db("training as tr")
                .select("tr.id", "tr.title", "tr.details", "tr.start_date", "tr.trainer_photo", "tr.trainer_name", "tr.trainer_details")
                .where("tr.id", id);
            if (!singleTrainingTrainee.length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_NOT_FOUND,
                    message: this.ResMsg.HTTP_NOT_FOUND,
                };
            }
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                data: singleTrainingTrainee[0],
            };
        });
    }
    // create training request
    traineeRequest(req, training_id, member_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((tr) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c;
                const body = req.body;
                let user_trainee_id = yield this.db("user_trainee")
                    .select("id")
                    .where("user_member_id", member_id);
                const training_member_id = yield this.db("training_member")
                    .select("id")
                    .where("member_id", member_id);
                body.training_id = parseInt(training_id);
                body.training_member_id = training_member_id[0].id;
                body.user_trainee_id = user_trainee_id[0].id;
                let checkAppliedTrainee = yield this.db("training_trainee as tr")
                    .count("tr.user_trainee_id as trainee")
                    .where("tr.training_id", body.training_id);
                if (checkAppliedTrainee.length > 3 || checkAppliedTrainee.length < 1) {
                    return {
                        success: false,
                        code: this.StatusCode.HTTP_UNPROCESSABLE_ENTITY,
                        message: "Applied trainee must be within 1 to 3",
                    };
                }
                const checkEmailAndPhoneForTrainee = yield this.db("user_trainee as ut").whereIn("ut.email", [body.email]);
                // .orWhere("ut.phone", "=", body.phone); // TODO -> After adding the phone then the code will be working (Admin will add this)
                if (checkEmailAndPhoneForTrainee.length) {
                    return {
                        success: false,
                        code: this.StatusCode.HTTP_CONFLICT,
                        message: "This trainee already applied",
                    };
                }
                const files = req.files || [];
                if (files === null || files === void 0 ? void 0 : files.length) {
                    req.body[files[0].fieldname] = files[0].filename;
                }
                const traineeData = {};
                const password = lib_1.default.otpGenNumberAndAlphabet(8);
                const hashPass = lib_1.default.hashPass(password);
                traineeData.password = yield hashPass;
                traineeData.name = body.name_en;
                traineeData.user_member_id = (_a = parseInt(member_id)) !== null && _a !== void 0 ? _a : null;
                traineeData.designation = (_b = body.designation) !== null && _b !== void 0 ? _b : null;
                traineeData.email = (_c = body.email) !== null && _c !== void 0 ? _c : null;
                yield tr("user_trainee").insert(traineeData);
                const template = (0, newTrainee_1.newTrainee)(traineeData.email, password);
                yield lib_1.default.sendEmail(traineeData.email, "New Trainee is Created", template);
                const trainingRequest = yield tr("training_trainee").insert(body);
                if (!trainingRequest.length) {
                    return {
                        success: false,
                        code: this.StatusCode.HTTP_UNPROCESSABLE_ENTITY,
                        message: this.ResMsg.HTTP_UNPROCESSABLE_ENTITY,
                    };
                }
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    data: trainingRequest,
                };
            }));
        });
    }
    // get recent training request
    getRecentTraining(member_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const recentTraining = yield this.db("training_trainee as tr")
                .select("tt.id", "tt.title", "tt.details", "tt.start_date", "tt.trainer_photo", "tt.trainer_name", "tt.trainer_details")
                .leftJoin("training as tt", "tr.training_id", "tt.id")
                .where("tr.training_member_id", member_id);
            if (!recentTraining.length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_NOT_FOUND,
                    message: this.ResMsg.HTTP_NOT_FOUND,
                };
            }
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                data: recentTraining,
            };
        });
    }
}
exports.default = MemberTrainingService;
//# sourceMappingURL=member.training.service.js.map
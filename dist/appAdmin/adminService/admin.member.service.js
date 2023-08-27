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
const newMemberAccount_1 = require("../../templates/newMemberAccount");
const lib_1 = __importDefault(require("../../utils/lib/lib"));
const common_procedure_1 = require("../../utils/procedure/common-procedure");
class AdminMemberService extends abstract_service_1.default {
    constructor() {
        super();
    }
    // create member service
    createMember(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                console.log({ payload });
                const { boardCommittee } = payload, body = __rest(payload, ["boardCommittee"]);
                const check = yield trx('user_member')
                    .select('*')
                    .where('email', payload.email);
                if (check.length) {
                    return {
                        success: false,
                        code: this.StatusCode.HTTP_CONFLICT,
                        message: 'Email already exist',
                    };
                }
                const password = lib_1.default.otpGenNumberAndAlphabet(8);
                const hashPass = yield lib_1.default.hashPass(password);
                body.password = hashPass;
                const member = yield trx('user_member').insert(body);
                const committee = boardCommittee.map((item) => {
                    return Object.assign(Object.assign({}, item), { user_member_id: member[0] });
                });
                yield trx('member_committee_members').insert(committee);
                const template = (0, newMemberAccount_1.newMemberAccount)(body.email, password);
                yield lib_1.default.sendEmail(body.email, 'Your BAB Membership account is Created', template);
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    message: this.ResMsg.HTTP_SUCCESSFUL,
                    data: {
                        id: member[0],
                        avatar: payload.avatar,
                        chairman_signature: payload.chairman_signature,
                    },
                };
            }));
        });
    }
    // get member service
    getMember(props) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const members = yield trx('user_member')
                    .select('id', 'name', 'email', 'avatar', 'status')
                    .andWhere((qb) => {
                    if (props.status) {
                        qb.andWhere({ status: props.status });
                    }
                })
                    .orderBy('created_at', 'desc');
                return {
                    success: true,
                    code: this.StatusCode.HTTP_OK,
                    data: members,
                };
            }));
        });
    }
    // get single member
    getSingleMember(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const member = yield (0, common_procedure_1.callSingleParamStoredProcedure)('getSingleMember', id);
            if (!member.length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_NOT_FOUND,
                    message: this.ResMsg.HTTP_NOT_FOUND,
                };
            }
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                message: this.ResMsg.HTTP_OK,
                data: member[0],
            };
        });
    }
    // update member service
    updateMember(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Object.keys(payload).length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_BAD_REQUEST,
                    message: this.ResMsg.HTTP_BAD_REQUEST,
                };
            }
            const check = yield this.db('user_member')
                .select('avatar', 'chairman_signature')
                .where({ id });
            if (!check.length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_NOT_FOUND,
                    message: this.ResMsg.HTTP_NOT_FOUND,
                };
            }
            const data = yield this.db('user_member').update(payload).where({ id });
            if (data) {
                const deleteFiles = [];
                if (check[0].avatar && payload.avatar) {
                    deleteFiles.push(check[0].avatar);
                }
                if (check[0].chairman_signature && payload.chairman_signature) {
                    deleteFiles.push(check[0].chairman_signature);
                }
                if (deleteFiles.length) {
                    yield this.manageFile.deleteFromCloud(deleteFiles);
                }
                return {
                    success: true,
                    code: this.StatusCode.HTTP_ACCEPTED,
                    message: this.ResMsg.HTTP_ACCEPTED,
                };
            }
            else {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_INTERNAL_SERVER_ERROR,
                    message: this.ResMsg.HTTP_INTERNAL_SERVER_ERROR,
                };
            }
        });
    }
}
exports.default = AdminMemberService;
//# sourceMappingURL=admin.member.service.js.map
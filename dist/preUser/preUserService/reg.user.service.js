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
const common_service_1 = __importDefault(require("./../../common/commonService/common.service"));
class preUserRegisterService extends abstract_service_1.default {
    constructor() {
        super();
        this.commonService = new common_service_1.default();
    }
    createReg({ name, email, password, 
    // payment_status,
    deviceuniID, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashpass = yield lib_1.default.hashPass(password);
            //check where it is exsist or not
            const checkforemail = yield this.commonService.checkUserByUniqueKey({
                table: 'users',
                field: 'email',
                value: email,
            });
            //checking condition
            if (!checkforemail) {
                const res = yield this.db('users').insert({
                    name,
                    email,
                    password: hashpass,
                    // payment_status,
                });
                const userid = res[0];
                const deviceInsert = yield this.db('user_device').insert({
                    userid,
                    deviceuniID,
                });
                if (res.length) {
                    return {
                        success: true,
                        code: 201,
                        message: 'User Added Successfull',
                        data: { name, email, password },
                    };
                }
                else {
                    return {
                        success: false,
                        code: 401,
                        message: 'data not found',
                    };
                }
            }
            else {
                return {
                    success: false,
                    code: 401,
                    message: 'Email Already Exsists',
                };
            }
        });
    }
}
exports.default = preUserRegisterService;
//# sourceMappingURL=reg.user.service.js.map
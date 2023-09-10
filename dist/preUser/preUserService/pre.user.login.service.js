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
class LoginUserService extends abstract_service_1.default {
    constructor() {
        super();
    }
    loginService({ email, password, deviceId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkuser = yield this.db('users').select('*').where({ email });
            if (!checkuser.length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_BAD_REQUEST,
                    message: this.ResMsg.WRONG_CREDENTIALS,
                };
            }
            const { userid } = checkuser[0];
            const checkDeviceId = yield this.db('user_device AS ud')
                .select('device_id')
                .join('users AS u', 'ud.userid', 'u.userid')
                .andWhere({ email })
                .andWhere({ deviceuniId: deviceId });
            if (!checkDeviceId.length) {
                yield this.db('user_device').insert({
                    userid,
                    deviceuniId: deviceId,
                });
                const deactiveRes = yield this.db('user_device')
                    .update({ device_status: 0 })
                    .andWhere({ userid })
                    .andWhereNot({ deviceuniID: deviceId });
            }
            else {
                const { device_id } = checkDeviceId[0];
                yield this.db('user_device')
                    .update({ device_status: 1 })
                    .where({ device_id });
                yield this.db('user_device')
                    .update({ device_status: 0 })
                    .andWhere({ userid })
                    .andWhereNot({ deviceuniID: deviceId });
            }
            const _a = checkuser[0], { password: hashPass } = _a, rest = __rest(_a, ["password"]);
            const checkPass = yield lib_1.default.compare(password, hashPass);
            if (!checkPass) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_BAD_REQUEST,
                    message: this.ResMsg.WRONG_CREDENTIALS,
                };
            }
            // cont token = Lib.createToken();
            return {
                success: true,
                code: 201,
                message: 'Logged In Successfully',
                data: { checkuser },
            };
        });
    }
}
exports.default = LoginUserService;
//# sourceMappingURL=pre.user.login.service.js.map
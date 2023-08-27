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
const admin_admin_service_1 = __importDefault(require("../adminService/admin.admin.service"));
const lib_1 = __importDefault(require("../../utils/lib/lib"));
const common_service_1 = __importDefault(require("../../common/commonService/common.service"));
class AdminAdminController extends abstract_controller_1.default {
    constructor() {
        super();
        this.adminAdminServices = new admin_admin_service_1.default();
        this.commonService = new common_service_1.default();
        // get profile controller
        this.getProfile = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.admin;
            const _a = yield this.adminAdminServices.getProfile(id), { code } = _a, data = __rest(_a, ["code"]);
            res.status(code).json(data);
        }));
        // create admin controller
        this.createAdmin = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, role, phone } = req.body;
            const files = req.files || [];
            if (!files.length) {
                res.status(this.StatusCode.HTTP_UNPROCESSABLE_ENTITY).json({
                    success: false,
                    message: `You must provide avatar to create admin`,
                });
                return;
            }
            const checkAdmin = yield this.commonService.checkUserByUniqueKey({
                table: 'user_admin',
                field: 'email',
                value: email,
            });
            if (checkAdmin) {
                res.status(this.StatusCode.HTTP_CONFLICT).json({
                    success: false,
                    message: 'Email already exist.',
                });
                return;
            }
            const hashedPass = yield lib_1.default.hashPass(password);
            const _b = yield this.adminAdminServices.createAdmin({
                name,
                email,
                password: hashedPass,
                role,
                phone,
                avatar: files[0].filename,
            }), { code } = _b, data = __rest(_b, ["code"]);
            if (data.success) {
                res.status(code).json(data);
            }
            else {
                this.error(data.message, code);
            }
        }));
        // get admin controller
        this.getAdmin = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { status, skip, limit, name } = req.query;
            const _c = yield this.adminAdminServices.getAdmin(name, parseInt(status || ''), parseInt(skip || ''), parseInt(limit || '')), { code } = _c, data = __rest(_c, ["code"]);
            res.status(code).json(data);
        }));
        // get single admin controller
        this.getSingleAdmin = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const _d = yield this.adminAdminServices.getAnAdmin(id), { code } = _d, data = __rest(_d, ["code"]);
            res.status(code).json(data);
        }));
        // update an admin controller
        this.updateAdmin = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const _e = req.body, { _id, _password, _created_at } = _e, restBody = __rest(_e, ["_id", "_password", "_created_at"]);
            const files = req.files || [];
            if (files.length) {
                restBody.avatar = files[0].filename;
            }
            const _f = yield this.adminAdminServices.updateAdmin(id, restBody), { code } = _f, data = __rest(_f, ["code"]);
            if (data.success) {
                res.status(code).json(data);
            }
            else {
                this.error(data.message, code);
            }
        }));
    }
}
exports.default = AdminAdminController;
//# sourceMappingURL=admin.admin.controller.js.map
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
const audit_trail_crud_service_1 = __importDefault(require("../service/audit.trail.crud.service"));
class AuditTrailCrudController extends abstract_controller_1.default {
    constructor() {
        super();
        this.crateService = new audit_trail_crud_service_1.default();
        this.createControll = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { audit_app_id, audit_app_device_id, audit_app_location, audit_app_email, audit_app_latitude, audit_app_longitude, audit_app_detail, audit_app_crashed, audit_app_user_type, app_audit_date, audit_app_user_number, limit, } = req.body;
            const _a = yield this.crateService.createAuditTrail({
                audit_app_id,
                audit_app_device_id,
                audit_app_location,
                audit_app_email,
                audit_app_latitude,
                audit_app_longitude,
                audit_app_detail,
                audit_app_crashed,
                audit_app_user_type,
                app_audit_date,
                audit_app_user_number,
                limit,
            }), { code } = _a, data = __rest(_a, ["code"]);
            res.status(code).json(data);
        }));
        this.getList = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { audit_app_device_id, audit_app_location, audit_app_email, app_audit_date, audit_app_user_number, limit, } = req.query;
            const audit = yield this.crateService.getList(String(audit_app_device_id), String(audit_app_location), String(audit_app_email), String(app_audit_date), String(audit_app_user_number), Number(limit));
            res.status(201).json(audit);
        }));
    }
}
exports.default = AuditTrailCrudController;
//# sourceMappingURL=audit.trail.crud.controller.js.map
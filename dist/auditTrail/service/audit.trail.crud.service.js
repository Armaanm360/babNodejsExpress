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
class AuditTrailCrudService extends abstract_service_1.default {
    constructor() {
        super();
    }
    createAuditTrail({ audit_app_id, audit_app_device_id, audit_app_location, audit_app_email, audit_app_latitude, audit_app_longitude, audit_app_detail, audit_app_crashed, audit_app_user_type, audit_app_user_number, app_audit_date, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db('audit').insert({
                audit_app_id,
                audit_app_device_id,
                audit_app_location,
                audit_app_email,
                audit_app_latitude,
                audit_app_longitude,
                audit_app_detail,
                audit_app_crashed,
                audit_app_user_type,
                audit_app_user_number,
                app_audit_date,
            });
            if (res.length) {
                return {
                    success: true,
                    code: 201,
                    message: 'Transaction added successfully',
                    data: {
                        audit_app_id,
                        audit_app_device_id,
                        audit_app_location,
                        audit_app_email,
                        audit_app_latitude,
                        audit_app_longitude,
                        audit_app_detail,
                        audit_app_crashed,
                        audit_app_user_type,
                        audit_app_user_number,
                        app_audit_date,
                    },
                };
            }
            else {
                return {
                    success: false,
                    code: 401,
                    message: 'data not found',
                };
            }
        });
    }
    getList(audit_app_device_id, audit_app_location, audit_app_email, audit_app_user_number, app_audit_date, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            // const audit = await this.db('audit')
            //   .select(
            //     'audit.audit_id',
            //     'audit.audit_app_id',
            //     'audit.audit_app_device_id',
            //     'audit.audit_app_location',
            //     'audit.audit_app_email',
            //     'audit.audit_app_latitude',
            //     'audit.audit_app_longitude',
            //     'audit.audit_app_detail',
            //     'audit.audit_app_crashed',
            //     'audit.audit_app_user_type',
            //     'audit.audit_app_user_number',
            //     'audit.app_audit_date',
            //     'audit.created_at',
            //     'apps.app_id',
            //     'apps.app_name',
            //     'apps.app_detail'
            //   )
            //   .join('apps', 'audit.audit_app_id', 'apps.app_id')
            //   .andWhere((qb) => {
            //     if (audit_app_device_id) {
            //       qb.andWhere('audit_app_device_id', audit_app_device_id);
            //     }
            //   });
            const audit = yield this.db('audit')
                .select('audit.audit_id', 'audit.audit_app_id', 'audit.audit_app_device_id', 'audit.audit_app_location', 'audit.audit_app_email', 'audit.audit_app_latitude', 'audit.audit_app_longitude', 'audit.audit_app_detail', 'audit.audit_app_crashed', 'audit.audit_app_user_type', 'audit.audit_app_user_number', 'audit.app_audit_date', 'audit.created_at', 'apps.app_id', 'apps.app_name', 'apps.app_detail')
                .join('apps', 'audit.audit_app_id', 'apps.app_id')
                .limit(limit)
                .where((qb) => {
                if (audit_app_device_id) {
                    qb.andWhere('audit_app_device_id', audit_app_device_id);
                }
                if () {
                }
            });
            const totalCount = yield this.db('audit').count();
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                data: audit,
                total: totalCount[0]['count(*)'],
            };
        });
    }
}
exports.default = AuditTrailCrudService;
//# sourceMappingURL=audit.trail.crud.service.js.map
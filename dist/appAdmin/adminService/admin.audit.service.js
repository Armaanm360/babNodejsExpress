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
class AdminAuditService extends abstract_service_1.default {
    constructor() {
        super();
    }
    // get audit trail
    getAudit({ status, from_date, to_date, admin_id, limit, skip, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.db('audit_trail as at')
                .select('at.id', 'at.details', 'at.status', 'at.created_at', 'ua.id as admin_id', 'ua.name as admin_name')
                .join('user_admin as ua', 'at.admin_id', 'ua.id')
                .andWhere((qb) => {
                if (status) {
                    qb.andWhere('at.status', status);
                }
                if (admin_id) {
                    qb.andWhere('at.admin_id', admin_id);
                }
                if (from_date && to_date) {
                    qb.andWhereBetween('at.created_at', [from_date, to_date]);
                }
            });
            if (limit && skip) {
                query.limit(limit).offset(skip);
            }
            const data = yield query;
            const total = (yield this.db('audit_trail')
                .count('id AS total')
                .andWhere((qb) => {
                if (status) {
                    qb.andWhere('at.status', status);
                }
                if (admin_id) {
                    qb.andWhere('at.admin_id', admin_id);
                }
                if (from_date && to_date) {
                    qb.andWhereBetween('at.created_at', [from_date, to_date]);
                }
            }))[0].total;
            return {
                code: this.StatusCode.HTTP_OK,
                success: true,
                message: this.ResMsg.HTTP_OK,
                data,
                total,
            };
        });
    }
}
exports.default = AdminAuditService;
//# sourceMappingURL=admin.audit.service.js.map
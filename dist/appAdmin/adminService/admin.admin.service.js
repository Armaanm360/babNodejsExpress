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
class AdminAdminService extends abstract_service_1.default {
    constructor() {
        super();
    }
    // get profile service for authentication/authorization
    getProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.db('user_admin AS ua')
                .select('ua.id', 'email', 'ua.name AS admin_name', 'ua.avatar', 'ar.name AS role_name', 'ua.status')
                .join('admin_role AS ar', 'ua.role', 'ar.id')
                .where('ua.id', id);
            if (data.length) {
                return {
                    success: true,
                    code: this.StatusCode.HTTP_OK,
                    data: data[0],
                };
            }
            else {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_NOT_FOUND,
                    message: this.ResMsg.HTTP_NOT_FOUND,
                };
            }
        });
    }
    // create admin service
    createAdmin(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.db('user_admin')
                .select('*')
                .where('email', payload.email);
            if (check.length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_CONFLICT,
                    message: 'Email already exist',
                };
            }
            const data = yield this.db('user_admin').insert(payload);
            if (data.length) {
                return {
                    success: true,
                    data: {
                        id: data[0],
                        avatar: payload.avatar,
                    },
                    message: this.ResMsg.HTTP_SUCCESSFUL,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                };
            }
            else {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_BAD_REQUEST,
                    message: this.ResMsg.HTTP_BAD_REQUEST,
                };
            }
        });
    }
    // get all admin service with filter skip limit for pagination
    getAdmin(name, status, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.db('user_admin AS ua')
                .select('ua.id', 'ua.name', 'ua.avatar', 'ar.name AS role_name', 'ua.status')
                .join('admin_role AS ar', 'ua.role', 'ar.id')
                .andWhere((qb) => {
                if (status) {
                    qb.andWhere('ua.status', status);
                }
                if (name) {
                    qb.andWhereILike('ua.name', `%${name}%`);
                }
            })
                .orderBy('ua.created_at', 'desc');
            let total = (yield this.db('user_admin')
                .count('id AS total')
                .andWhere((qb) => {
                if (status) {
                    qb.andWhere('ua.status', status);
                }
                if (name) {
                    qb.andWhereILike('ua.name', `%${name}%`);
                }
            }))[0].total;
            if (skip && limit) {
                query.limit(limit).offset(skip);
            }
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                data: yield query,
                total,
            };
        });
    }
    // get a single admin with all information
    getAnAdmin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.db('user_admin AS ua')
                .select('ua.id', 'ua.name', 'ua.email', 'ua.phone', 'ua.avatar', 'ar.name AS role_name', 'ar.id AS role_id', 'ua.status', 'ua.created_at')
                .join('admin_role AS ar', 'ua.role', 'ar.id')
                .where('ua.id', id);
            if (data.length) {
                return {
                    success: true,
                    code: this.StatusCode.HTTP_OK,
                    data: data[0],
                };
            }
            else {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_NOT_FOUND,
                    message: this.ResMsg.HTTP_NOT_FOUND,
                };
            }
        });
    }
    // update an admin service status, role etc
    updateAdmin(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Object.keys(payload).length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_BAD_REQUEST,
                    message: this.ResMsg.HTTP_BAD_REQUEST,
                };
            }
            const check = yield this.db('user_admin').select('avatar').where({ id });
            if (!check.length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_NOT_FOUND,
                    message: this.ResMsg.HTTP_NOT_FOUND,
                };
            }
            const data = yield this.db('user_admin').update(payload).where({ id });
            if (data) {
                if (check[0].avatar) {
                    yield this.manageFile.deleteFromCloud([check[0].avatar]);
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
exports.default = AdminAdminService;
//# sourceMappingURL=admin.admin.service.js.map
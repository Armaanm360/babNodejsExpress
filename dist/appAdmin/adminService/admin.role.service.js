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
class AdminRoleService extends abstract_service_1.default {
    constructor() {
        super();
    }
    // create role
    createRole(prop) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, created_by, permissions } = prop;
            const checkRole = yield this.db('admin_role')
                .select('*')
                .where({ name: name.toLowerCase() });
            if (checkRole.length) {
                return {
                    success: false,
                    message: this.ResMsg.HTTP_CONFLICT,
                };
            }
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const insertRole = yield trx('admin_role').insert({
                    name: name.toLowerCase(),
                    created_by,
                });
                const rolePermissions = permissions.map((item) => {
                    item.role_id = insertRole[0];
                    return item;
                });
                yield trx('role_permissions').insert(rolePermissions);
                return {
                    success: true,
                    message: this.ResMsg.HTTP_SUCCESSFUL,
                    data: {
                        id: insertRole[0],
                    },
                };
            }));
        });
    }
    // get role
    getRole() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.db('admin_role').select('id', 'name');
            return {
                code: this.StatusCode.HTTP_OK,
                data: data,
                message: this.ResMsg.HTTP_OK,
            };
        });
    }
    // update role
    updateRole(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, add_permissions, remove_permissions } = props;
        });
    }
}
exports.default = AdminRoleService;
//# sourceMappingURL=admin.role.service.js.map
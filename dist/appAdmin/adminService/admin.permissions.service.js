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
class AdminPermissionsService extends abstract_service_1.default {
    constructor() {
        super();
    }
    // create permission group
    createPermissionGroup(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkGroup = yield this.db('permission_group')
                .select('*')
                .where({ name: name.toLowerCase() });
            if (checkGroup.length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_CONFLICT,
                    message: this.ResMsg.HTTP_CONFLICT,
                };
            }
            const res = yield this.db('permission_group').insert({
                name: name.toLocaleLowerCase(),
            });
            return {
                success: true,
                code: this.StatusCode.HTTP_SUCCESSFUL,
                message: this.ResMsg.HTTP_SUCCESSFUL,
                data: {
                    id: res[0],
                },
            };
        });
    }
    // create permissions service
    createPermission({ group_id, name }) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db('permissions').insert({
                group_id,
                name,
            });
            if (res.length) {
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    message: this.ResMsg.HTTP_SUCCESSFUL,
                    data: {
                        id: res[0],
                    },
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
}
exports.default = AdminPermissionsService;
//# sourceMappingURL=admin.permissions.service.js.map
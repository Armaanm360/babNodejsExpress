"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const responseMessage_1 = __importDefault(require("../../../utils/miscellaneous/responseMessage"));
class AdminPermissionValidator {
    // create permission group validator
    createPermissionGroup() {
        return [(0, express_validator_1.body)('name', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY).exists().isString()];
    }
    // create permission validator
    createPermission() {
        return [
            (0, express_validator_1.body)('group_id', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY).exists().isInt(),
            (0, express_validator_1.body)('name', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY).exists().isString(),
        ];
    }
}
exports.default = AdminPermissionValidator;
//# sourceMappingURL=admin.permission.validator.js.map
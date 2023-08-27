"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const responseMessage_1 = __importDefault(require("../../../utils/miscellaneous/responseMessage"));
class AdminAdminValidator {
    // create admin validator
    createAdminValidator() {
        return [
            (0, express_validator_1.body)('name', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .exists()
                .isString()
                .notEmpty(),
            (0, express_validator_1.body)('email', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .exists()
                .isEmail()
                .notEmpty(),
            (0, express_validator_1.body)('password', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .exists()
                .isString()
                .isLength({ min: 8 })
                .withMessage('Provide minimun 8 length password'),
            (0, express_validator_1.body)('role', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY).exists().isInt(),
            (0, express_validator_1.body)('phone', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .exists()
                .isString()
                .notEmpty(),
        ];
    }
    // update admin validator
    updateAdminValidator() {
        return [
            (0, express_validator_1.body)('name', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .exists()
                .isString()
                .notEmpty()
                .optional(),
            (0, express_validator_1.body)('email', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .exists()
                .isEmail()
                .notEmpty()
                .optional(),
            (0, express_validator_1.body)('role', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .exists()
                .isInt()
                .optional(),
            (0, express_validator_1.body)('phone', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .exists()
                .isString()
                .notEmpty()
                .optional(),
        ];
    }
}
exports.default = AdminAdminValidator;
//# sourceMappingURL=admin.admin.validator.js.map
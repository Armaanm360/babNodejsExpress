"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const responseMessage_1 = __importDefault(require("../../utils/miscellaneous/responseMessage"));
class preUserValidator {
    userValidator() {
        return [
            (0, express_validator_1.body)('name', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .isString()
                .notEmpty()
                .isLength({ min: 3, max: 55 }),
            (0, express_validator_1.body)('email', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .isString()
                .notEmpty()
                .isEmail(),
            (0, express_validator_1.body)('password', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .isString()
                .notEmpty()
                .isLength({ min: 3, max: 255 }),
            (0, express_validator_1.body)('deviceuniID', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .isString()
                .notEmpty()
                .isLength({ min: 3, max: 255 }),
        ];
    }
}
exports.default = preUserValidator;
//# sourceMappingURL=pre.user.validator.js.map
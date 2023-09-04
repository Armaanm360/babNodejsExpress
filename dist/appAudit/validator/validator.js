"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const responseMessage_1 = __importDefault(require("../../utils/miscellaneous/responseMessage"));
class AppValidator {
    appValidator() {
        return [
            (0, express_validator_1.body)('app_name', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .isString()
                .notEmpty()
                .isLength({ min: 3, max: 55 }),
            (0, express_validator_1.body)('app_detail', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .isString()
                .notEmpty()
                .isLength({ min: 3, max: 255 }),
        ];
    }
}
exports.default = AppValidator;
//# sourceMappingURL=validator.js.map
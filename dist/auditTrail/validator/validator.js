"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const responseMessage_1 = __importDefault(require("../../utils/miscellaneous/responseMessage"));
class TrailValidator {
    appTrailValidator() {
        return [
            (0, express_validator_1.body)('audit_app_id', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .isNumeric()
                .notEmpty(),
            (0, express_validator_1.body)('audit_app_device_id', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .isString()
                .notEmpty()
                .isLength({ min: 3, max: 255 }),
            (0, express_validator_1.body)('audit_app_location', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .isString()
                .notEmpty()
                .isLength({ min: 3, max: 255 }),
            (0, express_validator_1.body)('audit_app_email', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .isEmail()
                .notEmpty()
                .isLength({ min: 3, max: 255 }),
            (0, express_validator_1.body)('audit_app_latitude', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .isString()
                .notEmpty()
                .isLength({ min: 3, max: 255 }),
            (0, express_validator_1.body)('audit_app_longitude', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .isString()
                .notEmpty()
                .isLength({ min: 3, max: 255 }),
            (0, express_validator_1.body)('audit_app_detail', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .isString()
                .notEmpty()
                .isLength({ min: 3, max: 255 }),
            (0, express_validator_1.body)('audit_app_crashed', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .isString()
                .notEmpty()
                .isLength({ min: 3, max: 255 }),
            (0, express_validator_1.body)('audit_app_user_type', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .isString()
                .notEmpty()
                .isLength({ min: 3, max: 255 }),
            (0, express_validator_1.body)('audit_app_user_number', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .isString()
                .notEmpty()
                .isLength({ min: 3, max: 255 }),
        ];
    }
}
exports.default = TrailValidator;
//# sourceMappingURL=validator.js.map
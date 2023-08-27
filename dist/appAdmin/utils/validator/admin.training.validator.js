"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const responseMessage_1 = __importDefault(require("../../../utils/miscellaneous/responseMessage"));
class AdminTrainingValidator {
    createTrainingValidator() {
        return [
            (0, express_validator_1.body)('title', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .exists()
                .isString()
                .notEmpty(),
            (0, express_validator_1.body)('start_date', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .exists()
                .isDate()
                .notEmpty(),
            (0, express_validator_1.body)('duration', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY).exists().notEmpty(),
            (0, express_validator_1.body)('details', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY).exists().notEmpty(),
            (0, express_validator_1.body)('trainer_name', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .exists()
                .notEmpty(),
            (0, express_validator_1.body)('trainer_details', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .exists()
                .notEmpty(),
            (0, express_validator_1.body)('trainer_remuneration', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .exists()
                .notEmpty(),
            (0, express_validator_1.body)('training_members', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .exists()
                .notEmpty(),
        ];
    }
    getAllTrainingValidator() {
        return [
            (0, express_validator_1.query)('status', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .isIn(['all', 'upcoming', 'running', 'ended', 'cancelled'])
                .optional(),
            (0, express_validator_1.query)('from_date', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY).optional().isDate(),
            (0, express_validator_1.query)('to_date', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY).optional().isDate(),
        ];
    }
    // class validator
    createClassValidator() {
        return [
            (0, express_validator_1.body)('training_id', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .exists()
                .isInt()
                .notEmpty(),
            (0, express_validator_1.body)('title', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY).exists().notEmpty(),
            (0, express_validator_1.body)('teacher', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY).exists().notEmpty(),
            (0, express_validator_1.body)('details', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY).exists().notEmpty(),
            (0, express_validator_1.body)('date', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .exists()
                .isDate()
                .notEmpty(),
            (0, express_validator_1.body)('time', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .exists()
                .isString()
                .notEmpty(),
        ];
    }
    // materials validator
    createMaterialsValidator() {
        return [
            (0, express_validator_1.body)('training_id', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .exists()
                .isInt()
                .notEmpty(),
            (0, express_validator_1.body)('title', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY).exists().notEmpty(),
            (0, express_validator_1.body)('note', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY).optional(),
        ];
    }
    // certificate validator
    createCertificateValidator() {
        return [
            (0, express_validator_1.body)('training_id', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .exists()
                .isInt()
                .notEmpty(),
            (0, express_validator_1.body)('training_trainee_id', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .exists()
                .isInt()
                .notEmpty(),
            (0, express_validator_1.body)('certificate_number', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .exists()
                .notEmpty(),
        ];
    }
}
exports.default = AdminTrainingValidator;
//# sourceMappingURL=admin.training.validator.js.map
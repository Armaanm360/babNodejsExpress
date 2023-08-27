"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class AdminAccountValidator {
    // create account validator
    createAccount() {
        return [
            (0, express_validator_1.body)('name', 'Provide valid account name').isString().not().isEmpty(),
            (0, express_validator_1.body)('details', 'Provide valid account details')
                .isString()
                .not()
                .isEmpty(),
            (0, express_validator_1.body)('branch', 'Provide valid branch name').isString().optional(),
            (0, express_validator_1.body)('account_number', 'Provide valid account number').isInt().optional(),
            (0, express_validator_1.body)('opening_balance', 'Provide valid opening balance')
                .isNumeric()
                .optional(),
        ];
    }
    //  account transfer validator
    accountTransfer() {
        return [
            (0, express_validator_1.body)('from_ac', 'Provide valid from account id').isInt().not().isEmpty(),
            (0, express_validator_1.body)('to_ac', 'Provide valid to account id').isInt().not().isEmpty(),
            (0, express_validator_1.body)('amount', 'Provide amount').exists().notEmpty(),
            (0, express_validator_1.body)('details', 'Provide valid  details').isString().not().isEmpty(),
            (0, express_validator_1.body)('remarks', 'Provide valid remarks').isString().not().isEmpty(),
        ];
    }
}
exports.default = AdminAccountValidator;
//# sourceMappingURL=admin.account.validator.js.map
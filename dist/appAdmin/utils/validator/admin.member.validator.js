"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class AdminMemberValidator {
    // create member validator
    createMemberValidator() {
        return [(0, express_validator_1.body)()];
    }
}
exports.default = AdminMemberValidator;
//# sourceMappingURL=admin.member.validator.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_service_1 = __importDefault(require("../common/commonService/common.service"));
const wrapper_1 = __importDefault(require("../common/middlewares/assyncWrapper/wrapper"));
const customEror_1 = __importDefault(require("../utils/lib/customEror"));
const responseMessage_1 = __importDefault(require("../utils/miscellaneous/responseMessage"));
const statusCode_1 = __importDefault(require("../utils/miscellaneous/statusCode"));
class AbstractController {
    constructor() {
        this.StatusCode = statusCode_1.default;
        this.createAudit = new common_service_1.default().createAuditTrailService;
        this.asyncWrapper = new wrapper_1.default();
    }
    error(message, status, type) {
        throw new customEror_1.default(message || responseMessage_1.default.HTTP_INTERNAL_SERVER_ERROR, status || statusCode_1.default.HTTP_INTERNAL_SERVER_ERROR, type || 'Internal server Error');
    }
}
exports.default = AbstractController;
//# sourceMappingURL=abstract.controller.js.map
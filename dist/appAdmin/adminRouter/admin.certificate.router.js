"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const admin_certificate_controller_1 = __importDefault(require("../adminController/admin.certificate.controller"));
const admin_training_validator_1 = __importDefault(require("../utils/validator/admin.training.validator"));
class AdminCertificateRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.adminCertificateController = new admin_certificate_controller_1.default();
        this.adminTrainingValidator = new admin_training_validator_1.default();
        this.callRouter();
    }
    callRouter() {
        // create certificate
        this.router
            .route('/')
            .post(this.uploader.cloudUploadRaw('certificate_files'), this.adminTrainingValidator.createCertificateValidator(), this.adminCertificateController.createCertificate);
    }
}
exports.default = AdminCertificateRouter;
//# sourceMappingURL=admin.certificate.router.js.map
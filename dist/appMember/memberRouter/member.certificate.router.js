"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const member_certificate_controller_1 = __importDefault(require("../memberController/member.certificate.controller"));
class MemberCertificateRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.memberCertificateController = new member_certificate_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        // get certificate router
        this.router
            .route("/:id")
            .get(this.commonValidator.commonSingleParamsIdInputValidator(), this.memberCertificateController.getMemberCertificate);
    }
}
exports.default = MemberCertificateRouter;
//# sourceMappingURL=member.certificate.router.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const member_profile_router_1 = __importDefault(require("./memberRouter/member.profile.router"));
const member_bankInfo_router_1 = __importDefault(require("./memberRouter/member.bankInfo.router"));
const member_training_router_1 = __importDefault(require("./memberRouter/member.training.router"));
const member_certificate_router_1 = __importDefault(require("./memberRouter/member.certificate.router"));
const member_notice_router_1 = __importDefault(require("./memberRouter/member.notice.router"));
const member_invoice_router_1 = __importDefault(require("./memberRouter/member.invoice.router"));
const member_executive_router_1 = __importDefault(require("./memberRouter/member.executive.router"));
const member_due_router_1 = __importDefault(require("./memberRouter/member.due.router"));
const member_single_router_1 = __importDefault(require("./memberRouter/member.single.router"));
class MemberRouter {
    constructor() {
        this.MemberRouter = (0, express_1.Router)();
        this.memberProfileRouter = new member_profile_router_1.default();
        this.memberBankInfoRouter = new member_bankInfo_router_1.default();
        this.memberTrainingRouter = new member_training_router_1.default();
        this.memberCertificateRouter = new member_certificate_router_1.default();
        this.memberNoticeRouter = new member_notice_router_1.default();
        this.memberInvoiceRouter = new member_invoice_router_1.default();
        this.committeeMemberRouter = new member_executive_router_1.default();
        this.dueMemberRouter = new member_due_router_1.default();
        this.memberSingleRouter = new member_single_router_1.default();
        this.callRouter();
    }
    callRouter() {
        //member profile routes
        this.MemberRouter.use("/", this.memberProfileRouter.router);
        //member bank-info routes
        this.MemberRouter.use("/bank-info", this.memberBankInfoRouter.router);
        //member training routes
        this.MemberRouter.use("/training", this.memberTrainingRouter.router);
        //member certificate routes
        this.MemberRouter.use("/certificate", this.memberCertificateRouter.router);
        //member notice routes
        this.MemberRouter.use("/notice", this.memberNoticeRouter.router);
        //member notice routes
        this.MemberRouter.use("/invoice", this.memberInvoiceRouter.router);
        //committee member routes
        this.MemberRouter.use("/committee", this.committeeMemberRouter.router);
        //member due routes
        this.MemberRouter.use("/due", this.dueMemberRouter.router);
        //member's renewal and upcoming meeting routes
        this.MemberRouter.use("/member-field", this.memberSingleRouter.router);
    }
}
exports.default = MemberRouter;
//# sourceMappingURL=member.router.js.map
import { Router } from "express";
import MemberProfileRouter from "./memberRouter/member.profile.router";
import MemberBankInfoRouter from "./memberRouter/member.bankInfo.router";
import MemberTrainingRouter from "./memberRouter/member.training.router";
import MemberCertificateRouter from "./memberRouter/member.certificate.router";
import MemberNoticeRouter from "./memberRouter/member.notice.router";
import MemberInvoiceRouter from "./memberRouter/member.invoice.router";
import CommitteeMemberRouter from "./memberRouter/member.executive.router";
import DueMemberRouter from "./memberRouter/member.due.router";
import MemberSingleRouter from "./memberRouter/member.single.router";

class MemberRouter {
  public MemberRouter = Router();
  private memberProfileRouter = new MemberProfileRouter();
  private memberBankInfoRouter = new MemberBankInfoRouter();
  private memberTrainingRouter = new MemberTrainingRouter();
  private memberCertificateRouter = new MemberCertificateRouter();
  private memberNoticeRouter = new MemberNoticeRouter();
  private memberInvoiceRouter = new MemberInvoiceRouter();
  private committeeMemberRouter = new CommitteeMemberRouter();
  private dueMemberRouter = new DueMemberRouter();
  private memberSingleRouter = new MemberSingleRouter();
  constructor() {
    this.callRouter();
  }

  private callRouter() {
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

export default MemberRouter;

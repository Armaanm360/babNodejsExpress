import AbstractRouter from "../../abstract/abstract.router";
import MemberCertificateController from "../memberController/member.certificate.controller";
class MemberCertificateRouter extends AbstractRouter {
  private memberCertificateController = new MemberCertificateController();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    // get certificate router
    this.router
      .route("/:id")
      .get(
        this.commonValidator.commonSingleParamsIdInputValidator(),
        this.memberCertificateController.getMemberCertificate
      );
  }
}

export default MemberCertificateRouter;

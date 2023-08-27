import AbstractRouter from "../../abstract/abstract.router";
import MemberBankInfoController from "../memberController/member.bankInfo.controller";

class MemberBankInfoRouter extends AbstractRouter {
  private memberBankInfoController = new MemberBankInfoController();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    // get profile router
    this.router.route("/").get(this.memberBankInfoController.getAllBankInfo);
  }
}

export default MemberBankInfoRouter;

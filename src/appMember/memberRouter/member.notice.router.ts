import AbstractRouter from "../../abstract/abstract.router";
import MemberNoticeController from "../memberController/member.notice.controller";
class MemberNoticeRouter extends AbstractRouter {
  private memberNoticeController = new MemberNoticeController();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    // get profile router
    this.router.route("/").get(this.memberNoticeController.getAllNotice);
  }
}

export default MemberNoticeRouter;

import AbstractRouter from "../../abstract/abstract.router";
import CommitteeMemberController from "../memberController/member.executive.controller";
class CommitteeMemberRouter extends AbstractRouter {
  private committeeMemberController = new CommitteeMemberController();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    // get all invoice router
    this.router
      .route("/")
      .get(this.committeeMemberController.getAllCommitteeMember);
  }
}

export default CommitteeMemberRouter;

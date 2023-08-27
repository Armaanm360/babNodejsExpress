import AbstractRouter from "../../abstract/abstract.router";
import DueMemberController from "../memberController/member.due.controller";
class DueMemberRouter extends AbstractRouter {
  private dueMemberController = new DueMemberController();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    // get due member router
    this.router
      .route("/:id")
      .get(
        this.commonValidator.commonSingleParamsIdInputValidator(),
        this.dueMemberController.getDueMember
      );
  }
}

export default DueMemberRouter;

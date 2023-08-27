import AbstractRouter from "../../abstract/abstract.router";
import MemberSingleController from "../memberController/member.single.controller";

class MemberSingleRouter extends AbstractRouter {
  private memberSingleController = new MemberSingleController();
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
        this.memberSingleController.getMemberSingle
      );
  }
}

export default MemberSingleRouter;

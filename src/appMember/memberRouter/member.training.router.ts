import AbstractRouter from "../../abstract/abstract.router";
import MemberTrainingController from "../memberController/member.training.controller";

class MemberTrainingRouter extends AbstractRouter {
  private memberTrainingController = new MemberTrainingController();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    // get all training router
    this.router
      .route("/")
      .get(this.memberTrainingController.getAllTrainingRequest);

    // get single training router
    this.router
      .route("/:id")
      .get(
        this.commonValidator.commonSingleParamsIdInputValidator(),
        this.memberTrainingController.getSingleTrainingRequest
      );

    // create training trainee router
    this.router
      .route("/trainee-request")
      .post(
        this.uploader.cloudUploadRaw("trainee_request"),
        this.memberTrainingController.acceptedTraineeRequest
      );

    // recent training router
    this.router
      .route("/recent-training/:id")
      .get(
        this.commonValidator.commonSingleParamsIdInputValidator(),
        this.memberTrainingController.getRecentTraining
      );
  }
}

export default MemberTrainingRouter;

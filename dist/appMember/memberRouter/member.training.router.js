"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const member_training_controller_1 = __importDefault(require("../memberController/member.training.controller"));
class MemberTrainingRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.memberTrainingController = new member_training_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        // get all training router
        this.router
            .route("/")
            .get(this.memberTrainingController.getAllTrainingRequest);
        // get single training router
        this.router
            .route("/:id")
            .get(this.commonValidator.commonSingleParamsIdInputValidator(), this.memberTrainingController.getSingleTrainingRequest);
        // create training trainee router
        this.router
            .route("/trainee-request")
            .post(this.uploader.cloudUploadRaw("trainee_request"), this.memberTrainingController.acceptedTraineeRequest);
        // recent training router
        this.router
            .route("/recent-training/:id")
            .get(this.commonValidator.commonSingleParamsIdInputValidator(), this.memberTrainingController.getRecentTraining);
    }
}
exports.default = MemberTrainingRouter;
//# sourceMappingURL=member.training.router.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const admin_trainee_controller_1 = __importDefault(require("../adminController/admin.trainee.controller"));
class AdminTraineeRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.adminTraineeController = new admin_trainee_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        //  get single trainee by trainee id
        this.router
            .route('/:id')
            .get(this.adminTraineeController.getSingleTraineeByTraineeId);
        //  get all trainee by training member id and training id
        this.router
            .route('/memberId/:trainingMemberId/trainingId/:trainingId')
            .get(this.adminTraineeController.getAllTraineeByMemberIdAndTraineeId);
    }
}
exports.default = AdminTraineeRouter;
//# sourceMappingURL=admin.trainee.router.js.map
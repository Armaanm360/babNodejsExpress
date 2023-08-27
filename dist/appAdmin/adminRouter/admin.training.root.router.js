"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const admin_training_controller_1 = __importDefault(require("../adminController/admin.training.controller"));
const admin_training_validator_1 = __importDefault(require("../utils/validator/admin.training.validator"));
class AdminRootTrainingRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.adminTrainingController = new admin_training_controller_1.default();
        this.adminTrainingValidator = new admin_training_validator_1.default();
        this.callRouter();
    }
    callRouter() {
        // create training and get all training
        this.router
            .route('/')
            .post(this.uploader.cloudUploadRaw(this.fileFolders.TRAINING_FILES), this.adminTrainingValidator.createTrainingValidator(), this.adminTrainingController.createTraining)
            .get(this.adminTrainingValidator.getAllTrainingValidator(), this.adminTrainingController.getAllTraining);
        // get single training
        this.router
            .route('/:id')
            .get(this.commonValidator.commonSingleParamsIdInputValidator(), this.adminTrainingController.getSingleTraining)
            .patch(this.uploader.cloudUploadRaw(this.fileFolders.TRAINING_FILES), this.commonValidator.commonSingleParamsIdInputValidator(), this.adminTrainingController.updateSingleTraining);
    }
}
exports.default = AdminRootTrainingRouter;
//# sourceMappingURL=admin.training.root.router.js.map
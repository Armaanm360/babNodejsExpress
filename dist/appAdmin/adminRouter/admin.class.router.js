"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const admin_class_controller_1 = __importDefault(require("../adminController/admin.class.controller"));
const admin_training_validator_1 = __importDefault(require("../utils/validator/admin.training.validator"));
class AdminClassRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.adminClassController = new admin_class_controller_1.default();
        this.adminTrainingValidator = new admin_training_validator_1.default();
        this.callRouter();
    }
    callRouter() {
        // create class
        this.router
            .route('/')
            .post(this.adminTrainingValidator.createClassValidator(), this.adminClassController.createClass);
        // get single class
        this.router
            .route('/:id')
            .get(this.commonValidator.commonSingleParamsIdInputValidator(), this.adminClassController.getSingleClass);
    }
}
exports.default = AdminClassRouter;
//# sourceMappingURL=admin.class.router.js.map
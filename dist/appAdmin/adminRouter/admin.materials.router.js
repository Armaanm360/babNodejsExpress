"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const admin_materials_controller_1 = __importDefault(require("../adminController/admin.materials.controller"));
const admin_training_validator_1 = __importDefault(require("../utils/validator/admin.training.validator"));
class AdminMaterialsRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.adminMaterialsController = new admin_materials_controller_1.default();
        this.adminTrainingValidator = new admin_training_validator_1.default();
        this.callRouter();
    }
    callRouter() {
        // create class
        this.router
            .route('/')
            .post(this.uploader.cloudUploadRaw('material_files'), this.adminTrainingValidator.createMaterialsValidator(), this.adminMaterialsController.createMaterials);
        // get single class
        this.router
            .route('/:id')
            .get(this.commonValidator.commonSingleParamsIdInputValidator(), this.adminMaterialsController.getSingleMaterials);
    }
}
exports.default = AdminMaterialsRouter;
//# sourceMappingURL=admin.materials.router.js.map
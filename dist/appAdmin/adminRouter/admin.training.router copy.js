"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_training_root_router_1 = __importDefault(require("./admin.training.root.router"));
const admin_trainee_router_1 = __importDefault(require("./admin.trainee.router"));
const admin_class_router_1 = __importDefault(require("./admin.class.router"));
const admin_materials_router_1 = __importDefault(require("./admin.materials.router"));
const admin_certificate_router_1 = __importDefault(require("./admin.certificate.router"));
class AdminTrainingRouter {
    constructor() {
        this.trainingRouter = (0, express_1.Router)();
        this.AdminRootTrainingRouter = new admin_training_root_router_1.default();
        this.AdminTraineeRouter = new admin_trainee_router_1.default();
        this.AdminClassRouter = new admin_class_router_1.default();
        this.AdminMaterialsRouter = new admin_materials_router_1.default();
        this.AdminCertificateRouter = new admin_certificate_router_1.default();
        this.callRouter();
    }
    callRouter() {
        // admin training trainee routes
        this.trainingRouter.use('/trainee', this.AdminTraineeRouter.router);
        // admin training class routes
        this.trainingRouter.use('/class', this.AdminClassRouter.router);
        // admin training class routes
        this.trainingRouter.use('/materials', this.AdminMaterialsRouter.router);
        // admin training certificate routes
        this.trainingRouter.use('/certificate', this.AdminCertificateRouter.router);
        // admin root training routes
        this.trainingRouter.use('/', this.AdminRootTrainingRouter.router);
    }
}
exports.default = AdminTrainingRouter;
//# sourceMappingURL=admin.training.router%20copy.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const audit_trail_crud_controller_1 = __importDefault(require("../controller/audit.trail.crud.controller"));
const validator_1 = __importDefault(require("../validator/validator"));
const abstract_router_1 = __importDefault(require("./../../abstract/abstract.router"));
class CrudAuditTrailRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.CrudController = new audit_trail_crud_controller_1.default();
        this.CrudValidator = new validator_1.default();
        this.callRouter();
    }
    callRouter() {
        this.router
            .route('/create')
            .post(this.CrudValidator.appTrailValidator(), this.CrudController.createControll);
        this.router.route('/list').get(this.CrudController.getList);
    }
}
exports.default = CrudAuditTrailRouter;
//# sourceMappingURL=audit.trail.crud.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const app_crud_controller_1 = __importDefault(require("../controller/app.crud.controller"));
const validator_1 = __importDefault(require("../validator/validator"));
class CrudRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.crudControll = new app_crud_controller_1.default();
        this.crudValidator = new validator_1.default();
        this.callRouter();
    }
    callRouter() {
        this.router
            .route('/create')
            .post(this.crudValidator.appValidator(), this.crudControll.createControl);
        this.router.route('/list').get(this.crudControll.getList);
    }
}
exports.default = CrudRouter;
//# sourceMappingURL=app.crud.router.js.map
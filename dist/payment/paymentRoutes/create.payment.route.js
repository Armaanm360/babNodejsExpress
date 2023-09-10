"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const create_payment_controller_1 = __importDefault(require("../paymentController/create.payment.controller"));
class CreatePaymentRoute extends abstract_router_1.default {
    constructor() {
        super();
        this.createController = new create_payment_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        this.router.route('/create').post(this.createController.createPayment);
    }
}
exports.default = CreatePaymentRoute;
//# sourceMappingURL=create.payment.route.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_payment_route_1 = __importDefault(require("./paymentRoutes/create.payment.route"));
class PaymentRouter {
    constructor() {
        this.Payrouter = (0, express_1.Router)();
        this.createPaymentRoute = new create_payment_route_1.default();
        this.callApiRouter();
    }
    callApiRouter() {
        this.Payrouter.use('/', this.createPaymentRoute.router);
    }
}
exports.default = PaymentRouter;
//# sourceMappingURL=payment.router.js.map
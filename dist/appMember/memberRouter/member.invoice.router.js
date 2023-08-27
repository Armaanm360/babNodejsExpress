"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const member_invoice_controller_1 = __importDefault(require("../memberController/member.invoice.controller"));
class MemberInvoiceRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.memberInvoiceController = new member_invoice_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        // get all invoice router
        this.router.route("/").get(this.memberInvoiceController.getAllInvoice);
        // get single invoice router
        this.router
            .route("/:id")
            .get(this.memberInvoiceController.getSingleInvoice);
    }
}
exports.default = MemberInvoiceRouter;
//# sourceMappingURL=member.invoice.router.js.map
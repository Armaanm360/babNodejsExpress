"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const admin_account_controller_1 = __importDefault(require("../adminController/admin.account.controller"));
const admin_account_validator_1 = __importDefault(require("../utils/validator/admin.account.validator"));
class AdminAccountRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.accountController = new admin_account_controller_1.default();
        this.accountValidator = new admin_account_validator_1.default();
        this.callRouter();
    }
    // call router
    callRouter() {
        // get audit router
        this.router
            .route('/')
            .post(this.accountValidator.createAccount(), this.accountController.createAccount)
            .get(this.accountController.getAccounts);
        // account transfer
        this.router
            .route('/transaction')
            .get(this.accountController.getAllTransactionList);
        // Balance transfer
        this.router
            .route('/transfer')
            .post(this.accountValidator.accountTransfer(), this.accountController.accountTransfer)
            .get(this.accountController.getAllBalanceTransferList);
        // single account
        this.router
            .route('/:id')
            .get(this.commonValidator.commonSingleParamsIdInputValidator(), this.accountController.getSingleAccount);
    }
}
exports.default = AdminAccountRouter;
//# sourceMappingURL=admin.account.router.js.map
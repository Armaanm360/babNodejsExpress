"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_service_1 = __importDefault(require("../../abstract/abstract.service"));
class DueMemberService extends abstract_service_1.default {
    constructor() {
        super();
    }
    // get certificate
    dueMember(memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const duePayment = yield this.db("invoice")
                .sum("paid_by AS total_due")
                .andWhere("remarks", "paid")
                .andWhere("user_id", memberId);
            // const totalPaid = await this.db("training_payment_invoice")
            //   .sum("training_payment_invoice_total_amount AS trainee_total_paid")
            //   .andWhere("training_payment_invoice_status", "paid")
            //   .andWhere("training_payment_invoice_trainee_id", memberId);
            if (!duePayment.length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_NOT_FOUND,
                    message: this.ResMsg.HTTP_NOT_FOUND,
                };
            }
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                data: duePayment[0],
            };
        });
    }
}
exports.default = DueMemberService;
//# sourceMappingURL=member.due.service.js.map
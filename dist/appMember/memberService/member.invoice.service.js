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
class MemberInvoiceService extends abstract_service_1.default {
    constructor() {
        super();
    }
    // get all Invoice
    getAllInvoice() {
        return __awaiter(this, void 0, void 0, function* () {
            const invoice = yield this.db("invoice")
                .select("id", "total", "vat", "discount", "grand_total")
                .orderBy("created_at", "desc");
            if (!invoice.length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_NOT_FOUND,
                    message: this.ResMsg.HTTP_NOT_FOUND,
                };
            }
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                data: invoice,
            };
        });
    }
    // get single Invoice
    getInvoice(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const invoice = yield this.db("invoice")
                .select("id", "total", "vat", "discount", "grand_total", "created_by", "paid_by", "remarks", "created_at")
                .where("invoice.id", id);
            if (!invoice.length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_NOT_FOUND,
                    message: this.ResMsg.HTTP_NOT_FOUND,
                };
            }
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                data: invoice,
            };
        });
    }
}
exports.default = MemberInvoiceService;
//# sourceMappingURL=member.invoice.service.js.map
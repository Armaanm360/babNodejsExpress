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
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: "uploads/" });
class CreatePaymentService extends abstract_service_1.default {
    constructor() {
        super();
    }
    createPayment({ userid, amount, device_id, meduim, payby, transactionID }) {
        return __awaiter(this, void 0, void 0, function* () {
            const payment = yield this.db('payment').insert({
                userid,
                amount,
                device_id,
                meduim,
                payby,
                transactionID
            });
            // const data = await this.db.raw(`CALL spInsertAuditTrail(${userid}, ${userid}, @p2, @p3, @p4, @p5);`)
            const updateuser = yield this.db('users')
                .where({ userid })
                .update({ payment_status: 'PENDING' });
            return {
                success: true,
                code: 201,
                message: 'Payment Successfully Completed',
                data: { userid, amount, device_id, meduim },
            };
        });
    }
    createProMagazine(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db('upload_magazine').insert(payload);
            return {
                success: true,
                code: 201,
                message: 'Payment Successfully Completed',
                data: payload,
            };
        });
    }
    allPayments() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.db('users').join('payment', 'payment.userid', 'users.userid').select('*');
            return {
                success: true,
                code: 201,
                message: 'Payment Successfully Completed',
                data: data,
            };
        });
    }
    ;
    allUploads() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.db('upload_magazine').select('*');
            return {
                success: true,
                code: 201,
                message: 'All Files Fetched',
                data: data,
            };
        });
    }
    ;
    allUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.db('users').select('*');
            return {
                success: true,
                code: 201,
                message: 'Users Fetched Successfully',
                data: data,
            };
        });
    }
    ;
    updateUser(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateUserTrans = yield this.db('users').where('userid', userid).update({ payment_status: 'PAID' });
            return {
                success: true,
                code: 201,
                message: 'Payment Approved Successfully',
                data: 'userid',
            };
        });
    }
    rejectUser(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateUserTrans = yield this.db('users').where('userid', userid).update({ payment_status: 'PENDING' });
            return {
                success: true,
                code: 201,
                message: 'Payment Has Been Rejected',
                data: 'userid',
            };
        });
    }
    createSysService({ payment_system_name, payment_system_number, payment_system_type, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.db('payments_system').where('payment_system_name', payment_system_name);
            if (check.length) {
                return {
                    success: true,
                    code: 401,
                    message: 'Payment System Already Exists',
                    data: {},
                };
            }
            else {
                const payment = yield this.db('payments_system').insert({
                    payment_system_name,
                    payment_system_number,
                    payment_system_type,
                });
                return {
                    success: true,
                    code: 201,
                    message: 'Payment Successfully Completed',
                    data: { payment_system_name, payment_system_number, payment_system_type },
                };
            }
        });
    }
    allSystems() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.db('payments_system').where('system_status', true).select('*');
            return {
                success: true,
                code: 201,
                message: 'payment system fetched',
                data: data,
            };
        });
    }
    ;
    specSys(system) {
        return __awaiter(this, void 0, void 0, function* () {
            const paymentSystem = yield this.db('payments_system').where('system_status', true).where('payment_system_name', system).select('payment_system_name', 'payment_system_number', 'payment_system_type');
            return {
                success: true,
                code: 201,
                message: 'Specified Payment System Fetched',
                data: { paymentSystem },
            };
        });
    }
    specSysDelete(system) {
        return __awaiter(this, void 0, void 0, function* () {
            const paymentSystem = yield this.db('payments_system').where('system_status', true).where('payment_system_name', system).update({ system_status: 0 });
            return {
                success: true,
                code: 201,
                message: 'Specified Payment Deleted',
                data: { paymentSystem },
            };
        });
    }
    specSysUpdate(system, payment_system_name, payment_system_number, payment_system_type) {
        return __awaiter(this, void 0, void 0, function* () {
            const paymentSystem = yield this.db('payments_system').where('payment_system_name', system).update({ payment_system_name: payment_system_name, payment_system_number: payment_system_number, payment_system_type: payment_system_type });
            return {
                success: true,
                code: 201,
                message: 'Payemnt System Updated Successfully',
                data: { paymentSystem },
            };
        });
    }
}
exports.default = CreatePaymentService;
//# sourceMappingURL=create.payment.service.js.map
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
    //get alll pdfs view
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
    //update pdf status
    updatePdfStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const checstatus = yield this.db('upload_magazine').where('upload_magazine_id', id).select('upload_magazine_type');
            const check = checstatus[0].upload_magazine_type;
            if (check == 'FREE') {
                const changedToFree = yield this.db('upload_magazine').where('upload_magazine_id', id).update({ upload_magazine_type: 'PREMIUM' });
            }
            else {
                const changedToFree = yield this.db('upload_magazine').where('upload_magazine_id', id).update({ upload_magazine_type: 'FREE' });
            }
            // const updatepdfstatus = await this.db('users').where('userid',id).update({payment_status:'PAID'});
            return {
                success: true,
                code: 201,
                message: 'Status Changed Successfully',
                data: '',
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
    //dashboard status
    statService() {
        return __awaiter(this, void 0, void 0, function* () {
            const tus = yield this.db('users').count('* as total_users');
            const tusf = yield this.db('users').where('payment_status', 'FREE').count('* as free_users');
            const tuspr = yield this.db('users').where('payment_status', 'PAID').count('* as paid_users');
            const tuspend = yield this.db('users').where('payment_status', 'PENDING').count('* as pending_users');
            const total_uploaded = yield this.db('upload_magazine').count('* as total_uploaded');
            const total_free = yield this.db('upload_magazine').where('upload_magazine_type', 'FREE').count('* as total_free');
            const total_paid = yield this.db('upload_magazine').where('upload_magazine_type', 'PREMIUM').count('* as total_paid');
            const payments_systems = yield this.db('payments_system').count('* as payments_systems');
            const payment = yield this.db('payment').sum('amount as total_amount');
            const t_f = total_free[0].total_free;
            const t_p = total_paid[0].total_paid;
            const p_s = payments_systems[0].payments_systems;
            const t_u = total_uploaded[0].total_uploaded;
            const total_users = tus[0].total_users;
            const free_users = tusf[0].free_users;
            const paid_users = tuspr[0].paid_users;
            const pending_users = tuspend[0].pending_users;
            const total_payment = payment[0].total_amount;
            return {
                success: true,
                code: 201,
                message: 'All Files Fetched',
                data: { total_users, free_users, paid_users, pending_users, t_f, t_p, p_s, t_u, total_payment },
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
            const paymentSystem = yield this.db('payments_system').where('system_status', true).where('payment_system_id', system).update({ system_status: 0 });
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
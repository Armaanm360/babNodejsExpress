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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_controller_1 = __importDefault(require("../../abstract/abstract.controller"));
const create_payment_service_1 = __importDefault(require("../paymentServices/create.payment.service"));
class PaymentController extends abstract_controller_1.default {
    constructor() {
        super();
        this.CreatePaymentService = new create_payment_service_1.default();
        this.createPayment = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userid, amount, device_id, meduim, payby, transactionID } = req.body;
            const _a = yield this.CreatePaymentService.createPayment({
                userid,
                amount,
                device_id,
                meduim,
                payby,
                transactionID
            }), { code } = _a, data = __rest(_a, ["code"]);
            res.status(code).json(data);
        }));
        this.pdfileUpload = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const files = req.files || [];
            const payload = req.body;
            files.forEach(file => {
                // payload[file.fieldname]=file.path.replace('C:\\xampp\\htdocs\\nodejsparjatatn\\','')
                payload[file.fieldname] = file.filename;
            });
            const _b = yield this.CreatePaymentService.createProMagazine(payload), { code } = _b, data = __rest(_b, ["code"]);
            res.status(code).json(data);
        }));
        // public pdfileUpload = this.asyncWrapper.wrap(
        //   async (req: Request, res: Response) => {
        // const storage = multer.diskStorage({
        //   destination:'./uploads/',
        //   filename:function(req,file,cb){
        //     cb(null,Date.now()+'-'+file.originalname);
        //   }
        // });
        // const upload = multer({storage});
        //     const { upload_magazine_name} = req.body;
        //     // const {file} = req.file;
        //     const { code, ...data } = await this.CreatePaymentService.createMagazine({upload_magazine_name});
        //     res.status(code).json(data);
        //   }
        // );
        //list of users
        this.userList = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const _c = yield this.CreatePaymentService.allUsers(), { code } = _c, data = __rest(_c, ["code"]);
            res.status(code).json(data);
        }));
        this.getAllUploaded = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const _d = yield this.CreatePaymentService.allUploads(), { code } = _d, data = __rest(_d, ["code"]);
            res.status(code).json(data);
        }));
        //userid,email,deviceid,type,payby,transactionID
        this.allPayment = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const _e = yield this.CreatePaymentService.allPayments(), { code } = _e, data = __rest(_e, ["code"]);
            res.status(code).json(data);
        }));
        //approve payment 
        this.approvePayment = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userid } = req.params;
            const _f = yield this.CreatePaymentService.updateUser(userid), { code } = _f, data = __rest(_f, ["code"]);
            res.status(code).json(data);
        }));
        //reject payment
        this.rejectPayment = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userid } = req.params;
            const _g = yield this.CreatePaymentService.rejectUser(userid), { code } = _g, data = __rest(_g, ["code"]);
            res.status(code).json(data);
        }));
        //create payment systems
        this.createSystem = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { payment_system_name, payment_system_number, payment_system_type } = req.body;
            const _h = yield this.CreatePaymentService.createSysService({
                payment_system_name,
                payment_system_number,
                payment_system_type
            }), { code } = _h, data = __rest(_h, ["code"]);
            res.status(code).json(data);
        }));
        //list payment systems
        this.listSystem = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const _j = yield this.CreatePaymentService.allSystems(), { code } = _j, data = __rest(_j, ["code"]);
            res.status(code).json(data);
        }));
        //get specific system
        this.getSystem = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { system } = req.params;
            const _k = yield this.CreatePaymentService.specSys(system), { code } = _k, data = __rest(_k, ["code"]);
            res.status(code).json(data);
        }));
        //get specific system update
        this.getSystemUpdate = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { system } = req.params;
            const { payment_system_name, payment_system_number, payment_system_type } = req.query;
            const _l = yield this.CreatePaymentService.specSysUpdate(String(system), String(payment_system_name), String(payment_system_number), String(payment_system_type)), { code } = _l, data = __rest(_l, ["code"]);
            res.status(code).json(data);
        }));
        //get specific system delete
        this.getSystemDelete = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { system } = req.params;
            const _m = yield this.CreatePaymentService.specSysDelete(Number(system)), { code } = _m, data = __rest(_m, ["code"]);
            res.status(code).json(data);
        }));
    }
}
exports.default = PaymentController;
//# sourceMappingURL=create.payment.controller.js.map
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
        this.router.route('/list').get(this.createController.allPayment);
        this.router.route('/:userid').get(this.createController.approvePayment);
        this.router.route('/reject/:userid').get(this.createController.rejectPayment);
        this.router.route('/users/list').get(this.createController.userList);
        this.router.route('/systems/create').post(this.createController.createSystem);
        this.router.route('/systems/getall').get(this.createController.listSystem);
        this.router.route('/systems/getall/:system').get(this.createController.getSystem);
        this.router.route('/systems/getall/update/:system').get(this.createController.getSystemUpdate);
        //get all uploaded
        this.router.route('/pdf/uploaded').get(this.createController.getAllUploaded);
        //delete payment system
        this.router.route('/systems/getall/delete/:system').get(this.createController.getSystemDelete);
        //pdf status update
        this.router.route('/systems/update/pdf/status/:id').get(this.createController.pdfStatusUpdate);
        //statistics
        this.router.route('/get/statistics').get(this.createController.getStatistics);
        //this.router.route('/upload/pdf').post(this.createController.pdfileUpload);
        //     const storage = multer.diskStorage({
        //       destination: (req, file, cb) => {
        //         cb(null, 'uploads/');},
        //   filename: (req, file, cb) => {
        //     cb(null, Date.now() + '-' + file.originalname);
        //   }
        // });
        // // Create the multer instance
        // const upload = multer({ storage: storage });
        //const upload = multer({ dest: 'uploads/' })
        // this.router.route('/upload/testpdf').post(upload.single('avatar'),function(req, res){
        //         console.log(req.file, req.body)
        //           res.json({ message: 'File uploaded successfully!' });
        // },this.createController.pdfileUpload)
        this.router.route('/upload/testpdf').post(this.uploader.localUploadRaw('', ['application/pdf', 'image/JPG', 'image/JPG', 'image/JPEG', 'image/png']), this.createController.pdfileUpload);
    }
}
exports.default = CreatePaymentRoute;
//# sourceMappingURL=create.payment.route.js.map
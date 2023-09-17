import { Request, Response } from 'express';
import AbstractRouter from '../../abstract/abstract.router';
import PaymentController from '../paymentController/create.payment.controller';
import multer from 'multer';
import Uploader from './../../common/middlewares/uploader/uploader';

class CreatePaymentRoute extends AbstractRouter {
  private createController = new PaymentController();
  constructor() {
    super();
    this.callRouter();
  }

  public callRouter() {
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

    this.router.route('/upload/testpdf').post(
      this.uploader.localUploadRaw('',['application/pdf','image/JPG','image/JPG','image/JPEG','image/png'])
     ,this.createController.pdfileUpload)
  }
}

export default CreatePaymentRoute;

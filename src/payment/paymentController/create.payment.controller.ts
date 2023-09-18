import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import CreatePaymentService from '../paymentServices/create.payment.service';
import { param } from 'express-validator';
import { db } from '../../app/database';
import multer from 'multer';

class PaymentController extends AbstractController {
  private CreatePaymentService = new CreatePaymentService();
  constructor() {
    super();
  }

  public createPayment = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { userid, amount, device_id, meduim,payby,transactionID } = req.body;
      const { code, ...data } = await this.CreatePaymentService.createPayment({
        userid,
        amount,
        device_id,
        meduim,
        payby,
        transactionID
      });

      res.status(code).json(data);
    }
  );


  public pdfileUpload = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {

      const files = req.files as Express.Multer.File[] || []


      const payload = req.body;

      files.forEach(file=>{
                // payload[file.fieldname]=file.path.replace('C:\\xampp\\htdocs\\nodejsparjatatn\\','')
        payload[file.fieldname]=file.filename
      })

      const {code,...data} = await this.CreatePaymentService.createProMagazine(payload);

      res.status(code).json(data);
    }
  );







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

  public userList = this.asyncWrapper.wrap(
     async (req: Request, res: Response) => {

      const { code, ...data } = await this.CreatePaymentService.allUsers();

      res.status(code).json(data);
    }
  );

  
  public getAllUploaded = this.asyncWrapper.wrap(
     async (req: Request, res: Response) => {

      const { code, ...data } = await this.CreatePaymentService.allUploads();

      res.status(code).json(data);
    }
  );


  //userid,email,deviceid,type,payby,transactionID


  public allPayment = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {

      const { code, ...data } = await this.CreatePaymentService.allPayments();

      res.status(code).json(data);
    }
  );

  //approve payment 

  public approvePayment = this.asyncWrapper.wrap(
    async(req:Request,res:Response)=>{
      const {userid} = req.params
     const {code, ...data} = await this.CreatePaymentService.updateUser(userid)

     res.status(code).json(data)
    }
    
  );



  //reject payment
  public rejectPayment = this.asyncWrapper.wrap(
    async(req:Request,res:Response)=>{
      const {userid} = req.params
     const {code, ...data} = await this.CreatePaymentService.rejectUser(userid)

     res.status(code).json(data)
    }
    
  );


  //create payment systems

  public createSystem = this.asyncWrapper.wrap(
    async(req:Request,res:Response)=>{


      const {payment_system_name,payment_system_number,payment_system_type}= req.body

      const { code, ...data } = await this.CreatePaymentService.createSysService({
        payment_system_name,
        payment_system_number,
        payment_system_type
      });

      res.status(code).json(data);
    }
  )
  //list payment systems

  public listSystem = this.asyncWrapper.wrap(
    async(req:Request,res:Response)=>{
      const { code, ...data } = await this.CreatePaymentService.allSystems();

      res.status(code).json(data);
    }
  )

  //get specific system
    public getSystem = this.asyncWrapper.wrap(
    async(req:Request,res:Response)=>{
      const {system} = req.params
     const {code, ...data} = await this.CreatePaymentService.specSys(system)

     res.status(code).json(data)
    }
    
  );
  //get specific system update
    public getSystemUpdate = this.asyncWrapper.wrap(
    async(req:Request,res:Response)=>{
      const {system} = req.params
      const {payment_system_name,payment_system_number,payment_system_type} = req.query
     const {code, ...data} = await this.CreatePaymentService.specSysUpdate(      
      String(system),
      String(payment_system_name),
      String(payment_system_number),
      String(payment_system_type),)
     res.status(code).json(data)
    }
    
  );
  //get specific system delete
    public getSystemDelete = this.asyncWrapper.wrap(
    async(req:Request,res:Response)=>{
      const {system} = req.params
     const {code, ...data} = await this.CreatePaymentService.specSysDelete(Number(system))

     res.status(code).json(data)
    }
    
  );
  


}

export default PaymentController;

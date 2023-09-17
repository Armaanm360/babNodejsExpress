import { Request, Response } from 'express';
import AbstractServices from '../../abstract/abstract.service';
import { paymentUser } from '../../preUser/utils/paymentTypes';
import { paymentSystems } from '../../preUser/utils/paymentSystems';
import multer from 'multer';
import { magtypes } from '../../preUser/utils/magtypes';
const upload = multer({ dest: "uploads/" });

class CreatePaymentService extends AbstractServices {
  constructor() {
    super();
  }

  public async createPayment({
    userid,
    amount,
    device_id,
    meduim,
    payby,
    transactionID
  }: paymentUser) {

    const payment = await this.db('payment').insert({
      userid,
      amount,
      device_id,
      meduim,
      payby,
      transactionID
    });

    // const data = await this.db.raw(`CALL spInsertAuditTrail(${userid}, ${userid}, @p2, @p3, @p4, @p5);`)

    const updateuser = await this.db('users')
      .where({ userid })
      .update({ payment_status: 'PENDING' });

    return {
      success: true,
      code: 201,
      message: 'Payment Successfully Completed',
      data: { userid, amount, device_id, meduim },
    };
  }




  public async createProMagazine(payload:any) {


     await this.db('upload_magazine').insert(payload);

    return {
      success: true,
      code: 201,
      message: 'Payment Successfully Completed',
      data: payload,
    };
  }






  public async allPayments(){


    const data = await this.db('users').join('payment','payment.userid','users.userid').select('*');


   

          return {
      success: true,
      code: 201,
      message: 'Payment Successfully Completed',
      data: data,
    };
      
    
  };



  public async allUploads(){


    const data = await this.db('upload_magazine').select('*');


   

          return {
      success: true,
      code: 201,
      message: 'All Files Fetched',
      data: data,
    };
      
    
  };



  public async allUsers(){


    const data = await this.db('users').select('*');


   

    return {
      success: true,
      code: 201,
      message: 'Users Fetched Successfully',
      data: data,
    };
      
    
  };



  public async updateUser(userid:number| string){
    const updateUserTrans = await this.db('users').where('userid',userid).update({payment_status:'PAID'});
    return {
      success: true,
      code: 201,
      message: 'Payment Approved Successfully',
      data: 'userid',
    }
  }


  public async rejectUser(userid:number| string){
    const updateUserTrans = await this.db('users').where('userid',userid).update({payment_status:'PENDING'});
    return {
      success: true,
      code: 201,
      message: 'Payment Has Been Rejected',
      data: 'userid',
    }
  }

 public async createSysService({
    payment_system_name,
    payment_system_number,
    payment_system_type,
  }: paymentSystems) {


    const check = await this.db('payments_system').where('payment_system_name',payment_system_name)


    if (check.length) {
      return {
      success: true,
      code: 401,
      message: 'Payment System Already Exists',
      data:{},
    };

    }else{


    const payment = await this.db('payments_system').insert({
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

}

  public async allSystems(){


    const data = await this.db('payments_system').where('system_status',true).select('*');


   

    return {
      success: true,
      code: 201,
      message: 'payment system fetched',
      data: data,
    };
      
    
  };


  public async specSys(system:string){
    const paymentSystem = await this.db('payments_system').where('system_status',true).where('payment_system_name',system).select('payment_system_name','payment_system_number','payment_system_type');
    return {
      success: true,
      code: 201,
      message: 'Specified Payment System Fetched',
      data: {paymentSystem},
    }
  }


  public async specSysDelete(system:string){
    const paymentSystem = await this.db('payments_system').where('system_status',true).where('payment_system_name',system).update({system_status:0});
    return {
      success: true,
      code: 201,
      message: 'Specified Payment Deleted',
      data: {paymentSystem},
    }
  }


  public async specSysUpdate(
    system:string,
    payment_system_name:string,
    payment_system_number:string,
    payment_system_type:string,
  ){
    const paymentSystem = await this.db('payments_system').where('payment_system_name',system).update({payment_system_name:payment_system_name,payment_system_number:payment_system_number,payment_system_type:payment_system_type})
    return {
      success: true,
      code: 201,
      message: 'Payemnt System Updated Successfully',
      data: {paymentSystem},
    }
  }




}

export default CreatePaymentService;

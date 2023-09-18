import { Request, Response } from 'express';
import AbstractServices from '../../abstract/abstract.service';
import { paymentUser } from '../../preUser/utils/paymentTypes';
import { paymentSystems } from '../../preUser/utils/paymentSystems';
import multer from 'multer';
import { magtypes } from '../../preUser/utils/magtypes';
import { integer } from 'aws-sdk/clients/cloudfront';
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


   //get alll pdfs view
   


  public async createProMagazine(payload:any) {


     await this.db('upload_magazine').insert(payload);

    return {
      success: true,
      code: 201,
      message: 'Payment Successfully Completed',
      data: payload,
    };
  }


//update pdf status
  public async updatePdfStatus(id:integer){

    const checstatus = await this.db('upload_magazine').where('upload_magazine_id',id).select('upload_magazine_type');
    const check = checstatus[0].upload_magazine_type
    if (check == 'FREE') {
      const changedToFree = await this.db('upload_magazine').where('upload_magazine_id',id).update({upload_magazine_type:'PREMIUM'});
    }else{
      const changedToFree = await this.db('upload_magazine').where('upload_magazine_id',id).update({upload_magazine_type:'FREE'});
    }
    // const updatepdfstatus = await this.db('users').where('userid',id).update({payment_status:'PAID'});
    return {
      success: true,
      code: 201,
      message: 'Status Changed Successfully',
      data: '',
    }
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

  //dashboard status
  public async statService(){


    const tus = await this.db('users').count('* as total_users');
    const tusf = await this.db('users').where('payment_status','FREE').count('* as free_users');
    const tuspr = await this.db('users').where('payment_status','PAID').count('* as paid_users');
    const tuspend = await this.db('users').where('payment_status','PENDING').count('* as pending_users');


    const total_uploaded = await this.db('upload_magazine').count('* as total_uploaded');
    const total_free = await this.db('upload_magazine').where('upload_magazine_type','FREE').count('* as total_free');
    const total_paid = await this.db('upload_magazine').where('upload_magazine_type','PREMIUM').count('* as total_paid');
    const payments_systems = await this.db('payments_system').count('* as payments_systems');


 const payment = await this.db('payment').sum('amount as total_amount');

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
      data: {total_users,free_users,paid_users,pending_users,t_f,t_p,p_s,t_u,total_payment},
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


  public async specSysDelete(system:integer){
    const paymentSystem = await this.db('payments_system').where('system_status',true).where('payment_system_id',system).update({system_status:0});
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

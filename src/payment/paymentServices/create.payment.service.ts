import { Request, Response } from 'express';
import AbstractServices from '../../abstract/abstract.service';
import { paymentUser } from '../../preUser/utils/paymentTypes';

class CreatePaymentService extends AbstractServices {
  constructor() {
    super();
  }

  public async createPayment({
    userid,
    amount,
    device_id,
    meduim,
  }: paymentUser) {
    const payment = await this.db('payment').insert({
      userid,
      amount,
      device_id,
      meduim,
    });

    const updateuser = await this.db('users')
      .where({ userid })
      .update({ payment_status: 'PAID' });

    return {
      success: true,
      code: 201,
      message: 'Payment Successfully Completed',
      data: { userid, amount, device_id, meduim },
    };
  }
}

export default CreatePaymentService;

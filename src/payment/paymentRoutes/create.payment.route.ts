import { Request, Response } from 'express';
import AbstractRouter from '../../abstract/abstract.router';
import PaymentController from '../paymentController/create.payment.controller';

class CreatePaymentRoute extends AbstractRouter {
  private createController = new PaymentController();
  constructor() {
    super();
    this.callRouter();
  }

  public callRouter() {
    this.router.route('/create').post(this.createController.createPayment);
  }
}

export default CreatePaymentRoute;

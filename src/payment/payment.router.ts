import { Router } from 'express';
import CreatePaymentRoute from './paymentRoutes/create.payment.route';

class PaymentRouter {
  public Payrouter = Router();
  private createPaymentRoute = new CreatePaymentRoute();

  constructor() {
    this.callApiRouter();
  }

  public callApiRouter() {
    this.Payrouter.use('/', this.createPaymentRoute.router);
  }
}

export default PaymentRouter;

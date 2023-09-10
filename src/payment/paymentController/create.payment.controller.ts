import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import CreatePaymentService from '../paymentServices/create.payment.service';

class PaymentController extends AbstractController {
  private CreatePaymentService = new CreatePaymentService();
  constructor() {
    super();
  }

  public createPayment = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { userid, amount, device_id, meduim } = req.body;
      const { code, ...data } = await this.CreatePaymentService.createPayment({
        userid,
        amount,
        device_id,
        meduim,
      });

      res.status(code).json(data);
    }
  );
}

export default PaymentController;

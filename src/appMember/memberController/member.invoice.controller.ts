import { Request, Response } from "express";
import AbstractController from "../../abstract/abstract.controller";
import MemberInvoiceService from "../memberService/member.invoice.service";
class MemberInvoiceController extends AbstractController {
  private memberInvoiceService = new MemberInvoiceService();
  constructor() {
    super();
  }

  // get all invoice controller
  public getAllInvoice = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.memberInvoiceService.getAllInvoice();
      res.status(code).json(data);
    }
  );

  // get single invoice controller
  public getSingleInvoice = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const { code, ...data } = await this.memberInvoiceService.getInvoice(
        parseInt(id)
      );
      res.status(code).json(data);
    }
  );
}

export default MemberInvoiceController;

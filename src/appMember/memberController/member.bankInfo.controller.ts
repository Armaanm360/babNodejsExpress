import { Request, Response } from "express";
import AbstractController from "../../abstract/abstract.controller";
import MemberBankInfoService from "../memberService/member.bankInfo.service";

class MemberBankInfoController extends AbstractController {
  private memberBankInfoService = new MemberBankInfoService();
  constructor() {
    super();
  }

  // get profile controller
  public getAllBankInfo = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.memberBankInfoService.getBankInfo();
      res.status(code).json(data);
    }
  );
}

export default MemberBankInfoController;

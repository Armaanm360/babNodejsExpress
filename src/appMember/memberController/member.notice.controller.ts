import { Request, Response } from "express";
import AbstractController from "../../abstract/abstract.controller";
import MemberNoticeService from "../memberService/member.notice.service";

class MemberNoticeController extends AbstractController {
  private memberNoticeService = new MemberNoticeService();
  constructor() {
    super();
  }

  // get notice controller
  public getAllNotice = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.memberNoticeService.getAllNotice();
      res.status(code).json(data);
    }
  );
}

export default MemberNoticeController;

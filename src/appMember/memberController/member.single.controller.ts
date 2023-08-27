import { Request, Response } from "express";
import AbstractController from "../../abstract/abstract.controller";
import MemberSingleService from "../memberService/member.single.service";
class MemberSingleController extends AbstractController {
  private memberSingleService = new MemberSingleService();
  constructor() {
    super();
  }

  // get certificate controller
  public getMemberSingle = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const { code, ...data } = await this.memberSingleService.getMemberSingle(
        parseInt(id)
      );
      res.status(code).json(data);
    }
  );
}

export default MemberSingleController;

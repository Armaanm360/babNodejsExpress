import { Request, Response } from "express";
import AbstractController from "../../abstract/abstract.controller";
import DueMemberService from "../memberService/member.due.service";

class DueMemberController extends AbstractController {
  private dueMemberService = new DueMemberService();
  constructor() {
    super();
  }

  // get certificate controller
  public getDueMember = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const { code, ...data } = await this.dueMemberService.dueMember(
        parseInt(id)
      );
      res.status(code).json(data);
    }
  );
}

export default DueMemberController;

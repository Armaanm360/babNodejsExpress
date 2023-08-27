import { Request, Response } from "express";
import AbstractController from "../../abstract/abstract.controller";
import CommitteeMemberService from "../memberService/member.executive.service";

class CommitteeMemberController extends AbstractController {
  private committeeMemberService = new CommitteeMemberService();
  constructor() {
    super();
  }

  // get all invoice controller
  public getAllCommitteeMember = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { code, ...data } =
        await this.committeeMemberService.getCommitteeMember();
      res.status(code).json(data);
    }
  );
}

export default CommitteeMemberController;

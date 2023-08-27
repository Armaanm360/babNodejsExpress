import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import MemberProfileService from '../memberService/member.profile.service';

class MemberProfileController extends AbstractController {
  private memberProfileService = new MemberProfileService();
  constructor() {
    super();
  }

  // get profile controller
  public getProfile = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { id } = req.member;
      const { code, ...profile } = await this.memberProfileService.getProfile(
        id
      );
      res.status(code).json(profile);
    }
  );

  //mine
  // get profile controller

  // public myCustom = this.asyncWrapper.wrap(
  //   async (req: Request, res: Response) => {
  //     const { id } = req.member;
  //     const { code, ...profile } = await this.memberProfileService.getProfile(id);
  //     res.status(code).json(profile);

  //   }
  // );

}

export default MemberProfileController;

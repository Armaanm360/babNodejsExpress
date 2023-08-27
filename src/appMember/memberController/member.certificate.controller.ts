import { Request, Response } from "express";
import AbstractController from "../../abstract/abstract.controller";
import MemberCertificateService from "../memberService/member.certificate.service";

class MemberCertificateController extends AbstractController {
  private memberCertificateService = new MemberCertificateService();
  constructor() {
    super();
  }

  // get certificate controller
  public getMemberCertificate = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const { code, ...data } =
        await this.memberCertificateService.getCertificate(parseInt(id));
      res.status(code).json(data);
    }
  );
}

export default MemberCertificateController;

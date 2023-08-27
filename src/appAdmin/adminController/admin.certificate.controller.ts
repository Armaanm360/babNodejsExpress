import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import AdminCertificateService from '../adminService/admin.certificate.service';

class AdminCertificateController extends AbstractController {
  private adminCertificateService = new AdminCertificateService();
  constructor() {
    super();
  }

  // create certificate
  public createCertificate = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { code, ...data } =
        await this.adminCertificateService.createCertificate(req);

      if (data.success) {
        res.status(code).json(data);
      } else {
        this.error(data.message, code);
      }
    }
  );
}
export default AdminCertificateController;

import { Request } from 'express';
import { IPromiseRes } from '../../common/types/commontypes';
import AbstractServices from '../../abstract/abstract.service';

class AdminCertificateService extends AbstractServices {
  constructor() {
    super();
  }

  // create certificate
  public async createCertificate(
    req: Request
  ): Promise<IPromiseRes<{ id: number; certificate_file: string }>> {
    return await this.db.transaction(async (trx) => {
      const checkTraining = await trx('training')
        .select('title')
        .where({ id: req.body.training_id });

      if (!checkTraining.length) {
        return {
          success: false,
          code: this.StatusCode.HTTP_NOT_FOUND,
          message: this.ResMsg.HTTP_NOT_FOUND,
        };
      }

      const files = (req.files as Express.Multer.File[]) || [];

      if (files?.length) {
        req.body[files[0].fieldname] = files[0].filename;
      }

      const res = await trx('training_certificate').insert(req.body);

      if (!res.length) {
        return {
          success: false,
          code: this.StatusCode.HTTP_INTERNAL_SERVER_ERROR,
          message: this.ResMsg.HTTP_INTERNAL_SERVER_ERROR,
        };
      }

      return {
        success: true,
        code: this.StatusCode.HTTP_SUCCESSFUL,
        message: this.ResMsg.HTTP_SUCCESSFUL,
        data: { id: res[0], certificate_file: files[0]?.filename },
      };
    });
  }
}

export default AdminCertificateService;

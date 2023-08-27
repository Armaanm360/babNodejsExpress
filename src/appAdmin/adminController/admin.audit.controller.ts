import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import AdminAuditService from '../adminService/admin.audit.service';
import { IGetAdminAuditProps } from '../utils/types/admin.audit.types';

class AdminAuditController extends AbstractController {
  private auditService = new AdminAuditService();
  constructor() {
    super();
  }

  // get audit controller
  public getAudit = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { status, from_date, to_date, admin_id, limit, skip } =
        req.query as unknown as IGetAdminAuditProps;
      const { code, ...data } = await this.auditService.getAudit({
        status,
        from_date,
        to_date,
        admin_id,
        limit,
        skip,
      });

      res.status(code).json(data);
    }
  );
}
export default AdminAuditController;

import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import AdminSettingService from '../adminService/admin.setting.service';

class AdminSettingController extends AbstractController {
  private adminSettingService = new AdminSettingService();
  constructor() {
    super();
  }

  // create invoice item
  public createInvoiceItem = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {}
  );
}

export default AdminSettingController;

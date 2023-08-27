import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import AdminRoleService from '../adminService/admin.role.service';

class AdminRoleController extends AbstractController {
  private adminRoleService = new AdminRoleService();
  constructor() {
    super();
  }

  // create role controller
  public createRole = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {}
  );

  // get role controller
  public getRole = this.asyncWrapper.wrap(
    async (_req: Request, res: Response) => {
      const { code, ...data } = await this.adminRoleService.getRole();

      res.status(code).json(data);
    }
  );
}
export default AdminRoleController;

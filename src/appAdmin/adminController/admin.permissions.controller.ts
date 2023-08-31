import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import AdminPermissionsService from '../adminService/admin.permissions.service';
import { ICreatePermissionProps } from '../utils/types/admin.permissions.types';

class AdminPermissionController extends AbstractController {
  private adminPermissionsService = new AdminPermissionsService();
  constructor() {
    super();
  }

  // create permission group controller
  public createPermissionGroup = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { id } = req.admin;
      const { name } = req.body as { name: string };
      const { code, ...data } =
        await this.adminPermissionsService.createPermissionGroup(name);

      await this.createAudit(
        id,
        'created permission group id: ' + data.data?.id,
        code
      );
      res.status(code).json(data);
    }
  );

  // create permission controller
  public createPermission = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { id } = req.admin;
      const { group_id, name } = req.body as ICreatePermissionProps;
      const { code, ...data } =
        await this.adminPermissionsService.createPermission({
          group_id,
          name,
        });


      res.status(code).json(data);
    }
  );
}

export default AdminPermissionController;

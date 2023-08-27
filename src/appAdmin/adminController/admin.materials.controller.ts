import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import AdminMaterialsService from '../adminService/admin.materials.service';

class AdminMaterialsController extends AbstractController {
  private adminMaterialsService = new AdminMaterialsService();
  constructor() {
    super();
  }

  // create Materials
  public createMaterials = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { code, ...data } =
        await this.adminMaterialsService.createMaterials(req);

      if (data.success) {
        res.status(code).json(data);
      } else {
        this.error(data.message, code);
      }
    }
  );

  // get single Materials
  public getSingleMaterials = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { code, ...data } =
        await this.adminMaterialsService.getSingleMaterials(req);

      res.status(code).json(data);
    }
  );
}
export default AdminMaterialsController;

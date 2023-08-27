import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import AdminClassService from '../adminService/admin.class.service';

class AdminClassController extends AbstractController {
  private adminClassService = new AdminClassService();
  constructor() {
    super();
  }

  // create class
  public createClass = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.adminClassService.createClass(req);

      res.status(code).json(data);
    }
  );

  // get single class
  public getSingleClass = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.adminClassService.getSingleClass(
        req
      );

      res.status(code).json(data);
    }
  );
}
export default AdminClassController;

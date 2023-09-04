import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import CrudAppService from '../service/app.crud.service';

class CrudController extends AbstractController {
  private crudService = new CrudAppService();
  constructor() {
    super();
  }
  public createControl = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { app_name, app_detail } = req.body;

      const { code, ...data } = await this.crudService.createService({
        app_name,
        app_detail,
      });
      res.status(code).json(data);
    }
  );

  public getList = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const apps = await this.crudService.getListService();

      res.status(201).json(apps);
    }
  );
}

export default CrudController;

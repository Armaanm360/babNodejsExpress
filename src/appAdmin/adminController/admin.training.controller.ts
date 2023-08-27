import { Request, Response } from 'express';
import AdminTrainingService from '../adminService/admin.training.service';
import AbstractController from '../../abstract/abstract.controller';

class AdminTrainingController extends AbstractController {
  private adminTrainingService = new AdminTrainingService();
  constructor() {
    super();
  }

  // create training
  public createTraining = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.adminTrainingService.createTraining(
        req
      );

      if (data.success) {
        res.status(code).json(data);
      } else this.error(data.message, code);
    }
  );

  // get all training
  public getAllTraining = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.adminTrainingService.getAllTraining(
        req
      );

      res.status(code).json(data);
    }
  );

  // get single training
  public getSingleTraining = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { code, ...data } =
        await this.adminTrainingService.getSingleTraining(req);

      res.status(code).json(data);
    }
  );

  // update single training
  public updateSingleTraining = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { code, ...data } =
        await this.adminTrainingService.updateSingleTraining(req);

      if (data.success) {
        res.status(code).json(data);
      } else this.error(data.message, code);
    }
  );
}
export default AdminTrainingController;

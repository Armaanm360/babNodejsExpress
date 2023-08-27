import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import AdminTraineeService from '../adminService/admin.trainee.service';

class AdminTraineeController extends AbstractController {
  private adminTraineeService = new AdminTraineeService();
  constructor() {
    super();
  }

  // get single trainee by trainee id
  public getSingleTraineeByTraineeId = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { code, ...data } =
        await this.adminTraineeService.getSingleTraineeByTraineeId(req);

      res.status(code).json(data);
    }
  );
  // get all trainee by training member id
  public getAllTraineeByMemberIdAndTraineeId = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { code, ...data } =
        await this.adminTraineeService.getAllTraineeByMemberIdAndTraineeId(req);

      res.status(code).json(data);
    }
  );
}
export default AdminTraineeController;

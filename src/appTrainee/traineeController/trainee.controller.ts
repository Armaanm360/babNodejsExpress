import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import TraineeService from '../traineeService/trainee.service';

class TraineeController extends AbstractController {
  private traineeServices = new TraineeService();
  // private commonService = new CommonService();
  constructor() {
    super();
  }

  // get profile controller
  public getProfile = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { id } = req.trainee;

      const { code, ...data } = await this.traineeServices.getProfile(id);
      res.status(code).json(data);
    }
  );
}

export default TraineeController;

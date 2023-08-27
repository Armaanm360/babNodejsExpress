import { Router } from 'express';
import TraineeController from '../traineeController/trainee.controller';

class TraineeRouter {
  public TraineeRouter = Router();
  private traineeController = new TraineeController();
  constructor() {
    this.callRouter();
  }

  private callRouter() {
    this.TraineeRouter.route('/profile').get(this.traineeController.getProfile);
  }
}

export default TraineeRouter;

import AbstractRouter from '../../abstract/abstract.router';
import AdminTraineeController from '../adminController/admin.trainee.controller';

class AdminTraineeRouter extends AbstractRouter {
  private adminTraineeController = new AdminTraineeController();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    //  get single trainee by trainee id
    this.router
      .route('/:id')
      .get(this.adminTraineeController.getSingleTraineeByTraineeId);

    //  get all trainee by training member id and training id
    this.router
      .route('/memberId/:trainingMemberId/trainingId/:trainingId')
      .get(this.adminTraineeController.getAllTraineeByMemberIdAndTraineeId);
  }
}
export default AdminTraineeRouter;

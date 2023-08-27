import AbstractRouter from '../../abstract/abstract.router';
import AdminClassController from '../adminController/admin.class.controller';
import AdminTrainingValidator from '../utils/validator/admin.training.validator';

class AdminClassRouter extends AbstractRouter {
  private adminClassController = new AdminClassController();
  private adminTrainingValidator = new AdminTrainingValidator();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    // create class
    this.router
      .route('/')
      .post(
        this.adminTrainingValidator.createClassValidator(),
        this.adminClassController.createClass
      );

    // get single class
    this.router
      .route('/:id')
      .get(
        this.commonValidator.commonSingleParamsIdInputValidator(),
        this.adminClassController.getSingleClass
      );
  }
}
export default AdminClassRouter;

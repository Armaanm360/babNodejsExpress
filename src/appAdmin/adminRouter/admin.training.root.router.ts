import AbstractRouter from '../../abstract/abstract.router';
import AdminTrainingController from '../adminController/admin.training.controller';
import AdminTrainingValidator from '../utils/validator/admin.training.validator';

class AdminRootTrainingRouter extends AbstractRouter {
  private adminTrainingController = new AdminTrainingController();
  private adminTrainingValidator = new AdminTrainingValidator();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    // create training and get all training
    this.router
      .route('/')
      .post(
        this.uploader.cloudUploadRaw(this.fileFolders.TRAINING_FILES),
        this.adminTrainingValidator.createTrainingValidator(),
        this.adminTrainingController.createTraining
      )
      .get(
        this.adminTrainingValidator.getAllTrainingValidator(),
        this.adminTrainingController.getAllTraining
      );
    // get single training
    this.router
      .route('/:id')
      .get(
        this.commonValidator.commonSingleParamsIdInputValidator(),
        this.adminTrainingController.getSingleTraining
      )
      .patch(
        this.uploader.cloudUploadRaw(this.fileFolders.TRAINING_FILES),
        this.commonValidator.commonSingleParamsIdInputValidator(),
        this.adminTrainingController.updateSingleTraining
      );
  }
}
export default AdminRootTrainingRouter;

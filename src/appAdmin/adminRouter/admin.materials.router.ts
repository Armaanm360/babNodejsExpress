import AbstractRouter from '../../abstract/abstract.router';
import AdminMaterialsController from '../adminController/admin.materials.controller';
import AdminTrainingValidator from '../utils/validator/admin.training.validator';

class AdminMaterialsRouter extends AbstractRouter {
  private adminMaterialsController = new AdminMaterialsController();
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
        this.uploader.cloudUploadRaw('material_files'),
        this.adminTrainingValidator.createMaterialsValidator(),
        this.adminMaterialsController.createMaterials
      );

    // get single class
    this.router
      .route('/:id')
      .get(
        this.commonValidator.commonSingleParamsIdInputValidator(),
        this.adminMaterialsController.getSingleMaterials
      );
  }
}
export default AdminMaterialsRouter;

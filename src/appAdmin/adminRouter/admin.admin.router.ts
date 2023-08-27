import AbstractRouter from '../../abstract/abstract.router';
import AdminAdminController from '../adminController/admin.admin.controller';
import AdminAdminValidator from '../utils/validator/admin.admin.validator';

class AdminAdminRouter extends AbstractRouter {
  private adminAdminController = new AdminAdminController();
  private adminAdminValidator = new AdminAdminValidator();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    // get profile router
    this.router.route('/profile').get(this.adminAdminController.getProfile);

    // admin create and get router
    this.router
      .route('/')
      .get(this.adminAdminController.getAdmin)
      .post(
        this.uploader.cloudUploadRaw(this.fileFolders.ADMIN_AVATARS),
        this.adminAdminValidator.createAdminValidator(),
        this.adminAdminController.createAdmin
      );

    // get single and update admin
    this.router
      .route('/:id')
      .get(
        this.commonValidator.commonSingleParamsIdInputValidator(),
        this.adminAdminController.getSingleAdmin
      )
      .patch(
        this.uploader.cloudUploadRaw(this.fileFolders.ADMIN_AVATARS),
        this.commonValidator.commonSingleParamsIdInputValidator(),
        this.adminAdminValidator.updateAdminValidator(),
        this.adminAdminController.updateAdmin
      );
  }
}

export default AdminAdminRouter;

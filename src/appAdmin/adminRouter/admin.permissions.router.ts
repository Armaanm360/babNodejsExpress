import AdminPermissionController from '../adminController/admin.permissions.controller';
import AdminPermissionValidator from '../utils/validator/admin.permission.validator';
import AbstractRouter from '../../abstract/abstract.router';

class AdminPermissionRouter extends AbstractRouter {
  private validator = new AdminPermissionValidator();
  private controller = new AdminPermissionController();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    // permissions route
    this.router
      .route('/')
      .post(
        this.validator.createPermission(),
        this.controller.createPermission
      );

    // permission gorup route
    this.router
      .route('/group')
      .post(
        this.validator.createPermissionGroup(),
        this.controller.createPermissionGroup
      );
  }
}
export default AdminPermissionRouter;

import AbstractRouter from '../../abstract/abstract.router';
import AdminRoleController from '../adminController/admin.role.controller';

class AdminRoleRouter extends AbstractRouter {
  private adminRoleController = new AdminRoleController();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    this.router.route('/').get(this.adminRoleController.getRole);
  }
}
export default AdminRoleRouter;

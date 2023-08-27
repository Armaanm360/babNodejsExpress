import AbstractRouter from '../../abstract/abstract.router';
import AdminSettingController from '../adminController/admin.setting.controller';

class AdminSettingRouter extends AbstractRouter {
  private settingController;
  constructor() {
    super();
    this.settingController = new AdminSettingController();
    this.callRouter();
  }

  // call router
  private callRouter() {}
}

export default AdminSettingRouter;

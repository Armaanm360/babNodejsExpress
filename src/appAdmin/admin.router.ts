import AdminPermissionRouter from './adminRouter/admin.permissions.router';
import AdminRoleRouter from './adminRouter/admin.role.router';
import AdminAdminRouter from './adminRouter/admin.admin.router';
import AdminMemberRouter from './adminRouter/admin.member.router';
import AdminAuditRouter from './adminRouter/admin.audit.router';
import { Router } from 'express';
import AdminTrainingRouter from './adminRouter/admin.training.router';
import AdminTraineeRouter from './adminRouter/admin.trainee.router';
import AdminAccountRouter from './adminRouter/admin.account.router';
import AdminSettingRouter from './adminRouter/admin.setting.router';

class AdminRouter {
  public AdminRouter = Router();
  private AdminPermissionRoute = new AdminPermissionRouter();
  private AdminRoleRoute = new AdminRoleRouter();
  private AdminAdminRoute = new AdminAdminRouter();
  private AdminMemberRoute = new AdminMemberRouter();
  private AdminAuditRoute = new AdminAuditRouter();
  private AdminTrainingRoute = new AdminTrainingRouter();
  private AdminAccountRouter = new AdminAccountRouter();
  private AdminSettingRouter = new AdminSettingRouter();

  constructor() {
    this.callRouter();
  }

  private callRouter() {
    // admin member routes
    this.AdminRouter.use('/member', this.AdminMemberRoute.router);

    // admin permission routes
    this.AdminRouter.use('/permissions', this.AdminPermissionRoute.router);

    // admin role routes
    this.AdminRouter.use('/role', this.AdminRoleRoute.router);

    // admin audit trail routes
    this.AdminRouter.use('/audit', this.AdminAuditRoute.router);

    // admin account routes
    this.AdminRouter.use('/account', this.AdminAccountRouter.router);

    // admin training routes
    this.AdminRouter.use('/training', this.AdminTrainingRoute.trainingRouter);

    // admin setting routes
    this.AdminRouter.use('/setting', this.AdminSettingRouter.router);

    // admin routes
    this.AdminRouter.use('/', this.AdminAdminRoute.router);
  }
}

export default AdminRouter;

import AbstractRouter from '../../abstract/abstract.router';
import AdminAuditController from '../adminController/admin.audit.controller';

class AdminAuditRouter extends AbstractRouter {
  private auditController;
  constructor() {
    super();
    this.auditController = new AdminAuditController();
    this.callRouter();
  }

  // call router
  private callRouter() {
    // get audit router
    this.router.route('/').get(this.auditController.getAudit);
  }
}
export default AdminAuditRouter;

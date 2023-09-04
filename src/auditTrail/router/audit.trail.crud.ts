import AuditTrailCrudController from '../controller/audit.trail.crud.controller';
import TrailValidator from '../validator/validator';
import AbstractRouter from './../../abstract/abstract.router';
class CrudAuditTrailRouter extends AbstractRouter {
  private CrudController = new AuditTrailCrudController();
  private CrudValidator = new TrailValidator();
  constructor() {
    super();
    this.callRouter();
  }

  public callRouter() {
    this.router
      .route('/create')
      .post(
        this.CrudValidator.appTrailValidator(),
        this.CrudController.createControll
      );
    this.router.route('/list').get(this.CrudController.getList);
  }
}

export default CrudAuditTrailRouter;

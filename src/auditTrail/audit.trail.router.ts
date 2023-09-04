import { Router } from 'express';
import AuditTrailCrudController from './controller/audit.trail.crud.controller';
import CrudAuditTrailRouter from './router/audit.trail.crud';

class AuditTrail {
  public AuditTrailRouter = Router();
  private AuditTrailNewRouter = new CrudAuditTrailRouter();
  constructor() {
    this.callRouter();
  }

  public callRouter() {
    this.AuditTrailRouter.use('/', this.AuditTrailNewRouter.router);
  }
}

export default AuditTrail;

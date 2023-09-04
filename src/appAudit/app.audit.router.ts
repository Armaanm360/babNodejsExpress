import { Router } from 'express';
import CrudRouter from './router/app.crud.router';
import AppValidator from './validator/validator';

class AppAudit {
  public appAuditRouter = Router();
  private crudRouter = new CrudRouter();
  private crudValidator = new AppValidator();

  constructor() {
    this.callRouter();
  }

  public callRouter() {
    this.appAuditRouter.use('/', this.crudRouter.router);
  }
}

export default AppAudit;

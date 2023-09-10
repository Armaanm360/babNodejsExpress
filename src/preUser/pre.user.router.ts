import { Router } from 'express';
import RegisterRoutes from './preUserRoutes/reg.user.route';

class PreUserRouter {
  public PreUserRouter = Router();
  private RouterRegister = new RegisterRoutes();

  constructor() {
    this.callRouter();
  }

  private callRouter() {
    this.PreUserRouter.use('/', this.RouterRegister.router);
  }
}

export default PreUserRouter;

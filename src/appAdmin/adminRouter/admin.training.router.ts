import { Router } from 'express';
import AdminRootTrainingRouter from './admin.training.root.router';
import AdminTraineeRouter from './admin.trainee.router';
import AdminClassRouter from './admin.class.router';
import AdminMaterialsRouter from './admin.materials.router';
import AdminCertificateRouter from './admin.certificate.router';

class AdminTrainingRouter {
  public trainingRouter = Router();
  private AdminRootTrainingRouter = new AdminRootTrainingRouter();
  private AdminTraineeRouter = new AdminTraineeRouter();
  private AdminClassRouter = new AdminClassRouter();
  private AdminMaterialsRouter = new AdminMaterialsRouter();
  private AdminCertificateRouter = new AdminCertificateRouter();

  constructor() {
    this.callRouter();
  }

  private callRouter() {
    // admin training trainee routes
    this.trainingRouter.use('/trainee', this.AdminTraineeRouter.router);

    // admin training class routes
    this.trainingRouter.use('/class', this.AdminClassRouter.router);

    // admin training class routes
    this.trainingRouter.use('/materials', this.AdminMaterialsRouter.router);

    // admin training certificate routes
    this.trainingRouter.use('/certificate', this.AdminCertificateRouter.router);

    // admin root training routes
    this.trainingRouter.use('/', this.AdminRootTrainingRouter.router);
  }
}
export default AdminTrainingRouter;

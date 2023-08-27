import AbstractRouter from '../../abstract/abstract.router';
import AdminCertificateController from '../adminController/admin.certificate.controller';
import AdminTrainingValidator from '../utils/validator/admin.training.validator';

class AdminCertificateRouter extends AbstractRouter {
  private adminCertificateController = new AdminCertificateController();
  private adminTrainingValidator = new AdminTrainingValidator();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    // create certificate
    this.router
      .route('/')
      .post(
        this.uploader.cloudUploadRaw('certificate_files'),
        this.adminTrainingValidator.createCertificateValidator(),
        this.adminCertificateController.createCertificate
      );
  }
}
export default AdminCertificateRouter;

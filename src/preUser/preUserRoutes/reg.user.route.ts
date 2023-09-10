import AbstractRouter from '../../abstract/abstract.router';
import preUserController from './../preUserController/reg.user.controller';
import preUserValidator from './../validator/pre.user.validator';

class RegisterRoutes extends AbstractRouter {
  private preUserController = new preUserController();
  private preUserValidator = new preUserValidator();
  constructor() {
    super();
    this.callRouter();
  }

  public callRouter() {
    this.router
      .route('/register')
      .post(
        this.preUserValidator.userValidator(),
        this.preUserController.createUserReg
      );

    this.router.route('/login').post(this.preUserController.createUserLogin);
  }
}
export default RegisterRoutes;

import AbstractRouter from '../../abstract/abstract.router';
import CrudController from '../controller/app.crud.controller';
import AppValidator from '../validator/validator';

class CrudRouter extends AbstractRouter {
  private crudControll = new CrudController();
  private crudValidator = new AppValidator();

  constructor() {
    super();
    this.callRouter();
  }

  public callRouter() {
    this.router
      .route('/create')
      .post(this.crudValidator.appValidator(), this.crudControll.createControl);

    this.router.route('/list').get(this.crudControll.getList);
  }
}

export default CrudRouter;

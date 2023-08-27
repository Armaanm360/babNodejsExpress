import AbstractRouter from '../../abstract/abstract.router';
import AdminAccountController from '../adminController/admin.account.controller';
import AdminAccountValidator from '../utils/validator/admin.account.validator';

class AdminAccountRouter extends AbstractRouter {
  private accountController: AdminAccountController;
  private accountValidator: AdminAccountValidator;
  constructor() {
    super();
    this.accountController = new AdminAccountController();
    this.accountValidator = new AdminAccountValidator();
    this.callRouter();
  }

  // call router
  private callRouter() {
    // get audit router
    this.router
      .route('/')
      .post(
        this.accountValidator.createAccount(),
        this.accountController.createAccount
      )
      .get(this.accountController.getAccounts);

    // account transfer
    this.router
      .route('/transaction')
      .get(this.accountController.getAllTransactionList);

    // Balance transfer
    this.router
      .route('/transfer')
      .post(
        this.accountValidator.accountTransfer(),
        this.accountController.accountTransfer
      )
      .get(this.accountController.getAllBalanceTransferList);

    // single account
    this.router
      .route('/:id')
      .get(
        this.commonValidator.commonSingleParamsIdInputValidator(),
        this.accountController.getSingleAccount
      );
  }
}
export default AdminAccountRouter;
